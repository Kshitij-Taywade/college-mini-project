let theme = document.querySelector(".home");
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



// Select form
const form = document.querySelector(".register-form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    // Get input values
    const profile = document.getElementById("profile").files[0];
    const name = document.getElementById("name").value.trim();
    const enroll = document.getElementById("enroll").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const dept = document.getElementById("dept").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    //  Basic Validation
    if (!name || !enroll || !email || !mobile || !dept || !password || !confirm) {
        alert("Please fill all required fields!");
        return;
    }

    //  Mobile validation (10 digits)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
        alert("Enter valid 10 digit mobile number!");
        return;
    }

    //  Password match check
    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    // Create FormData (for file upload)
    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("name", name);
    formData.append("enroll", enroll);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("dept", dept);
    formData.append("password", password);

    try {
        //  Replace with your Render backend URL
        const response = await fetch("https://questionpaperapplication.onrender.com/api/auth/register", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        const result = await response.json();

        alert("Registration Successful!");
        console.log(result);

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Error registering student.");
    }
});