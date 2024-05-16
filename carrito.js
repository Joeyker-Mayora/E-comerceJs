// DOM
const carVacio = document.querySelector(".car-vacio");
const carProductos = document.querySelector(".car-productos");
const carAcciones = document.querySelector(".car-acciones");
const carCompra = document.querySelector(".car-comprado");
const totalpagar = document.querySelector("#total");
const btnVaciar = document.querySelector(".car-btn-var");
const btnComprar = document.querySelector(".car-comp");

// CLASS

class Carrito {
    constructor() {
      this.carrito = this.obtenerCarritoDesdeLocalStorage() || [];
    }
  
    obtenerCarritoDesdeLocalStorage() {
      const carritoJSON = localStorage.getItem("productos-carrito");
      return carritoJSON ? JSON.parse(carritoJSON) : [];
    }
  
    guardarCarritoEnLocalStorage() {
      localStorage.setItem("productos-carrito", JSON.stringify(this.carrito));
    }
  
    agregarProducto(producto) {
      const productoExistente = this.carrito.find(item => item.id === producto.id);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        producto.cantidad = 1;
        this.carrito.push(producto);
      }
      this.guardarCarritoEnLocalStorage();
    }
  
    eliminarProducto(id) {
      const index = this.carrito.findIndex(item => item.id === id);
      if (index !== -1) {
        this.carrito.splice(index, 1);
        this.guardarCarritoEnLocalStorage();
      }
    }
  
    vaciarCarrito() {
      this.carrito = [];
      this.guardarCarritoEnLocalStorage();
    }
  
    calcularTotal() {
      return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }
  }
  
  const carritoDeCompras = new Carrito();

// FUNTIONS 
  
  function mostrarProductosEnCarrito() {
    carProductos.innerHTML = "";
  
    if (carritoDeCompras.carrito.length > 0) {
      carVacio.classList.add("disabled");
      carProductos.classList.remove("disabled");
      carAcciones.classList.remove("disabled");
      carCompra.classList.add("disabled");
  
      carritoDeCompras.carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("car-productos");
        div.innerHTML = `
          <div class="car-product">
            <img class="car-img" src="${item.image}" alt="">
            <div class="car-produc-title">
              <small>Nombre</small>
              <h4>${item.name}</h4>
            </div>
            <div class="car.product.cant">
              <small>Cantidad</small>
              <h4>${item.cantidad}</h4>
            </div>
            <div class="car-product.price">
              <small>Precio</small>
              <h4>${item.precio}$</h4>
            </div>
            <div class="car-product-sub">
              <small>Subtotal</small>
              <h4>${item.precio * item.cantidad}$</h4>
            </div>
            <button id="${item.id}" class="car-product-eliminar">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        `;
        carProductos.appendChild(div);
      });
  
      actualizarEventosEliminarProducto();
      actualizarTotal();
    } else {
      carVacio.classList.remove("disabled");
      carProductos.classList.add("disabled");
      carAcciones.classList.add("disabled");
      carCompra.classList.add("disabled");
    }
  }
  
  function actualizarEventosEliminarProducto() {
    const btnEliminar = document.querySelectorAll(".car-product-eliminar");
    btnEliminar.forEach(btn => {
      btn.addEventListener("click", eliminaraDelCarrito);
    });
  }
  
  function eliminaraDelCarrito(e) {
    const idProducto = e.currentTarget.id;
    carritoDeCompras.eliminarProducto(idProducto);
    mostrarProductosEnCarrito();
    mostrarToast("Se eliminó del carrito");
  }
  
  btnVaciar.addEventListener("click", () => {
    carritoDeCompras.vaciarCarrito();
    mostrarProductosEnCarrito();
    mostrarToast("Se vació el carrito");
  });
  
  function actualizarTotal() {
    const totalCalculado = carritoDeCompras.calcularTotal();
    totalpagar.innerHTML = `${totalCalculado}`;
  }
  
  function mostrarToast(mensaje) {
    Toastify({
      text: mensaje,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #f12828, #b7b7bd)",
        borderRadius: "40px",
        textTransform: "uppercase",
        fontSize: ".65rem"
      },
      offset: {
        x: "2rem",
        y: "1.5rem"
      }
    }).showToast();
  }
  
  mostrarProductosEnCarrito();
  
  btnComprar.addEventListener("click", () => {
    carritoDeCompras.vaciarCarrito();
    mostrarProductosEnCarrito();
    mostrarToast("Compra realizada con éxito");
  });
  