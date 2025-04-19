import React from 'react';
import AdminTitulo from './AdminTitulo';
import AdminHorarios from './AdminHorarios';
import AdminCuenta from './AdminCuenta';
import AdminRedes from './AdminRedes';
import AdminLogo from './AdminLogo';
import AdminFormasPago from './AdminFormasPago';
import AdminDelivery from './AdminDelivery';
import AdminMenu from './AdminMenu';

const AdminPanelIntegrado = () => {
  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto', color: '#fff' }}>
      <h1 style={{ color: '#FACC15', textAlign: 'center', marginBottom: 30 }}>📋 Panel de Administración Completo</h1>

      <section style={{ marginBottom: 50 }}>
        <AdminTitulo />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminHorarios />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminCuenta />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminRedes />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminLogo />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminFormasPago />
      </section>

      <section style={{ marginBottom: 50 }}>
        <AdminDelivery />
      </section>

      <section>
        <AdminMenu />
      </section>
    </div>
  );
};

export default AdminPanelIntegrado;
