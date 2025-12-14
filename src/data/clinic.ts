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
const CLINIC_PHONE = import.meta.env.VITE_CLINIC_PHONE || '';

if (!CLINIC_PHONE && import.meta.env.DEV) {
  console.warn('[Lotus AIT] VITE_CLINIC_PHONE not set. WhatsApp links will not work correctly.');
}

export const clinic: Clinic = {
  name: 'Lotus Holistic Centre',
  nameAr: 'مركز لوتس الشمولي',
  tagline: 'Berard AIT - Futuristic Sound Lab',
  phone: CLINIC_PHONE,
  email: 'info@lotus-soundlab.com',
  website: 'https://lotus-soundlab.com',
  address: 'الرياض - حي العقيق، طريق الملك فهد',
};
