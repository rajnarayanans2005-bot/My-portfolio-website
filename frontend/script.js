console.log("Portfolio website started");


const resumeButton = document.getElementById("resumeBtn");
resumeButton.addEventListener("click", function () {
    alert("Resume downloading...");
});
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
        
    };
    const sendButton = document.getElementById("sendBtn");
     sendButton.addEventListener("click", function () {
    alert("Message sent...");

                const response = await fetch("https://my-portfolio-website-2-y6lb.onrender.com/feedback", {
                    method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
});
window.addEventListener("load", async function () {
    try {
        const response = await fetch("https://my-portfolio-website-2-y6lb.onrender.com/visit");
        const data = await response.json();

        console.log("VISITOR DATA =", data);

        if (data.count !== undefined) {
            document.getElementById("visitorCount").innerText =
                "Visitors: " + data.count;
        } else {
            console.log("Visitor error:", data);
        }

    } catch (error) {
        console.log("Visitor fetch error:", error);
    }
});