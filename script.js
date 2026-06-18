// Advanced Multi-Tier Automated Threat Spectrum Aggregator Engine

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Isolate targeted tracking variables from all 6 question segments
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    const q6 = document.querySelector('input[name="q6"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5 || q6 === null) {
        alert("Action Aborted: Please supply metrics across all evaluation parameters.");
        return;
    }

    // Compute heuristic cumulative anomaly metric across the updated matrix values
    let totalScore = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value) + parseInt(q5.value) + parseInt(q6.value);
    if (totalScore > 100) totalScore = 100;

    // Target UI terminal tracking assets
    document.getElementById('score-num').innerText = totalScore + "%";
    
    const circle = document.querySelector('.score-circle');
    const riskLevel = document.getElementById('risk-level');
    const riskDesc = document.getElementById('risk-desc');
    const flagsList = document.getElementById('red-flags-list');
    
    flagsList.innerHTML = '';
    let flagsFound = [];

    // Processing clean multi-tier risk spectrum layout based on exact inputs
    if (totalScore >= 70) {
        riskLevel.innerText = "Critical Scam Flag 🚨";
        riskLevel.style.color = "#ef4444";
        circle.style.borderColor = "#ef4444";
        circle.style.boxShadow = "0 0 30px rgba(239, 68, 68, 0.4)";
        riskDesc.innerText = "Extreme Threat: This structure displays confirmed traits of operational recruitment scams or predatory financial operations. Discontinue interactions immediately.";
    } else if (totalScore >= 40) {
        riskLevel.innerText = "High Risk Structure ⚠️";
        riskLevel.style.color = "#f59e0b";
        circle.style.borderColor = "#f59e0b";
        circle.style.boxShadow = "0 0 30px rgba(245, 158, 11, 0.4)";
        riskDesc.innerText = "Heavy Threat Indicators: Multiple organizational compliance safeguards failed validation. High probability of deceptive operations or financial traps.";
    } else if (totalScore >= 15) {
        riskLevel.innerText = "Average Threat Level ⚡";
        riskLevel.style.color = "#6366f1";
        circle.style.borderColor = "#6366f1";
        circle.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.4)";
        riskDesc.innerText = "Moderate Anomaly Index: Certain markers conflict with ideal corporate pipelines. Exercise heightened personal verification before submitting paperwork.";
    } else {
        riskLevel.innerText = "Low Risk Operations ✅";
        riskLevel.style.color = "#10b981";
        circle.style.borderColor = "#10b981";
        circle.style.boxShadow = "0 0 30px rgba(16, 185, 129, 0.4)";
        riskDesc.innerText = "Secure Structural Configuration: No prominent structural malicious anomalies isolated. Operational trends look legitimate.";
    }

    // Capture precise customized anomaly reporting entries 
    if (parseInt(q1.value) === 15) flagsFound.push("Initial routing via unverified open domain hosts (@gmail, @outlook).");
    if (parseInt(q1.value) === 25) flagsFound.push("Unsecured outreach via consumer chat software networks (WhatsApp/Telegram/Instagram DM).");
    
    if (parseInt(q2.value) === 20) flagsFound.push("Demands a transaction fee classified strictly under training layout upgrades.");
    if (parseInt(q2.value) === 25) flagsFound.push("Requires an upfront payment designated as security deposits or system registration costs.");
    if (parseInt(q2.value) === 35) flagsFound.push("Mandates payment under highly suspicious promises of future refunds.");
    
    if (parseInt(q3.value) === 20) flagsFound.push("Hiring pipeline uses only text form links with completely absent physical interview stages.");
    if (parseInt(q3.value) === 30) flagsFound.push("Received an automated immediate instant selection confirmation string.");
    
    if (parseInt(q4.value) === 10) flagsFound.push("Employs micro time pressure windows restricting your reply threshold under 24 hours.");
    if (parseInt(q4.value) === 20) flagsFound.push("Threatens immediate loss of position to push immediate monetary checkout responses.");
    
    if (parseInt(q5.value) === 20) flagsFound.push("Offer assets delivered informally as chat messaging content blocks rather than institutional PDFs.");
    if (parseInt(q5.value) === 25) flagsFound.push("Documentation lacks standard corporate registration numbers, valid formatting, or official address listings.");
    
    if (parseInt(q6.value) === 15) flagsFound.push("The business maintains a completely non-existent digital footprint across active directories.");
    if (parseInt(q6.value) === 30) flagsFound.push("Detected clone template structure or domain mimicry imitating separate real corporations.");

    if (flagsFound.length === 0) {
        flagsList.innerHTML = '<p style="color: #10b981; font-weight: 600;">System Check Passed: Zero critical structural anomalies isolated.</p>';
    } else {
        flagsFound.forEach(flag => {
            const div = document.createElement('div');
            div.className = 'flag-alert';
            div.innerText = "🚩 [Anomaly Isolated] " + flag;
            flagsList.appendChild(div);
        });
    }

    // Execution step: reveal diagnostics dashboard and fluidly center user perspective
    const resultSection = document.getElementById('result');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
});
 
