import { motion } from "framer-motion";
import { FiCode, FiServer, FiCloud } from "react-icons/fi";
import TiltCard from "./TiltCard";
import CountUp from "./CountUp";
import profileImg from "../assets/profile.png";
import styles from "./About.module.css";

const HIGHLIGHTS = [
  { icon: <FiCode size={28} />, title: "Frontend", desc: "Building responsive interfaces with React, HTML/CSS/JS, and data visualizations with Power BI & Tableau." },
  { icon: <FiServer size={28} />, title: "Backend", desc: "Designing scalable APIs and microservices with Python, Django, FastAPI, and Java Spring Boot." },
  { icon: <FiCloud size={28} />, title: "DevOps", desc: "Deploying and orchestrating with Docker, Kubernetes, Jenkins, Kestra, and AWS." },
];

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">About Me</p>
        <h2 className="section-title">Passionate about building scalable software</h2>
        <p className="section-subtitle">
          With 1+ year of professional experience, I specialize in building scalable
          backend applications, automation workflows, and AI-driven development.
        </p>
      </motion.div>

      <div className={styles.grid}>
        <motion.div
          className={styles.flipScene}
          initial={{ opacity: 0, rotateY: -18, scale: 0.92 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className={styles.flipCard}>
            <div className={`${styles.flipFace} ${styles.flipFront}`}>
              <div className={styles.flipPhotoWrap}>
                <img
                  src={profileImg}
                  alt="Abhiram Kurambhatti"
                  className={styles.flipPhoto}
                />
              </div>
              <span className={styles.flipName}>Abhiram Kurambhatti</span>
              <span className={styles.flipRole}>Associate Software Developer</span>
              <span className={styles.flipHint}>hover to flip ↻</span>
            </div>
            <div className={`${styles.flipFace} ${styles.flipBack}`}>
              <pre className={styles.terminal}>
{`> whoami
Abhiram Kurambhatti

> cat skills.txt
Python | Django | FastAPI
Kubernetes | Docker | Kestra
Pandas | NumPy | GenAI

> echo $STATUS
Open to full-time & freelance`}
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.bio}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            I'm a software developer from Pune, India, with a B.Tech in Computer
            Science from MIT World Peace University (CGPA: 8.90). I specialize in
            modernizing legacy systems, building microservices, and automating
            data pipelines using Python, FastAPI, and Kubernetes.
          </p>
          <p>
            Currently at Amdocs, I've refactored legacy ETL frameworks into modular
            architectures, built automation ticket processing systems, and created
            Power BI dashboards for operational monitoring. I'm passionate about
            AI-driven development and Vibe Coding with modern AI tools.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}><CountUp value="1+" /></span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}><CountUp value="8.90" /></span>
              <span className={styles.statLabel}>B.Tech CGPA</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}><CountUp value="2" /></span>
              <span className={styles.statLabel}>Companies</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.highlights}>
        {HIGHLIGHTS.map((item, i) => (
          <TiltCard
            key={item.title}
            className={styles.card}
            max={8}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <div className={styles.cardIcon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
