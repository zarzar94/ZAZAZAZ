
import React from 'react';

export default function FooterNote() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>© {new Date().getFullYear()} • Lotus Holistic Centre × Berard AIT (Prototype)</div>
        <div className="footerLinks">
          <a href="downloads/presentation3.pdf" target="_blank" rel="noreferrer">تحميل العرض PDF</a>
          <a href="downloads/Check%20list%20(2).pdf" target="_blank" rel="noreferrer">تحميل قائمة التحقق</a>
          <a href="downloads/presentation%20(3).pptx" target="_blank" rel="noreferrer">تحميل PPTX</a>
        </div>
      </div>
    </footer>
  );
}
