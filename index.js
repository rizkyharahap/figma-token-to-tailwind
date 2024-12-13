import fs from "fs";

let colors = JSON.parse(fs.readFileSync("./colorFoundations.json", "utf-8"));

function convertFigmaToTailwind(colors) {
  const result = {};

  Object.keys(colors).forEach((color) => {
    if (colors[color]?.$type === "color") {
      result[color] = colors[color].$value;
    } else {
      result[color] = convertFigmaToTailwind(colors[color]);
    }
  });

  return result;
}

const processedData = convertFigmaToTailwind(colors);

fs.writeFileSync(
  "./figmaTailwindOutput.js",
  "module.exports = " + JSON.stringify(processedData, null, 2),
  "utf-8",
);
