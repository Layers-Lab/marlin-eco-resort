'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { media } from '@/lib/media';

const email = 'marlinecoresort@gmail.com';
const emailHref = `mailto:${email}?subject=Marlin%20stay%20inquiry`;
const phone = '01000000000';
const mapsLocation = 'https://maps.app.goo.gl/CobZPUt5Fkqp8pkd8';
const instagram = 'https://www.instagram.com/marlinecoresort.bd/';
const navigation = [['Place', 'place'], ['Stay', 'stay'], ['The day', 'day'], ['From Marlin', 'from-marlin'], ['Find us', 'contact']] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map(([label, id]) => <a key={id} href={`#${id}`} onClick={onNavigate}>{label}</a>);
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a className="brand-link" href="#top" aria-label="Marlin Eco Resort, back to top">
    <picture>
      <source media="(max-width: 760px)" srcSet={inverse ? '/brand/field-guide-logo-stacked-cream.svg' : '/brand/field-guide-logo-stacked-navy.svg'} />
      <img src={inverse ? '/brand/field-guide-logo-cream.svg' : '/brand/field-guide-logo-navy.svg'} alt="Marlin Eco Resort" />
    </picture>
  </a>;
}

function TideLine({ className = '' }: { className?: string }) {
  return <svg className={`tide-line ${className}`} viewBox="0 0 1200 38" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <path d="M0 19h260c58 0 64-11 113-11s65 21 124 21 69-20 128-20 68 15 125 15 70-11 120-11h330" stroke="currentColor" strokeWidth="1" />
  </svg>;
}

function ShellStudy() {
  return <svg className="shell-study" viewBox="0 0 150 150" fill="none" aria-hidden="true">
    <path d="M75 124c-6-13-25-20-42-26C19 93 14 79 22 66c7-12 19-12 31-6-8-17-4-31 8-36 10-4 18 3 22 16 5-16 14-22 26-17 13 6 14 20 7 36 12-6 25-5 31 8 7 14-2 27-20 32-23 7-40 13-52 25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M75 123 28 68m47 55L54 59m21 64 8-82m-8 82 41-64m-41 64 61-52M64 129h24" stroke="currentColor" strokeWidth="1" />
  </svg>;
}

function PalmFrond() {
  return <svg className="palm-frond" viewBox="0 0 220 260" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M39 244C65 181 102 105 181 22" strokeWidth="1.6" />
      <path d="M63 191C34 169 26 140 29 111c24 15 37 37 40 67M76 166C53 137 53 104 61 79c21 21 28 46 25 69M91 140C76 110 81 78 95 53c14 23 17 47 9 67M111 111c-7-31 3-58 22-79 7 25 5 44-7 61M135 79c1-27 18-48 39-60-1 20-9 36-23 48M67 184c34 6 66-4 91-26-31-7-60 1-79 12M82 155c36 1 68-17 86-40-30-2-56 10-74 23M99 128c34-3 66-26 80-51-31 2-54 18-67 33M120 100c32-8 56-30 65-55-27 8-46 24-55 42M145 69c25-10 43-30 47-51-21 9-34 23-40 39" strokeWidth="1.2" />
    </g>
  </svg>;
}

function ShellStamp() {
  return <svg className="shell-stamp" viewBox="0 0 160 160" fill="none" aria-hidden="true">
    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
    <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth=".8" />
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M80 111C70 103 43 94 42 74c-1-13 10-18 20-12-3-14 4-24 13-22 5 1 7 7 8 14 5-13 14-17 22-11 8 6 7 16 1 26 13-5 23 3 20 14-4 14-26 20-46 28Z" strokeWidth="1.4" />
      <path d="m80 110-31-38m31 38L63 62m17 48-4-61m4 61 22-59m-22 59 35-33m-43 40h17" strokeWidth="1" />
    </g>
  </svg>;
}

export default function Resort() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group]')];
    const ambientItems = [...document.querySelectorAll<HTMLElement>('[data-ambient]')];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.setAttribute('data-reveal-state', 'visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-reveal-state', 'visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    for (const item of items) {
      if (motionPreference.matches || item.getBoundingClientRect().top < window.innerHeight) item.setAttribute('data-reveal-state', 'visible');
      else { item.setAttribute('data-reveal-state', 'pending'); observer.observe(item); }
    }
    const visibleAmbientItems = new Set<Element>();
    const syncAmbient = () => {
      for (const item of ambientItems) item.setAttribute('data-ambient-active', String(!document.hidden && !motionPreference.matches && visibleAmbientItems.has(item)));
      if (motionPreference.matches) items.forEach(item => item.setAttribute('data-reveal-state', 'visible'));
    };
    const ambientObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleAmbientItems.add(entry.target);
        else visibleAmbientItems.delete(entry.target);
      }
      syncAmbient();
    }, { threshold: 0.05 });
    ambientItems.forEach(item => ambientObserver.observe(item));
    document.addEventListener('visibilitychange', syncAmbient);
    motionPreference.addEventListener('change', syncAmbient);
    return () => {
      observer.disconnect();
      ambientObserver.disconnect();
      document.removeEventListener('visibilitychange', syncAmbient);
      motionPreference.removeEventListener('change', syncAmbient);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <div className="site-shell" id="top">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header page-frame">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation"><NavLinks /></nav>
      <a className="header-inquiry" href={emailHref}>Inquire <ArrowUpRight size={16} aria-hidden="true" /></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      <nav id="mobile-navigation" className={menuOpen ? 'mobile-nav is-open' : 'mobile-nav'} aria-label="Mobile navigation" inert={!menuOpen}><NavLinks onNavigate={() => setMenuOpen(false)} /></nav>
    </header>

    <main id="main-content">
      <section className="hero page-frame" aria-labelledby="hero-title">
        <div className="hero-scene" data-ambient>
          <div className="photo-window"><Image src={media.hero.src} alt={media.hero.alt} width={media.hero.width} height={media.hero.height} sizes="(max-width: 760px) 100vw, 88vw" priority /></div>
          <div className="hero-scene-content">
            <p className="eyebrow hero-kicker"><span>MARLIN ECO RESORT</span><span className="rule" />HIMCHORI, COX’S BAZAR</p>
            <div className="hero-heading-main">
              <h1 id="hero-title">Come to Himchori.<br /><em>Stay a little longer.</em></h1>
              <a className="text-link hero-explore" href="#stay">Explore the stay <ArrowDownRight size={17} aria-hidden="true" /></a>
            </div>
            <TideLine className="hero-tide" />
          </div>
        </div>
        <p className="hero-image-note"><span>THE BAY OF BENGAL COAST</span><span>ILLUSTRATIVE IMAGE</span></p>
        <div className="hero-bottom">
          <p>A small collection of timber cottages on Marine Drive, with the Bay of Bengal close enough to shape the day.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={emailHref}>Inquire about a stay <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="text-link" href="#place">Explore the place <ArrowDownRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="place section-pad" id="place" aria-labelledby="place-title">
        <div className="page-frame place-grid">
          <div className="place-copy" data-reveal data-ambient>
            <p className="eyebrow section-label">THE PLACE <span className="rule" /></p>
            <h2 id="place-title">Himchori,<br /><em>on Marine Drive.</em></h2>
            <p>Find Marlin along the Cox’s Bazar coast, near the shoreline and away from the pace of town. Come for the sea; leave room for the rest of the day.</p>
            <div className="place-location"><span>FIND US</span><p>Himchori Marine Drive<br />Cox’s Bazar, Bangladesh</p><a className="text-link" href={mapsLocation} target="_blank" rel="noopener noreferrer">Open Marlin on Google Maps <ArrowUpRight size={16} aria-hidden="true" /></a></div>
            <div className="place-botanical ambient-ornament"><PalmFrond /></div>
          </div>
          <figure className="place-image" data-reveal data-ambient>
            <div className="photo-window"><Image src={media.place.src} alt={media.place.alt} width={media.place.width} height={media.place.height} sizes="(max-width: 760px) 90vw, 43vw" loading="lazy" /></div>
            <figcaption><span>COASTAL PATH</span><span>ILLUSTRATIVE IMAGE</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="stay section-pad" id="stay" aria-labelledby="stay-title">
        <div className="page-frame stay-grid">
          <div className="stay-head" data-reveal data-ambient>
            <p className="eyebrow section-label">THE STAY <span className="rule" /></p>
            <h2 id="stay-title">Stay in a timber<br /><em>A-frame cottage.</em></h2>
            <p>Each cottage has a private veranda and a view towards the sea. Natural materials and an easy, quiet setting make it a place to settle in.</p>
            <a className="button button-light" href={emailHref}>Ask about a stay <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <figure className="stay-main-image" data-reveal data-ambient>
            <span className="concept-badge">ILLUSTRATIVE COTTAGE CONCEPT</span>
            <div className="photo-window"><Image src={media.cottage.src} alt={media.cottage.alt} width={media.cottage.width} height={media.cottage.height} sizes="(max-width: 760px) 90vw, 45vw" loading="lazy" /></div>
            <figcaption><span>A-FRAME COTTAGE</span><span>CONCEPT IMAGE</span></figcaption>
          </figure>
          <figure className="stay-detail-image" data-reveal>
            <div className="stay-stamp ambient-ornament" data-ambient><ShellStamp /></div>
            <span className="concept-badge">ILLUSTRATIVE CONCEPT</span>
            <div className="photo-window"><Image src={media.veranda.src} alt={media.veranda.alt} width={media.veranda.width} height={media.veranda.height} sizes="(max-width: 760px) 60vw, 27vw" loading="lazy" /></div>
            <figcaption><span>PRIVATE VERANDA</span><span>CONCEPT IMAGE</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="day section-pad page-frame" id="day" aria-labelledby="day-title">
        <div className="day-heading" data-reveal data-ambient><div><p className="eyebrow section-label">THE DAY <span className="rule" /></p><h2 id="day-title">A day with<br /><em>the coast.</em></h2></div><p>Little moments take the lead here. Follow the light, the shore, and the space between.</p></div>
        <div className="day-grid">
          <article className="day-morning">
            <figure data-reveal data-ambient><div className="photo-window"><Image src={media.morning.src} alt={media.morning.alt} width={media.morning.width} height={media.morning.height} sizes="(max-width: 760px) 90vw, 55vw" loading="lazy" /></div></figure>
            <div className="day-caption"><span>MORNING<br />ILLUSTRATIVE IMAGE</span><p>Walk the shore while the beach is still quiet.</p></div>
          </article>
          <article className="day-table">
            <figure data-reveal><div className="photo-window"><Image src={media.table.src} alt={media.table.alt} width={media.table.width} height={media.table.height} sizes="(max-width: 760px) 90vw, 33vw" loading="lazy" /></div></figure>
            <div className="day-caption"><span>AT THE TABLE<br />CONCEPT IMAGE</span><p>Local seafood and seasonal Bangladeshi cooking, served without ceremony.</p></div>
          </article>
          <div className="day-evening" data-ambient><span>EVENING</span><p>Take the last light from your veranda.</p><ShellStudy /></div>
          <p className="day-material-note"><span>SMALL DECISIONS</span> Refillable drinking water and fewer single-use plastics are part of how we work.</p>
        </div>
      </section>

      <section className="from-marlin section-pad" id="from-marlin" aria-labelledby="from-marlin-title">
        <div className="page-frame">
          <div className="postcards-heading" data-reveal data-ambient><div><p className="eyebrow section-label">FROM MARLIN <span className="rule" /></p><h2 id="from-marlin-title">From Marlin,<br /><em>in four frames.</em></h2><p>A few moments shared by the Marlin team.</p></div><a className="text-link" href={instagram} target="_blank" rel="noopener noreferrer">See Marlin on Instagram <ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <div className="postcards-tide ambient-ornament" data-ambient><TideLine /></div>
          <p className="swipe-note">SWIPE TO SEE MORE <ArrowUpRight size={13} aria-hidden="true" /></p>
          <div className="postcards-grid" data-reveal-group>
            {media.postcards.map((post, index) => <a className={`postcard postcard-${index + 1}`} key={post.src} href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${post.alt}; opens Marlin’s Instagram profile`}>
              <Image src={post.src} alt={post.alt} width={post.width} height={post.height} sizes="(max-width: 700px) 78vw, (max-width: 1100px) 43vw, 29vw" loading="lazy" />
              <span className="postcard-caption"><span>{post.caption}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
            </a>)}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
        <div className="page-frame contact-grid">
          <div data-reveal data-ambient><p className="eyebrow section-label">INQUIRIES & LOCATION <span className="rule" /></p><h2 id="contact-title">Ask us<br /><em>about staying.</em></h2><p className="contact-intro">Tell us the dates you have in mind or what you’d like to know.</p><TideLine className="contact-tide" /></div>
          <div className="contact-details">
            <div><span>WRITE TO US</span><a className="contact-large" href={emailHref}>{email} <ArrowUpRight size={24} aria-hidden="true" /></a></div>
            <div><span>CALL US</span><a className="contact-large" href={`tel:${phone}`}>{phone} <ArrowUpRight size={24} aria-hidden="true" /></a></div>
            <div><span>FIND US</span><address>Himchori Marine Drive<br />Cox’s Bazar, Bangladesh</address><a className="text-link" href={mapsLocation} target="_blank" rel="noopener noreferrer">Open Marlin on Google Maps <ArrowUpRight size={17} aria-hidden="true" /></a></div>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer" data-ambient>
      <div className="page-frame footer-tide ambient-ornament"><TideLine /></div>
      <div className="page-frame footer-grid"><Brand inverse /><p>Himchori Marine Drive<br />Cox’s Bazar, Bangladesh</p><div><a href={emailHref}>Email Marlin</a><a href={`tel:${phone}`}>Call Marlin</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><a className="back-to-top" href="#top">Back to top ↑</a></div>
      <div className="page-frame footer-bottom"><span>© {new Date().getFullYear()} Marlin Eco Resort</span><a href="https://layerslabbd.com" target="_blank" rel="noopener noreferrer">Developed by Layers Lab</a></div>
    </footer>
  </div>;
}
