import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";
import { knowledgeBase, fallbackAnswer, quickReplies } from "./chatbotData";
import styles from "./ChatBot.module.css";

const WELCOME = {
  from: "bot",
  text: "Hi! 👋 I'm Abhiram's assistant. Ask me about his skills, experience, projects, education, or how to get in touch.",
};

function getAnswer(input) {
  const text = input.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) score += kw.includes(" ") ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore > 0
    ? { text: best.answer, link: best.link }
    : { text: fallbackAnswer };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    const answer = getAnswer(trimmed);
    const delay = 500 + Math.min(trimmed.length * 15, 900);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: answer.text, link: answer.link },
      ]);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLink = (href) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.button
        className={styles.launcher}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiX size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FiMessageSquare size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && <span className={styles.pulse} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div className={styles.header}>
              <div className={styles.avatar}>AK</div>
              <div className={styles.headerInfo}>
                <span className={styles.headerName}>Abhiram's Assistant</span>
                <span className={styles.headerStatus}>
                  <span className={styles.onlineDot} /> Online
                </span>
              </div>
            </div>

            <div className={styles.body} ref={bodyRef}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`${styles.msg} ${m.from === "user" ? styles.user : styles.bot}`}
                >
                  {m.text.split("\n").map((line, j) => (
                    <span key={j} className={styles.line}>{line}</span>
                  ))}
                  {m.link && (
                    <button
                      className={styles.msgLink}
                      onClick={() => handleLink(m.link.href)}
                    >
                      {m.link.label}
                    </button>
                  )}
                </div>
              ))}

              {typing && (
                <div className={`${styles.msg} ${styles.bot} ${styles.typing}`}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              )}
            </div>

            <div className={styles.quickReplies}>
              {quickReplies.map((q) => (
                <button
                  key={q}
                  className={styles.chip}
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <form className={styles.inputRow} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                aria-label="Type your message"
              />
              <button type="submit" className={styles.sendBtn} aria-label="Send">
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
