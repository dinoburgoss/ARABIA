// src/utils/guardarUsuario.js

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const guardarUsuarioEnFirestore = async (usuario) => {
  if (!usuario) return;

  const ref = doc(db, "usuarios", usuario.uid);

  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    await setDoc(ref, {
      uid: usuario.uid,
      nombre: usuario.displayName || "",
      email: usuario.email,
      foto: usuario.photoURL || "",
      rol: "cliente", // 👈 valor por defecto (podés cambiarlo a "admin" desde Firestore)
      creado: new Date().toISOString()
    });
  }
};
