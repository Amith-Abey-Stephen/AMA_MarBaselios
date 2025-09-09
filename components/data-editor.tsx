"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Save, LogOut, RefreshCw, CheckCircle, AlertCircle, Edit3 } from "lucide-react"

interface DataEditorProps {
  onLogout: () => void
}

export function DataEditor({ onLogout }: DataEditorProps) {
  const [schoolData, setSchoolData] = useState("")
  const [originalData, setOriginalData] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchSchoolData()
  }, [])

  const fetchSchoolData = async () => {
    try {
      const response = await fetch("/api/school-data")
      const data = await response.json()
      setSchoolData(data.content)
      setOriginalData(data.content)
      setLastUpdated(new Date(data.lastUpdated))
    } catch (error) {
      console.error("Failed to fetch school data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      const response = await fetch("/api/update-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: schoolData }),
      })

      if (response.ok) {
        const data = await response.json()
        setOriginalData(schoolData)
        setLastUpdated(new Date(data.lastUpdated))
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch (error) {
      console.error("Failed to save data:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSchoolData(originalData)
    setSaveStatus("idle")
  }

  const hasChanges = schoolData !== originalData

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with logout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Edit School Information</h2>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Status alerts */}
      {saveStatus === "success" && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            School data updated successfully! The chatbot will now use the new information.
          </AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
        </Alert>
      )}

      {/* Editor card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              School Data Content
              {hasChanges && (
                <Badge variant="secondary" className="text-xs">
                  Unsaved Changes
                </Badge>
              )}
            </CardTitle>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="school-data" className="block text-sm font-medium mb-2">
              School Information
            </label>
            <Textarea
              id="school-data"
              value={schoolData}
              onChange={(e) => setSchoolData(e.target.value)}
              placeholder="Enter the school information that the chatbot will use to answer questions..."
              className="min-h-[300px] resize-none"
              disabled={isSaving}
            />
            <p className="text-sm text-muted-foreground mt-2">
              This information will be used by the chatbot to answer questions about Mar Baselios School. Make sure to
              include details about location, facilities, vision, contact information, and any other relevant details.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={!hasChanges || isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges || isSaving}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Edit the school information in the text area above</li>
            <li>• Click "Save Changes" to update the chatbot's knowledge base</li>
            <li>• The chatbot will immediately start using the new information</li>
            <li>• You will need to log in again each time you visit this page</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
