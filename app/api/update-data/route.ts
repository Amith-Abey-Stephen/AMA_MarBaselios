import { NextResponse } from "next/server"
import { updateSchoolData } from "@/lib/school-data"

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required and must be a string" }, { status: 400 })
    }

    if (content.trim().length === 0) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 })
    }

    const updatedData = updateSchoolData(content.trim())

    return NextResponse.json({
      message: "School data updated successfully",
      lastUpdated: updatedData.lastUpdated,
    })
  } catch (error) {
    console.error("Error updating school data:", error)
    return NextResponse.json({ error: "Failed to update school data" }, { status: 500 })
  }
}
