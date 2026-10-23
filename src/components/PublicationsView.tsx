import React from "react";
import { ExternalLink } from "lucide-react";

export interface PublicationItem {
  year: string;
  tag: string;
  title: string;
  publisher: string;
  role: string;
  description: string;
  status: string;
  url: string;
}

export const PUBLICATIONS_DATA: PublicationItem[] = [
  {
    year: "2026",
    tag: "NEUROSURGERY // OPERATIVE ATLAS",
    title: "Neurosurgical Anatomy & Biomechanics of Saccular Intracranial Aneurysms",
    publisher: "Journal of Vascular Neurosurgery",
    role: "Lead Medical Illustrator & Co-Author",
    description: "Multi-layered surgical schematics depicting pterional craniotomy trajectory, trans-sylvian dissection, and microvascular clipping of MCA bifurcation aneurysms. Correlated with intraoperative indocyanine green (ICG) angiography.",
    status: "Published & Indexed",
    url: "#"
  },
  {
    year: "2026",
    tag: "CMF SURGERY // TEXTBOOK PLATES",
    title: "Operative Manual of Craniomaxillofacial Trauma & Rigid Fixation",
    publisher: "Academic Press / Thieme Medical Publishers",
    role: "Contributing Anatomical Illustrator",
    description: "Series of 18 high-fidelity anatomical plates visualizing Champy line biomechanics, subciliary and transconjunctival orbital exploration pathways, and Le Fort fracture reduction vectors.",
    status: "In Press / 2nd Edition",
    url: "#"
  },
  {
    year: "2025",
    tag: "OTOLARYNGOLOGY // HEAD & NECK",
    title: "Surgical Management of Deep Parotid Space Lesions and Facial Nerve Preservation",
    publisher: "Head & Neck Surgery Review",
    role: "Medical Illustrator",
    description: "Stepwise dissection plates identifying the stylomastoid foramen landmark, tragal pointer, and pes anserinus branching variants during superficial parotidectomy.",
    status: "Peer Reviewed Figure Series",
    url: "#"
  },
  {
    year: "2025",
    tag: "EMERGENCY MEDICINE // CLINICAL GUIDE",
    title: "Point-of-Care Surgical Airway: Anatomical Landmarks and Tactile Feedback for Emergency Cricothyroidotomy",
    publisher: "Emergency Medicine Education Journal",
    role: "Illustrator & Instructional Designer",
    description: "Cross-sectional and superficial schematic plates emphasizing the cricothyroid membrane boundary, thyroid cartilage notch, and vascular safety zones during rapid cannula placement.",
    status: "Published Clinical Reference",
    url: "#"
  },
  {
    year: "2024",
    tag: "MEDICAL EDUCATION // CURRICULUM",
    title: "Pre-Health Mentorship Curricula & Active Learning Frameworks in Undergraduate Medical Education",
    publisher: "University of Cincinnati College of Medicine Symposium",
    role: "Lead Author & Visual Coordinator",
    description: "Curricular schematic mapping biochemical learning trajectories and clinical peer mentorship pathways for incoming medical students and pre-health candidates.",
    status: "Symposium Proceedings",
    url: "#"
  }
];

export const PublicationsView: React.FC = () => {
  return (
    <div id="publications_view" className="space-y-10 animate-in fade-in duration-300 w-full">
      <div className="border-b border-zinc-200 dark:border-zinc-900 pb-5 w-full">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#E05338] dark:text-[#E05338] uppercase block mb-1 font-medium">
          SCHOLARSHIP &amp; BIBLIOGRAPHY
        </span>
        <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-white">
          Publications
        </h2>
        <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed w-full">
          Anatomical plates, operative manuals, and clinical figures drafted for academic textbooks, peer-reviewed journals, and surgical education.
        </p>
      </div>

      <div className="space-y-6 w-full">
        {PUBLICATIONS_DATA.map((item, idx) => (
          <div
            key={idx}
            className="p-6 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/70 shadow-xs dark:shadow-none w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[8px] tracking-widest text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 uppercase font-medium">
                {item.year}
              </span>
              <a
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white p-1 -mr-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                title="Open publication in new tab"
                aria-label={`Open "${item.title}" publication in new tab`}
              >
                <ExternalLink size={14} />
              </a>
            </div>

            <h3 className="text-base font-normal tracking-tight text-zinc-950 dark:text-white mb-1.5">
              {item.title}
            </h3>

            <div className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 mb-3 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Publisher:</span>{" "}
                {item.publisher}
              </span>
              <span>
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Role:</span>{" "}
                {item.role}
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed w-full">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationsView;
