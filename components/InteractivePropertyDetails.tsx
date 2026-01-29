'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Bed, Bath, Move, MapPin, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Property } from '@/components/PropertyCard'
import PropertyMap from '@/components/PropertyMap'

export default function InteractivePropertyDetails({ property }: { property: Property }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null)
        document.body.style.overflow = 'auto'
    }, [])

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setLightboxIndex(prev => (prev === null ? null : (prev + 1) % property.image_urls.length))
    }, [property.image_urls.length])

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        setLightboxIndex(prev => (prev === null ? null : (prev - 1 + property.image_urls.length) % property.image_urls.length))
    }, [property.image_urls.length])

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowRight') nextImage()
            if (e.key === 'ArrowLeft') prevImage()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [lightboxIndex, closeLightbox, nextImage, prevImage])

    return (
        <main className="min-h-screen bg-stone-50 pb-20">
            {/* Header / Nav */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Voltar</span>
                    </Link>
                    <div className="font-display font-medium text-xl tracking-tight text-stone-900">
                        Lumina
                    </div>
                    <button className="p-2 text-stone-500 hover:text-stone-900 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Gallery (Hero) */}
            <section className="h-[60vh] bg-stone-200 relative overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
                <img
                    src={property.image_urls[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-8 max-w-7xl w-full mx-auto text-white pointer-events-none">
                    <div className="max-w-7xl mx-auto px-4 w-full">
                        <span className="inline-block px-3 py-1 bg-accent/90 backdrop-blur text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            {property.neighborhood}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-display font-medium mb-2 shadow-sm">
                            {property.title}
                        </h1>
                        <p className="text-2xl font-light opacity-90">
                            {formatCurrency(property.price)}
                        </p>
                    </div>
                </div>

                {/* View All Text Hint */}
                <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Visualizar Fotos
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Key Specs */}
                    <div className="flex flex-wrap gap-8 p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-stone-50 rounded-full text-stone-900">
                                <Bed className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-stone-500">Quartos</p>
                                <p className="text-lg font-medium text-stone-900">{property.specs.beds}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-stone-50 rounded-full text-stone-900">
                                <Bath className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-stone-500">Banheiros</p>
                                <p className="text-lg font-medium text-stone-900">{property.specs.baths}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-stone-50 rounded-full text-stone-900">
                                <Move className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-stone-500">Área</p>
                                <p className="text-lg font-medium text-stone-900">{property.specs.area_m2}m²</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-display font-medium text-stone-900 mb-4">Sobre o Imóvel</h2>
                        <p className="text-stone-600 leading-relaxed text-lg">
                            {property.description}
                        </p>
                    </div>

                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-display font-medium text-stone-900 mb-6">Diferenciais</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.specs.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-3 text-stone-700 bg-white p-4 rounded-lg border border-stone-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Additional Images Grid */}
                    {property.image_urls.length > 1 && (
                        <div className="pt-8 border-t border-stone-100">
                            <h2 className="text-2xl font-display font-medium text-stone-900 mb-6">Galeria de Fotos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {property.image_urls.slice(1).map((url: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-100 group cursor-pointer"
                                        onClick={() => openLightbox(idx + 1)}
                                    >
                                        <img
                                            src={url}
                                            alt={`${property.title} - Foto ${idx + 2}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-lg shadow-stone-200/50 sticky top-24">
                        <h3 className="text-xl font-display font-medium text-stone-900 mb-6">Interessado?</h3>
                        <p className="text-stone-500 mb-6 text-sm">
                            Fale diretamente com nosso corretor especialista sobre este imóvel.
                        </p>

                        <a
                            href={`https://wa.me/5522999999999?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre o imóvel: ${property.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 active:scale-[0.98]"
                        >
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-8.67-1.928-9.69-.17-.101-.296-.153-.422.049s-1.802 8.441-2.003 8.643c-.201.201-.4.225-.698.077-.297-.151-1.255-4.632-1.89-6.393-.186-.532-.401-.893-.653-1.096-.252-.204-.549-.357-1.096-.357-.149 0-.297.027-.422.049-.377.067-.674.316-.674.619v9.702c0 .249.199.449.449.449h1.346c.249 0 .449-.199.449-.449v-4.896c0-.288.354-.424.545-.213l2.844 3.167c.189.21.579.21.768 0l2.844-3.167c.191-.211.545-.075.545.213v4.896c0 .249.199.449.449.449h1.346c.249 0 .449-.199.449-.449V3.535c0-.303-.297-.552-.674-.619zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 0 12 0zm6.185 16.59c-.496 1.488-2.618 1.933-4.103 2.502-.916.351-1.79.526-2.636.526-2.454 0-4.607-1.399-5.914-3.528-1.536-2.493-1.383-5.717.371-8.086.877-1.185 2.158-1.944 3.585-2.126.852-.109 1.635-.027 2.376.246 1.411.521 2.365 1.763 2.527 3.251.01.094.015.191.015.289 0 .914-.265 1.78-.737 2.531-.482.766-1.139 1.396-1.93 1.838-.934.523-2.031.782-3.123 1.071 1.082.288 2.18.546 3.111 1.063.801.444 1.468 1.077 1.961 1.849.467.733.729 1.58.737 2.476v.056c0 .151-.01.302-.03.451z" /></svg>
                            Chamar no WhatsApp
                        </a>
                        <p className="text-xs text-stone-400 text-center mt-4">
                            Resposta média em 5 minutos.
                        </p>
                    </div>

                    <PropertyMap neighborhood={property.neighborhood} />
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in" onClick={closeLightbox}>

                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all hidden md:block"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 rounded-full hover:bg-white/10 transition-all hidden md:block"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    {/* Main Image */}
                    <div className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={property.image_urls[lightboxIndex]}
                            alt={`Foto ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium bg-black/50 px-4 py-2 rounded-full">
                            {lightboxIndex + 1} / {property.image_urls.length}
                        </div>
                    </div>

                </div>
            )}
        </main>
    )
}
