import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import TiltCard from "./TiltCard";
import styles from "./Education.module.css";

const EDUCATION = [
  {
    id: 1,
    degree: "Bachelor of Technology (Computer Science)",
    institution: "Dr. Vishwanath Karad MIT World Peace University",
    period: "2021 – 2024",
    grade: "CGPA: 8.90 / 10.00",
  },
  {
    id: 2,
    degree: "Diploma (Computer Science & Engineering)",
    institution: "Dr. Vishwanath Karad MIT World Peace University",
    period: "2018 – 2021",
    grade: "CGPA: 9.04 / 10.00",
  },
];

export default function Education() {
  return (
    <section id="education" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Education</p>
        <h2 className="section-title">Academic Background</h2>
        <p className="section-subtitle">
          My educational foundation in Computer Science.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {EDUCATION.map((edu, i) => (
          <TiltCard
            key={edu.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className={styles.icon}>
              <FiAward size={24} />
            </div>
            <h3 className={styles.degree}>{edu.degree}</h3>
            <p className={styles.institution}>{edu.institution}</p>
            <div className={styles.meta}>
              <span className={styles.period}>{edu.period}</span>
              <span className={styles.grade}>{edu.grade}</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
