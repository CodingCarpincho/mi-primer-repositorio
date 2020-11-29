
function saveLogin(user, pass) {
    if(user.trim() === ""|| pass.trim() === "") {
        alert("Ingresar datos")
    } else {
      localStorage.setItem("user", user.trim());
      localStorage.setItem("pass", pass.trim());
      location.href="login.html";
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    location.href="login.html";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      document.location.href = "index.html";
    });
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
});
