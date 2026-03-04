let selectSem = document.querySelector(".semester");
let selectSub = document.querySelector("subject");

selectSem.addEventListener("change", () => {

    let selectedSem = selectSem.value;

    console.log(selectedSem);
})

// CHANGE THIS TO YOUR REAL RENDER BACKEND URL
const API_BASE_URL = "https://questionpaperapplication.onrender.com/api/question-papers";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".find-paper-form");

    // Create results container dynamically
    const resultsDiv = document.createElement("div");
    resultsDiv.id = "results";
    resultsDiv.style.marginTop = "30px";
    document.querySelector(".find-paper-section").appendChild(resultsDiv);

    form.addEventListener("submit", async(event) => {
        event.preventDefault(); // Stop page reload

        // Get values
        const branch = document.getElementById("branch").value.trim();
        const year = document.getElementById("year").value.trim();
        const semester = document.getElementById("semester").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const paperType = document.getElementById("paper-type").value.trim();

        // Validation
        if (!branch || !year || !semester || !subject || !paperType) {
            showMessage("Please fill all fields.", true);
            return;
        }

        showMessage("Loading papers...");

        try {
            const response = await fetch(`${API_BASE_URL}/api/papers/search`, {
                method: "POST", // Change to GET if your backend uses GET
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    branch: branch,
                    year: year,
                    semester: semester,
                    subject: subject,
                    paperType: paperType
                })
            });

            if (!response.ok) {
                throw new Error("Server returned error");
            }

            const papers = await response.json();

            displayPapers(papers);

        } catch (error) {
            console.error(error);
            showMessage("Failed to fetch papers. Please try again later.", true);
        }
    });


    // Display Papers

    function displayPapers(papers) {

        if (!papers || papers.length === 0) {
            showMessage("No papers found.");
            return;
        }

        resultsDiv.innerHTML = papers.map(paper => `
            <div style="
                border:1px solid #ddd;
                padding:15px;
                margin-bottom:15px;
                border-radius:8px;
                background:#f9f9f9;
            ">
                <h3>${paper.subject}</h3>
                <p><strong>Branch:</strong> ${paper.branch}</p>
                <p><strong>Year:</strong> ${paper.year}</p>
                <p><strong>Semester:</strong> ${paper.semester}</p>
                <p><strong>Type:</strong> ${paper.paperType}</p>
                <a href="${paper.fileUrl}" target="_blank" style="
                    display:inline-block;
                    margin-top:10px;
                    padding:8px 12px;
                    background:#007bff;
                    color:#fff;
                    text-decoration:none;
                    border-radius:5px;
                ">
                    Download Paper
                </a>
            </div>
        `).join("");
    }


    // Show Message

    function showMessage(message, isError = false) {
        resultsDiv.innerHTML = `
            <p style="color:${isError ? "red" : "black"}; font-weight:500;">
                ${message}
            </p>
        `;
    }

});