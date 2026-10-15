/**
 * lib/calc.js — Wealth projection engine for The Honest Million
 *
 * All results are ILLUSTRATIVE ESTIMATES based on stated assumptions.
 * Past returns do not guarantee future performance.
 *
 * Formula: Future Value of an ordinary annuity (contributions at end of period)
 *   FV = P × [((1 + r)^n − 1) / r]
 * where:
 *   P = monthly contribution (₹)
 *   r = monthly rate = annualRate / 12
 *   n = total months
 *
 * For step-up SIP: each year's contribution = prev × (1 + stepUpRate)
 * We iterate month-by-month for accuracy.
 *
 * Edge cases handled:
 *   - r = 0  → FV = P × n  (simple sum, no compounding)
 *   - P ≤ 0  → returns null (invalid)
 *   - goal ≤ 0 → returns null
 */

const GOAL = 10_000_000; // ₹1 crore
const MAX_YEARS = 60;    // cap search to 60 years to avoid infinite loops

/**
 * Calculate months to reach GOAL with a fixed monthly contribution.
 * Returns { months, finalValue } or null if unreachable within MAX_YEARS.
 */
export function calcFixed({ monthly, annualRate }) {
    if (!monthly || monthly <= 0) return null;
    const r = annualRate / 100 / 12;
    let corpus = 0;
    let totalInvested = 0;
    const maxMonths = MAX_YEARS * 12;
    for (let m = 1; m <= maxMonths; m++) {
        totalInvested += monthly;
        if (r === 0) {
            corpus += monthly;
        } else {
            corpus = corpus * (1 + r) + monthly;
        }
        if (corpus >= GOAL) return { months: m, finalValue: corpus, totalInvested };
    }
    return null; // goal not reachable
}

/**
 * Calculate months to reach GOAL with a step-up SIP.
 * Each year the contribution rises by stepUpRate%.
 * Returns { months, finalValue, totalInvested } or null if unreachable within MAX_YEARS.
 */
export function calcStepUp({ monthly, annualRate, stepUpRate }) {
    if (!monthly || monthly <= 0) return null;
    const r = annualRate / 100 / 12;
    let corpus = 0;
    let currentMonthly = monthly;
    let totalInvested = 0;
    const maxMonths = MAX_YEARS * 12;
    for (let m = 1; m <= maxMonths; m++) {
        // Step up at each full year boundary
        if (m > 1 && (m - 1) % 12 === 0) {
            currentMonthly = currentMonthly * (1 + stepUpRate / 100);
        }
        totalInvested += currentMonthly;
        if (r === 0) {
            corpus += currentMonthly;
        } else {
            corpus = corpus * (1 + r) + currentMonthly;
        }
        if (corpus >= GOAL) return { months: m, finalValue: corpus, totalInvested };
    }
    return null;
}

/**
 * Simulate effect of a contribution pause starting at pauseAtMonth.
 * Corpus keeps compounding during pause, no contributions.
 * After pause, contributions resume at the original rate.
 * Returns { months, finalValue } or null.
 */
export function calcWithPause({ monthly, annualRate, pauseStartMonth, pauseDurationMonths }) {
    if (!monthly || monthly <= 0) return null;
    const r = annualRate / 100 / 12;
    let corpus = 0;
    let elapsed = 0;
    const maxMonths = MAX_YEARS * 12;

    for (let m = 1; m <= maxMonths; m++) {
        const inPause = m > pauseStartMonth && m <= pauseStartMonth + pauseDurationMonths;
        const contribution = inPause ? 0 : monthly;
        if (r === 0) {
            corpus += contribution;
        } else {
            corpus = corpus * (1 + r) + contribution;
        }
        elapsed = m;
        if (corpus >= GOAL) break;
    }
    if (corpus < GOAL) return null;
    return { months: elapsed, finalValue: corpus };
}

/**
 * Format months into a human-readable string: "X yrs Y mo"
 */
export function formatDuration(months) {
    if (!months) return '—';
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y === 0) return `${m} mo`;
    if (m === 0) return `${y} yr${y !== 1 ? 's' : ''}`;
    return `${y} yr${y !== 1 ? 's' : ''} ${m} mo`;
}

/**
 * Format a number as ₹ with Indian shorthand (cr / L / k)
 */
export function formatRupee(value) {
    if (!value || value < 0) return '₹—';
    if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2)} cr`;
    if (value >= 100_000) return `₹${(value / 100_000).toFixed(1)} L`;
    if (value >= 1_000) return `₹${(value / 1_000).toFixed(1)}k`;
    return `₹${Math.round(value)}`;
}

/**
 * Clamp-progress toward ₹1 crore as a 0–1 ratio (for the progress bar).
 * Uses a corpus at a given point in time — caller calculates this.
 */
export function progressRatio(corpus) {
    return Math.min(corpus / GOAL, 1);
}
