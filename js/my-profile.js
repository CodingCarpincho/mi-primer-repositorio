var userData = {};

function guardarUser() {
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var age = document.getElementById('age').value;
  var email = document.getElementById('email').value;
  var tel = document.getElementById('contel').value;

  //tomo los valores de cada campo del form y les asigno una variable
  //entonces a esas variables las mando al array userData
  userData.name = name;
  userData.surname = surname;
  userData.age = age;
  userData.email = email;
  userData.tel = tel;

  localStorage.setItem('userData', JSON.stringify(userData));
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
      var profileData = JSON.parse(localStorage.getItem('userData'));
      document.getElementById('name').value = profileData.name;
      document.getElementById('surname').value = profileData.surname;
      document.getElementById('age').value = profileData.age;
      document.getElementById('email').value = profileData.email;
      document.getElementById('contel').value = profileData.tel;
});