'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    heading: string;
    subheading?: string;
    paragraph: string;
    imageUrl?: string;
    readMoreEnabled?: boolean;
    readMoreUrl?: string;
}

export default function About({
    heading,
    subheading,
    paragraph,
    imageUrl,
    readMoreEnabled,
    readMoreUrl,
}: AboutProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from(paragraphRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out',
            });

            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                x: 60,
                scale: 0.9,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                        <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                            {heading}
                        </h2>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                            {subheading || 'Smart Nutrition Planning'}
                        </h3>
                        <p ref={paragraphRef} className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
                            {paragraph}
                        </p>
                        {readMoreEnabled && readMoreUrl && (
                            <a
                                href={readMoreUrl}
                                className="text-sm sm:text-base text-gray-900 font-semibold hover:text-primary transition-colors duration-200"
                            >
                                Read More
                            </a>
                        )}
                    </div>

                    <div ref={imageRef} className="flex items-center justify-center md:justify-end mt-8 md:mt-0">
                        <Image
                            src={imageUrl || "/about.png"}
                            alt="About"
                            width={350}
                            height={350}
                            className="w-full h-auto object-cover rounded-lg max-w-xs sm:max-w-sm"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
