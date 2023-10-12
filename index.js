import fetch from "node-fetch";
import fs from "fs";

const BASE_URL = "https://card.godsunchained.com/?q=4&id=";
const startId = 2401;
const maxId = 2553;

async function downloadImage(id) {
  const url = `${BASE_URL}${id}`;
  const response = await fetch(url);
  const protoDataString = response.headers.get("x-proto-data");
  const protoData = JSON.parse(protoDataString);
  const name = protoData.name;
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `images/${id}-${name}.jpg`;
  await fs.writeFile(filename, buffer, (error) => { error && console.log(error) });
  console.log(`Downloaded image ${filename}`);
}

function downloadImages() {
  for (let id = startId; id <= maxId; id++) {
    try {
      downloadImage(id);
    } catch (error) {
      console.log(`Skipping image ${id}`);
    }
  }
}


downloadImages();
