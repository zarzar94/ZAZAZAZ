const { readFileSync, writeFileSync } = require('fs');

const path = 'src/App.tsx';
const original = readFileSync(path, 'utf8');

const checklistReplacement = [
  "  const handleDownloadChecklistPdf = async () => {",
  "    const { doc, fontReady } = await createPdfDoc();",
  "",
  "    doc.setFontSize(16);",
  "    let y = 60;",
  "    writePdfText(doc, clinic.nameAr ?? clinic.name, pdfMarginX, y);",
  "",
  "    y += 22;",
  "    writePdfText(doc, \"U,O\\u0015O\\u00ddU.Oc O\\u0015U,O\\u00a6O-U,U, O\\u0015U,O\\u0153U^U,USOc\", pdfMarginX, y);",
  "",
  "    doc.setFont(fontReady ? 'Tajawal' : 'helvetica', 'normal');",
  "    doc.setFontSize(12);",
  "",
  "    y += 24;",
  "    checklistItems.forEach((item, idx) => {",
  "      writePdfText(doc, `${idx + 1}. ${item}`, pdfMarginX, y);",
  "      y += 20;",
  "      if (y > 760) {",
  "        doc.addPage();",
  "        y = 64;",
  "      }",
  "    });",
  "",
  "    doc.save('ait-checklist.pdf');",
  "  };",
].join('\n');

const slideReplacement = [
  "  const handleSlidePdf = async () => {",
  "    const { doc, fontReady } = await createPdfDoc();",
  "",
  "    doc.setFontSize(18);",
  "    let y = 60;",
  "    writePdfText(doc, clinic.nameAr ?? clinic.name, pdfMarginX, y);",
  "",
  "    y += 22;",
  "    writePdfText(doc, \"O1O\\u00f1O\\u0014 O\\u0015U,O'O\\u00f1O\\u0015O\\u00ddO- - U.U,OrO\\u00e6 U+O\\u00e6US\", pdfMarginX, y);",
  "",
  "    doc.setFont(fontReady ? 'Tajawal' : 'helvetica', 'normal');",
  "    doc.setFontSize(12);",
  "",
  "    y += 24;",
  "    slides.forEach((s) => {",
  "      writePdfText(doc, s.title, pdfMarginX, y);",
  "      y += 18;",
  "      writePdfText(doc, s.body, pdfMarginX + 12, y, { maxWidth: 500 });",
  "      y += 36;",
  "      if (y > 760) {",
  "        doc.addPage();",
  "        y = 64;",
  "      }",
  "    });",
  "",
  "    doc.save('slides-summary.pdf');",
  "  };",
].join('\n');

const updated = original
  .replace(/const handleDownloadChecklistPdf[\s\S]*?doc\.save\('ait-checklist\.pdf'\);\r?\n  };/, checklistReplacement)
  .replace(/const handleSlidePdf[\s\S]*?doc\.save\('slides-summary\.pdf'\);\r?\n  };/, slideReplacement);

if (updated === original) {
  throw new Error('Failed to update PDF handlers');
}

writeFileSync(path, updated, 'utf8');
