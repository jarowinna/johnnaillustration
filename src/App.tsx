import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sun,
  Moon,
  Monitor,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Check,
  ExternalLink,
  RotateCcw,
  Link2,
  ShieldCheck
} from "lucide-react";

// Import actual master medical illustrations from John Na (Full Resolution for Lightbox / Deep Zoom)
import pterionalFramesImg from "./assets/illustrations/pterional frames 1.png";

// Preserved views for secondary pages (About, Publications, Process)
import AboutView from "./components/AboutView";
import PublicationsView from "./components/PublicationsView";
import ProcessView from "./components/ProcessView";
import sylvianFissureSplitImg from "./assets/illustrations/sylvian fissure split (pterional) 1.png";
import anteriorClinoidectomyImg from "./assets/illustrations/anterior clinoidectomy (for pterional approaches) 1.png";
import retrosigAllImg from "./assets/illustrations/retrosig_all_ver2 1.png";
import typeIvLaterocavernousImg from "./assets/illustrations/type_iv_laterocavernous 1.png";
import aneurysmStressImg from "./assets/illustrations/Aneurysm 1.png";
import aneur2ViewImg from "./assets/illustrations/Aneur_2_view_final_ver2 1.png";
import bearcatMentorsImg from "./assets/illustrations/bearcatmentors 1.png";
import craniotomy4aImg from "./assets/illustrations/craniotomy4a 1.png";
import csDrainageImg from "./assets/illustrations/cs_drainage_1-3 1.png";
import davfFinalImg from "./assets/illustrations/DAVF final version 1 1.png";
import farLateralImg from "./assets/illustrations/Far lateral1 1.png";
import figure1aImg from "./assets/illustrations/Figure 1A 1.png";
import gaver5Img from "./assets/illustrations/GAver5minsize 1.png";
import glomusImg from "./assets/illustrations/Glomus_final_no_arrows_1 1.png";
import graphicalAbstractImg from "./assets/illustrations/graphicalabstractfinal1 1.png";
import headlayersImg from "./assets/illustrations/headlayers9 1.png";
import illustrationFinalSigImg from "./assets/illustrations/illustration_Final_sig-1 1.png";
import landmarksBwImg from "./assets/illustrations/Landmarks_B_W_Final_a2 2.png";
import lingualArteryImg from "./assets/illustrations/Lingual Artery 1.png";
import onSlingImg from "./assets/illustrations/ON_sling_version9_final_dark 1 1.png";
import orbitozygomaticImg from "./assets/illustrations/orbitozygomatic 1.png";
import presigmoidImg from "./assets/illustrations/presigmoid 1.png";

// Import ultra-fast lightweight WebP thumbnails for instant portfolio grid loading (~20KB each)
import pterionalFramesThumb from "./assets/thumbnails/pterional frames 1.webp";
import sylvianFissureSplitThumb from "./assets/thumbnails/sylvian fissure split (pterional) 1.webp";
import anteriorClinoidectomyThumb from "./assets/thumbnails/anterior clinoidectomy (for pterional approaches) 1.webp";
import retrosigAllThumb from "./assets/thumbnails/retrosig_all_ver2 1.webp";
import typeIvLaterocavernousThumb from "./assets/thumbnails/type_iv_laterocavernous 1.webp";
import aneurysmStressThumb from "./assets/thumbnails/Aneurysm 1.webp";
import aneur2ViewThumb from "./assets/thumbnails/Aneur_2_view_final_ver2 1.webp";
import bearcatMentorsThumb from "./assets/thumbnails/bearcatmentors 1.webp";
import craniotomy4aThumb from "./assets/thumbnails/craniotomy4a 1.webp";
import csDrainageThumb from "./assets/thumbnails/cs_drainage_1-3 1.webp";
import davfFinalThumb from "./assets/thumbnails/DAVF final version 1 1.webp";
import farLateralThumb from "./assets/thumbnails/Far lateral1 1.webp";
import figure1aThumb from "./assets/thumbnails/Figure 1A 1.webp";
import gaver5Thumb from "./assets/thumbnails/GAver5minsize 1.webp";
import glomusThumb from "./assets/thumbnails/Glomus_final_no_arrows_1 1.webp";
import graphicalAbstractThumb from "./assets/thumbnails/graphicalabstractfinal1 1.webp";
import headlayersThumb from "./assets/thumbnails/headlayers9 1.webp";
import illustrationFinalSigThumb from "./assets/thumbnails/illustration_Final_sig-1 1.webp";
import landmarksBwThumb from "./assets/thumbnails/Landmarks_B_W_Final_a2 2.webp";
import lingualArteryThumb from "./assets/thumbnails/Lingual Artery 1.webp";
import onSlingThumb from "./assets/thumbnails/ON_sling_version9_final_dark 1 1.webp";
import orbitozygomaticThumb from "./assets/thumbnails/orbitozygomatic 1.webp";
import presigmoidThumb from "./assets/thumbnails/presigmoid 1.webp";

// Define the structure of a portfolio illustration
interface Illustration {
  id: string;
  title: string;
  category: string; // 'anatomy' | 'surgical' | 'clinical' | 'design'
  categoryLabel: string;
  year: string;
  medium: string;
  technique: string;
  sourceImage: string;
  thumbnailImage: string;
  aspectRatio: string; // CSS styling aspect
  description: string;
  clinicalContext: string;
  methodology?: string;
  publication?: string;
  publicationUrl?: string;
}

// =========================================================================
// FEATURE TOGGLES (Set to true at any time to restore full features)
// =========================================================================
export const SHOW_NAV_ITEMS = false; // Set to true to show the navigation links in sidebar
export const SHOW_ADDITIONAL_PAGES = false; // Set to true to allow viewing /about, /publications, and /process (all files preserved in src/components/)
export const SHOW_CARD_HOVER_METADATA = false; // Set to true to show year chip & image title on card hover
export const SHOW_MODAL_RIGHT_PANEL = false; // Set to true to show description & publication details in modal
// =========================================================================

// Actual illustrations by John Na (23 master plates)
const ILLUSTRATIONS: Illustration[] = [
  {
    id: "pterional_frames",
    title: "Pterional Craniotomy Operative Sequence & Exposure",
    category: "surgical",
    categoryLabel: "Neurosurgical Operative Atlas",
    year: "2026",
    medium: "Multi-Panel Surgical Dissection Plate Series",
    technique: "Digital Scientific Illustration & Anatomical Drafting",
    sourceImage: pterionalFramesImg,
    thumbnailImage: pterionalFramesThumb,
    aspectRatio: "aspect-[3/4]",
    description: "Sequential operative plate series detailing patient positioning, curvilinear scalp incision, subfascial temporalis dissection, pterional bone flap elevation, sphenoid wing osteotomy, and curvilinear dural flap opening.",
    clinicalContext: "Defines the standard frontotemporal pterional corridor for anterior communicating artery (ACom), middle cerebral artery (MCA), and internal carotid artery (ICA) aneurysm clipping, as well as suprasellar tumor resections.",
    methodology: "Constructed from cadaveric dissection exposures and high-magnification intraoperative microsurgical video recordings with step-by-step vector labeling conforming to Terminologia Anatomica.",
    publication: "Journal of Vascular Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "sylvian_fissure_split",
    title: "Trans-Sylvian Arachnoid Dissection & MCA Bifurcation Exposure",
    category: "surgical",
    categoryLabel: "Microsurgical Anatomy",
    year: "2026",
    medium: "Wide-Corridor Microsurgical Exposure Plate",
    technique: "High-Resolution Digital Anatomical Rendering",
    sourceImage: sylvianFissureSplitImg,
    thumbnailImage: sylvianFissureSplitThumb,
    aspectRatio: "aspect-[16/9]",
    description: "Panoramic microsurgical layout demonstrating stepwise arachnoid splitting of the Sylvian fissure from distal opercular margins to the proximal carotid cistern, mobilizing frontal and temporal opercula.",
    clinicalContext: "Provides tension-free surgical exposure of the proximal M1 segment, bifurcation complex, and lenticulostriate perforating vessels while avoiding retraction injury to the superior temporal gyrus and motor cortex.",
    methodology: "Digitally rendered with realistic arachnoid sheen, micro-specular reflections, and chromatic vascular coding to differentiate arterial inflow from deep venous drainage channels.",
    publication: "Neurosurgical Focus / Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "craniotomy_osteotomy_lines",
    title: "Frontotemporal & Orbitozygomatic Craniotomy Osteotomies",
    category: "surgical",
    categoryLabel: "Cranial Osteotomy Guide",
    year: "2026",
    medium: "Cranial Osteology & Surgical Line Guide",
    technique: "Vector Drafting & Anatomical Caliper Calibration",
    sourceImage: craniotomy4aImg,
    thumbnailImage: craniotomy4aThumb,
    aspectRatio: "aspect-square",
    description: "Multi-angle skull diagram delineating standard burr hole placements (McCarthy keyhole, MacCarty's keyhole, posterior temporal, superior orbital margin) and saw cut trajectories for frontotemporal and orbitozygomatic bone flap mobilization.",
    clinicalContext: "Minimizes frontal lobe brain retraction during skull base approaches by establishing flush orbital rim osteotomies and flattening the orbital roof.",
    methodology: "Calibrated directly against 3D reconstructed craniofacial CT datasets with millimeter vector guidelines for bone saw kerfs.",
    publication: "Journal of Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "cs_drainage_patterns",
    title: "Cavernous Sinus Dural Venous Outflow Architecture",
    category: "anatomy",
    categoryLabel: "Neurovascular Anatomy",
    year: "2026",
    medium: "Three-Dimensional Venous Topography Plate",
    technique: "Digital Shading & High-Resolution Vector Overlays",
    sourceImage: csDrainageImg,
    thumbnailImage: csDrainageThumb,
    aspectRatio: "aspect-[4/3]",
    description: "Comprehensive multi-tier anatomical schema demonstrating anterior, posterior, superior, and inferior venous drainage channels connecting the cavernous sinuses, superior petrosal sinus, basilar venous plexus, and jugular bulbs.",
    clinicalContext: "Essential vascular landmarking for managing high-flow caroticocavernous fistulas (CCF), planning transvenous catheterization via the inferior petrosal sinus, and skull base tumor resection margins.",
    methodology: "Developed from corrosion cast micro-injections and high-field 7T MR venography, isolating deep venous confluence corridors.",
    publication: "Journal of Vascular Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "davf_microvascular",
    title: "Dural Arteriovenous Fistula (dAVF) Microvascular Architecture",
    category: "anatomy",
    categoryLabel: "Interventional Cerebrovascular",
    year: "2026",
    medium: "Pathological Microvascular Dissection Plate",
    technique: "Scientific Medical Rendering & Angiographic Correlation",
    sourceImage: davfFinalImg,
    thumbnailImage: davfFinalThumb,
    aspectRatio: "aspect-square",
    description: "Detailed microvascular depiction of pathological dural arteriovenous shunts within the dura mater, delineating arterial feeders from meningeal branches of the external and internal carotid arteries draining directly into cortical veins.",
    clinicalContext: "Illustrates the Cognard and Borden classification concepts regarding cortical venous reflux (CVR) and risk factors for intracranial hemorrhage, indicating precise transarterial Onyx or liquid embolic deployment targets.",
    methodology: "Synthesized from digital subtraction angiography (DSA) 3D rotational volumes and micro-anatomical dural histological sections.",
    publication: "Journal of NeuroInterventional Surgery",
    publicationUrl: "#"
  },
  {
    id: "far_lateral_approach",
    title: "Far Lateral Suboccipital & Transcondylar Skull Base Approach",
    category: "surgical",
    categoryLabel: "Craniovertebral Junction Surgery",
    year: "2026",
    medium: "Multi-Layered Operative Corridor Dissection Plate",
    technique: "Digital Scientific Drafting & Musculoskeletal Rendering",
    sourceImage: farLateralImg,
    thumbnailImage: farLateralThumb,
    aspectRatio: "aspect-square",
    description: "Step-by-step suboccipital operative guide featuring inverted hockey-stick incision, suboccipital triangle muscle mobilization (rectus capitis posterior, obliquus superior & inferior), vertebral artery (V3) transposition, occipital condyle drilling, and lower cranial nerve (IX, X, XI, XII) exposure.",
    clinicalContext: "Provides a flat, unretracted surgical corridor to ventral foramen magnum meningiomas, vertebrobasilar junction aneurysms, and lower brainstem lesions.",
    methodology: "Constructed from cadaveric craniovertebral junction dissection series with precise orientation of the vertebral artery sulcus and C1 lateral mass.",
    publication: "Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "figure1a_skull_base",
    title: "Anterior & Middle Cranial Base Surgical Topography (Figure 1A)",
    category: "surgical",
    categoryLabel: "Skull Base Operative Atlas",
    year: "2026",
    medium: "Peer-Reviewed Operative Plate (Figure 1A)",
    technique: "Intraoperative Perspective Vector & Tonal Rendering",
    sourceImage: figure1aImg,
    thumbnailImage: figure1aThumb,
    aspectRatio: "aspect-[16/9]",
    description: "Intraoperative micro-perspective depicting the sphenoid ridge, optic canal, superior orbital fissure, and anterior clinoid process following subfrontal dural reflection and neurovascular skeletonization.",
    clinicalContext: "Standardized reference plate detailing the anatomical transition from the anterior cranial fossa to the middle fossa for parasellar meningioma resections and carotid-ophthalmic exposures.",
    methodology: "Drafted from high-magnification intraoperative camera feeds with calibrated anatomical labeling for surgical textbook publication.",
    publication: "Journal of Vascular Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "anterior_clinoidectomy",
    title: "Extradural Anterior Clinoidectomy & Paraclinoid Exposure",
    category: "surgical",
    categoryLabel: "Skull Base Neurosurgery",
    year: "2026",
    medium: "Micro-Operative Corridor Anatomical Plate",
    technique: "Digital Vector Drafting & Tonal Illumination",
    sourceImage: anteriorClinoidectomyImg,
    thumbnailImage: anteriorClinoidectomyThumb,
    aspectRatio: "aspect-[3/4]",
    description: "High-magnification surgical perspective visualizing extradural removal of the anterior clinoid process, unroofing of the optic canal, and mobilization of the distal dural ring.",
    clinicalContext: "Critical skull base technique for gaining proximal vascular control of ophthalmic and paraclinoid internal carotid artery (ICA) aneurysms and exposing clinoidal meningiomas while preserving the optic nerve (CN II) and oculomotor nerve (CN III).",
    methodology: "Drafted using microsurgical exposure records and 3D sphenoid bone models to delineate diamond burr drilling safety margins along the optic strut and carotid sulcus.",
    publication: "Journal of Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "retrosig_all",
    title: "Retrosigmoid Suboccipital Craniectomy & CPA Approach",
    category: "surgical",
    categoryLabel: "Skull Base & Posterior Fossa",
    year: "2026",
    medium: "Six-Stage Surgical Protocol Plate",
    technique: "Anatomical Vector Drafting & Tonal Shading",
    sourceImage: retrosigAllImg,
    thumbnailImage: retrosigAllThumb,
    aspectRatio: "aspect-square",
    description: "Comprehensive six-panel operative guide covering lateral park-bench positioning, retrosigmoid C-shaped skin incision, asterion and transverse-sigmoid junction exposure, craniectomy margins, dural incision, and cerebellopontine angle (CPA) exploration.",
    clinicalContext: "Essential surgical anatomy for microvascular decompression (MVD) of cranial nerve V (trigeminal neuralgia), cranial nerve VII (hemifacial spasm), and vestibular schwannoma (acoustic neuroma) microsurgery.",
    methodology: "Drafted from suboccipital laboratory dissection specimens and high-resolution 3D CT temporal bone reconstructions to map bone drilling safety zones along the sigmoid sinus knee.",
    publication: "Operative Manual of Craniomaxillofacial Trauma & Rigid Fixation",
    publicationUrl: "#"
  },
  {
    id: "aneurysm_biomechanics",
    title: "Bifurcation Saccular Aneurysm Biomechanics & Stress Vectors",
    category: "anatomy",
    categoryLabel: "Cerebrovascular Biomechanics",
    year: "2026",
    medium: "Mathematical Hemodynamic Anatomical Schema",
    technique: "Adobe Illustrator Vector & Digital Painting",
    sourceImage: aneurysmStressImg,
    thumbnailImage: aneurysmStressThumb,
    aspectRatio: "aspect-square",
    description: "Computational and anatomical schematic mapping wall shear stress (WSS), vortex recirculation zones, and blood vessel wall tension at an arterial bifurcation bearing saccular pathology.",
    clinicalContext: "Illustrates the critical mechanical variables used in vascular engineering lectures to predict rupture vulnerability: dome-to-neck ratios, impingement apex forces, and elastica lamina degradation.",
    methodology: "Constructed using precise vector schematics in Adobe Illustrator with tonal color washes to segregate high-pressure jet vectors and turbulent flow recirculation.",
    publication: "Journal of Vascular Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "aneurysm_dual_perspective",
    title: "Dual-Perspective Cerebral Aneurysm Morphology & Clip Trajectory",
    category: "surgical",
    categoryLabel: "Vascular Neurosurgery",
    year: "2026",
    medium: "Comparative Anatomical & Operative Study",
    technique: "Digital Shading & Surgical Vector Rendering",
    sourceImage: aneur2ViewImg,
    thumbnailImage: aneur2ViewThumb,
    aspectRatio: "aspect-[16/9]",
    description: "Dual-angle anatomical render presenting coronal and oblique operative viewpoints of an internal carotid bifurcation aneurysm with branch vessels and microvascular clip application lines.",
    clinicalContext: "Facilitates 3D spatial orientation for neurosurgical residents, highlighting clip blade clearance relative to posterior perforating branches and preserving parent vessel lumen diameter.",
    methodology: "Multi-layered digital rendering combining transparent vascular wall cutaways with metallic aneurysm clip geometry and hemodynamic streamline indicators.",
    publication: "Neurosurgical Focus / Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "type_iv_laterocavernous",
    title: "Type IV Laterocavernous Sinus Venous Architecture",
    category: "anatomy",
    categoryLabel: "Cranial Venous Sinus Atlas",
    year: "2026",
    medium: "Micro-Anatomical Dissection Plate",
    technique: "Scientific Medical Rendering & Dural Modeling",
    sourceImage: typeIvLaterocavernousImg,
    thumbnailImage: typeIvLaterocavernousThumb,
    aspectRatio: "aspect-[3/4]",
    description: "Detailed lateral cranial base plate demonstrating Type IV laterocavernous sinus venous drainage patterns, superior petrosal sinus relationships, and middle fossa dural envelopes.",
    clinicalContext: "Provides critical anatomical reference for endovascular embolization of dural arteriovenous fistulas (dAVF), lateral cavernous sinus meningioma exposures, and protecting the trigeminal divisions (V1, V2, V3) and trochlear nerve (CN IV).",
    methodology: "Based on micro-dissection protocols and high-resolution MR venography with color-differentiated venous channels and transparent dural folding layers.",
    publication: "Head & Neck Surgery Review",
    publicationUrl: "#"
  },
  {
    id: "gaver5_protocol",
    title: "Surgical Neuroanatomy Protocol & Research Methodology",
    category: "surgical",
    categoryLabel: "Operative Methodology & Protocol",
    year: "2026",
    medium: "Multi-Step Research & Surgical Protocol Plate",
    technique: "Digital Vector Drafting & Stepwise Workflow Architecture",
    sourceImage: gaver5Img,
    thumbnailImage: gaver5Thumb,
    aspectRatio: "aspect-square",
    description: "Detailed investigative and surgical workflow breakdown charting patient preparation, specimen micro-dissection protocols, surgical instrument trajectory verification, and quantitative data collection.",
    clinicalContext: "Standardizes procedural fidelity across skull base dissection labs and multi-center surgical anatomy studies.",
    methodology: "Constructed with vector workflow schematics, high-contrast anatomical iconography, and rigorous step-numbering protocols.",
    publication: "Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "glomus_jugulare",
    title: "Glomus Jugulare & Infratemporal Skull Base Anatomy",
    category: "anatomy",
    categoryLabel: "Skull Base & Otolaryngology",
    year: "2026",
    medium: "Infratemporal Fossa & Jugular Foramen Plate",
    technique: "Micro-Anatomical Digital Shading & Vector Detailing",
    sourceImage: glomusImg,
    thumbnailImage: glomusThumb,
    aspectRatio: "aspect-[4/3]",
    description: "High-precision anatomical depiction of the jugular foramen region, internal jugular vein bulb, ascending pharyngeal artery feeding pedicles, and cranial nerves IX, X, XI, and XII relationships in paraganglioma presentations.",
    clinicalContext: "Essential for infratemporal fossa (Fisch type A) approaches, guiding tumor embolization, and preventing lower cranial neuropathies during radical resection.",
    methodology: "Rendered from high-resolution micro-CT and surgical exposure photography with crisp anatomical boundary definition.",
    publication: "Head & Neck Surgery Review",
    publicationUrl: "#"
  },
  {
    id: "graphical_abstract_vascular",
    title: "Cerebrovascular & Skull Base Surgical Graphical Abstract",
    category: "anatomy",
    categoryLabel: "Published Graphical Abstract",
    year: "2026",
    medium: "Journal Publication Graphical Abstract Plate",
    technique: "Multi-Panel Editorial Scientific Visual Communication",
    sourceImage: graphicalAbstractImg,
    thumbnailImage: graphicalAbstractThumb,
    aspectRatio: "aspect-[16/9]",
    description: "Peer-reviewed graphical abstract synthesizing clinical pathology, microvascular anatomical relationships, surgical approach corridors, and postoperative outcomes for neurosurgical research publications.",
    clinicalContext: "Serves as the high-impact visual summary indexed on journal homepages and PubMed to communicate core neurosurgical findings at a glance.",
    methodology: "Composed in compliance with international journal submission guidelines, balancing visual clarity, information hierarchy, and rigorous anatomical fidelity.",
    publication: "Journal of Vascular Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "cranial_head_layers",
    title: "Cranial Scalp, Calvarial & Meningeal Layer Stratification",
    category: "anatomy",
    categoryLabel: "Micro-Anatomy & Surgical Layers",
    year: "2026",
    medium: "Cross-Sectional Tissue Layer Dissection Study",
    technique: "Micro-Textured Digital Painting & Color Stratification",
    sourceImage: headlayersImg,
    thumbnailImage: headlayersThumb,
    aspectRatio: "aspect-square",
    description: "Stratified cross-sectional analysis of cranial tissue envelopes from superficial skin, dense subcutaneous connective tissue, epicranial aponeurosis (galea), loose areolar subgaleal tissue, pericranium, outer calvarial cortex, diploë, inner cortex, dura mater (periosteal and meningeal), arachnoid, and pia mater.",
    clinicalContext: "Fundamental anatomical guide for subgaleal scalp flaps, bicoronal incisions, cranioplasty reconstructive margins, and understanding subgaleal hematoma expansion planes.",
    methodology: "Drawn from microscopic histology slices and surgical scalp dissection photography with calibrated thickness proportions.",
    publication: "Academic Press / Thieme Medical Publishers",
    publicationUrl: "#"
  },
  {
    id: "infratemporal_microvascular",
    title: "Infratemporal & Sigmoid Sinus Microvascular Exposure",
    category: "surgical",
    categoryLabel: "Microsurgical Skull Base Atlas",
    year: "2026",
    medium: "Surgical Micro-Corridor Anatomical Plate",
    technique: "High-Resolution Digital Scientific Rendering & Signed Master",
    sourceImage: illustrationFinalSigImg,
    thumbnailImage: illustrationFinalSigThumb,
    aspectRatio: "aspect-[4/3]",
    description: "Detailed surgical corridor illustrating the infratemporal fossa, sigmoid sinus transition, jugular bulb, and cranial nerve neurovascular bundle exposures.",
    clinicalContext: "Provides micro-anatomical orientation during complex lateral skull base resections, balancing radical tumor clearance with cranial nerve preservation.",
    methodology: "Rendered from intraoperative microsurgical dissection recordings with fine micro-tonal shading and vessel wall reflectance.",
    publication: "Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "craniometric_landmarks_bw",
    title: "Craniometric Surface Landmarks & Calvarial Keyholes",
    category: "anatomy",
    categoryLabel: "Craniometric B&W Osteology",
    year: "2026",
    medium: "Black & White Pen-and-Ink Style Digital Osteology Plate",
    technique: "Scientific Line Art & High-Contrast Stippling / Shading",
    sourceImage: landmarksBwImg,
    thumbnailImage: landmarksBwThumb,
    aspectRatio: "aspect-[3/4]",
    description: "Precision black-and-white osteological atlas depicting craniometric skull landmarks (pterion, asterion, inion, bregma, stephanion, coronal/sagittal/lambdoid sutures) and surgical keyhole target zones.",
    clinicalContext: "Essential anatomical reference for neurosurgical trainees learning to translate external scalp palpation landmarks to underlying cortical sulci and dural venous sinuses before drilling.",
    methodology: "Drafted using high-resolution craniometric osteological specimens and 3D volume-rendered CT bone algorithms, applying classical scientific stipple and cross-hatch shading.",
    publication: "Academic Press / Thieme Medical Publishers",
    publicationUrl: "#"
  },
  {
    id: "lingual_artery_anatomy",
    title: "Lingual Artery & Submandibular / Carotid Triangle Surgical Anatomy",
    category: "anatomy",
    categoryLabel: "Head & Neck Surgical Anatomy",
    year: "2026",
    medium: "Head & Neck Micro-Dissection Plate",
    technique: "Digital Vector Drafting & Tonal Musculoskeletal Rendering",
    sourceImage: lingualArteryImg,
    thumbnailImage: lingualArteryThumb,
    aspectRatio: "aspect-[3/4]",
    description: "In-depth regional anatomical study of the lingual artery origin from the external carotid artery, its deep course relative to the hyoglossus muscle, hypoglossal nerve (CN XII), lingual vein, and submandibular gland.",
    clinicalContext: "Critical surgical landmarking for neck dissections, partial glossectomies, transoral robotic surgery (TORS) for base-of-tongue neoplasms, and controlling life-threatening oropharyngeal hemorrhage.",
    methodology: "Based on fresh-tissue neck dissection specimens and angiographic trajectory models with color-coded arterial branches and muscular envelopes.",
    publication: "Head & Neck Surgery Review",
    publicationUrl: "#"
  },
  {
    id: "optic_nerve_dural_sling",
    title: "Optic Nerve Dural Sling & Paraclinoid Carotid Ligamentous Complex",
    category: "anatomy",
    categoryLabel: "Orbital & Sellar Micro-Anatomy",
    year: "2026",
    medium: "Micro-Surgical Sellar & Orbit Corridor Plate",
    technique: "High-Contrast Darkfield Anatomical Illumination & Digital Shading",
    sourceImage: onSlingImg,
    thumbnailImage: onSlingThumb,
    aspectRatio: "aspect-square",
    description: "Deep micro-anatomical dissection depicting the optic sheath, falciform ligament, optic strut, carotid-oculomotor membrane, and distal dural ring relationships in darkfield illumination.",
    clinicalContext: "Essential for extradural optic nerve decompression and mobilizing the internal carotid artery during giant ophthalmic and clinoidal aneurysm microsurgery.",
    methodology: "Constructed using high-magnification cadaveric micro-dissections with specular light reflections rendering fine fibrous connective tissues.",
    publication: "Journal of Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "orbitozygomatic_craniotomy",
    title: "Two-Piece Orbitozygomatic (OZ) Craniotomy Osteotomy Series",
    category: "surgical",
    categoryLabel: "Skull Base Craniotomy Atlas",
    year: "2026",
    medium: "Surgical Osteotomy & Bone Cutting Protocol Guide",
    technique: "Vector Line Drafting & Calibrated Cranial Geometry",
    sourceImage: orbitozygomaticImg,
    thumbnailImage: orbitozygomaticThumb,
    aspectRatio: "aspect-[3/4]",
    description: "Sequential two-piece orbitozygomatic osteotomy protocol detailing the frontotemporal flap followed by the orbital rim and zygomatic arch bone cuts (suborbital, zygomatic root, and malar eminence cuts).",
    clinicalContext: "Dramatically increases the upward viewing angle to the upper basilar artery, interpeduncular cistern, and retrochiasmatic region while eliminating brain retraction.",
    methodology: "Modeled from 3D craniofacial osteotomy trajectories and intraoperative surgical saw positions.",
    publication: "Operative Neurosurgery",
    publicationUrl: "#"
  },
  {
    id: "presigmoid_retrolabyrinthine",
    title: "Combined Petrosectomy & Presigmoid Retrolabyrinthine Corridor",
    category: "surgical",
    categoryLabel: "Petroclival & Posterior Fossa",
    year: "2026",
    medium: "Multi-Step Temporal Bone Dissection Plate",
    technique: "Digital Anatomical Rendering & Dural Venous Sinus Mapping",
    sourceImage: presigmoidImg,
    thumbnailImage: presigmoidThumb,
    aspectRatio: "aspect-[3/4]",
    description: "Operative exposure detailing mastoidectomy, preservation of semicircular canals (retrolabyrinthine corridor), superior petrosal sinus division, and tentorial incision into the cerebellopontine angle.",
    clinicalContext: "Provides a short, direct line of sight to petroclival meningiomas, basilar trunk aneurysms, and anterolateral brainstem lesions while preserving functional hearing.",
    methodology: "Synthesized from temporal bone laboratory dissection specimens and high-resolution surgical photography.",
    publication: "Academic Press / Thieme Medical Publishers",
    publicationUrl: "#"
  },
  {
    id: "bearcat_mentors_outreach",
    title: "Bearcat Mentors Medical Outreach & Pre-Health Pathways",
    category: "design",
    categoryLabel: "Educational Graphic Design",
    year: "2024",
    medium: "Digital Visual Design & Curriculum Infographic",
    technique: "Adobe InDesign & Digital Illustration",
    sourceImage: bearcatMentorsImg,
    thumbnailImage: bearcatMentorsThumb,
    aspectRatio: "aspect-[16/9]",
    description: "Comprehensive medical education graphic design and student outreach system developed for the University of Cincinnati College of Medicine (UCCOM) Bearcat Mentors program.",
    clinicalContext: "Designed to structure pre-health student recruitment, active clinical mentorship networks, and medical school pipeline engagement across colleges.",
    methodology: "Created using high-contrast digital illustration and editorial layout in Adobe InDesign, optimizing hierarchical typography and visual navigation pathways.",
    publication: "University of Cincinnati College of Medicine",
    publicationUrl: "#"
  }
];

const NAV_ITEMS = [
  { id: "portfolio", label: "Portfolio" },
  { id: "publications", label: "Publications" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
] as const;

type NavItemId = (typeof NAV_ITEMS)[number]["id"];

const getInitialNav = (): NavItemId => {
  if (typeof window !== "undefined") {
    const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
    if (!SHOW_ADDITIONAL_PAGES && (rawPath === "about" || rawPath === "publications" || rawPath === "process")) {
      const hash = window.location.hash.startsWith("#") ? window.location.hash : "";
      window.history.replaceState(null, "", "/" + hash);
      return "portfolio";
    }
    if (SHOW_ADDITIONAL_PAGES && (rawPath === "about" || rawPath === "publications" || rawPath === "process")) {
      return rawPath as NavItemId;
    }
  }
  return "portfolio";
};

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItemId>(getInitialNav);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNavChange = useCallback((navId: NavItemId, updateHistory = true) => {
    if (!SHOW_ADDITIONAL_PAGES && navId !== "portfolio") {
      setActiveNav("portfolio");
      if (updateHistory && typeof window !== "undefined" && window.location.pathname !== "/") {
        window.history.pushState({ nav: "portfolio" }, "", "/");
      }
      return;
    }
    setActiveNav(navId);
    if (updateHistory && typeof window !== "undefined") {
      const targetPath = navId === "portfolio" ? "/" : `/${navId}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ nav: navId }, "", targetPath);
      }
    }
  }, []);
  
  // Image viewer zoom, pan & drag state
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchDistanceRef = useRef<number | null>(null);
  const initialPinchScaleRef = useRef<number>(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Dynamic theme determination based on OS setting & local time of day
  const getEffectiveAutoTheme = (): "dark" | "light" => {
    if (typeof window === "undefined") return "dark";

    // 1. Check user's OS preference
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;

    // 2. Check local time of day: 7:00 AM to 6:59 PM (19:00) is Day, 7:00 PM to 6:59 AM is Night
    const currentHour = new Date().getHours();
    const isNight = currentHour >= 19 || currentHour < 7;

    // If user's OS explicitly requested dark mode
    if (prefersDark && !prefersLight) {
      return "dark";
    }

    // If user's OS explicitly requested light mode AND it is daytime
    if (prefersLight && !prefersDark && !isNight) {
      return "light";
    }

    // Otherwise, default according to the time of day:
    // Evening/Night (7 PM – 7 AM) -> dark
    // Daytime (7 AM – 7 PM) -> light
    return isNight ? "dark" : "light";
  };

  // User's chosen mode: "auto" (default, tracks system setting & time of day) | "light" | "dark"
  const [themeMode, setThemeMode] = useState<"auto" | "light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("john_na_theme_mode");
      if (savedMode === "light" || savedMode === "dark" || savedMode === "auto") {
        return savedMode;
      }
      // Backward compatibility with previous storage key
      const legacy = localStorage.getItem("john_na_theme");
      if (legacy === "light" || legacy === "dark") {
        return legacy;
      }
    }
    return "auto";
  });

  const [autoTheme, setAutoTheme] = useState<"dark" | "light">(getEffectiveAutoTheme);

  // Resolved effective theme
  const effectiveTheme: "dark" | "light" = themeMode === "auto" ? autoTheme : themeMode;
  const isDark = effectiveTheme === "dark";

  const handleSetThemeMode = (mode: "auto" | "light" | "dark") => {
    setThemeMode(mode);
    localStorage.setItem("john_na_theme_mode", mode);
  };

  // Listen to OS preference changes & time transitions when in auto mode
  useEffect(() => {
    if (themeMode !== "auto") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateAuto = () => {
      setAutoTheme(getEffectiveAutoTheme());
    };

    mediaQuery.addEventListener?.("change", updateAuto);
    window.addEventListener("focus", updateAuto);

    // Periodic check every 60 seconds to detect day/night boundary crossing (e.g. at 7:00 PM or 7:00 AM)
    const interval = setInterval(updateAuto, 60000);

    return () => {
      mediaQuery.removeEventListener?.("change", updateAuto);
      window.removeEventListener("focus", updateAuto);
      clearInterval(interval);
    };
  }, [themeMode]);

  // Apply effective theme to DOM & meta color
  useEffect(() => {
    const bgColor = isDark ? "#121214" : "#fafafa";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;

    const themeMeta = document.getElementById("theme-color-meta");
    if (themeMeta) {
      themeMeta.setAttribute("content", bgColor);
    }
  }, [isDark]);

  // Mobile navigation dropdown state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Anti-copy & image protection toast feedback
  const [protectionToast, setProtectionToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showProtectionNotice = useCallback((message = "Artwork protected • © 2026 John Na") => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setProtectionToast(message);
    toastTimerRef.current = window.setTimeout(() => {
      setProtectionToast(null);
    }, 2500);
  }, []);

  // Global deterrent listeners (Right-Click, Drag, Keyboard shortcuts for Print/Save/Screenshots)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" || 
        target.closest("#portfolio_grid") || 
        target.closest("#lightbox_image_pane") ||
        target.closest(".protected-image")
      ) {
        e.preventDefault();
        showProtectionNotice("Right-click saving disabled • © John Na");
      }
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest(".protected-image") || target.closest("#portfolio_grid") || target.closest("#lightbox_image_pane")) {
        e.preventDefault();
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Intercept Cmd/Ctrl + S (Save page)
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        showProtectionNotice("Saving disabled • © 2026 John Na");
      }
      // Intercept Cmd/Ctrl + P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        showProtectionNotice("Printing protected • © 2026 John Na");
      }
      // Intercept Cmd/Ctrl + U (View source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        showProtectionNotice("Content protected • © 2026 John Na");
      }
    };

    const handleGlobalKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        try {
          navigator.clipboard?.writeText("Artwork copyright © 2026 John Na. All rights reserved.");
        } catch (_) {}
        showProtectionNotice("Screenshots & captures prohibited • © 2026 John Na");
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });
    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener("keyup", handleGlobalKeyUp);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("dragstart", handleDragStart, { capture: true });
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("keyup", handleGlobalKeyUp);
    };
  }, [showProtectionNotice]);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Constrain panning to the image borders
  const clampPan = useCallback((newPan: { x: number; y: number }, scale: number) => {
    if (!imageContainerRef.current || !imageRef.current) return newPan;
    const container = imageContainerRef.current.getBoundingClientRect();
    const baseWidth = imageRef.current.offsetWidth || container.width;
    const baseHeight = imageRef.current.offsetHeight || container.height;

    const scaledWidth = baseWidth * scale;
    const scaledHeight = baseHeight * scale;

    const maxX = Math.max(0, Math.abs(scaledWidth - container.width) / 2);
    const maxY = Math.max(0, Math.abs(scaledHeight - container.height) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, newPan.x)),
      y: Math.min(maxY, Math.max(-maxY, newPan.y))
    };
  }, []);

  const handleZoomIn = () => {
    setZoomScale(prev => {
      const next = Math.min(4, Math.round((prev + 0.5) * 10) / 10);
      setPan(currentPan => clampPan(currentPan, next));
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomScale(prev => {
      const next = Math.max(1, Math.round((prev - 0.5) * 10) / 10);
      setPan(currentPan => clampPan(currentPan, next));
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Drag handlers for mouse/pointer
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const nextPan = {
      x: panStartRef.current.x + deltaX,
      y: panStartRef.current.y + deltaY
    };
    setPan(clampPan(nextPan, zoomScale));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe to ignore if pointer wasn't captured
      }
    }
  };

  // Lightbox navigation helpers
  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? ILLUSTRATIONS.length - 1 : prev - 1;
    });
  }, [lightboxIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === ILLUSTRATIONS.length - 1 ? 0 : prev + 1;
    });
  }, [lightboxIndex]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Touch handlers for mobile swipe navigation & pinch zoom
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      pinchDistanceRef.current = dist;
      initialPinchScaleRef.current = zoomScale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / pinchDistanceRef.current;
      const nextScale = Math.min(4, Math.max(1, initialPinchScaleRef.current * ratio));
      setZoomScale(nextScale);
      setPan(prev => clampPan(prev, nextScale));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchDistanceRef.current = null;
    }

    // Horizontal swipe gesture detection when not zoomed in
    if (
      zoomScale <= 1.05 && 
      touchStartXRef.current !== null && 
      touchStartYRef.current !== null && 
      e.changedTouches.length > 0
    ) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

      // Threshold: at least 45px swipe, and clearly horizontal (deltaX > 1.4 * deltaY)
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoomScale(prev => {
      const next = Math.min(4, Math.max(1, prev * factor));
      setPan(currentPan => clampPan(currentPan, next));
      return next;
    });
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext, handleClose]);

  // Deep linking & URL routing: enforce portfolio view and handle illustration modal deep linking
  useEffect(() => {
    const handleUrlSync = () => {
      // 1. URL Path check
      const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, "");
      if (!SHOW_ADDITIONAL_PAGES && (rawPath === "about" || rawPath === "publications" || rawPath === "process")) {
        const hash = window.location.hash.startsWith("#") ? window.location.hash : "";
        window.history.replaceState(null, "", "/" + hash);
        setActiveNav("portfolio");
      } else if (SHOW_ADDITIONAL_PAGES && (rawPath === "about" || rawPath === "publications" || rawPath === "process")) {
        setActiveNav(rawPath as NavItemId);
      } else if (rawPath === "" || rawPath === "portfolio") {
        setActiveNav("portfolio");
      }

      // 2. Hash check for navigation
      const rawHash = window.location.hash.toLowerCase().replace(/^#[/]?/, "");
      if (!SHOW_ADDITIONAL_PAGES && (rawHash === "about" || rawHash === "publications" || rawHash === "process")) {
        window.history.replaceState(null, "", "/");
        setActiveNav("portfolio");
      } else if (SHOW_ADDITIONAL_PAGES && (rawHash === "about" || rawHash === "publications" || rawHash === "process")) {
        setActiveNav(rawHash as NavItemId);
      }

      // 3. Sync hash to lightbox modal if hash matches an illustration
      const hashId = window.location.hash.replace(/^#/, "");
      if (hashId) {
        const foundIdx = ILLUSTRATIONS.findIndex(item => item.id === hashId);
        if (foundIdx !== -1) {
          setLightboxIndex(foundIdx);
          return;
        }
      }
    };

    handleUrlSync();
    window.addEventListener("popstate", handleUrlSync);
    window.addEventListener("hashchange", handleUrlSync);
    return () => {
      window.removeEventListener("popstate", handleUrlSync);
      window.removeEventListener("hashchange", handleUrlSync);
    };
  }, []);

  // Deep linking: reflect active modal plate in URL hash while preserving current path
  useEffect(() => {
    if (lightboxIndex !== null) {
      const targetHash = `#${ILLUSTRATIONS[lightboxIndex].id}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, "", `${window.location.pathname}${targetHash}`);
      }
    } else {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, [lightboxIndex]);

  // Copy shareable deep link state
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Prevent background scrolling when image modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [lightboxIndex]);

  return (
    <div id="root_container" className={`min-h-screen ${isDark ? "dark bg-[#121214] text-zinc-100" : "bg-[#fafafa] text-zinc-900"} font-sans selection:bg-zinc-800 selection:text-white flex flex-col md:flex-row antialiased transition-colors duration-300`}>
      
      {/* LEFT COLUMN: Sidebar (Sticky on Desktop) */}
      <aside 
        id="sidebar_nav" 
        className="hidden md:flex md:w-[260px] md:fixed md:top-0 md:left-0 md:h-screen md:border-r border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black flex-col justify-between z-40 transition-colors duration-300"
      >
        <div id="sidebar_top_section" className="p-6 md:px-6 md:py-8 flex flex-col justify-between h-full overflow-y-auto w-full">
          
          <div className="w-full">
            {/* Main Identifier Box */}
            <div id="brand_header" className="w-full">
              <h1 
                onClick={() => handleNavChange("portfolio")} 
                className="text-3xl font-light tracking-tighter text-zinc-950 dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
              >
                John Na
              </h1>
              <div className="w-8 h-0.5 bg-[#E05338] mt-2.5 mb-4" />
              
              <div className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed w-full">
                <p className="text-zinc-800 dark:text-zinc-300 font-normal">Medical Illustration Portfolio</p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                  University of Cincinnati College of Medicine, '27
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">test</p>
              </div>
            </div>

            {/* Navigation links - Preserved and toggled by SHOW_NAV_ITEMS */}
            {SHOW_NAV_ITEMS && (
              <nav id="left_navigation" className="mt-14 space-y-3 w-full">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav_link_${item.id}`}
                      onClick={() => handleNavChange(item.id)}
                      className={`block w-full text-left text-xs tracking-widest uppercase transition-colors py-0.5 cursor-pointer ${
                        isActive
                          ? "text-[#E05338] dark:text-[#E05338] font-semibold"
                          : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white font-normal"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="space-y-4">
            {/* Artwork Disclaimer Statement */}
            <div id="nav_ai_disclaimer">
              <p className="font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                No AI was used in the creation of any artwork.
              </p>
            </div>

            {/* THEME TOGGLE SWITCH: Light / Auto (System & Day/Night) / Dark */}
            <div id="theme_toggle_panel" className="pt-5 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-600 dark:text-zinc-400 font-bold uppercase block">
                THEME
              </span>
              <div 
                id="theme_toggle_switch"
                role="radiogroup"
                aria-label="Theme selection: Light, Auto (Time of Day & System), or Dark"
                className="inline-flex items-center p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/90 relative"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={themeMode === "light"}
                  onClick={() => handleSetThemeMode("light")}
                  className={`relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                    themeMode === "light"
                      ? "text-amber-500"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                  title="Light Mode"
                  aria-label="Light Mode"
                >
                  <Sun size={13} strokeWidth={2} />
                  {themeMode === "light" && (
                    <motion.div
                      layoutId="theme-desktop-indicator"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={themeMode === "auto"}
                  onClick={() => handleSetThemeMode("auto")}
                  className={`relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                    themeMode === "auto"
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                  title={`Auto (System setting & Day/Night: currently ${effectiveTheme})`}
                  aria-label="Auto Theme (System preference and Time of Day)"
                >
                  <Monitor size={13} strokeWidth={2} />
                  {themeMode === "auto" && (
                    <motion.div
                      layoutId="theme-desktop-indicator"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={themeMode === "dark"}
                  onClick={() => handleSetThemeMode("dark")}
                  className={`relative z-10 p-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                    themeMode === "dark"
                      ? "text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                  title="Dark Mode"
                  aria-label="Dark Mode"
                >
                  <Moon size={13} strokeWidth={2} />
                  {themeMode === "dark" && (
                    <motion.div
                      layoutId="theme-desktop-indicator"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </aside>

      {/* MOBILE HEADER: Floating Menu Row */}
      <div id="mobile_navbar" className="md:hidden sticky top-0 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 px-4 py-3 flex items-center justify-between z-50 transition-colors duration-300">
        <div 
          onClick={() => handleNavChange("portfolio")} 
          className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity"
        >
          <h2 className="font-light tracking-tight text-zinc-950 dark:text-white text-base">John Na</h2>
          <span className="font-sans text-[10px] text-zinc-500 dark:text-zinc-400">Medical Illustration Portfolio</span>
        </div>
        <div className="flex items-center gap-2.5">
          {/* Mobile Navigation Dropdown - Preserved and toggled by SHOW_NAV_ITEMS */}
          {SHOW_NAV_ITEMS && (
            <div className="relative" ref={mobileMenuRef}>
              <button
                id="mobile_nav_dropdown_btn"
                type="button"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="flex items-center gap-2 px-3.5 h-10 min-h-[40px] rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs font-mono tracking-wider uppercase cursor-pointer hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-haspopup="true"
              >
                <span>{NAV_ITEMS.find(n => n.id === activeNav)?.label || "Menu"}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 text-zinc-500 dark:text-zinc-400 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Popover */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded shadow-xl py-1 z-50 overflow-hidden"
                  >
                    <div className="px-3.5 py-1.5 text-[9px] font-mono tracking-widest text-zinc-600 dark:text-zinc-400 uppercase border-b border-zinc-100 dark:border-zinc-800/80 mb-0.5">
                      Navigate
                    </div>
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeNav === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleNavChange(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 min-h-[44px] text-left text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                            isActive
                              ? "bg-zinc-100 dark:bg-zinc-800 text-[#E05338] dark:text-[#E05338] font-semibold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-950 dark:hover:text-white font-normal"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && <Check size={14} className="text-[#E05338] dark:text-[#E05338]" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {SHOW_NAV_ITEMS && <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800"></div>}
          
          <div
            id="mobile_theme_toggle_switch"
            role="radiogroup"
            aria-label="Theme selection: Light, Auto, or Dark"
            className="inline-flex items-center p-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/90 relative"
          >
            <button
              type="button"
              role="radio"
              aria-checked={themeMode === "light"}
              onClick={() => handleSetThemeMode("light")}
              className={`relative z-10 w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${
                themeMode === "light"
                  ? "text-amber-500"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
              title="Light Mode"
              aria-label="Light Mode"
            >
              <Sun size={15} strokeWidth={2} />
              {themeMode === "light" && (
                <motion.div
                  layoutId="theme-mobile-indicator"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={themeMode === "auto"}
              onClick={() => handleSetThemeMode("auto")}
              className={`relative z-10 w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${
                themeMode === "auto"
                  ? "text-zinc-950 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
              title={`Auto (System setting & Day/Night: currently ${effectiveTheme})`}
              aria-label="Auto Theme (System preference and Time of Day)"
            >
              <Monitor size={15} strokeWidth={2} />
              {themeMode === "auto" && (
                <motion.div
                  layoutId="theme-mobile-indicator"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={themeMode === "dark"}
              onClick={() => handleSetThemeMode("dark")}
              className={`relative z-10 w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${
                themeMode === "dark"
                  ? "text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
              title="Dark Mode"
              aria-label="Dark Mode"
            >
              <Moon size={15} strokeWidth={2} />
              {themeMode === "dark" && (
                <motion.div
                  layoutId="theme-mobile-indicator"
                  className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE AI DISCLAIMER STRIP */}
      <div id="mobile_ai_disclaimer" className="md:hidden px-4 py-2.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <p className="font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          No AI was used in the creation of any artwork.
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Stage */}
      <main 
        id="portfolio_stage" 
        className="flex-1 md:ml-[260px] bg-[#fafafa] dark:bg-[#121214] flex flex-col justify-between p-4 transition-all duration-300"
      >
        <div id="grid_wrapper" className="w-full">
          {/* VIEW: PORTFOLIO */}
          {activeNav === "portfolio" && (
            <div 
              id="portfolio_grid" 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-0 w-full"
            >
              {ILLUSTRATIONS.map((illustration) => {
                const originalIndex = ILLUSTRATIONS.findIndex(item => item.id === illustration.id);
                
                return (
                  <motion.div
                    id={`card_${illustration.id}`}
                    key={illustration.id}
                    layoutId={`card-container-${illustration.id}`}
                    className="group cursor-pointer relative bg-transparent rounded-none overflow-hidden aspect-square w-full transition-all duration-300 hover:z-10"
                    onClick={() => setLightboxIndex(originalIndex)}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    {/* Image Core Frame - Fills 100% of the square container */}
                    <div className="relative overflow-hidden w-full h-full bg-transparent rounded-none select-none">
                      <img
                        src={illustration.thumbnailImage}
                        alt={illustration.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03] block select-none pointer-events-none protected-image"
                      />

                      {/* Transparent Anti-Drag Shield Overlay */}
                      <div 
                        className="absolute inset-0 z-10 bg-transparent select-none" 
                        onContextMenu={(e) => {
                          e.preventDefault();
                          showProtectionNotice("Right-click saving disabled • © John Na");
                        }}
                      />

                      {/* Desktop Hover Info Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center p-4 select-none">
                        {SHOW_CARD_HOVER_METADATA ? (
                          <div className="w-full h-full flex flex-col justify-between p-1">
                            <div className="flex justify-between items-start">
                              <span className="font-mono text-[9px] tracking-widest text-zinc-300 uppercase bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800">
                                {illustration.year}
                              </span>
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                              <h4 className="font-light tracking-tight text-sm text-white line-clamp-2">
                                {illustration.title}
                              </h4>
                              <div className="flex items-center gap-1.5 text-zinc-300 font-mono text-[8px] tracking-widest uppercase mt-0.5">
                                <span>View image</span>
                                <ArrowRight size={10} className="transition-transform duration-300 translate-x-0 group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-zinc-900/95 text-zinc-900 dark:text-zinc-100 border border-zinc-200/70 dark:border-zinc-700/70 shadow-xl text-xs font-mono tracking-wider uppercase backdrop-blur-xs transition-transform duration-300 transform scale-95 group-hover:scale-100">
                            <span>View Image</span>
                            <ArrowRight size={13} className="transition-transform duration-300 translate-x-0 group-hover:translate-x-0.5 text-[#E05338]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ADDITIONAL PRESERVED VIEWS (Guarded by SHOW_ADDITIONAL_PAGES) */}
          {SHOW_ADDITIONAL_PAGES && activeNav === "about" && <AboutView />}
          {SHOW_ADDITIONAL_PAGES && activeNav === "publications" && <PublicationsView />}
          {SHOW_ADDITIONAL_PAGES && activeNav === "process" && <ProcessView />}

          {/* Bottom of Stage Copyright Notice */}
          <div className="mt-8 pt-6 pb-2 border-t border-zinc-200/80 dark:border-zinc-800/80 px-2 flex items-center justify-between text-zinc-600 dark:text-zinc-400 font-mono text-[11px] tracking-wide">
            <p>© 2026. All images are the copyright of John Na. All rights reserved.</p>
          </div>
        </div>

        </main>

      {/* FULL IMMERSIVE LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activeItem = ILLUSTRATIONS[lightboxIndex];
          return (
            <motion.div
              id="lightbox_overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 overscroll-contain"
              onClick={(e) => {
                // Recommendation 1: Only close on backdrop click if on desktop (>= 768px) and not zoomed in,
                // preventing accidental mobile dismissals while keeping the explicit close button active
                if (e.target === e.currentTarget && window.innerWidth >= 768 && zoomScale <= 1.05) {
                  handleClose();
                }
              }}
            >
              
              {/* Outer stage prevents window from bubbling click events */}
              <motion.div
                id="lightbox_modal"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full h-full bg-[#fafafa] dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl relative`}
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Close Button (Desktop & Mobile) */}
                <button
                  id="btn_lightbox_modal_close"
                  onClick={handleClose}
                  aria-label="Close modal"
                  title="Close Modal (Esc)"
                  className="absolute top-4 right-4 z-40 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Visual Viewport Pane */}
                <div 
                  id="lightbox_image_pane" 
                  className={`flex-1 w-full ${SHOW_MODAL_RIGHT_PANEL ? "h-[65%] sm:h-[70%] md:h-full" : "h-full"} bg-zinc-100 dark:bg-black flex items-center justify-center relative p-4 sm:p-8 md:p-10 select-none overflow-hidden min-h-0`}
                >
                  
                  {/* Left Navigation Arrow */}
                  <button
                    id="btn_lightbox_prev"
                    onClick={handlePrev}
                    aria-label="Previous work"
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black text-zinc-700 dark:text-zinc-400 flex items-center justify-center transition-all duration-200 z-30 cursor-pointer shadow-xs"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* The Image Centerpiece - Full uncropped view with pan & pinch-zoom */}
                  <div 
                    ref={imageContainerRef}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onWheel={handleWheel}
                  >
                    <img
                      ref={imageRef}
                      src={activeItem.sourceImage}
                      alt={activeItem.title}
                      referrerPolicy="no-referrer"
                      draggable={false}
                      style={{
                        transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoomScale})`,
                        transformOrigin: "center center",
                        transition: isDragging ? "none" : "transform 0.15s ease-out"
                      }}
                      className={`max-w-full max-h-full w-auto h-auto object-contain rounded select-none pointer-events-none protected-image ${
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                      }`}
                    />
                  </div>

                  {/* Right Navigation Arrow */}
                  <button
                    id="btn_lightbox_next"
                    onClick={handleNext}
                    aria-label="Next work"
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black text-zinc-700 dark:text-zinc-400 flex items-center justify-center transition-all duration-200 z-30 cursor-pointer shadow-xs"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Zoom Controls: Reset (when zoomed), Zoom %, Zoom out, Zoom in */}
                  <div className="absolute bottom-4 right-6 bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 rounded-md p-1 flex items-center gap-1 z-30 shadow-md">
                    {/* Reset Zoom Button: Only visible when zoomed in / panned */}
                    {(zoomScale !== 1 || pan.x !== 0 || pan.y !== 0) && (
                      <>
                        <button
                          type="button"
                          onClick={handleResetZoom}
                          aria-label="Reset zoom to 100%"
                          title="Reset zoom to 100%"
                          className="w-8 h-8 min-w-[32px] min-h-[32px] rounded flex items-center justify-center transition-colors cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
                      </>
                    )}

                    {/* Monospace Zoom % Chip */}
                    <span 
                      className="font-mono text-[10px] text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 select-none min-w-[38px] text-center tabular-nums font-medium"
                      title="Current magnification"
                    >
                      {Math.round(zoomScale * 100)}%
                    </span>

                    <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                    <button
                      type="button"
                      onClick={handleZoomOut}
                      disabled={zoomScale <= 1}
                      aria-label="Zoom out"
                      title="Zoom out"
                      className="w-8 h-8 min-w-[32px] min-h-[32px] rounded flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 dark:disabled:hover:text-zinc-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ZoomOut size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={handleZoomIn}
                      disabled={zoomScale >= 4}
                      aria-label="Zoom in"
                      title="Zoom in"
                      className="w-8 h-8 min-w-[32px] min-h-[32px] rounded flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 dark:disabled:hover:text-zinc-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ZoomIn size={16} />
                    </button>
                  </div>

                  {/* Micro Index Tracker */}
                  <div className="absolute bottom-4 left-6 bg-white/95 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded font-mono text-[9px] text-zinc-700 dark:text-zinc-300 tracking-wider uppercase flex items-center shadow-xs font-medium">
                    <span>Image {lightboxIndex + 1} / {ILLUSTRATIONS.length}</span>
                  </div>
                </div>

                {/* Structured Metadata Pane (md:col-span-4) - Preserved & guarded by SHOW_MODAL_RIGHT_PANEL */}
                {SHOW_MODAL_RIGHT_PANEL && (
                  <div id="lightbox_metadata_pane" className="h-[50%] md:h-full md:w-[380px] lg:w-[420px] shrink-0 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 bg-[#fafafa] dark:bg-[#121214] flex flex-col overflow-y-auto overscroll-contain p-6 sm:p-8">
                    
                    {/* Close, Category tags & titles */}
                    <div className="flex flex-col gap-6">
                      
                      {/* Header line with badge, share link, and close trigger */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] tracking-widest text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 border border-zinc-200 dark:border-zinc-800 rounded uppercase font-medium">
                            {activeItem.year}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            title="Copy direct share link for this plate"
                            aria-label="Copy direct share link"
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                          >
                            {copiedLink ? (
                              <>
                                <Check size={11} className="text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Link2 size={11} />
                                <span>Share</span>
                              </>
                            )}
                          </button>
                        </div>

                        <button
                          id="btn_lightbox_close"
                          onClick={handleClose}
                          className="hidden md:flex w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white items-center justify-center transition-all cursor-pointer"
                          title="Close Overlay (Esc)"
                          aria-label="Close modal"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Headline titles */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-light tracking-tight text-xl text-zinc-950 dark:text-white leading-tight">
                          {activeItem.title}
                        </h3>
                        {activeItem.publication && (
                          <a
                            href={activeItem.publicationUrl || "#"}
                            target={activeItem.publicationUrl && activeItem.publicationUrl !== "#" ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!activeItem.publicationUrl || activeItem.publicationUrl === "#") {
                                e.preventDefault();
                              }
                            }}
                            className="text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white underline underline-offset-[5px] decoration-zinc-400 dark:decoration-zinc-600 hover:decoration-zinc-950 dark:hover:decoration-white transition-colors inline-flex items-center gap-1.5 w-fit mt-1.5 py-0.5 group/pub"
                            title="View source publication"
                          >
                            <span className="leading-relaxed">{activeItem.publication}</span>
                            <ExternalLink size={12} className="opacity-70 group-hover/pub:opacity-100 transition-opacity shrink-0 ml-0.5" />
                          </a>
                        )}
                      </div>

                      <div className="h-px bg-zinc-200 dark:bg-zinc-900 w-full" />

                      {/* Explanatory Texts */}
                      <div className="flex flex-col gap-5">
                        
                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-[#E05338] dark:text-[#E05338] tracking-widest uppercase font-medium">
                            Description
                          </span>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                            {activeItem.description}
                          </p>
                        </div>

                        {/* Creative Methodology */}
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-[#E05338] dark:text-[#E05338] tracking-widest uppercase font-medium">
                            Creative Methodology
                          </span>
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                            {activeItem.methodology || `${activeItem.medium}. Created with ${activeItem.technique}, combining anatomical precision drafting with digital layering to emphasize focal depth and structural hierarchy.`}
                          </p>
                        </div>

                      </div>

                      {/* Copyright & Rights Notice */}
                      <div className="pt-4 mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80">
                        <p className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400 leading-normal">
                          © 2026. All images are the copyright of John Na. All rights reserved.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Copy/Save Protection Toast Alert */}
      <AnimatePresence>
        {protectionToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950/95 text-white dark:bg-white/95 dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200 shadow-2xl backdrop-blur-md text-xs font-mono tracking-wider select-none pointer-events-none"
          >
            <ShieldCheck size={14} className="text-[#E05338] shrink-0" />
            <span>{protectionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
