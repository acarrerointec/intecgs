import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Configuración de Firebase
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

// Manejo del formulario
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Redirige a disney.html
      window.location.href = "./disneyplus/disney.html";
    })
    .catch((error) => {
      errorMessage.textContent = "Error: " + error.message;
    });
});
