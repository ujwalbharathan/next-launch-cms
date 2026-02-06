'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/website/Header';
import Hero from '@/components/website/Hero';
import About from '@/components/website/About';
import Testimonials from '@/components/website/Testimonials';
import FAQ from '@/components/website/FAQ';
import CTA from '@/components/website/CTA';
import Footer from '@/components/website/Footer';
import SmoothScroll from '@/components/website/SmoothScroll';
import Loader from '@/components/common/Loader';
import Clients from '@/components/website/Clients';

interface ContentData {
    branding?: {
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
        download?: {
            appStoreUrl?: string;
            playStoreUrl?: string;
        };
    };
    hero: {
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
    };
    about: {
        heading: string;
        subheading?: string;
        paragraph: string;
        imageUrl?: string;
        readMoreEnabled?: boolean;
        readMoreUrl?: string;
    };
    clients?: Array<{
        name: string;
        logo: string;
        _id?: string;
    }>;
    testimonials: Array<{
        name: string;
        role: string;
        text: string;
        avatar?: string;
    }>;
    testimonialsSection?: {
        heading?: string;
        subheading?: string;
    };
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    faqsSection?: {
        heading?: string;
        subheading?: string;
    };
    offer?: {
        header?: string;
        subheader?: string;
        offer?: string;
        downloadButton?: {
            enabled?: boolean;
        };
    };
    footer?: {
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

export default function Home() {
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchContent = useCallback(async () => {
        try {
            const response = await fetch('/api/content');
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Failed to fetch content:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-semibold text-primary"><Loader /></div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Failed to load content</div>
            </div>
        );
    }

    return (
        <SmoothScroll>
            <main style={{ backgroundColor: '#F9F9F9' }}>
                <Header
                    logo={content.branding?.logo}
                    name={content.branding?.name}
                />
                <Hero
                    title={content.hero.title}
                    subtitle={content.hero.subtitle}
                    backgroundImage={content.hero.backgroundImage}
                    happyUsers={content.hero.happyUsers}
                    downloadButtons={content.hero.downloadButtons}
                    appStoreUrl={content.branding?.download?.appStoreUrl}
                    playStoreUrl={content.branding?.download?.playStoreUrl}
                />
                <Clients
                    clientsDetails={content.clients?.map((client) => ({
                        icon: client.logo,
                        name: client.name,
                    }))}
                />
                <About
                    heading={content.about.heading}
                    subheading={content.about.subheading}
                    paragraph={content.about.paragraph}
                    imageUrl={content.about.imageUrl}
                    readMoreEnabled={content.about.readMoreEnabled}
                    readMoreUrl={content.about.readMoreUrl}
                />
                <Testimonials
                    testimonials={content.testimonials}
                    heading={content.testimonialsSection?.heading}
                    subheading={content.testimonialsSection?.subheading}
                />
                <FAQ
                    faqs={content.faqs}
                    heading={content.faqsSection?.heading}
                    subheading={content.faqsSection?.subheading}
                />
                <CTA
                    header={content.offer?.header}
                    subheader={content.offer?.subheader}
                    offerText={content.offer?.offer}
                    downloadButtonEnabled={content.offer?.downloadButton?.enabled}
                    iosUrl={content.branding?.download?.appStoreUrl}
                    androidUrl={content.branding?.download?.playStoreUrl}
                />
                <Footer
                    logo={content.branding?.logo}
                    name={content.branding?.name}
                    description={content.branding?.description}
                    email={content.branding?.email}
                    social={content.branding?.social}
                    footerData={content.footer}
                />
            </main>
        </SmoothScroll>
    );
}
