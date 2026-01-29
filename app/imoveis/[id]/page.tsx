import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import InteractivePropertyDetails from '@/components/InteractivePropertyDetails'
import { Property } from '@/components/PropertyCard'
import RelatedProperties from '@/components/RelatedProperties'

export const revalidate = 60

type Props = {
    params: Promise<{ id: string }>
}

export default async function PropertyDetails({ params }: Props) {
    const { id } = await params

    const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !property) {
        notFound()
    }

    // Fetch related properties (same neighborhood preferred, or just random others)
    // For simplicity: get 3 properties that are NOT the current one
    const { data: related } = await supabase
        .from('properties')
        .select('*')
        .neq('id', id)
        .limit(3)

    return (
        <>
            <InteractivePropertyDetails property={property as Property} />
            <RelatedProperties properties={related as Property[] || []} />
        </>
    )
}
