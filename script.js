
let calificaciones = [];
let ventas = [];

// EJERCICIO 1: CREAR CAMPOS PARA LAS CALIFICACIONES

function crearCamposNotas() {
  let cantidad = Number(document.getElementById("cantidadNotas").value);
  let contenedor = document.getElementById("camposNotas");
  let resultado = document.getElementById("resultadoNotas");

  contenedor.innerHTML = "";
  resultado.textContent = "Los resultados aparecerán aquí.";

  if (cantidad % 1 != 0 || cantidad < 1 || cantidad > 100) {
    resultado.innerHTML = '<span class="error">Ingrese una cantidad entera entre 1 y 100.</span>';
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    let campo = document.createElement("div");

    campo.innerHTML =
      '<label for="nota' + i + '">Evaluación ' + (i + 1) + '</label>' +
      '<input type="number" id="nota' + i +
      '" min="0" max="10" step="any" placeholder="0 a 10">';

    contenedor.appendChild(campo);
  }
}


// EJERCICIO 1: ANALIZAR LAS CALIFICACIONES

function analizarNotas() {
  let cantidad = Number(document.getElementById("cantidadNotas").value);
  let resultado = document.getElementById("resultadoNotas");

  calificaciones = [];

  if (cantidad % 1 != 0 || cantidad < 1 || cantidad > 100) {
    resultado.innerHTML = '<span class="error">Ingrese una cantidad válida de evaluaciones.</span>';
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    let campo = document.getElementById("nota" + i);

    if (!campo) {
      resultado.innerHTML = '<span class="error">Primero presione "Crear campos".</span>';
      return;
    }

    let nota;

    if (campo.value.trim() == "") {
      resultado.innerHTML = '<span class="error">Complete todas las calificaciones.</span>';
      return;
    } else {
      nota = Number(campo.value);
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
      resultado.innerHTML =
        '<span class="error">La evaluación ' + (i + 1) +
        ' debe tener una nota entre 0 y 10.</span>';
      return;
    }

    calificaciones[i] = nota;
  }

  let suma = 0;
  let maxima = calificaciones[0];
  let minima = calificaciones[0];
  let aprobadas = 0;
  let lista = "";

  for (let i = 0; i < calificaciones.length; i++) {
    suma = suma + calificaciones[i];

    if (calificaciones[i] > maxima) {
      maxima = calificaciones[i];
    }

    if (calificaciones[i] < minima) {
      minima = calificaciones[i];
    }

    if (calificaciones[i] >= 7) {
      aprobadas++;
    }

    if (i > 0) {
      lista = lista + ", ";
    }

    lista = lista + calificaciones[i];
  }

  let promedio = suma / calificaciones.length;

  resultado.innerHTML =
    "<strong>Calificaciones registradas:</strong> " + lista + "<br>" +
    "<strong>Promedio:</strong> " + promedio.toFixed(2) + "<br>" +
    "<strong>Calificación máxima:</strong> " + maxima + "<br>" +
    "<strong>Calificación mínima:</strong> " + minima + "<br>" +
    "<strong>Evaluaciones con nota mayor o igual a 7:</strong> " + aprobadas;
}


// EJERCICIO 2: CREAR CAMPOS PARA LAS VENTAS

function crearCamposVentas() {
  let cantidad = Number(document.getElementById("cantidadDias").value);
  let contenedor = document.getElementById("camposVentas");
  let resultado = document.getElementById("resultadoVentas");

  contenedor.innerHTML = "";
  resultado.textContent = "Los resultados aparecerán aquí.";

  if (cantidad % 1 != 0 || cantidad < 1 || cantidad > 100) {
    resultado.innerHTML = '<span class="error">Ingrese una cantidad entera entre 1 y 100.</span>';
    return;
  }

  for (let i = 0; i < cantidad; i++) {
    let campo = document.createElement("div");

    campo.innerHTML =
      '<label for="venta' + i + '">Día ' + (i + 1) + ' ($)</label>' +
      '<input type="number" id="venta' + i +
      '" min="0" step="any" placeholder="0.00">';

    contenedor.appendChild(campo);
  }
}


// EJERCICIO 2: ANALIZAR LAS VENTAS

function analizarVentas() {
  let cantidad = Number(document.getElementById("cantidadDias").value);
  let resultado = document.getElementById("resultadoVentas");

  ventas = [];

  if (cantidad % 1 != 0 || cantidad < 1 || cantidad > 100) {
    resultado.innerHTML = '<span class="error">Ingrese una cantidad válida de días.</span>';
    return;
  }

  // Guardar las ventas en un único vector

  for (let i = 0; i < cantidad; i++) {
    let campo = document.getElementById("venta" + i);

    if (!campo) {
      resultado.innerHTML = '<span class="error">Primero presione "Crear campos".</span>';
      return;
    }

    let valor;

    if (campo.value.trim() == "") {
      resultado.innerHTML = '<span class="error">Complete todas las ventas.</span>';
      return;
    } else {
      valor = Number(campo.value);
    }

    if (isNaN(valor) || valor < 0) {
      resultado.innerHTML =
        '<span class="error">La venta del día ' + (i + 1) +
        ' debe ser igual o mayor que cero.</span>';
      return;
    }

    ventas[i] = valor;
  }

  // Calcular total, venta máxima y días con ventas mayores a $100

  let total = 0;
  let ventaMaxima = ventas[0];
  let diaMaximo = 1;
  let mayores100 = 0;

  for (let i = 0; i < ventas.length; i++) {
    total = total + ventas[i];

    if (ventas[i] > ventaMaxima) {
      ventaMaxima = ventas[i];
      diaMaximo = i + 1;
    }

    if (ventas[i] > 100) {
      mayores100++;
    }
  }

  // Calcular el promedio y los días por debajo del promedio

  let promedio = total / ventas.length;
  let menoresPromedio = 0;

  for (let i = 0; i < ventas.length; i++) {
    if (ventas[i] < promedio) {
      menoresPromedio++;
    }
  }

  // Mostrar las ventas registradas

  let detalle = "";

  for (let i = 0; i < ventas.length; i++) {
    detalle = detalle + "Día " + (i + 1) +
      ": $" + ventas[i].toFixed(2) + "<br>";
  }

  let meta;

  if (total >= 500) {
    meta = "Alcanzada";
  } else {
    meta = "No alcanzada";
  }

  resultado.innerHTML =
    "<strong>Ventas registradas:</strong><br>" + detalle + "<br>" +
    "<strong>Total vendido:</strong> $" + total.toFixed(2) + "<br>" +
    "<strong>Promedio diario:</strong> $" + promedio.toFixed(2) + "<br>" +
    "<strong>Venta más alta:</strong> $" + ventaMaxima.toFixed(2) +
    ", correspondiente al día " + diaMaximo + "<br>" +
    "<strong>Días con ventas superiores a $100:</strong> " + mayores100 + "<br>" +
    "<strong>Días con ventas inferiores al promedio:</strong> " +
    menoresPromedio + "<br>" +
    "<strong>Meta de $500:</strong> " + meta;
}
