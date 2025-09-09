export interface SchoolData {
  content: string
  lastUpdated: Date
}

// Default school information
const DEFAULT_SCHOOL_DATA: SchoolData = {
  content: `# Introduction

Mar Baselios Public School, located at Devalokam in Kottayam, Kerala, is a renowned institution committed to delivering quality education rooted in strong moral and cultural values. Established in 2001 under the patronage of the Malankara Orthodox Syrian Church, the school has earned a stellar reputation for academic excellence and holistic development. Its location beside the Catholicate Aramana gives it a serene and spiritually uplifting environment, ideal for a student's educational journey.

Affiliated to the Central Board of Secondary Education (CBSE), New Delhi, the school follows a modern, well-structured curriculum designed to equip students with skills that go beyond textbooks. The academic programs are regularly updated and taught using effective pedagogical practices that foster curiosity, problem-solving, and lifelong learning. English is the medium of instruction, and special focus is given to proficiency in languages, mathematics, and sciences.

The school consistently secures excellent results in CBSE board examinations, both in the secondary and senior secondary levels. Year after year, students from Mar Baselios achieve top scores and gain admission to prestigious colleges and universities across the country and abroad. These results are a testimony to the dedicated staff, motivated students, and supportive parents who form the backbone of the school community.

Mar Baselios Public School goes beyond academics by emphasizing co-curricular and extracurricular development. Students actively participate in cultural events, debates, arts, music, sports, and interschool competitions. Events such as “Kids Fest” and “Baselian Ensemble” are conducted annually to encourage talent and creativity. The school believes that every child is unique and deserves opportunities to discover and nurture their hidden potential.

The school houses well-equipped laboratories for Physics, Chemistry, Biology, Computer Science, Mathematics, and even emerging areas like Robotics and Psychology. These labs are designed to provide hands-on experience, helping students to understand theoretical concepts through practical application. Additionally, smart classrooms with digital boards and audio-visual tools enhance the learning experience.

The campus is lush, green, and spacious, offering a peaceful atmosphere that encourages concentration and discipline. The infrastructure includes a vast library with a diverse collection of books and reference materials, a hygienic cafeteria, reliable school bus services, and a large multipurpose auditorium for school assemblies and performances. The physical environment is both safe and stimulating for students from kindergarten through senior secondary.

Mar Baselios also prioritizes student well-being and mental health. Qualified counsellors and student support staff provide guidance, emotional support, and personal development sessions. Programs on mindfulness, peer relationships, and self-esteem building are regularly conducted to ensure students grow up with resilience and confidence. The school believes in educating the whole child—not just academically, but emotionally and socially as well.

Environmental consciousness is an important pillar of the school’s values. Students are encouraged to participate in green initiatives such as planting trees, maintaining a clean campus, recycling drives, and water conservation. Clubs and houses take turns managing eco-friendly practices, and the school garden serves both as a learning space and a symbol of its sustainability efforts.

Mar Baselios maintains a strong bond with the parent community, valuing open communication, transparency, and collective decision-making. Parent-teacher meetings are held regularly, and feedback is welcomed with an open mind. The school management, led by experienced educational leaders and clergy members of the Malankara Orthodox Syrian Church, ensures that the institution runs with clarity of vision and moral integrity.

In conclusion, Mar Baselios Public School, Devalokam is more than just a school—it is a vibrant community that nurtures young minds to become responsible, compassionate, and successful global citizens. With its blend of academic strength, moral foundation, and progressive outlook, the school stands tall as one of Kottayam’s most respected educational institutions, committed to shaping future generations with purpose and pride.

## ATL LAB

## 1. Introduction

At Mar Baselios Public School, the ATL (Atal Tinkering Lab) is a dedicated innovation workspace designed to foster creativity, problem‑solving, and hands‑on learning in students. It is widely recognized that ATLs are generally supported by the Atal Innovation Mission (AIM), and many schools partner with educational organizations to manage and mentor lab activities. If **Hownwhy Education** is involved, they likely provide operational support, training, and curriculum-aligned project guidance.

## 2. Infrastructure & Setup

In a typical ATL setup, students gain access to tools including science kits, electronics modules (Arduino, sensors), robotics parts, 3D printers, microcontroller boards, and computers—allowing them to prototype and experiment. Hownwhy Education may have facilitated procurement of such equipment and ensured that lab infrastructure aligns with AIM guidelines.

## 3. Skill Development Framework

Under guidance from Hownwhy Education, the lab likely focuses on building 21st‑century skills: computational thinking, design mindset, adaptive learning, physical computing and ethical leadership. These mirror ATL objectives and broader aims of nurturing scientific temper among youth. The things we offer includes 

1. Mentor Support 
2. Exhibition Support
3. HownWhy Budding Technologist(HBT)
4. Industrial visit 
5. Hackathons
6. Skill development programs

## 4. Project-Based Learning

Students would be encouraged to ideate, design, and build projects—such as voice-controlled robots, smart irrigation systems or LED circuits. Many ATL initiatives across India have included Arduino-based prototypes, PCB etching, and sensors. If managed by Hownwhy, these methodologies would be integrated into regular ATL programming

## 5. Workshops & Mentorship

Regular hands‑on workshops like “design thinking,” “creativity & problem solving,” IoT, and robotics are standard in active ATLs. Hownwhy Education might be organizing these, either in-house or via collaborations, to train students and teachers alike as mentors and innovators. We’ve conducted a drone workshop for the community students exploring the concepts of drone and building a drone.

## 6. Competitions & Fairs

Generally, ATLs participate in events such as ATL Marathon, Tinkerpreneur, and regional fairs. Under Hownwhy Education’s mentorship, the school’s teams might be submitting innovative projects and competing at state or national levels, and potentially getting selected among top teams depending on performance.

---

## 7. Notable Projects & Outcomes

While specific details from Mar Baselios are unavailable, typical school ATL achievements include developing prototypes like touchless systems, smart devices, or sustainability-focused inventions—projects frequently cited in ATL case studies across India.`,
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
