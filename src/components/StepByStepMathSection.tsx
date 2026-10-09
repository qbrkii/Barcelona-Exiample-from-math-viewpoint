import React from 'react';
import { ArrowUpRight, Calculator, Compass, Ruler, Sun } from 'lucide-react';
import { WorkbenchLayer } from '../data/eixampleData';

interface StepByStepMathSectionProps {
  activeLayer: WorkbenchLayer;
  onSelectAndScrollToLayer: (layer: WorkbenchLayer) => void;
}

export const StepByStepMathSection: React.FC<StepByStepMathSectionProps> = ({
  activeLayer,
  onSelectAndScrollToLayer,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* PROOF 1: AREA */}
        <article
          className={`bg-white border rounded-xl p-5 flex flex-col justify-between ${
            activeLayer === 'area' ? 'border-[#C2410C] ring-1 ring-[#C2410C]/20' : 'border-stone-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
                01 · BLOCK AREA
              </div>
              <Ruler className="w-3.5 h-3.5 text-stone-400" />
            </div>

            <div>
              <h3 className="text-base font-serif font-semibold text-stone-900">
                Area = s² − 4(½c²) = s² − 2c²
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Subtract four right-isosceles corner triangles with legs <span className="font-mono">c</span> from square <span className="font-mono">s = 113.3 m</span>.
              </p>
            </div>

            <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3 space-y-2 font-mono text-xs tabular-nums">
              <div className="text-stone-700">
                <span className="text-stone-400">Square: </span>
                s² = 113.3² = 12,836.89 m²
              </div>
              <div className="text-stone-700">
                <span className="text-stone-400">Given Area: </span>
                12,370 m² (historical)
              </div>
              <div className="text-stone-700">
                <span className="text-stone-400">Cut: </span>
                2c² = 12,837 − 12,370 = 467 m²
              </div>
              <div className="text-[#C2410C] font-semibold pt-1 border-t border-stone-200">
                c = √(467 ÷ 2) ≈ 15.28 m
              </div>
            </div>

            <div className="text-[11px] text-stone-600 border-l-2 border-[#C2410C] pl-2.5">
              <strong>Check:</strong> c ≈ 15.28 m gives diagonal c√2 ≈ 21.6 m, closely matching Cerdà’s 20 m façade standard.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectAndScrollToLayer('area')}
            className="mt-4 w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-[#C2410C] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>Measure on Blueprint</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* PROOF 2: SUNLIGHT */}
        <article
          className={`bg-white border rounded-xl p-5 flex flex-col justify-between ${
            activeLayer === 'sunlight' ? 'border-[#C2410C] ring-1 ring-[#C2410C]/20' : 'border-stone-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
                02 · SOLAR TRIGONOMETRY
              </div>
              <Sun className="w-3.5 h-3.5 text-stone-400" />
            </div>

            <div>
              <h3 className="text-base font-serif font-semibold text-stone-900">
                tan θ = height ÷ street width
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Right-triangle ratio between building height <span className="font-mono">h</span> and street width <span className="font-mono">w</span>.
              </p>
            </div>

            <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3 space-y-2 font-mono text-xs tabular-nums">
              <div className="text-stone-700">
                <span className="text-stone-400">1859 Rule: </span>
                h = 20 m, w = 20 m
              </div>
              <div className="text-stone-700">
                <span className="text-stone-400">Ratio: </span>
                tan θ = 20 ÷ 20 = 1
              </div>
              <div className="text-[#C2410C] font-semibold pt-1 border-t border-stone-200">
                θ = arctan(1) = 45.0°
              </div>
              <div className="text-stone-500 text-[11px]">
                Modern h=30m: tan θ = 1.5 → θ = 56.3°
              </div>
            </div>

            <div className="text-[11px] text-stone-600 border-l-2 border-[#0369A1] pl-2.5">
              <strong>Impact:</strong> At 45°, winter sun penetrates down to street level, preventing damp disease pockets.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectAndScrollToLayer('sunlight')}
            className="mt-4 w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-[#C2410C] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>Test Angle on Cross-Section</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* PROOF 3: SYMMETRY */}
        <article
          className={`bg-white border rounded-xl p-5 flex flex-col justify-between ${
            activeLayer === 'symmetry' ? 'border-[#C2410C] ring-1 ring-[#C2410C]/20' : 'border-stone-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
                03 · SYMMETRY &amp; TRANSLATION
              </div>
              <Compass className="w-3.5 h-3.5 text-stone-400" />
            </div>

            <div>
              <h3 className="text-base font-serif font-semibold text-stone-900">
                Square Symmetry (D₄)
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                8-sided block retains the symmetry group of a square: 4 rotations and 4 reflections.
              </p>
            </div>

            <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3 space-y-2 font-mono text-xs tabular-nums">
              <div className="text-stone-700">
                <span className="text-stone-400">Sides: </span>
                Street 82.7 m ≠ Chamfer 21.6 m
              </div>
              <div className="text-stone-700">
                <span className="text-stone-400">Rotations: </span>
                0°, 90°, 180°, 270° (45° fails)
              </div>
              <div className="text-stone-700">
                <span className="text-stone-400">Reflections: </span>
                2 bisectors + 2 diagonals
              </div>
              <div className="text-[#C2410C] font-semibold pt-1 border-t border-stone-200">
                Translation: T = (133.3m, 133.3m)
              </div>
            </div>

            <div className="text-[11px] text-stone-600 border-l-2 border-amber-600 pl-2.5">
              <strong>Regular D₈ Threshold:</strong> Setting s − 2c = c√2 yields c ≈ 33.19 m for 8 equal sides.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectAndScrollToLayer('symmetry')}
            className="mt-4 w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-[#C2410C] hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>Test Rotations on Blueprint</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </article>
      </div>

      {/* Summary strip */}
      <div className="bg-[#F1EFEA] border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-stone-700">
          <Calculator className="w-4 h-4 text-[#C2410C] shrink-0" />
          <span>
            <strong>Unifying Factor:</strong> A single 45° angle defines the corner triangles, solar cut-off (tan 45°=1), and diagonal reflection axes.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div>Area Cut: <strong className="text-stone-900">3.6%</strong> (467 m²)</div>
          <div>Plaza Gain: <strong className="text-[#C2410C]">+416%</strong> (2,067 m²)</div>
        </div>
      </div>
    </div>
  );
};
