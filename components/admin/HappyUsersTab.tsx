interface HappyUsersTabProps {
    content: {
        enabled: boolean;
        count: number;
        avatars: string[];
    };
    updateHappyUsers: (field: string, value: any) => void;
    updateHappyUserAvatar: (index: number, value: string) => void;
    addHappyUserAvatar: () => void;
    removeHappyUserAvatar: (index: number) => void;
}

export default function HappyUsersTab({
    content,
    updateHappyUsers,
    updateHappyUserAvatar,
    addHappyUserAvatar,
    removeHappyUserAvatar
}: HappyUsersTabProps) {
    return (
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-6">Happy Users Section</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="happyUsersEnabled"
                        checked={content.enabled}
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
                        value={content.count}
                        onChange={(e) => updateHappyUsers('count', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">User Avatar URLs</label>
                    {content.avatars.map((avatar, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={avatar}
                                onChange={(e) => updateHappyUserAvatar(index, e.target.value)}
                                placeholder="Avatar URL"
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button
                                onClick={() => removeHappyUserAvatar(index)}
                                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addHappyUserAvatar}
                        className="mt-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
                    >
                        + Add Avatar
                    </button>
                </div>
            </div>
        </section>
    );
}
