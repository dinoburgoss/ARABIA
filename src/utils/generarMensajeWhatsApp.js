const generarMensajeWhatsApp = (carrito) => {
  if (!Array.isArray(carrito)) {
    console.error('El carrito no es un array:', carrito);
    return '⚠️ Error al generar el mensaje. El carrito está malformado.';
  }

  let mensaje = '';
  let total = 0;

  carrito.forEach((item) => {
    const subtotalBase = item.precio * item.cantidad;
    let subtotalExtras = 0;

    mensaje += `🔹 *${item.nombre}* x${item.cantidad} - $${subtotalBase.toLocaleString()}\n`;

    if (item.extras && item.extras.length > 0) {
      mensaje += `   🧂 Extras:\n`;
      item.extras.forEach(extra => {
        const extraTotal = extra.precio * item.cantidad;
        subtotalExtras += extraTotal;
        mensaje += `      • ${extra.nombre} (+$${extraTotal.toLocaleString()})\n`;
      });
    }

    total += subtotalBase + subtotalExtras;
    mensaje += '\n';
  });

  mensaje += `💰 *Total:* $${total.toLocaleString()}\n`;
  mensaje += '\n📍 Enviado desde la App Burger Queen';
  return mensaje;
};

export default generarMensajeWhatsApp;
