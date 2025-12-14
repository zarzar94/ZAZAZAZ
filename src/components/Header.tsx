import { useState } from 'react';
import { clinic } from '../data/clinic';
import { styles, brandPurple, brandCyan } from './styles';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span
        aria-hidden
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${brandPurple}, ${brandCyan})`,
          display: 'grid',
          placeItems: 'center',
          color: '#0b0a10',
          fontWeight: 900,
        }}
      >
        A
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <strong style={{ fontSize: 14, letterSpacing: 0.3 }}>Bérard AIT</strong>
        <span style={{ fontSize: 12, opacity: 0.8 }}>{clinic.nameAr ?? clinic.name}</span>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
        .burger{ display:none; }
        .nav-list{ display:flex; gap:12px; list-style:none; padding:0; margin:0; }
        @media(max-width: 768px){
          .nav-list{ display:none; }
          .nav-list.open{ display:flex; flex-direction:column; position:absolute; right:12px; top:56px; background:#0b0f1c; padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); gap:8px; }
          .burger{ display:inline-flex; }
        }
        `}
      </style>
      <header style={styles.header}>
        {logo}
        <nav>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="burger"
            style={styles.burger}
          >
            ☰
          </button>
          <ul
            className={`nav-list ${menuOpen ? 'open' : ''}`}
            style={styles.navList}
          >
            {[
              { href: '#about', label: 'عن البرنامج' },
              { href: '#pptx', label: 'الشرائح' },
              { href: '#checklist', label: 'قائمة التحقق' },
              { href: '#games', label: 'الألعاب' },
              { href: '#contact', label: 'تواصل' },
            ].map((item) => (
              <li key={item.href}>
                <a href={item.href} style={styles.navLink} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
