// Select elements (NO HTML changes)
const form = document.querySelector("form");
const userTypeSelect = document.querySelector("select");
const usernameInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

let theme = document.querySelector(".theme");
let body = document.querySelector("body");


let color = "white";
theme.addEventListener("click", () => {
    if (color === "white") {
        body.style.backgroundColor = "black";
        body.style.color = "white";
        color = "dark";
    } else {
        body.style.backgroundColor = "white";
        body.style.color = "black";
        color = "white";

    }

})


// Backend API URL (change later if needed)
const API_URL = "https://questionpaperapplication.onrender.com/api/auth/login";

// Form submit handler
form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop page reload

    const userType = userTypeSelect.value;
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!userType || !username || !password) {
        alert("Please fill all fields");
        return;
    }

    const loginData = {
        // role: userType,
        username: username,
        password: password
    };
    console.log(logindata)

    // Send data to backend

    fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Invalid login");
            }
            return response.json();
        })
        .then((data) => {
            // Example backend response:
            // { success: true, token: "...", role: "Admin" }

            alert("Login Successful");

            // Save token (optional)
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // Redirect based on role
            if (data.role === "Admin") {
                window.location.href = "/admin/dashboard.html";
            } else {
                window.location.href = "/student/dashboard.html";
            }
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});