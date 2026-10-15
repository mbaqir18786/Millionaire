import './globals.css';

export const metadata = {
    title: 'Millionaire — The Arithmetic of ₹1 Crore from an ₹8,000 Baseline',
    description: 'An honest, unglamorized wealth-building journey for Aarav, a 19-year-old student starting with an illustrative ₹8,000 monthly income. Mathematics, compounding, inflation, trade-offs, and patience over hype.',
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
