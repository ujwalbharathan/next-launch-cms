'use client';

interface FooterTabProps {
    content: {
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
    updateFooter: (field: string, value: any) => void;
}

export default function FooterTab({ content, updateFooter }: FooterTabProps) {
    const updateSocial = (platform: string, value: boolean) => {
        updateFooter('social', {
            ...content.social,
            [platform]: value
        });
    };

    const updateNavigation = (index: number, field: string, value: any) => {
        const navigations = [...content.navigations];
        navigations[index] = { ...navigations[index], [field]: value };
        updateFooter('navigations', navigations);
    };

    const updateNavigationPage = (navIndex: number, pageIndex: number, field: string, value: string) => {
        const navigations = [...content.navigations];
        const pages = [...navigations[navIndex].pages];
        pages[pageIndex] = { ...pages[pageIndex], [field]: value };
        navigations[navIndex] = { ...navigations[navIndex], pages };
        updateFooter('navigations', navigations);
    };

    const addNavigationPage = (navIndex: number) => {
        const navigations = [...content.navigations];
        const pages = [...navigations[navIndex].pages, { name: '', url: '' }];
        navigations[navIndex] = { ...navigations[navIndex], pages };
        updateFooter('navigations', navigations);
    };

    const removeNavigationPage = (navIndex: number, pageIndex: number) => {
        const navigations = [...content.navigations];
        const pages = navigations[navIndex].pages.filter((_, i) => i !== pageIndex);
        navigations[navIndex] = { ...navigations[navIndex], pages };
        updateFooter('navigations', navigations);
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Copyright Section */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Copyright</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                    <input
                        type="text"
                        value={content?.copyright || ''}
                        onChange={(e) => updateFooter('copyright', e.target.value)}
                        placeholder="© 2024 Your Company. All rights reserved."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
            </section>

            {/* Social Media Section */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Social Media</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="facebookEnabled"
                            checked={content.social.facebook}
                            onChange={(e) => updateSocial('facebook', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="facebookEnabled" className="text-sm font-semibold text-gray-700">
                            Display Facebook
                        </label>
                    </div>
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="twitterEnabled"
                            checked={content.social.twitter}
                            onChange={(e) => updateSocial('twitter', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="twitterEnabled" className="text-sm font-semibold text-gray-700">
                            Display Twitter
                        </label>
                    </div>
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="instagramEnabled"
                            checked={content.social.instagram}
                            onChange={(e) => updateSocial('instagram', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="instagramEnabled" className="text-sm font-semibold text-gray-700">
                            Display Instagram
                        </label>
                    </div>
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="linkedinEnabled"
                            checked={content.social.linkedin}
                            onChange={(e) => updateSocial('linkedin', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="linkedinEnabled" className="text-sm font-semibold text-gray-700">
                            Display LinkedIn
                        </label>
                    </div>
                </div>
            </section>

            {/* Navigation Sections */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Navigation Sections</h2>
                <div className="space-y-6">
                    {content.navigations.map((nav, navIndex) => (
                        <div key={navIndex} className="p-5 border-2 border-gray-200 rounded-xl bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Navigation {navIndex + 1}
                            </h3>

                            {/* Navigation Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={nav.title}
                                    onChange={(e) => updateNavigation(navIndex, 'title', e.target.value)}
                                    placeholder="e.g., Company, Resources, Support"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                                />
                            </div>

                            {/* Navigation Pages */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Pages
                                </label>
                                {nav.pages.map((page, pageIndex) => (
                                    <div key={pageIndex} className="mb-3 p-4 border border-gray-300 rounded-xl bg-white">
                                        <div className="flex items-start gap-2">
                                            <span className="text-sm font-medium text-gray-600 mt-3">
                                                #{pageIndex + 1}
                                            </span>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={page.name}
                                                    onChange={(e) => updateNavigationPage(navIndex, pageIndex, 'name', e.target.value)}
                                                    placeholder="Page Name (e.g., About Us)"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    value={page.url}
                                                    onChange={(e) => updateNavigationPage(navIndex, pageIndex, 'url', e.target.value)}
                                                    placeholder="URL (e.g., /about)"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeNavigationPage(navIndex, pageIndex)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addNavigationPage(navIndex)}
                                    className="mt-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium"
                                >
                                    + Add Page
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
