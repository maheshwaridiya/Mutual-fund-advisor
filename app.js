/* ================================================
   app.js — Main Application Logic
   UI management, wizard flow, results rendering
   ================================================ */

// ============ STATE ============
const TOTAL_STEPS = 8;
let currentStep = 1;
let userPrefs = {};
let marketResult = null;

const STEP_LABELS = ['Market', 'Risk', 'Amount', 'Returns', 'Mode', 'Investor', 'Sector', 'Conditions'];

// ============ NAVIGATION ============

function startAdvisor() {
  document.getElementById('hero').classList.add('hidden');
  document.getElementById('advisor').classList.remove('hidden');
  document.getElementById('results').classList.add('hidden');
  currentStep = 1;
  userPrefs = {};
  renderProgress();
  showStep(1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startOver() {
  startAdvisor();
}

function backToAdvisor() {
  document.getElementById('results').classList.add('hidden');
  document.getElementById('advisor').classList.remove('hidden');
  showStep(TOTAL_STEPS);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showStep(step) {
  document.querySelectorAll('.wizard-step').forEach(el => el.classList.add('hidden'));
  const target = document.querySelector(`.wizard-step[data-step="${step}"]`);
  if (target) {
    target.classList.remove('hidden');
    target.style.animation = 'none';
    target.offsetHeight; // reflow
    target.style.animation = 'fadeInUp 0.4s ease';
  }

  currentStep = step;
  updateNav();
  renderProgress();

  // Trigger market detection on step 8
  if (step === 8 && !marketResult) {
    detectMarket();
  }
}

function nextStep() {
  // Validate current step
  if (!validateStep(currentStep)) {
    shakeButton();
    return;
  }
  saveStepData(currentStep);

  if (currentStep === TOTAL_STEPS) {
    showResults();
    return;
  }

  showStep(currentStep + 1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateNav() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  btnPrev.disabled = currentStep === 1;

  if (currentStep === TOTAL_STEPS) {
    btnNext.innerHTML = '<i class="fas fa-search"></i> Get Recommendations';
  } else {
    btnNext.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
  }
}

function shakeButton() {
  const btn = document.getElementById('btnNext');
  btn.style.animation = 'none';
  btn.offsetHeight;
  btn.style.animation = 'shake 0.4s ease';
  setTimeout(() => { btn.style.animation = ''; }, 400);
}

// ============ PROGRESS BAR ============

function renderProgress() {
  const fill = document.getElementById('progressFill');
  fill.style.width = `${(currentStep / TOTAL_STEPS) * 100}%`;

  const stepsContainer = document.getElementById('progressSteps');
  stepsContainer.innerHTML = STEP_LABELS.map((label, i) => {
    const stepNum = i + 1;
    let cls = 'progress-step';
    if (stepNum < currentStep) cls += ' completed';
    if (stepNum === currentStep) cls += ' active';
    return `<div class="${cls}"><span class="progress-step-dot"></span><span>${label}</span></div>`;
  }).join('');
}

// ============ VALIDATION ============

function validateStep(step) {
  switch (step) {
    case 1: return !!document.querySelector('input[name="market"]:checked');
    case 2: return !!document.querySelector('input[name="risk"]:checked');
    case 3: return !!document.querySelector('input[name="amount"]:checked');
    case 4:
      return !!document.querySelector('input[name="returns"]:checked') &&
             !!document.querySelector('input[name="returnType"]:checked');
    case 5: return !!document.querySelector('input[name="mode"]:checked');
    case 6: return !!document.querySelector('input[name="investorType"]:checked');
    case 7: return document.querySelectorAll('input[name="sector"]:checked').length > 0;
    case 8: return !!document.querySelector('input[name="marketCondition"]:checked');
    default: return true;
  }
}

function saveStepData(step) {
  switch (step) {
    case 1: userPrefs.market = document.querySelector('input[name="market"]:checked').value; break;
    case 2: userPrefs.risk = document.querySelector('input[name="risk"]:checked').value; break;
    case 3: userPrefs.amount = document.querySelector('input[name="amount"]:checked').value; break;
    case 4:
      userPrefs.returns = document.querySelector('input[name="returns"]:checked').value;
      userPrefs.returnType = document.querySelector('input[name="returnType"]:checked').value;
      break;
    case 5: userPrefs.mode = document.querySelector('input[name="mode"]:checked').value; break;
    case 6: userPrefs.investorType = document.querySelector('input[name="investorType"]:checked').value; break;
    case 7:
      userPrefs.sectors = Array.from(document.querySelectorAll('input[name="sector"]:checked')).map(c => c.value);
      break;
    case 8: userPrefs.marketCondition = document.querySelector('input[name="marketCondition"]:checked').value; break;
  }
}

// ============ CURRENCY TOGGLE ============

function switchCurrency(currency) {
  document.querySelectorAll('.amount-toggle .toggle-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.currency === currency);
  });
  document.querySelectorAll('.amount-label').forEach(label => {
    label.textContent = label.dataset[currency] || label.dataset.inr;
  });
}

// ============ SECTOR LOGIC ============

// Handle "No Preference" vs specific sectors
document.addEventListener('change', function(e) {
  if (e.target.name !== 'sector') return;

  if (e.target.value === 'no-preference' && e.target.checked) {
    document.querySelectorAll('input[name="sector"]').forEach(cb => {
      if (cb.value !== 'no-preference') cb.checked = false;
    });
  } else if (e.target.value !== 'no-preference' && e.target.checked) {
    const noPref = document.querySelector('input[name="sector"][value="no-preference"]');
    if (noPref) noPref.checked = false;
  }
});

// ============ MARKET DETECTION ============

async function detectMarket() {
  const market = userPrefs.market || 'both';
  try {
    marketResult = await MarketDetector.detect(market);
    MarketDetector.renderDetection(marketResult);
  } catch (e) {
    console.warn('Market detection failed, using defaults', e);
    marketResult = { overallSentiment: 'neutral' };
    const body = document.getElementById('marketDetectBody');
    if (body) body.innerHTML = '<p style="color:var(--text-secondary)">Could not fetch live data. Please select manually below.</p>';
  }
}

// ============ RESULTS ============

function showResults() {
  saveStepData(currentStep);

  document.getElementById('advisor').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('resultsGrid').innerHTML = '';
  document.getElementById('resultsLoading').classList.remove('hidden');

  renderProfileSummary();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Simulate analysis (shows nice loading animation)
  const statuses = [
    'Filtering fund universe...',
    'Evaluating risk profiles...',
    'Analyzing return patterns...',
    'Checking market conditions...',
    'Scoring & ranking funds...',
    'Preparing recommendations...'
  ];

  let idx = 0;
  const statusEl = document.getElementById('analysisStatus');
  const interval = setInterval(() => {
    idx++;
    if (idx < statuses.length) {
      statusEl.textContent = statuses[idx];
    }
  }, 350);

  setTimeout(() => {
    clearInterval(interval);
    const recommendations = RecommendationEngine.recommend(userPrefs);
    document.getElementById('resultsLoading').classList.add('hidden');

    if (recommendations.length === 0) {
      document.getElementById('resultsGrid').innerHTML = `
        <div style="text-align:center;padding:3rem;color:var(--text-secondary)">
          <i class="fas fa-search" style="font-size:3rem;margin-bottom:1rem;display:block;color:var(--text-muted)"></i>
          <h3>No exact matches found</h3>
          <p>Try adjusting your preferences — perhaps a different risk level or broader sector selection.</p>
        </div>`;
      return;
    }

    document.getElementById('resultsSummary').textContent =
      `Found ${recommendations.length} funds matching your profile — ranked by compatibility score.`;
    renderResults(recommendations);
  }, 2200);
}

function renderProfileSummary() {
  const el = document.getElementById('profileSummary');
  const tags = [
    { icon: 'fa-globe', text: userPrefs.market === 'both' ? 'India + US' : userPrefs.market === 'india' ? 'Indian Market' : 'US Market' },
    { icon: 'fa-shield-alt', text: `${capitalize(userPrefs.risk)} Risk` },
    { icon: 'fa-wallet', text: getAmountLabel(userPrefs.amount) },
    { icon: 'fa-percentage', text: RETURN_RANGES[userPrefs.returns]?.label || userPrefs.returns },
    { icon: 'fa-calendar-alt', text: capitalize(userPrefs.returnType) + ' Returns' },
    { icon: 'fa-sync-alt', text: userPrefs.mode === 'sip' ? 'SIP' : userPrefs.mode === 'lumpsum' ? 'Lumpsum' : 'SIP + Lumpsum' },
    { icon: 'fa-user', text: capitalize(userPrefs.investorType) },
    { icon: 'fa-chart-line', text: capitalize(userPrefs.marketCondition) + ' Market' }
  ];

  const sectorTags = (userPrefs.sectors || []).map(s => ({
    icon: 'fa-tag',
    text: SECTOR_NAMES[s] || s
  }));

  el.innerHTML = [...tags, ...sectorTags].map(t =>
    `<span class="profile-tag"><i class="fas ${t.icon}"></i> ${t.text}</span>`
  ).join('');
}

function renderResults(funds) {
  const grid = document.getElementById('resultsGrid');

  grid.innerHTML = funds.map((fund, idx) => {
    const rank = idx + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : 'rank-other';
    const tags = RecommendationEngine.generateTags(fund, userPrefs);
    const taxInfo = getTaxInfo(fund);
    const expRating = getExpenseRating(fund.expenseRatio);
    const marketBadge = fund.market === 'india'
      ? '<span class="fund-market-badge india">🇮🇳 India</span>'
      : '<span class="fund-market-badge us">🇺🇸 US</span>';

    // Fund size display
    let fundSize = '—';
    if (fund.fundSizeCr) fundSize = '₹' + (fund.fundSizeCr >= 1000 ? (fund.fundSizeCr/1000).toFixed(0) + 'K Cr' : fund.fundSizeCr + ' Cr');
    else if (fund.fundSizeB) fundSize = '$' + fund.fundSizeB + 'B';

    // Star rating HTML
    const stars = Array.from({length: 5}, (_, i) =>
      `<span class="star ${i < fund.rating ? '' : 'empty'}">★</span>`
    ).join('');

    // Score breakdown bars
    const breakdownHTML = Object.entries(fund.scoreBreakdown).map(([label, val]) =>
      `<div class="score-bar-item">
        <span class="score-bar-label">${label}</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${val}%"></div></div>
        <span class="score-bar-value">${val}%</span>
      </div>`
    ).join('');

    // Tags HTML
    const tagsHTML = tags.map(t => `<span class="fund-tag ${t.type}">${t.text}</span>`).join('');

    // Tax info section
    const taxHighlight = taxInfo.highlight ? 'tax-highlight' : '';
    const taxHTML = `
      <div class="tax-info ${taxHighlight}">
        <div class="tax-header"><i class="fas fa-receipt"></i> Tax & Expense</div>
        <div class="tax-grid">
          <div class="tax-item">
            <span class="tax-label">Expense Ratio</span>
            <span class="tax-value" style="color:${expRating.color}">${fund.expenseRatio}% <small>(${expRating.label})</small></span>
          </div>
          <div class="tax-item">
            <span class="tax-label">STCG Tax</span>
            <span class="tax-value">${taxInfo.stcg}</span>
          </div>
          <div class="tax-item">
            <span class="tax-label">LTCG Tax</span>
            <span class="tax-value">${taxInfo.ltcg}</span>
          </div>
          <div class="tax-item">
            <span class="tax-label">Note</span>
            <span class="tax-value tax-note">${taxInfo.note || '—'}</span>
          </div>
        </div>
      </div>`;

    return `
    <div class="fund-card" style="animation-delay:${idx * 0.1}s">
      <div class="fund-card-header">
        <div class="fund-rank">
          <div class="rank-badge ${rankClass}">${rank}</div>
          <div class="fund-info">
            <h3>${fund.name} ${marketBadge}</h3>
            <span class="fund-category">${fund.category} &nbsp;·&nbsp; <span class="star-rating">${stars}</span></span>
          </div>
        </div>
        <div class="fund-score-container">
          <div class="fund-score">${fund.score}</div>
          <div class="fund-score-label">Match Score</div>
        </div>
      </div>

      <div class="fund-card-body">
        <div class="fund-metrics">
          <div class="metric">
            <span class="metric-label">1Y Return</span>
            <span class="metric-value ${fund.returns.y1 >= 0 ? 'positive' : 'negative'}">${fund.returns.y1 >= 0 ? '+' : ''}${fund.returns.y1}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">3Y Return</span>
            <span class="metric-value ${fund.returns.y3 >= 0 ? 'positive' : 'negative'}">${fund.returns.y3 >= 0 ? '+' : ''}${fund.returns.y3}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">5Y Return</span>
            <span class="metric-value ${fund.returns.y5 >= 0 ? 'positive' : 'negative'}">${fund.returns.y5 >= 0 ? '+' : ''}${fund.returns.y5}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Expense Ratio</span>
            <span class="metric-value" style="color:${expRating.color}">${fund.expenseRatio}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Fund Size</span>
            <span class="metric-value">${fundSize}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Min ${userPrefs.mode === 'lumpsum' ? 'Lumpsum' : 'SIP'}</span>
            <span class="metric-value">${fund.market === 'india' ? '₹' : '$'}${userPrefs.mode === 'lumpsum' ? fund.minLumpsum : fund.minSIP}</span>
          </div>
        </div>
      </div>

      ${taxHTML}

      <div class="score-breakdown">
        <div class="score-bars">${breakdownHTML}</div>
      </div>

      <div class="fund-card-footer">
        <div class="fund-tags">${tagsHTML}</div>
        <div class="fund-why">
          <div class="fund-why-title"><i class="fas fa-lightbulb"></i> Why This Fund?</div>
          <p>${fund.whyText}</p>
        </div>
      </div>
    </div>`;
  }).join('');

  // Trigger animation for each card with staggered delay
  document.querySelectorAll('.fund-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.12}s`;
  });
}

// ============ HELPERS ============

function capitalize(str) {
  if (!str) return '';
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function getAmountLabel(amount) {
  const labels = {
    micro: '₹500–5K / $50–500',
    small: '₹5K–25K / $500–2.5K',
    medium: '₹25K–1L / $2.5K–10K',
    large: '₹1L–5L / $10K–50K',
    xlarge: '₹5L+ / $50K+'
  };
  return labels[amount] || amount;
}

// ============ INIT ============

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-8px)}
  50%{transform:translateX(8px)}
  75%{transform:translateX(-4px)}
}

/* Tax Info Styles */
.tax-info {
  margin: 0 1.5rem;
  padding: 1rem;
  background: rgba(99,102,241,0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}
.tax-info.tax-highlight {
  border-color: rgba(34,197,94,0.3);
  background: rgba(34,197,94,0.03);
}
.tax-header {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.tax-highlight .tax-header {
  color: var(--success);
}
.tax-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.6rem;
}
.tax-item {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.tax-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.tax-value {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.tax-value small {
  font-weight: 400;
  opacity: 0.8;
}
.tax-note {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.78rem;
}
.tax-highlight .tax-note {
  color: var(--success);
  font-weight: 600;
}
`;
document.head.appendChild(style);

// Render initial progress bar
renderProgress();
