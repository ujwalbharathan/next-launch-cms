interface DownloadButtonsTabProps {
    content: {
        ios: {
            enabled: boolean;
            url: string;
        };
        android: {
            enabled: boolean;
            url: string;
        };
    };
    updateDownloadButton: (platform: 'ios' | 'android', field: string, value: any) => void;
}

export default function DownloadButtonsTab({ content, updateDownloadButton }: DownloadButtonsTabProps) {
    return (
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Download Buttons</h2>
            <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold mb-3">iOS App Store</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="iosEnabled"
                                checked={content.ios.enabled}
                                onChange={(e) => updateDownloadButton('ios', 'enabled', e.target.checked)}
                                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                            />
                            <label htmlFor="iosEnabled" className="text-sm font-medium text-gray-700">
                                Show iOS Button
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">App Store URL</label>
                            <input
                                type="text"
                                value={content.ios.url}
                                onChange={(e) => updateDownloadButton('ios', 'url', e.target.value)}
                                placeholder="https://apps.apple.com/..."
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold mb-3">Android Google Play</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="androidEnabled"
                                checked={content.android.enabled}
                                onChange={(e) => updateDownloadButton('android', 'enabled', e.target.checked)}
                                className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                            />
                            <label htmlFor="androidEnabled" className="text-sm font-medium text-gray-700">
                                Show Android Button
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Google Play URL</label>
                            <input
                                type="text"
                                value={content.android.url}
                                onChange={(e) => updateDownloadButton('android', 'url', e.target.value)}
                                placeholder="https://play.google.com/..."
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
