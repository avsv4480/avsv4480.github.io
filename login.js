const firebaseConfig = {
    apiKey: "AIzaSyAIHidkhUrhfxULokIVv1UnKPtiqPE0UEw",
    authDomain: "kidooo-puzzle.firebaseapp.com",
    projectId: "kidooo-puzzle",
    storageBucket: "kidooo-puzzle.firebasestorage.app",
    messagingSenderId: "477426038671",
    appId: "1:477426038671:web:aca795c9bc85c8e5a07dfa",
    measurementId: "G-2TX1E208NZ"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  document.getElementById("google-login").onclick = function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        db.collection("players").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          lastLogin: new Date()
        }, { merge: true });
        window.location.href = "level2.html";
      })
      .catch((error) => {
        showMessage(error.message);
      });
  };
  
  document.getElementById("email-login").onclick = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection("players").doc(result.user.uid).set({
          email: result.user.email,
          lastLogin: new Date()
        }, { merge: true });
        window.location.href = "level2.html";
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
              db.collection("players").doc(result.user.uid).set({
                email: result.user.email,
                createdAt: new Date()
              });
              window.location.href = "level2.html";
            })
            .catch(err => showMessage(err.message));
        } else {
          showMessage(error.message);
        }
      });
  };
  
  function showMessage(msg) {
    document.getElementById("message").textContent = msg;
  }
  