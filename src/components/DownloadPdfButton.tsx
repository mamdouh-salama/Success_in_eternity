'use client';

import { Download } from 'lucide-react';

interface DownloadPdfButtonProps {
  title: string;
  content: string;
  date?: string;
  category?: string;
  pdfUrl?: string;
}

export default function DownloadPdfButton({ title, content, date, category, pdfUrl }: DownloadPdfButtonProps) {
  const handleDownload = () => {
    // If a direct PDF file is available, just open it
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return;
    }
    // Build a clean HTML document for printing as PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Process content into paragraphs with Arabic detection
    const arabicRe = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
    
    const htmlParagraphs = paragraphs.map(para => {
      const chars = [...para.replace(/\s/g, '')];
      const arabicCount = chars.filter(c => arabicRe.test(c)).length;
      const ratio = chars.length > 0 ? arabicCount / chars.length : 0;
      
      if (ratio > 0.85) {
        return `<div style="direction:rtl;text-align:right;font-family:'Noto Naskh Arabic',serif;font-size:16px;line-height:2.2;padding:12px 16px;margin:16px 0;border-right:3px solid #B8860B;background:#F7F6F3;">${para}</div>`;
      }
      
      if (arabicRe.test(para)) {
        // Mixed — wrap Arabic runs in RTL spans
        const processed = para.replace(
          /([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\u0020\u060C\u061B\u061F\u0640\u064B-\u065F\u0670]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF])/g,
          '<span style="font-family:\'Noto Naskh Arabic\',serif;font-size:15px;line-height:2;direction:rtl;unicode-bidi:embed;">$1</span>'
        );
        return `<p style="line-height:1.8;margin-bottom:12px;">${processed}</p>`;
      }
      
      return `<p style="line-height:1.8;margin-bottom:12px;">${para}</p>`;
    }).join('\n');

    const formattedDate = date
      ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title} — Success in Eternity</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page { margin: 1in 0.85in; }
    body {
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      color: #1C1917;
      max-width: 100%;
      margin: 0;
      padding: 0;
    }
    .header {
      border-bottom: 2px solid #0E7B7F;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .site-name {
      font-family: 'Playfair Display', serif;
      font-size: 12px;
      color: #0E7B7F;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
      margin: 0 0 8px 0;
      color: #1C1917;
    }
    .meta {
      font-size: 12px;
      color: #6B6560;
    }
    .meta span + span::before {
      content: '  ·  ';
    }
    .content { margin-top: 20px; }
    .footer {
      margin-top: 40px;
      padding-top: 16px;
      border-top: 1px solid #DDD9D5;
      font-size: 10px;
      color: #6B6560;
      text-align: center;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="site-name">Success in Eternity</div>
    <h1>${title}</h1>
    <div class="meta">
      ${formattedDate ? `<span>${formattedDate}</span>` : ''}
      ${category ? `<span>${category}</span>` : ''}
      <span>Dr. Mamdouh Salama</span>
    </div>
  </div>
  <div class="content">
    ${htmlParagraphs}
  </div>
  <div class="footer">
    Success in Eternity — Islamic Lectures by Dr. Mamdouh Salama<br>
    successineternity.com
  </div>
  <script>
    // Wait for fonts to load, then trigger print
    document.fonts.ready.then(function() {
      setTimeout(function() { window.print(); }, 300);
    });
  </script>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handleDownload}
      className="btn-primary cursor-pointer"
    >
      <Download size={18} />
      Download PDF
    </button>
  );
}
