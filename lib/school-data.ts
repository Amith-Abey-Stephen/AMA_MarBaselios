export interface SchoolData {
  content: string
  lastUpdated: Date
}

// Default school information
const DEFAULT_SCHOOL_DATA: SchoolData = {
  content: `Mar Baselios School is a prestigious educational institution located in the heart of the city. Our school was founded with the vision of providing quality education that nurtures both academic excellence and character development. We offer classes from kindergarten through grade 12, with a comprehensive curriculum that includes science, mathematics, languages, arts, and sports. Our experienced faculty is dedicated to creating a supportive learning environment where every student can thrive. The school features modern facilities including well-equipped laboratories, a library, computer center, sports grounds, and auditorium. We believe in holistic education that prepares students not just for academic success, but for life. Our school timings are from 8:00 AM to 3:00 PM, Monday through Friday. For admissions and general inquiries, please contact our office at +91-XXXXXXXXXX or email us at info@marbaseliossschool.edu.`,
  lastUpdated: new Date(),
}

// In-memory storage (in production, this would be a database)
let schoolData: SchoolData = DEFAULT_SCHOOL_DATA

export function getSchoolData(): SchoolData {
  return schoolData
}

export function updateSchoolData(newContent: string): SchoolData {
  schoolData = {
    content: newContent,
    lastUpdated: new Date(),
  }
  return schoolData
}
