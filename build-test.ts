import fs from "fs";
import fsp from "fs/promises";
import { promisify } from "util";
import { exec as execCallback } from "child_process";
import { relative } from "path";

const exec = promisify(execCallback);

const sourceDir = "test/src";
const destDir = "test/dist";
const indexFile = "test/index.html";
const indexCssFile = "test/index.scss";
const publicFiles = ["mona-sans.woff2"];
const keywordHtml = "        <!-- {{INSERT_HERE}} -->";
const keywordCss = "// {{INSERT_HERE}}";

async function main() {
  try {
    await compile();
  } catch (e) {
    console.warn("❌ Compile error. Will retry on next change.");
    if ("stderr" in e) {
      console.warn(e.stderr);
    } else {
      console.warn(e);
    }
  }
}

async function compile() {
  if (fs.existsSync(destDir)) {
    await fsp.rm(destDir, { recursive: true });
  }

  await fsp.mkdir(destDir);

  const htmlFiles = (await fsp.readdir(sourceDir)).filter((file) =>
    file.endsWith(".html"),
  );
  const cssFiles = (await fsp.readdir(sourceDir)).filter((file) =>
    file.endsWith(".scss"),
  );

  const html = await Promise.all(
    htmlFiles.map(async (file) => {
      return await fsp.readFile(`${sourceDir}/${file}`, "utf-8");
    }),
  );

  const formattedHtml = html
    .join("\n")
    .split("\n")
    .map((line) => `        ${line}`)
    .join("\n");
  const indexHtml = await fsp.readFile(indexFile, "utf-8");
  const outHtml = indexHtml.replace(keywordHtml, formattedHtml);
  await fsp.writeFile(`${destDir}/index.html`, outHtml);

  const formattedCssImports = cssFiles
    .map(
      (x) =>
        `@import "${relative(destDir, sourceDir)}/${x.replace(".scss", "")}";`,
    )
    .join("\n");
  const indexCss = await fsp.readFile(indexCssFile, "utf-8");
  const outCss = indexCss.replace(keywordCss, formattedCssImports);
  await fsp.writeFile(`${destDir}/index.scss`, outCss);

  await exec(`sass ${destDir}/index.scss ${destDir}/index.css`);

  for (const file of publicFiles) {
    await fsp.cp(`${sourceDir}/${file}`, `${destDir}/${file}`);
  }

  console.log("✅ Compiled.");
}

main();
