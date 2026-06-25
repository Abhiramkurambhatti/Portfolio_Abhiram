import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import styles from "./Skills.module.css";

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => setSkills(data.categories || []))
      .catch(() => {
        setSkills([
          {
            name: "Languages & Frontend",
            skills: [
              { name: "Python", level: 92 },
              { name: "Java", level: 75 },
              { name: "React", level: 78 },
              { name: "HTML/CSS/JS", level: 85 },
              { name: "Power BI / Tableau", level: 80 },
            ],
          },
          {
            name: "Backend & Databases",
            skills: [
              { name: "Django", level: 88 },
              { name: "FastAPI", level: 90 },
              { name: "PostgreSQL", level: 85 },
              { name: "MongoDB", level: 78 },
              { name: "Redis", level: 75 },
            ],
          },
          {
            name: "DevOps & Tools",
            skills: [
              { name: "Docker", level: 85 },
              { name: "Kubernetes", level: 80 },
              { name: "AWS (EC2)", level: 78 },
              { name: "Jenkins / CI/CD", level: 82 },
              { name: "Kafka / Kestra", level: 78 },
            ],
          },
          {
            name: "AI & Advanced",
            skills: [
              { name: "GenAI / Prompt Engineering", level: 85 },
              { name: "Vibe Coding", level: 88 },
              { name: "Pandas / NumPy", level: 80 },
              { name: "System Design", level: 78 },
              { name: "Git / JIRA", level: 90 },
            ],
          },
        ]);
      });
  }, []);

  return (
    <section id="skills" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Skills</p>
        <h2 className="section-title">My Tech Stack</h2>
        <p className="section-subtitle">
          Technologies and tools I use to bring products to life.
        </p>
      </motion.div>

      <div className={styles.categories}>
        {skills.map((cat, ci) => (
          <TiltCard
            key={cat.name}
            className={styles.category}
            max={7}
            glare={false}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.15 }}
          >
            <h3 className={styles.catName}>{cat.name}</h3>
            <div className={styles.skillList}>
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  className={styles.skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: ci * 0.15 + si * 0.08 }}
                >
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                  <div className={styles.barTrack}>
                    <motion.div
                      className={styles.barFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: ci * 0.15 + si * 0.08, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
