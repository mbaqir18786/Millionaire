'use client';

import { useState } from 'react';
import '@/app/styles/allocator.css';

const PRESETS = [
    { label: '₹3,000', value: 3000, note: 'Basic pocket money' },
    { label: '₹5,000', value: 5000, note: 'Pocket money + tutoring' },
    { label: '₹8,000', value: 8000, note: "Aarav's exact baseline" },
    { label: '₹12,000', value: 12000, note: 'Paid college internship' },
    { label: '₹20,000', value: 20000, note: 'First part-time gig / dev job' },
];

export default function StudentAllocator() {
    const [income, setIncome] = useState(8000);

    // Calculate dynamic 3-bucket allocation
    let livingRate = 0.60;
    let safetyRate = 0.15;
    let investRate = 0.25;

    if (income <= 3500) {
        livingRate = 0.70;
        safetyRate = 0.15;
        investRate = 0.15;
    } else if (income > 12000) {
        livingRate = 0.50;
        safetyRate = 0.15;
        investRate = 0.35;
    }

    const livingAmount = Math.round(income * livingRate);
    const safetyAmount = Math.round(income * safetyRate);
    const investAmount = income - livingAmount - safetyAmount;

    const handleSliderChange = (e) => {
        setIncome(Number(e.target.value));
    };

    const handleInputChange = (e) => {
        const val = Number(e.target.value);
        if (!isNaN(val) && val >= 0 && val <= 100000) {
            setIncome(val);
        }
    };

    return (
        <section className="student-allocator-section" id="student-allocator">
            {/* ─── Header ─── */}
            <div className="allocator__header">
                <div className="allocator__kicker">
                    <span>The Student Money Compass</span>
                </div>
                <h2 className="allocator__title">
                    what should you do with <em>your income?</em>
                </h2>
                <p className="allocator__subtitle">
                    At 19, having 20 different financial options causes freeze. Slide your monthly student income to see the exact split and which choices matter right now.
                </p>
            </div>

            {/* ─── Main White Card ─── */}
            <div className="allocator__card">

                {/* ── 1. Income Selector Bar ── */}
                <div className="allocator__selector-wrap">
                    <div className="allocator__selector-top">
                        <div className="allocator__selector-label">
                            Your Monthly Money
                            <span>Pocket money, freelance stipend, or part-time gig</span>
                        </div>
                        <div className="allocator__amount-display">
                            <span className="allocator__amount-currency">₹</span>
                            <input
                                type="number"
                                className="allocator__amount-input"
                                value={income}
                                onChange={handleInputChange}
                                min="1000"
                                max="50000"
                                step="500"
                                aria-label="Monthly income amount"
                            />
                            <span className="allocator__amount-per">/ month</span>
                        </div>
                    </div>

                    {/* Presets */}
                    <div className="allocator__presets">
                        <span className="allocator__preset-label">Quick select:</span>
                        {PRESETS.map((preset) => (
                            <button
                                key={preset.value}
                                type="button"
                                className={`allocator__preset-btn ${income === preset.value ? 'is-active' : ''}`}
                                onClick={() => setIncome(preset.value)}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>

                    {/* Slider */}
                    <div className="allocator__slider-wrap">
                        <input
                            type="range"
                            min="2000"
                            max="30000"
                            step="500"
                            value={income}
                            onChange={handleSliderChange}
                            className="allocator__slider"
                            aria-label="Monthly income slider"
                        />
                    </div>
                </div>

                {/* ── 2. The 3 Student Buckets ── */}
                <div className="allocator__buckets-section">
                    <div className="allocator__section-heading">
                        <h3 className="allocator__section-title">Where Every Rupee of ₹{income.toLocaleString('en-IN')} Goes</h3>
                        <span className="allocator__section-sub">Balanced rule: Survival first • Emergency buffer • Pure compounding</span>
                    </div>

                    {/* Visual Proportional Split Bar */}
                    <div className="allocator__split-bar-track" aria-hidden="true">
                        <div
                            className="allocator__split-segment allocator__split-segment--living"
                            style={{ width: `${(livingAmount / income) * 100}%` }}
                            title={`Living: ₹${livingAmount}`}
                        />
                        <div
                            className="allocator__split-segment allocator__split-segment--shield"
                            style={{ width: `${(safetyAmount / income) * 100}%` }}
                            title={`Safety Shield: ₹${safetyAmount}`}
                        />
                        <div
                            className="allocator__split-segment allocator__split-segment--invest"
                            style={{ width: `${(investAmount / income) * 100}%` }}
                            title={`Wealth Engine: ₹${investAmount}`}
                        />
                    </div>

                    {/* 3 Cards */}
                    <div className="allocator__buckets-grid">
                        {/* Bucket 1 */}
                        <div className="allocator__bucket-card allocator__bucket-card--living">
                            <div>
                                <div className="allocator__bucket-top">
                                    <span className="allocator__bucket-tag">Bucket 01</span>
                                    <span className="allocator__bucket-pct">{Math.round((livingAmount / income) * 100)}%</span>
                                </div>
                                <h4 className="allocator__bucket-name">Living &amp; College</h4>
                                <div className="allocator__bucket-sum">₹{livingAmount.toLocaleString('en-IN')}</div>
                                <p className="allocator__bucket-desc">
                                    Mess bills, travel card, study books, chai, and basic outings with friends. Guilt-free spending for your student life.
                                </p>
                            </div>
                            <div className="allocator__bucket-tip">
                                💡 Rule: Do not starve yourself or live miserably to invest.
                            </div>
                        </div>

                        {/* Bucket 2 */}
                        <div className="allocator__bucket-card allocator__bucket-card--shield">
                            <div>
                                <div className="allocator__bucket-top">
                                    <span className="allocator__bucket-tag">Bucket 02</span>
                                    <span className="allocator__bucket-pct">{Math.round((safetyAmount / income) * 100)}%</span>
                                </div>
                                <h4 className="allocator__bucket-name">Safety Shield</h4>
                                <div className="allocator__bucket-sum">₹{safetyAmount.toLocaleString('en-IN')}</div>
                                <p className="allocator__bucket-desc">
                                    Stays in your normal bank savings account. Builds a ₹5,000–₹8,000 emergency cushion so an unexpected phone repair never forces you to stop investing.
                                </p>
                            </div>
                            <div className="allocator__bucket-tip">
                                🛡️ Rule: Touch only for genuine emergencies, never for impulse buys.
                            </div>
                        </div>

                        {/* Bucket 3 */}
                        <div className="allocator__bucket-card allocator__bucket-card--invest">
                            <div>
                                <div className="allocator__bucket-top">
                                    <span className="allocator__bucket-tag">Bucket 03</span>
                                    <span className="allocator__bucket-pct">{Math.round((investAmount / income) * 100)}%</span>
                                </div>
                                <h4 className="allocator__bucket-name">The Wealth Engine</h4>
                                <div className="allocator__bucket-sum">₹{investAmount.toLocaleString('en-IN')}</div>
                                <p className="allocator__bucket-desc">
                                    Automated on the 2nd day of every month into a low-cost Nifty 50 Index Fund SIP. Compounding does the heavy lifting for 15+ years.
                                </p>
                            </div>
                            <div className="allocator__bucket-tip" style={{ background: 'rgba(41, 114, 95, 0.1)', color: '#29725f' }}>
                                🚀 Rule: Automated deduction. Never try to time the market.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 3. Which Options Actually Matter for You? (The Verdict) ── */}
                <div className="allocator__options-section">
                    <div className="allocator__section-heading">
                        <h3 className="allocator__section-title">Which Options Matter at ₹{income.toLocaleString('en-IN')}/Month?</h3>
                        <span className="allocator__section-sub">Plain English verdict on the confusing choices</span>
                    </div>

                    <div className="allocator__options-grid">
                        {/* Option 1: Index Fund */}
                        <div className="allocator__opt-card allocator__opt-card--winner">
                            <div>
                                <div className="allocator__opt-top">
                                    <span className="allocator__opt-badge">The One Engine</span>
                                    <span className="allocator__opt-return">~12–14% CAGR</span>
                                </div>
                                <h4 className="allocator__opt-name">Nifty 50 Index Fund</h4>
                                <div className="allocator__opt-verdict">✓ Put your ₹{investAmount.toLocaleString('en-IN')} here</div>
                                <p className="allocator__opt-text">
                                    Owns the 50 largest, most profitable companies in India (TCS, Reliance, HDFC, Infosys). Tiny 0.1% fee. You don&apos;t pick stocks or stress over daily news.
                                </p>
                            </div>
                            <div className="allocator__opt-footer">
                                <span>Zero stock picking</span>
                                <span>Auto-debit</span>
                            </div>
                        </div>

                        {/* Option 2: Bank FD */}
                        <div className="allocator__opt-card allocator__opt-card--neutral">
                            <div>
                                <div className="allocator__opt-top">
                                    <span className="allocator__opt-badge">Emergency Buffer</span>
                                    <span className="allocator__opt-return">~6% Fixed</span>
                                </div>
                                <h4 className="allocator__opt-name">Bank Fixed Deposit</h4>
                                <div className="allocator__opt-verdict">Keep ₹{safetyAmount.toLocaleString('en-IN')} here only</div>
                                <p className="allocator__opt-text">
                                    Zero crash risk, but 6% inflation quietly eats your real gains. Great for your emergency buffer so you can sleep at night, but slow for building ₹1 Crore.
                                </p>
                            </div>
                            <div className="allocator__opt-footer">
                                <span>Guaranteed safety</span>
                                <span>Low real growth</span>
                            </div>
                        </div>

                        {/* Option 3: Gold */}
                        <div className="allocator__opt-card allocator__opt-card--hold">
                            <div>
                                <div className="allocator__opt-top">
                                    <span className="allocator__opt-badge">Pause For Now</span>
                                    <span className="allocator__opt-return">~8–9% Avg</span>
                                </div>
                                <h4 className="allocator__opt-name">Digital Gold / SGBs</h4>
                                <div className="allocator__opt-verdict">Skip at your current stage</div>
                                <p className="allocator__opt-text">
                                    Gold protects family wealth during wars and high inflation, but produces no business earnings or dividends. At 19, you need rapid compounding, not wealth preservation.
                                </p>
                            </div>
                            <div className="allocator__opt-footer">
                                <span>Preserves wealth</span>
                                <span>Revisit in 30s</span>
                            </div>
                        </div>

                        {/* Option 4: Crypto & Trading */}
                        <div className="allocator__opt-card allocator__opt-card--danger">
                            <div>
                                <div className="allocator__opt-top">
                                    <span className="allocator__opt-badge">Dangerous Trap</span>
                                    <span className="allocator__opt-return" style={{ color: '#c53030' }}>High Risk</span>
                                </div>
                                <h4 className="allocator__opt-name">Crypto &amp; F&amp;O Trading</h4>
                                <div className="allocator__opt-verdict">₹0 (Avoid completely)</div>
                                <p className="allocator__opt-text">
                                    SEBI studies confirm 93% of individual retail traders lose money. When your total budget is ₹{income.toLocaleString('en-IN')}, one bad Telegram tip wipes out months of hard-earned college money.
                                </p>
                            </div>
                            <div className="allocator__opt-footer">
                                <span style={{ color: '#c53030' }}>93% lose money</span>
                                <span>High stress</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 4. The 3-Step Student Action Plan ── */}
                <div className="allocator__action-box">
                    <div className="allocator__action-header">
                        <span style={{ fontSize: '1.4rem' }}>📋</span>
                        <h4 className="allocator__action-title">Your 10-Minute Setup Checklist at ₹{income.toLocaleString('en-IN')}</h4>
                    </div>
                    <div className="allocator__action-steps">
                        <div className="allocator__action-step">
                            <span className="allocator__action-num">1</span>
                            <div className="allocator__action-text">
                                <strong>Keep Bank Clean</strong>
                                Receive your ₹{income.toLocaleString('en-IN')}. Leave ₹{livingAmount.toLocaleString('en-IN')} for college and save ₹{safetyAmount.toLocaleString('en-IN')} in your bank buffer.
                            </div>
                        </div>
                        <div className="allocator__action-step">
                            <span className="allocator__action-num">2</span>
                            <div className="allocator__action-text">
                                <strong>Set Automated SIP</strong>
                                Open a direct, low-cost index fund (0.1% expense ratio). Set an auto-debit of ₹{investAmount.toLocaleString('en-IN')} for the 2nd of every month.
                            </div>
                        </div>
                        <div className="allocator__action-step">
                            <span className="allocator__action-num">3</span>
                            <div className="allocator__action-text">
                                <strong>Delete Daily Trackers</strong>
                                Do not check prices every day. When markets drop, celebrate getting cheaper units. Check your balance only once a year on your birthday.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
