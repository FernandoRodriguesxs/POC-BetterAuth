import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";

async function sendEmail({ to, subject, text, html }: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  console.log("\n📧 ===== EMAIL ENVIADO =====");
  console.log(`📬 Para: ${to}`);
  console.log(`📝 Assunto: ${subject}`);
  console.log(`📄 Conteúdo:`);
  if (html) {
    const linkMatch = html.match(/href="([^"]+)"/);
    if (linkMatch) {
      console.log(`🔗 Link de reset: ${linkMatch[1]}`);
    }
  } else if (text) {
    console.log(text);
  }
  console.log("============================\n");
  
  await new Promise(resolve => setTimeout(resolve, 500));
}

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL || "http://localhost:3000/api/auth",
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: 'common',
      authority: "https://login.microsoftonline.com",
      prompt: "select_account",
    },
  },
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Redefinir sua senha - POC Auth",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F46E5; text-align: center;">🔐 Redefinir Senha</h2>
            
            <p>Olá, <strong>${user.name || 'usuário'}</strong>!</p>
            
            <p>Você solicitou a redefinição da sua senha no POC Auth. Clique no botão abaixo para continuar:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" 
                 style="background: #4F46E5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                ✨ Redefinir Senha
              </a>
            </div>
            
            <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #6B7280; font-size: 14px;">
                <strong>Não consegue clicar no botão?</strong><br>
                Copie e cole este link no seu navegador:<br>
                <a href="${url}" style="color: #4F46E5; word-break: break-all;">${url}</a>
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #6B7280; font-size: 12px; text-align: center;">
              🕐 Este link expira em 1 hora por segurança.<br>
              Se você não solicitou isso, pode ignorar este email com segurança.
            </p>
            
            <p style="color: #9CA3AF; font-size: 11px; text-align: center; margin-top: 20px;">
              POC Better Auth - Sistema de Autenticação
            </p>
          </div>
        `,
      });
    },

    onPasswordReset: async ({ user }, request) => {
      console.log(`✅ Senha redefinida com sucesso para: ${user.email}`);
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await sendEmail({
          to: email,
          subject: "🪄 Seu link mágico de acesso - POC Auth",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #7C3AED; text-align: center;">🪄 Link Mágico de Acesso</h2>
              
              <p>Olá!</p>
              
              <p>Você solicitou um link mágico para acessar o POC Auth. Clique no botão abaixo para fazer login instantaneamente:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" 
                   style="background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);">
                  ✨ Acessar com Magic Link
                </a>
              </div>
              
              <div style="background: #F8FAFC; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7C3AED;">
                <p style="margin: 0; color: #64748B; font-size: 14px;">
                  <strong>💡 Como funciona:</strong><br>
                  • Clique no botão acima<br>
                  • Você será logado automaticamente<br>
                  • Sem necessidade de senha!
                </p>
              </div>
              
              <div style="background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  <strong>Não consegue clicar no botão?</strong><br>
                  Copie e cole este link no seu navegador:<br>
                  <a href="${url}" style="color: #7C3AED; word-break: break-all;">${url}</a>
                </p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              
              <p style="color: #6B7280; font-size: 12px; text-align: center;">
                🕐 Este link expira em 10 minutos por segurança.<br>
                Se você não solicitou isso, pode ignorar este email com segurança.
              </p>
              
              <p style="color: #9CA3AF; font-size: 11px; text-align: center; margin-top: 20px;">
                🪄 POC Better Auth - Autenticação Mágica
              </p>
            </div>
          `,
        });
      },
      
      expiresIn: 60 * 10,
      disableSignUp: false,
    }),
  ],
});
