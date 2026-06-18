const assessmentData = {
    companyName: "",
    internshipRole: "",
    currentStep: 0, 
    answers: {},
    questions: [
        {
            id: 1,
            title: "Upfront Payments Check",
            question: "Are they demanding upfront charges for things like registration, training courses, processing fees, or mandatory security asset deposits?",
            options: [
                { text: "Yes, they explicitly requested a payment", score: 45, flag: "Demanding upfront charges for registration or training assets." },
                { text: "No, absolutely no fees were requested", score: 0, flag: null }
            ]
        },
        {
            id: 2,
            title: "Recruitment Channel",
            question: "How did this company or recruiter reach out to communicate this recruitment pipeline with you?",
            options: [
                { text: "Official company website domain or application portal", score: 0, flag: null },
                { text: "Verified standard business platforms (e.g., LinkedIn)", score: 5, flag: null },
                { text: "Unsolicited chat apps (e.g., WhatsApp, Telegram, or an unknown agent)", score: 40, flag: "Recruitment executed entirely over private messaging apps." }
            ]
        },
        {
            id: 3,
            title: "Online Credibility",
            question: "Does the company have an authentic, verifiable online presence (like a working website or clear organizational LinkedIn page)?",
            options: [
                { text: "Yes, everything is clearly visible and verified", score: 0, flag: null },
                { text: "Unsure / I could find very little documentation", score: 20, flag: "Unverifiable online presence or lacks clear business profiles." },
                { text: "No, there is no digital footprint or evidence of their work", score: 45, flag: "Lacks any public corporate digital footprint." }
            ]
        },
        {
            id: 4,
            title: "Interview Validation",
            question: "Was this internship offer handed out instantly without any real interview, selection test, or face-to-face interaction?",
            options: [
                { text: "Yes, I received an offer with zero interview process", score: 40, flag: "Offered immediate placement without any interview process." },
                { text: "No, I went through a formal screening or conversation process", score: 0, flag: null }
            ]
        },
        {
            id: 5,
            title: "Documentation Check",
            question: "Did the company offer you a structured legal document, signed agreement, or formal letterhead appointment letter?",
            options: [
                { text: "Yes, I received an official structured offer letter", score: 0, flag: null },
                { text: "No, all updates and agreements have been informal strings", score: 30, flag: "Missing official formal appointment verification frameworks." }
            ]
        },
        {
            id: 6,
            title: "Sensitive Information",
            question: "Are they pushing for highly confidential data (like banking keys, login credentials, or national ID proofs) before your day one?",
            options: [
                { text: "Yes, they requested highly sensitive records early on", score: 35, flag: "Aggressive inquiries for confidential personal records prematurely." },
                { text: "No, they only requested standard basic onboarding data", score: 0, flag: null }
            ]
        },
        {
            id: 7,
            title: "Offer Realism",
            question: "Does the offer sound unrealistic (such as exceptional high pay rates for minimal hours, or zero skill prerequisites)?",
            options: [
                { text: "Yes, it sounds suspiciously generous or easy", score: 30, flag: "Onboarding conditions look disproportionately generous to be true." },
                { text: "No, it perfectly matches standard market realities", score: 0, flag: null }
            ]
        },
        {
            id: 8,
            title: "Urgency Strategy",
            question: "Are recruiters applying high-pressure timeline strategies, saying slots are disappearing or demanding immediate choices?",
            options: [
                { text: "Yes, they are constantly rushing me to finalize fast", score: 25, flag: "Imposes strict high-pressure deadline boundaries on candidates." },
                { text: "No, they provided sufficient window times to review options", score: 0, flag: null }
            ]
        },
        {
            id: 9,
            title: "Email Architecture",
            question: "What type of email domain architecture did their representative use to communicate with you?",
            options: [
                { text: "Official enterprise corporate address (@company.com)", score: 0, flag: null },
                { text: "Generic open handle platform account (e.g., @gmail.com, @yahoo.com)", score: 30, flag: "Communications routed using generic free platform servers." },
                { text: "No emails were exchanged at all", score: 15, flag: "No official company email interaction was recorded." }
            ]
        },
        {
            id: 10,
            title: "Compensation Balance",
            question: "Is the projected stipend structure heavily inflated compared to competitive enterprise standard baselines?",
            options: [
                { text: "Yes, it is significantly higher than other options", score: 20, flag: "Stipend values are highly inflated above conventional averages." },
                { text: "No, it sits within normal range guidelines", score: 0, font: null }
            ]
        }
    ]
};

function updateWizardView() {
    const enginePortal = document.getElementById('wizard-render-engine');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('page-progress');

    if (!enginePortal) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Step 0: Landing Page
    if (assessmentData.currentStep === 0) {
        if (progressContainer) progressContainer.style.display = 'none';
        
        enginePortal.innerHTML = `
            <div class="text-center space-y-8 screen-fade-in py-4">
                <div class="space-y-4">
                    <div class="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full">
                        <span class="flex h-2 w-2 relative">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span class="text-[11px] font-semibold text-indigo-300 uppercase tracking-widest">Global Safety System v2.4</span>
                    </div>
                    <h1 class="text-4xl font-extrabold text-white tracking-tight sm:text-5xl leading-tight">
                        Verify Your <br class="sm:hidden"><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-blue-400">Internship Offer</span>
                    </h1>
                    <p class="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed font-medium">
                        Protect yourself from employment scams. Spend 2 minutes running an anonymous risk assessment before signing any contracts.
                    </p>
                </div>

                <div class="glass-card p-6 rounded-2xl text-left space-y-4 max-w-sm mx-auto">
                    <div class="flex items-start space-x-3 text-xs text-gray-300">
                        <div class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                            <span class="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div class="leading-tight">
                            <p class="font-semibold text-white">100% Free & Secure</p>
                            <p class="text-[11px] text-gray-500 mt-0.5">Completely anonymous with immediate metrics feedback.</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 text-xs text-gray-300">
                        <div class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                            <span class="text-emerald-400 font-bold">✓</span>
                        </div>
                        <div class="leading-tight">
                            <p class="font-semibold text-white">Zero Logins Needed</p>
                            <p class="text-[11px] text-gray-500 mt-0.5">Skip signing up or entering accounts configuration data.</p>
                        </div>
                    </div>
                </div>

                <div class="pt-2">
                    <button onclick="advanceStep(1)" class="glow-btn w-full max-w-xs py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl font-bold text-gray-950 text-xs tracking-wider uppercase transition-all cursor-pointer">
                        Start Assessment
                    </button>
                </div>
            </div>
        `;
        return;
    }

    // Step 1: Metadata Input Info
    if (assessmentData.currentStep === 1) {
        if (progressContainer) {
            progressContainer.style.display = 'flex';
            progressContainer.classList.remove('hidden');
        }
        if (progressBar) progressBar.style.width = '8%';
        if (progressText) progressText.innerText = `Step 1 of 11`;

        enginePortal.innerHTML = `
            <div class="space-y-6 screen-fade-in">
                <div class="space-y-2 text-center">
                    <h2 class="text-xl font-extrabold text-white tracking-tight">Basic Information</h2>
                    <p class="text-xs text-gray-400">Let's set up the baseline details for your assessment.</p>
                </div>
                <div class="glass-card p-6 rounded-2xl space-y-5">
                    <div>
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Company Name (Optional)</label>
                        <input type="text" id="companyNameInput" value="${assessmentData.companyName}" placeholder="E.g., Highline Tech Solutions" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-all">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Internship Role (Optional)</label>
                        <input type="text" id="internshipRoleInput" value="${assessmentData.internshipRole}" placeholder="E.g., Web Development Intern" class="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-all">
                    </div>
                    
                    <div class="flex items-center space-x-3 pt-2">
                        <button onclick="advanceStep(-1)" class="w-1/3 py-3.5 bg-white/5 text-xs font-bold text-gray-300 rounded-xl transition-all cursor-pointer">Back</button>
                        <button onclick="saveMetadataAndContinue()" class="w-2/3 py-3.5 bg-indigo-600 text-xs font-bold text-white rounded-xl transition-all cursor-pointer">Continue →</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Steps 2 to 11: Render Questionnaire
    if (assessmentData.currentStep >= 2 && assessmentData.currentStep <= 11) {
        const questionIdx = assessmentData.currentStep - 2;
        const qObj = assessmentData.questions[questionIdx];

        const progressPercentage = Math.round((assessmentData.currentStep / 11) * 100);
        if (progressBar) progressBar.style.width = `${progressPercentage}%`;
        if (progressText) progressText.innerText = `Step ${assessmentData.currentStep} of 11`;

        let optionsHTML = "";
        qObj.options.forEach((opt, idx) => {
            const isChecked = assessmentData.answers[qObj.id]?.index === idx;
            optionsHTML += `
                <button onclick="selectOption(${qObj.id}, ${idx}, ${opt.score}, '${opt.flag ? opt.flag.replace(/'/g, "\\'") : ''}')" 
                    class="pill-option w-full p-4 rounded-xl border text-left text-xs flex items-center justify-between cursor-pointer ${
                        isChecked 
                        ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold' 
                        : 'bg-white/5 border-white/10 text-gray-300'
                    }">
                    <span>${opt.text}</span>
                    ${isChecked ? '<span class="text-indigo-400 text-sm font-bold">✓</span>' : ''}
                </button>
            `;
        });

        enginePortal.innerHTML = `
            <div class="space-y-6 screen-fade-in">
                <div class="glass-card p-6 rounded-2xl space-y-5">
                    <div class="space-y-2">
                        <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/10 px-2 py-0.5 rounded-md">${qObj.title}</span>
                        <p class="text-sm text-gray-200 leading-relaxed font-medium pt-1">
                            <span class="text-indigo-400 font-bold">${qObj.id}.</span> ${qObj.question}
                        </p>
                    </div>
                    
                    <div class="space-y-2.5">
                        ${optionsHTML}
                    </div>

                    <div class="flex items-center space-x-3 pt-2 border-t border-white/5">
                        <button onclick="advanceStep(-1)" class="w-1/2 py-3.5 bg-white/5 text-xs font-bold text-gray-300 rounded-xl cursor-pointer">Previous</button>
                        <button onclick="forceNextQuestion(${qObj.id})" class="w-1/2 py-3.5 bg-indigo-600/20 border border-indigo-500/20 text-xs font-bold text-indigo-300 rounded-xl cursor-pointer">Skip / Next</button>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    if (assessmentData.currentStep === 12) {
        if (progressContainer) progressContainer.style.display = 'none';
        renderOutputDashboard();
    }
}

function advanceStep(modifier) {
    assessmentData.currentStep += modifier;
    updateWizardView();
}

function saveMetadataAndContinue() {
    const compInput = document.getElementById('companyNameInput');
    const roleInput = document.getElementById('internshipRoleInput');
    if (compInput) assessmentData.companyName = compInput.value.trim();
    if (roleInput) assessmentData.internshipRole = roleInput.value.trim();
    advanceStep(1);
}

function selectOption(qId, optIdx, score, flagText) {
    assessmentData.answers[qId] = { index: optIdx, score: score, flag: flagText || null };
    updateWizardView();
    setTimeout(() => { advanceStep(1); }, 200);
}

function forceNextQuestion(qId) {
    if (!assessmentData.answers[qId]) {
        assessmentData.answers[qId] = { index: -1, score: 0, flag: null };
    }
    advanceStep(1);
}

function renderOutputDashboard() {
    const enginePortal = document.getElementById('wizard-render-engine');
    const displayName = assessmentData.companyName ? assessmentData.companyName : "Your Internship Offer";
    
    let scoreAccumulator = 0;
    let criticalFlags = [];

    Object.keys(assessmentData.answers).forEach(key => {
        const record = assessmentData.answers[key];
        scoreAccumulator += record.score;
        if (record.flag) criticalFlags.push(record.flag);
    });

    const standardScore = Math.min(scoreAccumulator, 100);
    let riskLevel = "LOW RISK";
    let badgeClass = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    
    if (standardScore >= 31 && standardScore <= 60) {
        riskLevel = "MEDIUM RISK";
        badgeClass = "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    } else if (standardScore > 60) {
        riskLevel = "HIGH RISK";
        badgeClass = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
    }

    let flagsListHTML = "";
    if (criticalFlags.length === 0) {
        flagsListHTML = `<li class="text-gray-400">• No critical flags detected. Proceed with standard due diligence.</li>`;
    } else {
        criticalFlags.forEach(flag => {
            flagsListHTML += `<li class="text-gray-300 flex items-start"><span class="text-rose-400 mr-2">•</span><span>${flag}</span></li>`;
        });
    }

    enginePortal.innerHTML = `
        <div class="glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-6 screen-fade-in">
            <div class="text-center border-b border-white/10 pb-5">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verification Result</span>
                <h2 class="text-xl font-extrabold mt-1 text-white tracking-tight">${displayName}</h2>
            </div>
            <div class="flex flex-col items-center space-y-3 py-2">
                <div class="text-5xl font-black text-white tracking-tight">${standardScore}<span class="text-sm font-medium text-gray-500">/100</span></div>
                <div class="text-[11px] uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-full ${badgeClass}">${riskLevel}</div>
            </div>
            <div class="space-y-3 pt-2">
                <h4 class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Identified Risk Patterns:</h4>
                <ul class="text-xs space-y-2.5 leading-relaxed">${flagsListHTML}</ul>
            </div>
            <div class="pt-4">
                <button onclick="resetCalculatorFramework()" class="w-full py-3.5 bg-white/5 border border-white/10 text-xs font-bold text-gray-300 rounded-xl transition-all cursor-pointer">Restart Assessment Engine</button>
            </div>
        </div>
    `;
}

function resetCalculatorFramework() {
    assessmentData.companyName = "";
    assessmentData.internshipRole = "";
    assessmentData.currentStep = 0;
    assessmentData.answers = {};
    updateWizardView();
}

// Render instantly when script parses to bypass any DOMContentLoaded delays
updateWizardView();
