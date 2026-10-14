'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

function useScrollReveal(ref: RefObject<HTMLElement | null>, reduced: boolean | null) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (reduced || !element) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    // Observe the unclipped parent: the image's reveal mask would otherwise
    // make IntersectionObserver treat its own hidden starting frame as invisible.
    observer.observe(element.parentElement ?? element);
    return () => observer.disconnect();
  }, [reduced, ref]);
  return visible;
}

/** Reveal each photo once as it enters view without changing its layout or crop. */
type ScrollRevealImageProps = Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'className' | 'loading' | 'style' | 'width' | 'height' | 'decoding' | 'sizes' | 'srcSet' | 'aria-hidden'>;

export function ScrollRevealImage(props: ScrollRevealImageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLImageElement>(null);
  const visible = useScrollReveal(ref, reduced);
  return <motion.img
    ref={ref}
    {...props}
    initial={{ opacity: reduced ? 1 : 0, clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }}
    animate={{ opacity: visible ? 1 : 0, clipPath: visible ? 'inset(0)' : (reduced ? 'inset(0)' : 'inset(0 0 100% 0)') }}
    transition={{
      opacity: { duration: reduced ? 0 : .42, ease: [.23, 1, .32, 1] },
      clipPath: { duration: reduced ? 0 : .72, ease: [.77, 0, .175, 1] },
    }}
  />;
}

/** The hero image moves on load; the hero itself stays still as the page scrolls. */
export function CoastalHero({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <div className="hero-journey">
    <section className="hero">
      <motion.img className="hero-image" src="/images/sea.jpg" alt="Soft waves rolling across the open sea" fetchPriority="high" initial={{ scale: reduced ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: reduced ? 0 : 2.4, ease: [.2, .65, .3, 1] }} />
      <div className="hero-shade" />
      <div className="hero-ui">{children}</div>
    </section>
  </div>;
}

/** Reveal siblings in reading order rather than moving an entire section at once. */
export function CoastalReveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div className="coastal-reveal" initial="rest" whileInView="visible" viewport={{ once: true, amount: .1 }} variants={{ rest: {}, visible: { transition: { staggerChildren: reduced ? 0 : .07 } } }}>{children}</motion.div>;
}

export function DriftItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={{ rest: { opacity: 0, transform: reduced ? 'none' : 'translate3d(0,32px,0)' }, visible: { opacity: 1, transform: 'translate3d(0,0,0)', transition: { duration: reduced ? .15 : .65, ease: [.22, 1, .36, 1] } } }}>{children}</motion.div>;
}

export function OceanInterlude({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const transform = useTransform(scrollYProgress, [0, 1], ['translate3d(0,-7%,0) scale(1.18)', 'translate3d(0,7%,0) scale(1.18)']);
  return <section ref={ref} className="manifesto"><motion.img src="/images/coxs-bazar-beach.jpg" alt="" loading="lazy" style={reduced ? undefined : { transform }} /><div className="manifesto-overlay" />{children}</section>;
}
