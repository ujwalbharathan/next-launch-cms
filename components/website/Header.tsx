'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HeaderProps {
    logo?: string;
    name?: string;
}

export default function Header({ logo = '/logo.png', name = 'Reppoo' }: HeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <header className="border-b px-4 sm:px-8">
            <div ref={headerRef} className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image
                        src={logo}
                        alt={`${name} Logo`}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">{name}</span>
                </Link>

                <Link
                    href="/admin"
                    className="text-xs sm:text-sm text-gray-700 hover:text-primary transition-colors bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-bold"
                >
                    Admin login
                </Link>
            </div>
        </header>
    );
}
