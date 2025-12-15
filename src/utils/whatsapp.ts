import { clinic, clinicPhone, clinicPhoneConfigured, clinicPhoneError } from '../data/clinic';

export const whatsappConfig = {
  phone: clinicPhone,
  isConfigured: clinicPhoneConfigured,
  error: clinicPhoneConfigured ? null : clinicPhoneError,
};

export const handleWhatsApp = (payload?: string) => {
  if (!whatsappConfig.isConfigured) {
    console.error('[Lotus AIT] Clinic phone number not configured or invalid');
    return;
  }
  const text = payload ?? `السلام عليكم، أريد الاستفسار عن خدمات بيرار AIT من ${clinic.nameAr ?? clinic.name}.`;
  const sanitizedText = text.slice(0, 2000); // WhatsApp URL limit
  const url = `https://wa.me/${whatsappConfig.phone}?text=${encodeURIComponent(sanitizedText)}`;
  window.open(url, '_blank', 'noreferrer');
};