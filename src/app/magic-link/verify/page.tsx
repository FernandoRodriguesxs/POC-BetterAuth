"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLinkVerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        const token = searchParams.get("token");
        
        if (!token) {
          setStatus("error");
          setMessage("Token não encontrado na URL");
          return;
        }

        // Verificar o magic link
        const res = await authClient.magicLink.verify({
          query: {
            token,
            callbackURL: "/dashboard",
          },
        });

        if (res.error) {
          setStatus("error");
          setMessage("Magic link inválido ou expirado: " + res.error.message);
        } else {
          setStatus("success");
          setMessage("Login realizado com sucesso! Redirecionando...");
          
          // Redirecionar após 2 segundos
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.error("Erro ao verificar magic link:", error);
        setStatus("error");
        setMessage("Erro ao processar magic link. Tente novamente.");
      }
    };

    verifyMagicLink();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 mb-4">
            {status === "loading" && (
              <svg className="animate-spin text-purple-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {status === "success" && (
              <svg className="text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {status === "error" && (
              <svg className="text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {status === "loading" && "🪄 Processando Magic Link..."}
            {status === "success" && "✅ Login Realizado!"}
            {status === "error" && "❌ Erro no Magic Link"}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            {status === "loading" && "Verificando seu link mágico, aguarde..."}
            {status === "success" && "Você foi logado com sucesso! Redirecionando para o dashboard."}
            {status === "error" && "Houve um problema ao processar seu magic link."}
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <div className="text-center space-y-4">
            {status === "loading" && (
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-purple-200 rounded w-1/2 mx-auto mt-2"></div>
                </div>
                <p className="text-sm text-gray-500">
                  Verificando autenticidade do link...
                </p>
              </div>
            )}
            
            {status === "success" && (
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 text-green-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-green-800 font-medium">Magic Link Funcionou!</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Você está sendo redirecionado automaticamente...
                  </p>
                </div>
              </div>
            )}
            
            {status === "error" && (
              <div className="space-y-4">
                <div className="mx-auto h-16 w-16 text-red-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="text-red-800 font-medium">Possíveis causas:</h3>
                  <ul className="text-red-700 text-sm mt-1 list-disc list-inside">
                    <li>Link expirado (válido por 10 minutos)</li>
                    <li>Link já foi usado</li>
                    <li>Link inválido ou corrompido</li>
                  </ul>
                </div>
                <button
                  onClick={() => router.push("/magic-link")}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  Solicitar novo Magic Link
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              status === "success" ? "bg-green-50 text-green-700" : 
              status === "error" ? "bg-red-50 text-red-700" : 
              "bg-blue-50 text-blue-700"
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
