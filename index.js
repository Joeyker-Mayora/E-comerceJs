const product = [
  {name: "Zapatillas de Futbol ", 
    id:"1", 
    image:"imgF/zapatillasF.jpg", 
    precio:"50000 ", 
    descripcion:"", 
    categoria:"Futbol",
    cantidad: 1
  },

  {name: "Paracaidas", 
    id:"2",
    image:"imgF/paracaidas.jpg", 
    precio:"4500 ", 
    descripcion:"",   
    categoria:"Futbol",
    cantidad: 1 
  },

  {name: "Camiseta de Baloncesto", 
    id:"3", 
    image:"imgB/camisaB.jpg", 
    precio:"15000 ", 
    descripcion:"", 
    categoria:"Baloncesto" ,
    cantidad: 1 
    
  },

  {name: "Bate de Beisbol", 
    id:"4", 
    image:"imgBe/bate.jpg", 
    precio:"7900 ", 
    descripcion:"",  
    categoria:"Beisbol",
    cantidad: 1  
  },
  {name: "Camiseta de Beisbol", 
    id:"5", 
    image:"imgBe/camisaBeisbol.jpg", 
    precio:"11400 ", 
    descripcion:"", 
    categoria:"Beisbol",
    cantidad: 1  
  },

  {name: "Gorra", 
    id:"6", 
    image:"imgBe/gorra.jpg", 
    precio:"9900 ", 
    descripcion:"",  
    categoria:"Beisbol",
    cantidad: 1  
  },

  {name: "Aro", 
    id:"7", 
    image:"imgB/aro.jpg", 
    precio:"3400 ", 
    descripcion:"Incluye 4 tornillos para la instalacion",
    categoria:"Baloncesto",
    cantidad: 1 
  },
  {name: "Balon de Futbol", 
    id:"8", 
    image:"imgF/balonF.jpg", 
    precio:"7992 ", 
    descripcion:"",   
    categoria:"Futbol",
    cantidad: 1  
  },

  {name: "Camiseta de Futbol", 
    id:"9", 
    image:"imgF/camisaF.jpg", 
    precio:"28000 ", 
    descripcion:"", 
    categoria:"Futbol",
    cantidad: 1  
  },

  {name: "Zapatillas de Baloncesto", 
    id:"10", 
    image:"imgB/zapatos.jpg", 
    precio:" 72000", 
    descripcion:"", 
    categoria:"Baloncesto",
    cantidad: 1  
  },

  {name: "Casco de Futbol", 
    id:"11", 
    image:"imgFA/casco.jpg", 
    precio:"100000 ", 
    descripcion:"", 
    categoria:"Futbol Americano",
    cantidad: 1  
  },

  {name: "Pelota de Beisbol", 
    id:"12", 
    image:"imgBE/pelota.jpeg", 
    precio:"2000 ", 
    descripcion:"", 
    categoria:"Beisbol",
    cantidad: 1  
  },

  {name: "Camiseta de Futbol Americano", 
    id:"13", 
    image:"imgFA/jersey.jpg", 
    precio:"18000 ", 
    descripcion:"", 
    categoria:"Futbol Americano",
    cantidad: 1  
  },

  {name: "Ovoide", 
    id:"14", 
    image:"imgFA/ovoide.jpg", 
    precio:" 10500 ", 
    descripcion:"", 
    categoria:"Futbol Americano",
    cantidad: 1 
  },

  {name: "Balon de Baloncesto", 
    id:"15", 
    image:"imgB/balon.jpg", 
    precio:"7000 ", 
    descripcion:"Cuero 100%", 
    categoria:"Baloncesto",
    cantidad: 1  
  },

  {name: "Hombrera de Futbol", 
    id:"16", 
    image:"imgFA/hombrera.jpg", 
    precio:"90900 ", 
    descripcion:"", 
    categoria:"Futbol Americano",
    cantidad: 1 
  },

  {name: "Zapatillas de Futbol", 
    id:"17", 
    image:"imgFA/zapatillasFA.jpg", 
    precio:"45000 ", 
    descripcion:"", 
    categoria:"Futbol Americano" 
  },

  {name: "Tabla de jugadas", 
    id:"18", 
    image:"imgB/tabla.jpg", 
    precio:"4000 ", 
    descripcion:"",   
    categoria:"Baloncesto",
    cantidad: 1  
  },

  {name: "Guante de Beisbol", 
    id:"19", 
    image:"imgBe/guante.jpg", 
    precio:"25000 ", 
    descripcion:"", 
    categoria:"Beisbol",
    cantidad: 1  
  },

  {name: "Arqueria de Futbol", 
    id:"20", 
    image:"imgF/porteria.png", 
    precio:" 14250 ", 
    descripcion:"", 
    categoria:"Futbol",
    cantidad: 1  
  },

];


let products= [];
fetch("./productos.json")
  .then(res => res.json())
  .then(res => {
    products = res;
    items(products);
  })
  .catch(err => console.log(err));

const contenedor = document.querySelector(".contenedor");
const botonesCategorias = document.querySelectorAll(".btn-categ")
const tituloPrincipal = document.querySelector(".title-prin")
const numero = document.querySelector(".num");
let botones;

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
    onClick: function(){} // Callback after click
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