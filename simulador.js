function calcular() {
    let ingresos = parseFloat(recuperarFloat("txtIngresos"));
    let egresos = parseFloat(recuperarFloat("txtEgresos"));

    let disponible = calcularDisponible(ingresos, egresos);
    mostrarTexto("lblDisponibleValor", disponible.toFixed(2));

    let capacidad = calcularCapacidadPago(disponible);
    mostrarTexto("lblCapacidadValor", capacidad.toFixed(2));

    let monto = parseInt(recuperarInt("txtMonto"));
    let plazo = parseInt(recuperarInt("txtPlazo"));
    let tasa = parseInt(recuperarInt("txtTasa"));

    let interes = calcularInteresSimple(monto, tasa, plazo);
    mostrarTexto("lblInteresValor", interes.toFixed(2));

    let total = calcularTotalPagar(monto, interes);
    mostrarTexto("lblTotalValor", total.toFixed(2));

    let cuota = calcularCuotaMensual(total, plazo);
    mostrarTexto("lblCuotaValor", cuota.toFixed(2));

    let aprobado = aprobarCredito(capacidad, cuota);

    if (aprobado) {
        mostrarTexto("lblResultado", "CRÉDITO APROBADO");
    } else {
        mostrarTexto("lblResultado", "CRÉDITO RECHAZADO");
    }
}