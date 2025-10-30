"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Extrair token da URL quando a página carregar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("Token inválido ou não encontrado. Solicite um novo link de recuperação.");
    }
  }, []);

  // MÉTODO NATIVO: Redefinir senha com token
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Validações básicas
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    if (!token) {
      setMessage("Token não encontrado. Solicite um novo link de recuperação.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (res.error) {
        setMessage("Erro ao redefinir senha: " + res.error.message);
      } else {
        setMessage("Senha redefinida com sucesso! Redirecionando para login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setMessage("Erro ao redefinir senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-indigo-600 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0V3a2 2 0 00-2-2m2 2a2 2 0 002 2m0 0v2a2 2 0 002 2m-2-2a2 2 0 00-2-2m0 0H9m4 0V9m0 0a2 2 0 00-2-2M9 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m0 0V5a2 2 0 012-2m0 0V3a2 2 0 012-2" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Redefinir Senha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {token ? "Defina sua nova senha" : "Token inválido ou expirado"}
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {token ? (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Nova senha
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Digite sua nova senha (mín. 6 caracteres)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar nova senha
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Salvando..." : "Redefinir Senha"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 text-red-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Token Inválido</h3>
              <p className="text-sm text-gray-600">
                O link de recuperação é inválido ou expirou. Solicite um novo link.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Solicitar novo link
              </Link>
            </div>
          )}

          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes("sucesso") 
                ? "bg-green-50 text-green-700" 
                : "bg-red-50 text-red-700"
            }`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-indigo-600 hover:text-indigo-500">
              ← Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
