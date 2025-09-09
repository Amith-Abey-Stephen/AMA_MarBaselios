import { NextResponse } from "next/server"
import { getSchoolData } from "@/lib/school-data"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required and must be a string" }, { status: 400 })
    }

    const schoolData = getSchoolData()
    const userQuestion = message.trim()

    // Check if the question is related to school topics
    const schoolKeywords = [
      "school",
      "mar baselios",
      "education",
      "student",
      "teacher",
      "class",
      "facility",
      "location",
      "contact",
      "admission",
      "timing",
      "vision",
      "mission",
      "curriculum",
      "sports",
      "library",
      "laboratory",
      "fee",
      "grade",
      "kindergarten",
      "primary",
      "secondary",
      "principal",
      "staff",
    ]

    const isSchoolRelated = schoolKeywords.some(
      (keyword) =>
        userQuestion.toLowerCase().includes(keyword) ||
        schoolData.content.toLowerCase().includes(userQuestion.toLowerCase()),
    )

    if (!isSchoolRelated) {
      return NextResponse.json({
        response:
          "Sorry, I can only answer questions related to Mar Baselios School. Please ask me about our facilities, location, timings, admission process, or any other school-related information.",
      })
    }

    let response: string

    try {
      // Use AI for more natural responses, but strictly limit to school context
      const aiResponse = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: `You are a helpful assistant for Mar Baselios School. You can ONLY answer questions about this school using the information provided below. If the user asks about anything not mentioned in the school information, politely redirect them to ask about school-related topics.

SCHOOL INFORMATION:
${schoolData.content}

USER QUESTION: ${userQuestion}

INSTRUCTIONS:
- Only use information from the school data provided above
- If the question cannot be answered with the provided information, say you don't have that specific information but offer to help with other school-related questions
- Be friendly, helpful, and professional
- Keep responses concise but informative
- If asked about topics not related to Mar Baselios School, politely redirect to school topics

Response:`,
        maxTokens: 200,
      })

      response = aiResponse.text
    } catch (aiError) {
      console.error("AI generation failed, falling back to keyword matching:", aiError)
      // Fallback to the original keyword-based response
      response = generateContextualResponse(userQuestion.toLowerCase(), schoolData.content)
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Error processing chat message:", error)
    return NextResponse.json({ error: "Failed to process your message" }, { status: 500 })
  }
}

function generateContextualResponse(question: string, context: string): string {
  const lowerQuestion = question.toLowerCase()
  const contextLower = context.toLowerCase()

  // Location-related questions
  if (lowerQuestion.includes("location") || lowerQuestion.includes("where") || lowerQuestion.includes("address")) {
    if (contextLower.includes("located") || contextLower.includes("heart of the city")) {
      return "Mar Baselios School is located in the heart of the city. For the exact address and directions, please contact our office for detailed location information."
    }
  }

  // Vision/Mission questions
  if (lowerQuestion.includes("vision") || lowerQuestion.includes("mission") || lowerQuestion.includes("goal")) {
    if (contextLower.includes("vision")) {
      return "Our school was founded with the vision of providing quality education that nurtures both academic excellence and character development. We believe in holistic education that prepares students not just for academic success, but for life."
    }
  }

  // Timing questions
  if (
    lowerQuestion.includes("timing") ||
    lowerQuestion.includes("time") ||
    lowerQuestion.includes("hours") ||
    lowerQuestion.includes("schedule")
  ) {
    if (contextLower.includes("8:00 am") || contextLower.includes("3:00 pm")) {
      return "Our school timings are from 8:00 AM to 3:00 PM, Monday through Friday."
    }
  }

  // Contact questions
  if (
    lowerQuestion.includes("contact") ||
    lowerQuestion.includes("phone") ||
    lowerQuestion.includes("email") ||
    lowerQuestion.includes("reach")
  ) {
    if (contextLower.includes("contact") || contextLower.includes("inquiries")) {
      return "For admissions and general inquiries, please contact our office at +91-XXXXXXXXXX or email us at info@marbaseliossschool.edu."
    }
  }

  // Facilities questions
  if (
    lowerQuestion.includes("facilities") ||
    lowerQuestion.includes("facility") ||
    lowerQuestion.includes("laboratory") ||
    lowerQuestion.includes("library") ||
    lowerQuestion.includes("sports")
  ) {
    if (
      contextLower.includes("facilities") ||
      contextLower.includes("laboratory") ||
      contextLower.includes("library")
    ) {
      return "The school features modern facilities including well-equipped laboratories, a library, computer center, sports grounds, and auditorium. These facilities support our comprehensive educational approach."
    }
  }

  // Classes/Curriculum questions
  if (
    lowerQuestion.includes("class") ||
    lowerQuestion.includes("grade") ||
    lowerQuestion.includes("curriculum") ||
    lowerQuestion.includes("subjects")
  ) {
    if (
      contextLower.includes("kindergarten") ||
      contextLower.includes("grade 12") ||
      contextLower.includes("curriculum")
    ) {
      return "We offer classes from kindergarten through grade 12, with a comprehensive curriculum that includes science, mathematics, languages, arts, and sports."
    }
  }

  // Faculty questions
  if (lowerQuestion.includes("teacher") || lowerQuestion.includes("faculty") || lowerQuestion.includes("staff")) {
    if (contextLower.includes("faculty") || contextLower.includes("experienced")) {
      return "Our experienced faculty is dedicated to creating a supportive learning environment where every student can thrive. They are committed to both academic excellence and character development."
    }
  }

  // General school information
  if (lowerQuestion.includes("about") || lowerQuestion.includes("tell me") || lowerQuestion.includes("information")) {
    return "Mar Baselios School is a prestigious educational institution that provides quality education nurturing both academic excellence and character development. We offer comprehensive education from kindergarten through grade 12 with modern facilities and experienced faculty."
  }

  // Default response with context-based information
  const sentences = context.split(". ")
  const relevantSentences = sentences.filter((sentence) => {
    const sentenceLower = sentence.toLowerCase()
    return lowerQuestion.split(" ").some((word) => word.length > 3 && sentenceLower.includes(word))
  })

  if (relevantSentences.length > 0) {
    return relevantSentences.slice(0, 2).join(". ") + (relevantSentences.length > 1 ? "." : "")
  }

  // Fallback response
  return "Based on the information I have about Mar Baselios School, I can tell you that we are a prestigious educational institution focused on providing quality education. Could you please ask a more specific question about our facilities, location, timings, or curriculum?"
}
