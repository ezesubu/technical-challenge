'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Patient = {
    id: string;
    full_name: string;
    provider: { id: string; full_name: string } | null;
    status: { id: string; name: string };
};

export default function DashboardPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    const fetchPatients = async (pageOverride = page) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/patients`);
            const response = res.data;

            if (Array.isArray(response)) {
                setPatients(response);
                setTotal(response.length);
            } else {
                setPatients(response.data || []);
                setTotal(response.total || 0);
            }
        } catch (err) {
            console.error('Error loading patients:', err);
            setPatients([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients(page);
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Patient Dashboard</h1>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : patients.length === 0 ? (
                <p className="text-gray-500">No patients found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            className="border rounded-lg p-4 shadow hover:shadow-md transition"
                        >
                            <h3 className="font-bold text-lg">{patient.full_name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Provider: {patient.provider?.full_name ?? 'Unassigned'}
                            </p>
                            <p className="text-sm mt-1">
                                Status:{' '}
                                <span className="font-medium">
                                  {patient.status?.name ?? 'Unknown'}
                                </span>
                            </p>

                            <div className="mt-3 flex gap-2 text-sm">
                                <a
                                    href={`/dashboard/assign?patientId=${patient.id}`}
                                    className="text-blue-600 underline"
                                >
                                    Assign Provider
                                </a>
                                <a
                                    href={`/dashboard/status/${patient.id}`}
                                    className="text-green-600 underline"
                                >
                                    Change Status
                                </a>
                                <a
                                    href={`/dashboard/history/${patient.id}`}
                                    className="text-gray-600 underline"
                                >
                                    View History
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    ← Prev
                </button>

                <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
