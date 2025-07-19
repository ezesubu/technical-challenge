'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPatientPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        provider_id: '',
        status_id: '',
    });

    const [providers, setProviders] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load patient data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [patientRes, providersRes, statusesRes] = await Promise.all([
                    fetch(`/api/patients/${id}`),
                    fetch('/api/providers'),
                    fetch('/api/statuses'),
                ]);

                if (!patientRes.ok || !providersRes.ok || !statusesRes.ok) {
                    throw new Error('Error fetching data');
                }

                const patientData = await patientRes.json();
                const providersData = await providersRes.json();
                const statusesData = await statusesRes.json();

                setForm({
                    full_name: patientData.data.full_name,
                    email: patientData.data.email,
                    phone: patientData.data.phone,
                    provider_id: patientData.data.provider_id,
                    status_id: patientData.data.status_id,
                });

                setProviders(providersData.data);
                setStatuses(statusesData.data);
            } catch (err) {
                console.error(err);
                setError('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`/api/patients/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to update');

            router.push('/patients');
        } catch (err) {
            console.error(err);
            setError('Error updating patient');
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Patient</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="full_name"
                    type="text"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl"
                />
                <input
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl"
                />
                <select
                    name="provider_id"
                    value={form.provider_id}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl"
                >
                    <option value="">Select Provider</option>
                    {providers.map((p: any) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
                <select
                    name="status_id"
                    value={form.status_id}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-xl"
                >
                    <option value="">Select Status</option>
                    {statuses.map((s: any) => (
                        <option key={s.id} value={s.id}>
                            {s.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-xl px-6 py-2 hover:bg-blue-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
