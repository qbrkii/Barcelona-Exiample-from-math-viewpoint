import React, { useState } from 'react';
import {
  Compass,
  Maximize2,
  Move,
  RotateCw,
  Ruler,
  Sun,
  CheckCircle2,
  AlertTriangle,
  FlipHorizontal,
  Camera,
} from 'lucide-react';
import { GENERATED_IMAGES, WorkbenchLayer } from '../data/eixampleData';

interface AnnotatedMapWorkbenchProps {
  activeLayer: WorkbenchLayer;
  onSelectLayer: (layer: WorkbenchLayer) => void;
}

export const AnnotatedMapWorkbench: React.FC<AnnotatedMapWorkbenchProps> = ({
  activeLayer,
  onSelectLayer,
}) => {
  const [showCircleOnPhoto, setShowCircleOnPhoto] = useState<boolean>(true);
  const [comparePlainGrid, setComparePlainGrid] = useState<boolean>(false);
  const [chamferLegC, setChamferLegC] = useState<number>(15.28);
  const [zoomCornerCaliper, setZoomCornerCaliper] = useState<boolean>(false);
  const [buildingHeight, setBuildingHeight] = useState<number>(20);
  const [streetWidth, setStreetWidth] = useState<number>(20);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [activeMirrorAxis, setActiveMirrorAxis] = useState<'all' | 'horizontal' | 'vertical' | 'diag1' | 'diag2'>('all');
  const [showTranslationShift, setShowTranslationShift] = useState<boolean>(false);

  // Geometry calculations
  const sideS = 113.3;
  const fullSquareArea = sideS * sideS;
  const activeC = comparePlainGrid ? 0 : chamferLegC;
  const singleTriangleArea = 0.5 * activeC * activeC;
  const fourTrianglesArea = 2 * activeC * activeC;
  const chamferedBlockArea = fullSquareArea - fourTrianglesArea;
  const chamferHypotenuse = activeC * Math.SQRT2;
  const longOctagonEdge = sideS - 2 * activeC;

  // Sunlight trigonometry
  const tanTheta = buildingHeight / streetWidth;
  const thetaRadians = Math.atan(tanTheta);
  const thetaDegrees = (thetaRadians * 180) / Math.PI;

  // SVG dimensions (Scale: 1 m = 2 px)
  const scale = 2.0;
  const halfW = (20 * scale) / 2;
  const blockSvgS = sideS * scale;
  const cutSvg = activeC * scale;

  const getChamferedBlockPoints = (x: number, y: number, L: number, c: number) => {
    if (c <= 0.1) {
      return `${x},${y} ${x + L},${y} ${x + L},${y + L} ${x},${y + L}`;
    }
    return [
      `${x + c},${y}`,
      `${x + L - c},${y}`,
      `${x + L},${y + c}`,
      `${x + L},${y + L - c}`,
      `${x + L - c},${y + L}`,
      `${x + c},${y + L}`,
      `${x},${y + L - c}`,
      `${x},${y + c}`,
    ].join(' ');
  };

  const cx = 320;
  const cy = 260;

  const nwX = cx - halfW - blockSvgS;
  const nwY = cy - halfW - blockSvgS;
  const neX = cx + halfW;
  const neY = cy - halfW - blockSvgS;
  const swX = cx - halfW - blockSvgS;
  const swY = cy + halfW;
  const seX = cx + halfW;
  const seY = cy + halfW;

  const nwCenterX = nwX + blockSvgS / 2;
  const nwCenterY = nwY + blockSvgS / 2;

  return (
    <div className="space-y-6">
      {/* 1A: SATELLITE PHOTO */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="border-b border-stone-200 bg-[#F4F1EA] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
            <Camera className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>1A · Satellite View (Barcelona Eixample)</span>
          </div>

          <button
            type="button"
            onClick={() => setShowCircleOnPhoto(!showCircleOnPhoto)}
            className={`px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
              showCircleOnPhoto
                ? 'bg-[#C2410C] text-white border-[#C2410C]'
                : 'bg-white text-stone-700 border-stone-300'
            }`}
          >
            {showCircleOnPhoto ? 'Hide Circle' : 'Circle Intersection'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 relative bg-stone-950 h-72 sm:h-80 overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200">
            <img
              src={GENERATED_IMAGES.aerialGrid}
              alt="Top-down satellite view of Barcelona's Eixample"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {showCircleOnPhoto && (
              <svg viewBox="0 0 800 450" className="absolute inset-0 w-full h-full pointer-events-none">
                <g transform="translate(400, 225)">
                  <ellipse cx="0" cy="0" rx="76" ry="70" transform="rotate(-6)" fill="rgba(249, 115, 22, 0.15)" stroke="#F97316" strokeWidth="3.5" />
                  <ellipse cx="0" cy="0" rx="82" ry="76" transform="rotate(4)" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="8 6" />
                </g>
              </svg>
            )}
          </div>

          <div className="lg:col-span-4 p-4 sm:p-5 bg-[#FAF8F5] flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
                OBSERVATION
              </div>
              <blockquote className="text-xs text-stone-700 bg-white p-3 rounded-lg border border-stone-200 italic leading-relaxed">
                &ldquo;Barcelona’s Eixample looks like a plain grid, but the block corners are cut at 45°, so every intersection becomes an octagon-like open space.&rdquo;
              </blockquote>
            </div>
            <div className="text-[11px] text-stone-500 font-mono space-y-1 border-t border-stone-200 pt-2">
              <div>Block: 113.3 m · Street: 20 m</div>
              <div>Chamfer: 45° · Area: 12,370 m²</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1B: VECTOR BLUEPRINT */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="border-b border-stone-200 bg-[#F4F1EA] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-700">
            <Compass className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>1B · Vector Blueprint (1:2 Scale)</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-stone-200/80 rounded-lg overflow-x-auto">
            <button
              type="button"
              onClick={() => onSelectLayer('notice')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeLayer === 'notice' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              1. Plaza
            </button>
            <button
              type="button"
              onClick={() => onSelectLayer('area')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeLayer === 'area' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              2A. Area (s² − 2c²)
            </button>
            <button
              type="button"
              onClick={() => onSelectLayer('sunlight')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeLayer === 'sunlight' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              2B. Sunlight (tan θ)
            </button>
            <button
              type="button"
              onClick={() => onSelectLayer('symmetry')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeLayer === 'symmetry' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              2C. Symmetry (D₄)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Blueprint SVG Canvas */}
          <div className="lg:col-span-8 relative bg-[#0F141C] min-h-[460px] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200 blueprint-grid-dark p-3">
            <div className="flex justify-between items-center z-10">
              <span className="text-[11px] font-mono text-sky-300">
                s = 113.3m · w = 20m
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setComparePlainGrid(!comparePlainGrid)}
                  className={`px-2 py-1 text-xs font-medium rounded border ${
                    comparePlainGrid ? 'bg-amber-500 text-stone-950 border-amber-400 font-semibold' : 'bg-slate-900 text-stone-200 border-slate-700'
                  }`}
                >
                  {comparePlainGrid ? 'Plain 90° Grid (c=0)' : 'Compare 90° Grid'}
                </button>

                {activeLayer === 'area' && (
                  <button
                    type="button"
                    onClick={() => setZoomCornerCaliper(!zoomCornerCaliper)}
                    className="px-2 py-1 text-xs font-medium rounded border bg-slate-900 text-stone-200 border-slate-700 flex items-center gap-1"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{zoomCornerCaliper ? 'Zoom Out' : 'Zoom Corner'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <svg
                viewBox={zoomCornerCaliper && activeLayer === 'area' ? '215 155 150 130' : '0 0 640 500'}
                className="w-full h-full max-h-[400px] select-none"
              >
                <defs>
                  <marker id="arr-c" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38BDF8" />
                  </marker>
                  <marker id="arr-a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#FBBF24" />
                  </marker>
                  <marker id="arr-o" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#EA580C" />
                  </marker>
                  <pattern id="diag-hatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#FB923C" strokeWidth="2" />
                  </pattern>
                </defs>

                {/* Street cross */}
                <rect x="0" y={cy - halfW} width="640" height={halfW * 2} fill="rgba(30, 41, 59, 0.7)" />
                <rect x={cx - halfW} y="0" width={halfW * 2} height="500" fill="rgba(30, 41, 59, 0.7)" />
                <line x1="0" y1={cy} x2="640" y2={cy} stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1" strokeDasharray="6 6" />
                <line x1={cx} y1="0" x2={cx} y2="500" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1" strokeDasharray="6 6" />

                {/* 4 Blocks */}
                {[
                  { id: 'NW', x: nwX, y: nwY },
                  { id: 'NE', x: neX, y: neY },
                  { id: 'SW', x: swX, y: swY },
                  { id: 'SE', x: seX, y: seY },
                ].map((blk) => {
                  const isPrimary = blk.id === 'NW';
                  const transformProp =
                    isPrimary && activeLayer === 'symmetry' && rotationDeg !== 0
                      ? `rotate(${rotationDeg} ${nwCenterX} ${nwCenterY})`
                      : undefined;

                  return (
                    <g key={blk.id} transform={transformProp}>
                      <rect
                        x={blk.x}
                        y={blk.y}
                        width={blockSvgS}
                        height={blockSvgS}
                        fill="none"
                        stroke={isPrimary ? 'rgba(56, 189, 248, 0.7)' : 'rgba(148, 163, 184, 0.3)'}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <polygon
                        points={getChamferedBlockPoints(blk.x, blk.y, blockSvgS, cutSvg)}
                        fill={isPrimary ? 'rgba(234, 88, 12, 0.25)' : 'rgba(148, 163, 184, 0.14)'}
                        stroke={isPrimary ? '#FB923C' : 'rgba(226, 232, 240, 0.65)'}
                        strokeWidth="2"
                      />
                      <polygon
                        points={getChamferedBlockPoints(blk.x + 36, blk.y + 36, blockSvgS - 72, Math.max(0, cutSvg * 0.65))}
                        fill="rgba(34, 197, 94, 0.18)"
                        stroke="rgba(74, 222, 128, 0.5)"
                        strokeWidth="1"
                      />
                    </g>
                  );
                })}

                {/* LAYER 0: NOTICE */}
                {activeLayer === 'notice' && (
                  <g>
                    {!comparePlainGrid && (
                      <polygon
                        points={[
                          `${cx - halfW - cutSvg},${cy - halfW}`,
                          `${cx - halfW},${cy - halfW - cutSvg}`,
                          `${cx + halfW},${cy - halfW - cutSvg}`,
                          `${cx + halfW + cutSvg},${cy - halfW}`,
                          `${cx + halfW + cutSvg},${cy + halfW}`,
                          `${cx + halfW},${cy + halfW + cutSvg}`,
                          `${cx - halfW},${cy + halfW + cutSvg}`,
                          `${cx - halfW - cutSvg},${cy + halfW}`,
                        ].join(' ')}
                        fill="rgba(251, 191, 36, 0.2)"
                        stroke="#FBBF24"
                        strokeWidth="2"
                        strokeDasharray="5 3"
                      />
                    )}
                    <ellipse cx={cx} cy={cy} rx="72" ry="68" transform={`rotate(-8 ${cx} ${cy})`} fill="none" stroke="#F97316" strokeWidth="3" />
                    <line x1={cx - halfW} y1="430" x2={cx + halfW} y2="430" stroke="#38BDF8" strokeWidth="2" markerStart="url(#arr-c)" markerEnd="url(#arr-c)" />
                    <text x={cx} y="445" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">Street 20m</text>
                  </g>
                )}

                {/* LAYER 1: AREA */}
                {activeLayer === 'area' && (
                  <g>
                    {activeC > 0 && (
                      <>
                        <polygon points={`${nwX},${nwY} ${nwX + cutSvg},${nwY} ${nwX},${nwY + cutSvg}`} fill="url(#diag-hatch)" stroke="#F97316" strokeWidth="1.5" />
                        <polygon points={`${nwX + blockSvgS},${nwY} ${nwX + blockSvgS - cutSvg},${nwY} ${nwX + blockSvgS},${nwY + cutSvg}`} fill="url(#diag-hatch)" stroke="#F97316" strokeWidth="1.5" />
                        <polygon points={`${nwX},${nwY + blockSvgS} ${nwX + cutSvg},${nwY + blockSvgS} ${nwX},${nwY + blockSvgS - cutSvg}`} fill="url(#diag-hatch)" stroke="#F97316" strokeWidth="1.5" />
                        <polygon points={`${nwX + blockSvgS},${nwY + blockSvgS} ${nwX + blockSvgS - cutSvg},${nwY + blockSvgS} ${nwX + blockSvgS},${nwY + blockSvgS - cutSvg}`} fill="rgba(249, 115, 22, 0.5)" stroke="#FBBF24" strokeWidth="2" />

                        <text x={cx - halfW - cutSvg / 2} y={cy - halfW + 18} textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">c = {activeC.toFixed(1)}m</text>
                        <text x={cx - halfW + 14} y={cy - halfW - cutSvg / 2} fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">c = {activeC.toFixed(1)}m</text>
                      </>
                    )}

                    {!zoomCornerCaliper && (
                      <g transform={`translate(${nwCenterX - 85}, ${nwCenterY - 32})`}>
                        <rect x="0" y="0" width="170" height="64" rx="4" fill="rgba(12, 10, 9, 0.9)" stroke="#FB923C" strokeWidth="1" />
                        <text x="85" y="20" textAnchor="middle" fill="#FDBA74" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">Area = s² − 2c²</text>
                        <text x="85" y="38" textAnchor="middle" fill="#E7E5E4" fontSize="10" fontFamily="IBM Plex Mono">113.3² − 2({activeC.toFixed(1)}²)</text>
                        <text x="85" y="54" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">= {chamferedBlockArea.toFixed(0)} m²</text>
                      </g>
                    )}
                  </g>
                )}

                {/* LAYER 2: SUNLIGHT */}
                {activeLayer === 'sunlight' && (
                  <g>
                    <g transform="translate(60, 260)">
                      <rect x="0" y="0" width="520" height="210" rx="6" fill="rgba(12, 10, 9, 0.95)" stroke="#FBBF24" strokeWidth="1" />
                      <text x="16" y="24" fill="#FBBF24" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">tan θ = height ÷ street width</text>
                      <line x1="30" y1="180" x2="490" y2="180" stroke="#A8A29E" strokeWidth="1.5" />

                      {(() => {
                        const bHPx = Math.min(120, buildingHeight * 3.8);
                        const sWPx = Math.min(160, streetWidth * 3.8);
                        const leftX = 160;
                        const rightX = leftX + sWPx;
                        const topY = 180 - bHPx;

                        return (
                          <g>
                            <rect x="70" y={topY} width="90" height={bHPx} fill="rgba(234, 88, 12, 0.3)" stroke="#FB923C" strokeWidth="1.5" />
                            <rect x={rightX} y={topY} width="90" height={bHPx} fill="rgba(214, 211, 209, 0.2)" stroke="#D6D3D1" strokeWidth="1.5" />
                            <line x1={leftX} y1={topY} x2={rightX} y2="180" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arr-a)" />
                            <text x={leftX - 8} y={180 - bHPx / 2} textAnchor="end" fill="#FB923C" fontSize="10" fontFamily="IBM Plex Mono">h = {buildingHeight}m</text>
                            <text x={leftX + sWPx / 2} y="196" textAnchor="middle" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">w = {streetWidth}m</text>
                            <text x={rightX - 30} y="172" fill="#FBBF24" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">θ = {thetaDegrees.toFixed(1)}°</text>

                            <g transform="translate(350, 60)">
                              <text x="0" y="0" fill="#F8FAFC" fontSize="11" fontFamily="IBM Plex Mono">tan θ = {buildingHeight} ÷ {streetWidth} = {tanTheta.toFixed(2)}</text>
                              <text x="0" y="20" fill="#38BDF8" fontSize="11" fontWeight="600" fontFamily="IBM Plex Mono">θ = arctan({tanTheta.toFixed(2)}) = {thetaDegrees.toFixed(1)}°</text>
                              <text x="0" y="44" fill={thetaDegrees <= 45.1 ? '#4ADE80' : '#FB7185'} fontSize="10" fontFamily="IBM Plex Mono">
                                {thetaDegrees <= 45.1 ? '✓ Ground receives sun at 45°' : '▲ Street floor in shadow'}
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </g>
                  </g>
                )}

                {/* LAYER 3: SYMMETRY */}
                {activeLayer === 'symmetry' && (
                  <g>
                    {(activeMirrorAxis === 'all' || activeMirrorAxis === 'horizontal') && (
                      <line x1={nwX - 15} y1={nwCenterY} x2={nwX + blockSvgS + 15} y2={nwCenterY} stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="5 4" />
                    )}
                    {(activeMirrorAxis === 'all' || activeMirrorAxis === 'vertical') && (
                      <line x1={nwCenterX} y1={nwY - 15} x2={nwCenterX} y2={nwY + blockSvgS + 15} stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="5 4" />
                    )}
                    {(activeMirrorAxis === 'all' || activeMirrorAxis === 'diag1') && (
                      <line x1={nwX - 8} y1={nwY - 8} x2={nwX + blockSvgS + 8} y2={nwY + blockSvgS + 8} stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="5 4" />
                    )}
                    {(activeMirrorAxis === 'all' || activeMirrorAxis === 'diag2') && (
                      <line x1={nwX + blockSvgS + 8} y1={nwY - 8} x2={nwX - 8} y2={nwY + blockSvgS + 8} stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="5 4" />
                    )}

                    <circle cx={nwCenterX} cy={nwCenterY} r="5" fill="#F97316" stroke="#FFF" strokeWidth="1.5" />
                    <text x={nwCenterX + 8} y={nwCenterY - 8} fill="#FDBA74" fontSize="10" fontFamily="IBM Plex Mono">C₄ Pivot ({rotationDeg}°)</text>

                    <line x1={nwCenterX} y1={nwCenterY} x2={neX + blockSvgS / 2} y2={neY + blockSvgS / 2} stroke="#EA580C" strokeWidth="2" markerEnd="url(#arr-o)" />
                    <text x={cx} y={nwCenterY - 8} textAnchor="middle" fill="#FB923C" fontSize="10" fontFamily="IBM Plex Mono">Tx = 133.3m</text>

                    {showTranslationShift && (
                      <polygon points={getChamferedBlockPoints(neX, neY, blockSvgS, cutSvg)} fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="2" />
                    )}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right Control Deck */}
          <div className="lg:col-span-4 p-4 sm:p-5 bg-[#FAF8F5] flex flex-col justify-between">
            {activeLayer === 'notice' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  INTERSECTION DIMENSIONS
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Block Side (s)</span>
                    <span className="font-mono font-semibold">113.3 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Street Width (w)</span>
                    <span className="font-mono font-semibold">20.0 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Chamfer Angle</span>
                    <span className="font-mono font-semibold text-[#C2410C]">45.0°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Plaza Area</span>
                    <span className="font-mono font-semibold text-emerald-700">~2,067 m²</span>
                  </div>
                </div>

                <div className="bg-stone-100 border border-stone-200 rounded-lg p-3 space-y-2">
                  <div className="text-xs font-semibold text-stone-800">
                    45° Chamfer vs Plain 90°
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setComparePlainGrid(false)}
                      className={`py-1 text-xs font-medium rounded border ${
                        !comparePlainGrid ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-white text-stone-700'
                      }`}
                    >
                      45° Chamfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparePlainGrid(true)}
                      className={`py-1 text-xs font-medium rounded border ${
                        comparePlainGrid ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700'
                      }`}
                    >
                      90° Square
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeLayer === 'area' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  Area = s² − 2c²
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">Corner Leg (c):</span>
                    <span className="font-mono font-semibold text-[#C2410C]">{activeC.toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="33.2"
                    step="0.05"
                    value={activeC}
                    onChange={(e) => {
                      setComparePlainGrid(false);
                      setChamferLegC(parseFloat(e.target.value));
                    }}
                    className="w-full accent-[#C2410C]"
                  />
                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => { setComparePlainGrid(false); setChamferLegC(15.28); }}
                      className="flex-1 py-1 text-[11px] font-medium bg-stone-100 rounded border hover:bg-stone-200"
                    >
                      c = 15.28 m (Inferred)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setComparePlainGrid(false); setChamferLegC(14.14); }}
                      className="flex-1 py-1 text-[11px] font-medium bg-stone-100 rounded border hover:bg-stone-200"
                    >
                      c = 14.14 m (20m Diag)
                    </button>
                  </div>
                </div>

                <div className="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-400">s² (113.3²):</span>
                    <span>12,837 m²</span>
                  </div>
                  <div className="flex justify-between text-orange-300">
                    <span>−2c²:</span>
                    <span>−{fourTrianglesArea.toFixed(0)} m²</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-semibold border-t border-stone-700 pt-1">
                    <span>Block Area:</span>
                    <span>{chamferedBlockArea.toFixed(0)} m²</span>
                  </div>
                </div>
              </div>
            )}

            {activeLayer === 'sunlight' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  tan θ = height ÷ street width
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Height (h):</span>
                      <span className="font-mono font-semibold">{buildingHeight} m</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="36"
                      step="1"
                      value={buildingHeight}
                      onChange={(e) => setBuildingHeight(parseInt(e.target.value, 10))}
                      className="w-full accent-[#C2410C]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Street Width (w):</span>
                      <span className="font-mono font-semibold">{streetWidth} m</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="32"
                      step="1"
                      value={streetWidth}
                      onChange={(e) => setStreetWidth(parseInt(e.target.value, 10))}
                      className="w-full accent-[#0369A1]"
                    />
                  </div>

                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => { setBuildingHeight(20); setStreetWidth(20); }}
                      className="flex-1 py-1 text-[11px] font-medium bg-stone-100 rounded border hover:bg-stone-200"
                    >
                      1859 Cap (20m/20m)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setBuildingHeight(30); setStreetWidth(20); }}
                      className="flex-1 py-1 text-[11px] font-medium bg-stone-100 rounded border hover:bg-stone-200"
                    >
                      Modern (30m/20m)
                    </button>
                  </div>
                </div>

                <div className="bg-stone-900 text-stone-100 rounded-lg p-3 font-mono text-xs space-y-1">
                  <div>tan θ = {buildingHeight} ÷ {streetWidth} = {tanTheta.toFixed(2)}</div>
                  <div className="text-sky-300 font-semibold">θ = arctan({tanTheta.toFixed(2)}) = {thetaDegrees.toFixed(1)}°</div>
                </div>
              </div>
            )}

            {activeLayer === 'symmetry' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  DIHEDRAL GROUP D₄
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium text-stone-800">Rotation:</div>
                  <div className="grid grid-cols-5 gap-1">
                    {[0, 45, 90, 180, 270].map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setRotationDeg(deg)}
                        className={`py-1 text-xs font-mono rounded border ${
                          rotationDeg === deg ? (deg === 45 ? 'bg-rose-700 text-white' : 'bg-[#C2410C] text-white') : 'bg-stone-50'
                        }`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {rotationDeg === 45 ? '▲ 45° fails: 82.7 m ≠ 21.6 m' : '✓ Square symmetry D₄ holds'}
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium text-stone-800">Reflection Axes:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    {(['all', 'horizontal', 'vertical', 'diag1', 'diag2'] as const).map((ax) => (
                      <button
                        key={ax}
                        type="button"
                        onClick={() => setActiveMirrorAxis(ax)}
                        className={`py-1 rounded border capitalize ${
                          activeMirrorAxis === ax ? 'bg-[#0369A1] text-white' : 'bg-stone-50'
                        }`}
                      >
                        {ax}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
