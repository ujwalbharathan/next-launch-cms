'use client';

interface HeroTabProps {
    content: {
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
    updateHero: (field: string, value: any) => void;
}

export default function HeroTab({ content, updateHero }: HeroTabProps) {
    const updateHappyUsers = (field: string, value: any) => {
        updateHero('happyUsers', {
            enabled: content.happyUsers?.enabled ?? true,
            count: content.happyUsers?.count ?? 59182,
            avatars: content.happyUsers?.avatars ?? [],
            ...content.happyUsers,
            [field]: value
        });
    };

    const updateHappyUserAvatar = (index: number, field: 'name' | 'url', value: string) => {
        const avatars = [...(content.happyUsers?.avatars ?? [])];
        avatars[index] = { ...avatars[index], [field]: value };
        updateHappyUsers('avatars', avatars);
    };

    const addHappyUserAvatar = () => {
        const avatars = [...(content.happyUsers?.avatars ?? []), { name: '', url: '' }];
        updateHappyUsers('avatars', avatars);
    };

    const removeHappyUserAvatar = (index: number) => {
        const avatars = (content.happyUsers?.avatars ?? []).filter((_, i) => i !== index);
        updateHappyUsers('avatars', avatars);
    };

    const updateDownloadButton = (platform: 'ios' | 'android', field: string, value: any) => {
        const currentButtons = content.downloadButtons || {
            ios: { enabled: true },
            android: { enabled: true }
        };

        updateHero('downloadButtons', {
            ...currentButtons,
            [platform]: {
                ...currentButtons[platform],
                [field]: value
            }
        });
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Basic Hero Content */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Hero Content</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            value={content?.title || ''}
                            onChange={(e) => updateHero('title', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <textarea
                            value={content?.subtitle || ''}
                            onChange={(e) => updateHero('subtitle', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                        <input
                            type="text"
                            value={content?.backgroundImage || ''}
                            onChange={(e) => updateHero('backgroundImage', e.target.value)}
                            placeholder="https://example.com/image.jpg or /image.jpg"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Happy Users Section */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Happy Users</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="happyUsersEnabled"
                            checked={content.happyUsers?.enabled ?? true}
                            onChange={(e) => updateHappyUsers('enabled', e.target.checked)}
                            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="happyUsersEnabled" className="text-sm font-medium text-gray-700">
                            Enable Happy Users Counter
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">User Count</label>
                        <input
                            type="number"
                            value={content.happyUsers?.count ?? 59182}
                            onChange={(e) => updateHappyUsers('count', parseInt(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">User Avatars</label>
                        {(content.happyUsers?.avatars ?? []).map((avatar, index) => (
                            <div key={index} className="mb-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-sm font-medium text-gray-600 mt-3">#{index + 1}</span>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            value={avatar.name}
                                            onChange={(e) => updateHappyUserAvatar(index, 'name', e.target.value)}
                                            placeholder="User Name"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                        <input
                                            type="text"
                                            value={avatar.url}
                                            onChange={(e) => updateHappyUserAvatar(index, 'url', e.target.value)}
                                            placeholder="Avatar URL"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeHappyUserAvatar(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addHappyUserAvatar}
                            className="mt-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-medium"
                        >
                            + Add Avatar
                        </button>
                    </div>
                </div>
            </section>

            {/* Download Buttons Section */}
            <section className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Download Buttons</h2>
                <div className="space-y-3">
                    {/* iOS Button */}
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="iosEnabled"
                            checked={content.downloadButtons?.ios?.enabled ?? true}
                            onChange={(e) => updateDownloadButton('ios', 'enabled', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="iosEnabled" className="text-sm font-semibold text-gray-700">
                            iOS / App Store
                        </label>
                    </div>

                    {/* Android Button */}
                    <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                        <input
                            type="checkbox"
                            id="androidEnabled"
                            checked={content.downloadButtons?.android?.enabled ?? true}
                            onChange={(e) => updateDownloadButton('android', 'enabled', e.target.checked)}
                            className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="androidEnabled" className="text-sm font-semibold text-gray-700">
                            Android / Play Store
                        </label>
                    </div>
                </div>
            </section>
        </div>
    );
}
