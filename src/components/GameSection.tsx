import { useState, useCallback, useEffect, useRef } from 'react';
import { styles } from './styles';

type GameResult = 'high' | 'medium' | 'low' | null;
type ActiveGame = 'quiz' | 'tone' | 'classroom' | null;

// Quiz Questions
const quizQuestions = [
  { id: 1, text: 'هل يطلب طفلك تكرار التعليمات بشكل متكرر؟' },
  { id: 2, text: 'هل يتشتت انتباهه بسهولة مع وجود ضوضاء خلفية؟' },
  { id: 3, text: 'هل يعاني من صعوبة في التمييز بين الأصوات المتشابهة؟' },
  { id: 4, text: 'هل يتضايق من الأصوات العالية أو المفاجئة؟' },
  { id: 5, text: 'هل يواجه صعوبة في اتباع التعليمات المتسلسلة؟' },
];
const quizOptions = ['نادراً', 'أحياناً', 'غالباً', 'دائماً'];

// Classroom Instructions
const classroomInstructions = [
  'اضغط على الدائرة الزرقاء',
  'اضغط على المربع الأخضر',
  'اضغط على المثلث الأحمر',
  'اضغط على الدائرة الصفراء',
  'اضغط على المربع البنفسجي',
];

const gameCta = (result: GameResult) => {
  if (result === 'high') return 'نوصي ببرنامج الشراكة المدرسية';
  if (result === 'medium') return 'جرّب اختبار التشخيص السريع';
  if (result === 'low') return 'احجز تقييماً متخصصاً';
  return 'ابدأ من هنا';
};

// Quiz Game Component
function QuizGame({ onComplete, onClose }: { onComplete: (r: GameResult) => void; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const getResult = () => {
    const total = answers.reduce((s, a) => s + a, 0);
    const pct = (total / (quizQuestions.length * 3)) * 100;
    if (pct <= 25) return { result: 'low' as GameResult, msg: 'المؤشرات منخفضة. المعالجة السمعية تبدو طبيعية.' };
    if (pct <= 60) return { result: 'medium' as GameResult, msg: 'المؤشرات متوسطة. ننصح بتقييم أولي في العيادة.' };
    return { result: 'high' as GameResult, msg: 'المؤشرات مرتفعة. نوصي بحجز تقييم متخصص.' };
  };

  if (done) {
    const { result, msg } = getResult();
    const colors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
    return (
      <div style={styles.modalBackdrop} onClick={onClose}>
        <div style={{ ...styles.modal, maxWidth: 450 }} onClick={e => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 16px', textAlign: 'center' }}>نتيجة الاختبار</h3>
          <div style={{ textAlign: 'center', padding: 20, borderRadius: 12, background: '#0f1629', marginBottom: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: colors[result!] }}>
              {answers.reduce((s, a) => s + a, 0)}/{quizQuestions.length * 3}
            </div>
          </div>
          <p style={{ margin: '0 0 20px', lineHeight: 1.7 }}>{msg}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
            <button style={styles.primaryBtn} onClick={() => onComplete(result!)}>متابعة</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={{ ...styles.modal, maxWidth: 450 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>اختبار تشخيصي</h3>
          <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
        </div>
        <div style={{ height: 6, background: '#1a1f35', borderRadius: 3, marginBottom: 16 }}>
          <div style={{ height: '100%', width: `${(current / quizQuestions.length) * 100}%`, background: 'linear-gradient(90deg, #8a5bd1, #17c8ff)', borderRadius: 3 }} />
        </div>
        <p style={{ opacity: 0.7, fontSize: 14, margin: '0 0 8px' }}>السؤال {current + 1} من {quizQuestions.length}</p>
        <h4 style={{ margin: '0 0 16px', lineHeight: 1.6 }}>{quizQuestions[current].text}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {quizOptions.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)} style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: '#0f1629', color: '#f7f8fb', cursor: 'pointer', textAlign: 'right' }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tone Matching Game Component
function ToneGame({ onComplete, onClose }: { onComplete: (r: GameResult) => void; onClose: () => void }) {
  const [round, setRound] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioCtor = typeof window !== 'undefined' ? (window.AudioContext ?? (window as any).webkitAudioContext) : null;
  const supportsAudio = !!audioCtor;
  const totalRounds = 10;

  const getAudioContext = useCallback(() => {
    if (!supportsAudio) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new audioCtor();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  }, [audioCtor, supportsAudio]);

  const playTone = useCallback((freq: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.value = 0.3;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
  }, []);

  const playTargetTone = () => playTone(880);

  const startRound = useCallback(() => {
    if (round >= totalRounds) {
      setDone(true);
      return;
    }
    setFeedback(null);
    const target = Math.random() > 0.5;
    setIsTarget(target);
    setPlaying(true);
    playTone(target ? 880 : 440 + Math.random() * 400);
    setTimeout(() => setPlaying(false), 600);
  }, [round, playTone]);

  const handleResponse = (userSaysTarget: boolean) => {
    if (playing) return;
    const correct = userSaysTarget === isTarget;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct && isTarget) setHits(h => h + 1);
    if (!correct) setMisses(m => m + 1);
    setRound(r => r + 1);
    setTimeout(() => {
      if (round + 1 >= totalRounds) setDone(true);
      else startRound();
    }, 500);
  };

  useEffect(() => {
    return () => { audioCtxRef.current?.close(); };
  }, []);

  if (done) {
    const accuracy = Math.round((hits / totalRounds) * 100);
    const result: GameResult = accuracy >= 70 ? 'low' : accuracy >= 40 ? 'medium' : 'high';
    const colors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
    return (
      <div style={styles.modalBackdrop} onClick={onClose}>
        <div style={{ ...styles.modal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 16px', textAlign: 'center' }}>نتيجة مطابقة النغمات</h3>
          <div style={{ textAlign: 'center', padding: 20, borderRadius: 12, background: '#0f1629', marginBottom: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: colors[result] }}>{accuracy}%</div>
            <div style={{ opacity: 0.7 }}>الدقة</div>
          </div>
          <p style={{ margin: '0 0 16px' }}>الإصابات: {hits} | الأخطاء: {misses}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
            <button style={styles.primaryBtn} onClick={() => onComplete(result)}>متابعة</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={{ ...styles.modal, maxWidth: 400, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>مطابقة النغمات</h3>
          <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
        </div>
        {(!supportsAudio || !supportsSpeech) && (
          <p style={{ color: '#f59e0b', fontSize: 12, margin: '0 0 10px' }}>
            Sound and speech cues may be unavailable in this browser.
          </p>
        )}
        {!supportsAudio && (
          <p style={{ color: '#f59e0b', fontSize: 12, margin: '0 0 8px' }}>
            Audio is blocked or unsupported in this browser; sound cues may be muted.
          </p>
        )}
        <p style={{ opacity: 0.7, marginBottom: 12 }}>الجولة {round + 1} من {totalRounds}</p>
        <button onClick={playTargetTone} style={{ ...styles.ghostBtn, marginBottom: 16 }}>
          استمع للنغمة المستهدفة (880Hz)
        </button>
        {round === 0 && !playing ? (
          <button onClick={startRound} style={styles.primaryBtn}>ابدأ اللعبة</button>
        ) : (
          <>
            <div style={{
              width: 120, height: 120, margin: '20px auto', borderRadius: '50%',
              background: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : playing ? '#8a5bd1' : '#1a1f35',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700,
              transition: 'background 0.2s'
            }}>
              {playing ? 'جاري التشغيل...' : feedback ? (feedback === 'correct' ? 'صحيح!' : 'خطأ!') : 'استمع'}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => handleResponse(true)} disabled={playing} style={{ ...styles.primaryBtn, opacity: playing ? 0.5 : 1 }}>
                نغمة مستهدفة
              </button>
              <button onClick={() => handleResponse(false)} disabled={playing} style={{ ...styles.ghostBtn, opacity: playing ? 0.5 : 1 }}>
                نغمة مختلفة
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Classroom Simulation Game Component
function ClassroomGame({ onComplete, onClose }: { onComplete: (r: GameResult) => void; onClose: () => void }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtor = typeof window !== 'undefined' ? (window.AudioContext ?? (window as any).webkitAudioContext) : null;
  const supportsAudio = !!audioCtor;
  const supportsSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

  const shapes = [
    { id: 'blue-circle', label: 'الدائرة الزرقاء', color: '#3b82f6', shape: 'circle' },
    { id: 'green-square', label: 'المربع الأخضر', color: '#22c55e', shape: 'square' },
    { id: 'red-triangle', label: 'المثلث الأحمر', color: '#ef4444', shape: 'triangle' },
    { id: 'yellow-circle', label: 'الدائرة الصفراء', color: '#eab308', shape: 'circle' },
    { id: 'purple-square', label: 'المربع البنفسجي', color: '#a855f7', shape: 'square' },
  ];

  const startNoise = useCallback((level: number) => {
    if (!supportsAudio) return;
    if (!audioCtxRef.current) audioCtxRef.current = new audioCtor();
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') void ctx.resume();
    if (noiseRef.current) { noiseRef.current.stop(); noiseRef.current = null; }
    if (level === 0) return;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = level * 0.15;
    source.start();
    noiseRef.current = source;
  }, [supportsAudio, audioCtor]);

  const speak = useCallback((text: string) => {
    if (!supportsSpeech) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }, [supportsSpeech]);

  const startRound = useCallback(() => {
    if (round >= classroomInstructions.length) {
      setDone(true);
      noiseRef.current?.stop();
      return;
    }
    setFeedback(null);
    setShowInstruction(true);
    const noise = Math.min(round * 0.25, 1);
    setNoiseLevel(noise);
    startNoise(noise);
    speak(classroomInstructions[round]);
    setTimeout(() => setShowInstruction(false), 2000);
  }, [round, speak, startNoise]);

  const handleShapeClick = (shapeId: string) => {
    if (showInstruction) return;
    const correct = shapeId === shapes[round].id;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
    setRound(r => r + 1);
    setTimeout(() => {
      if (round + 1 >= classroomInstructions.length) {
        setDone(true);
        noiseRef.current?.stop();
      } else {
        startRound();
      }
    }, 800);
  };

  useEffect(() => {
    return () => { noiseRef.current?.stop(); audioCtxRef.current?.close(); };
  }, []);

  if (done) {
    const pct = Math.round((score / classroomInstructions.length) * 100);
    const result: GameResult = pct >= 80 ? 'low' : pct >= 50 ? 'medium' : 'high';
    const colors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
    return (
      <div style={styles.modalBackdrop} onClick={onClose}>
        <div style={{ ...styles.modal, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 16px', textAlign: 'center' }}>نتيجة محاكاة الصف</h3>
          <div style={{ textAlign: 'center', padding: 20, borderRadius: 12, background: '#0f1629', marginBottom: 16 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: colors[result] }}>{score}/{classroomInstructions.length}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
            <button style={styles.primaryBtn} onClick={() => onComplete(result)}>متابعة</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={{ ...styles.modal, maxWidth: 500 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>محاكاة صف دراسي</h3>
          <button style={styles.ghostBtn} onClick={onClose}>إغلاق</button>
        {(!supportsAudio || !supportsSpeech) && (
          <p style={{ color: '#f59e0b', fontSize: 12, margin: '0 0 10px' }}>
            Sound and speech cues may be unavailable in this browser.
          </p>
        )}
        </div>
        {round === 0 && showInstruction ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: 16 }}>استمع للتعليمات واضغط على الشكل الصحيح</p>
            <button onClick={startRound} style={styles.primaryBtn}>ابدأ</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, opacity: 0.7 }}>
              <span>التعليمة {round + 1} من {classroomInstructions.length}</span>
              <span>مستوى الضوضاء: {Math.round(noiseLevel * 100)}%</span>
            </div>
            <div style={{
              minHeight: 50, padding: 12, borderRadius: 10, background: '#0f1629', marginBottom: 16, textAlign: 'center',
              color: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : '#f7f8fb'
            }}>
              {showInstruction ? 'استمع للتعليمات...' : feedback ? (feedback === 'correct' ? 'صحيح!' : 'خطأ!') : 'اختر الشكل المناسب'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              {shapes.map(s => (
                <button key={s.id} onClick={() => handleShapeClick(s.id)} disabled={showInstruction}
                  style={{
                    width: 70, height: 70, border: 'none', cursor: showInstruction ? 'not-allowed' : 'pointer',
                    background: s.color, opacity: showInstruction ? 0.5 : 1,
                    borderRadius: s.shape === 'circle' ? '50%' : s.shape === 'triangle' ? 0 : 12,
                    clipPath: s.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Main GameSection Component
export default function GameSection() {
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  const games = [
    { key: 'quiz' as const, title: 'اختبار تشخيصي سريع', desc: '٥ أسئلة تقيس مؤشرات المعالجة السمعية.' },
    { key: 'tone' as const, title: 'مطابقة النغمات', desc: '١٠ جولات لتمييز النغمة المستهدفة 880Hz.' },
    { key: 'classroom' as const, title: 'محاكاة صف دراسي', desc: '٥ تعليمات صوتية مع ضوضاء متزايدة.' },
  ];

  const handleGameComplete = (result: GameResult) => {
    setGameResult(result);
    setActiveGame(null);
  };

  return (
    <section id="games" style={styles.sectionCard}>
      <div style={styles.sectionHeaderRow}>
        <div>
          <h2 style={styles.h2}>الألعاب التفاعلية</h2>
          <p style={styles.muted}>اختر لعبة لتقييم المعالجة السمعية</p>
        </div>
      </div>
      <div style={styles.gameGrid}>
        {games.map((g) => (
          <div key={g.key} style={styles.gameCard}>
            <h3 style={styles.h3}>{g.title}</h3>
            <p style={styles.bodyText}>{g.desc}</p>
            <button style={styles.primaryBtn} onClick={() => setActiveGame(g.key)}>
              ابدأ اللعبة
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: '#0f1629' }}>
        <strong>التوصية:</strong>
        <p style={{ margin: '6px 0 0', color: gameResult === 'high' ? '#ef4444' : gameResult === 'medium' ? '#f59e0b' : gameResult === 'low' ? '#22c55e' : '#f7f8fb' }}>
          {gameCta(gameResult)}
        </p>
      </div>

      {activeGame === 'quiz' && <QuizGame onComplete={handleGameComplete} onClose={() => setActiveGame(null)} />}
      {activeGame === 'tone' && <ToneGame onComplete={handleGameComplete} onClose={() => setActiveGame(null)} />}
      {activeGame === 'classroom' && <ClassroomGame onComplete={handleGameComplete} onClose={() => setActiveGame(null)} />}
    </section>
  );
}
