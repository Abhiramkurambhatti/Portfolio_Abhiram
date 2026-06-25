import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import TiltCard from "./TiltCard";
import styles from "./Projects.module.css";

const FALLBACK = [
  {
    id: 1,
    title: "Legacy ETL Modernization",
    description: "Refactored a legacy ETL framework into a modular architecture using Python, Kestra, and Docker, enabling scalable and maintainable data processing pipelines.",
    tech: ["Python", "Kestra", "Docker", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    github: "https://github.com/Abhiramkurambhatti",
    live: "#",
  },
  {
    id: 2,
    title: "Automation Ticket Processing System",
    description: "Built a microservices-based automation ticket processing system using FastAPI and Python, deployed on Kubernetes for high availability.",
    tech: ["FastAPI", "Python", "Kubernetes", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    github: "https://github.com/Abhiramkurambhatti",
    live: "#",
  },
  {
    id: 3,
    title: "SDLC Best Practices Dashboard",
    description: "Developed backend services for an SDLC Best Practices Dashboard with automated data ingestion pipelines and Power BI visualizations.",
    tech: ["Python", "FastAPI", "Power BI", "Jenkins"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    github: "https://github.com/Abhiramkurambhatti",
    live: "#",
  },
  {
    id: 4,
    title: "Disaster Recovery Reporting Pipeline",
    description: "Automated reporting pipelines for disaster recovery, significantly reducing manual effort and improving visibility with real-time monitoring.",
    tech: ["Python", "Kafka", "AWS EC2", "Redis"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600",
    github: "https://github.com/Abhiramkurambhatti",
    live: "#",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects(FALLBACK));
  }, []);

  return (
    <section id="projects" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Projects</p>
        <h2 className="section-title">Featured Work</h2>
        <p className="section-subtitle">
          A selection of projects I've built — from concept to deployment.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <TiltCard
            key={project.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className={styles.imageWrap}>
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className={styles.overlay}>
                <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FiGithub size={20} />
                </a>
                <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live demo">
                  <FiExternalLink size={20} />
                </a>
              </div>
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.desc}>{project.description}</p>
              <div className={styles.tags}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
