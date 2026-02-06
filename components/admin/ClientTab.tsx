"use client";

interface ClientItem {
    name: string;
    logo: string;
}

interface ClientTabProps {
    content: ClientItem[];
    addClient: () => void;
    removeClient: (index: number) => void;
    updateClient: (index: number, field: string, value: string) => void;
}

export default function ClientTab({ content, addClient, removeClient, updateClient }: ClientTabProps) {


    return (
        <div className="space-y-6 pb-8">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Clients</h3>
                <button
                    onClick={addClient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                    Add Client
                </button>
            </div>

            <div className="space-y-4">
                {content.length === 0 && (
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-600">No clients yet. Click &quot;Add Client&quot; to create one.</div>
                )}

                {content.map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-soft p-4 flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                            <input
                                type="text"
                                value={c.name}
                                onChange={(e) => updateClient(i, 'name', e.target.value)}
                                placeholder="Client name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                            <input
                                type="text"
                                value={c.logo}
                                onChange={(e) => updateClient(i, 'logo', e.target.value)}
                                placeholder="https://example.com/logo.png or /logo.png"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            />
                            
                        </div>

                        <div className="w-full md:w-1/3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {c.logo ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={c.logo} alt={c.name || 'logo'} className="object-contain w-full h-full" />
                                    ) : (
                                        <span className="text-sm text-gray-500">No logo</span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600">Preview</div>
                            </div>
                            <div className="ml-auto">
                                <button
                                    onClick={() => removeClient(i)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
