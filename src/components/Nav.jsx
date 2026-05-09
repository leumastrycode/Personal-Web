import { useState, useEffect } from 'react';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false);
  const [dark,       setDark]       = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

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

  // Tutup menu kalau resize ke desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDark(isDark);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-16 py-5 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-mint/10'
          : 'border-b border-transparent'}`}
      >
        {/* Logo */}
        <a href="#" className="font-display font-black text-xl text-mint">
          S<span className="text-gray-800 dark:text-slate-300">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex gap-10 list-none">
          {links.map((link, i) => (
            <li key={link.href}>
              <a href={link.href} className="font-mono text-xs text-gray-500 dark:text-slate-400 hover:text-mint transition-colors">
                <span className="text-mint">0{i + 1}.</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Kanan: theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-lg hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {dark ? '🌙' : '☀️'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-slate-400 rounded transition-all duration-300 origin-center
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-slate-400 rounded transition-all duration-300
              ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-slate-400 rounded transition-all duration-300 origin-center
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 sm:hidden transition-all duration-300
        ${menuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
            ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Drawer dari kanan */}
        <div className={`absolute top-0 right-0 h-full w-64 bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-mint/10
          flex flex-col pt-24 pb-10 px-8 gap-2 transition-transform duration-300 ease-in-out shadow-2xl
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-mono text-sm text-gray-500 dark:text-slate-400 hover:text-mint transition-colors py-3 border-b border-gray-100 dark:border-zinc-800 last:border-0"
            >
              <span className="text-mint mr-2">0{i + 1}.</span>{link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}