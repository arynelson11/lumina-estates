import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PropertyCard, Property } from '@/components/PropertyCard'
import { SearchFilters } from '@/components/SearchFilters'
import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

// Revalidate data every 60 seconds (ISR)
export const revalidate = 60
// Force dynamic to prevent static generation issues on Vercel
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch featured properties
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .limit(3)

  if (error) {
    console.error('Error fetching properties:', error)
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-stone-900">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-stone-900/40 z-10" />

        {/* You can replace this with a real image later */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')" }}
        />

        <div className="relative z-20 text-center max-w-4xl px-4 animate-fade-in-up mt-[-80px]">
          <p className="text-white/90 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4">
            Private Estates
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight">
            A exclusividade que <br className="hidden md:block" /> Macaé reserva para você.
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 font-light">
            Curadoria de imóveis de alto padrão nos bairros mais nobres da cidade.
          </p>
        </div>

        <div className="relative z-30 w-full px-4 max-w-4xl">
          <Suspense fallback={<div className="h-20 bg-white/10 rounded-xl animate-pulse" />}>
            <SearchFilters centered />
          </Suspense>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Featured Properties Properties */}
      <section id="featured" className="py-24 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-stone-900 mb-2">
                Destaques da Coleção
              </h2>
              <p className="text-stone-500 font-light text-lg">
                Imóveis selecionados para o seu estilo de vida.
              </p>
            </div>
            <Link href="/imoveis" className="hidden md:block text-accent hover:text-stone-900 transition-colors font-medium border-b border-accent/50 hover:border-stone-900 pb-0.5">
              Ver todos os imóveis
            </Link>
          </div>

          {!properties || properties.length === 0 ? (
            <div className="text-center py-20 bg-stone-100 rounded-xl border border-dashed border-stone-300">
              <p className="text-stone-500">Nenhum imóvel em destaque encontrado.</p>
              <p className="text-sm text-stone-400 mt-2">Verifique se você rodou o script SQL e configurou as chaves do Supabase.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property as Property} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link href="/imoveis" className="text-accent hover:text-stone-900 transition-colors font-medium border-b border-accent/50 hover:border-stone-900 pb-0.5">
              Ver todos os imóveis
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional / About Section */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800/20 skew-x-12" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-4">
                Sobre a Lumina
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-8 leading-tight">
                Redefinindo o conceito de <span className="text-stone-400">morar bem</span> em Macaé.
              </h2>
              <div className="space-y-6 text-stone-300 font-light text-lg">
                <p>
                  Não vendemos apenas imóveis; curamos experiências de vida. Cada propriedade em nosso portfólio passa por uma rigorosa avaliação para garantir que atenda aos padrões mais exigentes de arquitetura, localização e conforto.
                </p>
                <p>
                  Nossa expertise no mercado de alto padrão nos permite oferecer um atendimento discreto, personalizado e focado em entender profundamente o seu momento de vida.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-display font-medium text-white mb-1">15+</p>
                  <p className="text-stone-400 text-sm">Anos de Mercado</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-medium text-white mb-1">R$ 500mi</p>
                  <p className="text-stone-400 text-sm">Em VGV Gerenciado</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-full object-cover"
                  alt="Interior de Luxo"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-tr-3xl hidden md:block">
                <p className="font-display text-2xl text-stone-900 leading-tight">
                  &quot;A verdadeira sofisticação <br /> está na simplicidade.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
