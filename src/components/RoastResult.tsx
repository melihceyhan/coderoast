"use client";

import { motion } from "framer-motion";
import { Share2, Copy, RefreshCw, Twitter, Check } from "lucide-react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { CHARACTERS } from "./CharacterSelector";

interface RoastResultProps {
  roast: string;
  severity: number;
  characterId: string;
  onRoastAgain: () => void;
}

export default function RoastResult({
  roast,
  severity,
  characterId,
  onRoastAgain,
}: RoastResultProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const character = CHARACTERS.find((c) => c.id === characterId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "coderoast-card.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }

    setDownloading(false);
  };

  const handleShareTwitter = () => {
    const text = `🔥 My code just got ROASTED by ${character?.name}!\n\nSeverity: ${severity}/10\n\nTry it yourself at coderoast.ai`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const getSeverityLabel = (score: number) => {
    if (score <= 2) return "Mild Burn 🌶️";
    if (score <= 4) return "Spicy 🌶️🌶️";
    if (score <= 6) return "Hot Sauce 🔥";
    if (score <= 8) return "Volcanic 🌋";
    return "NUCLEAR ☢️";
  };

  const getSeverityColor = (score: number) => {
    if (score <= 3) return "#00ff88";
    if (score <= 5) return "#ffff00";
    if (score <= 7) return "#ff8800";
    return "#ff0000";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="mt-8"
    >
      {/* Shareable Card */}
      <div
        ref={cardRef}
        className="result-card rounded-xl p-6 md:p-8"
        style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a1a 100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{character?.emoji}</span>
            <div>
              <h3
                className="font-bold text-lg"
                style={{ color: character?.color, fontFamily: "Orbitron" }}
              >
                {character?.name}
              </h3>
              <p className="text-xs text-gray-400">says...</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold" style={{ fontFamily: "Orbitron" }}>
              🔥 ROAST
            </div>
          </div>
        </div>

        {/* Roast Text */}
        <div className="bg-black/40 rounded-lg p-6 mb-6 border border-white/10">
          <p className="text-lg md:text-xl leading-relaxed italic text-gray-200">
            &ldquo;{roast}&rdquo;
          </p>
        </div>

        {/* Severity Meter */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Roast Severity</span>
            <span
              className="font-bold text-lg"
              style={{ color: getSeverityColor(severity), fontFamily: "Orbitron" }}
            >
              {severity}/10 - {getSeverityLabel(severity)}
            </span>
          </div>
          <div className="severity-bar">
            <motion.div
              className="severity-fill"
              initial={{ width: 0 }}
              animate={{ width: `${severity * 10}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Branding */}
        <div className="text-center pt-4 border-t border-white/10">
          <span
            className="text-sm"
            style={{ color: "var(--neon-pink)", fontFamily: "Orbitron" }}
          >
            coderoast.ai
          </span>
          <span className="text-gray-500 text-xs ml-2">
            Where bad code meets brutal honesty
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShareTwitter}
          className="flex items-center gap-2 px-6 py-3 bg-[#1da1f2] rounded-lg font-bold hover:bg-[#1a8cd8] transition-colors"
        >
          <Twitter size={18} />
          Share on X
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors"
        >
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
          {copied ? "Copied!" : "Copy Text"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          <Share2 size={18} />
          {downloading ? "Generating..." : "Save Card"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRoastAgain}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-orange)] rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          <RefreshCw size={18} />
          Roast Again
        </motion.button>
      </div>
    </motion.div>
  );
}

