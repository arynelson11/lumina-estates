import { Property, PropertyCard } from '@/components/PropertyCard'

export default function RelatedProperties({ properties }: { properties: Property[] }) {
    if (!properties || properties.length === 0) return null

    return (
        <section className="py-20 bg-stone-50 border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-display font-medium text-stone-900 mb-8">
                    Você também pode gostar
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    )
}
