import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PropertyCard, Property } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Force dynamic rendering to handle search params
export const dynamic = 'force-dynamic'

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PropertiesPage({ searchParams }: Props) {
    const params = await searchParams
    const neighborhood = typeof params.neighborhood === 'string' ? params.neighborhood : ''
    const maxPrice = typeof params.maxPrice === 'string' ? params.maxPrice : ''
    const minBeds = typeof params.minBeds === 'string' ? params.minBeds : ''

    let query = supabase.from('properties').select('*')

    if (neighborhood) {
        query = query.ilike('neighborhood', `%${neighborhood}%`)
    }

    if (maxPrice) {
        query = query.lte('price', maxPrice)
    }

    // Filter by JSON specs (Supabase standard text search on JSON text representation, or cast)
    // Simple JSONB containment or operator approach:
    if (minBeds) {
        // Cast specs->beds to integer for comparison
        // Note: This often requires correct casting in SQL or just exact match if structure ensures it.
        // Supabase JS filter on JSONB keys often works like this key->>value
        // But GTE on JSON text value can be tricky. Let's try raw SQL filter or a simpler approach.
        // For now, let's use the arrow operator to get the text value and process it.
        // Actually, create-next-app supabase filter for jsonb:
        // .gte('specs->beds', minBeds) usually works if mapped correctly, but safest is cast.
        // We will use a trusted method: 
        // This assumes specs->beds is stored as number in JSON.
        // PostgREST syntax for JSON path:
        query = query.gte('specs->>beds', minBeds)
    }

    const { data: properties, error } = await query

    return (
        <main className="min-h-screen bg-stone-50">
            <nav className="bg-white border-b border-stone-200 py-4 px-6 mb-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Home</span>
                    </Link>
                    <div className="font-display font-bold text-xl tracking-tight text-stone-900">
                        Coleção
                    </div>
                    <div className="w-20" /> {/* Spacer */}
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-display font-medium text-stone-900 mb-6 text-center">Encontre seu Refúgio</h1>
                    <Suspense fallback={<div className="h-20 bg-stone-100 rounded-xl animate-pulse" />}>
                        <SearchFilters />
                    </Suspense>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-8">
                        Erro ao buscar imóveis. Tente novamente.
                    </div>
                )}

                {!properties || properties.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-stone-500 text-lg">Nenhum imóvel encontrado com esses critérios.</p>
                        <Link href="/imoveis" className="text-accent hover:underline mt-2 inline-block">Limpar filtros</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property as Property} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
