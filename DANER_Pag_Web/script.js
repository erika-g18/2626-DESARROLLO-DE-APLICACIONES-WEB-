// ======================================================
// DANNER: TUS MEJORES OUTFITS
// CONTENIDO DINÁMICO Y VALIDACIONES
// ======================================================


// ======================================================
// ARREGLO DE OBJETOS
// Representa los datos iniciales del proyecto.
// ======================================================

let productos = [

    {
        id: 1,
        nombre: "Camiseta deportiva",
        descripcion:
            "Camiseta cómoda de algodón para actividades diarias.",
        categoria: "Camisetas"
    },

    {
        id: 2,
        nombre: "Pantalón casual",
        descripcion:
            "Pantalón moderno para combinar con diferentes outfits.",
        categoria: "Pantalones"
    },

    {
        id: 3,
        nombre: "Chaqueta urbana",
        descripcion:
            "Chaqueta versátil para complementar diferentes estilos.",
        categoria: "Chaquetas"
    }

];


// ======================================================
// OBTENER ELEMENTOS DEL HTML
// ======================================================

const formulario =
    document.getElementById("formProducto");

const nombreProducto =
    document.getElementById("nombreProducto");

const descripcionProducto =
    document.getElementById("descripcionProducto");

const categoriaProducto =
    document.getElementById("categoriaProducto");

const listaProductos =
    document.getElementById("listaProductos");

const estadoProductos =
    document.getElementById("estadoProductos");

const contador =
    document.getElementById("contador");

const mensaje =
    document.getElementById("mensaje");

const errorNombre =
    document.getElementById("errorNombre");

const errorDescripcion =
    document.getElementById("errorDescripcion");

const errorCategoria =
    document.getElementById("errorCategoria");


// ======================================================
// VALIDAR NOMBRE
// ======================================================

function validarNombre() {

    const nombre =
        nombreProducto.value.trim();


    if (nombre === "") {

        nombreProducto.classList.remove("is-valid");

        nombreProducto.classList.add("is-invalid");

        errorNombre.textContent =
            "El nombre es obligatorio.";

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


// ======================================================
// VALIDAR DESCRIPCIÓN
// ======================================================

function validarDescripcion() {

    const descripcion =
        descripcionProducto.value.trim();


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


// ======================================================
// VALIDAR CATEGORÍA
// ======================================================

function validarCategoria() {

    if (categoriaProducto.value === "") {

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


// ======================================================
// EVENTOS DE VALIDACIÓN EN TIEMPO REAL
// ======================================================

nombreProducto.addEventListener(
    "input",
    validarNombre
);

nombreProducto.addEventListener(
    "blur",
    validarNombre
);


descripcionProducto.addEventListener(
    "input",
    validarDescripcion
);

descripcionProducto.addEventListener(
    "blur",
    validarDescripcion
);


categoriaProducto.addEventListener(
    "change",
    validarCategoria
);

categoriaProducto.addEventListener(
    "blur",
    validarCategoria
);


// ======================================================
// EVENTO SUBMIT
// ======================================================

formulario.addEventListener(
    "submit",
    function(evento) {

        // Evita que se recargue la página
        evento.preventDefault();


        // Ejecutar validaciones
        const nombreValido =
            validarNombre();

        const descripcionValida =
            validarDescripcion();

        const categoriaValida =
            validarCategoria();


        // ==================================================
        // CONDICIÓN
        // Solo registra si todos los campos son válidos.
        // ==================================================

        if (
            !nombreValido ||
            !descripcionValida ||
            !categoriaValida
        ) {

            mensaje.className =
                "alert alert-danger";

            mensaje.textContent =
                "No se puede registrar. " +
                "Corrija los campos indicados.";

            return;
        }


        // ==================================================
        // CREAR NUEVO OBJETO
        // ==================================================

        const nuevoProducto = {

            id: Date.now(),

            nombre:
                nombreProducto.value.trim(),

            descripcion:
                descripcionProducto.value.trim(),

            categoria:
                categoriaProducto.value

        };


        // Agregar objeto al arreglo
        productos.push(nuevoProducto);


        // Mostrar mensaje
        mensaje.className =
            "alert alert-success";

        mensaje.textContent =
            "Producto registrado correctamente.";


        // Actualizar contenido
        renderizarProductos();


        // Limpiar formulario
        formulario.reset();


        // Limpiar estilos de validación
        limpiarValidaciones();

    }
);


// ======================================================
// FUNCIÓN PRINCIPAL PARA RENDERIZAR PRODUCTOS
// ======================================================

function renderizarProductos() {

    // Limpiar contenido anterior
    listaProductos.innerHTML = "";


    // Actualizar contador
    contador.textContent =
        productos.length;


    // ==================================================
    // CONDICIÓN
    // Verificar si existen productos.
    // ==================================================

    if (productos.length === 0) {

        estadoProductos.className =
            "alert alert-danger";

        estadoProductos.textContent =
            "No existen productos registrados.";

        return;

    } else {

        estadoProductos.className =
            "alert alert-success";

        estadoProductos.textContent =
            "Actualmente existen " +
            productos.length +
            " productos registrados.";

    }


    // ==================================================
    // ESTRUCTURA REPETITIVA
    // Recorre todos los objetos del arreglo.
    // ==================================================

    productos.forEach(
        function(producto) {


            // Crear columna
            const columna =
                document.createElement("div");

            columna.classList.add(
                "col-md-6",
                "col-lg-4",
                "mb-4"
            );


            // Crear tarjeta
            const tarjeta =
                document.createElement("div");

            tarjeta.classList.add(
                "card",
                "h-100",
                "shadow"
            );


            // Crear cuerpo
            const cuerpo =
                document.createElement("div");

            cuerpo.classList.add(
                "card-body"
            );


            // Crear título
            const titulo =
                document.createElement("h5");

            titulo.classList.add(
                "card-title"
            );

            titulo.textContent =
                producto.nombre;


            // Crear categoría
            const categoria =
                document.createElement("span");

            categoria.classList.add(
                "badge",
                "bg-primary",
                "mb-3"
            );

            categoria.textContent =
                producto.categoria;


            // Crear descripción
            const descripcion =
                document.createElement("p");

            descripcion.classList.add(
                "card-text"
            );

            descripcion.textContent =
                producto.descripcion;


            // Crear botón
            const botonEliminar =
                document.createElement("button");

            botonEliminar.classList.add(
                "btn",
                "btn-danger",
                "btn-sm",
                "mt-3"
            );

            botonEliminar.textContent =
                "Eliminar";


            // ==================================================
            // EVENTO CLICK
            // ==================================================

            botonEliminar.addEventListener(
                "click",
                function() {

                    eliminarProducto(
                        producto.id
                    );

                }
            );


            // ==================================================
            // CONSTRUIR TARJETA
            // ==================================================

            cuerpo.appendChild(titulo);

            cuerpo.appendChild(categoria);

            cuerpo.appendChild(descripcion);

            cuerpo.appendChild(botonEliminar);

            tarjeta.appendChild(cuerpo);

            columna.appendChild(tarjeta);

            listaProductos.appendChild(columna);

        }
    );
}


// ======================================================
// ELIMINAR PRODUCTO
// ======================================================

function eliminarProducto(id) {

    productos =
        productos.filter(
            function(producto) {

                return producto.id !== id;

            }
        );


    renderizarProductos();


    mensaje.className =
        "alert alert-success";

    mensaje.textContent =
        "Producto eliminado correctamente.";
}


// ======================================================
// LIMPIAR VALIDACIONES
// ======================================================

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


// ======================================================
// CARGAR LOS PRODUCTOS AL ABRIR LA PÁGINA
// ======================================================

renderizarProductos();