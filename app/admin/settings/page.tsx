'use client'

import { Bell, Shield, User } from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="animate-fade-in-up">
            <header className="mb-12">
                <h1 className="text-4xl font-display font-medium text-stone-900 mb-2">
                    Configurações
                </h1>
                <p className="text-stone-500">
                    Gerencie suas preferências e configurações de conta.
                </p>
            </header>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm divide-y divide-stone-100">
                <div className="p-8 flex items-start gap-6">
                    <div className="p-3 bg-stone-100 rounded-xl text-stone-900">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-stone-900 mb-1">Perfil do Administrador</h3>
                        <p className="text-stone-500 mb-4">Atualize suas informações de login e perfil.</p>
                        <button className="text-sm font-medium text-stone-900 underline hover:text-stone-600">Gerenciar conta</button>
                    </div>
                </div>

                <div className="p-8 flex items-start gap-6">
                    <div className="p-3 bg-stone-100 rounded-xl text-stone-900">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-stone-900 mb-1">Segurança</h3>
                        <p className="text-stone-500 mb-4">Autenticação de dois fatores e senha.</p>
                        <button className="text-sm font-medium text-stone-900 underline hover:text-stone-600">Alterar senha</button>
                    </div>
                </div>

                <div className="p-8 flex items-start gap-6 opacity-50">
                    <div className="p-3 bg-stone-100 rounded-xl text-stone-900">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-stone-900 mb-1">Notificações (Em breve)</h3>
                        <p className="text-stone-500">Gerencie alertas de novos leads e contatos.</p>
                    </div>
                </div>
            </div>

            <p className="text-center text-sm text-stone-400 mt-12">
                Lumina Admin v1.0.0
            </p>
        </div>
    )
}
