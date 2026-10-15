'use client';

import { useState, useEffect } from 'react';
import '@/app/styles/tracker.css';

const STAGES = [
    {
        id: 0,
        chip: 'Month 1',
        title: 'Day 1 Baseline',
        age: 'Age 19',
        months: 1,
        deposited: '₹1,500',
        shield: '₹1,200',
        totalBuilt: '₹2,700',
        nextMilestone: 'Build ₹5,000 emergency buffer',
        progressPct: 0.1,
        note: 'The hardest part was starting. You automated your first SIP before spending.'
    },
    {
        id: 1,
        chip: 'Month 6',
        title: 'Emergency Shield Ready',
        age: 'Age 19.5',
        months: 6,
        deposited: '₹9,000',
        shield: '₹5,000',
        totalBuilt: '₹14,480',
        nextMilestone: 'Complete 1 full year without pause',
        progressPct: 0.3,
        note: 'Bank cushion is fully funded. You no longer worry about sudden expenses.'
    },
    {
        id: 2,
        chip: 'Year 1',
        title: '365 Days of Habit',
        age: 'Age 20',
        months: 12,
        deposited: '₹18,000',
        shield: '₹6,000',
        totalBuilt: '₹25,800',
        nextMilestone: 'Step up SIP by 10% with college gig',
        progressPct: 0.6,
        note: 'A full year completed. You ignored market noise and never skipped a month.'
    },
    {
        id: 3,
        chip: 'Year 3',
        title: 'College Graduation',
        age: 'Age 22',
        months: 36,
        deposited: '₹62,400',
        shield: '₹10,000',
        totalBuilt: '₹82,600',
        nextMilestone: 'Cross ₹1,00,000 portfolio mark',
        progressPct: 1.2,
        note: 'Graduated with zero bad debt and a compounding engine already running.'
    },
    {
        id: 4,
        chip: 'Year 5',
        title: 'The Compounding Turn',
        age: 'Age 24',
        months: 60,
        deposited: '₹1,28,000',
        shield: '₹15,000',
        totalBuilt: '₹1,94,000',
        nextMilestone: 'Cross ₹5,00,000 mark',
        progressPct: 2.5,
        note: 'Market gains now generate more money each month than Aarav deposits.'
    },
    {
        id: 5,
        chip: 'Year 10',
        title: 'The J-Curve Inflection',
        age: 'Age 29',
        months: 120,
        deposited: '₹3,75,000',
        shield: '₹25,000',
        totalBuilt: '₹8,45,000',
        nextMilestone: 'The Final ₹1 Crore Milestone',
        progressPct: 9.2,
        note: 'Compounding has done 55% of the heavy lifting. The road to ₹1 Cr is locked in.'
    }
];

const INITIAL_CHECKLIST = [
    {
        id: 'c1',
        title: 'Opened Zero-Fee Bank Account',
        desc: 'Separate account for student living with zero minimum balance penalty.',
        done: true,
        tag: 'Phase 1'
    },
    {
        id: 'c2',
        title: 'Automated First ₹1,500 SIP',
        desc: 'Set an automatic mandate for the 2nd of the month into a Nifty 50 Index Fund.',
        done: true,
        tag: 'Habit Locked'
    },
    {
        id: 'c3',
        title: 'Built ₹5,000 Emergency Shield',
        desc: 'Liquid cash in bank savings so sudden expenses never force you to stop investing.',
        done: true,
        tag: 'Protection'
    },
    {
        id: 'c4',
        title: 'Deleted Stock Trading Apps',
        desc: 'Uninstalled intraday charts, crypto Telegram groups, and noise tickers.',
        done: true,
        tag: 'Zero Stress'
    },
    {
        id: 'c5',
        title: 'Survived First Market Dip (-15%)',
        desc: 'Did not panic sell when markets dropped. Celebrated buying cheaper units.',
        done: false,
        tag: 'Mindset Test'
    },
    {
        id: 'c6',
        title: 'Added 10% Birthday Step-Up',
        desc: 'Increased monthly SIP from ₹1,500 to ₹1,650 after taking a small college gig.',
        done: false,
        tag: 'Acceleration'
    }
];

export default function StudentProgressTracker() {
    const [selectedStage, setSelectedStage] = useState(1);
    const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

    // Load saved checklist from localStorage if available
    useEffect(() => {
        try {
            const saved = localStorage.getItem('honest_million_checklist');
            if (saved) {
                setChecklist(JSON.parse(saved));
            }
        } catch {
            // fallback gracefully
        }
    }, []);

    const toggleCheck = (id) => {
        setChecklist((prev) => {
            const next = prev.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            );
            try {
                localStorage.setItem('honest_million_checklist', JSON.stringify(next));
            } catch {
                // Ignore storage errors
            }
            return next;
        });
    };

    const currentStage = STAGES[selectedStage];
    const completedCount = checklist.filter((item) => item.done).length;

    return (
        <section className="student-tracker-section" id="student-tracker">
            {/* ─── Header ─── */}
            <div className="tracker__header">
                <div className="tracker__kicker">
                    <span>The Honest Record</span>
                </div>
                <h2 className="tracker__title">
                    what you&apos;ve done <em>&amp; where you are.</em>
                </h2>
                <p className="tracker__subtitle">
                    A calm log of your real actions and financial milestones. No noisy daily tickers, no competing numbers—just your disciplined track record toward ₹1 Crore.
                </p>
            </div>

            {/* ─── Main White Card ─── */}
            <div className="tracker__card">

                {/* ── 1. Timeline Stage Selector ── */}
                <div className="tracker__timeline-box">
                    <div className="tracker__timeline-top">
                        <div className="tracker__timeline-title">
                            Aarav&apos;s Progress Timeline
                            <span>See how your holdings grow and where you reach across milestones</span>
                        </div>
                        <div className="tracker__stage-badge">
                            {currentStage.title} • {currentStage.age}
                        </div>
                    </div>

                    <div className="tracker__stage-chips">
                        {STAGES.map((st) => (
                            <button
                                key={st.id}
                                type="button"
                                className={`tracker__stage-chip ${selectedStage === st.id ? 'is-active' : ''}`}
                                onClick={() => setSelectedStage(st.id)}
                            >
                                {st.chip} ({st.title})
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── 2. Summary Boxes: Where You've Reached ── */}
                <div className="tracker__summary-grid">
                    <div className="tracker__stat-box tracker__stat-box--time">
                        <div>
                            <div className="tracker__stat-tag" style={{ color: '#4b69f0' }}>Time Invested</div>
                            <div className="tracker__stat-value">{currentStage.months} Months</div>
                        </div>
                        <div className="tracker__stat-sub">{currentStage.age} • College student timeline</div>
                    </div>

                    <div className="tracker__stat-box tracker__stat-box--saved">
                        <div>
                            <div className="tracker__stat-tag" style={{ color: '#888' }}>Total Deposited</div>
                            <div className="tracker__stat-value">{currentStage.deposited}</div>
                        </div>
                        <div className="tracker__stat-sub">From pocket money + part-time gigs</div>
                    </div>

                    <div className="tracker__stat-box tracker__stat-box--shield">
                        <div>
                            <div className="tracker__stat-tag" style={{ color: '#29725f' }}>Bank Safety Shield</div>
                            <div className="tracker__stat-value">{currentStage.shield}</div>
                        </div>
                        <div className="tracker__stat-sub">Emergency cash in liquid savings</div>
                    </div>

                    <div className="tracker__stat-box tracker__stat-box--portfolio">
                        <div>
                            <div className="tracker__stat-tag" style={{ color: '#eed7a1' }}>Total Wealth Built</div>
                            <div className="tracker__stat-value">{currentStage.totalBuilt}</div>
                        </div>
                        <div className="tracker__stat-sub" style={{ color: '#d5cbb8' }}>Principal + Compounding Returns</div>
                    </div>
                </div>

                {/* ── 3. Visual Milestone Roadmap ── */}
                <div className="tracker__progress-wrap">
                    <div className="tracker__progress-header">
                        <span className="tracker__progress-title">Roadmap to ₹1 Crore: Milestone Progress</span>
                        <span className="tracker__progress-status">Next goal: {currentStage.nextMilestone}</span>
                    </div>

                    <div className="tracker__bar-track" aria-hidden="true">
                        <div
                            className="tracker__bar-fill"
                            style={{ width: `${Math.max(currentStage.progressPct, 4)}%` }}
                        />
                    </div>

                    <div className="tracker__milestone-markers">
                        <span>Day 1 (₹0)</span>
                        <span>₹10,000 (Shield)</span>
                        <span>₹1 Lakh</span>
                        <span>₹10 Lakhs</span>
                        <span>₹1 Crore Milestone</span>
                    </div>

                    <p style={{ margin: '8px 0 0', fontFamily: 'DM Sans', fontSize: '0.85rem', color: '#555', lineHeight: 1.45 }}>
                        💬 <strong>Reality Check:</strong> {currentStage.note}
                    </p>
                </div>

                {/* ── 4. What The Student Has Done Till Now (Checklist) ── */}
                <div className="tracker__log-section">
                    <div className="tracker__log-header">
                        <h3 className="tracker__log-title">Habit Record: What You&apos;ve Done Till Now</h3>
                        <span className="tracker__log-count">{completedCount} of {checklist.length} Habits Completed</span>
                    </div>

                    <div className="tracker__checklist-grid">
                        {checklist.map((item) => (
                            <div
                                key={item.id}
                                className={`tracker__check-item ${item.done ? 'is-done' : ''}`}
                                onClick={() => toggleCheck(item.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCheck(item.id); }}
                            >
                                <div className="tracker__checkbox">
                                    {item.done ? '✓' : ''}
                                </div>
                                <div className="tracker__check-content">
                                    <div className="tracker__check-title-row">
                                        <h4 className="tracker__check-title">{item.title}</h4>
                                        <span className="tracker__check-badge">{item.tag}</span>
                                    </div>
                                    <p className="tracker__check-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 5. Calm Holdings Summary (No competing dashboard numbers) ── */}
                <div className="tracker__holdings-box">
                    <div className="tracker__holdings-top">
                        <h3 className="tracker__holdings-title">What You Hold Right Now (Calm Portfolio)</h3>
                        <span className="tracker__holdings-shield-badge">2 Simple Accounts • Zero Daily Stress</span>
                    </div>

                    <div className="tracker__accounts-grid">
                        <div className="tracker__account-card">
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: '#4b69f0' }}>Account 01</span>
                            <h4 className="tracker__account-name">Bank Savings Account (Shield)</h4>
                            <p className="tracker__account-desc">
                                Holds your {currentStage.shield} emergency cushion. Instant access via UPI. Zero market crash risk. Protects you from borrowing from friends.
                            </p>
                            <div className="tracker__account-footer">
                                <span>Risk: Zero</span>
                                <span>Access: Instant UPI</span>
                            </div>
                        </div>

                        <div className="tracker__account-card">
                            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: '#29725f' }}>Account 02</span>
                            <h4 className="tracker__account-name">Nifty 50 Index Fund (Engine)</h4>
                            <p className="tracker__account-desc">
                                Holds your compounding corpus ({currentStage.deposited} invested). Invested across India&apos;s top 50 companies. Automated on the 2nd of each month.
                            </p>
                            <div className="tracker__account-footer">
                                <span>Fee: 0.1%</span>
                                <span>Horizon: 15+ Years</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
