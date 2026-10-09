export const GENERATED_IMAGES = {
  aerialGrid: '/src/assets/images/eixample_aerial_grid_1790808553785.jpg',
  historicalPlan: '/src/assets/images/cerda_1859_historical_plan_1790808565004.jpg',
  xamfraCorner: '/src/assets/images/xamfra_intersection_plaza_1790808574280.jpg',
  scaleModel: '/src/assets/images/octagonal_courtyard_model_1790808584700.jpg',
  sagradaDiagonalAerial: '/src/assets/images/eixample_sagrada_diagonal_aerial_1790827634802.jpg',
  macroGridMosaic: '/src/assets/images/eixample_macro_grid_mosaic_1790827644474.jpg',
  blockTransitionCloseup: '/src/assets/images/eixample_block_transition_closeup_1790827654115.jpg',
};

export interface CityStructureExample {
  id: string;
  scaleLabel: string;
  title: string;
  image: string;
  alt: string;
  observation: string;
  geometricInsight: string;
  metrics: string;
}

export const CITY_STRUCTURE_EXAMPLES: CityStructureExample[] = [
  {
    id: 'macro-mosaic',
    scaleLabel: 'Macro City Scale',
    title: 'Repeating Lattice vs. Old City',
    image: GENERATED_IMAGES.macroGridMosaic,
    alt: 'High-altitude satellite view of Barcelona Eixample grid and medieval Old City',
    observation:
      'Hundreds of identical 113.3 m blocks contrast with the organic medieval alleys of Ciutat Vella below.',
    geometricInsight:
      'Grid translation T = (133.3m, 133.3m) tiles the plain, sliced at ~30° by Avinguda Diagonal.',
    metrics: 'Period: 133.3 m · Street: 20 m · Diagonal: 50 m',
  },
  {
    id: 'landmark-diagonal',
    scaleLabel: 'Landmark & Diagonal',
    title: 'Sagrada Família & Diagonal Cut',
    image: GENERATED_IMAGES.sagradaDiagonalAerial,
    alt: 'Aerial view of Sagrada Familia in grid and diagonal avenue',
    observation:
      'Gaudí’s cathedral occupies a standard 113.3 m block module; diagonal avenues slice blocks into triangles.',
    geometricInsight:
      'Transversal cuts form right-trapezoids while preserving 45° corner chamfers at cross streets.',
    metrics: 'Cathedral: 1 Block (12,370 m²) · Park: 1 Block',
  },
  {
    id: 'cluster-boundary',
    scaleLabel: 'Block Cluster Scale',
    title: 'Courtyards & Corner Plazas',
    image: GENERATED_IMAGES.blockTransitionCloseup,
    alt: 'Top-down view of six octagonal Eixample blocks with courtyards',
    observation:
      'Buildings frame central courtyards while the 45° chamfers meet to form octagonal street plazas.',
    geometricInsight:
      'Where the grid meets older villages, blocks truncate along the boundary seam.',
    metrics: 'Block s = 113.3 m · Cut c ≈ 15 m · Angle = 45°',
  },
];

export type WorkbenchLayer = 'notice' | 'area' | 'sunlight' | 'symmetry';

export interface StartHereBlock {
  index: string;
  label: string;
  title: string;
  content: string;
  detail: string;
}

export const START_HERE_BLOCKS: StartHereBlock[] = [
  {
    index: '01',
    label: 'Notice',
    title: 'Octagons in a Square Grid',
    content:
      'Every square block has corners cut at 45°, turning each block into an octagon and each intersection into an open plaza.',
    detail: 'Carrer de Mallorca & Passeig de Gràcia',
  },
  {
    index: '02',
    label: 'Evidence',
    title: 'Circled Intersection',
    content:
      'Aerial photo showing four chamfered corners meeting to form an octagonal public space instead of a tight crossroads.',
    detail: '45° cut corners · 20 m streets',
  },
  {
    index: '03',
    label: 'Question',
    title: 'Area & Sunlight Rules',
    content:
      'How much area is cut from each 113.3 m block (12,837 m²), and how does trigonometry guarantee direct sunlight?',
    detail: 'Formula: Area = s² − 2c² · tan θ = h/w',
  },
  {
    index: '04',
    label: 'Initial Idea',
    title: '4 Triangles & 45° Angles',
    content:
      'Subtracting four corner triangles yields c ≈ 15 m. Setting height = street width (20 m) sets the solar angle to 45°.',
    detail: 'One 45° angle unifies ground and sky',
  },
];

export interface HistoricalMilestone {
  year: string;
  title: string;
  summary: string;
  mathConnection: string;
  sourceName: string;
  sourceCitation: string;
}

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    year: '1859 Plan',
    title: 'Cerdà’s Extension',
    summary:
      'Ildefons Cerdà designed an egalitarian grid to relieve overcrowded medieval Barcelona after wall demolition.',
    mathConnection: 'Equal 113.3 m blocks give every home uniform light, air, and street access.',
    sourceName: 'Equinox Magazine',
    sourceCitation: 'Equinox Magazine — Urban Morphology of Barcelona’s Eixample Grid',
  },
  {
    year: '1859 Chamfer',
    title: 'The 45° Steam-Tram Cut',
    summary:
      'Corners were chamfered at 45° to accommodate the wide turning radius of steam trams.',
    mathConnection: 'Cutting four corner triangles (c ≈ 15 m) expands intersection sightlines and turning radius.',
    sourceName: 'Failed Architecture',
    sourceCitation: 'Failed Architecture — Barcelona’s Eixample',
  },
  {
    year: '1859 Solar Rule',
    title: '20 m Height Cap & Gardens',
    summary:
      'Cerdà limited building height to 20 m with buildings on only 2 sides, keeping courtyards green.',
    mathConnection: 'Street w = 20 m and height h = 20 m gives tan θ = 1 (θ = 45° solar angle).',
    sourceName: 'Substack',
    sourceCitation: 'Substack — Geometry of Sunlight and Ventilation in the Cerdà Plan',
  },
  {
    year: 'Modern Day',
    title: 'Density & Superblocks',
    summary:
      'Development enclosed all four sides and raised heights to 30 m; modern Superblocks now reclaim plazas.',
    mathConnection: 'Height 30 m steepens shadows to 56.3°, reducing ground-level sun.',
    sourceName: 'arXiv',
    sourceCitation: 'arXiv — Quantitative Morphology & Densification of the Cerdà Grid',
  },
];
