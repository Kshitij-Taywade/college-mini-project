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