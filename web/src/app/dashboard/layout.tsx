// This layout wraps all /dashboard/* routes and shows the nav
export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            {/* Sidebar or Navigation */}
            <nav className="w-64 bg-gray-200  p-4">
                <h2 className="text-xl font-bold mb-4">Medwork</h2>
                <ul className="space-y-2">
                    <li>
                        <a href="/patients" className="hover:underline">Patients</a>

                    </li>
                    <li>
                        <a href="/patients/create" className="hover:underline">
                            Create Patient
                        </a>
                    </li>
                    <li>
                        <a href="/providers" className="hover:underline">Providers</a>
                    </li>
                    <li>
                        <a href="/providers/create" className="hover:underline">
                            Create Provider
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <main className="flex-1  p-6 overflow-auto">
                {children}
            </main>
        </div>
    );
}
