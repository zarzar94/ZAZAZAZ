
import React, { useMemo, useState } from 'react';
import { ensureLabEngine, LabZone } from '../features/soundlab/soundlab';

const zoneCopy: Record<Exclude<LabZone,'off'>, {title: string; desc: string}> = {
  low: { title: 'منخفض (Low)', desc: 'هدوء/تصفية أصوات الخلفية' },
  mid: { title: 'متوسط (Mid)', desc: 'وضوح الكلام والتركيز' },
  high: { title: 'مرتفع (High)', desc: 'تنبيه/حساسية تفاصيل الصوت' },
};

export default function SoundLabDock() {
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [zone, setZoneState] = useState<LabZone>('off');

  const zones = useMemo(() => (['low','mid','high'] as const), []);

  const enable = async () => {
    const e = ensureLabEngine();
    await e.ctx.resume();
    e.ping();
    setEnabled(true);
    setMuted(false);
  };

  const toggleMute = () => {
    if (!enabled) return;
    const e = ensureLabEngine();
    const next = !muted;
    e.setMuted(next);
    if (!next) e.ping();
    setMuted(next);
  };

  const setZone = (z: LabZone) => {
    if (!enabled) return;
    const e = ensureLabEngine();
    e.setZone(z);
    e.ping();
    setZoneState(z);
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
      <section className="hero">
        <div className="heroGrid">
          <div className="glass heroCard">
            <div className="badge">مختبر صوت تفاعلي • Futuristic Sound Lab</div>
            <h1 className="heroH1">صوت • موسيقى • دماغ — تجربة تمهيدية (غير تشخيصية)</h1>
            <p className="heroP">
              هذه الواجهة تعطي انطباعًا حسّيًا عن “التحميل السمعي” وكيف يؤثر ضجيج الخلفية على الانتباه.
              ليست تشخيصًا طبيًا، لكنها تجربة توعوية تساعد الوالدين والمدارس على فهم الفكرة قبل حجز الجلسة.
            </p>
            <div className="heroCTA">
              {!enabled ? (
                <button className="btn btnPrimary" onClick={enable}>تفعيل صوت المختبر</button>
              ) : (
                <>
                  <button className="btn btnPrimary" onClick={() => {
                    // legacy site has openGameSelector()
                    const fn = (window as any).openGameSelector;
                    if (typeof fn === 'function') fn();
                  }}>ابدأ الألعاب (3 أوضاع)</button>
                  <button className="btn btnGhost" onClick={toggleMute}>{muted ? 'إلغاء الكتم' : 'كتم الصوت'}</button>
                  <button className="btn" onClick={() => setZone('off')}>إيقاف الفلتر</button>
                </>
              )}
            </div>

            <hr className="hr" />
            <div className="card" style={{ padding: 14 }}>
              <h3 style={{ margin: 0, fontWeight: 900 }}>لوحات الفلترة (Hover / Tap)</h3>
              <p style={{ margin: '8px 0 12px', color: 'var(--muted)' }}>
                مرّر على المناطق لتغيير “فلتر” الصوت في الخلفية — مثال بصري/سمعي مناسب للعرض أمام المدارس.
              </p>
              <div className="labZones">
                {zones.map(z => (
                  <div key={z} className="zone" role="button" tabIndex={0}
                       onMouseEnter={() => setZone(z)}
                       onClick={() => setZone(z)}
                       onKeyDown={(e) => { if (e.key === 'Enter') setZone(z); }}>
                    <strong>{zoneCopy[z].title}</strong>
                    <span>{zoneCopy[z].desc}</span>
                    {zone === z && <span style={{ marginTop: 8, opacity: 0.9, color: 'var(--text)' }}>✓ مفعّل</span>}
                  </div>
                ))}
              </div>
              <p style={{ margin: '12px 0 0', color: 'var(--muted-2)', fontWeight: 700, fontSize: 12, lineHeight: 1.7 }}>
                ملاحظة: الصوت لا يعمل إلا بعد ضغط المستخدم (سياسة المتصفح). يمكنك إبقاءه مكتومًا واستخدام الخلفية المرئية فقط.
              </p>
            </div>
          </div>

          <div className="glass labPanel">
            <h3 className="labTitle">ماذا يرى وليّ الأمر؟</h3>
            <p className="labDesc">
              • طيف/مخطط صوت متحرك (Spectrogram) في الخلفية.<br/>
              • فلترة صوتية تمثيلية لفكرة “التشتت”.<br/>
              • انتقال مباشر للألعاب: تركيز بصري + صوت / مطابقة نغمة / محاكاة صف.
            </p>

            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>روابط سريعة داخل الموقع</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a className="btn btnGhost" href="#pptx">عرض الشرائح</a>
                <a className="btn btnGhost" href="#checklist">قائمة تحقق</a>
                <a className="btn btnGhost" href="#comparison">مقارنة البدائل</a>
                <a className="btn btnGhost" href="#schools">حلول المدارس</a>
              </div>
            </div>

            <div className="card" style={{ padding: 16, marginTop: 12 }}>
              <h3 style={{ marginTop: 0 }}>نقطة تحويل (Funnel) تلقائيًا</h3>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.8 }}>
                بعد كل لعبة، ستظهر توصية تلقائية:
                <br/>• نتيجة منخفضة → “احجز تقييم/جلسة تعريف”
                <br/>• نتيجة متوسطة → “ابدأ الاستبيان”
                <br/>• نتيجة عالية → “خيار شراكة مدارس”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
