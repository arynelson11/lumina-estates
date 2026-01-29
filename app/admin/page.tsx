'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Plus, MapPin, Trash2, Edit } from 'lucide-react'

export default function AdminDashboard() {
    const [properties, setProperties] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        const { data } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setProperties(data)
        setLoading(false)
    }

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        if (!confirm('Tem certeza que deseja remover este imóvel?')) return

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id)

        if (!error) {
            setProperties(prev => prev.filter(p => p.id !== id))
        } else {
            alert('Erro ao deletar: ' + error.message)
        }
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    if (loading) {
        return (
            <div className="h-40 flex items-center justify-center text-stone-400">
                Carregando dashboard...
            </div>
        )
    }

    return (
        <div className="animate-fade-in-up">
            <header className="mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display font-medium text-stone-900 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-stone-500">
                        Visão geral do seu portfólio.
                    </p>
                </div>
                <Link
                    href="/admin/new"
                    className="bg-stone-900 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10"
                >
                    <Plus className="w-5 h-5" />
                    Novo Imóvel
                </Link>
            </header>

            {/* Stats Overview (Optional Placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <p className="text-sm font-medium text-stone-500 mb-1">Total de Imóveis</p>
                    <p className="text-3xl font-display font-medium text-stone-900">{properties.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <p className="text-sm font-medium text-stone-500 mb-1">Valor Total</p>
                    <p className="text-3xl font-display font-medium text-stone-900">
                        {new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short", style: 'currency', currency: 'BRL' }).format(properties.reduce((acc, curr) => acc + curr.price, 0))}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                    <p className="text-sm font-medium text-stone-500 mb-1">Destaques</p>
                    <p className="text-3xl font-display font-medium text-stone-900">
                        {properties.filter(p => p.is_featured).length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100">
                    <h2 className="text-lg font-medium text-stone-900">Imóveis Cadastrados</h2>
                </div>

                {properties.length === 0 ? (
                    <div className="p-12 text-center text-stone-400">
                        Nenhum imóvel encontrado.
                    </div>
                ) : (
                    <div className="divide-y divide-stone-100">
                        {properties.map(property => (
                            <div
                                key={property.id}
                                className="flex items-center gap-6 p-6 hover:bg-stone-50 transition-colors group"
                            >
                                <Link href={`/imoveis/${property.id}`} className="w-24 h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                                    <img
                                        src={property.image_urls?.[0] || 'https://via.placeholder.com/150'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/imoveis/${property.id}`} className="block">
                                        <h3 className="text-lg font-medium text-stone-900 truncate mb-1">
                                            {property.title}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-4 text-sm text-stone-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {property.neighborhood}
                                        </span>
                                        <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-600 font-medium">
                                            {formatCurrency(property.price)}
                                        </span>
                                        {property.is_featured && (
                                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider">
                                                Destaque
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/edit/${property.id}`}
                                        className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                                        title="Editar"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={(e) => handleDelete(property.id, e)}
                                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Excluir"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
