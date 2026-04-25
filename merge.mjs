import fs from "fs";

const generated = fs.readFileSync("generated_code.txt", "utf8");
const [imports, productsStr] = generated.split("// === PRODUCTS ===");

let productsFile = fs.readFileSync("src/lib/products.ts", "utf8");

// insert imports after the last import
const lastImportIndex = productsFile.lastIndexOf("import ");
const endOfLastImport = productsFile.indexOf("\n", lastImportIndex) + 1;

productsFile =
  productsFile.slice(0, endOfLastImport) + imports + "\n" + productsFile.slice(endOfLastImport);

// insert products before the closing bracket of PRODUCTS array
const endOfArray = productsFile.indexOf(
  "];",
  productsFile.indexOf("export const PRODUCTS: Product[] = ["),
);
productsFile = productsFile.slice(0, endOfArray) + productsStr + productsFile.slice(endOfArray);

fs.writeFileSync("src/lib/products.ts", productsFile);
