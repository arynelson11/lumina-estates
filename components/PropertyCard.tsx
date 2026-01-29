import Link from 'next/link'
import { Bed, Bath, Move, ArrowRight } from 'lucide-react'

// Define the shape of a property based on our Supabase schema
export interface Property {
    id: string
    title: string
    description: string
    price: number
    neighborhood: string
    image_urls: string[]
    specs: {
        beds: number
        baths: number
        area_m2: number
        features: string[]
    }
}

export function PropertyCard({ property }: { property: Property }) {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    return (
        <Link href={`/imoveis/${property.id}`} className="group block h-full">
            <div className="relative bg-white rounded-xl overflow-hidden border border-stone-100 hover:shadow-lg hover:shadow-stone-200/50 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-stone-100 relative">
                    <img
                        src={property.image_urls[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm font-medium text-accent mb-2 uppercase tracking-wider">{property.neighborhood}</p>
                    <h3 className="text-xl font-display font-medium text-stone-900 mb-2 truncate" title={property.title}>
                        {property.title}
                    </h3>
                    <p className="text-xl font-medium text-stone-900 mb-4">{formatCurrency(property.price)}</p>

                    {/* Specs */}
                    <div className="flex items-center gap-4 text-stone-500 text-sm border-t border-stone-100 pt-4 mt-auto">
                        <div className="flex items-center gap-1.5">
                            <Bed className="w-4 h-4" />
                            <span>{property.specs.beds}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Bath className="w-4 h-4" />
                            <span>{property.specs.baths}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Move className="w-4 h-4" />
                            <span>{property.specs.area_m2}m²</span>
                        </div>
                    </div>

                    {/* CTA (Optional, appears on hover or always) */}
                    <div className="mt-4 pt-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        <span className="text-sm font-medium text-stone-900 flex items-center gap-2 hover:text-accent transition-colors">
                            Ver detalhes <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
