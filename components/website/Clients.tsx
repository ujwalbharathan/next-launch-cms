"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ClientsProps {
  clientsDetails?: Array<{ icon: string; name: string }>;
}

export default function Clients({ clientsDetails }: ClientsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const clientsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(clientsContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-4 py-8">
      <div className="container mx-auto">
        <div
          ref={clientsContainerRef}
          role="list"
          className="flex items-center overflow-x-auto px-4 cursor-grab"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {clientsDetails?.map((client, index) => (
            <div
              key={index}
              role="listitem"
              className="flex-shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-200 w-1/2 sm:w-1/3 md:w-1/5"
              style={{ scrollSnapAlign: "center", minWidth: "0" }}
            >
              <Image
                src={client.icon}
                alt={client.name}
                width={180}
                height={48}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
