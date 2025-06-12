import { type NextRequest, NextResponse } from "next/server"

interface ResumeData {
  _id?: any
  name: string
  email?: string
  phone?: string
  address?: string
  linkedin?: string
  github?: string
  website?: string
  summary?: string
  education: Array<{
    institution: string
    degree: string
    field: string
    honor?: string
    GPA?: string
    country?: string
    startDate: string
    endDate: string
  }>
  workExperience: Array<{
    jobTitle: string
    company: string
    location: string
    startDate: string
    endDate: string | null
    responsibilities: string[]
  }>
  skills: string[]
  references?: Array<{
    name: string
    relationship: string
    title: string
    contact: string
  }>
  contact?: {
    email: string
    phone: string
    location: string
  }
}

interface MindmapNode {
  id: string
  label: string
  type: string
  description?: string
  x: number
  y: number
  parentId?: string
}

export async function POST(request: NextRequest) {
  try {
    const resumeData: ResumeData = await request.json()

    // Validate required fields
    if (!resumeData.name) {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 })
    }

    const nodes: MindmapNode[] = []
    let nodeIdCounter = 1

    // Central person node - positioned in center of large canvas
    nodes.push({
      id: `person_${nodeIdCounter++}`,
      label: resumeData.name,
      type: "Person",
      description: resumeData.summary || "Professional profile",
      x: 1500, // Center of 3000px wide canvas
      y: 1000, // Center of 2000px tall canvas
    })

    const centerNodeId = nodes[0].id

    // Contact Information Section
    if (resumeData.email || resumeData.phone || resumeData.address) {
      const contactNodeId = `contact_${nodeIdCounter++}`
      nodes.push({
        id: contactNodeId,
        label: "Contact",
        type: "Section",
        description: "Contact information and links",
        x: 1500,
        y: 400, // Above center
        parentId: centerNodeId,
      })

      let contactX = 1200
      if (resumeData.email) {
        nodes.push({
          id: `email_${nodeIdCounter++}`,
          label: "Email",
          type: "Contact",
          description: resumeData.email,
          x: contactX,
          y: 200,
          parentId: contactNodeId,
        })
        contactX += 300
      }

      if (resumeData.phone) {
        nodes.push({
          id: `phone_${nodeIdCounter++}`,
          label: "Phone",
          type: "Contact",
          description: resumeData.phone,
          x: contactX,
          y: 200,
          parentId: contactNodeId,
        })
        contactX += 300
      }

      if (resumeData.linkedin) {
        nodes.push({
          id: `linkedin_${nodeIdCounter++}`,
          label: "LinkedIn",
          type: "Contact",
          description: resumeData.linkedin,
          x: contactX,
          y: 200,
          parentId: contactNodeId,
        })
        contactX += 300
      }

      if (resumeData.github) {
        nodes.push({
          id: `github_${nodeIdCounter++}`,
          label: "GitHub",
          type: "Contact",
          description: resumeData.github,
          x: contactX,
          y: 200,
          parentId: contactNodeId,
        })
      }
    }

    // Education Section
    if (resumeData.education && resumeData.education.length > 0) {
      const educationNodeId = `education_${nodeIdCounter++}`
      nodes.push({
        id: educationNodeId,
        label: "Education",
        type: "Section",
        description: "Academic qualifications and achievements",
        x: 2200, // Right side
        y: 600,
        parentId: centerNodeId,
      })

      resumeData.education.forEach((edu, index) => {
        const eduNodeId = `edu_${nodeIdCounter++}`
        const startYear = new Date(edu.startDate).getFullYear()
        const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"

        nodes.push({
          id: eduNodeId,
          label: edu.institution,
          type: "Degree",
          description: `${edu.degree} in ${edu.field} (${startYear} - ${endYear})${edu.honor ? ` - ${edu.honor}` : ""}${edu.GPA ? ` - GPA: ${edu.GPA}` : ""}`,
          x: 2500 + (index % 2) * 300, // Spread horizontally
          y: 400 + Math.floor(index / 2) * 250, // Stack vertically
          parentId: educationNodeId,
        })
      })
    }

    // Work Experience Section
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      const experienceNodeId = `experience_${nodeIdCounter++}`
      nodes.push({
        id: experienceNodeId,
        label: "Experience",
        type: "Section",
        description: "Professional work history",
        x: 800, // Left side
        y: 600,
        parentId: centerNodeId,
      })

      resumeData.workExperience.forEach((exp, index) => {
        const expNodeId = `exp_${nodeIdCounter++}`
        const startYear = new Date(exp.startDate).getFullYear()
        const endYear = exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"

        nodes.push({
          id: expNodeId,
          label: exp.company,
          type: "Role",
          description: `${exp.jobTitle} (${startYear} - ${endYear}) - ${exp.location}`,
          x: 500 + (index % 2) * 300, // Spread horizontally
          y: 400 + Math.floor(index / 2) * 250, // Stack vertically
          parentId: experienceNodeId,
        })

        // Add key responsibilities as child nodes
        exp.responsibilities.slice(0, 2).forEach((resp, respIndex) => {
          nodes.push({
            id: `resp_${nodeIdCounter++}`,
            label: `Task ${respIndex + 1}`,
            type: "Task",
            description: resp,
            x: 200 + respIndex * 200,
            y: 450 + Math.floor(index / 2) * 250 + respIndex * 100,
            parentId: expNodeId,
          })
        })
      })
    }

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      const skillsNodeId = `skills_${nodeIdCounter++}`
      nodes.push({
        id: skillsNodeId,
        label: "Skills",
        type: "Section",
        description: "Technical and professional skills",
        x: 800, // Left side
        y: 1400, // Bottom
        parentId: centerNodeId,
      })

      // Group skills and create nodes
      resumeData.skills.slice(0, 8).forEach((skill, index) => {
        nodes.push({
          id: `skill_${nodeIdCounter++}`,
          label: skill,
          type: "Skill",
          description: `Professional skill: ${skill}`,
          x: 500 + (index % 4) * 200, // 4 columns
          y: 1200 + Math.floor(index / 4) * 150, // 2 rows
          parentId: skillsNodeId,
        })
      })
    }

    // References Section (if available)
    if (resumeData.references && resumeData.references.length > 0) {
      const referencesNodeId = `references_${nodeIdCounter++}`
      nodes.push({
        id: referencesNodeId,
        label: "References",
        type: "Section",
        description: "Professional references",
        x: 2200, // Right side
        y: 1400, // Bottom
        parentId: centerNodeId,
      })

      resumeData.references.forEach((ref, index) => {
        nodes.push({
          id: `ref_${nodeIdCounter++}`,
          label: ref.name,
          type: "Reference",
          description: `${ref.title} - ${ref.relationship}`,
          x: 2500 + (index % 2) * 300,
          y: 1200 + Math.floor(index / 2) * 150,
          parentId: referencesNodeId,
        })
      })
    }

    return NextResponse.json({
      success: true,
      nodes,
      profileInfo: {
        name: resumeData.name,
        type: "person",
        summary: resumeData.summary,
      },
    })
  } catch (error) {
    console.error("Error processing resume:", error)
    return NextResponse.json({ error: "Failed to process resume data" }, { status: 500 })
  }
}
