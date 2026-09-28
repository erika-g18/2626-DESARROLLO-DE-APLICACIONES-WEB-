// ==========================================
// DANNER: TUS MEJORES OUTFITS
// Sistema de validación y registro dinámico
// ==========================================

// Obtener elementos del HTML
const formulario = document.getElementById("formProducto");

const nombreProducto = document.getElementById("nombreProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const categoriaProducto = document.getElementById("categoriaProducto");

const errorNombre = document.getElementById("errorNombre");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorCategoria = document.getElementById("errorCategoria");

const mensaje = document.getElementById("mensaje");
const listaProductos = document.getElementById("listaProductos");
const contador = document.getElementById("contador");

// Arreglo donde se almacenarán los productos
let productos = [];


// ==========================================
// FUNCIÓN PARA VALIDAR EL NOMBRE
// ==========================================

function validarNombre() {

    const nombre = nombreProducto.value.trim();

    if (nombre === "") {

        nombreProducto.classList.remove("is-valid");
        nombreProducto.classList.add("is-invalid");

        errorNombre.textContent =
            "El nombre del producto es obligatorio.";

        return false;
    }

    if (nombre.length < 3) {

        nombreProducto.classList.remove("is-valid");
        nombreProducto.classList.add("is-invalid");

        errorNombre.textContent =
            "El nombre debe tener al menos 3 caracteres.";

        return false;
    }

    nombreProducto.classList.remove("is-invalid");
    nombreProducto.classList.add("is-valid");

    errorNombre.textContent = "";

    return true;
}


// ==========================================
// FUNCIÓN PARA VALIDAR LA DESCRIPCIÓN
// ==========================================

function validarDescripcion() {

    const descripcion = descripcionProducto.value.trim();

    if (descripcion === "") {

        descripcionProducto.classList.remove("is-valid");
        descripcionProducto.classList.add("is-invalid");

        errorDescripcion.textContent =
            "La descripción es obligatoria.";

        return false;
    }

    if (descripcion.length < 10) {

        descripcionProducto.classList.remove("is-valid");
        descripcionProducto.classList.add("is-invalid");

        errorDescripcion.textContent =
            "La descripción debe tener al menos 10 caracteres.";

        return false;
    }

    descripcionProducto.classList.remove("is-invalid");
    descripcionProducto.classList.add("is-valid");

    errorDescripcion.textContent = "";

    return true;
}


// ==========================================
// FUNCIÓN PARA VALIDAR LA CATEGORÍA
// ==========================================

function validarCategoria() {

    const categoria = categoriaProducto.value;

    if (categoria === "") {

        categoriaProducto.classList.remove("is-valid");
        categoriaProducto.classList.add("is-invalid");

        errorCategoria.textContent =
            "Debe seleccionar una categoría.";

        return false;
    }

    categoriaProducto.classList.remove("is-invalid");
    categoriaProducto.classList.add("is-valid");

    errorCategoria.textContent = "";

    return true;
}


// ==========================================
// EVENTOS EN TIEMPO REAL
// ==========================================

// Evento input para el nombre
nombreProducto.addEventListener("input", validarNombre);

// Evento blur para el nombre
nombreProducto.addEventListener("blur", validarNombre);


// Evento input para la descripción
descripcionProducto.addEventListener(
    "input",
    validarDescripcion
);

// Evento blur para la descripción
descripcionProducto.addEventListener(
    "blur",
    validarDescripcion
);


// Evento change para la categoría
categoriaProducto.addEventListener(
    "change",
    validarCategoria
);

// Evento blur para la categoría
categoriaProducto.addEventListener(
    "blur",
    validarCategoria
);


// ==========================================
// EVENTO SUBMIT DEL FORMULARIO
// ==========================================

formulario.addEventListener("submit", function(evento) {

    // Evita que la página se recargue
    evento.preventDefault();

    // Ejecutar todas las validaciones
    const nombreValido = validarNombre();
    const descripcionValida = validarDescripcion();
    const categoriaValida = validarCategoria();

    // Verificar que todo sea válido
    if (
        !nombreValido ||
        !descripcionValida ||
        !categoriaValida
    ) {

        mensaje.className = "alert alert-danger";
        mensaje.textContent =
            "No se puede registrar el producto. " +
            "Corrija los campos indicados.";

        return;
    }


    // ==========================================
    // CREAR EL OBJETO PRODUCTO
    // ==========================================

    const producto = {

        id: Date.now(),

        nombre: nombreProducto.value.trim(),

        descripcion:
            descripcionProducto.value.trim(),

        categoria:
            categoriaProducto.value
    };


    // Agregar producto al arreglo
    productos.push(producto);


    // Mostrar mensaje de éxito
    mensaje.className = "alert alert-success";
    mensaje.textContent =
        "Producto registrado correctamente.";


    // Mostrar los productos
    mostrarProductos();

    // Actualizar contador
    actualizarContador();


    // Limpiar formulario
    formulario.reset();


    // Limpiar clases de validación
    limpiarValidaciones();

});


// ==========================================
// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
// ==========================================

function mostrarProductos() {

    // Limpiar lista antes de volver a mostrar
    listaProductos.innerHTML = "";


    productos.forEach(function(producto) {

        // Crear columna
        const columna = document.createElement("div");

        columna.classList.add(
            "col-md-6",
            "col-lg-4",
            "mb-4"
        );


        // Crear tarjeta
        const tarjeta = document.createElement("div");

        tarjeta.classList.add(
            "card",
            "h-100",
            "shadow"
        );


        // Crear cuerpo de tarjeta
        const cuerpo = document.createElement("div");

        cuerpo.classList.add("card-body");


        // Crear título
        const titulo = document.createElement("h5");

        titulo.classList.add("card-title");

        titulo.textContent = producto.nombre;


        // Crear descripción
        const descripcion = document.createElement("p");

        descripcion.classList.add("card-text");

        descripcion.textContent =
            producto.descripcion;


        // Crear categoría
        const categoria = document.createElement("span");

        categoria.classList.add(
            "badge",
            "bg-primary",
            "mb-3"
        );

        categoria.textContent =
            producto.categoria;


        // Crear botón eliminar
        const botonEliminar =
            document.createElement("button");

        botonEliminar.classList.add(
            "btn",
            "btn-danger",
            "btn-sm",
            "d-block",
            "mt-3"
        );

        botonEliminar.textContent =
            "Eliminar";


        // ==========================================
        // EVENTO CLICK DEL BOTÓN
        // ==========================================

        botonEliminar.addEventListener(
            "click",
            function() {

                eliminarProducto(producto.id);

            }
        );


        // ==========================================
        // CONSTRUIR LA TARJETA
        // ==========================================

        cuerpo.appendChild(titulo);

        cuerpo.appendChild(categoria);

        cuerpo.appendChild(descripcion);

        cuerpo.appendChild(botonEliminar);

        tarjeta.appendChild(cuerpo);

        columna.appendChild(tarjeta);

        listaProductos.appendChild(columna);

    });
}


// ==========================================
// FUNCIÓN PARA ELIMINAR PRODUCTOS
// ==========================================

function eliminarProducto(id) {

    productos = productos.filter(
        function(producto) {

            return producto.id !== id;

        }
    );


    // Actualizar interfaz
    mostrarProductos();

    actualizarContador();


    // Mostrar mensaje
    mensaje.className = "alert alert-success";

    mensaje.textContent =
        "Producto eliminado correctamente.";
}


// ==========================================
// FUNCIÓN PARA ACTUALIZAR EL CONTADOR
// ==========================================

function actualizarContador() {

    contador.textContent = productos.length;
}


// ==========================================
// FUNCIÓN PARA LIMPIAR VALIDACIONES
// ==========================================

function limpiarValidaciones() {

    nombreProducto.classList.remove(
        "is-valid",
        "is-invalid"
    );

    descripcionProducto.classList.remove(
        "is-valid",
        "is-invalid"
    );

    categoriaProducto.classList.remove(
        "is-valid",
        "is-invalid"
    );

    errorNombre.textContent = "";

    errorDescripcion.textContent = "";

    errorCategoria.textContent = "";
}
