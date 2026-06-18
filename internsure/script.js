// Global App State Variables for Charts
let gaugeChartInstance = null;
let distributionChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCounters();
    initDistributionChart();
    
    // Handle form submit execution
    document.getElementById('riskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        runRiskAssessment();
    });
});

// 1. Dark/Light Mode Theme Toggle Logic
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-bs-theme', newTheme);
        
        // Update icon representation
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fa-solid fa-sun fs-5';
        } else {
            icon.className = 'fa-solid fa-moon fs-5';
        }
    });
}

// 2. Animated Stats Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 50;
        
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 3. Risk Engine Heuristics Core
function runRiskAssessment() {
    const companyName = document.getElementById('companyName').value;
    const role = document.getElementById('internRole').value;
    const url = document.getElementById('companyUrl').value.trim();
    const email = document.getElementById('companyEmail').value.trim();
    const stipend = parseFloat(document.getElementById('stipend').value) || 0;
    const appFee = document.getElementById('appFee').value;
    const desc = document.getElementById('jobDesc').value.toLowerCase();

    let score = 0;
    let flags = [];

    // Factor Assessment Checks
    let domainWeight = 100;
    let feeWeight = 100;
    let stipendWeight = 100;

    // Check 1: Missing URL Domain
    if (!url) {
        score += 25;
        domainWeight -= 50;
        flags.push({ text: "Missing official company website link.", critical: false });
    }

    // Check 2: Free Mail Handlers Domain Check
    const freeDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const emailDomain = email.split('@')[1] ? email.split('@')[1].toLowerCase() : '';
    if (freeDomains.includes(emailDomain)) {
        score += 35;
        domainWeight -= 50;
        flags.push({ text: `Recruiter uses a public email domain (${emailDomain}).`, critical: true });
    }

    // Check 3: Fee requirements vulnerabilities
    if (appFee === 'yes') {
        score += 40;
        feeWeight = 0;
        flags.push({ text: "Demands upfront monetary processing or kit/training fees.", critical: true });
    }

    // Check 4: Abstract extreme high payment profiles
    if (stipend > 15000) { 
        score += 15;
        stipendWeight = 30;
        flags.push({ text: "Unrealistically high stipend package scale listed.", critical: false });
    }

    // Check 5: Word pattern matches
    if (desc.includes('deposit') || desc.includes('crypto') || desc.includes('telegram')) {
        score += 15;
        flags.push({ text: "Description mentions suspicious terms (Telegram, Crypto, Deposit).", critical: false });
    }

    // Cap score at 100
    score = Math.min(score, 100);

    // Update UI Checklist bars
    updateFactorBars(domainWeight, feeWeight, stipendWeight);

    // Transition elements display
    document.getElementById('resultPlaceholder').classList.add('d-none');
    const realDash = document.getElementById('realDashboard');
    realDash.classList.remove('d-none');

    // Render texts parameters
    document.getElementById('dashScore').innerText = score;
    document.getElementById('dashCompany').innerText = companyName;
    document.getElementById('dashRole').innerText = role;

    // Badge styling logic definitions
    const badge = document.getElementById('riskBadge');
    const recContainer = document.getElementById('dashRec');
    let summaryText = "";
    
    if (score <= 30) {
        badge.className = "badge mb-2 py-2 px-3 fs-6 w-100 bg-success";
        badge.innerText = "LOW THREAT RISK";
        summaryText = "The opportunity structures seem structurally clean. Normal validation rules applies.";
        recContainer.className = "alert alert-success py-2 px-3 small mb-0";
        recContainer.innerHTML = "Proceed with application. Confirm structural expectations during standard discussions.";
    } else if (score <= 65) {
        badge.className = "badge mb-2 py-2 px-3 fs-6 w-100 bg-warning text-dark";
        badge.innerText = "MEDIUM RISK WARNING";
        summaryText = "Minor irregular flags caught. The hiring pipeline structure profiles elements needing review.";
        recContainer.className = "alert alert-warning py-2 px-3 small text-dark mb-0";
        recContainer.innerHTML = "Do not pay any money. Ask the representative to clarify identity parameters via verified channels.";
    } else {
        badge.className = "badge mb-2 py-2 px-3 fs-6 w-100 bg-danger";
        badge.innerText = "HIGH SCAM RISK";
        summaryText = "Critical security issues identified. High probability of fraudulent engagement behavior patterns.";
        recContainer.className = "alert alert-danger py-2 px-3 small mb-0";
        recContainer.innerHTML = "<strong>Recommendation:</strong> Avoid sharing sensitive identifiers. Do not transfer any currency amounts.";
    }
    document.getElementById('dashSummary').innerText = summaryText;

    // Output flags array components items
    const listUl = document.getElementById('flagsList');
    listUl.innerHTML = "";
    if(flags.length === 0) {
        listUl.innerHTML = `<li class="list-group-item small text-muted"><i class="fa-solid fa-circle-check text-success me-2"></i>No warning anomalies detected.</li>`;
    } else {
        flags.forEach(f => {
            listUl.innerHTML += `
                <li class="list-group-item small d-flex align-items-center">
                    <i class="fa-solid ${f.critical ? 'fa-circle-xmark text-danger' : 'fa-triangle-exclamation text-warning'} me-2"></i>
                    ${f.text}
                </li>`;
        });
    }

    // Refresh graphical dashboard assets instances
    updateGaugeChart(score);
}

// 4. Update Horizontal Checklist Factor Bars
function updateFactorBars(domain, fee, stipend) {
    document.getElementById('factorDomain').style.width = `${domain}%`;
    document.getElementById('factorDomainVal').innerText = `${domain}%`;
    document.getElementById('factorDomain').className = `progress-bar ${domain < 50 ? 'bg-danger' : domain < 100 ? 'bg-warning' : 'bg-success'}`;

    document.getElementById('factorFee').style.width = `${fee}%`;
    document.getElementById('factorFeeVal').innerText = `${fee}%`;
    document.getElementById('factorFee').className = `progress-bar ${fee === 0 ? 'bg-danger' : 'bg-success'}`;

    document.getElementById('factorStipend').style.width = `${stipend}%`;
    document.getElementById('factorStipendVal').innerText = `${stipend}%`;
    document.getElementById('factorStipend').className = `progress-bar ${stipend < 50 ? 'bg-warning' : 'bg-success'}`;
}

// 5. Chart.js Implementations (Gauge and Base Distribution Analysis)
function updateGaugeChart(score) {
    const ctx = document.getElementById('gaugeChart').getContext('2d');
    
    if (gaugeChartInstance) {
        gaugeChartInstance.destroy();
    }

    gaugeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [score, 100 - score],
                backgroundColor: [score > 65 ? '#dc3545' : score > 30 ? '#ffc107' : '#198754', '#e9ecef'],
                borderWidth: 0,
                radius: '90%',
                cutout: '80%',
                rotation: -90,
                circumference: 180
            }]
        },
        options: {
            plugins: { tooltip: { enabled: false } },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function initDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    distributionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Domain Validation', 'Financial Assets Security', 'System Threat Metric Profile'],
            datasets: [{
                label: 'General Risk Component Weight',
                data: [40, 20, 30],
                backgroundColor: ['#0d6efd', '#6f42c1', '#0dcaf0'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
}

// Mock Scam Data Loader Function
function loadDemoData() {
    document.getElementById('companyName').value = "Global Data Entry Hub Ltd";
    document.getElementById('internRole').value = "Virtual Assistant Intern";
    document.getElementById('companyUrl').value = ""; // blank intentionally
    document.getElementById('companyEmail').value = "hr.globaldatahub@gmail.com";
    document.getElementById('stipend').value = "22000"; // Too high for unstructured data entry
    document.getElementById('appFee').value = "yes";
    document.getElementById('jobDesc').value = "Must pay security collateral configuration charge for laptop allocation system via safe deposit.";
    
    runRiskAssessment();
}
