#!/bin/bash

# Assumes there is a project in a test/ folder, builds the scss files into css,
# and then serves the project. Runs faster if rimraf, concurrently and onchange
# are installed.
npx rimraf test/**/*.css.map & rimraf test/**/*.css
npx sass test/index.scss test/index.css
npx concurrently "onchange \"**/*.scss\" -- npx sass test/index.scss test/index.css" "npx serve test/"
