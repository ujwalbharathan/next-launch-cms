"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  happyUsers?: {
    enabled: boolean;
    count: number;
    avatars: Array<{ name: string; url: string }>;
  };
  downloadButtons?: {
    ios: {
      enabled: boolean;
    };
    android: {
      enabled: boolean;
    };
  };
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  happyUsers,
  downloadButtons,
  appStoreUrl,
  playStoreUrl,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const happyUsersRef = useRef<HTMLDivElement>(null);

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
      });

      if (happyUsers?.enabled && happyUsersRef.current) {
        gsap.from(happyUsersRef.current, {
          scrollTrigger: {
            trigger: happyUsersRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Animate title when it comes into view
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate subtitle when it comes into view
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate download buttons when they come into view
      if (buttonsRef.current) {
        gsap.from(buttonsRef.current, {
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [happyUsers]);


  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[800px] md:min-h-[1116px] flex items-end justify-center py-8 sm:py-12 overflow-hidden"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center sm:bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div
        className="relative z-10 w-full shadow-lg px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12"
        style={{
          backgroundColor: 'rgba(249, 249, 249, 0.85)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(249, 249, 249, 0.5) 8%, #F9F9F9 15%, #F9F9F9 75%, rgba(249, 249, 249, 0.7) 85%, rgba(249, 249, 249, 0.3) 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(249, 249, 249, 0.5) 8%, #F9F9F9 15%, #F9F9F9 75%, rgba(249, 249, 249, 0.7) 85%, rgba(249, 249, 249, 0.3) 90%, transparent 100%)',
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 mt-2 sm:mb-12 relative z-10">
            {/* Happy Users Section */}
            {happyUsers?.enabled && (
              <div
                ref={happyUsersRef}
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4"
              >
                {/* User Avatars */}
                <div className="flex -space-x-3">
                  {happyUsers.avatars && happyUsers.avatars.length > 0 ? (
                    happyUsers.avatars.slice(0, 4).map((avatar, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                        title={avatar.name}
                      >
                        <Image
                          src={avatar.url}
                          alt={avatar.name || `Happy user ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={40}
                          height={40}
                        />
                      </div>
                    ))
                  ) : (
                    // Default avatars if none provided
                    <>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-orange-400 to-pink-500 shadow-md"></div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-cyan-500 shadow-md"></div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-indigo-500 shadow-md"></div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500 shadow-md"></div>
                    </>
                  )}
                </div>
                {/* User Count */}
                <div className="text-gray-800 font-semibold">
                  <span className="text-xl sm:text-2xl font-bold">
                    {formatNumber(happyUsers.count)}
                  </span>
                  <span className="text-sm sm:text-base font-normal ml-2 text-gray-600">
                    Happy Users
                  </span>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-2xl mb-3 sm:mb-4">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 font-medium leading-tight tracking-tight text-center"
              >
                {title}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-xl mb-8 sm:mb-12 max-w-full sm:max-w-3xl mx-auto">
              <p
                ref={subtitleRef}
                className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed tracking-tight text-center px-2"
              >
                {subtitle}
              </p>
            </div>

            {/* Download Buttons */}
            {(downloadButtons?.ios?.enabled ||
              downloadButtons?.android?.enabled) && (
                <div
                  ref={buttonsRef}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-16"
                >
                  {/* iOS Button */}
                  {downloadButtons?.ios?.enabled && (
                    <a
                      href={appStoreUrl || '#'}
                      target={appStoreUrl ? "_blank" : undefined}
                      rel={appStoreUrl ? "noopener noreferrer" : undefined}
                      className="flex items-center bg-white gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto max-w-[200px] sm:max-w-none justify-center"
                    >
                      <Image
                        src={"/apple_logo.png"}
                        width={20}
                        height={20}
                        alt="Apple Logo"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      <div className="text-sm sm:text-base font-bold">
                        Download
                      </div>
                    </a>
                  )}

                  {/* Android Button */}
                  {downloadButtons?.android?.enabled && (
                    <a
                      href={playStoreUrl || '#'}
                      target={playStoreUrl ? "_blank" : undefined}
                      rel={playStoreUrl ? "noopener noreferrer" : undefined}
                      className="flex items-center bg-white gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto max-w-[200px] sm:max-w-none justify-center"
                    >
                      <Image
                        src={"/play_store_logo.png"}
                        width={20}
                        height={20}
                        alt="Play Store Logo"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                      <div className="text-sm sm:text-base font-bold">
                        Download
                      </div>
                    </a>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
