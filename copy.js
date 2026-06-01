const fs = require("node:fs/promises");
//speed
//space

// file size copied 1gb
// Memory usage :1GB
// Execution time :1.663s
// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("text-copy.txt", "w");
//   // const result = await fs.readFile("text-gigantic.txt");
//   const result = await fs.readFile("text-big.txt");

//   await destFile.write(result);
//   console.timeEnd("copy");
// })();

// file size copied 1gb
// Memory usage :14mb
// Execution time :3.869s

// (async () => {
//   console.time("copy");
//   const srcFile = await fs.open("text-gigantic.txt", "r");
//   // const srcFile = await fs.open("text-big.txt", "r");

//   const destFile = await fs.open("text-copy.txt", "w");

// let bytesRead = -1;
// while (bytesRead !== 0) {
//   const readResult = await srcFile.read();
//   bytesRead = readResult.bytesRead;
//   // console.log(readResult);

//   if (bytesRead !== 16384) {
//     const indexNotFilled = readResult.buffer.indexOf(0);
//     const newBuffer = Buffer.alloc(indexNotFilled);
//     readResult.buffer.copy(newBuffer, 0, 0, indexNotFilled);
//     destFile.write(newBuffer);
//   } else {
//     destFile.write(readResult.buffer);
//   }
// }

//   // const readResult = await srcFile.read();
//   // console.log(readResult);

//   console.timeEnd("copy");
// })();

// file size copied 1gb
// Memory usage :14mb
// Execution time :3.15s

(async () => {
  console.time("copy");
  const srcFile = await fs.open("text-big.txt", "r");
  // const srcFile = await fs.open("text-big.txt", "r");

  const destFile = await fs.open("text-copy.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  // readStream.pipe(writeStream);

  // We use a Promise to wait for the pipe to finish
  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream);
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  console.timeEnd("copy");
})();
