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
                fixed inset-y-0 left-0 z-50 bg-stone-900 text-white flex flex-col transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 
                ${isDesktopSidebarOpen ? 'w-64' : 'md:w-20'}
            `}>
                <div className={`p-6 border-b border-stone-800 flex items-center ${isDesktopSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                    {isDesktopSidebarOpen ? (
                        <Link href="/" className="font-display text-2xl tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap overflow-hidden">
                            Lumina <span className="text-stone-500 text-sm font-sans tracking-normal ml-1">Admin</span>
                        </Link>
                    ) : (
                        <Link href="/" className="font-display text-2xl tracking-tight hover:opacity-80 transition-opacity">
                            L
                        </Link>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden text-stone-500 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-x-hidden">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                                    ? 'bg-white/10 text-white font-medium'
                                    : 'text-stone-400 hover:bg-white/5 hover:text-white'
                                    } ${!isDesktopSidebarOpen && 'md:justify-center md:px-2'}`}
                                title={!isDesktopSidebarOpen ? item.label : undefined}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span className={`transition-opacity duration-200 ${isDesktopSidebarOpen ? 'opacity-100' : 'md:opacity-0 md:hidden'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-stone-800 space-y-2 overflow-x-hidden">
                    {/* Desktop Toggle Button inside Sidebar */}
                    <button
                        onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                        className={`hidden md:flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 hover:bg-white/5 hover:text-white transition-all w-full ${!isDesktopSidebarOpen && 'justify-center px-2'}`}
                        title={isDesktopSidebarOpen ? "Recolher Menu" : "Expandir Menu"}
                    >
                        <PanelLeft className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${!isDesktopSidebarOpen && 'rotate-180'}`} />
                        <span className={`transition-opacity duration-200 whitespace-nowrap ${isDesktopSidebarOpen ? 'opacity-100' : 'md:opacity-0 md:hidden'}`}>
                            Recolher
                        </span>
                    </button>

                    <Link
                        href="/"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-stone-400 hover:bg-white/5 hover:text-white transition-all whitespace-nowrap ${!isDesktopSidebarOpen && 'md:justify-center md:px-2'}`}
                        title={!isDesktopSidebarOpen ? "Ver Site" : undefined}
                    >
                        <Home className="w-5 h-5 flex-shrink-0" />
                        <span className={`transition-opacity duration-200 ${isDesktopSidebarOpen ? 'opacity-100' : 'md:opacity-0 md:hidden'}`}>
                            Ver Site
                        </span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left whitespace-nowrap ${!isDesktopSidebarOpen && 'md:justify-center md:px-2'}`}
                        title={!isDesktopSidebarOpen ? "Sair" : undefined}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className={`transition-opacity duration-200 ${isDesktopSidebarOpen ? 'opacity-100' : 'md:opacity-0 md:hidden'}`}>
                            Sair
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`
                flex-1 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300 ease-in-out
                ${isDesktopSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
            `}>
                <div className="max-w-5xl mx-auto relative">
                    {children}
                </div>
            </main>
        </div>
    )
}
