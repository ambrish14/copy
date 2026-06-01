const fs = require("node:fs/promises");
//speed
//space

(async () => {
  console.time("copy");
  const destFile = await fs.open("text-copy.txt", "w");
  // const result = await fs.readFile("text-gigantic.txt");
  const result = await fs.readFile("text-big.txt");

  await destFile.write(result);
  console.timeEnd("copy");
})();
