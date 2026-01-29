'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, PlusCircle, Settings, LogOut, Home, Menu, X, PanelLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: PlusCircle, label: 'Novo Imóvel', href: '/admin/new' },
        { icon: Settings, label: 'Configurações', href: '/admin/settings' },
    ]

    return (
        <div className="min-h-screen bg-stone-50 flex font-sans">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-stone-900 z-40 flex items-center justify-between px-4 border-b border-stone-800">
                <div className="font-display text-xl text-white tracking-tight">
                    Lumina <span className="text-stone-500 text-sm font-sans tracking-normal ml-1">Admin</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-stone-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-stone-900 text-white flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isDesktopSidebarOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
            `}>
                <div className="p-8 border-b border-stone-800 flex items-center justify-between">
                    <Link href="/" className="font-display text-2xl tracking-tight hover:opacity-80 transition-opacity">
                        Lumina <span className="text-stone-500 text-sm font-sans tracking-normal ml-1">Admin</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-stone-500 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white/10 text-white font-medium'
                                    : 'text-stone-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 border-t border-stone-800 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Ver Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`
                flex-1 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300 ease-in-out
                ${isDesktopSidebarOpen ? 'md:ml-64' : 'md:ml-0'}
            `}>
                <div className="max-w-5xl mx-auto relative">
                    {/* Desktop Toggle Button */}
                    <button
                        onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                        className="hidden md:flex absolute -left-12 top-0 p-2 text-stone-400 hover:text-stone-900 bg-transparent hover:bg-stone-100 rounded-lg transition-all"
                        title={isDesktopSidebarOpen ? "Recolher Menu" : "Expandir Menu"}
                    >
                        <PanelLeft className="w-6 h-6" />
                    </button>

                    {/* Floating Toggle Button (Visible when sidebar is closed) */}
                    {!isDesktopSidebarOpen && (
                        <button
                            onClick={() => setIsDesktopSidebarOpen(true)}
                            className="hidden md:flex fixed top-8 left-8 p-3 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition-all z-40"
                            title="Expandir Menu"
                        >
                            <PanelLeft className="w-6 h-6" />
                        </button>
                    )}

                    {children}
                </div>
            </main>
        </div>
    )
}
