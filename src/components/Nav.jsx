import { useState, useEffect } from 'react';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDark(isDark);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-300
      ${scrolled
        ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-mint/10'
        : 'border-b border-transparent'}`}
    >
      <a href="#" className="font-display font-black text-xl text-mint">
        S<span className="text-gray-800 dark:text-slate-300">.</span>
      </a>

      <ul className="flex gap-10 list-none">
        {links.map((link, i) => (
          <li key={link.href}>
            <a href={link.href} className="font-mono text-xs text-gray-500 dark:text-slate-400 hover:text-mint transition-colors">
              <span className="text-mint">0{i + 1}.</span> {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-lg hover:scale-110 transition-transform" aria-label="Toggle theme">
          {dark ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}