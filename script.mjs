import fs from "fs";
import path from "path";

const assetsDir = "./src/assets";
const files = fs
  .readdirSync(assetsDir)
  .filter((f) => f.startsWith("WhatsApp Image") && f.endsWith(".jpeg"));

let imports = "";
let products = "";
let idCounter = 17;

files.forEach((file, index) => {
  const ext = path.extname(file);
  const newFileName = `product-drop2-${index + 1}${ext}`;

  // Rename file
  fs.renameSync(path.join(assetsDir, file), path.join(assetsDir, newFileName));

  // Generate code
  const varName = `drop2Img${index + 1}`;
  imports += `import ${varName} from "@/assets/${newFileName}";\n`;

  products += `  {
    id: "${idCounter++}",
    slug: "jeex-exclusive-drop2-${index + 1}",
    name: { ar: "قطعة حصرية - كوليكشن ${index + 1}", en: "Exclusive Drop Piece ${index + 1}" },
    category: "tshirt",
    price: 850,
    image: ${varName},
    colors: ["#000000"],
    sizes: ["S", "M", "L", "XL"],
    rating: 5.0,
    reviews: Math.floor(Math.random() * 50) + 10,
    isNew: true,
    description: {
      ar: "قطعة مميزة من أحدث كوليكشن لـ JEEX. جودة فائقة وتصميم عصري.",
      en: "A premium piece from the latest JEEX drop. Top tier quality and modern design."
    }
  },\n`;
});

fs.writeFileSync("generated_code.txt", imports + "\n\n// === PRODUCTS ===\n\n" + products);
console.log("Processed " + files.length + " files.");
