export const knowledgeBase = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "yo", "namaste", "good morning", "good evening", "good afternoon"],
    answer:
      "Hi there! 👋 I'm Abhiram's virtual assistant. You can ask me about his skills, experience, projects, education, or how to reach him.",
  },
  {
    id: "about",
    keywords: ["about", "who", "yourself", "intro", "introduce", "tell me about", "background", "summary", "describe", "what do you do"],
    answer:
      "Abhiram Kurambhatti is a results-driven Software Developer with 1+ years of experience. He specializes in scalable backend applications, automation workflows, microservices, and AI-driven development (Vibe Coding), with strong expertise in Python (Django, FastAPI).",
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "technology", "technologies", "stack", "language", "languages", "tool", "tools", "framework", "frameworks", "know", "programming", "expertise", "proficient", "good at"],
    answer:
      "Abhiram's core tech stack:\n• Languages: Python, Java, JavaScript\n• Backend: Django, FastAPI, REST APIs, Microservices\n• Databases: PostgreSQL, MongoDB, Redis, MySQL\n• DevOps: Docker, Kubernetes, Jenkins, Kestra, Kafka, AWS (EC2)\n• AI: GenAI, Prompt Engineering, Vibe Coding\n• Data & BI: Pandas, NumPy, Power BI, Tableau",
  },
  {
    id: "experience",
    keywords: ["experience", "work", "job", "company", "amdocs", "syngenta", "career", "employment", "role", "working", "currently", "intern", "internship", "years"],
    answer:
      "Abhiram has 1+ years of professional experience:\n\n🔹 Associate Software Developer @ Amdocs (Nov 2024 – Present)\n   Modernized legacy ETL frameworks, built FastAPI microservices on Kubernetes, created Power BI dashboards, and automated disaster-recovery reporting.\n\n🔹 Software Engineering Intern @ Syngenta (Jan – Jul 2024)\n   Built backend services with Java & Spring Boot and designed RESTful APIs.",
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "build", "made", "created", "work sample", "etl", "dashboard", "automation", "ticket", "pipeline"],
    answer:
      "Some of Abhiram's key projects:\n• Legacy ETL Modernization — Python, Kestra, Docker\n• Automation Ticket Processing System — FastAPI, Kubernetes\n• SDLC Best Practices Dashboard — Python, Power BI\n• Disaster Recovery Reporting Pipeline — Python, Kafka, AWS\n\nCheck the Projects section above for details!",
  },
  {
    id: "education",
    keywords: ["education", "study", "studied", "degree", "college", "university", "school", "b.tech", "btech", "diploma", "cgpa", "graduate", "qualification", "mit", "academic"],
    answer:
      "🎓 Education:\n• B.Tech in Computer Science — MIT World Peace University (2021–2024), CGPA 8.90/10\n• Diploma in Computer Science & Engineering — MIT WPU (2018–2021), CGPA 9.04/10",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "hiring", "connect", "touch", "phone", "number", "call", "linkedin", "github", "social", "resume", "cv", "available", "opportunity", "message", "form"],
    answer:
      "📬 You can reach Abhiram at:\n• Email: abhiramkurambhatti@gmail.com\n• LinkedIn: linkedin.com/in/abhiram-kurambhatti-3a3a8b1aa\n• GitHub: github.com/Abhiramkurambhatti\n\nOr send him a message directly using the form below:",
    link: { href: "#contact", label: "Open the Get In Touch form →" },
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "live", "lives", "place", "pune", "india", "relocate", "located"],
    answer: "📍 Abhiram is based in Pune, India.",
  },
  {
    id: "ai",
    keywords: ["ai", "genai", "vibe", "prompt", "machine learning", "ml", "llm", "artificial intelligence"],
    answer:
      "Abhiram works extensively with AI-driven development — GenAI, Prompt Engineering, and 'Vibe Coding' using various AI tools to build software faster and smarter.",
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thx", "appreciate", "great", "awesome", "cool", "nice", "helpful"],
    answer: "You're welcome! 😊 Is there anything else you'd like to know about Abhiram?",
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "later", "cya", "exit", "quit"],
    answer: "Thanks for chatting! Feel free to reach out via the contact form. Have a great day! 👋",
  },
];

export const fallbackAnswer =
  "I'm not sure about that one 🤔 — but I can tell you about Abhiram's skills, experience, projects, education, or contact details. Try one of the suggestions below!";

export const quickReplies = ["Skills", "Experience", "Projects", "Education", "Contact"];
