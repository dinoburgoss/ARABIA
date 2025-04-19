import React, { useState } from 'react';
import LocationButton from './LocationButton';

function CheckoutForm({ cart, location, setLocation }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [showCBU, setShowCBU] = useState(false);
  const titular = "Juan Pérez";
  const cbu = "1234567890123456789012";

  const handleConfirm = () => {
    let msg = `*Pedido Burger Queen*\n\n`;
    cart.forEach(item => {
      msg += `• ${item.name} - $${item.price}\n`;
    });
    msg += `\nTotal: $${cart.reduce((acc, item) => acc + item.price, 0)}`;
    msg += `\n\nMétodo de pago: ${paymentMethod}`;
    if (paymentMethod === "transferencia") {
      msg += `\nCBU: ${cbu}\nTitular: ${titular}`;
      msg += `\nPor favor, enviar comprobante de pago.`;
    }
    if (address) msg += `\nDirección: ${address}`;
    if (location) msg += `\nUbicación: https://maps.google.com/?q=${location.lat},${location.lon}`;

    const url = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2>Finalizar pedido</h2>

      <select onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">Método de pago</option>
        <option value="efectivo">Efectivo</option>
        <option value="retiro">Pago al retirar</option>
        <option value="transferencia">Transferencia</option>
      </select>

      {paymentMethod === "transferencia" && (
        <div style={{ background: "#333", padding: "10px", borderRadius: "5px" }}>
          <p>CBU: {cbu}</p>
          <p>Titular: {titular}</p>
        </div>
      )}

      <br />

      <label>¿Delivery?</label>
      <input type="text" placeholder="Dirección" onChange={e => setAddress(e.target.value)} />

      <LocationButton setLocation={setLocation} />

      <br />
      <button onClick={handleConfirm}>Confirmar pedido</button>
    </div>
  );
}

export default CheckoutForm;
