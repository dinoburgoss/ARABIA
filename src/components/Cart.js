import React from 'react';

function Cart({ cart, clearCart }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Carrito</h2>
      {cart.map((item, i) => (
        <div key={i}>{item.name} - ${item.price}</div>
      ))}
      <h3>Total: ${total}</h3>
      {cart.length > 0 && <button onClick={clearCart}>Vaciar carrito</button>}
    </div>
  );
}

export default Cart;
