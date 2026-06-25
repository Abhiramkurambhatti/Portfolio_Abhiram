import os
import smtplib
import socket
import ssl
from email.message import EmailMessage

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

# ── Email configuration (read from environment / .env) ───────────────────────
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")            # your Gmail address
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")    # Gmail App Password (16 chars)
CONTACT_RECIPIENT = os.getenv("CONTACT_RECIPIENT", "abhiramkurambhatti@gmail.com")

app = FastAPI(title="Portfolio API")

# Comma-separated list of allowed origins. In production set ALLOWED_ORIGINS
# to your deployed frontend URL, e.g. "https://abhiram.dev".
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    if o.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Models ──────────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class Project(BaseModel):
    id: int
    title: str
    description: str
    tech: list[str]
    image: str
    github: str
    live: str


class Experience(BaseModel):
    id: int
    role: str
    company: str
    period: str
    description: str
    tech: list[str]


class BlogPost(BaseModel):
    id: int
    title: str
    excerpt: str
    content: str
    date: str
    tags: list[str]
    read_time: str


# ── Sample Data ─────────────────────────────────────────────────────────────

PROJECTS: list[Project] = [
    Project(
        id=1,
        title="Legacy ETL Modernization",
        description="Refactored a legacy ETL framework into a modular architecture using Python, Kestra, and Docker, enabling scalable and maintainable data processing pipelines.",
        tech=["Python", "Kestra", "Docker", "PostgreSQL"],
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        github="https://github.com/Abhiramkurambhatti",
        live="#",
    ),
    Project(
        id=2,
        title="Automation Ticket Processing System",
        description="Built a microservices-based automation ticket processing system using FastAPI and Python, deployed on Kubernetes for high availability and scalability.",
        tech=["FastAPI", "Python", "Kubernetes", "Docker"],
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        github="https://github.com/Abhiramkurambhatti",
        live="#",
    ),
    Project(
        id=3,
        title="SDLC Best Practices Dashboard",
        description="Developed backend services for an SDLC Best Practices Dashboard with automated data ingestion pipelines and Power BI visualizations for operational metrics.",
        tech=["Python", "FastAPI", "Power BI", "Jenkins"],
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        github="https://github.com/Abhiramkurambhatti",
        live="#",
    ),
    Project(
        id=4,
        title="Disaster Recovery Reporting Pipeline",
        description="Automated reporting pipelines for disaster recovery, significantly reducing manual effort and improving visibility across systems with real-time monitoring.",
        tech=["Python", "Kafka", "AWS EC2", "Redis"],
        image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600",
        github="https://github.com/Abhiramkurambhatti",
        live="#",
    ),
]

EXPERIENCES: list[Experience] = [
    Experience(
        id=1,
        role="Associate Software Developer",
        company="Amdocs",
        period="Nov 2024 – Present",
        description="Refactored legacy ETL frameworks into modular architectures using Python, Kestra, and Docker. Built automation ticket processing systems with FastAPI deployed on Kubernetes. Developed SDLC Best Practices Dashboard backend and automated data ingestion pipelines. Created Power BI dashboards for operational monitoring and automated disaster recovery reporting pipelines.",
        tech=["Python", "FastAPI", "Kubernetes", "Docker", "Kestra", "Power BI"],
    ),
    Experience(
        id=2,
        role="Software Engineering Intern",
        company="Syngenta",
        period="Jan 2024 – Jul 2024",
        description="Maintained backend services using Java and Spring Boot for enterprise-grade applications. Designed and implemented RESTful APIs for internal services and system-wide integrations. Debugged and optimized backend modules, resulting in improvements in application stability.",
        tech=["Java", "Spring Boot", "RESTful APIs", "MySQL"],
    ),
]

BLOG_POSTS: list[BlogPost] = [
    BlogPost(
        id=1,
        title="Modernizing Legacy ETL Pipelines with Python & Kestra",
        excerpt="How I refactored a monolithic ETL framework into a modular, scalable architecture using Python, Kestra, and Docker at Amdocs.",
        content="Full article content goes here...",
        date="2026-03-15",
        tags=["Python", "ETL", "Kestra", "Docker"],
        read_time="8 min read",
    ),
    BlogPost(
        id=2,
        title="Deploying FastAPI Microservices on Kubernetes",
        excerpt="A practical guide to building and deploying FastAPI-based microservices on Kubernetes for high availability and scalability.",
        content="Full article content goes here...",
        date="2026-02-20",
        tags=["FastAPI", "Kubernetes", "Microservices"],
        read_time="7 min read",
    ),
    BlogPost(
        id=3,
        title="Vibe Coding: AI-Driven Development in Practice",
        excerpt="Exploring how AI tools and prompt engineering are transforming the way we write code and build software faster.",
        content="Full article content goes here...",
        date="2026-01-10",
        tags=["AI", "GenAI", "Prompt Engineering"],
        read_time="6 min read",
    ),
]

messages_store: list[dict] = []


# ── Routes ──────────────────────────────────────────────────────────────────

@app.get("/api/projects", response_model=list[Project])
async def get_projects():
    return PROJECTS


@app.get("/api/experience", response_model=list[Experience])
async def get_experience():
    return EXPERIENCES


@app.get("/api/blog", response_model=list[BlogPost])
async def get_blog_posts():
    return BLOG_POSTS


@app.get("/api/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: int):
    for post in BLOG_POSTS:
        if post.id == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")


def send_contact_email(msg: ContactMessage) -> None:
    """Send the contact-form submission to CONTACT_RECIPIENT via SMTP.

    Raises if SMTP is not configured or sending fails, so the caller can
    surface an accurate status to the user.
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        raise RuntimeError(
            "Email is not configured. Set SMTP_USER and SMTP_PASSWORD "
            "environment variables (see .env.example)."
        )

    email = EmailMessage()
    email["Subject"] = f"Portfolio Contact: {msg.subject}"
    email["From"] = SMTP_USER
    email["To"] = CONTACT_RECIPIENT
    email["Reply-To"] = msg.email
    email.set_content(
        f"You received a new message from your portfolio contact form.\n\n"
        f"Name:    {msg.name}\n"
        f"Email:   {msg.email}\n"
        f"Subject: {msg.subject}\n\n"
        f"Message:\n{msg.message}\n"
    )

    context = ssl.create_default_context()

    # WSL2 / IPv6-disabled fix: force IPv4 DNS resolution to avoid
    # "OSError: [Errno 97] Address family not supported by protocol".
    original_getaddrinfo = socket.getaddrinfo

    def ipv4_only_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
        return original_getaddrinfo(host, port, socket.AF_INET, type, proto, flags)

    socket.getaddrinfo = ipv4_only_getaddrinfo
    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
            server.starttls(context=context)
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(email)
    finally:
        socket.getaddrinfo = original_getaddrinfo


@app.post("/api/contact")
async def submit_contact(msg: ContactMessage):
    messages_store.append(msg.model_dump())
    try:
        send_contact_email(msg)
    except Exception as exc:  # noqa: BLE001 - report any send failure to client
        import traceback

        print("\n[CONTACT EMAIL ERROR] -------------------------------------")
        print(f"SMTP_USER set: {bool(SMTP_USER)} | SMTP_PASSWORD set: {bool(SMTP_PASSWORD)}")
        print(f"Error: {type(exc).__name__}: {exc}")
        traceback.print_exc()
        print("-----------------------------------------------------------\n")
        return {
            "status": "error",
            "message": "Your message was saved, but the email could not be sent.",
            "detail": str(exc),
        }
    return {"status": "success", "message": "Thank you! Your message has been received."}


@app.get("/api/skills")
async def get_skills():
    return {
        "categories": [
            {
                "name": "Languages & Frontend",
                "skills": [
                    {"name": "Python", "level": 92},
                    {"name": "Java", "level": 75},
                    {"name": "React", "level": 78},
                    {"name": "HTML/CSS/JS", "level": 85},
                    {"name": "Power BI / Tableau", "level": 80},
                ],
            },
            {
                "name": "Backend & Databases",
                "skills": [
                    {"name": "Django", "level": 88},
                    {"name": "FastAPI", "level": 90},
                    {"name": "PostgreSQL", "level": 85},
                    {"name": "MongoDB", "level": 78},
                    {"name": "Redis", "level": 75},
                ],
            },
            {
                "name": "DevOps & Tools",
                "skills": [
                    {"name": "Docker", "level": 85},
                    {"name": "Kubernetes", "level": 80},
                    {"name": "AWS (EC2)", "level": 78},
                    {"name": "Jenkins / CI/CD", "level": 82},
                    {"name": "Kafka / Kestra", "level": 78},
                ],
            },
            {
                "name": "AI & Advanced",
                "skills": [
                    {"name": "GenAI / Prompt Engineering", "level": 85},
                    {"name": "Vibe Coding", "level": 88},
                    {"name": "Pandas / NumPy", "level": 80},
                    {"name": "System Design", "level": 78},
                    {"name": "Git / JIRA", "level": 90},
                ],
            },
        ]
    }


if __name__ == "__main__":
    import uvicorn

    # Pass the app as an import string so reload works correctly.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
