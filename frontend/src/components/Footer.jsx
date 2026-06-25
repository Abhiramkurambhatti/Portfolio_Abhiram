import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.accent}>&lt;</span>
            Abhiram
            <span className={styles.accent}>/&gt;</span>
          </span>
          <p className={styles.tagline}>
            Building digital experiences that matter.
          </p>
        </div>

        <div className={styles.links}>
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>

        <div className={styles.socials}>
          <a href="https://github.com/Abhiramkurambhatti" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/abhiram-kurambhatti-3a3a8b1aa/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:abhiramkurambhatti@gmail.com" aria-label="Email">
            <FiMail size={18} />
          </a>
        </div>

        <div className={styles.copy}>
          <p>
            Made with <FiHeart size={14} className={styles.heart} /> &copy;{" "}
            {new Date().getFullYear()} Abhiram Kurambhatti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
