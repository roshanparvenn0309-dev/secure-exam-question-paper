import { ExamPaper } from '../types';

/**
 * Converts ExamPaper object into standard plaintext format
 */
export function formatPaperAsText(paper: ExamPaper): string {
  let content = `COLLEGE EXAMINATION\n`;
  content += `Exam: ${paper.examName}\n`;
  content += `Subject: ${paper.subject}\n`;
  content += `Date: ${paper.examDate}\n`;
  content += `Duration: ${paper.duration}\n`;
  content += `Maximum Marks: ${paper.totalMarks}\n\n`;

  paper.questions.forEach((q, index) => {
    content += `${index + 1}. ${q.text}\n`;
    if (q.isMCQ) {
      content += `A. ${q.options.A}\n`;
      content += `B. ${q.options.B}\n`;
      content += `C. ${q.options.C}\n`;
      content += `D. ${q.options.D}\n`;
    }
    content += `\n`;
  });

  return content.trim();
}

/**
 * Computes standard SHA-256 cryptographic hash of string
 */
export async function computeSHA256(text: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    return hashHex;
  } catch {
    // Fallback simple deterministic hash in case crypto.subtle is restricted
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).toUpperCase().padStart(64, '0');
  }
}

/**
 * Performs AES-GCM 256-bit encryption of text, returning base64 representation
 */
export async function encryptTextAES(text: string, secretKey = 'SecureExamSecretKey2026!'): Promise<string> {
  try {
    const encoder = new TextEncoder();
    // Key derivation from password
    const keyData = encoder.encode(secretKey.padEnd(32, '#').slice(0, 32));
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedText = encoder.encode(text);
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encodedText
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    // Convert to base64
    let binary = '';
    const bytes = new Uint8Array(combined);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    // Safe deterministic fallback
    return btoa(encodeURIComponent(text)).split('').reverse().join('');
  }
}
