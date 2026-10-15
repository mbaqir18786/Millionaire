'use client';

/**
 * Showreel.jsx — "the trajectory"
 *
 * Authentic Truus.co Editorial Design for Aarav (19, College Student):
 * - No generic SaaS cards or AI-generated dashboard grids.
 * - Bold editorial typography (Epilogue + DM Sans).
 * - Interactive inline editorial pills: tap to change savings or asset option.
 * - Clear, human answers for a beginner: Where to invest, When, What happens in a crash.
 */

import { useState } from 'react';
import '../app/styles/calculator.css';
import { calcFixed, calcStepUp, formatDuration } from '@/lib/calc';

const BAR_W = 600;
const BAR_MAX_MONTHS = 40 * 12;

export default function Showreel() {
    // Interactive state
    const [savings, setSavings] = useState(1500);
    const [assetType, setAssetType] = useState('index'); // 'index' | 'fd' | 'gold'
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    // Asset definitions
    const ASSETS = {
        index: {
            name: 'a Nifty 50 Index Fund',
            shortName: 'Index Fund (12%)',
            rate: 12,
            color: 'var(--color-lightblue)',
            badge: 'Recommended for Aarav',
            note: 'Backed by India\'s top 50 companies. Volatile year-to-year, but the best compounding engine over 20+ years.'
        },
        fd: {
            name: 'a Fixed Deposit / Bank',
            shortName: 'Bank FD (6%)',
            rate: 6,
            color: 'var(--color-pink)',
            badge: 'Emergency Shield',
            note: 'Zero crash risk, but 6% inflation erodes real gains. Great for your ₹3k emergency buffer, slow for ₹1 Crore.'
        },
        gold: {
            name: 'Digital Gold / Bonds',
            shortName: 'Gold / Bonds (9%)',
            rate: 9,
            color: 'var(--color-lightgreen)',
            badge: 'Store of Value',
            note: 'Preserves purchasing power during crises, but does not generate company profits or dividends.'
        }
    };

    const currentAsset = ASSETS[assetType];
    const savingsOptions = [500, 1000, 1500, 2500, 4000];

    // Projections
    const fixedResult = calcFixed({ monthly: savings, annualRate: currentAsset.rate });
    const stepUpResult = calcStepUp({ monthly: savings, annualRate: currentAsset.rate, stepUpRate: 10 });
    const timeSaved = fixedResult && stepUpResult ? fixedResult.months - stepUpResult.months : 0;

    return (
        <section className="showreel-section" id="showreel-section">
            <div className="showreel__content traj__editorial-wrap">

                {/* ── Section Title ── */}
                <h2 className="showreel__title">the trajectory</h2>
                <p className="traj__editorial-sub">
                    Aarav&apos;s ₹8k student roadmap to <strong className="traj__gold">₹1 Crore</strong>
                </p>

                {/* ── The Editorial Interactive Sentence ── */}
                <div className="traj__hero-sentence">
                    <span className="traj__text-dim">if aarav puts away </span>

                    {/* Interactive Savings Pill */}
                    <div className="traj__inline-pill-wrap">
                        <span className="traj__pill traj__pill--pink">
                            ₹{savings.toLocaleString('en-IN')}
                        </span>
                        <div className="traj__quick-row">
                            {savingsOptions.map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    className={`traj__mini-chip ${savings === amt ? 'is--selected' : ''}`}
                                    onClick={() => setSavings(amt)}
                                >
                                    ₹{amt.toLocaleString('en-IN')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <span className="traj__text-dim"> every month into </span>

                    {/* Interactive Asset Option Pill */}
                    <div className="traj__inline-pill-wrap">
                        <button
                            type="button"
                            className="traj__pill traj__pill--blue"
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                            title="Click to switch asset class"
                        >
                            {currentAsset.name} ▾
                        </button>

                        {/* Dropdown Options */}
                        {isOptionsOpen && (
                            <div className="traj__options-popup">
                                {Object.keys(ASSETS).map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        className={`traj__option-select-btn ${assetType === key ? 'is--active' : ''}`}
                                        onClick={() => {
                                            setAssetType(key);
                                            setIsOptionsOpen(false);
                                        }}
                                    >
                                        <div className="traj__opt-row">
                                            <span className="traj__opt-name">{ASSETS[key].shortName}</span>
                                            <span className="traj__opt-badge">{ASSETS[key].badge}</span>
                                        </div>
                                        <p className="traj__opt-note">{ASSETS[key].note}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <span className="traj__text-dim"> —</span>
                </div>

                {/* Asset Note */}
                <p className="traj__asset-context">
                    {currentAsset.note}
                </p>

                {/* ── The Two Big Typographic Timelines ── */}
                <div className="traj__numbers-row">
                    {/* Fixed Savings */}
                    <div className="traj__num-col">
                        <span className="traj__giant-number">
                            {fixedResult ? formatDuration(fixedResult.months) : '> 60 yrs'}
                        </span>
                        <span className="traj__num-caption">
                            saving the same ₹{savings.toLocaleString('en-IN')}/mo every single month
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="traj__col-divider" aria-hidden="true" />

                    {/* Step-up Savings */}
                    <div className="traj__num-col">
                        <span className="traj__giant-number traj__giant-number--blue">
                            {stepUpResult ? formatDuration(stepUpResult.months) : '> 60 yrs'}
                        </span>
                        <span className="traj__num-caption">
                            if he increases savings by 10% each year as income grows
                        </span>
                        {timeSaved > 0 && (
                            <span className="traj__speedup-tag">
                                ⚡ reaches ₹1 crore {formatDuration(timeSaved)} faster
                            </span>
                        )}
                    </div>
                </div>

                {/* ── Visual Horizon Timeline Bar ── */}
                <div className="traj__bar-container">
                    <div className="traj__bar-line-wrap">
                        <div className="traj__bar-label-row">
                            <span>constant savings</span>
                            <span>{fixedResult ? formatDuration(fixedResult.months) : 'beyond 40 yrs'}</span>
                        </div>
                        <div className="traj__bar-track">
                            <div
                                className="traj__bar-progress traj__bar-progress--white"
                                style={{
                                    width: fixedResult ? `${Math.min(100, (fixedResult.months / BAR_MAX_MONTHS) * 100)}%` : '100%'
                                }}
                            />
                        </div>
                    </div>

                    <div className="traj__bar-line-wrap">
                        <div className="traj__bar-label-row">
                            <span style={{ color: 'var(--color-lightblue)' }}>with 10% career raise</span>
                            <span style={{ color: 'var(--color-lightblue)' }}>
                                {stepUpResult ? formatDuration(stepUpResult.months) : 'beyond 40 yrs'}
                            </span>
                        </div>
                        <div className="traj__bar-track">
                            <div
                                className="traj__bar-progress traj__bar-progress--blue"
                                style={{
                                    width: stepUpResult ? `${Math.min(100, (stepUpResult.months / BAR_MAX_MONTHS) * 100)}%` : '100%'
                                }}
                            />
                        </div>
                    </div>

                    <div className="traj__bar-scale">
                        <span>0 yrs</span>
                        <span>10 yrs</span>
                        <span>20 yrs</span>
                        <span>30 yrs</span>
                        <span>40 yrs (max horizon)</span>
                    </div>
                </div>

                {/* ── 3 Honest Truths for a 19-Year-Old (No Jargon, Truus Style) ── */}
                <div className="traj__truths-grid">
                    <div className="traj__truth-item">
                        <span className="traj__truth-tag">where & when</span>
                        <h4 className="traj__truth-heading">The 1st of Every Month</h4>
                        <p className="traj__truth-body">
                            Keep ₹3,000 in your bank account as a liquid emergency shield. Set up an automated auto-debit of ₹1,500 into a Nifty 50 Index Fund on the 1st of every month right when your ₹8,000 arrives.
                        </p>
                    </div>

                    <div className="traj__truth-item">
                        <span className="traj__truth-tag traj__truth-tag--orange">the down years</span>
                        <h4 className="traj__truth-heading">When Markets Drop 25%</h4>
                        <p className="traj__truth-body">
                            Equities crash periodically (like 2008 or 2020). Do <strong>not</strong> stop your SIP. For a 19-year-old student, market drops are a discount sale—your ₹1,500 buys more units, supercharging compounding when markets bounce back.
                        </p>
                    </div>

                    <div className="traj__truth-item">
                        <span className="traj__truth-tag traj__truth-tag--blue">how to manage</span>
                        <h4 className="traj__truth-heading">Zero Dashboard Stress</h4>
                        <p className="traj__truth-body">
                            You don&apos;t need trading apps, crypto tips, or stock charts. Only 2 accounts: your bank shield + your index fund. Check your balance once a year on your birthday to add your 10% career step-up.
                        </p>
                    </div>
                </div>

                {/* ── Honest Disclosure ── */}
                <p className="traj__disclaimer">
                    these are illustrative calculations, not certified financial advice · returns of {currentAsset.rate}% are compounded monthly and based on historical Indian index averages (~12–14%) · markets fluctuate year-to-year
                </p>

            </div>
        </section>
    );
}
