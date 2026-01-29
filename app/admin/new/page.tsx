'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { X, Loader2, ImagePlus, CheckCircle2 } from 'lucide-react'

export default function NewPropertyPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [checkingAuth, setCheckingAuth] = useState(true)
    const [images, setImages] = useState<File[]>([])
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        neighborhood: '',
        beds: '',
        baths: '',
        area: '',
        features: '', // Comma separated
        is_featured: false
    })

    // Auth Guard
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
            } else {
                setCheckingAuth(false)
            }
        }
        checkUser()
    }, [router])

    if (checkingAuth) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
            </div>
        )
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(prev => [...prev, ...Array.from(e.target.files!)])
        }
    }

    const removeImage = (idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const imageUrls: string[] = []

            // Upload Images
            for (const file of images) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath)

                imageUrls.push(publicUrl)
            }

            // Insert Property
            const { error: insertError } = await supabase
                .from('properties')
                .insert({
                    title: form.title,
                    description: form.description,
                    price: parseFloat(form.price),
                    neighborhood: form.neighborhood,
                    image_urls: imageUrls,
                    is_featured: form.is_featured,
                    specs: {
                        beds: parseInt(form.beds),
                        baths: parseInt(form.baths),
                        area_m2: parseFloat(form.area),
                        features: form.features.split(',').map(f => f.trim()).filter(Boolean)
                    }
                })

            if (insertError) throw insertError

            alert('Imóvel cadastrado com sucesso!')

            // Redirect to Dashboard
            router.push('/admin')
            router.refresh()

        } catch (error: any) {
            console.error('Error:', error)
            alert('Erro ao cadastrar imóvel: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in-up">
            <header className="mb-12">
                <h1 className="text-4xl font-display font-medium text-stone-900 mb-2">
                    Cadastrar Imóvel
                </h1>
                <p className="text-stone-500">
                    Adicione um novo imóvel à coleção Lumina.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Basic Info Section */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
                        <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-stone-900 rounded-full" /> Informações Básicas
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-600">Título do Anúncio</label>
                                    <input
                                        required
                                        placeholder="Ex: Mansão Suspensa no Pecado"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-600">Bairro / Localização</label>
                                    <input
                                        required
                                        placeholder="Ex: Praia dos Cavaleiros"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                        value={form.neighborhood}
                                        onChange={e => setForm({ ...form, neighborhood: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-600">Descrição Detalhada</label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Descreva os detalhes luxuosos deste imóvel..."
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all resize-none"
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specs Section */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
                        <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-stone-900 rounded-full" /> Detalhes & Valores
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-600">Preço (R$)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    value={form.price}
                                    onChange={e => setForm({ ...form, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-600">Área (m²)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    value={form.area}
                                    onChange={e => setForm({ ...form, area: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-600">Quartos</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    value={form.beds}
                                    onChange={e => setForm({ ...form, beds: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-600">Banheiros</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    value={form.baths}
                                    onChange={e => setForm({ ...form, baths: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <label className="text-sm font-medium text-stone-600">Diferenciais (tags)</label>
                            <input
                                placeholder="Separe por vírgula. Ex: Piscina Aquecida, Vista Mar, Cinema"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                value={form.features}
                                onChange={e => setForm({ ...form, features: e.target.value })}
                            />
                            <p className="text-xs text-stone-400">Pressione vírgula para separar os itens.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Media & Actions */}
                <div className="space-y-8">

                    {/* Media Upload */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm h-fit">
                        <h2 className="text-lg font-medium text-stone-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-stone-900 rounded-full" /> Galeria de Fotos
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {images.map((file, i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-stone-200 group">
                                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:shadow-sm"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        {i === 0 && (
                                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-medium">CAPA</div>
                                        )}
                                    </div>
                                ))}
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl cursor-pointer hover:border-stone-900 hover:bg-stone-50 transition-all text-stone-400 hover:text-stone-900 group">
                                    <div className="p-3 bg-stone-100 rounded-full mb-2 group-hover:bg-white transition-colors">
                                        <ImagePlus className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-medium">Adicionar</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            </div>
                            <p className="text-xs text-stone-400 text-center">
                                A primeira imagem será usada como capa.
                            </p>
                        </div>
                    </div>

                    {/* Publish Actions */}
                    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm sticky top-8">
                        <div className="flex items-center gap-3 mb-6 p-4 bg-stone-50 rounded-xl border border-stone-100">
                            <input
                                type="checkbox"
                                id="featured"
                                checked={form.is_featured}
                                onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                                className="w-5 h-5 accent-stone-900 rounded border-stone-300"
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-stone-700 cursor-pointer select-none">
                                Imóvel em Destaque
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-stone-900 text-white font-medium py-4 rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-stone-900/20 active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                            {loading ? 'Publicando...' : 'Publicar Imóvel'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
