import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  FileText, 
  Scan, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Terminal,
  Sliders,
  Send,
  Copy,
  Check,
  Eye,
  Camera
} from 'lucide-react';
import { sound } from '../../utils/audio';

/* =========================================================================
   1. ROADCARE AI — EDGE VISION ROAD DAMAGE SIMULATOR (YOLO11 & BYTETRACK)
   ========================================================================= */
export const RoadCareSimulator: React.FC = () => {
  const [isDetecting, setIsDetecting] = useState(true);
  const [selectedDistress, setSelectedDistress] = useState<string | null>("DEF_#104");
  const [scanTick, setScanTick] = useState(0);
  const [confThreshold, setConfThreshold] = useState(75);
  const [activeCam, setActiveCam] = useState<'front' | 'survey' | 'night'>('front');
  const [dispatchedTickets, setDispatchedTickets] = useState<Record<string, string>>({});
  const [fps, setFps] = useState(30.2);
  const [latency, setLatency] = useState(28.4);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanTick(prev => (prev + 1) % 100);
      setFps(+(29.6 + Math.random() * 1.4).toFixed(1));
      setLatency(+(27.8 + Math.random() * 2.2).toFixed(1));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const allObjects = [
    { id: "DEF_#104", type: "Cavity (Pothole)", confVal: 94, conf: "94.8%", severity: "HIGH", x: 28, y: 46, w: 28, h: 22, color: "#FFD83D", gps: "16.6913° N, 74.2437° E", size: "0.62m² · Depth: 9cm" },
    { id: "DEF_#105", type: "Alligator Fatigue Crack", confVal: 89, conf: "89.3%", severity: "MEDIUM", x: 62, y: 36, w: 30, h: 34, color: "#FB923C", gps: "16.6918° N, 74.2441° E", size: "1.45m² · Spalling" },
    { id: "DEF_#106", type: "Longitudinal Fracture", confVal: 81, conf: "81.1%", severity: "LOW", x: 12, y: 72, w: 22, h: 18, color: "#4ADE80", gps: "16.6925° N, 74.2448° E", size: "0.35m² · Sub-grade stress" }
  ];

  const visibleObjects = allObjects.filter(obj => obj.confVal >= confThreshold);
  const activeObj = allObjects.find(o => o.id === selectedDistress) || allObjects[0];

  const handleSelectObject = (id: string) => {
    setSelectedDistress(id);
    sound.playRadarPing();
  };

  const handleDispatchTicket = (id: string) => {
    sound.playSuccessChime();
    const tktNum = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setDispatchedTickets(prev => ({ ...prev, [id]: tktNum }));
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid #262626', padding: '16px', position: 'relative' }}>
      {/* Top Telemetry & Control Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#FFD83D' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFD83D', boxShadow: '0 0 8px #FFD83D', animation: isDetecting ? 'pulseBeacon 1.2s infinite' : 'none' }} />
          <span>YOLO11 INFERENCE: {isDetecting ? 'STREAMING' : 'PAUSED'} // {latency}ms · {fps} FPS</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => {
              setIsDetecting(prev => !prev);
              sound.playClick();
            }}
            className="swiss-badge"
            style={{ cursor: 'pointer', fontSize: '0.65rem', background: isDetecting ? 'rgba(255, 216, 61, 0.15)' : 'transparent', color: isDetecting ? '#FFD83D' : '#888' }}
          >
            {isDetecting ? 'PAUSE INFERENCE' : 'RESUME STREAM'}
          </button>
        </div>
      </div>

      {/* Camera Mode Selectors & Confidence Threshold Slider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px', background: '#121212', padding: '8px 12px', border: '1px solid #222' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['front', 'survey', 'night'] as const).map(cam => (
            <button
              key={cam}
              type="button"
              onClick={() => {
                setActiveCam(cam);
                sound.playClick();
              }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                padding: '3px 8px',
                background: activeCam === cam ? '#FFD83D' : 'transparent',
                color: activeCam === cam ? '#000' : '#888',
                border: '1px solid #333',
                cursor: 'pointer'
              }}
            >
              {cam === 'front' ? 'CAM_01: DASHCAM' : cam === 'survey' ? 'CAM_02: HIGHWAY' : 'CAM_03: NIGHT HUD'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#888' }}>
          <span>CONF THRESHOLD: <strong style={{ color: '#FFD83D' }}>{confThreshold}%</strong></span>
          <input
            type="range"
            min="60"
            max="95"
            value={confThreshold}
            onChange={(e) => setConfThreshold(Number(e.target.value))}
            style={{ width: '80px', accentColor: '#FFD83D', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Simulated Dashcam Screen with Bounding Boxes */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '16 / 9', 
          backgroundColor: activeCam === 'night' ? '#041008' : '#111111', 
          border: `1px solid ${activeCam === 'night' ? '#166534' : '#333'}`, 
          overflow: 'hidden',
          backgroundImage: activeCam === 'night' 
            ? 'linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Animated Laser Scanning Line */}
        {isDetecting && (
          <div 
            style={{
              position: 'absolute',
              top: `${scanTick}%`,
              left: 0,
              width: '100%',
              height: '2px',
              backgroundColor: activeCam === 'night' ? 'rgba(74, 222, 128, 0.7)' : 'rgba(255, 216, 61, 0.7)',
              boxShadow: activeCam === 'night' ? '0 0 12px #4ADE80' : '0 0 12px #FFD83D',
              pointerEvents: 'none',
              zIndex: 3
            }}
          />
        )}

        {/* Center Reticle & GPS Overlay */}
        <div style={{ position: 'absolute', top: '10px', left: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: activeCam === 'night' ? '#4ADE80' : '#888', zIndex: 4 }}>
          {activeCam === 'front' ? 'CAM_01 [DASHCAM FRONT] · 1080p' : activeCam === 'survey' ? 'CAM_02 [SURVEY DRONE] · 4K' : 'CAM_03 [INFRARED NIGHT]'} · GPS: 16.6913° N, 74.2437° E
        </div>

        {/* Perspective Road Markings */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.35 }}>
          <line x1="0" y1="92%" x2="50%" y2="28%" stroke={activeCam === 'night' ? '#4ADE80' : '#FFD83D'} strokeWidth="1" strokeDasharray="4 4" />
          <line x1="100%" y1="92%" x2="50%" y2="28%" stroke={activeCam === 'night' ? '#4ADE80' : '#FFD83D'} strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50%" y1="92%" x2="50%" y2="28%" stroke="#FFF" strokeWidth="1" strokeDasharray="6 6" />
        </svg>

        {/* Detected Bounding Boxes (YOLO11 + ByteTrack) */}
        {isDetecting && visibleObjects.map((obj) => {
          const isSelected = selectedDistress === obj.id;
          return (
            <div
              key={obj.id}
              onClick={() => handleSelectObject(obj.id)}
              style={{
                position: 'absolute',
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                width: `${obj.w}%`,
                height: `${obj.h}%`,
                border: `2px solid ${obj.color}`,
                boxShadow: isSelected ? `0 0 16px ${obj.color}` : `0 0 6px ${obj.color}40`,
                backgroundColor: `${obj.color}15`,
                cursor: 'pointer',
                zIndex: 5,
                transition: 'all 0.15s ease'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '-2px',
                  backgroundColor: obj.color,
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  padding: '1px 5px',
                  whiteSpace: 'nowrap'
                }}
              >
                {obj.id} // {obj.type} [{obj.conf}]
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Defect Triage & Dispatch HUD Drawer */}
      {activeObj && (
        <div style={{ marginTop: '12px', padding: '12px', background: '#121212', border: `1px solid ${activeObj.color}55`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: activeObj.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>INSPECTING: {activeObj.id} // {activeObj.type}</span>
              <span style={{ fontSize: '0.6rem', padding: '1px 5px', background: `${activeObj.color}22`, border: `1px solid ${activeObj.color}` }}>
                {activeObj.severity} PRIORITY
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: '#888', marginTop: '4px' }}>
              GPS: {activeObj.gps} · EST. PROFILE: {activeObj.size}
            </div>
          </div>

          <div>
            {dispatchedTickets[activeObj.id] ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#4ADE80' }}>
                <CheckCircle2 size={14} />
                <span>DISPATCHED // {dispatchedTickets[activeObj.id]} (LEAFLET HUD LOGGED)</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleDispatchTicket(activeObj.id)}
                style={{
                  background: activeObj.color,
                  color: '#0A0A0A',
                  border: 'none',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Send size={12} />
                <span>DISPATCH MUNICIPAL REPAIR TICKET</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   2. SILENT ALARM — KEYSTROKE KINEMATICS & DISTRESS SIMULATOR
   ========================================================================= */
export const SilentAlarmSimulator: React.FC = () => {
  const [typingInput, setTypingInput] = useState('');
  const [dwellTime, setDwellTime] = useState(98);
  const [flightTime, setFlightTime] = useState(142);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [distressScore, setDistressScore] = useState(0.18);
  const [scenarioMode, setScenarioMode] = useState<'calm' | 'distress'>('calm');
  const [notification, setNotification] = useState<string | null>(null);
  const [keystrokeWave, setKeystrokeWave] = useState<number[]>([40, 45, 42, 38, 44, 48, 41, 39, 43, 40]);

  const simulateMode = (mode: 'calm' | 'distress') => {
    setScenarioMode(mode);
    if (mode === 'calm') {
      sound.playClick();
      setDwellTime(95);
      setFlightTime(140);
      setBackspaceCount(1);
      setDistressScore(0.14);
      setNotification(null);
      setKeystrokeWave([38, 42, 40, 44, 41, 39, 43, 42, 40, 39]);
    } else {
      sound.playBlip(320);
      setDwellTime(245);
      setFlightTime(390);
      setBackspaceCount(8);
      setDistressScore(0.88);
      setNotification("Silent Alarm Protocol Triggered: Subtle private breathing nudge activated. Zero keystrokes stored.");
      setKeystrokeWave([85, 22, 94, 18, 88, 30, 92, 15, 90, 25]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypingInput(val);
    sound.playTerminalKey();

    if (val.length < typingInput.length) {
      setBackspaceCount(prev => prev + 1);
    }
    const randomDwell = Math.floor(Math.random() * 40) + 85;
    const randomFlight = Math.floor(Math.random() * 60) + 120;
    setDwellTime(randomDwell);
    setFlightTime(randomFlight);
    setKeystrokeWave(prev => [...prev.slice(1), Math.min(90, Math.floor(randomDwell * 0.4))]);
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid #262626', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#38BDF8' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }} />
          <span>ZERO-KNOWLEDGE TELEMETRY // ISOLATION FOREST + LSTM AUTOENCODER</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => simulateMode('calm')}
            className={`swiss-btn ${scenarioMode === 'calm' ? 'swiss-btn-primary' : ''}`}
            style={{ fontSize: '0.65rem', padding: '4px 10px' }}
          >
            TEST CALM CADENCE
          </button>
          <button
            type="button"
            onClick={() => simulateMode('distress')}
            className={`swiss-btn ${scenarioMode === 'distress' ? 'swiss-btn-accent' : ''}`}
            style={{ fontSize: '0.65rem', padding: '4px 10px', backgroundColor: scenarioMode === 'distress' ? '#38BDF8' : 'transparent', color: scenarioMode === 'distress' ? '#000' : '#FFF' }}
          >
            INJECT DISTRESS SPIKE
          </button>
        </div>
      </div>

      {/* Interactive Typing Test Box */}
      <div style={{ marginBottom: '14px' }}>
        <input
          type="text"
          value={typingInput}
          onChange={handleInputChange}
          placeholder="Type here to test live keystroke kinematics..."
          className="swiss-input"
          style={{ fontSize: '0.8rem', padding: '10px 14px', border: '1px solid #38BDF8' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#71717A' }}>
          <span>* Keystroke content is NEVER captured or transmitted (Strict Zero-Knowledge)</span>
          <span>DWELL: {dwellTime}ms | FLIGHT: {flightTime}ms | BACKSPACES: {backspaceCount}</span>
        </div>
      </div>

      {/* Keystroke Oscilloscope Waveform */}
      <div style={{ height: '54px', background: '#111', border: '1px solid #222', marginBottom: '12px', padding: '4px 8px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '4px', left: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#38BDF8' }}>
          LIVE CADENCE OSCILLOSCOPE (DWELL / FLIGHT RATIO)
        </div>
        <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 50">
          <polyline
            fill="none"
            stroke={distressScore > 0.6 ? '#F87171' : '#38BDF8'}
            strokeWidth="2"
            points={keystrokeWave.map((val, idx) => `${idx * 11},${50 - (val * 0.45)}`).join(' ')}
          />
        </svg>
      </div>

      {/* Live Anomaly Meter & Cadence Graph */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
        <div style={{ padding: '10px 12px', background: '#121212', border: '1px solid #222' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#888', display: 'block', marginBottom: '4px' }}>
            ANOMALY DIVERGENCE SCORE
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: distressScore > 0.6 ? '#F87171' : '#4ADE80', fontFamily: 'var(--font-heading)' }}>
              {(distressScore * 100).toFixed(1)}%
            </span>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: distressScore > 0.6 ? '#F87171' : '#4ADE80' }}>
              {distressScore > 0.6 ? 'HIGH TREMOR ANOMALY' : 'BASELINE NORMAL'}
            </span>
          </div>
        </div>

        <div style={{ padding: '10px 12px', background: '#121212', border: '1px solid #222' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#888', display: 'block', marginBottom: '4px' }}>
            PRIVACY PROTOCOL STATUS
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
            <ShieldCheck size={16} color="#38BDF8" />
            <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ZERO-IDENTITY LOCK // 30-DAY TTL
            </span>
          </div>
        </div>
      </div>

      {/* Simulated Wellness Nudge Notification & Guided Breathing Circle */}
      {notification && (
        <div style={{ padding: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38BDF8', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#38BDF8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} />
            <span>{notification}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.62rem', color: '#93C5FD' }}>PRIVATE BREATHING PACER:</span>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#38BDF8', animation: 'pulseBeacon 2.5s infinite' }} />
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. SONIC FINGERPRINTS — DUAL-MODE ACOUSTIC VECTOR SIMULATOR
   ========================================================================= */
export const SonicFingerprintsSimulator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'celestial' | 'room'>('celestial');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const celestialSources = [
    { name: "Jupiter Decametric Plasma Wave", freq: "20.1 MHz", sim: "98.7%", source: "NASA Voyager 1", baseFreq: 320 },
    { name: "Saturn Kilometric Auroral Emission", freq: "400 kHz", sim: "96.2%", source: "Cassini Orbiter", baseFreq: 440 },
    { name: "Solar Coronal Mass Acoustic Sonification", freq: "1.2 MHz", sim: "94.8%", source: "SOHO Observatory", baseFreq: 220 },
    { name: "Pulsar PSR B1919+21 Cosmic Pulse", freq: "1.337s", sim: "97.1%", source: "Arecibo Radiotelescope", baseFreq: 520 }
  ];

  const roomSources = [
    { name: "Anechoic Sound Chamber", freq: "RT60 0.08s", sim: "99.1%", source: "Acoustic Impulse Matrix", baseFreq: 180 },
    { name: "Lecture Auditorium C-104", freq: "RT60 1.45s", sim: "97.5%", source: "Spatial Room Reverberation", baseFreq: 260 },
    { name: "Glass Partitioned Office", freq: "RT60 0.72s", sim: "95.4%", source: "Boundary Flutter Echo", baseFreq: 350 }
  ];

  const currentList = activeMode === 'celestial' ? celestialSources : roomSources;
  const [activeItem, setActiveItem] = useState(currentList[0]);

  const handleToggleSound = () => {
    sound.setMuted(false);
    setIsPlayingAudio(true);
    sound.playCelestialTone(activeItem.baseFreq, 1.2);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleSelectItem = (item: typeof celestialSources[0]) => {
    setActiveItem(item);
    sound.playClick();
    if (isPlayingAudio) {
      sound.playCelestialTone(item.baseFreq, 0.8);
    }
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid #262626', padding: '16px' }}>
      {/* Header Mode Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#818CF8' }}>
          <Radio size={14} />
          <span>DUAL-MODE ACOUSTIC RETRIEVAL // CHROMADB + LIBROSA</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => { 
              setActiveMode('celestial'); 
              setActiveItem(celestialSources[0]); 
              sound.playClick(); 
            }}
            className={`swiss-badge ${activeMode === 'celestial' ? 'swiss-badge-purple' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.65rem' }}
          >
            MODE 2: NASA CELESTIAL
          </button>
          <button
            type="button"
            onClick={() => { 
              setActiveMode('room'); 
              setActiveItem(roomSources[0]); 
              sound.playClick(); 
            }}
            className={`swiss-badge ${activeMode === 'room' ? 'swiss-badge-purple' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.65rem' }}
          >
            MODE 1: ROOM IMPULSE
          </button>
        </div>
      </div>

      {/* Simulated Animated FFT Spectrogram Bars */}
      <div 
        style={{ 
          height: '110px', 
          backgroundColor: '#121212', 
          border: '1px solid #333', 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '3px', 
          padding: '12px 14px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '8px', left: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#818CF8' }}>
          {activeItem.name} [{activeItem.freq}] · SOURCE: {activeItem.source}
        </div>

        <button
          type="button"
          onClick={handleToggleSound}
          style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            background: isPlayingAudio ? '#818CF8' : '#222',
            color: isPlayingAudio ? '#000' : '#818CF8',
            border: '1px solid #818CF8',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            padding: '2px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Volume2 size={12} />
          <span>{isPlayingAudio ? 'SYNTHESIZING...' : 'LISTEN TO FREQ'}</span>
        </button>

        {Array.from({ length: 36 }).map((_, i) => {
          const height = Math.sin((i * 0.35) + (activeItem.baseFreq * 0.01)) * 35 + 45;
          return (
            <div 
              key={i}
              style={{
                flex: 1,
                height: `${Math.max(12, height)}%`,
                backgroundColor: i % 2 === 0 ? '#818CF8' : '#C084FC',
                opacity: 0.85,
                transition: 'height 0.15s ease',
                borderRadius: '1px'
              }}
            />
          );
        })}
      </div>

      {/* ChromaDB Vector Match Output */}
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {currentList.map(item => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleSelectItem(item)}
              style={{
                background: activeItem.name === item.name ? '#818CF8' : '#1A1A1A',
                color: activeItem.name === item.name ? '#000' : '#FFF',
                border: '1px solid #333',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-mono)',
                padding: '4px 8px',
                cursor: 'pointer'
              }}
            >
              {item.name.slice(0, 20)}...
            </button>
          ))}
        </div>
        <div style={{ color: '#818CF8' }}>
          COSINE SIMILARITY: <strong>{activeItem.sim}</strong> // LATENCY: 12ms
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. RESUMEPILOT AI — LIVE ATS SCORING & AGENTIC OPTIMIZER
   ========================================================================= */
export const ResumePilotSimulator: React.FC = () => {
  const [atsScore, setAtsScore] = useState(94);
  const [selectedRole, setSelectedRole] = useState<'ai' | 'sde' | 'data'>('ai');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);

  const rolePresets = {
    ai: {
      before: "Worked on computer vision models to detect road damage from camera video.",
      after: "Engineered edge vision triage platform using Ultralytics YOLO11 and ByteTrack, achieving 28.4ms inference and preventing redundant civic duplicate logging across 100+ km.",
      score: 96,
      badge: "YOLO11 & BYTETRACK MATCH"
    },
    sde: {
      before: "Built a full stack web app with React and Node to show telemetry and alerts.",
      after: "Architected distributed telemetry dashboard in React 19 and Socket.io with 100% zero-identity data retention, reducing latency by 42% over REST polling.",
      score: 95,
      badge: "DISTRIBUTED WEBSOCKET MATCH"
    },
    data: {
      before: "Stored audio vectors and ran similarity queries using ChromaDB and Python.",
      after: "Benchmarked acoustic similarity retrieval engine indexing 2,400+ NASA radio emissions into ChromaDB, achieving sub-15ms cosine vector search.",
      score: 97,
      badge: "VECTOR RETRIEVAL MATCH"
    }
  };

  const handleRoleChange = (role: 'ai' | 'sde' | 'data') => {
    setSelectedRole(role);
    setIsOptimizing(true);
    sound.playScanSweep();
    setTimeout(() => {
      setIsOptimizing(false);
      setAtsScore(rolePresets[role].score);
      sound.playSuccessChime();
    }, 400);
  };

  const handleCopyBullet = () => {
    navigator.clipboard.writeText(rolePresets[selectedRole].after);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid #262626', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#4ADE80' }}>
          <Sparkles size={14} />
          <span>RESUMEPILOT AGENT // ATS OPTIMIZER + SOURCE TRUTH VALIDATOR</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => handleRoleChange('ai')}
            className={`swiss-badge ${selectedRole === 'ai' ? 'swiss-badge-green' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.65rem' }}
          >
            TARGET: AI / ML
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('sde')}
            className={`swiss-badge ${selectedRole === 'sde' ? 'swiss-badge-green' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.65rem' }}
          >
            TARGET: FULL STACK SDE
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('data')}
            className={`swiss-badge ${selectedRole === 'data' ? 'swiss-badge-green' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.65rem' }}
          >
            TARGET: DATA SYSTEMS
          </button>
        </div>
      </div>

      {/* Dual Comparison: Weak Bullet vs AI Agent Enhanced Bullet */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '12px' }}>
        <div style={{ padding: '12px', background: '#121212', border: '1px solid #333' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#F87171', marginBottom: '6px', fontWeight: 700 }}>
            [BEFORE] RAW DRAFT (54% ATS MATCH)
          </div>
          <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5, margin: 0 }}>
            "{rolePresets[selectedRole].before}"
          </p>
          <span style={{ display: 'block', marginTop: '6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#F87171' }}>
            ✗ Missing quantifiable metrics · ✗ Weak verbs · ✗ Poor keyword density
          </span>
        </div>

        <div style={{ padding: '12px', background: '#121212', border: '1px solid #4ADE80', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#4ADE80', marginBottom: '6px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>[AFTER] RESUMEPILOT AGENT OPTIMIZED</span>
            <span style={{ background: '#4ADE80', color: '#000', padding: '1px 5px', fontSize: '0.58rem' }}>TRUTH VALIDATED</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#FFF', lineHeight: 1.5, margin: 0 }}>
            "{rolePresets[selectedRole].after}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#4ADE80' }}>
              ✓ Verified against Master AST · ✓ 96% ATS Match
            </span>
            <button
              type="button"
              onClick={handleCopyBullet}
              style={{
                background: 'transparent',
                border: '1px solid #4ADE80',
                color: '#4ADE80',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                padding: '2px 6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <Check size={10} /> : <Copy size={10} />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live ATS Metrics Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#161616', border: '1px solid #333', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
        <div>
          ATS COMPLIANCE INDEX: <strong style={{ color: '#4ADE80', fontSize: '0.9rem' }}>{atsScore}%</strong>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span>EXPORT: <strong style={{ color: '#FFF' }}>.DOCX</strong></span>
          <span>EXPORT: <strong style={{ color: '#FFF' }}>.PDF</strong></span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. FOOD SAFE — REAL-TIME OCR LABEL & ADDITIVE HAZARD SIMULATOR
   ========================================================================= */
export const FoodSafeSimulator: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<'snack' | 'drink' | 'instant'>('snack');
  const [inspectedAdditive, setInspectedAdditive] = useState<string | null>(null);

  const products = {
    snack: {
      title: "Extruded Cheese Snack Chips",
      ocrText: "Corn meal, vegetable oil, maltodextrin, E102 (Tartrazine), E110 (Sunset Yellow), Monosodium Glutamate, salt.",
      additives: [
        { code: "E102", name: "Tartrazine", hazard: "HIGH ALLERGEN", note: "Hyperactivity warnings in EU food safety regulations (EFSA)" },
        { code: "E110", name: "Sunset Yellow", hazard: "MODERATE", note: "Azo dye colorant, potential histamine release" },
        { code: "E621", name: "MSG", hazard: "LOW", note: "Flavor enhancer, sodium sensitivity risk" }
      ],
      score: "GRADE C [CAUTION]"
    },
    drink: {
      title: "Natural Cold-Pressed Orange Elixir",
      ocrText: "100% Cold-Pressed Orange Juice, Ascorbic Acid (Vitamin C), Pectin.",
      additives: [
        { code: "E300", name: "Ascorbic Acid", hazard: "SAFE / BENEFICIAL", note: "Natural vitamin antioxidant" },
        { code: "E440", name: "Pectin", hazard: "SAFE", note: "Plant-derived dietary fiber gelling agent" }
      ],
      score: "GRADE A+ [EXCELLENT]"
    },
    instant: {
      title: "Processed Savory Noodles",
      ocrText: "Wheat flour, palm oil, TBHQ (E319), Disodium Inosinate (E631), Caramel Color (E150d).",
      additives: [
        { code: "E319", name: "TBHQ", hazard: "MODERATE TOXICITY", note: "Synthetic antioxidant, allowable limits regulated" },
        { code: "E631", name: "Disodium Inosinate", hazard: "LOW ALLERGEN", note: "Synergistic flavor enhancer with glutamates" }
      ],
      score: "GRADE D [HIGH PROCESSING]"
    }
  };

  const current = products[selectedProduct];

  const handleSelectProduct = (key: 'snack' | 'drink' | 'instant') => {
    setSelectedProduct(key);
    sound.playScanSweep();
  };

  const handleAdditiveClick = (code: string) => {
    setInspectedAdditive(prev => prev === code ? null : code);
    sound.playClick();
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid #262626', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#B7F34A' }}>
          <Scan size={14} />
          <span>OCR TEXT NORMALIZER // ADDITIVE TOXICITY PARSER</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['snack', 'drink', 'instant'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => handleSelectProduct(p)}
              className={`swiss-badge ${selectedProduct === p ? 'swiss-badge-green' : ''}`}
              style={{ cursor: 'pointer', fontSize: '0.65rem' }}
            >
              SAMPLE: {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* OCR Raw Text Stream */}
      <div style={{ padding: '10px 12px', background: '#121212', border: '1px solid #333', marginBottom: '12px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#888', display: 'block', marginBottom: '4px' }}>
          PARSED OCR PACKAGING STREAM ({current.title})
        </span>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#B7F34A', margin: 0 }}>
          {current.ocrText}
        </p>
      </div>

      {/* Extracted Additive Hazards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '12px' }}>
        {current.additives.map(add => (
          <div 
            key={add.code} 
            onClick={() => handleAdditiveClick(add.code)}
            style={{ 
              padding: '8px 10px', 
              background: inspectedAdditive === add.code ? '#1E1E1E' : '#141414', 
              border: `1px solid ${inspectedAdditive === add.code ? '#B7F34A' : '#282828'}`,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <strong style={{ fontSize: '0.75rem', color: '#FFF' }}>{add.code} · {add.name}</strong>
              <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: add.hazard.includes('HIGH') ? '#F87171' : '#4ADE80' }}>
                {add.hazard}
              </span>
            </div>
            <p style={{ fontSize: '0.68rem', color: '#888', margin: 0 }}>{add.note}</p>
          </div>
        ))}
      </div>

      {/* Overall Score */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#161616', border: '1px solid #333', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
        <span>SAFETY HEALTH RATING: <strong style={{ color: current.score.includes('A+') ? '#4ADE80' : '#FFD83D' }}>{current.score}</strong></span>
        <span style={{ color: '#888' }}>MERN REST ENDPOINT // SUB-SECOND INDEX</span>
      </div>
    </div>
  );
};
