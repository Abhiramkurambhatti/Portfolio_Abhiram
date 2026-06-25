import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import {
  SiPython,
  SiFastapi,
  SiDjango,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import Magnetic from "./Magnetic";
import Typewriter from "./Typewriter";
import styles from "./Hero.module.css";
import profileImg from "../assets/profile.png";

const FLOATING = [
  { Icon: SiPython, label: "Python", className: "badge1" },
  { Icon: SiFastapi, label: "FastAPI", className: "badge2" },
  { Icon: SiDjango, label: "Django", className: "badge3" },
  { Icon: SiDocker, label: "Docker", className: "badge4" },
  { Icon: SiKubernetes, label: "Kubernetes", className: "badge5" },
];

export default function Hero() {
  const ringRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const cfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), cfg);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), cfg);
  const glowX = useTransform(mx, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["35%", "65%"]);

  const handleMove = (e) => {
    const rect = ringRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bgGrid} />
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <div className={styles.split}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={styles.availability}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.statusDot} />
            Available for opportunities · Pune, India
          </motion.div>

          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Abhiram Kurambhatti
          </motion.h1>

          <motion.div
            className={styles.titleWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className={styles.titleStatic}>I'm a </span>
            <Typewriter
              className={styles.titleHighlight}
              words={[
                "Associate Software Developer",
                "Python & FastAPI Engineer",
                "Kubernetes & Microservices Dev",
                "Automation & ETL Builder",
                "AI-Driven Developer",
              ]}
            />
          </motion.div>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Results-driven Software Developer specializing in Python, Django, FastAPI,
            microservices architecture, and AI-driven development. Turning complex
            problems into elegant, automated solutions.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Magnetic>
              <a href="#projects" className={styles.btnPrimary}>
                View My Work
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Abhiram_Kurambhatti_Resume.pdf"
                download
                className={styles.btnOutline}
              >
                <FiDownload size={16} /> Download CV
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={styles.btnGhost}>
                Get In Touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <a href="https://github.com/Abhiramkurambhatti" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/abhiram-kurambhatti-3a3a8b1aa/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:abhiramkurambhatti@gmail.com" aria-label="Email">
              <FiMail size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageScene}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            ref={ringRef}
            className={styles.imageRing}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 1000,
            }}
          >
            <motion.div
              className={styles.imageGlow}
              style={{ "--gx": glowX, "--gy": glowY }}
            />
            <span className={styles.ringBorder} />
            <span className={`${styles.ringBorder} ${styles.ringBorder2}`} />

            <div className={styles.imageWrap} style={{ transform: "translateZ(40px)" }}>
              <img src={profileImg} alt="Abhiram Kurambhatti" className={styles.profileImg} />
            </div>

            {FLOATING.map(({ Icon, label, className }, i) => (
              <motion.div
                key={label}
                className={`${styles.badge} ${styles[className]}`}
                style={{ transform: "translateZ(70px)" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" }}
                title={label}
              >
                <Icon size={22} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FiArrowDown size={20} />
      </motion.a>
    </section>
  );
}
