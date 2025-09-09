"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User, MessageCircle, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  "Where is the school located?",
  "What is the school's vision?",
  "What are the school timings?",
  "How can I contact the school?",
  "What facilities does the school have?",
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to help you with questions about Mar Baselios School. You can ask me about our location, facilities, vision, or any other school-related information.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content.trim() }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm here to help you with questions about Mar Baselios School. You can ask me about our location, facilities, vision, or any other school-related information.",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Suggested Questions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Try asking me:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedQuestion(question)}
              className="text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="mb-4 shadow-lg border-2 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Chat with Mar Baselios Bot</CardTitle>
            </div>
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear Chat
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 duration-300`}
              >
                {message.sender === "bot" && (
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-muted-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.sender === "user" && (
                  <div className="flex-shrink-0 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-muted text-muted-foreground p-4 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <div className="flex gap-3 p-4 bg-card rounded-xl border-2 border-border/50 shadow-sm">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything about Mar Baselios School..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(inputValue)
            }
          }}
          disabled={isLoading}
          className="flex-1 border-0 bg-background focus-visible:ring-2 focus-visible:ring-primary"
        />
        <Button
          onClick={() => handleSendMessage(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          size="icon"
          className="shrink-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
