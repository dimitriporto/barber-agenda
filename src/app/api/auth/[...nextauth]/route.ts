import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

// Rota central do NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };