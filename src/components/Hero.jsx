import { useState, useEffect } from 'react';

const roles = [
  'Frontend Developer',
  'React Enthusiast',
  'UI Craftsman',
  'Web Performance Nerd',
];

export default function Hero() {
  const [roleIdx, setRoleIdx]       = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let t;
    if (!isDeleting && displayed === current) {
      t = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setRoleIdx(p => (p + 1) % roles.length);
    } else {
      const next = isDeleting
        ? current.slice(0, displayed.length - 1)
        : current.slice(0, displayed.length + 1);
      t = setTimeout(() => setDisplayed(next), isDeleting ? 45 : 95);
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-16 overflow-hidden">

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,255,218,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,255,218,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/4 left-2/3 w-[500px] h-[500px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl">
        <p className="font-mono text-accent text-sm mb-6">Hi, my name is</p>

        <h1 className="font-display font-black text-primary leading-none tracking-tight mb-2"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}>
          Samuel.
        </h1>

        <h2 className="font-display font-bold text-muted leading-none tracking-tight mb-8"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 4rem)', minHeight: '1.3em' }}>
          I'm a{' '}
          <span className="text-accent">
            {displayed}
            <span className="inline-block w-[3px] h-[0.8em] bg-accent ml-[2px] align-middle animate-[blink_1s_step-end_infinite]" />
          </span>
        </h2>

        <p className="font-body text-muted text-lg leading-relaxed max-w-md mb-12">
          I build fast, accessible, and pixel-perfect web experiences.
          Focused on creating human-centered products that live on the internet.
        </p>

        <div className="flex gap-5 flex-wrap">
          <a
            href="#projects"
            className="font-mono text-sm text-accent border border-accent px-8 py-4 rounded hover:bg-accent/10 transition-colors"
          >
            View My Work →
          </a>
          <a
            href="#contact"
            className="font-mono text-sm text-muted px-6 py-4 hover:text-accent transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
