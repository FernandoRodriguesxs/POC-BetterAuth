import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white rounded-lg shadow-lg">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={24}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-gray-900">
            Bem-vindo ao POC de Autenticação
          </h1>
          <p className="max-w-md text-lg leading-8 text-gray-600">
            Este é um projeto de demonstração usando{" "}
            <span className="font-semibold text-indigo-600">Better Auth</span>{" "}
            com Next.js. Teste o sistema de login e cadastro.
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Fazer Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Criar Conta
          </Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Ou experimente nossa autenticação mágica:</p>
          <Link
            href="/magic-link"
            className="inline-flex items-center justify-center px-6 py-3 border border-purple-300 text-base font-medium rounded-md text-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            🪄 Magic Link (Sem senha!)
          </Link>
        </div>
      </main>
    </div>
  );
}
