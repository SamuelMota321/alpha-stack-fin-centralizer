import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore } from "./firestore"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
        if (!apiKey) throw new Error("API Key do Firebase não configurada.")

        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        )

        const data = await res.json()

        if (!res.ok || !data.localId) {
          console.error("Erro Auth:", data.error?.message)
          return null
        }

        const uid = data.localId

        try {
            const userDoc = await firestore.collection("users").doc(uid).get()
            const dbUser = userDoc.data()
            const finalName = dbUser?.name || data.displayName || null
            const finalImage = dbUser?.image || dbUser?.picture || null 

            return {
                id: uid,
                email: data.email,
                name: finalName,
                image: finalImage,
            }
        } catch (error) {
            console.error("Erro ao buscar perfil no Firestore:", error)
            return {
                id: uid,
                email: data.email,
                name: data.displayName,
            }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id
        token.picture = user.image
        token.name = user.name
      }
      
      // Permite atualizar a sessão no front-end sem relogar (ex: usuário trocou a foto)
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.picture = session.user.image;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.image = token.picture as string | null
        session.user.name = token.name as string | null
      }
      return session
    }
  }
})