import React, { useState, useEffect } from 'react';
import { ExamPaper } from '../types';
import { computeSHA256, formatPaperAsText } from '../utils/crypto';

interface IntegrityActivityProps {
  paper: ExamPaper;
  onProceedToFinal: () => void;
  onBackToEncrypt: () => void;
}

export const IntegrityActivity: React.FC<IntegrityActivityProps> = ({
  paper,
  onProceedToFinal,
  onBackToEncrypt,
}) => {
  const [originalHash, setOriginalHash] = useState<string>('');
  const [currentHash, setCurrentHash] = useState<string>('');
  const [isModified, setIsModified] = useState<boolean>(false);
  const [modifiedQuestionText, setModifiedQuestionText] = useState<string>('');
  const [hasRestoredOnce, setHasRestoredOnce] = useState<boolean>(false);

  // Initialize original hash
  useEffect(() => {
    async function initHashes() {
      const originalText = formatPaperAsText(paper);
      const hash = await computeSHA256(originalText);
      setOriginalHash(hash);
      setCurrentHash(hash);
      setIsModified(false);
      setHasRestoredOnce(false);
    }
    initHashes();
  }, [paper]);

  const handleSimulateModification = async () => {
    // Introduce a subtle modification: e.g. altering Question 1's wording
    const originalText = formatPaperAsText(paper);
    const tamperedText = originalText.replace(
      paper.questions[0]?.text || '',
      (paper.questions[0]?.text || 'Exam Question') + ' [TAMPERED / UNAUTHORIZED CHANGE]'
    );
    setModifiedQuestionText((paper.questions[0]?.text || '') + ' [TAMPERED / UNAUTHORIZED CHANGE]');

    // Compute new hash for the tampered paper
    const tamperedHash = await computeSHA256(tamperedText);
    setCurrentHash(tamperedHash);
    setIsModified(true);
  };

  const handleRestorePaper = async () => {
    // Restore back to original hash
    const originalText = formatPaperAsText(paper);
    const restoredHash = await computeSHA256(originalText);
    setCurrentHash(restoredHash);
    setIsModified(false);
    setHasRestoredOnce(true);
  };

  const isHashMatching = originalHash && currentHash && originalHash === currentHash;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      {/* Top Header */}
      <div className="border-b border-[#E5E2DC] pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#736B63] font-mono">
            Activity 03 · Integrity
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E1B18] mt-1">
            🛡️ CHECK QUESTION PAPER INTEGRITY
          </h2>
        </div>
        <button
          onClick={onBackToEncrypt}
          className="text-xs font-semibold text-[#4A1521] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>←</span>
          <span>Back to Encryption</span>
        </button>
      </div>

      {/* Conceptual Explanation */}
      <div className="bg-white border border-[#E5E2DC] p-6 mb-8">
        <p className="text-base sm:text-lg font-serif italic text-[#4A1521] leading-relaxed">
          “Hashing creates a unique value for the question paper. If the paper is changed, the hash value will also change.”
        </p>
        <p className="text-xs text-[#736B63] mt-2">
          SHA-256 (Secure Hash Algorithm 256-bit) produces a cryptographic fingerprint of the exact document contents.
        </p>
      </div>

      {/* Hash Comparison Box */}
      <div className="bg-white border border-[#E5E2DC] p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#E5E2DC]">
          {/* Original Hash */}
          <div className="bg-[#FAF9F7] border border-[#E5E2DC] p-5">
            <span className="text-xs uppercase tracking-wider text-[#736B63] font-semibold block mb-2">
              Original Hash:
            </span>
            <div className="font-mono text-sm md:text-base font-bold text-[#1E1B18] break-all">
              {originalHash ? `${originalHash.slice(0, 10)}...` : 'Computing...'}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#8C847B] break-all">
              Full: {originalHash || '...'}
            </div>
            <div className="mt-3 text-xs text-[#736B63]">
              Calculated when author finalized the paper.
            </div>
          </div>

          {/* Current Hash */}
          <div
            className={`border p-5 transition-colors ${
              isModified
                ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                : 'bg-[#FAF9F7] border-[#E5E2DC]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#736B63] font-semibold">
                Current Hash:
              </span>
              {isModified ? (
                <span className="text-xs text-[#991B1B] font-semibold">MISMATCH</span>
              ) : (
                <span className="text-xs text-[#166534] font-semibold">MATCH</span>
              )}
            </div>
            <div
              className={`font-mono text-sm md:text-base font-bold break-all ${
                isModified ? 'text-[#991B1B]' : 'text-[#1E1B18]'
              }`}
            >
              {currentHash ? `${currentHash.slice(0, 10)}...` : 'Computing...'}
            </div>
            <div className="mt-2 text-[11px] font-mono text-[#8C847B] break-all">
              Full: {currentHash || '...'}
            </div>
            <div className="mt-3 text-xs text-[#736B63]">
              Dynamically evaluated from current paper state.
            </div>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="pt-6">
          {!isModified ? (
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-[#166534]">✓</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#166534]">
                    {hasRestoredOnce ? '✓ INTEGRITY VERIFIED' : '✓ QUESTION PAPER IS SAFE'}
                  </h3>
                  <p className="text-xs text-[#15803D] mt-0.5">
                    Original hash matches current hash bit-for-bit. No tampering has occurred.
                  </p>
                </div>
              </div>

              {/* Simulation button */}
              <button
                onClick={handleSimulateModification}
                className="px-6 py-2.5 bg-[#4A1521] hover:bg-[#380F18] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0"
              >
                SIMULATE MODIFICATION
              </button>
            </div>
          ) : (
            <div className="bg-[#FEF2F2] border border-[#F87171] p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl text-[#991B1B]">⚠️</span>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#991B1B]">
                    ⚠️ QUESTION PAPER MODIFIED
                  </h3>
                  <p className="text-xs font-semibold text-[#B91C1C] mt-0.5">
                    “The hash values are different, which means the question paper content has changed.”
                  </p>
                </div>
              </div>

              {/* Tampered snippet preview */}
              <div className="bg-white border border-[#FECACA] p-3 text-xs font-mono text-[#7F1D1D] mb-4">
                <strong>Detected Change in Document:</strong>
                <div className="mt-1 italic">
                  &quot;{modifiedQuestionText}&quot;
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-[#FCA5A5]">
                <span className="text-xs text-[#991B1B]">
                  Cryptographic integrity failed. Document has been rejected.
                </span>
                <button
                  onClick={handleRestorePaper}
                  className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#38332E] text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  RESTORE PAPER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Check / Proceed to Final Page */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E5E2DC]">
        <div>
          <h4 className="font-serif text-lg font-bold text-[#1E1B18]">Conclude Security Assessment</h4>
          <p className="text-xs text-[#736B63] mt-0.5">
            Review final cybersecurity compliance summary and verification certificate.
          </p>
        </div>
        <button
          onClick={onProceedToFinal}
          disabled={isModified}
          className={`w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 ${
            isModified
              ? 'bg-[#D1CCC5] text-[#736B63] cursor-not-allowed'
              : 'bg-[#4A1521] hover:bg-[#380F18] text-white cursor-pointer'
          }`}
        >
          <span>🔐</span>
          <span>VIEW FINAL STATUS</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
