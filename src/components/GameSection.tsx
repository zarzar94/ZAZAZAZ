import { useState } from 'react';
import { styles } from './styles';

type GameResult = 'high' | 'medium' | 'low' | null;

const gameCta = (result: GameResult) => {
  if (result === 'high') return 'نوصي ببرنامج الشراكة المدرسية';
  if (result === 'medium') return 'جرّب اختبار التشخيص السريع';
  if (result === 'low') return 'احجز تقييماً متخصصاً';
  return 'ابدأ من هنا';
};

export default function GameSection() {
  const [gameResult, setGameResult] = useState<GameResult>(null);

  const games = [
    {
      key: 'quiz',
      title: 'اختبار تشخيصي سريع',
      desc: '٥ أسئلة تقيس مؤشرات المعالجة السمعية وتعرض CTA بناءً على النتيجة.',
      action: () => setGameResult('medium'),
    },
    {
      key: 'tone',
      title: 'مطابقة النغمات',
      desc: '٢٠ جولة مع نغمة هدف 880Hz، تُحسب الدقة والإنذارات الكاذبة.',
      action: () => setGameResult('high'),
    },
    {
      key: 'classroom',
      title: 'محاكاة صف دراسي',
      desc: '٥ تعليمات صوتية مع ضوضاء متزايدة، يُولد تقرير PDF بعد الانتهاء.',
      action: () => setGameResult('low'),
    },
  ];

  return (
    <section id="games" style={styles.sectionCard}>
      <div style={styles.sectionHeaderRow}>
        <div>
          <h2 style={styles.h2}>الألعاب التفاعلية</h2>
          <p style={styles.muted}>وصف مبسط بثلاث قنوات: اختبار تشخيصي، مطابقة نغمات، محاكاة صف.</p>
        </div>
        <span style={styles.comingSoonBadge}>قريباً</span>
      </div>
      <div style={styles.gameGrid}>
        {games.map((g) => (
          <div key={g.key} style={styles.gameCard}>
            <h3 style={styles.h3}>{g.title}</h3>
            <p style={styles.bodyText}>{g.desc}</p>
            <button style={styles.disabledBtn} disabled>
              قريباً
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: '#0f1629' }}>
        <strong>CTA الحالي:</strong>
        <p style={{ margin: '6px 0 0' }}>{gameCta(gameResult)}</p>
      </div>
    </section>
  );
}
