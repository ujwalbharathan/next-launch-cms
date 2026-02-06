'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
    header?: string;
    subheader?: string;
    offerText?: string;
    backgroundImage?: string;
    iosUrl?: string;
    androidUrl?: string;
    downloadButtonEnabled?: boolean;
}

export default function CTA({
    header,
    subheader,
    offerText,
    backgroundImage,
    iosUrl,
    androidUrl,
    downloadButtonEnabled,
}: CTAProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current?.children || [], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-12 sm:py-16 md:py-24 px-4 text-center overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[727px] flex items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage || '/cta_background.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <div className="container mx-auto max-w-4xl relative z-10">
                <div ref={contentRef}>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 tracking-widest mb-3 sm:mb-4">
                        {(header || 'SPECIAL LAUNCH OFFER').toUpperCase()}
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                        {subheader || 'Your journey to better health starts now'}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 px-4">
                        {offerText || 'Get 50% off your first 3 months when you start your trial today!'}
                    </p>

                    {(downloadButtonEnabled ?? true) && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                            {/* iOS Button */}
                            <a
                                href={iosUrl || '#'}
                                target={iosUrl ? '_blank' : undefined}
                                rel={iosUrl ? 'noopener noreferrer' : undefined}
                                className="flex items-center bg-white gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-gray-900 font-semibold text-sm sm:text-base w-full sm:w-auto max-w-[200px] sm:max-w-none justify-center"
                            >
                                <Image
                                    src="/apple_logo.png"
                                    width={20}
                                    height={20}
                                    alt="Apple Logo"
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                                <span>Download</span>
                            </a>

                            {/* Android Button */}
                            <a
                                href={androidUrl || '#'}
                                target={androidUrl ? '_blank' : undefined}
                                rel={androidUrl ? 'noopener noreferrer' : undefined}
                                className="flex items-center bg-white gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-gray-900 font-semibold text-sm sm:text-base w-full sm:w-auto max-w-[200px] sm:max-w-none justify-center"
                            >
                                <Image
                                    src="/play_store_logo.png"
                                    width={20}
                                    height={20}
                                    alt="Play Store Logo"
                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                                <span>Download</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
