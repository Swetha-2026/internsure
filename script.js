document.addEventListener("DOMContentLoaded", function () {

    // ---------------- TYPEWRITER ----------------
    const text = "Rule-based internship risk evaluation system powered by heuristic analysis.";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("typewriter").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 25);
        }
    }
    typeWriter();

    // ---------------- FORM ----------------
    const form = document.getElementById("riskForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let company = document.getElementById("companyName").value;
        let website = document.getElementById("websiteUrl").value;
        let email = document.getElementById("hrEmail").value;
        let linkedin = document.getElementById("linkedinUrl").value;
        let title = document.getElementById("jobTitle").value;
        let fee = document.getElementById("regFee").value;

        let score = 0;
        let reasons = [];

        // ---------------- WEBSITE ----------------
        if (website && website.includes("http")) {
            score += 25;
            reasons.push("✔ Official website provided");
        }

        // ---------------- EMAIL DOMAIN CHECK ----------------
        if (email && website) {
            try {
                let domain = website.replace("https://", "")
                                     .replace("http://", "")
                                     .split("/")[0];

                if (email.includes(domain)) {
                    score += 25;
                    reasons.push("✔ Email domain matches company domain");
                } else {
                    reasons.push("⚠ Email domain mismatch detected");
                }
            } catch (err) {}
        }

        // ---------------- LINKEDIN ----------------
        if (linkedin) {
            score += 20;
            reasons.push("✔ LinkedIn company page provided");
        } else {
            reasons.push("⚠ No LinkedIn presence detected");
        }

        // ---------------- FEE CHECK ----------------
        if (fee === "no") {
            score += 20;
            reasons.push("✔ No registration fee required");
        } else {
            reasons.push("⚠ Upfront payment request detected");
        }

        // ---------------- COMPLETENESS ----------------
        if (company && email && title) {
            score += 10;
            reasons.push("✔ Complete internship details provided");
        } else {
            reasons.push("⚠ Missing mandatory information fields");
        }

        if (score > 100) score = 100;

        // ---------------- RISK LEVEL ----------------
        let riskText = "";
        let color = "";

        if (score >= 80) {
            riskText = "LOW RISK";
            color = "#22c55e";
        } else if (score >= 50) {
            riskText = "MEDIUM RISK";
            color = "#facc15";
        } else {
            riskText = "HIGH RISK";
            color = "#ef4444";
        }

        // ---------------- UI UPDATE ----------------
        document.getElementById("dashEmpty").style.display = "none";
        document.getElementById("dashActive").style.display = "block";

        document.getElementById("scoreText").innerText = score;

        document.getElementById("riskBadge").innerText = riskText;
        document.getElementById("riskBadge").style.background = color;

        document.getElementById("resCompanyTitle").innerText = company;
        document.getElementById("resJobTitle").innerText = title;

        let list = document.getElementById("reasonsLog");
        list.innerHTML = "";

        reasons.forEach(r => {
            let li = document.createElement("li");
            li.innerText = r;
            list.appendChild(li);
        });

        // ---------------- SCORE ANIMATION ----------------
        let circle = document.getElementById("scoreCircle");
        circle.style.background = `conic-gradient(${color} ${score * 3.6}deg, #1f2937 0deg)`;
    });

});

    
