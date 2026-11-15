/* ================================================
   engine.js — Recommendation & Scoring Engine
   Evaluates mutual funds based on user preferences
   ================================================ */

const RecommendationEngine = {

  /**
   * Main entry: generate ranked recommendations
   * @param {Object} prefs — user preferences from wizard
   * @returns {Array} — sorted array of scored fund objects
   */
  recommend(prefs) {
    // 1. Filter funds by hard constraints
    let pool = FUND_DATABASE.filter(fund => this.passesFilter(fund, prefs));

    // 2. Score each surviving fund
    pool = pool.map(fund => ({
      ...fund,
      score: this.scoreFund(fund, prefs),
      scoreBreakdown: this.getBreakdown(fund, prefs),
      whyText: this.generateWhy(fund, prefs)
    }));

    // 3. Sort by total score descending
    pool.sort((a, b) => b.score - a.score);

    // 4. Return top results (max 8)
    return pool.slice(0, 8);
  },

  /* ========== FILTERING ========== */

  passesFilter(fund, prefs) {
    // Market filter
    if (prefs.market !== 'both') {
      if (fund.market !== prefs.market) return false;
    }

    // Amount filter — check minimum investment affordability
    const amtRange = AMOUNT_RANGES[prefs.amount];
    if (amtRange) {
      const currency = fund.market === 'india' ? 'inr' : 'usd';
      const userMax = amtRange[currency].max;
      const minRequired = prefs.mode === 'lumpsum'
        ? (fund.minLumpsum || 0)
        : (fund.minSIP || 0);
      if (minRequired > userMax) return false;
    }

    return true;
  },

  /* ========== SCORING ========== */

  scoreFund(fund, prefs) {
    const weights = {
      risk:     20,
      returns:  20,
      sector:   15,
      market:   15,
      investor: 10,
      mode:      5,
      rating:   10,
      expense:   5
    };

    let total = 0;
    total += this.scoreRisk(fund, prefs)            * weights.risk     / 100;
    total += this.scoreReturns(fund, prefs)          * weights.returns  / 100;
    total += this.scoreSector(fund, prefs)            * weights.sector   / 100;
    total += this.scoreMarketCondition(fund, prefs)   * weights.market   / 100;
    total += this.scoreInvestorType(fund, prefs)      * weights.investor / 100;
    total += this.scoreMode(fund, prefs)              * weights.mode     / 100;
    total += this.scoreRating(fund)                   * weights.rating   / 100;
    total += this.scoreExpense(fund)                  * weights.expense  / 100;

    return Math.round(total * 10) / 10;
  },

  /* --- Individual scoring dimensions --- */

  scoreRisk(fund, prefs) {
    const acceptableRisks = RISK_MAP[prefs.risk] || ['moderate'];
    if (acceptableRisks.includes(fund.riskLevel)) return 100;

    const riskOrder = ['low', 'moderate', 'high', 'very-high'];
    const fundIdx  = riskOrder.indexOf(fund.riskLevel);
    const prefIdx  = riskOrder.indexOf(prefs.risk);
    const distance = Math.abs(fundIdx - prefIdx);
    if (distance === 1) return 50;
    if (distance === 2) return 20;
    return 5;
  },

  scoreReturns(fund, prefs) {
    const range = RETURN_RANGES[prefs.returns];
    if (!range) return 50;

    const fundReturn = fund.returns.y3;
    if (fundReturn >= range.min && fundReturn <= range.max) return 100;
    if (fundReturn > range.max) return 85;          // Over-performing is fine

    const deficit = range.min - fundReturn;
    if (deficit <= 2)  return 70;
    if (deficit <= 5)  return 45;
    return 20;
  },

  scoreSector(fund, prefs) {
    const sectors = prefs.sectors || ['no-preference'];
    if (sectors.includes('no-preference')) {
      return fund.sectors.includes('diversified') ? 90 : 60;
    }
    const overlap = fund.sectors.filter(s => sectors.includes(s));
    if (overlap.length > 0) return 100;
    if (fund.sectors.includes('diversified')) return 55;
    return 10;
  },

  scoreMarketCondition(fund, prefs) {
    const condition = prefs.marketCondition || 'neutral';
    if (fund.bestMarket.includes(condition)) return 100;
    if (fund.bestMarket.length >= 3) return 80;      // All-weather
    if (fund.bestMarket.includes('neutral')) return 50;
    return 25;
  },

  scoreInvestorType(fund, prefs) {
    if (fund.suitableFor.includes(prefs.investorType)) return 100;

    const order  = ['beginner', 'intermediate', 'experienced'];
    const fundBest = Math.min(...fund.suitableFor.map(s => order.indexOf(s)));
    const userIdx  = order.indexOf(prefs.investorType);
    if (Math.abs(fundBest - userIdx) === 1) return 60;
    return 20;
  },

  scoreMode(fund, prefs) {
    if (prefs.mode === 'both') return 90;
    if (prefs.mode === 'sip')  return (fund.minSIP && fund.minSIP <= 1000) ? 100 : 70;
    return 85;
  },

  scoreRating(fund) {
    return (fund.rating / 5) * 100;
  },

  scoreExpense(fund) {
    if (fund.expenseRatio <= 0.10) return 100;
    if (fund.expenseRatio <= 0.30) return 90;
    if (fund.expenseRatio <= 0.60) return 80;
    if (fund.expenseRatio <= 1.00) return 65;
    if (fund.expenseRatio <= 1.50) return 50;
    return 35;
  },

  /* ========== BREAKDOWN (for UI bars) ========== */

  getBreakdown(fund, prefs) {
    return {
      'Risk Match':       this.scoreRisk(fund, prefs),
      'Return Potential': this.scoreReturns(fund, prefs),
      'Sector Fit':       this.scoreSector(fund, prefs),
      'Market Timing':    this.scoreMarketCondition(fund, prefs),
      'Investor Fit':     this.scoreInvestorType(fund, prefs),
      'Fund Quality':     this.scoreRating(fund)
    };
  },

  /* ========== "WHY THIS FUND?" TEXT ========== */

  generateWhy(fund, prefs) {
    const reasons = [];

    // Risk
    const acceptableRisks = RISK_MAP[prefs.risk] || ['moderate'];
    if (acceptableRisks.includes(fund.riskLevel)) {
      reasons.push(`Matches your ${prefs.risk} risk profile perfectly`);
    }

    // Returns
    const range = RETURN_RANGES[prefs.returns];
    if (range && fund.returns.y3 >= range.min) {
      reasons.push(`3-year return of ${fund.returns.y3}% meets your ${range.label} target`);
    }

    // Sector
    const sectors = prefs.sectors || ['no-preference'];
    if (!sectors.includes('no-preference')) {
      const overlap = fund.sectors.filter(s => sectors.includes(s));
      if (overlap.length > 0) {
        reasons.push(`Direct exposure to ${overlap.map(s => SECTOR_NAMES[s] || s).join(', ')}`);
      }
    }

    // Market condition
    if (fund.bestMarket.includes(prefs.marketCondition)) {
      reasons.push(`Well-suited for current ${prefs.marketCondition} market`);
    }
    if (fund.bestMarket.length >= 3) {
      reasons.push('All-weather fund — performs across market cycles');
    }

    // Investor type
    if (fund.suitableFor.includes(prefs.investorType)) {
      reasons.push(`Ideal for ${prefs.investorType} investors`);
    }

    // Return type
    if (prefs.returnType && fund.returnType && fund.returnType.includes(prefs.returnType)) {
      const typeLabels = { monthly: 'monthly income', annual: 'annual growth', maturity: 'long-term capital appreciation' };
      reasons.push(`Supports ${typeLabels[prefs.returnType] || prefs.returnType}`);
    }

    // Rating
    if (fund.rating >= 5) reasons.push('Top-rated 5-star fund');
    else if (fund.rating >= 4) reasons.push('Highly rated (4+ stars)');

    // Expense
    if (fund.expenseRatio <= 0.20) reasons.push('Ultra-low expense ratio — more money works for you');
    else if (fund.expenseRatio <= 0.50) reasons.push('Competitive expense ratio');

    // Tax benefit
    const taxInfo = getTaxInfo(fund);
    if (taxInfo.highlight) reasons.push('Tax saving benefit under Section 80C');

    // SIP affordability
    if (prefs.mode === 'sip' && fund.minSIP <= 500) {
      const sym = fund.market === 'india' ? '₹' : '$';
      reasons.push(`Low minimum SIP of ${sym}${fund.minSIP}`);
    }

    return reasons.slice(0, 4).join('. ') + '.';
  },

  /* ========== TAGS ========== */

  generateTags(fund, prefs) {
    const tags = [];

    const acceptableRisks = RISK_MAP[prefs.risk] || ['moderate'];
    if (acceptableRisks.includes(fund.riskLevel))
      tags.push({ text: '✓ Risk Match',   type: 'match' });

    const range = RETURN_RANGES[prefs.returns];
    if (range && fund.returns.y3 >= range.min)
      tags.push({ text: '✓ Meets Return Target', type: 'match' });

    const sectors = prefs.sectors || ['no-preference'];
    if (!sectors.includes('no-preference')) {
      const overlap = fund.sectors.filter(s => sectors.includes(s));
      if (overlap.length > 0)
        tags.push({ text: '✓ Sector Match', type: 'match' });
    }

    if (fund.bestMarket.includes(prefs.marketCondition))
      tags.push({ text: '✓ Market Fit', type: 'match' });

    if (fund.rating >= 4)
      tags.push({ text: `★ ${fund.rating}/5 Rated`, type: 'info' });

    if (fund.expenseRatio <= 0.30)
      tags.push({ text: 'Low Cost', type: 'info' });

    if (fund.bestMarket.length >= 3)
      tags.push({ text: 'All-Weather', type: 'info' });

    const taxInfo = getTaxInfo(fund);
    if (taxInfo.highlight)
      tags.push({ text: '✓ Tax Saving (80C)', type: 'match' });

    if (fund.riskLevel === 'very-high')
      tags.push({ text: '⚠ Very High Risk', type: 'warn' });

    return tags;
  }
};
