"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { DataEditor } from "@/components/data-editor"

export function EditorInterface() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem("editor-authenticated")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      sessionStorage.setItem("editor-authenticated", "true")
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("editor-authenticated")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <DataEditor onLogout={handleLogout} />
}
