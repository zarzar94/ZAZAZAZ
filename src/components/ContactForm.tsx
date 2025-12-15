import { useState, type FormEvent } from 'react';
import { styles } from './styles';
import { handleWhatsApp, whatsappConfig } from '../utils/whatsapp';

// Input validation constants
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 15;
const MAX_PURPOSE_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 1000;
const SAUDI_PHONE_REGEX = /^05\d{8}$/;

// Sanitize input: remove control characters but allow Arabic
const sanitizeInput = (input: string, maxLength: number): string => {
  return input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .slice(0, maxLength)
    .trim();
};

const validatePhone = (phone: string): boolean => {
  return SAUDI_PHONE_REGEX.test(phone);
};

type FormErrors = {
  name?: string;
  phone?: string;
  purpose?: string;
  message?: string;
};

export default function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const canWhatsApp = whatsappConfig.isConfigured;
  const whatsappHint = whatsappConfig.error ?? 'WhatsApp contact is disabled until a clinic phone is set.';

  const contactFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canWhatsApp) {
      console.error('[Lotus AIT] WhatsApp disabled - missing clinic phone');
      return;
    }
    const form = new FormData(event.currentTarget);

    // Sanitize inputs
    const name = sanitizeInput(form.get('name')?.toString() ?? '', MAX_NAME_LENGTH);
    const phone = sanitizeInput(form.get('phone')?.toString() ?? '', MAX_PHONE_LENGTH);
    const purpose = sanitizeInput(form.get('purpose')?.toString() ?? '', MAX_PURPOSE_LENGTH);
    const message = sanitizeInput(form.get('message')?.toString() ?? '', MAX_MESSAGE_LENGTH);

    // Validate
    const newErrors: FormErrors = {};
    if (name.length < 2) {
      newErrors.name = 'الاسم يجب أن يكون حرفين على الأقل';
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 05xxxxxxxx)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const text = `الاسم: ${name}\nالهاتف: ${phone}\nالغرض: ${purpose}\nالرسالة: ${message}\nأرغب بالتواصل حول برنامج بيرار AIT.`;
    handleWhatsApp(text);
  };

  return (
    <section id="contact" style={styles.sectionCard}>
      <div style={styles.sectionHeaderRow}>
        <div>
          <h2 style={styles.h2}>تواصل معنا</h2>
          <p style={styles.muted}>نموذج واتساب سريع باللغة العربية (RTL).</p>
        </div>
        <button
          style={canWhatsApp ? styles.ghostBtn : styles.disabledBtn}
          onClick={() => canWhatsApp && handleWhatsApp()}
          disabled={!canWhatsApp}
          title={canWhatsApp ? undefined : whatsappHint}
        >
          واتساب مباشر
        </button>
      </div>
      {!canWhatsApp && (
        <p style={{ color: '#f59e0b', margin: '8px 0 12px', fontSize: 13 }}>
          WhatsApp contact is disabled until VITE_CLINIC_PHONE is set.
        </p>
      )}
      <form onSubmit={contactFormSubmit} style={styles.form}>
        <label style={styles.formField}>
          <span>الاسم</span>
          <input
            name="name"
            required
            maxLength={MAX_NAME_LENGTH}
            style={errors.name ? { ...styles.input, borderColor: '#ef4444' } : styles.input}
            placeholder="اسمك الكريم"
          />
          {errors.name && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.name}</span>}
        </label>
        <label style={styles.formField}>
          <span>رقم الهاتف</span>
          <input
            name="phone"
            required
            maxLength={MAX_PHONE_LENGTH}
            style={errors.phone ? { ...styles.input, borderColor: '#ef4444' } : styles.input}
            placeholder="05xxxxxxxx"
          />
          {errors.phone && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.phone}</span>}
        </label>
        <label style={styles.formField}>
          <span>الغرض</span>
          <input
            name="purpose"
            maxLength={MAX_PURPOSE_LENGTH}
            style={styles.input}
            placeholder="حجز تقييم / استفسار / شراكة"
          />
        </label>
        <label style={styles.formField}>
          <span>رسالتك</span>
          <textarea
            name="message"
            rows={3}
            maxLength={MAX_MESSAGE_LENGTH}
            style={styles.textarea}
            placeholder="اكتب ملاحظاتك هنا"
          />
        </label>
        <button
          type="submit"
          style={canWhatsApp ? styles.primaryBtn : styles.disabledBtn}
          disabled={!canWhatsApp}
          title={canWhatsApp ? undefined : whatsappHint}
        >
          إرسال عبر واتساب
        </button>
      </form>
    </section>
  );
}
