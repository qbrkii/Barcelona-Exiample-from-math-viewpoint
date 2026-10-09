import React, { useState, useRef } from 'react';
import { Download, Layers, Sliders, Sparkles, Sun, Grid } from 'lucide-react';
import { GENERATED_IMAGES } from '../data/eixampleData';

type StudioStyleMode = 'urban' | 'geometric';

interface StudioPreset {
  id: string;
  name: string;
  subtitle: string;
  c: number;
  w: number;
  h: number;
  courtyardRatio: number;
  styleMode: StudioStyleMode;
}

const STUDIO_PRESETS: StudioPreset[] = [
  {
    id: 'cerda-1859',
    name: '1859 Cerdà Utopia',
    subtitle: 'c = 15.28m · h = 20m · θ = 45°',
    c: 15.28,
    w: 20,
    h: 20,
    courtyardRatio: 0.58,
    styleMode: 'urban',
  },
  {
    id: 'modern-dense',
    name: 'Today’s Dense Eixample',
    subtitle: 'c = 15.28m · h = 30m · θ = 56.3°',
    c: 15.28,
    w: 20,
    h: 30,
    courtyardRatio: 0.28,
    styleMode: 'urban',
  },
  {
    id: 'regular-d8',
    name: 'Regular D₈ Octagon',
    subtitle: 'c = s/(2+√2) = 33.19m (Equal Sides)',
    c: 33.19,
    w: 18,
    h: 18,
    courtyardRatio: 0.52,
    styleMode: 'geometric',
  },
  {
    id: 'rectified-diamond',
    name: 'Rectified c = s/2 Limit',
    subtitle: 'c = 56.65m (45° Dual Checkerboard)',
    c: 56.65,
    w: 16,
    h: 16,
    courtyardRatio: 0.48,
    styleMode: 'geometric',
  },
];

export const CreateInspiredStudio: React.FC = () => {
  const [cutC, setCutC] = useState<number>(15.28);
  const [streetW, setStreetW] = useState<number>(20);
  const [heightH, setHeightH] = useState<number>(20);
  const [courtyardRatio, setCourtyardRatio] = useState<number>(0.58);
  const [styleMode, setStyleMode] = useState<StudioStyleMode>('urban');
  const [showSymmetryWeb, setShowSymmetryWeb] = useState<boolean>(true);
  const [activePresetId, setActivePresetId] = useState<string>('cerda-1859');

  const svgRef = useRef<SVGSVGElement | null>(null);

  const s = 113.3; // fixed base block side in meters
  const fullSquareArea = s * s; // 12836.89 m²
  const removedCornerArea = 2 * cutC * cutC; // 4 * (1/2 c²) = 2c²
  const netBlockArea = fullSquareArea - removedCornerArea;
  const percentSacrificed = (removedCornerArea / fullSquareArea) * 100;

  // Edge lengths of the octagon
  const streetEdgeLength = Math.max(0, s - 2 * cutC);
  const chamferDiagonalLength = cutC * Math.SQRT2;

  // Intersection Plaza Area:
  // Center crossroads (w*w) + 4 street arms alongside cuts (4 * w * c) + 4 cut triangles (2 * c²)
  const intersectionPlazaArea = streetW * streetW + 4 * streetW * cutC + 2 * cutC * cutC;

  // Sunlight Angle
  const solarAngleDeg = (Math.atan(heightH / streetW) * 180) / Math.PI;

  const applyPreset = (preset: StudioPreset) => {
    setActivePresetId(preset.id);
    setCutC(preset.c);
    setStreetW(preset.w);
    setHeightH(preset.h);
    setCourtyardRatio(preset.courtyardRatio);
    setStyleMode(preset.styleMode);
  };

  // Export SVG Artwork Handler
  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amina-kaiyrbek-xamfra-c${cutC.toFixed(1)}m.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 3x3 Superblock Grid Layout in SVG (ViewBox 0 0 660 660)
  // Let's scale the 3x3 grid dynamically so it fits centered inside 660x660
  const periodMeters = s + streetW;
  const totalGridMeters = 3 * s + 2 * streetW;
  const canvasPadding = 36;
  const availablePx = 660 - canvasPadding * 2;
  const pxPerMeter = availablePx / totalGridMeters;

  const blockPx = s * pxPerMeter;
  const streetPx = streetW * pxPerMeter;
  const cutPx = cutC * pxPerMeter;
  const shadowOffsetPx = (heightH * 0.75) * pxPerMeter; // 45° azimuth shadow projection

  const getOctagonPoints = (bx: number, by: number, size: number, cPx: number) => {
    const clampedC = Math.min(size / 2, Math.max(0, cPx));
    return [
      `${bx + clampedC},${by}`,
      `${bx + size - clampedC},${by}`,
      `${bx + size},${by + clampedC}`,
      `${bx + size},${by + size - clampedC}`,
      `${bx + size - clampedC},${by + size}`,
      `${bx + clampedC},${by + size}`,
      `${bx},${by + size - clampedC}`,
      `${bx},${by + clampedC}`,
    ].join(' ');
  };

  return (
    <div className="space-y-12">
      {/* Main Interactive Creation Studio Container */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {/* Studio Header Bar */}
        <div className="border-b border-stone-200 bg-[#F4F1EA] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
              PARAMETRIC STUDIO
            </div>
            <h3 className="text-base font-serif font-semibold text-stone-900">
              Xamfrà Variations · D₄ Square to Regular D₈ Octagon
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-0.5 bg-stone-200/80 rounded-lg">
              <button
                type="button"
                onClick={() => setStyleMode('urban')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  styleMode === 'urban'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                Superblock View
              </button>
              <button
                type="button"
                onClick={() => setStyleMode('geometric')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  styleMode === 'geometric'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600'
                }`}
              >
                Geometric Art
              </button>
            </div>

            <button
              type="button"
              onClick={handleDownloadSvg}
              className="px-3.5 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export SVG Blueprint</span>
            </button>
          </div>
        </div>

        {/* Two-Zone Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: 3x3 Parametric SVG Canvas */}
          <div className="lg:col-span-7 bg-[#141413] p-4 sm:p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-stone-200 relative">
            <svg
              ref={svgRef}
              viewBox="0 0 660 660"
              className="w-full max-w-[540px] h-auto rounded-lg border border-stone-800"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Parametric 3 by 3 grid of chamfered octagonal blocks and intersection plazas"
            >
              {/* Background Surface */}
              <rect
                x="0"
                y="0"
                width="660"
                height="660"
                fill={styleMode === 'urban' ? '#1C1917' : '#0C0A09'}
              />

              {/* Subtle Coordinate Grid */}
              <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                {Array.from({ length: 22 }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    <line x1={idx * 30} y1="0" x2={idx * 30} y2="660" />
                    <line x1="0" y1={idx * 30} x2="660" y2={idx * 30} />
                  </React.Fragment>
                ))}
              </g>

              {/* Render the 4 Interior Octagonal Intersection Plazas (Where 4 Blocks Meet) */}
              {[0, 1].map((rowIdx) =>
                [0, 1].map((colIdx) => {
                  const interCenterX =
                    canvasPadding + (colIdx + 1) * blockPx + (colIdx + 0.5) * streetPx;
                  const interCenterY =
                    canvasPadding + (rowIdx + 1) * blockPx + (rowIdx + 0.5) * streetPx;
                  const hw = streetPx / 2;

                  const plazaPts = [
                    `${interCenterX - hw - cutPx},${interCenterY - hw}`,
                    `${interCenterX - hw},${interCenterY - hw - cutPx}`,
                    `${interCenterX + hw},${interCenterY - hw - cutPx}`,
                    `${interCenterX + hw + cutPx},${interCenterY - hw}`,
                    `${interCenterX + hw + cutPx},${interCenterY + hw}`,
                    `${interCenterX + hw},${interCenterY + hw + cutPx}`,
                    `${interCenterX - hw},${interCenterY + hw + cutPx}`,
                    `${interCenterX - hw - cutPx},${interCenterY + hw}`,
                  ].join(' ');

                  return (
                    <g key={`plaza-${rowIdx}-${colIdx}`}>
                      <polygon
                        points={plazaPts}
                        fill={
                          styleMode === 'urban'
                            ? 'rgba(251, 191, 36, 0.16)'
                            : 'rgba(56, 189, 248, 0.22)'
                        }
                        stroke={styleMode === 'urban' ? '#FBBF24' : '#38BDF8'}
                        strokeWidth="1.5"
                        strokeDasharray={styleMode === 'urban' ? '4 2' : undefined}
                      />
                      {/* Central Plaza Tree / Geometry Node */}
                      <circle
                        cx={interCenterX}
                        cy={interCenterY}
                        r={Math.max(4, (hw + cutPx) * 0.28)}
                        fill={
                          styleMode === 'urban'
                            ? 'rgba(34, 197, 94, 0.35)'
                            : 'rgba(251, 191, 36, 0.3)'
                        }
                        stroke={styleMode === 'urban' ? '#4ADE80' : '#FBBF24'}
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })
              )}

              {/* Render the 3x3 = 9 Chamfered City Blocks */}
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => {
                  const bx = canvasPadding + col * (blockPx + streetPx);
                  const by = canvasPadding + row * (blockPx + streetPx);
                  const centerX = bx + blockPx / 2;
                  const centerY = by + blockPx / 2;

                  const innerSize = blockPx * Math.sqrt(courtyardRatio);
                  const innerOffset = (blockPx - innerSize) / 2;
                  const innerCut = Math.max(0, cutPx * Math.sqrt(courtyardRatio));

                  return (
                    <g key={`block-${row}-${col}`}>
                      {/* Solar Shadow Cast by Building Height h */}
                      {styleMode === 'urban' && (
                        <polygon
                          points={getOctagonPoints(
                            bx + shadowOffsetPx * 0.45,
                            by + shadowOffsetPx * 0.45,
                            blockPx,
                            cutPx
                          )}
                          fill="rgba(0, 0, 0, 0.55)"
                        />
                      )}

                      {/* Bounding Square s² Ghost Frame + 4 Subtracted Corner Triangles */}
                      {styleMode === 'geometric' && cutPx > 1 && (
                        <>
                          <rect
                            x={bx}
                            y={by}
                            width={blockPx}
                            height={blockPx}
                            fill="none"
                            stroke="rgba(249, 115, 22, 0.35)"
                            strokeWidth="1"
                            strokeDasharray="3 3"
                          />
                          {/* 4 Subtracted ½c² Right-Isosceles Triangles */}
                          <polygon
                            points={`${bx},${by} ${bx + cutPx},${by} ${bx},${by + cutPx}`}
                            fill="rgba(244, 63, 94, 0.32)"
                          />
                          <polygon
                            points={`${bx + blockPx},${by} ${bx + blockPx - cutPx},${by} ${bx + blockPx},${by + cutPx}`}
                            fill="rgba(244, 63, 94, 0.32)"
                          />
                          <polygon
                            points={`${bx},${by + blockPx} ${bx + cutPx},${by + blockPx} ${bx},${by + blockPx - cutPx}`}
                            fill="rgba(244, 63, 94, 0.32)"
                          />
                          <polygon
                            points={`${bx + blockPx},${by + blockPx} ${bx + blockPx - cutPx},${by + blockPx} ${bx + blockPx},${by + blockPx - cutPx}`}
                            fill="rgba(244, 63, 94, 0.32)"
                          />
                        </>
                      )}

                      {/* Outer Octagonal Building Perimeter (Area = s² - 2c²) */}
                      <polygon
                        points={getOctagonPoints(bx, by, blockPx, cutPx)}
                        fill={styleMode === 'urban' ? '#C2410C' : 'rgba(234, 88, 12, 0.25)'}
                        fillOpacity={styleMode === 'urban' ? 0.78 : 1}
                        stroke="#FB923C"
                        strokeWidth="2"
                      />

                      {/* Interior Courtyard Garden */}
                      <polygon
                        points={getOctagonPoints(
                          bx + innerOffset,
                          by + innerOffset,
                          innerSize,
                          innerCut
                        )}
                        fill={styleMode === 'urban' ? '#14532D' : '#1C1917'}
                        stroke={styleMode === 'urban' ? '#4ADE80' : '#FDBA74'}
                        strokeWidth="1.2"
                      />

                      {/* Optional Dihedral D₄ Symmetry Mirror Axes on Each Block */}
                      {showSymmetryWeb && (
                        <g stroke="rgba(255, 255, 255, 0.22)" strokeWidth="0.9" strokeDasharray="3 3">
                          <line x1={bx} y1={centerY} x2={bx + blockPx} y2={centerY} />
                          <line x1={centerX} y1={by} x2={centerX} y2={by + blockPx} />
                          <line x1={bx + cutPx / 2} y1={by + cutPx / 2} x2={bx + blockPx - cutPx / 2} y2={by + blockPx - cutPx / 2} />
                          <line x1={bx + blockPx - cutPx / 2} y1={by + cutPx / 2} x2={bx + cutPx / 2} y2={by + blockPx - cutPx / 2} />
                        </g>
                      )}
                    </g>
                  );
                })
              )}

              {/* Bottom Title Stamp on SVG for Export */}
              <rect x="18" y="618" width="624" height="28" rx="4" fill="rgba(12, 10, 9, 0.88)" />
              <text x="30" y="636" fill="#FDBA74" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">
                XAMFRÀ PARAMETRIC MATRIX · Amina Kaiyrbek (APP201)
              </text>
              <text x="630" y="636" textAnchor="end" fill="#E7E5E4" fontSize="11" fontFamily="IBM Plex Mono">
                s={s}m · c={cutC.toFixed(2)}m · A=s²−2c²={netBlockArea.toFixed(0)}m² · θ={solarAngleDeg.toFixed(1)}°
              </text>
            </svg>

            {/* Quick Legend Under Canvas */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-stone-300">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#EA580C] inline-block" />
                Chamfered Block (s² − 2c²)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-400/50 border border-amber-400 inline-block" />
                Octagonal Intersection Plaza
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-700 border border-emerald-400 inline-block" />
                Interior Garden Courtyard
              </span>
            </div>
          </div>

          {/* RIGHT: Parametric Controls & Live Mathematical Readouts */}
          <div className="lg:col-span-5 p-6 bg-[#FAF8F5] flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Preset Selector */}
              <div>
                <div className="text-xs font-semibold text-stone-800 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Explore 4 Mathematical States:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STUDIO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        activePresetId === preset.id
                          ? 'bg-white border-[#C2410C] ring-1 ring-[#C2410C]/20'
                          : 'bg-stone-100/80 border-stone-200 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-semibold text-stone-900 truncate">
                        {preset.name}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 truncate mt-0.5">
                        {preset.subtitle}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parametric Sliders */}
              <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-4">
                <div className="text-xs font-semibold text-stone-900 border-b border-stone-100 pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#C2410C]" />
                    Parametric Geometry Controls
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSymmetryWeb(!showSymmetryWeb)}
                    className="text-xs font-mono text-[#0369A1] hover:underline"
                  >
                    {showSymmetryWeb ? 'Hide D₄ Axes' : 'Show D₄ Axes'}
                  </button>
                </div>

                {/* Slider 1: Corner Cut c */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="studio-cut-c" className="font-medium text-stone-700">
                      Corner Triangle Leg (c):
                    </label>
                    <span className="font-mono font-semibold text-[#C2410C] tabular-nums">
                      {cutC.toFixed(2)} m ({percentSacrificed.toFixed(1)}% of s²)
                    </span>
                  </div>
                  <input
                    id="studio-cut-c"
                    type="range"
                    min="0"
                    max="56.65"
                    step="0.05"
                    value={cutC}
                    onChange={(e) => {
                      setActivePresetId('custom');
                      setCutC(parseFloat(e.target.value));
                    }}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-0.5">
                    <span>0m (Square)</span>
                    <span>15.3m (Cerdà)</span>
                    <span>33.2m (Regular D₈)</span>
                    <span>56.6m (Diamond)</span>
                  </div>
                </div>

                {/* Slider 2: Building Height h */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="studio-height-h" className="font-medium text-stone-700">
                      Building Height (h):
                    </label>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      {heightH} m (θ = {solarAngleDeg.toFixed(1)}°)
                    </span>
                  </div>
                  <input
                    id="studio-height-h"
                    type="range"
                    min="10"
                    max="36"
                    step="1"
                    value={heightH}
                    onChange={(e) => {
                      setActivePresetId('custom');
                      setHeightH(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-[#C2410C] cursor-pointer"
                  />
                </div>

                {/* Slider 3: Street Width w */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="studio-street-w" className="font-medium text-stone-700">
                      Street Corridor Width (w):
                    </label>
                    <span className="font-mono font-semibold text-[#0369A1] tabular-nums">
                      {streetW} m
                    </span>
                  </div>
                  <input
                    id="studio-street-w"
                    type="range"
                    min="12"
                    max="32"
                    step="1"
                    value={streetW}
                    onChange={(e) => {
                      setActivePresetId('custom');
                      setStreetW(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-[#0369A1] cursor-pointer"
                  />
                </div>

                {/* Slider 4: Courtyard Garden Ratio */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="studio-courtyard" className="font-medium text-stone-700">
                      Interior Garden Courtyard Share:
                    </label>
                    <span className="font-mono font-semibold text-emerald-700 tabular-nums">
                      {Math.round(courtyardRatio * 100)}%
                    </span>
                  </div>
                  <input
                    id="studio-courtyard"
                    type="range"
                    min="0.2"
                    max="0.72"
                    step="0.02"
                    value={courtyardRatio}
                    onChange={(e) => {
                      setActivePresetId('custom');
                      setCourtyardRatio(parseFloat(e.target.value));
                    }}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Mathematical Output Matrix */}
              <div className="bg-stone-900 text-stone-100 rounded-lg p-4 font-mono text-xs space-y-2 tabular-nums">
                <div className="text-amber-400 font-semibold border-b border-stone-700 pb-1.5">
                  LIVE PARAMETRIC METRICS
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="text-stone-400 text-[11px]">Block Area (s² − 2c²)</div>
                    <div className="text-sm font-semibold text-white">
                      {netBlockArea.toFixed(0)} m²
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-400 text-[11px]">Octagonal Plaza Area</div>
                    <div className="text-sm font-semibold text-amber-300">
                      {intersectionPlazaArea.toFixed(0)} m²
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-400 text-[11px]">Street vs. Chamfer Edge</div>
                    <div className="text-xs font-semibold text-sky-300">
                      {streetEdgeLength.toFixed(1)}m vs {chamferDiagonalLength.toFixed(1)}m
                    </div>
                  </div>
                  <div>
                    <div className="text-stone-400 text-[11px]">Symmetry Classification</div>
                    <div className="text-xs font-semibold text-emerald-400">
                      {Math.abs(streetEdgeLength - chamferDiagonalLength) < 0.8
                        ? 'Regular D₈ Octagon!'
                        : cutC <= 0.2
                        ? 'D₄ Square (4 sides)'
                        : 'Irregular D₄ Octagon'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Section 3 Reflection Prompts + Physical Scale Model Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Explanations */}
        <div className="lg:col-span-8 space-y-4">
          {/* Prompt 1 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-1.5">
            <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
              01 · CONNECTION TO THE MATHEMATICS
            </div>
            <h4 className="text-sm font-serif font-semibold text-stone-900">
              How the Creation Connects to the Mathematical Idea
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              When 4 blocks meet, the subtracted corner triangles (<span className="font-mono">4 × ½c² = 2c²</span>) combine to form an octagonal public plaza. This studio models how private block area (<span className="font-mono">s² − 2c²</span>) transfers into civic space and sunlight.
            </p>
          </div>

          {/* Prompt 2 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-1.5">
            <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
              02 · MATHEMATICAL CHOICES &amp; EQUATIONS
            </div>
            <h4 className="text-sm font-serif font-semibold text-stone-900">
              Design Choices and the Equations Behind Them
            </h4>
            <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Regular D₈ Threshold (c = 33.19 m):</strong> Solving <span className="font-mono">s − 2c = c√2</span> gives <span className="font-mono">c = 113.3 / (2 + √2) ≈ 33.19 m</span>, where all 8 sides equal <span className="font-mono">46.93 m</span>.
              </li>
              <li>
                <strong>Shadow Length (<span className="font-mono">tan θ = h/w</span>):</strong> Dynamic shadows contrast Cerdà’s 20 m height cap (<span className="font-mono">θ = 45°</span>) against modern 30 m density (<span className="font-mono">θ = 56.3°</span>).
              </li>
            </ul>
          </div>

          {/* Prompt 3 */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 space-y-1.5">
            <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
              03 · WHAT TO NOTICE &amp; WONDER
            </div>
            <h4 className="text-sm font-serif font-semibold text-stone-900">
              Inviting Others to Wonder
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cutting just <strong>3.6%</strong> of a square block (<span className="font-mono">467 m²</span>) expands intersection space by <strong>+416%</strong>. What if our own cities shaved 15 m off right-angle corners for trees, cafés, and daylight?
            </p>
          </div>
        </div>

        {/* Right 4 Columns: Scale Model & Street View */}
        <div className="lg:col-span-4 space-y-4">
          <figure className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <img
              src={GENERATED_IMAGES.scaleModel}
              alt="Scale model of Eixample blocks"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover"
            />
            <figcaption className="p-3">
              <div className="text-[11px] font-mono text-stone-500">MASSING MODEL</div>
              <p className="text-xs text-stone-600 mt-0.5">
                Four D₄ blocks meeting at a central octagonal plaza with 45° solar lighting.
              </p>
            </figcaption>
          </figure>

          <figure className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            <img
              src={GENERATED_IMAGES.xamfraCorner}
              alt="45-degree chamfered corner building in Barcelona"
              referrerPolicy="no-referrer"
              className="w-full h-40 object-cover"
            />
            <figcaption className="p-3">
              <div className="text-[11px] font-mono text-stone-500">STREET PERSPECTIVE</div>
              <p className="text-xs text-stone-600 mt-0.5">
                The 21.2 m diagonal façade (<span className="font-mono">c√2</span>) facing the open intersection.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};
