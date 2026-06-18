const data = {
    step: 0,
    answers: {},
    score: 0,

    questions: [
        { q: "Upfront payment asked?", s: 45 },
        { q: "Recruitment via WhatsApp/Telegram?", s: 40 },
        { q: "No online company presence?", s: 45 },
        { q: "No interview process?", s: 40 },
        { q: "No official offer letter?", s: 30 },
        { q: "Asked for sensitive data early?", s: 35 },
        { q: "Unrealistic salary offer?", s: 30 },
        { q: "High pressure urgency?", s: 25 },
        { q: "Used Gmail instead of company email?", s: 30 },
        { q: "Suspicious stipend structure?", s: 20 }
    ]
};

function render() {
    const el = document.getElementById("wizard-render-engine");

    if (data.step === 0) {
        document.getElementById("progress-container").classList.add("hidden");

        el.innerHTML = `
        <div class="card">
            <h1>InternSure</h1>
            <p>AI Internship Risk Analyzer</p>
            <button class="primary" onclick="next()">Start Analysis</button>
        </div>`;
        return;
    }

    if (data.step <= data.questions.length) {
        document.getElementById("progress-container").classList.remove("hidden");
        document.getElementById("progress-bar").style.width =
            (data.step / data.questions.length) * 100 + "%";

        const q = data.questions[data.step - 1];

        el.innerHTML = `
        <div class="card">
            <h3>Q${data.step}</h3>
            <p>${q.q}</p>

            <button class="option" onclick="answer(true, ${q.s})">Yes</button>
            <button class="option" onclick="answer(false, 0)">No</button>

            <button onclick="skip()" class="option">Skip</button>
        </div>`;
        return;
    }

    showResult();
}

function next() {
    data.step++;
    render();
}

function answer(isYes, score) {
    if (isYes) data.score += score;
    data.step++;
    render();
}

function skip() {
    data.step++;
    render();
}

function showResult() {
    const el = document.getElementById("wizard-render-engine");

    let level = "LOW";
    let color = "#00ff88";

    if (data.score > 30) { level = "MEDIUM"; color = "#ffcc00"; }
    if (data.score > 60) { level = "HIGH"; color = "#ff4d4d"; }

    el.innerHTML = `
    <div class="card">
        <h2>Result</h2>

        <h1 style="color:${color}">
            ${data.score}/100
        </h1>

        <h3>${level} RISK</h3>

        <button class="primary" onclick="restart()">Restart</button>
    </div>`;
}

function restart() {
    data.step = 0;
    data.score = 0;
    render();
}

render();
