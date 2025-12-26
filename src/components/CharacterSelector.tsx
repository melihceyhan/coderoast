"use client";

import { motion } from "framer-motion";

export interface Character {
  id: string;
  name: string;
  emoji: string;
  description: string;
  style: string;
  color: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "gordon",
    name: "Gordon Ramsay",
    emoji: "👨‍🍳",
    description: "Brutal kitchen-style roasts",
    style: "Angry, sarcastic, uses cooking metaphors",
    color: "#ff4444",
  },
  {
    id: "yoda",
    name: "Yoda",
    emoji: "🧙",
    description: "Wise yet savage burns",
    style: "Inverted sentences, ancient wisdom with burns",
    color: "#00ff88",
  },
  {
    id: "shakespeare",
    name: "Shakespeare",
    emoji: "🎭",
    description: "Poetic destructions",
    style: "Elizabethan English, dramatic monologues",
    color: "#9d00ff",
  },
  {
    id: "turkbaba",
    name: "Türk Baba",
    emoji: "👴",
    description: "Disappointed Turkish father",
    style: "Turkish, disappointed, compares to cousins",
    color: "#ff8800",
  },
  {
    id: "pirate",
    name: "Captain Blackbeard",
    emoji: "🏴‍☠️",
    description: "Salty sea dog insults",
    style: "Pirate speak, nautical metaphors",
    color: "#00ffff",
  },
  {
    id: "drill",
    name: "Drill Sergeant",
    emoji: "🎖️",
    description: "Military-grade criticism",
    style: "Shouting, military jargon, pushup references",
    color: "#88ff00",
  },
];

interface CharacterSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function CharacterSelector({
  selected,
  onSelect,
}: CharacterSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {CHARACTERS.map((character, index) => (
        <motion.button
          key={character.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(character.id)}
          className={`character-card rounded-lg text-center ${
            selected === character.id ? "selected" : ""
          }`}
          style={{
            borderColor:
              selected === character.id ? character.color : undefined,
          }}
        >
          <div className="text-4xl mb-2">{character.emoji}</div>
          <div
            className="font-bold text-sm mb-1"
            style={{ color: character.color }}
          >
            {character.name}
          </div>
          <div className="text-xs text-gray-400">{character.description}</div>
        </motion.button>
      ))}
    </div>
  );
}

