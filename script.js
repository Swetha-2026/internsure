const assessmentData = {
    companyName: "",
    internshipRole: "",
    currentStep: 0,
    answers: {},
    questions: [
        {
            id: 1,
            title: "Upfront Payments Check",
            question: "Are they demanding upfront charges like registration, training fees, or deposits?",
            options: [
                { text: "Yes, they requested payment", score: 45, flag: "Demanding upfront charges for registration or training." },
                { text: "No fees requested", score: 0, flag: null }
            ]
        },
        {
            id: 2,
            title: "Recruitment Channel",
            question: "How did they contact you?",
            options: [
                { text: "Official website / portal", score: 0, flag: null },
                { text: "LinkedIn / verified platforms", score: 5, flag: null },
                { text: "WhatsApp / Telegram / unknown agent", score: 40, flag: "Recruitment via informal private messaging apps." }
            ]
        },
        {
            id: 3,
            title: "Online Presence",
            question: "Is the company verifiable online?",
            options: [
                { text: "Yes, fully verified", score: 0, flag: null },
                { text: "Unclear / weak presence", score: 20, flag: "Weak or unverifiable digital footprint." },
                { text: "No presence at all", score: 45, flag: "No visible corporate identity online." }
            ]
        },
        {
            id: 4,
            title: "Interview Process",
            question: "Was there an interview?",
            options: [
                { text: "No interview", score: 40, flag: "Offer given without any interview." },
                { text: "Proper interview done", score: 0, flag: null }
            ]
        },
        {
            id: 5,
            title: "Offer Letter",
            question: "Did you receive an official offer letter?",
            options: [
                { text: "Yes", score: 0, flag: null },
                { text: "No / informal messages only", score: 30, flag: "No formal documentation provided." }
            ]
        },
        {
            id: 6,
            title: "Sensitive Data",
            question: "Did they ask for sensitive info early?",
            options: [
                { text: "Yes", score: 35, flag: "Requested sensitive personal data too early." },
                { text: "No", score: 0, flag: null }
            ]
        },
        {
            id: 7,
            title: "Offer Realism",
            question: "Does the offer feel unrealistic?",
            options: [
                { text: "Yes, too good to be true", score: 30, flag: "Unrealistic compensation or expectations." },
                { text: "No, normal offer", score: 0, flag: null }
            ]
        },
        {
            id: 8,
            title: "Urgency Pressure",
            question: "Are they forcing urgency?",
            options: [
                { text: "Yes", score: 25, flag: "High-pressure recruitment tactics." },
                { text: "No", score: 0, flag: null }
            ]
        },
        {
            id: 9,
            title: "Email Domain",
            question: "What email did they use?",
            options: [
                { text: "Company domain email", score: 0, flag: null },
                { text: "Gmail / Yahoo", score: 30, flag: "Generic email domain used." },
                { text: "No email communication", score: 15, flag: "No official email communication." }
            ]
        },
        {
            id: 10,
            title: "Stipend Reality",
            question: "Is stipend unusually high?",
            options: [
                { text: "Yes", score: 20, flag: "Suspiciously inflated stipend." },
                { text: "No", score: 0, flag: null }
            ]
        }
    ]
};

function updateWizardView() {
    const engine = document.getElementById("wizard-render-engine");
    const progress = document.getElementById("progress-container");
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("page-progress");

    if (!engine) return;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // STEP 0
    if (assessmentData.currentStep === 0) {
        if (progress) progress.style.display = "none";

        engine.innerHTML = `
        <div class="text-center space-y-6">
            <h1 class="text-3xl font-bold text-white">InternSure</h1>
            <p class="text-gray-400 text-sm">Internship Risk Checker</p>
            <button onclick="advanceStep(1)"
                class="px-6 py-3 bg-indigo-600 rounded-xl font-bold">
                Start
            </button>
        </div>`;
        return;
    }

    // STEP 1
    if (assessmentData.currentStep === 1) {
        if (progress) {
            progress.style.display = "flex";
            progress.classList.remove("hidden");
        }
        if (bar) bar.style.width = "10%";
        if (text) text.innerText = "Step 1/11";

        engine.innerHTML = `
        <div class="space-y-4">
            <input id="company"
                placeholder="Company name"
                class="w-full p-3 bg-white/5 rounded-xl">

            <input id="role"
                placeholder="Internship role"
                class="w-full p-3 bg-white/5 rounded-xl">

            <button onclick="saveMeta()"
                class="w-full py-3 bg-indigo-600 rounded-xl font-bold">
                Continue
            </button>
        </div>`;
        return;
    }

    // QUESTIONS
    if (assessmentData.currentStep >= 2 && assessmentData.currentStep <= 11) {
        const i = assessmentData.currentStep - 2;
        const q = assessmentData.questions[i];

        const percent = Math.round((assessmentData.currentStep / 11) * 100);
        if (bar) bar.style.width = percent + "%";
        if (text) text.innerText = `Step ${assessmentData.currentStep}/11`;

        let opts = "";
        q.options.forEach((o, idx) => {
            const selected = assessmentData.answers[q.id]?.index === idx;

            opts += `
            <button onclick="select(${q.id},${idx},${o.score},'${(o.flag || "").replace(/'/g,"") }')"
                class="w-full p-3 rounded-xl text-left ${
                    selected ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-300"
                }">
                ${o.text}
            </button>`;
        });

        engine.innerHTML = `
        <div class="space-y-4">
            <h2 class="text-white font-bold">${q.title}</h2>
            <p class="text-gray-400 text-sm">${q.question}</p>
            ${opts}

            <div class="flex gap-2">
                <button onclick="advanceStep(-1)" class="w-1/2 bg-white/10 py-2 rounded-xl">Back</button>
                <button onclick="skip(${q.id})" class="w-1/2 bg-indigo-600 py-2 rounded-xl">Skip</button>
            </div>
        </div>`;
        return;
    }

    // RESULT
    if (assessmentData.currentStep === 12) {
        if (progress) progress.style.display = "none";
        showResult();
    }
}

function advanceStep(n) {
    assessmentData.currentStep += n;
    updateWizardView();
}

function saveMeta() {
    assessmentData.companyName = document.getElementById("company")?.value || "";
    assessmentData.internshipRole = document.getElementById("role")?.value || "";
    advanceStep(1);
}

function select(qid, idx, score, flag) {
    assessmentData.answers[qid] = { index: idx, score, flag };
    setTimeout(() => advanceStep(1), 150);
}

function skip(qid) {
    assessmentData.answers[qid] = { index: -1, score: 0, flag: null };
    advanceStep(1);
}

function showResult() {
    const engine = document.getElementById("wizard-render-engine");

    let total = 0;
    let flags = [];

    Object.values(assessmentData.answers).forEach(a => {
        total += a.score;
        if (a.flag) flags.push(a.flag);
    });

    const score = Math.min(total, 100);

    let level = "LOW";
    let color = "text-green-400";

    if (score > 30) level = "MEDIUM", color = "text-yellow-400";
    if (score > 60) level = "HIGH", color = "text-red-400";

    engine.innerHTML = `
    <div class="space-y-4 text-center">
        <h2 class="text-white font-bold text-xl">
            ${assessmentData.companyName || "Result"}
        </h2>

        <div class="text-4xl font-black ${color}">
            ${score}/100
        </div>

        <div class="${color} font-bold">${level} RISK</div>

        <div class="text-left text-sm text-gray-300 space-y-1">
            ${flags.length ? flags.map(f => "• " + f).join("<br>") : "No major risks detected"}
        </div>

        <button onclick="reset()"
            class="w-full bg-white/10 py-3 rounded-xl">
            Restart
        </button>
    </div>`;
}

function reset() {
    assessmentData.currentStep = 0;
    assessmentData.answers = {};
    assessmentData.companyName = "";
    assessmentData.internshipRole = "";
    updateWizardView();
}

updateWizardView();
