import { NextResponse } from "next/server"
import { getSchoolData } from "@/lib/school-data"

export async function GET() {
  try {
    const data = getSchoolData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching school data:", error)
    return NextResponse.json({ error: "Failed to fetch school data" }, { status: 500 })
  }
}
