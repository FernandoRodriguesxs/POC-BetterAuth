"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Função para solicitar reset de senha
  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // MÉTODO NATIVO: Solicitar link de reset por email
      const res = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password", // Página para onde redirecionar após clicar no link
      });
      
      if (res.error) {
        setMessage("Erro ao enviar link: " + res.error.message);
      } else {
        setIsSuccess(true);
        setMessage(`Link de redefinição enviado para ${email}! Verifique sua caixa de entrada e spam.`);
      }
      
    } catch (error) {
      console.error("Erro ao solicitar reset:", error);
      setMessage("Erro ao enviar link de recuperação. Tente novamente.");
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0V3a2 2 0 00-2-2m2 2a2 2 0 002 2m0 0v2a2 2 0 002 2m-2-2a2 2 0 00-2-2m0 0H9m4 0V9m0 0a2 2 0 00-2-2M9 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0V5a2 2 0 012-2m0 0V3a2 2 0 012-2" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Esqueci minha senha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Digite seu email para receber um link de recuperação
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email cadastrado
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
                      Enviando link...
                    </>
                  ) : (
                    "Enviar link de recuperação"
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
              <h3 className="text-lg font-medium text-gray-900">Email enviado!</h3>
              <p className="text-sm text-gray-600">
                Verifique sua caixa de entrada e spam. Clique no link recebido para redefinir sua senha.
              </p>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-md ${isSuccess ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-purple-600 hover:text-purple-500">
              ← Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
