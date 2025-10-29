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
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 text-white transition-colors hover:bg-indigo-700 md:w-[180px]"
            href="/login"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Fazer Login
          </Link>
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-solid border-indigo-200 px-6 transition-colors hover:border-indigo-300 hover:bg-indigo-50 text-indigo-600 md:w-[180px]"
            href="/register"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Criar Conta
          </Link>
        </div>
      </main>
    </div>
  );
}
