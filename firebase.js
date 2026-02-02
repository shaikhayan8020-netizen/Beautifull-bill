// 1️⃣ Firebase config (apne project keys se replace karo)
const firebaseConfig = {
  apiKey: "APNI_API_KEY",
  authDomain: "APNI_PROJECT.firebaseapp.com",
  projectId: "APNI_PROJECT_ID",
  storageBucket: "APNI_PROJECT.appspot.com",
  messagingSenderId: "APNA_SENDER_ID",
  appId: "APNA_APP_ID"
};

// 2️⃣ Firebase initialize
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 3️⃣ Google login function
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
    .then((result)=>{
        const user = result.user;
        // User info console me check karo
        console.log("Google login successful", user);

        // LocalStorage me user email save karo
        localStorage.setItem("currentUser", user.email);

        // Dashboard page redirect
        window.location.href = "dashboard.html";
    })
    .catch((error)=>{
        // Error message show karo
        alert("Login failed: " + error.message);
        console.error(error);
    });
}

// 4️⃣ Optional: check if user is already logged in
auth.onAuthStateChanged((user)=>{
    if(user){
        console.log("User already logged in:", user.email);
        // Agar dashboard pe nahi hai, redirect kar do
        if(window.location.pathname.includes("index.html") || window.location.pathname.includes("signup.html")){
            window.location.href = "dashboard.html";
        }
    }
});