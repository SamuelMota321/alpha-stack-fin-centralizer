"use server"
import { firestore } from "@/lib/firestore"
import { getAuth } from "firebase-admin/auth"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password || !name) {
    return { error: "Preencha todos os campos." }
  }

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name,
    })

    await firestore.collection("users").doc(userRecord.uid).set({
      name,
      email,
      image: null,
      emailVerified: null,
      openFinance: { // Estrutura pronta para o Pluggy
        customerId: null, 
        connectedAccounts: [],
        status: "inactive"
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    })

  } catch (error: any) {
    console.error("Erro ao registrar:", error)
    if (error.code === 'auth/email-already-exists') {
      return { error: "Este e-mail já está em uso." }
    }
    return { error: "Erro ao criar conta. Tente novamente." }
  }

  redirect("/login?success=true")
}