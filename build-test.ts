import fs from "fs";
import fsp from "fs/promises";
import { promisify } from "util";
import { exec as execCallback } from "child_process";

const exec = promisify(execCallback);

const sourceDir = "test/src";
const destDir = "test/dist";
const indexFile = "test/index.html";
const indexCssFile = "test/index.scss";
const keyword = "        {{SECTIONS_GO_HERE}}";

async function main() {
  if (fs.existsSync(destDir)) {
    await fsp.rmdir(destDir, { recursive: true });
  }

  await fsp.mkdir(destDir);

  const files = (await fsp.readdir(sourceDir)).filter((file) =>
    file.endsWith(".html"),
  );

  const html = await Promise.all(
    files.map(async (file) => {
      return await fsp.readFile(`${sourceDir}/${file}`, "utf-8");
    }),
  );

  const formattedHtml = html
    .join("\n")
    .split("\n")
    .map((line) => `        ${line}`)
    .join("\n");

  const indexHtml = await fsp.readFile(indexFile, "utf-8");

  const outHtml = indexHtml.replace(keyword, formattedHtml);

  await fsp.writeFile(`${destDir}/index.html`, outHtml);

  await exec(`sass ${indexCssFile} ${destDir}/index.css`);
}

main();
