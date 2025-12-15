export type Clinic = {
  name: string;
  nameAr?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
};

// Phone number from environment variable (set VITE_CLINIC_PHONE in .env)
const RAW_CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE ?? '';
const SANITIZED_CLINIC_PHONE = RAW_CLINIC_PHONE.replace(/\D/g, '');
const PHONE_MIN_LENGTH = 9;   // allow local formats
const PHONE_MAX_LENGTH = 15;  // allow E.164 upper bound
export const clinicPhoneError =
  SANITIZED_CLINIC_PHONE.length === 0
    ? 'VITE_CLINIC_PHONE is required to enable WhatsApp actions.'
    : `VITE_CLINIC_PHONE must be ${PHONE_MIN_LENGTH}-${PHONE_MAX_LENGTH} digits (use country code).`;
export const clinicPhoneConfigured =
  SANITIZED_CLINIC_PHONE.length >= PHONE_MIN_LENGTH && SANITIZED_CLINIC_PHONE.length <= PHONE_MAX_LENGTH;
export const clinicPhone = clinicPhoneConfigured ? SANITIZED_CLINIC_PHONE : '';

if (!clinicPhoneConfigured && import.meta.env.DEV) {
  console.warn('[Lotus AIT] WhatsApp phone missing or invalid. Set VITE_CLINIC_PHONE to enable WhatsApp actions.');
}

export const clinic: Clinic = {
  name: 'Lotus Holistic Centre',
  nameAr: 'مركز لوتس الشمولي',
  tagline: 'Berard AIT - Futuristic Sound Lab',
  phone: clinicPhone,
  email: 'info@lotus-soundlab.com',
  website: 'https://lotus-soundlab.com',
  address: 'الرياض - حي العقيق، طريق الملك فهد',
};
