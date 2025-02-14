import NextAuth from "next-auth/next";
import { authOptions } from "./authOption";

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
