let carrito = localStorage.getItem("productos-carrito");

const carVacio = document.querySelector(".car-vacio");
const carProductos = document.querySelector(".car-productos");
const carAcciones = document.querySelector(".car-acciones");
const carCompra = document.querySelector(".car-comprado");
let btnEliminar = document.querySelectorAll(".car-product-eliminar")
const btnVaciar = document.querySelector(".car-btn-var");
const totalpagar = document.querySelector("#total");
const btnComprar = document.querySelector(".car-comp");

function carProduct () {
    if (carrito && carrito.length > 0) {

        carVacio.classList.add("disabled");
        carProductos.classList.remove("disabled");
        carAcciones.classList.remove("disabled");
        carCompra.classList.add("disabled");
    
        carProductos.innerHTML="";
        
        carrito.forEach( p => {
        
            const div = document.createElement("div");
            div.classList.add("car-productos");
            div.innerHTML = `                    
                <div class="car-product">
                    <img class="car-img" src="${p.image}" alt="">
                    <div class="car-produc-title">
                        <small>Nombre</small>
                        <h4>${p.name}</h4>
                    </div>
                    <div class="car.product.cant">
                        <small>cantidad</small>
                        <h4>${p.cantidad}</h4>
                    </div>
                    <div class="car-product.price">
                        <small>Precio</small>
                        <h4>${p.precio}$</h4>
                    </div>
                    <div class="car-product-sub">
                        <small>Subtotal</small>
                        <h4>${p.precio * p.cantidad}$</h4>
                    </div>
                    <button id="${p.id}" class="car-product-eliminar">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            `;
            carProductos.appendChild(div)
        });
        
    } else {
        carVacio.classList.remove("disabled");
        carProductos.classList.add("disabled");
        carAcciones.classList.add("disabled");
        carCompra.classList.add("disabled");
    
    }
    actualizarBtnEliminar()
    total()

}

carProduct()
function actualizarBtnEliminar() {
    btnEliminar = document.querySelectorAll(".car-product-eliminar")
    btnEliminar.forEach(btn => {
      btn.addEventListener("click", eliminaraDelCar)
    })
}    
function eliminaraDelCar (e) {
    const idBtn = e.currentTarget.id;
    const index = carrito.findIndex(p => p.id === idBtn)
    carrito.splice(index,1)
    carProduct()
    localStorage.setItem("productos-carrito" ,JSON.stringify(carrito));

}
btnVaciar.addEventListener("click",vaciarCar)
function vaciarCar() {
    carrito.length = 0;
    localStorage.setItem("productos-carrito" ,JSON.stringify(carrito));
    carProduct()

    
}
function total () {
    const totalCalculado =  carrito.reduce((acc, p)=> acc + (p.precio * p.cantidad), 0)
    totalpagar.innerHTML = `${totalCalculado}`
    
}

btnComprar.addEventListener("click",comprarCarrito)
function comprarCarrito() {
    carrito.length = 0;
    localStorage.setItem("productos-carrito" ,JSON.stringify(carrito));
    
    carVacio.classList.add("disabled");
    carProductos.classList.add("disabled");
    carAcciones.classList.add("disabled");
    carCompra.classList.remove("disabled");
    

    
}