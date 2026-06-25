import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiClock, FiArrowRight } from "react-icons/fi";
import TiltCard from "./TiltCard";
import styles from "./Blog.module.css";

const FALLBACK = [
  {
    id: 1,
    title: "Modernizing Legacy ETL Pipelines with Python & Kestra",
    excerpt: "How I refactored a monolithic ETL framework into a modular, scalable architecture using Python, Kestra, and Docker at Amdocs.",
    date: "2026-03-15",
    tags: ["Python", "ETL", "Kestra", "Docker"],
    read_time: "8 min read",
  },
  {
    id: 2,
    title: "Deploying FastAPI Microservices on Kubernetes",
    excerpt: "A practical guide to building and deploying FastAPI-based microservices on Kubernetes for high availability and scalability.",
    date: "2026-02-20",
    tags: ["FastAPI", "Kubernetes", "Microservices"],
    read_time: "7 min read",
  },
  {
    id: 3,
    title: "Vibe Coding: AI-Driven Development in Practice",
    excerpt: "Exploring how AI tools and prompt engineering are transforming the way we write code and build software faster.",
    date: "2026-01-10",
    tags: ["AI", "GenAI", "Prompt Engineering"],
    read_time: "6 min read",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts(FALLBACK));
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Blog</p>
        <h2 className="section-title">Latest Articles</h2>
        <p className="section-subtitle">
          Thoughts, tutorials, and insights from my development journey.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {posts.map((post, i) => (
          <TiltCard
            key={post.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className={styles.meta}>
              <span className={styles.date}>{formatDate(post.date)}</span>
              <span className={styles.readTime}>
                <FiClock size={14} /> {post.read_time}
              </span>
            </div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.footer}>
              <div className={styles.tags}>
                {post.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <span className={styles.readMore}>
                Read more <FiArrowRight size={14} />
              </span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
