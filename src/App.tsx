import { lazy, Suspense, useCallback, useEffect } from 'react';
import { Header, handleWhatsApp, styles } from './components';
import { checklistItems } from './components/Checklist';
import { clinic } from './data/clinic';
import { createPdfDoc, writePdfText, PDF_MARGIN_X } from './utils/pdf';

// Lazy load heavy components for better initial load performance
const SlideViewer = lazy(() => import('./components/SlideViewer'));
const Checklist = lazy(() => import('./components/Checklist'));
const GameSection = lazy(() => import('./components/GameSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));

// Loading fallback component
const SectionLoader = () => (
  <div style={{ ...styles.sectionCard, textAlign: 'center', padding: 40 }}>
    <span style={{ opacity: 0.6 }}>جاري التحميل...</span>
  </div>
);

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleDownloadChecklistPdf = useCallback(async () => {
    const { doc, fontReady } = await createPdfDoc();
    doc.setFontSize(16);
    let y = 60;
    writePdfText(doc, clinic.nameAr ?? clinic.name, PDF_MARGIN_X, y);
    y += 22;
    writePdfText(doc, 'قائمة التحقق الأولية', PDF_MARGIN_X, y);
    doc.setFont(fontReady ? 'Tajawal' : 'helvetica', 'normal');
    doc.setFontSize(12);
    y += 24;
    checklistItems.forEach((item, idx) => {
      writePdfText(doc, `${idx + 1}. ${item}`, PDF_MARGIN_X, y);
      y += 20;
      if (y > 760) { doc.addPage(); y = 64; }
    });
    doc.save('ait-checklist.pdf');
  }, []);

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.container}>
        <section id="about" style={styles.section}>
          <div style={styles.sectionHeader}>
            <h1 style={styles.title}>معمل الصوتيات المستقبلي - بيرار AIT</h1>
            <p style={styles.lead}>
              نسخة تجريبية عربية للعيادة مع تجربة متكاملة: شرائح، قائمة تحقق، ألعاب تفاعلية، وروابط تواصل.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={styles.primaryBtn} onClick={() => handleWhatsApp()}>
                تواصل واتساب
              </button>
              <button style={styles.ghostBtn} onClick={handleDownloadChecklistPdf}>
                تحميل PDF
              </button>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <SlideViewer />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Checklist />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <GameSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactForm />
        </Suspense>
      </main>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleWhatsApp();
        }}
        style={styles.fab}
        aria-label="واتساب سريع"
      >
        💬
      </a>
    </div>
  );
}
