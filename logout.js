import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Configuración de Firebase (la misma que en `app.js`)
const firebaseConfig = {
  apiKey: "AIzaSyBeV5vzT4UEmowHfblmTV_T9oHH7yKfs68",
  authDomain: "intecgs.firebaseapp.com",
  projectId: "intecgs",
  storageBucket: "intecgs.firebasestorage.app",
  messagingSenderId: "882822026265",
  appId: "1:882822026265:web:09d20947877c487ea6c688",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Botón de cerrar sesión
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Sesión cerrada exitosamente.");
      // Redirige al usuario de vuelta al login
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
});
