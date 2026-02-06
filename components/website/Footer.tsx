"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  logo?: string;
  name?: string;
  description?: string;
  email?: string;
  social?: {
    x?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  footerData?: {
    copyright?: string;
    social?: {
      facebook?: boolean;
      twitter?: boolean;
      instagram?: boolean;
      linkedin?: boolean;
    };
    navigations?: Array<{
      title: string;
      pages: Array<{
        name: string;
        url: string;
      }>;
    }>;
  };
}

export default function Footer({
  logo,
  name,
  description,
  email,
  social,
  footerData,
}: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(bottomRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="px-4 py-8 sm:py-10 md:py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Left Section - Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Image
                src={logo || "/logo.png"}
                alt={`${name || "Reppoo"} Logo`}
                width={28}
                height={28}
                className="w-7 h-7 sm:w-8 sm:h-8"
              />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {name || "Reppoo"}
              </h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              {description ||
                "Innovative health assistant app that leverages artificial intelligence to provide personalized wellness recommendations."}
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-gray-600 text-xs sm:text-sm hover:text-gray-900 transition-colors"
              >
                {email}
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-end gap-8 sm:gap-12 md:gap-16">
            {footerData?.navigations?.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {section.pages?.map((page, pageIdx) => (
                    <li key={pageIdx}>
                      <Link
                        href={page.url}
                        className="text-gray-600 text-xs sm:text-sm hover:text-gray-900 transition-colors"
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
        >
          <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
            {footerData?.copyright || `© 2024 ${name || "Reppoo"}. All rights reserved.`}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 sm:gap-6">
            {footerData?.social?.twitter && social?.x && (
              <Link
                href={social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors border-2 rounded-full p-2"
                aria-label="X"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            )}
            {footerData?.social?.facebook && social?.facebook && (
              <Link
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors border-2 rounded-full p-2"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            )}
            {footerData?.social?.instagram && social?.instagram && (
              <Link
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors border-2 rounded-full p-2"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
            )}
            {footerData?.social?.linkedin && social?.linkedin && (
              <Link
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors border-2 rounded-full p-2"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
