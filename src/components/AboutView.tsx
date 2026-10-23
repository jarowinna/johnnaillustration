import React from "react";
import portraitImg from "../assets/images/john_na_portrait_1790136342634.jpg";

export const AboutView: React.FC = () => {
  return (
    <div id="about_view" className="space-y-10 animate-in fade-in duration-300 w-full">
      <div className="border-b border-zinc-200 dark:border-zinc-900 pb-5 w-full">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#E05338] dark:text-[#E05338] uppercase block mb-1 font-medium">
          BIOGRAPHY &amp; BACKGROUND
        </span>
        <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-white">
          About John Na
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full">
        <div className="md:col-span-4 lg:col-span-4 space-y-2">
          <div className="relative aspect-square w-full max-w-[280px] md:max-w-none rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm">
            <img
              src={portraitImg}
              alt="John Na - Medical Student and Medical Illustrator"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between px-0.5">
            <span>John Na</span>
            <span>MD Candidate &apos;27</span>
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-8 space-y-5 text-xs text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
          <p className="w-full">
            John Na is a medical student at the University of Cincinnati College of Medicine (Class of 2027) and a professional medical illustrator. His work bridges complex clinical medicine with graphic and anatomical clarity, creating publication-grade surgical schematics, anatomical plates, and instructional media for academic publishers, surgical attendings, and medical trainees.
          </p>
          <p className="w-full">
            Drawing on background coursework in biochemistry and extensive cadaveric laboratory dissection, John specializes in translating intricate three-dimensional surgical relationships—such as pterional approaches to intracranial aneurysms, skull base craniofacial fracture patterns, and deep cervical fascial spaces—into pedagogical illustrations that clarify spatial anatomy and operative sequence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-200 dark:border-zinc-900 pt-8 w-full">
        <div className="space-y-2">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#E05338] dark:text-[#E05338] uppercase block font-medium">
            ACADEMIC AFFILIATION
          </span>
          <div className="text-xs text-zinc-700 dark:text-zinc-300 space-y-1">
            <p className="text-zinc-950 dark:text-white font-normal">
              University of Cincinnati College of Medicine
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
              MD Candidate, Class of 2027
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 font-mono text-[10px]">
              Bachelor of Science in Biochemistry
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#E05338] dark:text-[#E05338] uppercase block font-medium">
            CLINICAL &amp; VISUAL FOCUS
          </span>
          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>• Vascular Neurosurgery &amp; Skull Base Approaches</li>
            <li>• Craniomaxillofacial Trauma &amp; Rigid Fixation</li>
            <li>• Otolaryngology — Head &amp; Neck Surgical Dissection</li>
            <li>• Undergraduate Medical Education Curricula</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
