import { useEffect, useRef } from "react";
import styles from "./Background3D.module.css";

const PARTICLE_COUNT = 90;
const CONNECT_DIST = 130;
const FOCAL = 320;

export default function Background3D() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particles = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: (Math.random() - 0.5) * width,
          y: (Math.random() - 0.5) * height,
          z: Math.random() * 600 + 60,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          vz: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    const project = (p) => {
      const scale = FOCAL / (FOCAL + p.z);
      const parX = mouse.current.active ? mouse.current.x * 0.04 * (1 - scale) * 600 : 0;
      const parY = mouse.current.active ? mouse.current.y * 0.04 * (1 - scale) * 600 : 0;
      return {
        x: width / 2 + (p.x + parX) * scale,
        y: height / 2 + (p.y + parY) * scale,
        scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.x < -width / 2 || p.x > width / 2) p.vx *= -1;
        if (p.y < -height / 2 || p.y > height / 2) p.vy *= -1;
        if (p.z < 60 || p.z > 660) p.vz *= -1;
      }

      const projected = particles.map(project);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.5 * Math.min(a.scale, b.scale);
            ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
            ctx.lineWidth = Math.min(a.scale, b.scale);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const pt of projected) {
        const r = pt.scale * 2.2;
        const alpha = pt.scale * 0.9;
        ctx.beginPath();
        ctx.fillStyle = `rgba(150, 140, 255, ${alpha})`;
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current.active = true;
    };

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.meshGradient} />
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={`${styles.cube} ${styles.cubeA}`}>
        <span className={styles.face} style={{ transform: "rotateY(0deg) translateZ(35px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(90deg) translateZ(35px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(180deg) translateZ(35px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(270deg) translateZ(35px)" }} />
        <span className={styles.face} style={{ transform: "rotateX(90deg) translateZ(35px)" }} />
        <span className={styles.face} style={{ transform: "rotateX(-90deg) translateZ(35px)" }} />
      </div>

      <div className={`${styles.cube} ${styles.cubeB}`}>
        <span className={styles.face} style={{ transform: "rotateY(0deg) translateZ(25px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(90deg) translateZ(25px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(180deg) translateZ(25px)" }} />
        <span className={styles.face} style={{ transform: "rotateY(270deg) translateZ(25px)" }} />
        <span className={styles.face} style={{ transform: "rotateX(90deg) translateZ(25px)" }} />
        <span className={styles.face} style={{ transform: "rotateX(-90deg) translateZ(25px)" }} />
      </div>

      <div className={`${styles.ring3d} ${styles.ringA}`} />
      <div className={`${styles.ring3d} ${styles.ringB}`} />
    </div>
  );
}
