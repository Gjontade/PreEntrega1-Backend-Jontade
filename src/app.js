const express = require("express");
const app = express();
const ProductManager = require("./ProductManager");
const pm = new ProductManager("./listadoDeProductos.json");
const routerProducts = require("./routes/products.router");
const routerCarts = require("./routes/carts.router");

app.use(express.json());
app.use(routerProducts);
app.use(routerCarts);

app.use(express.urlencoded({extended: true}));

// Prueba del servidor
app.get("/ping", (req, res) => {
  res.status(200).send("pong!")
})

app.get("/", (req, res) => {
	res.status(200).send(
		"<h1>Bienvenido/a la app correspondiente a la primer Pre-Entrega de Gonzalo Jontade.</h1>"
	);
});

app.listen(8080, () => console.log("Servidor levantado en puerto 8080."));