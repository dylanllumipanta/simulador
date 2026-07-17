function calcular() {

    // Datos financieros
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent =
        "$ " + disponible.toFixed(2);

    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent =
        "$ " + capacidadPago.toFixed(2);

    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent =
        "$ " + interes.toFixed(2);

    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent =
        "$ " + total.toFixed(2);

    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent =
        "$ " + cuota.toFixed(2);

    let aprobado = aprobarCredito(capacidadPago, cuota);

    if (aprobado) {
        document.getElementById("spnEstadoCredito").textContent =
            "CRÉDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").textContent =
            "CRÉDITO RECHAZADO";
    }
}

function reiniciar(){

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
}

window.onload = function () {

    document.getElementById("btnCalcularCredito").addEventListener("click", calcular);

    document.getElementById("btnReiniciar").addEventListener("click", reiniciar);

};