// Firebase SDK modüllerini çağırıyoruz
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// !!! BURAYI KENDİ FIREBASE PROJE BİLGİLERİNLE DEĞİŞTİR !!!
  const firebaseConfig = {
    apiKey: "AIzaSyAO5GcRw3enTiLHEF4V39sOEAsD6NAUjdU",
    authDomain: "zethron.firebaseapp.com",
    projectId: "zethron",
    storageBucket: "zethron.firebasestorage.app",
    messagingSenderId: "488130546274",
    appId: "1:488130546274:web:9fa33404dd7ed562055f3b",
    measurementId: "G-4HSXYQJJEN"
  };
// Firebase'i başlatıyoruz
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---------------------------------------------------------
// KAYIT OLMA SİSTEMİ (Register)
// ---------------------------------------------------------
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engelle

        const username = document.getElementById("register-username").value.strip ? document.getElementById("register-username").value.strip() : document.getElementById("register-username").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        // Firebase Auth ile kullanıcı oluşturma
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Oyuncu adını (Kullanıcı adını) Firebase profiline kaydediyoruz
                updateProfile(user, {
                    displayName: username
                }).then(() => {
                    alert("Hesabın başarıyla oluşturuldu, Zethron dünyasına hoş geldin! Giriş sayfasına yönlendiriliyorsun.");
                    window.location.href = "login.html";
                });
            })
            .catch((error) => {
                alert("Kayıt hatası: " + error.message);
            });
    });
}

// ---------------------------------------------------------
// GİRİŞ YAPMA SİSTEMİ (Login)
// ---------------------------------------------------------
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Firebase Auth ile giriş kontrolü
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(`Giriş başarılı! Hoş geldin, ${user.displayName || 'Savaşçı'}. Launcher'ı açıp oyuna bağlanabilirsin.`);
                
                // İleride web panel veya indirme sayfasına yönlendirmek istersen:
                // window.location.href = "../index.html"; 
            })
            .catch((error) => {
                alert("Giriş başarısız: " + error.message);
            });
    });
}
