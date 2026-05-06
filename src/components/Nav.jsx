import { useState, useEffect } from 'react';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-lg border-b border-accent/10' : 'border-b border-transparent'}`}>

      <a href="#" className="font-display font-black text-xl text-accent">
        S<span className="text-primary">.</span>
      </a>

      <ul className="flex gap-10 list-none">
        {links.map((link, i) => (
          <li key={link.href}>
            <a href={link.href} className="font-mono text-xs text-muted hover:text-accent transition-colors">
              <span className="text-accent">0{i + 1}.</span> {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
