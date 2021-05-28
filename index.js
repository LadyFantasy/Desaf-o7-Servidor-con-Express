const express = require("express");
const fs = require("fs");

const app = express();
const puerto = 8080;

let counterItems = 0;
let counterRandom = 0;


function obtenerRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

app.get("/items", async (req, res) => {
  counterItems++;
  try {
    const productos = await fs.promises.readFile("./productos.txt", "utf-8");
    const prodJson = JSON.parse(productos);
    let object = {
      items: prodJson,
      cantidad: prodJson.length
    };
    res.json(object);
  } catch {
    return [];
  }
});


app.get("/item-random", async (req, res) => {
  counterRandom++;
  const productos = await fs.promises.readFile("./productos.txt", "utf-8");
  const prodJson = JSON.parse(productos);
  let random = prodJson[obtenerRandom(0, prodJson.length - 1)];
  res.json({ item: random });
});


app.get("/visitas", (req, res) => {
  res.json({ visitas: { items: counterItems, item: counterRandom } });
});


const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on("error", error => {
  console.log("error en el servidor:", error);
});
