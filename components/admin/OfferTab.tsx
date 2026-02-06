'use client';

interface OfferTabProps {
    content: {
        header: string;
        subheader: string;
        offer: string;
        downloadButton: {
            enabled: boolean;
        };
    };
    updateOffer: (field: string, value: any) => void;
}

export default function OfferTab({ content, updateOffer }: OfferTabProps) {
    const updateDownloadButton = (field: string, value: any) => {
        updateOffer('downloadButton', {
            ...content.downloadButton,
            [field]: value
        });
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Offer Content */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Offer Content</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Header</label>
                        <input
                            type="text"
                            value={content?.header || ''}
                            onChange={(e) => updateOffer('header', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subheader</label>
                        <input
                            type="text"
                            value={content?.subheader || ''}
                            onChange={(e) => updateOffer('subheader', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Offer</label>
                        <textarea
                            value={content?.offer || ''}
                            onChange={(e) => updateOffer('offer', e.target.value)}
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Download Button Section */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Download Button</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="downloadButtonEnabled"
                            checked={content.downloadButton?.enabled ?? false}
                            onChange={(e) => updateDownloadButton('enabled', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="downloadButtonEnabled" className="text-sm font-semibold text-gray-700">
                            Enable Download Button
                        </label>
                    </div>
                </div>
            </section>
        </div>
    );
}
