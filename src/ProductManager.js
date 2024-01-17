const fs = require("fs");
const {default: test} = require("node:test");

// CLASE
class productManager {
	constructor(ruta) {
		this.path = ruta;

		this.products = [];
	}
	static id = 0;
	// METODO 1: Agrega un nuevo producto al array '#products' + un numero ID incrementable.
	addProduct = async (
		title,
		description,
		price,
		thumbnail = [],
		code,
		stock,
		status = true
	) => {
		// El bucle for, me permite saber si el atributo code de cada producto es repetido, de ser asi no lo agrega a la lista.
		for (let i = 0; i < this.products.length; i++) {
			if (this.products[i].code === code) {
				console.log(`Error, code ${code} esta repetido.`);
				return;
			}
		}

		const newProduct = {title, description, price, thumbnail, code, stock, status};

		// Comprueba que todos los campos sean obligatorios.
		if (!Object.values(newProduct).includes(undefined)) {
			productManager.id++; // Con cada producto nuevo, aumenta el ID en uno, de esta forma no se repiten.
			this.products.push({
				...newProduct,
				id: productManager.id,
			});
			await fs.promises.writeFile(this.path, JSON.stringify(this.products));
		} else {
			console.log("Todos los campos son obligatorios.");
		}
	};

	// METODO 2: Devuelve el array completo del atributo '#products'.
	getProducts = async () => {
		try {
			let colectionJSON = await fs.promises.readFile(this.path, "utf-8");
			return JSON.parse(colectionJSON);
		} catch (error) {
			await fs.promises.writeFile(this.path, "[]");
			let colectionJSON = await fs.promises.readFile(this.path, "utf-8");
			return JSON.parse(colectionJSON);
		}
	};

	// METODO 3: Busca productos dentro del array #products segun el numero ID.
	getProductById = async (id) => {
		let idProducto = await this.getProducts();
		if (!idProducto.find((i) => i.id == id)) {
			console.log(`El producto con ID: ${id}, no existe.`);
			return `El producto con ID ${id}, no existe.`;
		} else {
			console.log(idProducto.find((i) => i.id === id));
			return idProducto.find((i) => i.id == id);
		}
	};

	// METODO 4: Borra productos.
	deleteProduct = async (id) => {
		let idProducto = await this.getProducts();
		let lista = idProducto.filter((i) => i.id !== id);

		await fs.promises.writeFile(this.path, JSON.stringify(lista));
	};

	// METODO 5: Modifica productos.
	updateProduct = async (id, campo, valor) => {
		let colecciones = await this.getProducts();
		let productoIndex = colecciones.findIndex((i) => i.id === id);

		if (productoIndex !== -1) {
			colecciones[productoIndex][campo] = valor;
			await fs.promises.writeFile(this.path, JSON.stringify(colecciones));
		} else {
			console.log(`Not found id: ${id}`);
		}
	};

	test = async () => {
		// Primera llamada = arreglo vacio.
		//console.log(await producto.getProducts());

		//await producto.addProduct("error01", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.
		//await producto.addProduct("error02", "descripcion", 20000, "img"); // Producto erroneo por falta de campos.

		await producto.addProduct(
			"Monitor",
			"descripcion 1",
			10000,
			"img 1",
			"AA01",
			10
		); // Producto 1
		await producto.addProduct("Delete1", "descripcion", 5000, "img", "AA02", 8); // Producto 2
		await producto.addProduct(
			"Mouse",
			"descripcion 3",
			2500,
			"img 3",
			"AA03",
			2
		); // Producto 3
		await producto.addProduct(
			"Auriculares",
			"descripcion 4",
			1500,
			"img 4",
			"AA04",
			7
		); // Producto 4
		await producto.addProduct(
			"Delete2",
			"descripcion",
			8000,
			"img 5",
			"AA05",
			4
		); // Producto 5
		await producto.addProduct(
			"Teclado",
			"descripcion 6",
			1000,
			"img 6",
			"AA06",
			4
		); // Producto 6
		await producto.addProduct(
			"Celular",
			"descripcion 7",
			14000,
			"img 7",
			"AA07",
			10
		); // Producto 7
		await producto.addProduct(
			"Microfono",
			"descripcion 8",
			7000,
			"img 8",
			"AA08",
			1
		); // Producto 8
		await producto.addProduct(
			"Mando",
			"descripcion 9",
			5500,
			"img 9",
			"AA09",
			3
		); // Producto 9
		await producto.addProduct(
			"Gabinete",
			"descripcion 10",
			20000,
			"img 10",
			"AA10",
			2
		); // Producto 10
		await producto.addProduct(
			"Silla Gammer",
			"descripcion 11",
			12000,
			"img 11",
			"AA11",
			3
		); // Producto 11
		await producto.addProduct(
			"Pad",
			"descripcion 12",
			500,
			"img 12",
			"AA12",
			25
		); // Producto 12

		/*await producto.addProduct(
			"Repetido1",
			"descripcion",
			500,
			"img",
			"AA05",
			15
		); // Validacion de codigo repetido.*/

		await producto.deleteProduct(2); // Producto borrado.
		await producto.deleteProduct(5); // Producto borrado.

		await producto.updateProduct(4, "title", "Auriculares Inalambricos"); // Producto modificado.

		// Segunda llamada = arreglo de productos.
		//console.log(await producto.getProducts());

		/*await producto.getProductById(9); // Devuelve si existe o no el producto con el ID buscado.
		await producto.getProductById(1);
		await producto.getProductById(8);
		await producto.getProductById(3);*/
	};
}

// Se agregan productos.
const producto = new productManager("./listadoDeProductos.json");

producto.test();

module.exports = productManager;
