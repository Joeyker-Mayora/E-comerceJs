// FETCH

let products= [];
fetch("./productos.json")
  .then(res => res.json())
  .then(res => {
    products = res;
    items(products);
  })
  .catch(err => console.log(err));

// DOM   

const contenedor = document.querySelector(".contenedor");
const botonesCategorias = document.querySelectorAll(".btn-categ")
const tituloPrincipal = document.querySelector(".title-prin")
const numero = document.querySelector(".num");
let botones;

// FUNTIONS

function items(productosElegidos) {
    
  contenedor.innerHTML= "";

  productosElegidos.forEach(p=> {
        

    const d = document.createElement("div");
    d.classList.add("producto");
    d.innerHTML = `

      <img class="product-img" src="${p.image}" alt="${p.name}">
      <div class="product-detalles">
        <h3 class="product-titulo">${p.name}</h3>
        <p class="product-precio">${p.precio}$</p>
        <button class="btn-agg" id="${p.id}" >Agregar</button>
      </div>
    `;
    contenedor.append(d);

  })
  actualizarBtnAgre()
  
}


botonesCategorias.forEach(boton => {
  boton.addEventListener('click',(e) => {

    botonesCategorias.forEach(boton => boton.classList.remove('active'));;
    e.currentTarget.classList.add('active');

    if(e.currentTarget.id != "todos") {
      const nombreCateg = products.find(p => p.categoria === e.currentTarget.id)
      tituloPrincipal.textContent = nombreCateg.categoria
      const categorias = products.filter(i => i.categoria === e.currentTarget.id );
      items(categorias);
    } else {
      tituloPrincipal.textContent = "Todos los Productos"
      items(products);
    }
        
  })

})
function actualizarBtnAgre() {
  botones = document.querySelectorAll(".btn-agg")
  botones.forEach(btn => {
    btn.addEventListener("click", agregarAlCar)
  })
     
}

let productosCarrito;
let carritoLs = localStorage.getItem("productos-carrito");
if (carritoLs) {
  productosCarrito = JSON.parse(carritoLs)
  actualizarNum()
} else {
  productosCarrito = [];
}


function agregarAlCar (e) {
  Toastify({
    text: "Producto Agregado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #4b33a8, #b7b7bd)",
      borderRadius: "40px",
      textTransform: "uppercase",
      fontSize:".65rem"
    },
    offset: {
      x: "2rem", 
      y: "1.5rem" 
    },
    onClick: function(){} 
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productoAgreado = products.find(producto => producto.id === idBoton)

  if(productosCarrito.some(producto => producto.id === idBoton)) {
    const index = productosCarrito.findIndex(producto => producto.id === idBoton)
    productosCarrito[index].cantidad++;

  } else {
    productoAgreado.cantidad =  1;
    productosCarrito.push(productoAgreado);

  }
  actualizarNum();
  console.log(productosCarrito)

  localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));

}
function actualizarNum () {
  let newNum = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numero.innerHTML = newNum;
}