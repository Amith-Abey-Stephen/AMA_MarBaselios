import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, MessageCircle, Settings } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary mb-1 text-balance">Ask Me Anything</h1>
                <h2 className="text-2xl text-muted-foreground">Mar Baselios School</h2>
              </div>
            </div>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto text-pretty mb-6">
              Welcome to our interactive chatbot! Ask me anything about Mar Baselios School and I'll help you find the
              information you need.
            </p>

            <div className="flex justify-center mb-6">
              <Link href="/editor">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Settings className="w-4 h-4" />
                  Admin Access
                </Button>
              </Link>
            </div>
          </header>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Instant Answers</h3>
                <p className="text-sm text-muted-foreground">Get quick responses to your school-related questions</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <GraduationCap className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">School Information</h3>
                <p className="text-sm text-muted-foreground">Learn about facilities, timings, and curriculum</p>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="pt-4">
                <Settings className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Always Updated</h3>
                <p className="text-sm text-muted-foreground">Information is kept current by school administrators</p>
              </CardContent>
            </Card>
          </div>

          <ChatInterface />
        </div>
      </div>
    </main>
  )
}
