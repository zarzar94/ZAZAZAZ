import { clinic } from '../data/clinic';

export const handleWhatsApp = (payload?: string) => {
  const clinicPhone = clinic.phone ?? '';
  if (!clinicPhone) {
    console.error('[Lotus AIT] Clinic phone number not configured');
    return;
  }
  const text = payload ?? `مرحبا، أرغب في الاستفسار عن برنامج بيرار AIT لدى ${clinic.nameAr ?? clinic.name}.`;
  const sanitizedText = text.slice(0, 2000); // WhatsApp URL limit
  const url = `https://wa.me/${clinicPhone.replace(/\D/g, '')}?text=${encodeURIComponent(sanitizedText)}`;
  window.open(url, '_blank', 'noreferrer');
};
