import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { siteConfig, navigationConfig } from '../config';

interface NavigationProps {
  onMenuOpen: () => void;
}

export default function Navigation({ onMenuOpen }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const img = logo.querySelector('img');
    if (!img) return;

    const handleMouseEnter = () => {
      gsap.to(img, {
        rotationY: 18,
        duration: 0.4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
        transformPerspective: 300,
      });
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    return () => logo.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!siteConfig.brandName && !navigationConfig.menuLabel) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-6"
      style={{
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        mixBlendMode: scrolled ? 'difference' : 'normal',
        transition: 'mix-blend-mode 0.5s ease',
      }}
    >
      <a
        ref={logoRef}
        href="#"
        onClick={scrollToTop}
        className="no-underline"
        aria-label={siteConfig.brandName}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <img
          src="images/vael-logo.png"
          alt={siteConfig.brandName}
          style={{
            height: '34px',
            width: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.45))',
          }}
        />
      </a>

      {navigationConfig.menuLabel && (
        <button
          onClick={onMenuOpen}
          className="cursor-pointer bg-transparent"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#f0ede4',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '20px',
            padding: '8px 20px',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#c6a75e';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
          }}
        >
          {navigationConfig.menuLabel}
        </button>
      )}
    </nav>
  );
}
