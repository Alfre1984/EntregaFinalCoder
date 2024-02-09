const container = document.getElementById("container");

let carrito = [];

let productos = [];

// let arrayCarrito = [];

const botonContainer = document.getElementById("boton-carrito");
const btn1 = document.createElement("button");
btn1.className = "btn btn-primary";
btn1.innerText = "Mostrar carrito";
btn1.onclick = () => mostrarCarrito();

const btn2 = document.createElement("button");
btn2.className = "btn btn-danger";
btn2.innerText = "Limpiar carrito";
btn2.onclick = () => limpiarCarrito();

const btn3 = document.createElement("button");
btn3.className = "btn btn-primary";
btn3.innerText = "Finalizar compra";
btn3.onclick = () => finalizarCompra();

botonContainer.appendChild(btn1);
botonContainer.appendChild(btn2);
botonContainer.appendChild(btn3);

fetch("./json/productos.json")
  .then((response) => response.json())
  .then((data) => {
    const arrayProductos = data;

    arrayProductos.forEach((el) => {
      const card = document.createElement("div");
      card.className = "card-producto";

      const titulo = document.createElement("h3");
      titulo.innerText = el.nombre;

      const imagen = document.createElement("img");
      imagen.src = el.img;
      imagen.className = "foto-producto";

      const precio = document.createElement("p");
      precio.innerText = `$${el.precio}`;

      const botonAgregarCarrito = document.createElement("button");
      botonAgregarCarrito.innerText = "Agregar al carrito";
      botonAgregarCarrito.className = "btn btn-secondary";
      botonAgregarCarrito.onclick = () => agregarAlCarrito(el.id);
      botonAgregarCarrito.id = el.id;

      card.appendChild(imagen);
      card.appendChild(titulo);
      card.appendChild(precio);
      card.appendChild(botonAgregarCarrito);

      container.appendChild(card);

      productos.push(el);
    });
  });

function agregarAlCarrito(id) {
  const agregarProducto = productos.find((el) => el.id === id);

  if (!carrito.some((el) => el.id === id)) {
    carrito.push({
      ...agregarProducto,
      cantidad: 1,
    });
  } else {
    let indiceDelProducto = carrito.findIndex((el) => el.id === id);
    carrito[indiceDelProducto].cantidad += 1;
  }

  Swal.fire({
    position: "center",
    icon: "success",
    title: `Agregaste ${agregarProducto.nombre} al Carrito`,
    showConfirmButton: false,
    timer: 1500,
  });
}
console.log(carrito);

function mostrarCarrito() {
  carrito.forEach((el) => {
    Swal.fire({
      title: `Tu carrito contiene ${el.cantidad} ${el.nombre}`,
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
      `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
      `,
      },
    });
  });
}
console.log(carrito);

function finalizarCompra() {
  carrito.forEach((el) => {
    Swal.fire({
      title: "Carrito",
      text: `Tu carrito contiene ${el.cantidad} ${el.nombre}`,
      icon: "success",
    });
  });
}

function limpiarCarrito() {
  Swal.fire({
    title: `Estas seguro? ${(carrito = [])}`,
    text: "Esta accion no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Vaciado!",
        text: "Tu carrito fue vaciado.",
        icon: "success",
      });
    }
  });
}
