import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

// Configuração principal da autenticação
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        await connectDB();

        // Valida envio das credenciais
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas.");
        }

        // Busca usuário pelo e-mail
        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        // Compara senha digitada com hash do banco
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Senha incorreta.");
        }

        // Dados persistidos na sessão
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "client";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        (session.user as typeof session.user & { role: string }).role =
          token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};