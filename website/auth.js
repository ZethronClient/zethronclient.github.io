import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// BURAYI FIREBASE'DEN ALDIĞIN KENDİ BLOKUNLA DEĞİŞTİR
  const firebaseConfig = {
    apiKey: "AIzaSyAO5GcRw3enTiLHEF4V39sOEAsD6NAUjdU",
    authDomain: "zethron.firebaseapp.com",
    projectId: "zethron",
    storageBucket: "zethron.firebasestorage.app",
    messagingSenderId: "488130546274",
    appId: "1:488130546274:web:9fa33404dd7ed562055f3b",
    measurementId: "G-4HSXYQJJEN"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// KAYIT OLMA SİSTEMİ
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: username
                }).then(() => {
                    alert("Zethron Client'a hoş geldin! Hesabın başarıyla oluşturuldu.");
                    window.location.href = "login.html";
                });
            })
            .catch((error) => {
                alert("Kayıt Hatası: " + error.message);
            });
    });
}

// GİRİŞ YAPMA SİSTEMİ
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Giriş Başarılı! Hoş geldin: " + userCredential.user.displayName);
            })
            .catch((error) => {
                alert("Giriş Hatası: " + error.message);
            });
    });
}
