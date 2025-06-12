export interface MindmapNodeData {
  id: string
  label: string
  type: string
  description?: string
  x: number
  y: number
  parentId?: string
  children?: any[]
}

export function generateSampleData(profileName: string, profileType: string): MindmapNodeData[] {
  if (profileType === "person") {
    return generatePersonData(profileName)
  } else if (profileType === "organization") {
    return generateOrganizationData(profileName)
  } else {
    return generateTopicData(profileName)
  }
}

function generatePersonData(name: string): MindmapNodeData[] {
  return [
    {
      id: "person_001",
      label: name,
      type: "Person",
      description: "AI Researcher | Speaker | Advocate for Responsible Tech",
      x: 1500, // Center of larger canvas
      y: 1000,
    },
    {
      id: "experience_001",
      label: "Experience",
      type: "Section",
      description: "Professional background and roles",
      x: 800, // Much more spacing
      y: 600,
      parentId: "person_001",
    },
    {
      id: "education_001",
      label: "Education",
      type: "Section",
      description: "Academic qualifications",
      x: 2200, // Much more spacing
      y: 600,
      parentId: "person_001",
    },
    {
      id: "skills_001",
      label: "Skills",
      type: "Section",
      description: "Technical and soft skills",
      x: 800,
      y: 1400, // Much more spacing
      parentId: "person_001",
    },
    {
      id: "projects_001",
      label: "Projects",
      type: "Section",
      description: "Notable projects and contributions",
      x: 2200,
      y: 1400, // Much more spacing
      parentId: "person_001",
    },
    {
      id: "contact_001",
      label: "Contact",
      type: "Section",
      description: "Contact information and links",
      x: 1500,
      y: 400, // Above center
      parentId: "person_001",
    },
    {
      id: "exp1",
      label: "Google DeepMind",
      type: "Role",
      description: "Senior AI Scientist (2020 – Present)",
      x: 500,
      y: 400, // Better spacing
      parentId: "experience_001",
    },
    {
      id: "exp2",
      label: "Meta",
      type: "Role",
      description: "Machine Learning Engineer (2016 – 2020)",
      x: 500,
      y: 800, // Better spacing
      parentId: "experience_001",
    },
    {
      id: "edu1",
      label: "MIT",
      type: "Degree",
      description: "Ph.D. in Computer Science (2012 – 2016)",
      x: 2500,
      y: 400, // Better spacing
      parentId: "education_001",
    },
    {
      id: "edu2",
      label: "Stanford",
      type: "Degree",
      description: "B.Sc. in Electrical Engineering (2008 – 2012)",
      x: 2500,
      y: 800, // Better spacing
      parentId: "education_001",
    },
    {
      id: "skill1",
      label: "Machine Learning",
      type: "Skill",
      description: "Advanced expertise in ML algorithms",
      x: 500,
      y: 1200, // Better spacing
      parentId: "skills_001",
    },
    {
      id: "skill2",
      label: "NLP",
      type: "Skill",
      description: "Natural Language Processing specialist",
      x: 500,
      y: 1600, // Better spacing
      parentId: "skills_001",
    },
    {
      id: "skill3",
      label: "Deep Learning",
      type: "Skill",
      description: "Neural networks and deep learning",
      x: 1100,
      y: 1200,
      parentId: "skills_001",
    },
    {
      id: "skill4",
      label: "Python",
      type: "Skill",
      description: "Programming language expertise",
      x: 1100,
      y: 1600,
      parentId: "skills_001",
    },
    {
      id: "proj1",
      label: "AI Ethics Toolkit",
      type: "Project",
      description: "Open-source toolkit for ethical AI assessment",
      x: 2500,
      y: 1200, // Better spacing
      parentId: "projects_001",
    },
    {
      id: "proj2",
      label: "Biomedical AI",
      type: "Project",
      description: "AI applications in healthcare research",
      x: 2500,
      y: 1600, // Better spacing
      parentId: "projects_001",
    },
    {
      id: "email_001",
      label: "Email",
      type: "Contact",
      description: "professional@email.com",
      x: 1200,
      y: 200,
      parentId: "contact_001",
    },
    {
      id: "phone_001",
      label: "Phone",
      type: "Contact",
      description: "+1 (555) 123-4567",
      x: 1800,
      y: 200,
      parentId: "contact_001",
    },
  ]
}

function generateOrganizationData(name: string): MindmapNodeData[] {
  return [
    {
      id: "org_001",
      label: name,
      type: "Organization",
      description: "Technology company focused on innovation",
      x: 1500,
      y: 1000,
    },
    {
      id: "leadership_001",
      label: "Leadership",
      type: "Section",
      description: "Executive team and board members",
      x: 800,
      y: 600,
      parentId: "org_001",
    },
    {
      id: "departments_001",
      label: "Departments",
      type: "Section",
      description: "Organizational structure",
      x: 2200,
      y: 600,
      parentId: "org_001",
    },
    {
      id: "products_001",
      label: "Products",
      type: "Section",
      description: "Product portfolio and services",
      x: 800,
      y: 1400,
      parentId: "org_001",
    },
    {
      id: "timeline_001",
      label: "Timeline",
      type: "Section",
      description: "Key milestones and events",
      x: 2200,
      y: 1400,
      parentId: "org_001",
    },
    {
      id: "ceo_001",
      label: "CEO",
      type: "Role",
      description: "Chief Executive Officer",
      x: 500,
      y: 400,
      parentId: "leadership_001",
    },
    {
      id: "cto_001",
      label: "CTO",
      type: "Role",
      description: "Chief Technology Officer",
      x: 1100,
      y: 400,
      parentId: "leadership_001",
    },
    {
      id: "engineering_001",
      label: "Engineering",
      type: "Department",
      description: "Software development and infrastructure",
      x: 1900,
      y: 400,
      parentId: "departments_001",
    },
    {
      id: "marketing_001",
      label: "Marketing",
      type: "Department",
      description: "Brand and customer acquisition",
      x: 2500,
      y: 400,
      parentId: "departments_001",
    },
  ]
}

function generateTopicData(name: string): MindmapNodeData[] {
  return [
    {
      id: "topic_001",
      label: name,
      type: "Topic",
      description: "News topic analysis and exploration",
      x: 1500,
      y: 1000,
    },
    {
      id: "actors_001",
      label: "Key Actors",
      type: "Section",
      description: "People and organizations involved",
      x: 800,
      y: 600,
      parentId: "topic_001",
    },
    {
      id: "events_001",
      label: "Events",
      type: "Section",
      description: "Timeline of significant events",
      x: 2200,
      y: 600,
      parentId: "topic_001",
    },
    {
      id: "consequences_001",
      label: "Consequences",
      type: "Section",
      description: "Impact and outcomes",
      x: 800,
      y: 1400,
      parentId: "topic_001",
    },
    {
      id: "sources_001",
      label: "Sources",
      type: "Section",
      description: "News sources and references",
      x: 2200,
      y: 1400,
      parentId: "topic_001",
    },
    {
      id: "actor1",
      label: "Government",
      type: "Actor",
      description: "Policy makers and regulators",
      x: 500,
      y: 400,
      parentId: "actors_001",
    },
    {
      id: "actor2",
      label: "Industry Leaders",
      type: "Actor",
      description: "Key companies and executives",
      x: 1100,
      y: 400,
      parentId: "actors_001",
    },
    {
      id: "event1",
      label: "Initial Announcement",
      type: "Event",
      description: "First public disclosure",
      x: 1900,
      y: 400,
      parentId: "events_001",
    },
    {
      id: "event2",
      label: "Market Response",
      type: "Event",
      description: "Industry and market reaction",
      x: 2500,
      y: 400,
      parentId: "events_001",
    },
  ]
}
