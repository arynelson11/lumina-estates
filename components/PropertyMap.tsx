export default function PropertyMap({ neighborhood }: { neighborhood: string }) {
    const query = encodeURIComponent(`${neighborhood}, Macaé - RJ`)

    return (
        <div className="w-full h-[300px] md:h-[400px] bg-stone-100 rounded-2xl overflow-hidden border border-stone-100 shadow-sm mt-12">
            <div className="bg-white p-4 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-medium text-stone-900">Localização Aproximada</h3>
                <span className="text-xs text-stone-500 uppercase tracking-wider">{neighborhood}</span>
            </div>
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Mapa da Localização"
                src={`https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
        </div>
    )
}
