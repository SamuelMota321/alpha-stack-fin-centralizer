import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Construction, LifeBuoy } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-background p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          {/* Ícone de destaque */}
          <div className="p-3 bg-muted rounded-full">
            <Construction className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Em Desenvolvimento</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground">
            A nossa central de ajuda está sendo construída. <br />
            Em breve você encontrará tutoriais e suporte aqui.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 text-sm font-medium hover:underline text-primary">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Dashboard
            </div>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}