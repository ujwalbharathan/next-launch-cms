interface AboutTabProps {
    content: {
        heading: string;
        subheading?: string;
        paragraph: string;
        imageUrl?: string;
        readMoreUrl?: string;
        readMoreEnabled?: boolean;
    };
    updateAbout: (field: string, value: any) => void;
}

export default function AboutTab({ content, updateAbout }: AboutTabProps) {
    return (
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-6">About Section</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heading</label>
                    <input
                        type="text"
                        value={content?.heading || ''}
                        onChange={(e) => updateAbout('heading', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
                    <input
                        type="text"
                        value={content.subheading ?? ''}
                        onChange={(e) => updateAbout('subheading', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph</label>
                    <textarea
                        value={content?.paragraph || ''}
                        onChange={(e) => updateAbout('paragraph', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
                    <input
                        type="text"
                        value={content.imageUrl ?? ''}
                        onChange={(e) => updateAbout('imageUrl', e.target.value)}
                        placeholder="https://example.com/about-image.png or /about-image.png"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            id="readmore-enabled"
                            type="checkbox"
                            checked={content.readMoreEnabled ?? false}
                            onChange={(e) => updateAbout('readMoreEnabled', e.target.checked)}
                            className="h-4 w-4 rounded text-primary border-gray-300 focus:ring-primary"
                        />
                        <label htmlFor="readmore-enabled" className="text-sm text-gray-700">Enable Read More</label>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Read More URL</label>
                        <input
                            type="text"
                            value={content.readMoreUrl ?? ''}
                            onChange={(e) => updateAbout('readMoreUrl', e.target.value)}
                            placeholder="https://example.com/about"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
