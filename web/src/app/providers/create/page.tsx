'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProviderPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        specialty: '',
    });

    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/providers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Error creating provider');

            router.push('/providers');
        } catch (err) {
            console.error(err);
            setError('Failed to create provider.');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Create Provider</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <input
                    type="text"
                    name="specialty"
                    placeholder="Specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white rounded-xl px-6 py-2 hover:bg-green-700 transition"
                >
                    Create Provider
                </button>
            </form>
        </div>
    );
}
