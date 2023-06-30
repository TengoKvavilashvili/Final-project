const form = document.getElementById('signin');
const usernameInput = document.getElementById('user');
const passwordInput = document.getElementById('pass');
const submitButton = document.getElementById('submit');


form.addEventListener('submit', function (event) {
   event.preventDefault();

   const username = usernameInput.value;
   const password = passwordInput.value;


   if (username === '' || password === '') {

      document.getElementById("error").innerHTML = "Please enter both username and password.";
   } else {
      window.location.href = 'products.html';
   }

   window.localStorage.setItem('username', username);
   window.localStorage.setItem('password', password);

});


const storedUsername = window.localStorage.getItem('username');
const storedPassword = window.localStorage.getItem('password');

if (storedUsername && storedPassword) {
   console.log(storedUsername, storedPassword);
}