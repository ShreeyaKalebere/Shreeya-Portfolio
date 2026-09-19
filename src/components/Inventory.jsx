import React, { useState } from 'react';
import { Backpack, Sparkles } from 'lucide-react';
import { SKILLS, SKILL_CATEGORIES } from '../data/skills';
import { sound } from '../utils/audio';
import InventoryItem from './InventoryItem';

export default function Inventory() {
  const [activeCategory, setActiveCategory] = useState('all');

  const hotbarSkills = SKILLS.filter(s => s.hotbar).sort((a, b) => (a.slot || 99) - (b.slot || 99));

  const filteredSkills = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  const handleTabChange = (catId) => {
    sound.playClick();
    setActiveCategory(catId);
  };

  return (
    <div className="inventory-wrapper cyber-corners" aria-label="Technical Skills Inventory">
      {/* Top Bar with Title and Category Tabs */}
      <div className="inventory-topbar">
        <div className="inventory-title-wrap">
          <Backpack size={22} color="var(--matrix-green)" />
          <div className="inventory-title">TECHNICAL INVENTORY</div>
        </div>

        <div className="inventory-tabs" role="tablist" aria-label="Skill Filter Categories">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`inventory-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
              data-cursor="pointer"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 9-Slot Hotbar Section */}
      <div className="hotbar-section">
        <div className="hotbar-label">
          <span>HOTBAR // QUICK ACCESS SLOTS (1 - 9)</span>
          <span style={{ color: 'var(--matrix-green)' }}>[HOVER FOR TELEMETRY]</span>
        </div>
        <div className="hotbar-grid" role="list">
          {hotbarSkills.map((skill, idx) => (
            <InventoryItem key={skill.id} skill={skill} slotNumber={idx + 1} />
          ))}
        </div>
      </div>

      {/* Full Inventory Matrix Grid */}
      <div>
        <div className="hotbar-label" style={{ marginBottom: '14px' }}>
          <span>STORED CAPABILITIES // {filteredSkills.length} ARTIFACTS</span>
          <span>NO FABRICATED METRICS</span>
        </div>
        <div className="inventory-slots-grid" role="list">
          {filteredSkills.map((skill) => (
            <InventoryItem key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
