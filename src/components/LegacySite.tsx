
import React, { useEffect } from 'react';
import { LEGACY_BODY_HTML } from '../content/legacyBody';

function loadLegacyScriptOnce() {
  const existing = document.getElementById('legacy-v5-script');
  if (existing) return;

  const s = document.createElement('script');
  s.id = 'legacy-v5-script';
  // BASE_URL respects Vite base (GitHub Pages subpath)
  const base = (import.meta as any).env?.BASE_URL ?? '/';
  s.src = `${base}legacy/v5.js`;
  s.async = true;
  document.body.appendChild(s);
}

export default function LegacySite() {
  useEffect(() => {
    // Ensure legacy markup exists before loading JS
    // Delay slightly to guarantee DOM paint in slower devices.
    const t = window.setTimeout(loadLegacyScriptOnce, 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: LEGACY_BODY_HTML }} />
  );
}
