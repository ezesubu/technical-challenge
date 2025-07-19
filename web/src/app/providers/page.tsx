'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Provider = {
    id: string;
    full_name: string;
    specialty: string;
    created_at: string;
};

export default function ProvidersPage() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const res = await axios.get('/api/providers');
                setProviders(res.data);
                const response = res.data;

            } catch (err) {
                console.error('Error loading providers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Providers</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : providers.length === 0 ? (
                <p className="text-gray-500">No providers found.</p>
            ) : (
                <ul className="space-y-3">
                    {providers.map((provider) => (
                        <li key={provider.id} className="border p-4 rounded shadow">
                            <h3 className="font-bold">{provider.full_name}</h3>
                            <p className="text-sm text-gray-500">Specialty: {provider.specialty}</p>
                            <p className="text-xs text-gray-400">Created: {new Date(provider.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
