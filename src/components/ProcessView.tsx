import React from "react";

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    phase: "INVESTIGATION & RADIOGRAPHIC CORRELATION",
    title: "Cadaveric Dissection & 3D DICOM Segmentation",
    description: "Every anatomical plate originates from direct cadaveric dissection observations, multi-slice CT/MRI DICOM volumetric reconstructions, and unedited intraoperative surgical recordings. Attending surgical staff provide operative notes to clarify tissue planes, vascular variations, and pathology margins."
  },
  {
    number: "02",
    phase: "SPATIAL ARCHITECTURE & VALUE STUDIES",
    title: "Structural Schematics & Volumetric Drafting",
    description: "Preliminary pencil and digital value drafts establish spatial hierarchy, depth of field, and directional vectors of surgical instrumentation. Fascial boundaries, neurovascular bundles, and bony landmarks are positioned with rigorous geometric accuracy before color rendering."
  },
  {
    number: "03",
    phase: "CHROMATIC HIERARCHY & TEXTURE",
    title: "Digital Painting & Diagrammatic Lucidity",
    description: "High-resolution digital rendering balances photorealistic surgical texture with textbook clarity. Chromatic palettes follow strict anatomical conventions: oxygenated arterial trees, venous plexuses, cranial nerve pathways, and mucosal borders are distinctly indexed."
  },
  {
    number: "04",
    phase: "VERIFICATION & EDITORIAL STANDARDS",
    title: "Surgical Attending Peer Review & Compliance",
    description: "Before final editorial submission, drafts undergo multi-stage review with clinical faculty in neurosurgery, otolaryngology, and gross anatomy. All anatomical labeling conforms strictly to international Terminologia Anatomica standards."
  }
];

export const ProcessView: React.FC = () => {
  return (
    <div id="process_view" className="space-y-12 animate-in fade-in duration-300 w-full">
      <div className="border-b border-zinc-200 dark:border-zinc-900 pb-5 w-full">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#E05338] dark:text-[#E05338] uppercase block mb-1 font-medium">
          METHODOLOGY
        </span>
        <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-white">
          Illustration Process
        </h2>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed w-full">
          Synthesizing direct cadaveric dissection, 3D radiographic segmentation, and surgical consultation into pedagogical visual assets.
        </p>
      </div>

      <div className="relative pl-12 space-y-8 w-full">
        <div className="absolute left-[15.5px] top-6 bottom-6 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
        {PROCESS_STEPS.map((step) => (
          <div key={step.number} className="relative group w-full">
            <div className="absolute left-[-48px] top-5 w-8 h-8 rounded-full bg-[#E05338] flex items-center justify-center font-mono text-xs font-semibold text-white shadow-xs z-10">
              {step.number}
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-800 shadow-xs dark:shadow-none w-full">
              <h3 className="text-base font-normal tracking-tight text-zinc-950 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed w-full">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/20 p-6 rounded space-y-4 w-full">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#E05338] dark:text-[#E05338] uppercase block font-medium">
          TECHNICAL APPARATUS &amp; SOFTWARE
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[10px]">
          <div>
            <span className="text-zinc-600 dark:text-zinc-400 uppercase block mb-1 font-medium">
              Digital Rendering
            </span>
            <p className="text-zinc-800 dark:text-zinc-300">
              Adobe Photoshop, Adobe Illustrator, Procreate, Clip Studio Paint
            </p>
          </div>
          <div>
            <span className="text-zinc-600 dark:text-zinc-400 uppercase block mb-1 font-medium">
              Radiography &amp; 3D
            </span>
            <p className="text-zinc-800 dark:text-zinc-300">
              3D Slicer, OsiriX DICOM Viewer, Blender 3D, MeshLab
            </p>
          </div>
          <div>
            <span className="text-zinc-600 dark:text-zinc-400 uppercase block mb-1 font-medium">
              Traditional Media
            </span>
            <p className="text-zinc-800 dark:text-zinc-300">
              Carbon Dust, Carbon Pencil, Ink &amp; Wash, Wolff&apos;s Carbon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessView;
