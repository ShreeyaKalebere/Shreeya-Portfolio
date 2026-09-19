import React, { useState } from 'react';
import { Pickaxe, Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function InteractiveMiniMine() {
  const [emeralds, setEmeralds] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [lastMined, setLastMined] = useState('');
  const [shakeBlock, setShakeBlock] = useState('');

  const handleMineEmerald = () => {
    sound.playInventoryPop();
    setEmeralds(prev => {
      const next = prev + 1;
      if (next % 5 === 0) {
        sound.playQuestChime();
        try {
          confetti({ particleCount: 30, spread: 50, colors: ['#10b981', '#34d399', '#ffffff'] });
        } catch (e) {}
      }
      return next;
    });
    setLastMined('+1 Emerald Gem!');
    setShakeBlock('emerald');
    setTimeout(() => setShakeBlock(''), 200);
  };

  const handleMineDiamond = () => {
    sound.playClick();
    setDiamonds(prev => {
      const next = prev + 1;
      if (next % 5 === 0) {
        sound.playQuestChime();
        try {
          confetti({ particleCount: 30, spread: 50, colors: ['#0284c7', '#38bdf8', '#ffffff'] });
        } catch (e) {}
      }
      return next;
    });
    setLastMined('+1 Diamond Crystal!');
    setShakeBlock('diamond');
    setTimeout(() => setShakeBlock(''), 200);
  };

  const handleReset = () => {
    sound.playClick();
    setEmeralds(0);
    setDiamonds(0);
    setLastMined('');
  };

  const totalXP = emeralds * 15 + diamonds * 25;

  return (
    <div className="mini-mine-container container" aria-label="Interactive Minecraft Mini-Mine">
      <div className="mini-mine-card cyber-corners">
        <div className="mini-mine-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="mine-pickaxe-badge">
              <Pickaxe size={18} color="#059669" />
            </div>
            <div>
              <span className="mini-mine-badge">INTERACTIVE MINECRAFT SANCTUARY</span>
              <h3 className="mini-mine-title">Mine Voxel Ores & Gather Resources</h3>
            </div>
          </div>

          <div className="mini-mine-stats">
            <span className="stat-pill emerald">
              💚 {emeralds} Emeralds
            </span>
            <span className="stat-pill diamond">
              💎 {diamonds} Diamonds
            </span>
            <span className="stat-pill xp">
              ⚡ {totalXP} XP
            </span>
            {(emeralds > 0 || diamonds > 0) && (
              <button
                type="button"
                className="reset-mine-btn"
                onClick={handleReset}
                title="Reset mined stats"
                aria-label="Reset Ores"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Clickable Voxel Ore Blocks */}
        <div className="mini-mine-interactive-row">
          <div className="ore-block-wrapper">
            <button
              type="button"
              className={`voxel-ore-block emerald-ore ${shakeBlock === 'emerald' ? 'shake' : ''}`}
              onClick={handleMineEmerald}
              aria-label="Mine Emerald Ore Block"
            >
              <div className="ore-texture">
                <span className="ore-gem-speck g1" />
                <span className="ore-gem-speck g2" />
                <span className="ore-gem-speck g3" />
                <span className="ore-gem-speck g4" />
              </div>
              <span className="ore-block-label">EMERALD ORE</span>
            </button>
            <span className="ore-instruction">Click to Mine</span>
          </div>

          <div className="ore-block-wrapper">
            <button
              type="button"
              className={`voxel-ore-block diamond-ore ${shakeBlock === 'diamond' ? 'shake' : ''}`}
              onClick={handleMineDiamond}
              aria-label="Mine Diamond Ore Block"
            >
              <div className="ore-texture">
                <span className="ore-gem-speck d1" />
                <span className="ore-gem-speck d2" />
                <span className="ore-gem-speck d3" />
                <span className="ore-gem-speck d4" />
              </div>
              <span className="ore-block-label">DIAMOND ORE</span>
            </button>
            <span className="ore-instruction">Click to Mine</span>
          </div>

          <div className="mini-mine-info-box">
            <div className="info-box-status">
              {lastMined ? (
                <span className="mined-toast animate-bounce">{lastMined}</span>
              ) : (
                <span>Interactive Minecraft sandbox: Click ores to collect experience!</span>
              )}
            </div>
            <p className="info-box-desc">
              Just like mining resources in Minecraft, Shreeya builds software and AI systems block-by-block with engineering precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
