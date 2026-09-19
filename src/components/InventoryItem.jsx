import React, { useState } from 'react';
import {
  Terminal,
  Coffee,
  Cpu,
  Code2,
  Database,
  Binary,
  Boxes,
  HardDrive,
  Server,
  Network,
  Atom,
  FileCode,
  Layers,
  Share2,
  GitBranch,
  Brain,
  Eye,
  Crosshair,
  Scan,
  Flame,
  Bot,
  Zap,
  Box,
  HelpCircle
} from 'lucide-react';
import { sound } from '../utils/audio';

const ICON_MAP = {
  Terminal,
  Coffee,
  Cpu,
  Code2,
  Database,
  Binary,
  Boxes,
  HardDrive,
  Server,
  Network,
  Atom,
  FileCode,
  Layers,
  Share2,
  GitBranch,
  Brain,
  Eye,
  Crosshair,
  Scan,
  Flame,
  Bot,
  Zap,
  Box
};

export default function InventoryItem({ skill, slotNumber }) {
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = ICON_MAP[skill.icon] || HelpCircle;

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playInventoryPop();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`inventory-slot slot-${skill.rarity || 'common'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.categoryLabel}`}
    >
      {slotNumber !== undefined && (
        <span className="slot-number">{slotNumber}</span>
      )}

      <div className="slot-icon-wrap">
        <IconComponent size={24} />
      </div>

      {isHovered && (
        <div className="slot-tooltip" role="tooltip">
          <div className="tooltip-header">{skill.name}</div>
          <div className="tooltip-category">{skill.categoryLabel}</div>
          <div className="tooltip-desc">{skill.description}</div>
          <div className="tooltip-rarity">
            <span>VOXEL ITEM: {skill.minecraftItem}</span>
            <span style={{ textTransform: 'uppercase' }}>{skill.rarity}</span>
          </div>
        </div>
      )}
    </div>
  );
}
