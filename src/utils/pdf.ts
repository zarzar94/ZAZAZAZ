import { jsPDF } from 'jspdf';
import type { TextOptionsLight } from 'jspdf';

export const PDF_MARGIN_X = 48;
const FONT_BASE_PATH = `${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/')}`;

const isArabicText = (value: string) => /[\u0600-\u06FF]/.test(value);

const rtlBaseOptions: TextOptionsLight = {
  align: 'right',
  isInputRtl: true,
  isOutputRtl: true,
  isInputVisual: false,
  isSymmetricSwapping: true,
};

type FontAsset = {
  url: string;
  vfsName: string;
  fontName: string;
  fontStyle: 'normal' | 'bold';
  data?: string;
};

// Font cache - loaded once, reused across all PDF generations
const arabicFonts: FontAsset[] = [
  { url: `${FONT_BASE_PATH}fonts/Cairo-Regular.ttf`, vfsName: 'Cairo-Regular.ttf', fontName: 'Cairo', fontStyle: 'normal' },
  { url: `${FONT_BASE_PATH}fonts/Cairo-Bold.ttf`, vfsName: 'Cairo-Bold.ttf', fontName: 'Cairo', fontStyle: 'bold' },
];

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const ensurePdfFonts = async (doc: jsPDF): Promise<void> => {
  for (const font of arabicFonts) {
    if (!font.data) {
      const response = await fetch(font.url);
      if (!response.ok) throw new Error(`Failed to load PDF font: ${font.url}`);
      const buffer = await response.arrayBuffer();
      font.data = arrayBufferToBase64(buffer);
    }
    doc.addFileToVFS(font.vfsName, font.data);
    doc.addFont(font.vfsName, font.fontName, font.fontStyle);
  }
  doc.setFont('Cairo', 'normal');
};

export type PdfDocResult = {
  doc: jsPDF;
  fontReady: boolean;
};

export const createPdfDoc = async (): Promise<PdfDocResult> => {
  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', putOnlyUsedFonts: true });
  let fontReady = true;
  try {
    await ensurePdfFonts(doc);
  } catch (error) {
    console.error('Failed to load Arabic PDF font', error);
    fontReady = false;
  }
  doc.setFont(fontReady ? 'Cairo' : 'helvetica', 'bold');
  return { doc, fontReady };
};

export const writePdfText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  options?: TextOptionsLight
): void => {
  const isArabic = isArabicText(text);
  const targetX = isArabic ? doc.internal.pageSize.getWidth() - x : x;
  const finalOptions = isArabic ? { ...rtlBaseOptions, ...(options ?? {}) } : options;
  doc.text(text, targetX, y, finalOptions);
};
