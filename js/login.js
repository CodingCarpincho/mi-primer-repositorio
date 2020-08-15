//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
}
);

function guardarLogin(user, pass) {
    if(user.trim() === ""|| pass.trim() === "") {
        alert("Ingresa datos")
    } else {
        location.href="login.html"
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    location.href="login.html"
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      location.href="index.html"
    });
  }