import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import {clientPromise} from "@/lib/mongodb"
import { compare } from "bcryptjs"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise,{
    databaseName:process.env.DB_NAME
  }),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const users = db.collection("users")

        // Find user by email (created via register API below OR first Google login)
        const user = await users.findOne({ email: credentials.email })
        if (!user) throw new Error("No user found with this email")

        // If user signed up with Google only & has no password set
        if (!user.password) throw new Error("Please sign in with Google")

        const ok = await compare(credentials.password, user.password)
        if (!ok) throw new Error("Invalid email or password")

        // Minimal user object
        return { id: user._id.toString(), name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id
      return token
    },
    async session({ session, token }) {
      if (token?.uid) session.user.id = token.uid
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
