import { memo, useCallback, useMemo, useState } from 'react';
import { clinic } from '../data/clinic';
import { createPdfDoc, writePdfText, PDF_MARGIN_X } from '../utils/pdf';
import { styles } from './styles';

export const checklistItems = [
  'يطلب تكرار التعليمات كثيراً',
  'تشتت سريع مع الضوضاء',
  'يعاني من صعوبة في التمييز بين الأصوات المتقاربة',
  'يتضايق من الأصوات العالية أو المفاجئة',
  'صعوبة في التركيز داخل الصف',
  'مشكلات في الإملاء أو القراءة',
  'استجابات انفعالية مع الأصوات',
  'يشكو من طنين أو صداع مع الضوضاء',
  'يتجنب الأنشطة السمعية',
  'يجد صعوبة في تتبع التعليمات المتسلسلة',
  'يواجه صعوبة في فهم الكلام السريع',
  'يفضل العزلة في البيئات المزدحمة',
  'يواجه صعوبة في متابعة المحادثات الجماعية',
  'يظهر تأخراً في الاستجابة اللفظية',
  'يعاني من سوء النطق لبعض الأصوات',
  'تعب شديد بعد المواقف السمعية المكثفة',
];

// Memoized checklist item to prevent re-renders when other items change
const ChecklistItem = memo(function ChecklistItem({
  item,
  id,
  checked,
  onToggle,
}: {
  item: string;
  id: number;
  checked: boolean;
  onToggle: (id: number) => void;
}) {
  return (
    <label style={styles.checkItem}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        style={styles.checkbox}
      />
      <span>{item}</span>
    </label>
  );
});

export default function Checklist() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const checkedCount = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  const recommendation = useMemo(() => {
    if (checkedCount === 0) return { tone: '#e0e0e0', text: 'اختر البنود للحصول على توصية أولية.' };
    if (checkedCount <= 3) return { tone: '#22c55e', text: 'مؤشرات منخفضة، جرّب الألعاب التفاعلية للمزيد من الفحص.' };
    if (checkedCount <= 7) return { tone: '#f59e0b', text: 'مؤشرات متوسطة، يُنصح بتقييم أولي في العيادة.' };
    return { tone: '#ef4444', text: 'مؤشرات مرتفعة، نوصي بتقييم متخصص ومتكامل.' };
  }, [checkedCount]);

  const handleToggle = useCallback((id: number) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleDownloadPdf = useCallback(async () => {
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
    <section id="checklist" style={styles.sectionCard}>
      <div style={styles.sectionHeaderRow}>
        <div>
          <h2 style={styles.h2}>قائمة التحقق التفاعلية</h2>
          <p style={styles.muted}>اختر البنود وشاهد التوصية المباشرة.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={styles.primaryBtn} onClick={handleDownloadPdf}>
            تحميل القائمة
          </button>
        </div>
      </div>
      <div style={styles.checklistGrid}>
        {checklistItems.map((item, idx) => {
          const id = idx + 1;
          return (
            <ChecklistItem
              key={id}
              item={item}
              id={id}
              checked={!!checked[id]}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: '#0f1629' }}>
        <strong>النتيجة: {checkedCount} بنود</strong>
        <p style={{ margin: '6px 0 0', color: recommendation.tone }}>{recommendation.text}</p>
      </div>
    </section>
  );
}
