import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";

const FALLBACK = [
  {
    id: 1,
    role: "Associate Software Developer",
    company: "Amdocs",
    period: "Nov 2024 – Present",
    description: "Refactored legacy ETL frameworks into modular architectures. Built automation ticket processing systems with FastAPI on Kubernetes. Developed SDLC dashboards and automated disaster recovery reporting pipelines.",
    tech: ["Python", "FastAPI", "Kubernetes", "Docker", "Kestra", "Power BI"],
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "Syngenta",
    period: "Jan 2024 – Jul 2024",
    description: "Maintained backend services using Java and Spring Boot. Designed RESTful APIs for internal services. Debugged and optimized backend modules for improved stability.",
    tech: ["Java", "Spring Boot", "RESTful APIs", "MySQL"],
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => r.json())
      .then(setExperiences)
      .catch(() => setExperiences(FALLBACK));
  }, []);

  return (
    <section id="experience" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've Worked</h2>
        <p className="section-subtitle">
          My professional journey and the impact I've made along the way.
        </p>
      </motion.div>

      <div className={styles.timeline}>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            className={styles.item}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div className={styles.dot} />
            <div className={styles.card}>
              <span className={styles.period}>{exp.period}</span>
              <h3 className={styles.role}>{exp.role}</h3>
              <p className={styles.company}>{exp.company}</p>
              <p className={styles.desc}>{exp.description}</p>
              <div className={styles.tags}>
                {exp.tech.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
