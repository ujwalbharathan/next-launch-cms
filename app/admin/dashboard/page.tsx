'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';
import BrandingTab from '@/components/admin/BrandingTab';
import HeroTab from '@/components/admin/HeroTab';
import AboutTab from '@/components/admin/AboutTab';
import TestimonialsTab from '@/components/admin/TestimonialsTab';
import FAQsTab from '@/components/admin/FAQsTab';
import ClientTab from '@/components/admin/ClientTab';
import OfferTab from '@/components/admin/OfferTab';
import FooterTab from '@/components/admin/FooterTab';

interface ContentData {
    branding: {
        logo: string;
        name: string;
        description: string;
        email: string;
        social: {
            x: string;
            facebook: string;
            instagram: string;
            linkedin: string;
        };
        download: {
            appStoreUrl: string;
            playStoreUrl: string;
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
        readMoreUrl?: string;
        readMoreEnabled?: boolean;
    };
    testimonials: Array<{
        name: string;
        role: string;
        text: string;
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
    clients?: Array<{
        name: string;
        logo: string;
    }>;
    offer: {
        header: string;
        subheader: string;
        offer: string;
        downloadButton: {
            enabled: boolean;
        };
    };
    footer: {
        copyright: string;
        social: {
            facebook: boolean;
            twitter: boolean;
            instagram: boolean;
            linkedin: boolean;
        };
        navigations: Array<{
            title: string;
            pages: Array<{
                name: string;
                url: string;
            }>;
        }>;
    };
}

export default function AdminDashboard() {
    const router = useRouter();
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('branding');

    const fetchContent = useCallback(async () => {
        try {
            const response = await fetch('/api/content');
            const data = await response.json();
            setContent(data);
        } catch (error) {
            console.error('Failed to fetch content:', error);
            setMessage('✗ Failed to load content. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const adminEmail = localStorage.getItem('adminEmail');
        if (!adminEmail) {
            router.push('/admin');
            return;
        }
        fetchContent();
    }, [router, fetchContent]);



    const handleSave = useCallback(async () => {
        if (!content) {
            setMessage('No content to save');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Content updated successfully!');
                // Refresh content from server to ensure sync
                await fetchContent();
                setTimeout(() => setMessage(''), 3000);
            } else {
                const errorMsg = data.error || 'Failed to update content';
                setMessage(`✗ Error: ${errorMsg}`);
                console.error('Save error:', data);
            }
        } catch (error) {
            console.error('Save exception:', error);
            setMessage('✗ Network error. Please check your connection and try again.');
        } finally {
            setSaving(false);
        }
    }, [content, fetchContent]);


    const handleLogout = () => {
        localStorage.removeItem('adminEmail');
        router.push('/admin');
    };

    // Keyboard shortcut for save (Ctrl+S or Cmd+S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (!saving) {
                    handleSave();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [saving, handleSave]); 



    const updateBranding = (field: string, value: any) => {
        setContent(prev => prev ? { ...prev, branding: { ...prev.branding, [field]: value } } : null);
    };

    const updateHero = (field: string, value: any) => {
        setContent(prev => prev ? { ...prev, hero: { ...prev.hero, [field]: value } } : null);
    };

    const updateAbout = (field: string, value: any) => {
        setContent(prev => prev ? { ...prev, about: { ...prev.about, [field]: value } } : null);
    };

    const updateOffer = (field: string, value: any) => {
        setContent(prev => prev ? { ...prev, offer: { ...prev.offer, [field]: value } } : null);
    };

    const updateFooter = (field: string, value: any) => {
        setContent(prev => prev ? { ...prev, footer: { ...prev.footer, [field]: value } } : null);
    };


    const updateTestimonial = (index: number, field: string, value: string) => {
        setContent(prev => {
            if (!prev) return null;
            const testimonials = [...prev.testimonials];
            testimonials[index] = { ...testimonials[index], [field]: value };
            return { ...prev, testimonials };
        });
    };

    const updateTestimonialsSection = (field: string, value: string) => {
        setContent(prev => prev ? { ...prev, testimonialsSection: { ...(prev.testimonialsSection || {}), [field]: value } } : null);
    };

    const addTestimonial = () => {
        setContent(prev => {
            if (!prev) return null;
            const testimonials = [...(prev.testimonials || []), { name: '', role: '', text: '' }];
            return { ...prev, testimonials };
        });
    };

    const removeTestimonial = (index: number) => {
        setContent(prev => {
            if (!prev) return null;
            const testimonials = [...(prev.testimonials || [])];
            testimonials.splice(index, 1);
            return { ...prev, testimonials };
        });
    };

    const updateFAQ = (index: number, field: string, value: string) => {
        setContent(prev => {
            if (!prev) return null;
            const faqs = [...prev.faqs];
            faqs[index] = { ...faqs[index], [field]: value };
            return { ...prev, faqs };
        });
    };

    const addFAQ = () => {
        setContent(prev => {
            if (!prev) return null;
            const faqs = [...(prev.faqs || []), { question: '', answer: '' }];
            return { ...prev, faqs };
        });
    };

    const removeFAQ = (index: number) => {
        setContent(prev => {
            if (!prev) return null;
            const faqs = [...(prev.faqs || [])];
            faqs.splice(index, 1);
            return { ...prev, faqs };
        });
    };

    const updateFAQsSection = (field: string, value: string) => {
        setContent(prev => prev ? { ...prev, faqsSection: { ...(prev.faqsSection || {}), [field]: value } } : null);
    };

    const updateClient = (index: number, field: string, value: string) => {
        setContent(prev => {
            if (!prev) return null;
            const clients = [...(prev.clients || [])];
            clients[index] = { ...clients[index], [field]: value };
            return { ...prev, clients };
        });
    };

    const addClient = () => {
        setContent(prev => {
            if (!prev) return null;
            const clients = [...(prev.clients || []), { name: '', logo: '' }];
            return { ...prev, clients };
        });
    };

    const removeClient = (index: number) => {
        setContent(prev => {
            if (!prev) return null;
            const clients = [...(prev.clients || [])];
            clients.splice(index, 1);
            return { ...prev, clients };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!content) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
                        >
                            Preview
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            title="Save and publish"
                            className={`px-6 py-2 rounded-xl text-white transition-all flex items-center gap-2 ${saving
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25'
                                }`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    Save & Publish
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {message && (
                <div className="container mx-auto px-4 pt-4">
                    <div className={`${message.includes('✓') || message.toLowerCase().includes('success')
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                        } border-2 px-4 py-3 rounded-xl text-center font-medium shadow-sm animate-fadeIn`}>
                        {message}
                    </div>
                </div>
            )}

            <div className="">
                {/* Tab Navigation */}
                <div className="bg-white mb-8 shadow-soft overflow-hidden">
                    <div className="flex border-b border-gray-200 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('branding')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'branding'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Branding
                        </button>
                        <button
                            onClick={() => setActiveTab('hero')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'hero'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Hero Section
                        </button>
                        <button
                            onClick={() => setActiveTab('clients')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'clients'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Clients
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'about'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            About Section
                        </button>
                        <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'testimonials'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Testimonials
                        </button>
                        <button
                            onClick={() => setActiveTab('faqs')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'faqs'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            FAQs
                        </button>
                        <button
                            onClick={() => setActiveTab('offers')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'offers'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Offers
                        </button>
                        <button
                            onClick={() => setActiveTab('footer')}
                            className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'footer'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Footer
                        </button>
                    </div>
                </div>
                <div className='px-4'>
                    {/* Tab Content */}
                    {activeTab === 'branding' && (
                        <BrandingTab
                            content={content.branding}
                            updateBranding={updateBranding}
                        />
                    )}

                    {activeTab === 'hero' && (
                        <HeroTab
                            content={content.hero}
                            updateHero={updateHero}
                        />
                    )}

                    {activeTab === 'clients' && (
                        <ClientTab
                            content={content.clients ?? []}
                            addClient={addClient}
                            removeClient={removeClient}
                            updateClient={updateClient}
                        />
                    )}

                    {activeTab === 'about' && (
                        <AboutTab
                            content={content.about}
                            updateAbout={updateAbout}
                        />
                    )}

                    {activeTab === 'testimonials' && (
                        <TestimonialsTab
                            content={content.testimonials}
                            updateTestimonial={updateTestimonial}
                            addTestimonial={addTestimonial}
                            removeTestimonial={removeTestimonial}
                            section={content.testimonialsSection}
                            updateSection={updateTestimonialsSection}
                        />
                    )}

                    {activeTab === 'faqs' && (
                        <FAQsTab
                            content={content.faqs}
                            updateFAQ={updateFAQ}
                            addFAQ={addFAQ}
                            removeFAQ={removeFAQ}
                            section={content.faqsSection}
                            updateSection={updateFAQsSection}
                        />
                    )}


                    {activeTab === 'offers' && (
                        <OfferTab
                            content={content.offer}
                            updateOffer={updateOffer}
                        />
                    )}

                    {activeTab === 'footer' && (
                        <FooterTab
                            content={content.footer}
                            updateFooter={updateFooter}
                        />
                    )}


                </div>


            </div>
        </div>
    );
}
