import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiSend, FiCheck } from "react-icons/fi";
import TiltCard from "./TiltCard";
import styles from "./Contact.module.css";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: `Portfolio Contact: ${form.subject}`,
          message: form.message,
          from_name: "Portfolio Website",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >
        <p className="section-label">Contact</p>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
      </motion.div>

      <div className={styles.grid}>
        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TiltCard className={styles.infoCard} max={6} glare={false}>
            <div className={styles.infoIcon}><FiMail size={22} /></div>
            <div>
              <h4>Email</h4>
              <p>abhiramkurambhatti@gmail.com</p>
            </div>
          </TiltCard>
          <TiltCard className={styles.infoCard} max={6} glare={false}>
            <div className={styles.infoIcon}><FiMapPin size={22} /></div>
            <div>
              <h4>Location</h4>
              <p>Pune, India</p>
            </div>
          </TiltCard>
          <div className={styles.availability}>
            <div className={styles.dot} />
            <span>Open to new opportunities</span>
          </div>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={styles.btn}
            disabled={status === "sending"}
          >
            {status === "sending" && "Sending..."}
            {status === "sent" && <><FiCheck size={18} /> Message Sent!</>}
            {status === "error" && "Failed — try again"}
            {status === "idle" && <><FiSend size={16} /> Send Message</>}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
