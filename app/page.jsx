'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import ServiceCards from '@/components/ServiceCards';
import Showreel from '@/components/Showreel';
import StudentAllocator from '@/components/StudentAllocator';
import StudentProgressTracker from '@/components/StudentProgressTracker';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

import HorizontalWords from '@/components/HorizontalWords';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <HorizontalWords />
            <main>
                <Showreel />
                <div className="content-section student-allocator-wrapper">
                    <StudentAllocator />
                </div>
                <div className="content-section student-tracker-wrapper">
                    <StudentProgressTracker />
                </div>
                <div className="content-section service-cards-wrapper">
                    <ServiceCards />
                </div>
            </main>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
