/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowDownRight,
  BookOpen,
  Compass,
  Ruler,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  CITY_STRUCTURE_EXAMPLES,
  GENERATED_IMAGES,
  HISTORICAL_MILESTONES,
  START_HERE_BLOCKS,
  WorkbenchLayer,
} from './data/eixampleData';
import { AnnotatedMapWorkbench } from './components/AnnotatedMapWorkbench';
import { StepByStepMathSection } from './components/StepByStepMathSection';
import { CreateInspiredStudio } from './components/CreateInspiredStudio';

export default function App() {
  const [activeWorkbenchLayer, setActiveWorkbenchLayer] = useState<WorkbenchLayer>('notice');

  const handleSelectAndScrollToWorkbench = (layer: WorkbenchLayer) => {
    setActiveWorkbenchLayer(layer);
    const workbenchEl = document.getElementById('interactive-map-workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1C1917]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-xs border-b border-stone-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <a
            href="#top"
            className="text-base font-serif font-semibold tracking-tight text-stone-900 whitespace-nowrap"
          >
            Eixample Geometry
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
            <a href="#section-notice" className="hover:text-stone-900 transition-colors">
              01. Notice
            </a>
            <a href="#section-explain" className="hover:text-stone-900 transition-colors">
              02. Explain
            </a>
            <a href="#section-create" className="hover:text-stone-900 transition-colors">
              03. Create
            </a>
            <a href="#section-sources" className="hover:text-stone-900 transition-colors">
              04. Sources
            </a>
          </nav>

          <a
            href="#section-create"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#C2410C] rounded-lg hover:bg-[#9A3412] transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </a>
        </div>
      </header>

      {/* Hero & 4 Building Blocks */}
      <main id="top" className="flex-1">
        <section className="drafting-grid border-b border-stone-200 pt-8 pb-10 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="text-[#C2410C] font-semibold">Amina Kaiyrbek</span>
                  <span aria-hidden="true">·</span>
                  <span>APP201 Midterm Project</span>
                  <span aria-hidden="true">·</span>
                  <span>Barcelona (41.39° N, 2.16° E)</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-stone-900 tracking-tight">
                  The Octagon in the Grid: Barcelona’s Eixample
                </h1>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
                  In 1859, Ildefons Cerdà cut the corners of square blocks at <span className="font-mono font-semibold text-stone-900">45°</span>—turning crossroads into octagonal plazas, creating tram turning radiuses, and engineering sunlight into street canyons.
                </p>
              </div>

              {/* Story Arc Summary */}
              <div className="lg:col-span-4 bg-white border border-stone-200 rounded-xl p-4 space-y-2.5">
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  STORY OUTLINE
                </div>
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between border-b border-stone-100 pb-1">
                    <span className="font-semibold text-stone-900">1 · Notice &amp; Name</span>
                    <span className="font-mono text-stone-500">45° Cut Corner (Xamfrà)</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-1">
                    <span className="font-semibold text-stone-900">2 · Explain Math</span>
                    <span className="font-mono text-stone-500">Area s² − 2c² · tan 45° · D₄</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-900">3 · Create</span>
                    <span className="font-mono text-stone-500">Parametric Studio</span>
                  </div>
                </div>
                <a
                  href="#interactive-map-workbench"
                  className="w-full py-1.5 px-3 text-xs font-semibold text-center text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Jump to Map &amp; Blueprint</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4 Building Blocks */}
            <div className="pt-2 border-t border-stone-200/80">
              <div className="text-[11px] font-mono text-stone-500 mb-3">
                PROJECT FOUNDATIONS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {START_HERE_BLOCKS.map((item) => (
                  <div
                    key={item.index}
                    className="bg-white border border-stone-200 rounded-lg p-4 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono text-[#C2410C] font-semibold">
                        {item.index} · {item.label}
                      </div>
                      <h2 className="text-sm font-serif font-semibold text-stone-900 mt-1">
                        {item.title}
                      </h2>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-stone-400 pt-1 border-t border-stone-100">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 • NOTICE + NAME */}
        <section id="section-notice" className="py-10 px-6 border-b border-stone-200">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  SECTION 01 · NOTICE + NAME
                </div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mt-1">
                  What I Observed: Chamfered Corners Create Octagonal Plazas
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Barcelona’s block corners are cut at 45°, turning each intersection into an open octagonal plaza.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveWorkbenchLayer('notice')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    activeWorkbenchLayer === 'notice'
                      ? 'bg-[#C2410C] text-white border-[#C2410C]'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  Intersection View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWorkbenchLayer('area')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    activeWorkbenchLayer !== 'notice'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  Math Proof Layer
                </button>
              </div>
            </div>

            {/* MAP & BLUEPRINT WORKBENCH */}
            <div id="interactive-map-workbench">
              <AnnotatedMapWorkbench
                activeLayer={activeWorkbenchLayer}
                onSelectLayer={setActiveWorkbenchLayer}
              />
            </div>

            {/* Three Scales of Urban Structure */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div>
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  URBAN STRUCTURE EXAMPLES
                </div>
                <h3 className="text-lg font-serif font-semibold text-stone-900">
                  Three Scales of Barcelona’s Grid
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CITY_STRUCTURE_EXAMPLES.map((example) => (
                  <article
                    key={example.id}
                    className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 bg-stone-900 overflow-hidden border-b border-stone-200">
                        <img
                          src={example.image}
                          alt={example.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#C2410C] font-semibold">
                          {example.scaleLabel}
                        </div>
                        <h4 className="text-sm font-serif font-semibold text-stone-900">
                          {example.title}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {example.observation}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 space-y-1.5">
                      <div className="p-2.5 rounded-md bg-[#F8F7F4] border border-stone-200/70 text-xs text-stone-700">
                        <span className="font-mono font-semibold text-[#0369A1]">Math: </span>
                        {example.geometricInsight}
                      </div>
                      <div className="text-[11px] font-mono text-stone-400">
                        {example.metrics}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Historical Context */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4 border-t border-stone-200">
              <figure className="lg:col-span-4 bg-white border border-stone-200 rounded-xl overflow-hidden">
                <img
                  src={GENERATED_IMAGES.historicalPlan}
                  alt="Archival 1859 Pla Cerdà plan"
                  referrerPolicy="no-referrer"
                  className="w-full h-52 object-cover"
                />
                <figcaption className="p-3.5 space-y-1">
                  <div className="text-[11px] font-mono text-stone-500">1859 PLA CERDÀ</div>
                  <h4 className="text-xs font-serif font-semibold text-stone-900">
                    Cerdà’s Extension Plan
                  </h4>
                  <p className="text-xs text-stone-600">
                    Designed with 113.3 m blocks, 20 m streets, and 45° corner chamfers for steam tram turns.
                  </p>
                </figcaption>
              </figure>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {HISTORICAL_MILESTONES.map((milestone) => (
                  <div
                    key={milestone.title}
                    className="bg-white border border-stone-200 rounded-lg p-3.5 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono text-stone-500 flex justify-between">
                        <span className="text-[#C2410C] font-semibold">{milestone.year}</span>
                        <span>{milestone.sourceName}</span>
                      </div>
                      <h4 className="text-xs font-serif font-semibold text-stone-900 mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {milestone.summary}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-[#0369A1] bg-[#F8F7F4] p-2 rounded">
                      {milestone.mathConnection}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 • EXPLAIN THE MATHEMATICS */}
        <section id="section-explain" className="py-10 px-6 border-b border-stone-200 bg-[#F4F1EA]/60">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  SECTION 02 · EXPLAIN THE MATHEMATICS
                </div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mt-1">
                  Three Mathematical Investigations
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Full step-by-step calculations for block area, solar trigonometry, and symmetry.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-600 shrink-0">
                <span className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-[#C2410C]" /> s = 113.3 m
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" /> tan θ = 20/20
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#0369A1]" /> Group D₄
                </span>
              </div>
            </div>

            <StepByStepMathSection
              activeLayer={activeWorkbenchLayer}
              onSelectAndScrollToLayer={handleSelectAndScrollToWorkbench}
            />
          </div>
        </section>

        {/* SECTION 3 • CREATE INSPIRED WORK */}
        <section id="section-create" className="py-10 px-6 border-b border-stone-200">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs font-mono text-[#C2410C] font-semibold">
                  SECTION 03 · CREATE INSPIRED WORK
                </div>
                <h2 className="text-2xl font-serif font-semibold text-stone-900 mt-1">
                  Xamfrà Variations: Parametric Superblock Studio
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Interactive parametric tool demonstrating how varying cut <span className="font-mono">c</span> and height <span className="font-mono">h</span> balances private area against public plazas and sunlight.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 shrink-0">
                <Sparkles className="w-4 h-4 text-[#C2410C]" />
                <span>Notice → Explain → Create</span>
              </div>
            </div>

            <CreateInspiredStudio />
          </div>
        </section>

        {/* SECTION 4 • SOURCES & BIBLIOGRAPHY */}
        <section id="section-sources" className="py-10 px-6 bg-[#F4F1EA]/50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C2410C] font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>SOURCES &amp; REFERENCES</span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900">
                Works Cited
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-stone-600">
                <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3">
                  <strong className="text-stone-900 block font-sans">Equinox Magazine</strong>
                  <span>Urban morphology &amp; 45° chamfer plaza transformation.</span>
                </div>
                <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3">
                  <strong className="text-stone-900 block font-sans">Failed Architecture</strong>
                  <span>113.3 m blocks, 20 m streets &amp; steam tram turning radiuses.</span>
                </div>
                <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3">
                  <strong className="text-stone-900 block font-sans">Substack</strong>
                  <span>20 m height cap &amp; 45° sunlight trigonometry (tan θ = 20/20).</span>
                </div>
                <div className="bg-[#F8F7F4] border border-stone-200/80 rounded-lg p-3">
                  <strong className="text-stone-900 block font-sans">arXiv Physics</strong>
                  <span>Densification metrics &amp; modern Superblock morphology.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 px-6 py-4 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span>Amina Kaiyrbek</span>
            <span className="mx-2">·</span>
            <span>APP201 Midterm Project</span>
            <span className="mx-2">·</span>
            <span>SFBU</span>
          </div>
          <a href="#top" className="hover:text-stone-900 transition-colors">
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
