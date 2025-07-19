'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePatientPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        provider_id: '',
        status_id: '',
    });

    const [error, setError] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Error creating patient');

            router.push('/patients');
        } catch (err) {
            console.error(err);
            setError('Failed to create patient.');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Create Patient</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <input
                    type="text"
                    name="provider_id"
                    placeholder="Provider ID"
                    value={form.provider_id}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <input
                    type="text"
                    name="status_id"
                    placeholder="Status ID"
                    value={form.status_id}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700 transition"
                >
                    Create Patient
                </button>
            </form>
        </div>
    );
}
