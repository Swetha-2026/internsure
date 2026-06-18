// Theme toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

themeBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeBtn.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeBtn.textContent = 'Light Mode';
  }
});

// Initialize theme based on preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add('dark-theme');
  document.getElementById('themeBtn').textContent = 'Light Mode';
} else {
  body.classList.add('light-theme');
  document.getElementById('themeBtn').textContent = 'Dark Mode';
}

// Variables to store data
let riskScore = 0;
let riskLevel = 'Low';

// Sample Data for Analytics
const riskData = {
  low: 50,
  medium: 30,
  high: 20
};

// Initialize Charts
let riskMeterChart;
let riskDistributionChart;

window.onload = () => {
  initCharts();
  loadAnalytics();
};

// Function to initialize charts
function initCharts() {
  const ctxMeter = document.getElementById('riskMeterChart').getContext('2d');
  riskMeterChart = new Chart(ctxMeter, {
    type: 'doughnut',
    data: {
      labels: ['Risk Level'],
      datasets: [{
        data: [riskScore, 100 - riskScore],
        backgroundColor: ['#28a745', '#dee2e6'],
        hoverOffset: 4
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });

  const ctxDist = document.getElementById('riskDistributionChart').getContext('2d');
  riskDistributionChart = new Chart(ctxDist, {
    type: 'pie',
    data: {
      labels: ['Low', 'Medium', 'High'],
      datasets: [{
        data: [riskData.low, riskData.medium, riskData.high],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

// Load analytics data into progress bars
function loadAnalytics() {
  document.getElementById('lowRiskProgress').style.width = riskData.low + '%';
  document.getElementById('lowRiskProgress').setAttribute('aria-valuenow', riskData.low);
  document.getElementById('mediumRiskProgress').style.width = riskData.medium + '%';
  document.getElementById('mediumRiskProgress').setAttribute('aria-valuenow', riskData.medium);
  document.getElementById('highRiskProgress').style.width = riskData.high + '%';
  document.getElementById('highRiskProgress').setAttribute('aria-valuenow', riskData.high);
}

// Form Submission & Risk Assessment Logic
document.getElementById('verificationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const companyName = document.getElementById('companyName').value.trim();
  const role = document.getElementById('role').value.trim();
  const website = document.getElementById('companyWebsite').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const stipend = parseFloat(document.getElementById('stipend').value.trim()) || 0;
  const duration = parseInt(document.getElementById('duration').value.trim()) || 0;
  const applicationFee = document.querySelector('input[name="applicationFee"]:checked').value;
  const description = document.getElementById('description').value.trim();

  // Reset previous results
  document.getElementById('results').classList.add('d-none');

  let flags = [];
  let score = 0;

  // Check for missing company website
  if (!website) {
    flags.push('Missing company website');
    score += 20;
  } else {
    // Validate URL format (basic)
    try {
      new URL(website);
    } catch {
      flags.push('Invalid company website URL');
      score += 15;
    }
  }

  // Check contact email
  const emailDomain = email.split('@')[1].toLowerCase();
  if (['gmail.com', 'yahoo.com', 'outlook.com'].includes(emailDomain)) {
    flags.push('Free email domain');
    score += 15;
  }

  // Check application fee
  if (applicationFee === 'Yes') {
    flags.push('Application fee charged');
    score += 20;
  }

  // Check stipend
  if (stipend > 1000) {
    flags.push('Unrealistic stipend');
    score += 15;
  }

  // Check duration
  if (duration > 12) {
    flags.push('Unusually long duration');
    score += 10;
  }

  // Check description length
  if (description.length < 20) {
    flags.push('Missing internship details');
    score += 10;
  }

  // Determine risk level
  if (score <= 30) {
    riskLevel = 'Low';
  } else if (score <= 60) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Update risk score
  riskScore = score;

  // Update risk meter
  riskMeterChart.data.datasets[0].data = [riskScore, 100 - riskScore];
  riskMeterChart.data.datasets[0].backgroundColor = riskLevel === 'Low' ? ['#28a745', '#dee2e6']
    : riskLevel === 'Medium' ? ['#ffc107', '#dee2e6']
    : ['#dc3545', '#dee2e6'];
  riskMeterChart.update();

  // Update badge
  const badge = document.getElementById('riskLevelBadge');
  badge.textContent = riskLevel;
  badge.className = 'badge ' + (riskLevel === 'Low' ? 'bg-success' : riskLevel === 'Medium' ? 'bg-warning' : 'bg-danger');

  // Update risk score
  document.getElementById('riskScore').textContent = riskScore;

  // Update summary
  document.getElementById('verificationSummary').textContent = `
    Company: ${companyName}, Role: ${role}, Duration: ${duration} months, Stipend: $${stipend}, Fee: ${applicationFee}
  `;

  // Update flags
  const flagsList = document.getElementById('warningFlags');
  flagsList.innerHTML = '';
  flags.forEach(flag => {
    const li = document.createElement('li');
    li.textContent = flag;
    flagsList.appendChild(li);
  });

  // Update recommendations
  const recList = document.getElementById('recommendations');
  recList.innerHTML = '';
  if (riskLevel === 'Low') {
    recList.innerHTML = '<li>Internship appears legitimate. Proceed with confidence.</li>';
  } else if (riskLevel === 'Medium') {
    recList.innerHTML = '<li>Verify company details before proceeding.</li>';
  } else {
    recList.innerHTML = '<li>High risk detected. Be cautious and verify thoroughly.</li>';
  }

  // Show results
  document.getElementById('results').classList.remove('d-none');
  // Scroll to results
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
