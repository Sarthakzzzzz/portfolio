export interface Project {
  title: string;
  year?: string;
  category?: string;
  description: string;
  highlights?: string[];
  tags: string[];
  github?: string;
  demo?: string;
  deepDive?: string;
  deepDiveStatus?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  tags?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
  location: string;
  gpa?: string;
  details?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  issuer?: string;
  date: string;
  description: string;
  link?: string;
  certificateUrl?: string;
}

export interface SocialLinks {
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  codeforces?: string;
  leetcode?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  longBio: string;
  socials: SocialLinks;
  resumeUrl?: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  achievements: Achievement[];
}

export const portfolioData: PortfolioData = {
  name: "Sarthak Pujari",
  title: "Computer Engineering Student & Software Developer",
  subtitle: "AI • Backend Engineering • Competitive Programming",
  bio: "Motivated Computer Engineering student with strong foundations in software development, AI, and backend engineering. Passionate about building scalable applications using Python, modern web technologies, and machine learning.",
  longBio: "I'm a Computer Engineering student at Wadia College of Engineering, Pune, with hands-on experience building AI-powered applications, full-stack web platforms, and automation tools. I enjoy working at the intersection of AI agents, backend systems, and cybersecurity — from multi-agent vulnerability scanners to finance dashboards and meeting assistants. I'm an active competitive programmer (Codeforces Specialist, CodeChef 3★, LeetCode 1545) and a Technical Team Member at CodeStorm Club where I conduct bootcamps and design algorithmic problems.",
  resumeUrl: "/resume.pdf",
  socials: {
    email: "sarthakpujari1970@gmail.com",
    github: "https://github.com/Sarthakzzzzz",
    linkedin: "https://www.linkedin.com/in/sarthakzzzzz/",
    codeforces: "https://codeforces.com/profile/sarthakzzzzz",
    leetcode: "https://leetcode.com/u/sarthakzzzzz",
  },
  experience: [
    {
      company: "CodeStorm Club",
      role: "Technical Team Member",
      location: "Pune, India",
      period: "Jun 2025 – Jun 2026",
      description: [
        "Conducted technical bootcamps on C++ STL and Data Structures, helping peers overcome fear of complex algorithms.",
        "Identified logical errors and taught debugging techniques to improve participant code quality.",
        "Designed algorithmic problems that test logic building and edge-case handling for college-level contests."
      ],
      tags: ["C++", "DSA", "Teaching", "Problem Setting"]
    }
  ],
  projects: [
    {
      title: "ASTRA",
      year: "2025",
      category: "AI & Cybersecurity",
      description: "Engineered an asynchronous task orchestrator using Python's ThreadPoolExecutor to manage 4+ security scanners concurrently, increasing throughput by 4x. Built multi-agent workflows with Dynamic Scan Agents, Neo4j attack graph engines, and a Google ADK + ChromaDB RAG assistant.",
      tags: ["Python", "Google ADK", "ChromaDB", "Neo4j", "Docker", "RAG"],
      github: "https://github.com/Sarthakzzzzz/ASTRA",
      deepDiveStatus: "Deep dive coming soon"
    },
    {
      title: "Meet Assistant",
      year: "2025",
      category: "AI & Automation",
      description: "Automated bot that joins meetings via links, captures screenshots, and synchronizes slide-specific captions into ChromaDB. Powers a context-aware Gemini RAG chatbot system to answer attendee queries, respond to tags, and send push notifications.",
      tags: ["Python", "Gemini API", "ChromaDB", "Playwright", "RAG", "Automation"],
      github: "https://github.com/Sarthakzzzzz/meet-assistant",
      deepDiveStatus: "Deep dive coming soon"
    },
    {
      title: "FTracker",
      year: "2024",
      category: "Full Stack & Finance",
      description: "Full-stack finance dashboard featuring role-based access control, real-time transaction management, and automated spending analytics. Engineered with FastAPI, PostgreSQL, Alembic migrations, and responsive Next.js frontend.",
      tags: ["FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
      github: "https://github.com/Sarthakzzzzz/ftracker",
      demo: "https://ftracker-two.vercel.app",
      deepDiveStatus: "Live on Vercel"
    },
    {
      title: "CF Question",
      year: "2024",
      category: "Competitive Programming",
      description: "Smart Codeforces problem recommender and practice tracker. Analyzes submission history to detect weak algorithm topics, generating targeted 4-problem practice sprints with estimated solve times.",
      tags: ["NestJS", "Next.js", "TypeScript", "Codeforces API", "Docker"],
      github: "https://github.com/Sarthakzzzzz/cfquestion",
      demo: "https://cfquestion.vercel.app",
      deepDiveStatus: "Live on Vercel"
    },
    {
      title: "ProgCorn",
      year: "2024",
      category: "Web Platform",
      description: "Full-stack programming resources hub with real-time contest tracking from 50+ platforms via Clist API, community discussion and upvoting, curated personal collections, and admin moderation dashboard.",
      tags: ["TypeScript", "Next.js", "Node.js", "JWT", "Clist API"],
      github: "https://github.com/Sarthakzzzzz/progcorn",
      deepDiveStatus: "Deep dive coming soon"
    },
    {
      title: "RateMyResume",
      year: "2024",
      category: "NLP & Machine Learning",
      description: "AI-powered resume analyzer with position-specific scoring (SWE, Data Scientist, PM), ATS compatibility evaluation, skills gap analysis, and visual analytical dashboards with 8 chart types.",
      tags: ["Python", "Django", "spaCy", "scikit-learn", "NLP"],
      github: "https://github.com/Sarthakzzzzz/RateMyResume",
      deepDiveStatus: "Deep dive coming soon"
    },
    {
      title: "NexMesh",
      year: "2026",
      category: "Federated Learning & Distributed Systems",
      description: "Decentralized federated learning system enabling 3 independent clients to collaboratively train a CNN on MNIST while keeping raw training data local, with FedAvg-based model aggregation and GPU-accelerated distributed training.",
      tags: ["Python", "PyTorch", "NVIDIA FLARE", "Docker", "Kubernetes", "CUDA"],
      github: "https://github.com/Sarthakzzzzz/NexMesh",
      deepDiveStatus: "Deep dive coming soon"
    }
  ],
  education: [
    {
      institution: "Modern Education Society's Wadia College of Engineering, Pune",
      degree: "Bachelor of Engineering",
      major: "Computer Engineering",
      period: "2023 – 2027",
      location: "Pune, India",
      gpa: "8.44 / 10",
      details: [
        "Savitribai Phule Pune University",
        "Technical Team Member, CodeStorm Club (Jun 2025 – Jun 2026)"
      ]
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Python", "C", "C++", "JavaScript", "TypeScript", "HTML/CSS", "SQL"]
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Flask", "NestJS", "RESTful API", "Pydantic", "SQLModel", "SSE", "Socket Programming"]
    },
    {
      category: "AI Agents & ML",
      skills: ["LangChain", "LangGraph", "Google ADK", "Gemini API", "ChromaDB", "Prompt Engineering"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "ChromaDB"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "Docker", "CI/CD", "Render", "LangSmith", "OpenRouter", "Google AI Studio"]
    },
    {
      category: "Core Concepts",
      skills: ["DSA", "OOP", "Artificial Intelligence", "Computer Networks", "Operating Systems", "Distributed Systems"]
    }
  ],
  achievements: [
    {
      title: "Competitive Programming Ratings",
      date: "Ongoing",
      description: "Codeforces Specialist (Max 1408), CodeChef 3★ (Max 1625), LeetCode Rating 1545, ICPC Amritapuri Preliminary Round Rank 1612/2930.",
      link: "https://codeforces.com/profile/sarthakzzzzz"
    },
    {
      title: "2nd Prize — WOWVERSE x MESCOE Hackathon",
      date: "2025",
      description: "Won Second Prize for showcasing ASTRA, an AI-powered vulnerability scanning orchestrator.",
      certificateUrl: "/certificates/hackathon.png"
    },
    {
      title: "Finalist — VELORA Hackathon",
      date: "2025",
      description: "Reached the Finals showcasing an AI-based IoT Device Scanner.",
      certificateUrl: "/certificates/finalist.pdf"
    },
    {
      title: "Semi-Finalist — Google Developer Clubs Build & Grow Hackathon",
      date: "2025",
      description: "Reached the Semi-Finals of the GDC Build & Grow Hackathon, Pune."
    },
    {
      title: "The Complete Python Developer Certification",
      date: "2024",
      description: "Completed certification covering backend development, automation, and machine learning.",
      certificateUrl: "/certificates/udemy.jpg"
    }
  ]
};
