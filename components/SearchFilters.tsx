'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, DollarSign, Bed } from 'lucide-react'

export function SearchFilters({ centered = false }: { centered?: boolean }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [neighborhood, setNeighborhood] = useState(searchParams.get('neighborhood') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
    const [minBeds, setMinBeds] = useState(searchParams.get('minBeds') || '')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (neighborhood) params.set('neighborhood', neighborhood)
        if (maxPrice) params.set('maxPrice', maxPrice)
        if (minBeds) params.set('minBeds', minBeds)

        router.push(`/imoveis?${params.toString()}`)
    }

    return (
        <form
            onSubmit={handleSearch}
            className={`bg-white p-4 rounded-2xl shadow-xl shadow-stone-200/20 border border-stone-100 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto transition-all ${centered ? '-mt-8 relative z-30' : ''}`}
        >
            <div className="flex-1 flex items-center gap-3 px-2 md:border-r border-stone-100">
                <MapPin className="text-stone-400 w-5 h-5 flex-shrink-0" />
                <div className="w-full">
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Localização</label>
                    <input
                        type="text"
                        placeholder="Ex: Pecado, Cavaleiros..."
                        className="w-full outline-none text-stone-900 placeholder:text-stone-300 font-medium"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-2 md:border-r border-stone-100">
                <DollarSign className="text-stone-400 w-5 h-5 flex-shrink-0" />
                <div className="w-full">
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Preço Máximo</label>
                    <input
                        type="number"
                        placeholder="R$ 0,00"
                        className="w-full outline-none text-stone-900 placeholder:text-stone-300 font-medium"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 flex items-center gap-3 px-2">
                <Bed className="text-stone-400 w-5 h-5 flex-shrink-0" />
                <div className="w-full">
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Quartos</label>
                    <select
                        className="w-full outline-none text-stone-900 bg-transparent font-medium"
                        value={minBeds}
                        onChange={(e) => setMinBeds(e.target.value)}
                    >
                        <option value="">Qualquer</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="bg-stone-900 hover:bg-accent text-white p-4 rounded-xl transition-colors md:w-auto w-full flex justify-center items-center"
            >
                <Search className="w-6 h-6" />
            </button>
        </form>
    )
}
