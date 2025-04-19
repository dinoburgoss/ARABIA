import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const Header = () => {
  const { usuario, logout } = useAuth();

  if (!usuario) return null;

  const nombreVisible = usuario.displayName || usuario.email;
  const fotoPerfil = usuario.photoURL;

  return (
    <div style={styles.contenedor}>
      <div style={styles.infoUsuario}>
        {fotoPerfil && (
          <img
            src={fotoPerfil}
            alt="perfil"
            style={styles.imagen}
          />
        )}
        <span style={styles.nombre}>{nombreVisible}</span>
      </div>
      <button onClick={logout} style={styles.boton}>
        <LogOut size={16} style={{ marginRight: "6px" }} />
        Cerrar sesión
      </button>
    </div>
  );
};

const styles = {
  contenedor: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(to right, #1e1e1e, #333333)",
    color: "#fff",
    padding: "12px 20px",
    flexWrap: "wrap",
    gap: "10px",
    borderBottom: "1px solid #444"
  },
  infoUsuario: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  imagen: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #4FC3F7"
  },
  nombre: {
    fontSize: "14px",
    fontWeight: "500"
  },
  boton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center"
  }
};

export default Header;
