function validarFormulario() {

    let valido = true;

    // Limpiar mensajes
    document.getElementById("error_txtIngresos").textContent = "";
    document.getElementById("error_txtEgresos").textContent = "";
    document.getElementById("error_txtMonto").textContent = "";
    document.getElementById("error_txtPlazo").textContent = "";
    document.getElementById("error_txtTasaInteres").textContent = "";

    let ingresos = document.getElementById("txtIngresos").value.trim();
    let egresos = document.getElementById("txtEgresos").value.trim();
    let monto = document.getElementById("txtMonto").value.trim();
    let plazo = document.getElementById("txtPlazo").value.trim();
    let tasa = document.getElementById("txtTasaInteres").value.trim();

    // INGRESOS
    if (ingresos === "") {
        document.getElementById("error_txtIngresos").textContent = "Ingrese los ingresos";
        valido = false;
    } else if (isNaN(ingresos)) {
        document.getElementById("error_txtIngresos").textContent = "Solo números";
        valido = false;
    } else if (parseFloat(ingresos) <= 0) {
        document.getElementById("error_txtIngresos").textContent = "Debe ser mayor que 0";
        valido = false;
    } else if (parseFloat(ingresos) > 1000000) {
        document.getElementById("error_txtIngresos").textContent = "Máximo $1 000 000";
        valido = false;
    }

    // EGRESOS
    if (egresos === "") {
        document.getElementById("error_txtEgresos").textContent = "Ingrese los egresos";
        valido = false;
    } else if (isNaN(egresos)) {
        document.getElementById("error_txtEgresos").textContent = "Solo números";
        valido = false;
    } else if (parseFloat(egresos) < 0) {
        document.getElementById("error_txtEgresos").textContent = "No puede ser negativo";
        valido = false;
    } else if (!isNaN(ingresos) && parseFloat(egresos) > parseFloat(ingresos)) {
        document.getElementById("error_txtEgresos").textContent = "No puede ser mayor que los ingresos";
        valido = false;
    }

    // MONTO
    if (monto === "") {
        document.getElementById("error_txtMonto").textContent = "Ingrese el monto";
        valido = false;
    } else if (isNaN(monto)) {
        document.getElementById("error_txtMonto").textContent = "Solo números";
        valido = false;
    } else if (parseFloat(monto) < 100) {
        document.getElementById("error_txtMonto").textContent = "Mínimo $100";
        valido = false;
    } else if (parseFloat(monto) > 100000) {
        document.getElementById("error_txtMonto").textContent = "Máximo $100000";
        valido = false;
    }

    // PLAZO
    if (plazo === "") {
        document.getElementById("error_txtPlazo").textContent = "Ingrese el plazo";
        valido = false;
    } else if (!/^\d+$/.test(plazo)) {
        document.getElementById("error_txtPlazo").textContent = "Solo números enteros";
        valido = false;
    } else if (parseInt(plazo) < 1 || parseInt(plazo) > 30) {
        document.getElementById("error_txtPlazo").textContent = "Entre 1 y 30 años";
        valido = false;
    }

    // TASA
    if (tasa === "") {
        document.getElementById("error_txtTasaInteres").textContent = "Ingrese la tasa";
        valido = false;
    } else if (isNaN(tasa)) {
        document.getElementById("error_txtTasaInteres").textContent = "Solo números";
        valido = false;
    } else if (parseFloat(tasa) < 1 || parseFloat(tasa) > 50) {
        document.getElementById("error_txtTasaInteres").textContent = "Entre 1% y 50%";
        valido = false;
    }

    return valido;
}

function calcular() {

    if (!validarFormulario()) {
        return;
    }

    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "$ " + disponible.toFixed(2);

    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "$ " + capacidadPago.toFixed(2);

    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "$ " + interes.toFixed(2);

    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "$ " + total.toFixed(2);

    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "$ " + cuota.toFixed(2);

    if (aprobarCredito(capacidadPago, cuota)) {
        document.getElementById("spnEstadoCredito").textContent = "CRÉDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").textContent = "CRÉDITO RECHAZADO";
    }
}

function reiniciar() {

    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";
    document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";

    document.getElementById("error_txtIngresos").textContent = "";
    document.getElementById("error_txtEgresos").textContent = "";
    document.getElementById("error_txtMonto").textContent = "";
    document.getElementById("error_txtPlazo").textContent = "";
    document.getElementById("error_txtTasaInteres").textContent = "";
}

window.onload = function () {

    document.getElementById("btnCalcularCredito").addEventListener("click", calcular);
    document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

};