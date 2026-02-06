'use client';

import Image from 'next/image';

interface BrandingData {
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
}

interface BrandingTabProps {
    content: BrandingData;
    updateBranding: (field: string, value: any) => void;
}

export default function BrandingTab({ content, updateBranding }: BrandingTabProps) {
    const updateSocial = (platform: string, value: string) => {
        updateBranding('social', {
            ...(content.social || { x: '', facebook: '', instagram: '', linkedin: '' }),
            [platform]: value
        });
    };

    const updateDownload = (platform: string, value: string) => {
        updateBranding('download', {
            ...(content.download || { appStoreUrl: '', playStoreUrl: '' }),
            [platform]: value
        });
    };

    return (
        <div className="space-y-8 pb-8">
            {/* Logo Section */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Logo</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo URL
                        </label>
                        <input
                            type="text"
                            value={content?.logo || ''}
                            onChange={(e) => updateBranding('logo', e.target.value)}
                            placeholder="https://example.com/logo.png or /logo.png"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    {content?.logo && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600">Preview:</span>
                            <div className="w-16 h-16 relative bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                                <Image
                                    src={content.logo}
                                    alt="Logo preview"
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            value={content?.name || ''}
                            onChange={(e) => updateBranding('name', e.target.value)}
                            placeholder="Your Brand Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={content?.description || ''}
                            onChange={(e) => updateBranding('description', e.target.value)}
                            placeholder="Brief description of your brand"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            value={content?.email || ''}
                            onChange={(e) => updateBranding('email', e.target.value)}
                            placeholder="hello@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                X (Twitter)
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.social?.x || ''}
                            onChange={(e) => updateSocial('x', e.target.value)}
                            placeholder="https://x.com/yourhandle"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.social?.facebook || ''}
                            onChange={(e) => updateSocial('facebook', e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                Instagram
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.social?.instagram || ''}
                            onChange={(e) => updateSocial('instagram', e.target.value)}
                            placeholder="https://instagram.com/yourhandle"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.social?.linkedin || ''}
                            onChange={(e) => updateSocial('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/company/yourcompany"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Download Links */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">App Download Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                App Store URL
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.download?.appStoreUrl || ''}
                            onChange={(e) => updateDownload('appStoreUrl', e.target.value)}
                            placeholder="https://apps.apple.com/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                </svg>
                                Play Store URL
                            </div>
                        </label>
                        <input
                            type="url"
                            value={content.download?.playStoreUrl || ''}
                            onChange={(e) => updateDownload('playStoreUrl', e.target.value)}
                            placeholder="https://play.google.com/store/apps/..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
