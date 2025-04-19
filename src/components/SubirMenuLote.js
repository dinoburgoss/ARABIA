import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const productosIniciales = [
  // Hamburguesas
  {
    nombre: 'Clásica', descripcion: 'Carne, queso y pan casero', precio: 2500, imagen: '/img/hamburguesa1.jpg', categoria: 'hamburguesas', activo: true, extras: [
      { nombre: 'Extra queso', precio: 400 }, { nombre: 'Bacon', precio: 500 }, { nombre: 'Huevo', precio: 300 }, { nombre: 'Salsa especial', precio: 200 }
    ]
  },
  {
    nombre: 'Doble Queso', descripcion: 'Doble carne, doble queso', precio: 3200, imagen: '/img/hamburguesa2.jpg', categoria: 'hamburguesas', activo: true, extras: [
      { nombre: 'Extra queso', precio: 400 }, { nombre: 'Bacon', precio: 500 }, { nombre: 'Huevo', precio: 300 }, { nombre: 'Salsa especial', precio: 200 }
    ]
  },
  {
    nombre: 'BBQ Bacon', descripcion: 'Con salsa barbacoa y bacon', precio: 3500, imagen: '/img/hamburguesa3.jpg', categoria: 'hamburguesas', activo: true, extras: [
      { nombre: 'Extra queso', precio: 400 }, { nombre: 'Bacon', precio: 500 }, { nombre: 'Huevo', precio: 300 }, { nombre: 'Salsa BBQ extra', precio: 200 }
    ]
  },
  {
    nombre: 'Veggie', descripcion: 'Hamburguesa de garbanzo y vegetales', precio: 2800, imagen: '/img/hamburguesa4.jpg', categoria: 'hamburguesas', activo: true, extras: [
      { nombre: 'Extra palta', precio: 500 }, { nombre: 'Queso vegano', precio: 400 }, { nombre: 'Tofu', precio: 600 }, { nombre: 'Hummus', precio: 300 }
    ]
  },
  {
    nombre: 'Picante', descripcion: 'Con jalapeños y salsa especial', precio: 3300, imagen: '/img/hamburguesa5.jpg', categoria: 'hamburguesas', activo: true, extras: [
      { nombre: 'Extra jalapeños', precio: 300 }, { nombre: 'Queso cheddar', precio: 400 }, { nombre: 'Bacon', precio: 500 }, { nombre: 'Salsa picante extra', precio: 200 }
    ]
  },

  // Lomitos
  {
    nombre: 'Lomo Clásico', descripcion: 'Lomo con lechuga, tomate y mayonesa', precio: 3700, imagen: '/img/lomo1.jpg', categoria: 'lomitos', activo: true, extras: [
      { nombre: 'Huevo frito', precio: 400 }, { nombre: 'Queso extra', precio: 300 }, { nombre: 'Jamón', precio: 350 }, { nombre: 'Papas dentro', precio: 200 }
    ]
  },
  {
    nombre: 'Lomo Completo', descripcion: 'Con todo lo clásico y más', precio: 4200, imagen: '/img/lomo2.jpg', categoria: 'lomitos', activo: true, extras: [
      { nombre: 'Adicional bacon', precio: 400 }, { nombre: 'Doble carne', precio: 800 }, { nombre: 'Salsa cheddar', precio: 300 }, { nombre: 'Pepinos', precio: 200 }
    ]
  },

  // Pizzas
  {
    nombre: 'Muzzarella', descripcion: 'Masa casera con muzzarella fundida', precio: 2800, imagen: '/img/pizza1.jpg', categoria: 'pizzas', activo: true, extras: [
      { nombre: 'Aceitunas extra', precio: 200 }, { nombre: 'Orégano y ajo', precio: 100 }, { nombre: 'Extra queso', precio: 400 }
    ]
  },
  {
    nombre: 'Napolitana', descripcion: 'Muzzarella, tomate y ajo', precio: 3000, imagen: '/img/pizza2.jpg', categoria: 'pizzas', activo: true, extras: [
      { nombre: 'Jamón', precio: 400 }, { nombre: 'Extra ajo', precio: 100 }, { nombre: 'Tomates cherry', precio: 300 }
    ]
  },

  // Milanesa
  {
    nombre: 'Milanesa al Plato', descripcion: 'Con papas fritas y huevo', precio: 3500, imagen: '/img/milanesa1.jpg', categoria: 'milanesas', activo: true, extras: [
      { nombre: 'Extra huevo', precio: 300 }, { nombre: 'Salsa criolla', precio: 200 }, { nombre: 'Queso gratinado', precio: 400 }
    ]
  },
  {
    nombre: 'Milanesa Napolitana', descripcion: 'Con salsa, jamón y queso', precio: 3900, imagen: '/img/milanesa2.jpg', categoria: 'milanesas', activo: true, extras: [
      { nombre: 'Doble queso', precio: 400 }, { nombre: 'Extra jamón', precio: 300 }, { nombre: 'Papas extra', precio: 250 }
    ]
  },

  // Bebidas
  {
    nombre: 'Coca Cola 500ml', descripcion: 'Bebida fría', precio: 800, imagen: '/img/coca500.jpg', categoria: 'bebidas', activo: true, extras: []
  },
  {
    nombre: 'Agua saborizada', descripcion: 'Sabor limón o naranja', precio: 700, imagen: '/img/agua.jpg', categoria: 'bebidas', activo: true, extras: []
  },

  // Cervezas
  {
    nombre: 'Cerveza Lager', descripcion: 'Cerveza ligera y refrescante', precio: 500, imagen: '/img/cerveza_lager.jpg', categoria: 'cervezas', activo: true, extras: []
  },
  {
    nombre: 'Cerveza IPA', descripcion: 'Cerveza con un sabor amargo y afrutado', precio: 600, imagen: '/img/cerveza_ipa.jpg', categoria: 'cervezas', activo: true, extras: []
  }
];

const SubirMenuLote = () => {
  const subirProductos = async () => {
    try {
      for (const producto of productosIniciales) {
        await addDoc(collection(db, 'menu'), producto);
      }
      alert('Productos cargados correctamente a Firestore');
    } catch (error) {
      console.error('Error al subir productos:', error);
      alert('Error al subir productos');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Subir Menú Inicial</h2>
      <button
        onClick={subirProductos}
        style={{ padding: '10px 20px', backgroundColor: '#4FC3F7', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Subir productos a Firestore
      </button>
    </div>
  );
};

export default SubirMenuLote;
