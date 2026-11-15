/* ================================================
   data.js — Curated Mutual Fund Database
   Real fund names with realistic performance data
   ================================================ */

const FUND_DATABASE = [
  // ===================== INDIAN MARKET =====================

  // --- Large Cap ---
  { id:'in-sbi-bluechip', name:'SBI Blue Chip Fund', category:'Large Cap', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.58, returns:{y1:16.2,y3:13.5,y5:14.8}, rating:5, fundSizeCr:45000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Flagship large-cap fund investing in top 100 companies by market cap. Consistent performer with low volatility.' },
  { id:'in-mirae-largecap', name:'Mirae Asset Large Cap Fund', category:'Large Cap', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.33, returns:{y1:17.1,y3:14.2,y5:15.6}, rating:5, fundSizeCr:38000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Top-rated large-cap fund with strong stock selection. Benchmark-beating returns consistently.' },
  { id:'in-axis-bluechip', name:'Axis Bluechip Fund', category:'Large Cap', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.48, returns:{y1:14.8,y3:12.9,y5:14.1}, rating:4, fundSizeCr:35000, sectors:['diversified'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Quality-focused large-cap fund with emphasis on growth at reasonable price.' },
  { id:'in-icici-bluechip', name:'ICICI Pru Bluechip Fund', category:'Large Cap', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.42, returns:{y1:15.5,y3:13.1,y5:14.3}, rating:4, fundSizeCr:42000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Well-diversified large-cap portfolio managed by experienced fund managers.' },

  // --- Mid Cap ---
  { id:'in-hdfc-midcap', name:'HDFC Mid-Cap Opportunities Fund', category:'Mid Cap', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.65, returns:{y1:22.4,y3:18.7,y5:19.2}, rating:5, fundSizeCr:52000, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'India\'s largest mid-cap fund. Invests in high-quality mid-sized companies with strong growth potential.' },
  { id:'in-kotak-emerging', name:'Kotak Emerging Equity Fund', category:'Mid Cap', market:'india', riskLevel:'high', minSIP:1000, minLumpsum:5000, expenseRatio:1.52, returns:{y1:21.8,y3:17.9,y5:18.5}, rating:5, fundSizeCr:32000, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Focused mid-cap fund with excellent stock selection in emerging growth stories.' },
  { id:'in-pgim-midcap', name:'PGIM India Midcap Opp Fund', category:'Mid Cap', market:'india', riskLevel:'high', minSIP:1000, minLumpsum:5000, expenseRatio:1.45, returns:{y1:24.3,y3:20.1,y5:21.3}, rating:5, fundSizeCr:12000, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Concentrated mid-cap portfolio with exceptional returns. Higher volatility, higher reward.' },

  // --- Small Cap ---
  { id:'in-sbi-smallcap', name:'SBI Small Cap Fund', category:'Small Cap', market:'india', riskLevel:'very-high', minSIP:500, minLumpsum:5000, expenseRatio:1.62, returns:{y1:28.5,y3:22.3,y5:24.1}, rating:5, fundSizeCr:28000, sectors:['diversified'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Premier small-cap fund with rigorous stock selection. High growth potential with significant volatility.' },
  { id:'in-nippon-smallcap', name:'Nippon India Small Cap Fund', category:'Small Cap', market:'india', riskLevel:'very-high', minSIP:500, minLumpsum:5000, expenseRatio:1.55, returns:{y1:30.2,y3:24.5,y5:26.8}, rating:5, fundSizeCr:46000, sectors:['diversified'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'India\'s largest small-cap fund. Broad-based small-cap exposure with proven track record.' },
  { id:'in-quant-smallcap', name:'Quant Small Cap Fund', category:'Small Cap', market:'india', riskLevel:'very-high', minSIP:1000, minLumpsum:5000, expenseRatio:1.68, returns:{y1:32.1,y3:28.9,y5:30.2}, rating:4, fundSizeCr:18000, sectors:['diversified'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Quant-driven small-cap strategy with explosive returns. Very high risk-reward ratio.' },

  // --- Flexi / Multi Cap ---
  { id:'in-parag-flexicap', name:'Parag Parikh Flexi Cap Fund', category:'Flexi Cap', market:'india', riskLevel:'moderate', minSIP:1000, minLumpsum:1000, expenseRatio:1.28, returns:{y1:18.3,y3:15.6,y5:17.2}, rating:5, fundSizeCr:55000, sectors:['diversified','technology'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'Unique flexi-cap fund with international diversification. Known for value investing approach and consistency.' },
  { id:'in-hdfc-flexicap', name:'HDFC Flexi Cap Fund', category:'Flexi Cap', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.46, returns:{y1:16.8,y3:14.1,y5:15.5}, rating:4, fundSizeCr:42000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Flexible allocation across market caps. Adapts to market conditions dynamically.' },
  { id:'in-quant-active', name:'Quant Active Fund', category:'Multi Cap', market:'india', riskLevel:'high', minSIP:1000, minLumpsum:5000, expenseRatio:1.58, returns:{y1:25.6,y3:22.8,y5:24.5}, rating:4, fundSizeCr:8000, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Data-driven multi-cap approach with momentum-based stock selection.' },

  // --- Index Funds ---
  { id:'in-uti-nifty50', name:'UTI Nifty 50 Index Fund', category:'Index Fund', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:1000, expenseRatio:0.18, returns:{y1:14.2,y3:12.1,y5:13.5}, rating:4, fundSizeCr:15000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Low-cost Nifty 50 index tracker. Ideal starting point for passive investing.' },
  { id:'in-hdfc-sensex', name:'HDFC Index Fund – Sensex', category:'Index Fund', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:0.20, returns:{y1:13.8,y3:11.9,y5:13.1}, rating:4, fundSizeCr:8000, sectors:['diversified'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Tracks the BSE Sensex at very low cost. Simple, effective equity exposure.' },
  { id:'in-motilal-nifty500', name:'Motilal Oswal Nifty 500 Fund', category:'Index Fund', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:500, expenseRatio:0.22, returns:{y1:16.5,y3:13.8,y5:15.0}, rating:4, fundSizeCr:4000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Broad market index covering top 500 companies. Excellent diversification at low cost.' },

  // --- ELSS (Tax Saving) ---
  { id:'in-mirae-taxsaver', name:'Mirae Asset Tax Saver Fund', category:'ELSS', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:500, expenseRatio:1.35, returns:{y1:17.8,y3:14.5,y5:16.0}, rating:5, fundSizeCr:22000, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Best-in-class ELSS fund. Tax saving under Section 80C with excellent equity returns.' },
  { id:'in-quant-taxplan', name:'Quant Tax Plan', category:'ELSS', market:'india', riskLevel:'high', minSIP:500, minLumpsum:500, expenseRatio:1.55, returns:{y1:24.2,y3:20.5,y5:22.8}, rating:4, fundSizeCr:6000, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Aggressive ELSS fund with quant-driven stock picks. High returns with higher volatility.' },

  // --- Debt / Fixed Income ---
  { id:'in-hdfc-corporate-bond', name:'HDFC Corporate Bond Fund', category:'Debt', market:'india', riskLevel:'low', minSIP:500, minLumpsum:5000, expenseRatio:0.45, returns:{y1:7.2,y3:6.8,y5:7.5}, rating:5, fundSizeCr:30000, sectors:['debt'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Top-rated corporate bond fund. Steady income with low risk. Ideal for conservative investors.' },
  { id:'in-icici-allseasons', name:'ICICI Pru All Seasons Bond Fund', category:'Debt', market:'india', riskLevel:'low', minSIP:1000, minLumpsum:5000, expenseRatio:0.58, returns:{y1:7.8,y3:7.2,y5:7.9}, rating:4, fundSizeCr:12000, sectors:['debt'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Dynamic bond allocation across maturities. Adapts to interest rate cycles.' },
  { id:'in-sbi-magnum-gilt', name:'SBI Magnum Gilt Fund', category:'Govt Securities', market:'india', riskLevel:'low', minSIP:500, minLumpsum:5000, expenseRatio:0.52, returns:{y1:6.8,y3:6.5,y5:7.1}, rating:4, fundSizeCr:8000, sectors:['debt'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Government securities fund with sovereign guarantee. Safest fixed-income option.' },

  // --- Hybrid ---
  { id:'in-icici-equity-debt', name:'ICICI Pru Equity & Debt Fund', category:'Aggressive Hybrid', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.48, returns:{y1:14.5,y3:12.8,y5:14.0}, rating:5, fundSizeCr:32000, sectors:['diversified','debt'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'Balanced equity-debt allocation. Great for moderate investors wanting both growth and stability.' },
  { id:'in-hdfc-balanced-adv', name:'HDFC Balanced Advantage Fund', category:'Balanced Advantage', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.35, returns:{y1:13.2,y3:11.5,y5:12.8}, rating:4, fundSizeCr:65000, sectors:['diversified','debt'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'Dynamic asset allocation between equity and debt. All-weather fund that auto-adjusts.' },
  { id:'in-icici-monthly-income', name:'ICICI Pru MIP 25 Fund', category:'Conservative Hybrid', market:'india', riskLevel:'low', minSIP:1000, minLumpsum:5000, expenseRatio:1.20, returns:{y1:8.5,y3:7.8,y5:8.2}, rating:4, fundSizeCr:5000, sectors:['debt','diversified'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Monthly income plan with 75% debt + 25% equity. Regular payout with moderate growth.' },

  // --- Sectoral / Thematic ---
  { id:'in-icici-tech', name:'ICICI Pru Technology Fund', category:'Sectoral - Technology', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.72, returns:{y1:20.5,y3:16.8,y5:22.1}, rating:4, fundSizeCr:12000, sectors:['technology'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Focused on IT and technology companies. Benefits from digital transformation trends.' },
  { id:'in-sbi-healthcare', name:'SBI Healthcare Opp Fund', category:'Sectoral - Healthcare', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.80, returns:{y1:18.3,y3:14.5,y5:16.8}, rating:4, fundSizeCr:3200, sectors:['healthcare'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Pharma and healthcare focused fund. Defensive sector with long-term structural growth.' },
  { id:'in-nippon-banking', name:'Nippon India Banking & Fin Fund', category:'Sectoral - Banking', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.65, returns:{y1:19.8,y3:15.2,y5:17.5}, rating:4, fundSizeCr:6500, sectors:['banking'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Banking and financial services sector fund. High beta, leveraged to economic growth.' },
  { id:'in-dsp-natural-res', name:'DSP Natural Resources Fund', category:'Sectoral - Energy', market:'india', riskLevel:'high', minSIP:500, minLumpsum:1000, expenseRatio:1.72, returns:{y1:15.2,y3:18.5,y5:16.3}, rating:3, fundSizeCr:1200, sectors:['energy','manufacturing'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Natural resources and commodity focused fund. Cyclical but rewarding in commodity upcycles.' },
  { id:'in-tata-infra', name:'Tata Infrastructure Fund', category:'Sectoral - Infra', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.75, returns:{y1:22.1,y3:19.8,y5:18.5}, rating:4, fundSizeCr:2500, sectors:['infrastructure'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Infrastructure theme fund benefiting from India\'s capex cycle and government spending.' },
  { id:'in-icici-fmcg', name:'ICICI Pru FMCG Fund', category:'Sectoral - Consumer', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.68, returns:{y1:12.5,y3:10.8,y5:13.2}, rating:3, fundSizeCr:2800, sectors:['consumer'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'FMCG and consumer staples fund. Defensive in downturns, steady in all conditions.' },
  { id:'in-kotak-realty', name:'Kotak Infra & Economic Reform', category:'Sectoral - Real Estate', market:'india', riskLevel:'high', minSIP:500, minLumpsum:5000, expenseRatio:1.72, returns:{y1:24.5,y3:20.2,y5:18.9}, rating:3, fundSizeCr:1800, sectors:['realestate','infrastructure'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Real estate and infrastructure focused fund. Rides the property and construction cycle.' },
  { id:'in-sbi-esg', name:'SBI Magnum Equity ESG Fund', category:'Thematic - ESG', market:'india', riskLevel:'moderate', minSIP:500, minLumpsum:5000, expenseRatio:1.55, returns:{y1:14.8,y3:12.2,y5:13.5}, rating:3, fundSizeCr:5500, sectors:['esg','diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'ESG-focused fund investing in companies with strong environmental, social, and governance practices.' },

  // --- International from India ---
  { id:'in-motilal-nasdaq', name:'Motilal Oswal Nasdaq 100 FOF', category:'International', market:'india', riskLevel:'high', minSIP:500, minLumpsum:500, expenseRatio:0.50, returns:{y1:22.5,y3:18.2,y5:21.5}, rating:5, fundSizeCr:5800, sectors:['technology','diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Invest in US Nasdaq 100 from India. Access to Apple, Google, Amazon, Meta etc.' },
  { id:'in-pgim-global', name:'PGIM India Global Equity Opp', category:'International', market:'india', riskLevel:'high', minSIP:1000, minLumpsum:5000, expenseRatio:1.45, returns:{y1:16.8,y3:14.5,y5:17.2}, rating:4, fundSizeCr:2200, sectors:['technology','diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Global equity fund investing across US, Europe, and emerging markets.' },

  // ===================== US MARKET =====================

  // --- Large Cap / Index ---
  { id:'us-vfiax', name:'Vanguard 500 Index (VFIAX)', category:'Large Cap Index', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.04, returns:{y1:18.5,y3:14.8,y5:15.2}, rating:5, fundSizeCr:null, fundSizeB:820, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Tracks the S&P 500 index. The gold standard of passive investing with rock-bottom fees.' },
  { id:'us-fxaix', name:'Fidelity 500 Index (FXAIX)', category:'Large Cap Index', market:'us', riskLevel:'moderate', minSIP:0, minLumpsum:0, expenseRatio:0.015, returns:{y1:18.6,y3:14.9,y5:15.3}, rating:5, fundSizeCr:null, fundSizeB:510, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Zero minimum investment S&P 500 tracker. Lowest expense ratio in its class.' },
  { id:'us-vtsax', name:'Vanguard Total Stock Market (VTSAX)', category:'Total Market', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.04, returns:{y1:17.8,y3:14.2,y5:14.8}, rating:5, fundSizeCr:null, fundSizeB:1400, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Total US stock market in one fund. Includes large, mid, and small-cap stocks.' },

  // --- Growth ---
  { id:'us-vigax', name:'Vanguard Growth Index (VIGAX)', category:'Large Cap Growth', market:'us', riskLevel:'high', minSIP:100, minLumpsum:3000, expenseRatio:0.05, returns:{y1:24.2,y3:18.5,y5:19.8}, rating:5, fundSizeCr:null, fundSizeB:220, sectors:['technology','diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Growth-focused large-cap fund. Heavy in tech and innovative companies.' },
  { id:'us-fbgrx', name:'Fidelity Blue Chip Growth (FBGRX)', category:'Large Cap Growth', market:'us', riskLevel:'high', minSIP:0, minLumpsum:0, expenseRatio:0.48, returns:{y1:26.5,y3:20.1,y5:21.5}, rating:5, fundSizeCr:null, fundSizeB:55, sectors:['technology','diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Actively managed blue-chip growth fund. Tech-heavy with exceptional track record.' },

  // --- Small Cap ---
  { id:'us-vsmax', name:'Vanguard Small Cap Index (VSMAX)', category:'Small Cap', market:'us', riskLevel:'high', minSIP:100, minLumpsum:3000, expenseRatio:0.05, returns:{y1:16.2,y3:12.5,y5:13.8}, rating:4, fundSizeCr:null, fundSizeB:140, sectors:['diversified'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Broad US small-cap exposure at low cost. Higher growth potential than large caps.' },
  { id:'us-trbcx', name:'T. Rowe Price Small-Cap Value (TRBCX)', category:'Small Cap Value', market:'us', riskLevel:'very-high', minSIP:0, minLumpsum:2500, expenseRatio:0.80, returns:{y1:14.8,y3:11.2,y5:12.5}, rating:4, fundSizeCr:null, fundSizeB:8, sectors:['diversified'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Value-oriented small-cap fund. Seeks undervalued small companies with turnaround potential.' },

  // --- International ---
  { id:'us-vtiax', name:'Vanguard Total International (VTIAX)', category:'International', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.12, returns:{y1:12.5,y3:8.8,y5:9.5}, rating:4, fundSizeCr:null, fundSizeB:450, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Non-US stock market in one fund. Global diversification across developed and emerging markets.' },
  { id:'us-vwilx', name:'Vanguard International Growth (VWILX)', category:'International Growth', market:'us', riskLevel:'high', minSIP:100, minLumpsum:3000, expenseRatio:0.32, returns:{y1:15.8,y3:11.2,y5:12.5}, rating:4, fundSizeCr:null, fundSizeB:52, sectors:['diversified','technology'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'International growth stocks outside the US. Strong tech and consumer holdings globally.' },

  // --- Bond / Fixed Income ---
  { id:'us-vbtlx', name:'Vanguard Total Bond Market (VBTLX)', category:'Bond - Broad', market:'us', riskLevel:'low', minSIP:100, minLumpsum:3000, expenseRatio:0.05, returns:{y1:4.2,y3:3.5,y5:3.8}, rating:5, fundSizeCr:null, fundSizeB:320, sectors:['debt'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Total US bond market index. Core fixed-income holding with government and corporate bonds.' },
  { id:'us-vwahx', name:'Vanguard High-Yield Corp Bond (VWAHX)', category:'Bond - High Yield', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.23, returns:{y1:6.8,y3:5.5,y5:5.8}, rating:4, fundSizeCr:null, fundSizeB:28, sectors:['debt'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['monthly','annual'], description:'High-yield corporate bonds. Higher income than investment-grade with moderate risk.' },
  { id:'us-tips', name:'Vanguard Inflation-Protected (VAIPX)', category:'Bond - TIPS', market:'us', riskLevel:'low', minSIP:100, minLumpsum:3000, expenseRatio:0.10, returns:{y1:5.1,y3:4.2,y5:4.5}, rating:4, fundSizeCr:null, fundSizeB:42, sectors:['debt'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Treasury Inflation-Protected Securities. Shields your income from inflation.' },

  // --- Balanced / Hybrid ---
  { id:'us-vbiax', name:'Vanguard Balanced Index (VBIAX)', category:'Balanced', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.07, returns:{y1:12.5,y3:10.2,y5:11.0}, rating:5, fundSizeCr:null, fundSizeB:60, sectors:['diversified','debt'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'60/40 stock-bond split. Classic balanced portfolio in a single fund.' },
  { id:'us-prwcx', name:'T. Rowe Price Capital Appr. (PRWCX)', category:'Balanced', market:'us', riskLevel:'moderate', minSIP:0, minLumpsum:2500, expenseRatio:0.70, returns:{y1:14.2,y3:11.8,y5:12.5}, rating:5, fundSizeCr:null, fundSizeB:32, sectors:['diversified','debt'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'Legendary balanced fund. Consistently strong risk-adjusted returns across all markets.' },

  // --- Target Date ---
  { id:'us-vffvx', name:'Vanguard Target Retirement 2055 (VFFVX)', category:'Target Date', market:'us', riskLevel:'high', minSIP:100, minLumpsum:1000, expenseRatio:0.08, returns:{y1:16.8,y3:13.5,y5:14.2}, rating:4, fundSizeCr:null, fundSizeB:45, sectors:['diversified','debt'], suitableFor:['beginner','intermediate'], bestMarket:['bullish','neutral'], returnType:['maturity'], description:'Set-it-and-forget-it retirement fund. Auto-adjusts risk as you approach retirement in 2055.' },

  // --- Sector: Technology ---
  { id:'us-fsptx', name:'Fidelity Select Technology (FSPTX)', category:'Sectoral - Technology', market:'us', riskLevel:'very-high', minSIP:0, minLumpsum:0, expenseRatio:0.68, returns:{y1:28.5,y3:22.1,y5:24.8}, rating:4, fundSizeCr:null, fundSizeB:14, sectors:['technology'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Pure technology sector fund. Concentrated in US tech giants and innovators.' },
  { id:'us-qtec', name:'First Trust NASDAQ-100 Tech (QTEC)', category:'Sectoral - Technology', market:'us', riskLevel:'very-high', minSIP:0, minLumpsum:0, expenseRatio:0.57, returns:{y1:30.2,y3:24.5,y5:26.2}, rating:4, fundSizeCr:null, fundSizeB:5, sectors:['technology'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Equal-weighted Nasdaq 100 tech stocks. Less FAANG-heavy, more mid-cap tech exposure.' },

  // --- Sector: Healthcare ---
  { id:'us-vghcx', name:'Vanguard Health Care (VGHCX)', category:'Sectoral - Healthcare', market:'us', riskLevel:'high', minSIP:100, minLumpsum:3000, expenseRatio:0.31, returns:{y1:14.8,y3:11.5,y5:13.2}, rating:5, fundSizeCr:null, fundSizeB:48, sectors:['healthcare'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Diversified healthcare fund. Pharma, biotech, medical devices, and healthcare services.' },
  { id:'us-fbiox', name:'Fidelity Select Biotechnology (FBIOX)', category:'Sectoral - Healthcare', market:'us', riskLevel:'very-high', minSIP:0, minLumpsum:0, expenseRatio:0.69, returns:{y1:18.2,y3:12.8,y5:14.5}, rating:4, fundSizeCr:null, fundSizeB:6, sectors:['healthcare'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['maturity'], description:'Concentrated biotech fund. High risk-reward with exposure to breakthrough therapies.' },

  // --- Sector: Real Estate ---
  { id:'us-vgslx', name:'Vanguard Real Estate Index (VGSLX)', category:'Sectoral - Real Estate', market:'us', riskLevel:'high', minSIP:100, minLumpsum:3000, expenseRatio:0.12, returns:{y1:10.5,y3:8.2,y5:9.8}, rating:4, fundSizeCr:null, fundSizeB:72, sectors:['realestate'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['monthly','annual'], description:'US REIT index fund. Real estate exposure with dividend income from property trusts.' },

  // --- Sector: Energy ---
  { id:'us-vgenx', name:'Vanguard Energy Fund (VGENX)', category:'Sectoral - Energy', market:'us', riskLevel:'very-high', minSIP:100, minLumpsum:3000, expenseRatio:0.30, returns:{y1:12.5,y3:15.8,y5:10.2}, rating:3, fundSizeCr:null, fundSizeB:8, sectors:['energy'], suitableFor:['experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'Traditional and renewable energy companies. Cyclical with commodity price sensitivity.' },
  { id:'us-icln', name:'iShares Global Clean Energy (ICLN)', category:'Thematic - Clean Energy', market:'us', riskLevel:'very-high', minSIP:0, minLumpsum:0, expenseRatio:0.40, returns:{y1:8.5,y3:6.2,y5:11.5}, rating:3, fundSizeCr:null, fundSizeB:3, sectors:['energy','esg'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['maturity'], description:'Global clean energy stocks. Solar, wind, and other renewable energy companies.' },

  // --- Sector: Financial ---
  { id:'us-fidsx', name:'Fidelity Select Financial (FIDSX)', category:'Sectoral - Banking', market:'us', riskLevel:'high', minSIP:0, minLumpsum:0, expenseRatio:0.72, returns:{y1:16.8,y3:12.5,y5:14.2}, rating:4, fundSizeCr:null, fundSizeB:4, sectors:['banking'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'US financial services sector. Banks, insurance, fintech, and asset managers.' },

  // --- Sector: Consumer ---
  { id:'us-fdfax', name:'Fidelity Select Consumer Staples (FDFAX)', category:'Sectoral - Consumer', market:'us', riskLevel:'moderate', minSIP:0, minLumpsum:0, expenseRatio:0.72, returns:{y1:8.5,y3:7.2,y5:9.8}, rating:3, fundSizeCr:null, fundSizeB:2.5, sectors:['consumer'], suitableFor:['intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['annual','maturity'], description:'Consumer staples defensive fund. Procter & Gamble, Coca-Cola, Walmart — recession-resistant.' },

  // --- Sector: Manufacturing/Industrial ---
  { id:'us-fscgx', name:'Fidelity Select Industrials (FCYIX)', category:'Sectoral - Manufacturing', market:'us', riskLevel:'high', minSIP:0, minLumpsum:0, expenseRatio:0.71, returns:{y1:18.5,y3:14.2,y5:15.8}, rating:4, fundSizeCr:null, fundSizeB:3, sectors:['manufacturing'], suitableFor:['intermediate','experienced'], bestMarket:['bullish'], returnType:['annual','maturity'], description:'US industrial and manufacturing sector. Aerospace, defense, machinery, and transportation.' },

  // --- ESG ---
  { id:'us-prblx', name:'Parnassus Core Equity (PRBLX)', category:'ESG', market:'us', riskLevel:'moderate', minSIP:0, minLumpsum:2000, expenseRatio:0.82, returns:{y1:16.2,y3:13.5,y5:14.8}, rating:5, fundSizeCr:null, fundSizeB:28, sectors:['esg','diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Leading ESG large-cap fund. Avoids fossil fuels, weapons. Strong returns with clean conscience.' },
  { id:'us-vftax', name:'Vanguard FTSE Social Index (VFTAX)', category:'ESG', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.14, returns:{y1:17.5,y3:14.0,y5:15.0}, rating:4, fundSizeCr:null, fundSizeB:15, sectors:['esg','diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral'], returnType:['annual','maturity'], description:'Low-cost ESG index fund. Screens out controversial industries while tracking the broad market.' },

  // --- Income / Dividend ---
  { id:'us-vdadx', name:'Vanguard Dividend Appreciation (VDADX)', category:'Dividend', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.08, returns:{y1:14.2,y3:12.1,y5:13.5}, rating:5, fundSizeCr:null, fundSizeB:85, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'Companies with 10+ years of dividend growth. Steady income with capital appreciation.' },
  { id:'us-vhyax', name:'Vanguard High Dividend Yield (VHYAX)', category:'High Dividend', market:'us', riskLevel:'moderate', minSIP:100, minLumpsum:3000, expenseRatio:0.08, returns:{y1:12.5,y3:10.8,y5:11.5}, rating:4, fundSizeCr:null, fundSizeB:55, sectors:['diversified'], suitableFor:['beginner','intermediate','experienced'], bestMarket:['bullish','neutral','bearish'], returnType:['monthly','annual'], description:'High-yielding dividend stocks. Emphasis on income generation over capital growth.' }
];

// Return expectation mapping
const RETURN_RANGES = {
  conservative: { min: 4, max: 8, label: '6–8% p.a.' },
  moderate:     { min: 8, max: 14, label: '8–14% p.a.' },
  high:         { min: 14, max: 22, label: '14–20% p.a.' },
  'very-high':  { min: 20, max: 50, label: '20%+ p.a.' }
};

// Amount range mapping (for filtering by min investment)
const AMOUNT_RANGES = {
  micro:  { inr: { min: 500, max: 5000 },   usd: { min: 50, max: 500 } },
  small:  { inr: { min: 5000, max: 25000 },  usd: { min: 500, max: 2500 } },
  medium: { inr: { min: 25000, max: 100000 }, usd: { min: 2500, max: 10000 } },
  large:  { inr: { min: 100000, max: 500000 }, usd: { min: 10000, max: 50000 } },
  xlarge: { inr: { min: 500000, max: 10000000 }, usd: { min: 50000, max: 1000000 } }
};

// Risk mapping
const RISK_MAP = {
  low:       ['low'],
  moderate:  ['low', 'moderate'],
  high:      ['moderate', 'high'],
  'very-high': ['high', 'very-high']
};

// Sector display names
const SECTOR_NAMES = {
  'no-preference': 'Diversified',
  technology: 'Technology',
  healthcare: 'Healthcare',
  banking: 'Banking & Finance',
  infrastructure: 'Infrastructure',
  consumer: 'Consumer & FMCG',
  manufacturing: 'Manufacturing',
  realestate: 'Real Estate',
  energy: 'Energy',
  esg: 'ESG / Sustainable'
};

// =====================================================
// TAX RULES — Indian & US Mutual Fund Taxation
// =====================================================

const TAX_RULES = {
  india: {
    'Large Cap':           { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'Mid Cap':             { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'Small Cap':           { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'Flexi Cap':           { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'Multi Cap':           { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'Index Fund':          { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'No tax deduction benefit' },
    'ELSS':                { type:'Equity', stcg:'N/A (3-yr lock-in)', ltcg:'10% above ₹1L (held ≥ 3 yr)', note:'✅ Sec 80C deduction up to ₹1.5L', highlight: true },
    'Debt':                { type:'Debt',   stcg:'As per income slab', ltcg:'As per income slab (no indexation)', note:'No indexation benefit post Apr 2023' },
    'Govt Securities':     { type:'Debt',   stcg:'As per income slab', ltcg:'As per income slab', note:'Interest taxed at slab rate' },
    'Aggressive Hybrid':   { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'Equity taxation (≥65% equity)' },
    'Balanced Advantage':  { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'Equity taxation (dynamic allocation)' },
    'Conservative Hybrid': { type:'Debt',   stcg:'As per income slab', ltcg:'As per income slab', note:'Debt taxation (<65% equity)' },
    'International':       { type:'Debt',   stcg:'As per income slab', ltcg:'As per income slab', note:'Treated as debt fund for tax' },
    'default':             { type:'Equity', stcg:'15% (held < 1 yr)', ltcg:'10% above ₹1L (held ≥ 1 yr)', note:'' }
  },
  us: {
    'default': { type:'US Fund', stcg:'Ordinary income rate (held < 1 yr)', ltcg:'0% / 15% / 20% based on income (held ≥ 1 yr)', note:'Qualified dividends taxed at LTCG rate' }
  }
};

// Helper: get tax info for a fund
function getTaxInfo(fund) {
  const market = fund.market;
  const rulesMap = TAX_RULES[market] || TAX_RULES.us;

  // Try exact category match, then try partial match, then default
  let cat = fund.category;
  if (rulesMap[cat]) return rulesMap[cat];

  // Partial match — check if category starts with a key
  for (const key of Object.keys(rulesMap)) {
    if (key !== 'default' && cat.startsWith(key)) return rulesMap[key];
  }

  // Check for sectoral/thematic funds
  if (cat.startsWith('Sectoral') || cat.startsWith('Thematic')) {
    if (market === 'india') return rulesMap['Large Cap']; // Sectoral equity = equity taxation
    return rulesMap['default'];
  }

  return rulesMap['default'] || TAX_RULES.us['default'];
}

// Expense ratio rating helper
function getExpenseRating(ratio) {
  if (ratio <= 0.10) return { label: 'Ultra Low', color: '#22c55e', icon: '⭐' };
  if (ratio <= 0.30) return { label: 'Very Low', color: '#22c55e', icon: '👍' };
  if (ratio <= 0.60) return { label: 'Low', color: '#10b981', icon: '✓' };
  if (ratio <= 1.00) return { label: 'Moderate', color: '#f59e0b', icon: '—' };
  if (ratio <= 1.50) return { label: 'Average', color: '#f97316', icon: '⚠' };
  return { label: 'High', color: '#ef4444', icon: '⚠' };
}
