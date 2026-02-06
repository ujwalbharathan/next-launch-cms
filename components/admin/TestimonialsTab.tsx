interface TestimonialsTabProps {
    content: Array<{
        name: string;
        role: string;
        text: string;
    }>;
    updateTestimonial: (index: number, field: string, value: string) => void;
    addTestimonial: () => void;
    removeTestimonial: (index: number) => void;
    section?: {
        heading?: string;
        subheading?: string;
    };
    updateSection?: (field: string, value: string) => void;
}

export default function TestimonialsTab({ content, updateTestimonial, addTestimonial, removeTestimonial, section, updateSection }: TestimonialsTabProps) {
    return (
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-soft">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Testimonials</h2>
                    <p className="text-sm text-gray-600">Manage the testimonials section heading and entries.</p>
                </div>
                <button
                    onClick={addTestimonial}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                    Add Testimonial
                </button>
            </div>

            <div className="mb-6 bg-white rounded-2xl shadow-soft p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Heading</label>
                        <input
                            type="text"
                            value={section?.heading ?? ''}
                            onChange={(e) => updateSection && updateSection('heading', e.target.value)}
                            placeholder="Our Users Feel the Transformation"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Subheading</label>
                        <input
                            type="text"
                            value={section?.subheading ?? ''}
                            onChange={(e) => updateSection && updateSection('subheading', e.target.value)}
                            placeholder="Real Stories from People Empowered by Personalized Wellness"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
            </div>

            {content.length === 0 && (
                <div className="p-4 bg-gray-50 rounded-xl text-gray-600 mb-4">No testimonials yet. Click &quot;Add Testimonial&quot; to create one.</div>
            )}

            {content.map((testimonial, index) => (
                <div key={index} className="mb-6 bg-white rounded-2xl shadow-soft p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Testimonial {index + 1}</h3>
                        <button
                            onClick={() => removeTestimonial(index)}
                            className="px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                            placeholder="Name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <input
                            type="text"
                            value={testimonial.role}
                            onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                            placeholder="Role"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <textarea
                            value={testimonial.text}
                            onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                            placeholder="Testimonial text"
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>
                </div>
            ))}
        </section>
    );
}
