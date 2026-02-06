'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    name: string;
    role: string;
    text: string;
    avatar?: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
    heading?: string;
    subheading?: string;
}

export default function Testimonials({
    testimonials,
    heading,
    subheading,
}: TestimonialsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const goToIndex = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from(cardRef.current, {
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []); // Empty dependency array - only run once

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4 bg-[#F4F5F6]">
            <div className="container mx-auto max-w-6xl">
                <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
                    {heading || 'Our Users Feel the Transformation'}
                </h2>
                <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4">
                    {subheading || 'Real Stories from People Empowered by Personalized Wellness'}
                </p>

                {testimonials.length > 0 && (
                    <div className="flex flex-col items-center gap-8 sm:gap-12">
                        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full">
                            <button
                                onClick={goToPrevious}
                                className="p-2 sm:p-3 rounded-full border-2 text-[#9fa6b2] border-gray-400 hover:bg-blue-500 hover:text-white hover:border-transparent transition-colors duration-300 flex-shrink-0"
                                aria-label="Previous testimonial"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div ref={cardRef} className="flex-1 max-w-2xl">
                                <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-glow transition-all duration-300">
                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center mb-4 sm:mb-6 md:mb-8">
                                        &quot;{testimonials[currentIndex].text}&quot;
                                    </p>
                                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#cc967a] flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
                                            {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <div className="text-center">
                                            <div className="font-semibold text-base sm:text-lg">{testimonials[currentIndex].name}</div>
                                            <div className="text-xs sm:text-sm text-gray-500">{testimonials[currentIndex].role}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={goToNext}
                                className="p-2 sm:p-3 rounded-full border-2 text-[#9fa6b2] border-gray-400 hover:bg-blue-500 hover:text-white hover:border-transparent transition-colors duration-300 flex-shrink-0"
                                aria-label="Next testimonial"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                            {(() => {
                                const len = testimonials.length;
                                if (len === 1) {
                                    return [0];
                                }
                                if (len === 2) {
                                    return [currentIndex, (currentIndex + 1) % len];
                                }
                                return [
                                    currentIndex,
                                    (currentIndex + 1) % len,
                                    (currentIndex + 2) % len,
                                ];
                            })().map((index) => (
                                <div
                                    key={index}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => goToIndex(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            goToIndex(index);
                                        }
                                    }}
                                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white cursor-pointer transition-all duration-300 ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-50'
                                    }`}
                                >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#cc967a] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                        {testimonials[index].name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900 text-xs sm:text-sm">{testimonials[index].name}</div>
                                        <div className="text-gray-500 text-[10px] sm:text-xs">{testimonials[index].role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
