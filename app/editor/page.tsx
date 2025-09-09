import { EditorInterface } from "@/components/editor-interface"

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">School Data Editor</h1>
            <p className="text-lg text-muted-foreground">
              Update the information that the chatbot uses to answer questions
            </p>
          </header>
          <EditorInterface />
        </div>
      </div>
    </main>
  )
}
