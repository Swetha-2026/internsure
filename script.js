// ==========================================
// BONUS FEATURE: TYPEWRITER EFFECT
// ==========================================
const phrases = [
    "Detect Internship Risks Using Analytics Logic.",
    "Verify Domain Anchors & Processing Demands.",
    "Evaluate Infrastructure Signals Dynamically."
];
let phraseIdx = 0;
let charIdx = 0;
let currentPhrase = '';
let isDeleting = false;
const typewriterSpan = document.getElementById('typewriter');

function typeLoop() {
    currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        typewriterSpan.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterSpan.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2000; // Hold the phrase string visible
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeLoop, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => typeLoop());


// ==========================================
// MAIN RISK ANALYSIS ENGINE
// ==========================================
const form = document.getElementById('riskForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Extract values from input forms
    const companyName = document.getElementById('companyName').value.trim();
    const websiteUrl = document.getElementById('websiteUrl').value.trim();
    const hrEmail = document.getElementById('hrEmail').value.trim();
    const linkedinUrl = document.getElementById('linkedinUrl').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const regFee = document.getElementById('regFee').value;

    let internalScore = 0;
    let logArr = [];

    // Rule 1: Required Structural Base Fields Filled (+10)
    if(companyName && hrEmail && jobTitle && regFee) {
        internalScore += 10;
        logArr.push({ text: "Primary infrastructure data vectors populated.", positive: true });
    }

    // Rule 2: Corporate URL Presence Evaluation (+25)
    if(websiteUrl && isValidUrl(websiteUrl)) {
        internalScore += 25;
        logArr.push({ text: "Independent operational website profile URL defined.", positive: true });
    } else {
        logArr.push({ text: "Missing or unformatted corporate website anchor.", positive: false });
    }

    // Rule 3: Cross-Domain Architecture Coordination Match (+25)
    if(websiteUrl && hrEmail) {
        const domainExtracted = extractDomain(websiteUrl);
        const emailExtracted = extractDomainFromEmail(hrEmail);
        const publicDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
        
        if(domainExtracted && emailExtracted && domainExtracted === emailExtracted && !publicDomains.includes(emailExtracted)) {
            internalScore += 25;
            logArr.push({ text: `Domain coordination match verified (${domainExtracted}).`, positive: true });
        } else {
            let errMsg = "Email domain mismatch vs corporate structural URL address.";
            if(publicDomains.includes(emailExtracted)) {
                errMsg += " (Utilizing public structural host nodes like Gmail).";
            }
            logArr.push({ text: errMsg, positive: false });
        }
    } else {
        logArr.push({ text: "Incomplete dataset mapping to run deep domain evaluation.", positive: false });
    }

    // Rule 4: Professional Network Identity Metrics (+20)
    if(linkedinUrl && isValidUrl(linkedinUrl) && linkedinUrl.toLowerCase().includes('linkedin.com')) {
        internalScore += 20;
        logArr.push({ text: "Corporate LinkedIn social index verification parameter logged.", positive: true });
    } else {
        logArr.push({ text: "No corporate LinkedIn professional validation array provided.", positive: false });
    }

    // Rule 5: Commercial Application Constraints Handling (+20)
    if(regFee === 'no') {
        internalScore += 20;
        logArr.push({ text: "No immediate processing capital requirements demanded.", positive: true });
    } else {
        logArr.push({ text: "ALERT: Upfront fee registration requirements flagged. High operational exposure profile risk.", positive: false });
    }

    // Pass metrics downstream to update layout dashboards
    renderDashboardResults(internalScore, logArr, companyName, jobTitle);
});


// ==========================================
// ENGINE HELPER UTILITIES
// ==========================================
function isValidUrl(str) {
    try {
        new URL(str);
        return true;
    } catch (_) {
        return false;  
    }
}

function extractDomain(urlStr) {
    try {
        if(!/^https?:\/\//i.test(urlStr)) {
            urlStr = 'http://' + urlStr;
        }
        const url = new URL(urlStr);
        let hostname = url.hostname;
        if (hostname.startsWith('www.')) {
            hostname = hostname.substring(4);
        }
        return hostname.toLowerCase();
    } catch(e) {
        return null;
    }
}

function extractDomainFromEmail(emailStr) {
    const parts = emailStr.split('@');
    return parts.length > 1 ? parts[1].toLowerCase() : null;
}


// ==========================================
// DASHBOARD VIEWPORT RENDERING MECHANICS
// ==========================================
function renderDashboardResults(score, logs, company, role) {
    const emptyState = document.getElementById('dashEmpty');
    const activeState = document.getElementById('dashActive');
    const badge = document.getElementById('riskBadge');
    const scoreTxt = document.getElementById('scoreText');
    const circle = document.getElementById('scoreCircle');
    const resComp = document.getElementById('resCompanyTitle');
    const resJob = document.getElementById('resJobTitle');
    const reasonsLog = document.getElementById('reasonsLog');

    // Toggle active interface states
    emptyState.style.display = 'none';
    activeState.style.display = 'block';

    resComp.textContent = company;
    resJob.textContent = role;

    // Reset log layout arrays
    reasonsLog.innerHTML = '';
    logs.forEach(log => {
        const li = document.createElement('li');
        li.textContent = log.text;
        if(!log.positive) li.classList.add('negative');
        reasonsLog.appendChild(li);
    });

    // Set properties based on calculated category thresholds
    let badgeClass = 'badge-low';
    let activeColor = '#10B981';
    let label = 'Low Risk Exposure';

    if(score >= 80) {
        badgeClass = 'badge-low';
        activeColor = 'var(--risk-low)';
        label = '🟢 Low Risk (80-100)';
    } else if(score >= 50) {
        badgeClass = 'badge-medium';
        activeColor = 'var(--risk-medium)';
        label = '🟡 Medium Risk (50-79)';
    } else {
        badgeClass = 'badge-high';
        activeColor = 'var(--risk-high)';
        label = '🔴 High Risk (0-49)';
    }

    badge.className = `status-badge ${badgeClass}`;
    badge.textContent = label;

    // Dynamic dial counters
    let currentDisplayScore = 0;
    const duration = 800; 
    const steps = score;
    const increment = score === 0 ? 0 : duration / steps;

    if(score === 0) {
        scoreTxt.textContent = "0";
        circle.style.background = `conic-gradient(var(--bg-input) 0deg, var(--bg-input) 360deg)`;
    } else {
        let interval = setInterval(() => {
            currentDisplayScore++;
            scoreTxt.textContent = currentDisplayScore;
            
            const degrees = (currentDisplayScore / 100) * 360;
            circle.style.background = `conic-gradient(${activeColor} ${degrees}deg, var(--bg-input) ${degrees}deg)`;
            
            if(currentDisplayScore >= score) {
                clearInterval(interval);
            }
        }, increment);
    }
}
