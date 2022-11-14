// Variable to count number of attempts.
let attempt = 3;

// Below function Executes on click of login button.
function validate() {
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  if (username == "Formget" && password == "formget#123") {
    alert("Login successfully");
    window.location = "success.html"; // Redirecting to other page.
    return false;
  } else {
    attempt--; // Decrementing by one.
    alert("You have left " + attempt + " attempt;");
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
      document.getElementById("login-username").disabled = true;
      document.getElementById("login-password").disabled = true;
      document.getElementById("loginCont").disabled = true;
      return false;
    }
  }
}
