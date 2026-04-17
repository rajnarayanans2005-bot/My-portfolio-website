const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

if (togglePassword) {
    togglePassword.addEventListener("click", function () {
        passwordField.type =
            passwordField.type === "password" ? "text" : "password";
    });
}
document.getElementById("loginBtn").addEventListener("click", async function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Sending login request...");

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        console.log("SERVER RESPONSE =", result);

        if (result.success) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "admin.html";
        } else {
            document.getElementById("errorMsg").innerText =
                "Invalid username or password";
        }
    } catch (error) {
        console.log("LOGIN ERROR =", error);
    }
});