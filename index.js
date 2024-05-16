// JSON
let productos = [];

fetch("./productos.json")
  .then(res => res.json())
  .then(res => {
    productos = res;
    mostrarProductos(productos);
  })
  .catch(err => console.log(err));

// DOM
const contenedor = document.querySelector(".contenedor");
const botonesCategorias = document.querySelectorAll(".btn-categ");
const tituloPrincipal = document.querySelector(".title-prin");
const contadorCarrito = document.querySelector(".num");

// CLASS
class CarritoDeCompras {
  constructor() {
    const carritoDesdeStorage = localStorage.getItem("productos-carrito");
    this.productosEnCarrito = carritoDesdeStorage ? JSON.parse(carritoDesdeStorage) : [];
    this.actualizarContadorCarrito();
  }

  agregarProducto(producto) {
    const productoExistente = this.productosEnCarrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      producto.cantidad = 1;
      this.productosEnCarrito.push(producto);
    }
    this.actualizarContadorCarrito();
    this.guardarCarrito();
  }

  actualizarContadorCarrito() {
    const totalProductos = this.productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.innerHTML = totalProductos;
  }

  guardarCarrito() {
    localStorage.setItem("productos-carrito", JSON.stringify(this.productosEnCarrito));
  }
}

const carritoDeCompras = new CarritoDeCompras();

// FUNCTIONS 
function mostrarProductos(productosElegidos) {
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

  productosElegidos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img class="product-img" src="${p.image}" alt="${p.name}">
      <div class="product-detalles">
        <h3 class="product-titulo">${p.name}</h3>
        <p class="product-precio">${p.precio}$</p>
        <button class="btn-agg" id="${p.id}">Agregar</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  actualizarBotonesAgregar(); 
}

function actualizarBotonesAgregar() {
  const botones = document.querySelectorAll(".btn-agg");
  botones.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito);
  });
}

botonesCategorias.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const categoriaSeleccionada = e.currentTarget.id;
    const productosFiltrados = productos.filter(p => categoriaSeleccionada === "todos" || p.categoria === categoriaSeleccionada);
    
    // Actualizar el título principal según la categoría seleccionada
    if (categoriaSeleccionada === "todos") {
      tituloPrincipal.textContent = "Todos los Productos";
    } else {
      tituloPrincipal.textContent = categoriaSeleccionada;
    }

    mostrarProductos(productosFiltrados);
  });
});

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto Agregado",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #4b33a8, #b7b7bd)",
      borderRadius: "40px",
      textTransform: "uppercase",
      fontSize: ".65rem"
    },
    offset: {
      x: "2rem",
      y: "1.5rem"
    },
    onClick: function() {}
  }).showToast();

  const idProducto = e.currentTarget.id;
  const productoParaAgregar = productos.find(producto => producto.id === idProducto);
  carritoDeCompras.agregarProducto(productoParaAgregar);
}

