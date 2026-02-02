import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore, authAdmin } from "./firestore"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
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
        if (!res.ok || !data.localId) return null

        try {
          const userDoc = await firestore.collection("users").doc(data.localId).get()
          const dbUser = userDoc.data()
          console.log("data dbUser: ",dbUser)

          return {
            id: data.localId,
            email: data.email,
            name: dbUser?.name ,
            image: dbUser?.image || null,
          }
        } catch (error) {
          console.error("Erro ao buscar perfil:", error)
          return {
            id: data.localId,
            email: data.email,
            name: data.displayName,
            image: null
          }
        }
      },
    }),
  ],
  events: {
    async createUser({ user }) {
      if (user.email && user.id) {
        try {
          await authAdmin.createUser({
            uid: user.id,
            email: user.email,
            displayName: user.name || undefined,
            photoURL: user.image || undefined,
            emailVerified: true,
          })
          console.log(`Usuário sincronizado no Auth: ${user.email}`)
        } catch (error: any) {
          if (error.code !== 'auth/uid-already-exists' && error.code !== 'auth/email-already-exists') {
            console.error("Erro ao sincronizar usuário criado:", error)
          }
        }
      }
    },
  },
  callbacks: {
    // código gambiarra para fazer consertar brainsplit entre o next-auth e o firestore
    // ele gera "Falha ao corrigir usuário no Auth: Error: The email address is already in use by another account." caso o a conta já exista
    // Anotação: melhorar essa lógica depois 
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email && user.id) {
        try {
          await authAdmin.getUser(user.id)
        } catch (error: any) {
          if (error.code === 'auth/user-not-found') {
            try {
              await authAdmin.createUser({
                uid: user.id,
                email: user.email,
                displayName: user.name || undefined,
                photoURL: user.image || undefined,
                emailVerified: true,
              })
              console.log(`Correção: Usuário ${user.email} recriado no Auth.`)
            } catch (createError) {
              console.error("Falha ao corrigir usuário no Auth:", createError)
            }
          }
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id
        token.picture = user.image
        token.name = user.name
      }
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
  },
  pages: {
    signIn: "/login",
  },
})