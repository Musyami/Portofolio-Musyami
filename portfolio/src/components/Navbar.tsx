'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  path: string;
  label: string;
  suit: string;
  isRed: boolean;
  sectionId?: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Home', suit: '♠', isRed: false },
  { path: '/profile', label: 'Profil', suit: '♥', isRed: true },
  { path: '/experience', label: 'Experience', suit: '♦', isRed: true },
  { path: '/skills', label: 'Skills', suit: '♣', isRed: false },
  { path: '/projects', label: 'Projects', suit: '♠', isRed: false },
  { path: '/achievement', label: 'Achievement', suit: '♥', isRed: true },
  { path: '/blog', label: 'Blog', suit: '♣', isRed: false },
  { path: '/#contact', label: 'Contact', suit: '♠', isRed: false, sectionId: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav id="nav" className={isScrolled ? 'scr' : ''}>
      <Link href="/" className="lo">
        <b>A♠</b>
        <span>Musyami</span>
      </Link>

      <div id="nv">
        {NAV_ITEMS.map((item) => {
          let isActive = false;
          if (item.sectionId) {
            isActive = false;
          } else if (item.path === '/') {
            isActive = pathname === '/';
          } else {
            isActive = pathname.startsWith(item.path);
          }

          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={item.sectionId ? handleContactClick : undefined}
            >
              <button
                type="button"
                className={isActive ? 'on' : ''}
              >
                <i className={item.isRed ? 'rd' : ''}>{item.suit}</i>
                {item.label}
              </button>
            </Link>
          );
        })}
      </div>

      <i id="nbar" style={{ width: `${scrollProgress}%` }} />
    </nav>
  );
}
