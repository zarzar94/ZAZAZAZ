import { memo, useCallback, useMemo, useState } from 'react';
import { clinic } from '../data/clinic';
import { createPdfDoc, writePdfText, PDF_MARGIN_X } from '../utils/pdf';
import { styles } from './styles';

export type Slide = {
  id: number;
  title: string;
  body: string;
};

export const slides: Slide[] = [
  { id: 1, title: 'نظرة عامة على برنامج AIT', body: 'مقدمة عن برمجية بيرار لتدريب السمع وكيفية تطبيقها في العيادة.' },
  { id: 2, title: 'APD - اضطراب المعالجة السمعية', body: 'علامات الاضطراب وتأثيره على الانتباه والتعلم.' },
  { id: 3, title: 'فرط السمع (Hyperacusis)', body: 'حساسية مفرطة للأصوات العالية وكيفية تقييمها ميدانياً.' },
  { id: 4, title: 'خطة الجلسات', body: 'كيف نوزع الجلسات العشر وتنسيق المتابعة مع الأسرة.' },
];

// Memoized slide card to prevent unnecessary re-renders
const SlideCard = memo(function SlideCard({
  slide,
  onClick,
}: {
  slide: Slide;
  onClick: () => void;
}) {
  return (
    <article style={styles.slideItem} onClick={onClick}>
      <h3 style={styles.h3}>{slide.title}</h3>
      <p style={styles.bodyText}>{slide.body}</p>
    </article>
  );
});

export default function SlideViewer() {
  const [search, setSearch] = useState('');
  const [activeSlide, setActiveSlide] = useState<Slide | null>(null);

  const filteredSlides = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return slides;
    return slides.filter((s) => s.title.toLowerCase().includes(term) || s.body.toLowerCase().includes(term));
  }, [search]);

  const handleSlidePdf = useCallback(async () => {
    const { doc, fontReady } = await createPdfDoc();
    doc.setFontSize(18);
    let y = 60;
    writePdfText(doc, clinic.nameAr ?? clinic.name, PDF_MARGIN_X, y);
    y += 22;
    writePdfText(doc, 'عرض الشرائح - ملخص نصي', PDF_MARGIN_X, y);
    doc.setFont(fontReady ? 'Tajawal' : 'helvetica', 'normal');
    doc.setFontSize(12);
    y += 24;
    slides.forEach((s) => {
      writePdfText(doc, s.title, PDF_MARGIN_X, y);
      y += 18;
      writePdfText(doc, s.body, PDF_MARGIN_X + 12, y, { maxWidth: 500 });
      y += 36;
      if (y > 760) { doc.addPage(); y = 64; }
    });
    doc.save('slides-summary.pdf');
  }, []);

  const handleSlideClick = useCallback((slide: Slide) => {
    setActiveSlide(slide);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveSlide(null);
  }, []);

  const handlePrevSlide = useCallback(() => {
    if (!activeSlide) return;
    const idx = slides.findIndex((s) => s.id === activeSlide.id);
    setActiveSlide(idx > 0 ? slides[idx - 1] : slides[slides.length - 1]);
  }, [activeSlide]);

  const handleNextSlide = useCallback(() => {
    if (!activeSlide) return;
    const idx = slides.findIndex((s) => s.id === activeSlide.id);
    setActiveSlide(idx < slides.length - 1 ? slides[idx + 1] : slides[0]);
  }, [activeSlide]);

  return (
    <>
      <section id="pptx" style={styles.sectionCard}>
        <div style={styles.sectionHeaderRow}>
          <div>
            <h2 style={styles.h2}>عارض الشرائح (نسخة نصية)</h2>
            <p style={styles.muted}>بحث فوري + عرض شرائح داخل نافذة منبثقة مع تنقّل سابق/لاحق.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن APD / Hyperacusis ..."
              style={styles.input}
            />
            <button style={styles.ghostBtn} onClick={handleSlidePdf}>
              تصدير PDF
            </button>
          </div>
        </div>
        <div style={styles.slideGrid}>
          {filteredSlides.map((s) => (
            <SlideCard key={s.id} slide={s} onClick={() => handleSlideClick(s)} />
          ))}
          {filteredSlides.length === 0 && <p style={styles.muted}>لا توجد نتائج مطابقة.</p>}
        </div>
      </section>

      {activeSlide && (
        <div style={styles.modalBackdrop} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{activeSlide.title}</h3>
              <button style={styles.ghostBtn} onClick={handleCloseModal}>إغلاق</button>
            </header>
            <p style={{ marginTop: 12 }}>{activeSlide.body}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <button style={styles.ghostBtn} onClick={handlePrevSlide}>
                السابق
              </button>
              <button style={styles.primaryBtn} onClick={handleNextSlide}>
                التالي
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
