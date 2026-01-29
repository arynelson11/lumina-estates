import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Code } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-stone-950 text-white pt-20 pb-10 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="font-display text-2xl tracking-tight mb-6 block">
                            Lumina
                        </Link>
                        <p className="text-stone-400 font-light text-sm leading-relaxed max-w-xs">
                            Curadoria exclusiva de imóveis de alto padrão em Macaé e região. Onde a excelência encontra o seu novo lar.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-stone-200">Navegação</h4>
                        <ul className="space-y-4 text-stone-400 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/imoveis" className="hover:text-white transition-colors">Imóveis</Link></li>
                            <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                            <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-stone-200">Contato</h4>
                        <ul className="space-y-4 text-stone-400 text-sm">
                            <li>Av. Atlântica, 1500</li>
                            <li>Cavaleiros, Macaé - RJ</li>
                            <li>contato@lumina.com.br</li>
                            <li>+55 (22) 99999-9999</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-display text-lg mb-6 text-stone-200">Social</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>&copy; {new Date().getFullYear()} Lumina Macaé Private Estates. Todos os direitos reservados.</p>

                    <a
                        href="https://aiomotion.com" // Placeholder or # if unknown
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors group"
                    >
                        <Code className="w-3 h-3 text-stone-600 group-hover:text-accent transition-colors" />
                        <span className="font-medium tracking-wide">
                            Plataforma desenvolvida por <span className="text-stone-300 group-hover:text-white">AIO Motion Studio</span>
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
