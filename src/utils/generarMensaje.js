const generarMensaje = (carrito) => {
    if (carrito.length === 0) {
      return "No hay productos en el carrito.";
    }
  
    let mensaje = "🛍️ *Tu pedido en Burger Queen:*\n\n";
  
    carrito.forEach((item) => {
      mensaje += `🍔 *${item.nombre}* x${item.cantidad}\n`;
  
      if (item.extras && item.extras.length > 0) {
        mensaje += `➕ Extras: ${item.extras.join(', ')}\n`;
      }
  
      mensaje += `💰 Precio: $${(item.precio * item.cantidad).toLocaleString()}\n\n`;
    });
  
    const total = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  
    mensaje += `🧾 *Total: $${total.toLocaleString()}*\n\n`;
    mensaje += `📲 Enviado desde la app de *Burger Queen*`;
  
    return mensaje;
  };
  
  export default generarMensaje;
  