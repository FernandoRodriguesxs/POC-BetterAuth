"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import Link from "next/link";

export default function MagicLinkPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Função para solicitar magic link
  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await authClient.signIn.magicLink({
        email,
        callbackURL: "/dashboard", // Redireciona para dashboard após login
        newUserCallbackURL: "/dashboard", // Para novos usuários também
        errorCallbackURL: "/magic-link?error=true", // Em caso de erro
      });
      
      if (res.error) {
        setMessage("Erro ao enviar magic link: " + res.error.message);
      } else {
        setIsSuccess(true);
        setMessage(`Magic link enviado para ${email}! Verifique sua caixa de entrada.`);
      }
      
    } catch (error) {
      console.error("Erro ao solicitar magic link:", error);
      setMessage("Erro ao enviar magic link. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-purple-600 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            🪄 Magic Link
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse sem senha! Digite seu email e receba um link mágico
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleMagicLink}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando magic link...
                    </>
                  ) : (
                    <>
                      🪄 Enviar Magic Link
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 text-green-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Magic link enviado!</h3>
              <p className="text-sm text-gray-600">
                Verifique sua caixa de entrada e clique no link mágico para fazer login instantaneamente.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-purple-800">
                      Como funciona o Magic Link?
                    </h3>
                    <div className="mt-2 text-sm text-purple-700">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Sem necessidade de senha</li>
                        <li>Login instantâneo e seguro</li>
                        <li>Link expira em 10 minutos</li>
                        <li>Cria conta automaticamente se não existir</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-md ${isSuccess ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center space-y-2">
            <Link href="/login" className="text-sm text-purple-600 hover:text-purple-500">
              ← Voltar para login tradicional
            </Link>
            <br />
            <Link href="/register" className="text-sm text-gray-600 hover:text-gray-500">
              Ou criar conta com senha
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
