import styles from "./Preloader.module.scss";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const el = useRef(null);
  const tl = useRef(gsap.timeline());

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .from("#banner > p", {
          duration: 2,
          opacity: 0,
          yPercent: 100,
          stagger: 0.5,
          ease: "power3.easeInOut",
        })
        .from(
          "#line",
          {
            scaleX: 0,
            duration: 3,
            transformOrigin: "left",
            ease: "power3.easeInOut",
          },
          "<"
        )
        .to("#preloader_top", {
          y: -1000,
          duration: 2,
          ease: "power3.out",
        })
        .to(
          "#preloader_bottom",
          {
            y: 1000,
            duration: 2,
            ease: "power3.out",
          },
          "-=2"
        )
        .to(
          "#line",
          {
            scaleX: 0,
            duration: 1,
            transformOrigin: "left",
            ease: "power3.out",
          },
          "<"
        )
        .to(
          "#banner > p",
          {
            duration: 1.5,
            opacity: 0,
            yPercent: 100,
            stagger: 0.1,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          "#banner",
          {
            y: -10000,
          },
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={el} className={styles.preloader}>
        <span id="preloader_top" className={styles.preloader_top}></span>
        <span id="preloader_bottom" className={styles.preloader_bottom}></span>
        <span id="line" className={styles.line}></span>
        <div id="banner" className={styles.banner}>
          <p className={styles.adriane}>Adriane M.</p>
          <p className={styles.fleuriste}>Fleuriste Paris</p>
        </div>
      </div>
      {children}
    </>
  );
}
