'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQ[];
    heading?: string;
    subheading?: string;
}

export default function FAQ({ faqs, heading, subheading }: FAQProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

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

            gsap.from(faqsRef.current?.children || [], {
                scrollTrigger: {
                    trigger: faqsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []); 

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4 bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
                    {heading || 'Frequently Asked Questions'}
                </h2>
                <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4">
                    {subheading || 'Get answers to common questions about our AI health assistant app'}
                </p>

                <div ref={faqsRef} className="space-y-2 sm:space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-200 last:border-b-0"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-0 py-4 sm:py-5 md:py-6 flex justify-between items-center text-left hover:opacity-75 transition-opacity duration-300"
                            >
                                <span className={`font-semibold text-sm sm:text-base md:text-lg pr-3 sm:pr-4 ${openIndex === index ? 'text-blue-500' : 'text-gray-900'}`}>
                                    {faq.question}
                                </span>
                                <span className={`text-xl sm:text-2xl text-gray-400 flex-shrink-0 transition-all duration-300 ${openIndex === index ? 'rotate-0' : ''}`}>
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="pb-4 sm:pb-5 md:pb-6 text-gray-600 leading-relaxed text-xs sm:text-sm">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
