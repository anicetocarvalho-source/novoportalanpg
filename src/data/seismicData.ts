// Realistic seismic survey data for Angola's sedimentary basins
// Coordinates based on actual basin locations along Angola's coast

export interface SeismicSurvey {
  id: string;
  name: string;
  year: number;
  basin: string;
  operator: string;
  type: "2d" | "3d" | "4d";
  /** km for 2D lines, km² for 3D/4D areas */
  coverage: number;
  coverageUnit: "km" | "km²";
  /** Polyline for 2D, polygon boundary for 3D/4D */
  coordinates: [number, number][];
}

// ── 2D Seismic Lines ──
export const seismic2dSurveys: SeismicSurvey[] = [
  {
    id: "2d-001", name: "LCG-2D-1985", year: 1985, basin: "Baixo Congo", operator: "Sonangol P&P",
    type: "2d", coverage: 1200, coverageUnit: "km",
    coordinates: [[-5.8, 11.5], [-6.2, 11.8], [-6.6, 12.1], [-7.0, 12.3]],
  },
  {
    id: "2d-002", name: "KWZ-2D-1990", year: 1990, basin: "Kwanza", operator: "Total E&P",
    type: "2d", coverage: 850, coverageUnit: "km",
    coordinates: [[-8.5, 12.8], [-9.0, 13.0], [-9.4, 13.2], [-9.8, 13.1]],
  },
  {
    id: "2d-003", name: "NAM-2D-1992", year: 1992, basin: "Namibe", operator: "BP Angola",
    type: "2d", coverage: 600, coverageUnit: "km",
    coordinates: [[-14.0, 12.0], [-14.5, 12.2], [-15.0, 12.1], [-15.5, 11.8]],
  },
  {
    id: "2d-004", name: "LCG-2D-1998", year: 1998, basin: "Baixo Congo", operator: "Chevron",
    type: "2d", coverage: 1500, coverageUnit: "km",
    coordinates: [[-5.5, 10.8], [-5.9, 11.2], [-6.3, 11.5], [-6.8, 11.7], [-7.2, 11.9]],
  },
  {
    id: "2d-005", name: "KWZ-2D-2001", year: 2001, basin: "Kwanza", operator: "Eni Angola",
    type: "2d", coverage: 920, coverageUnit: "km",
    coordinates: [[-8.8, 12.5], [-9.2, 12.7], [-9.6, 13.0], [-10.0, 13.2]],
  },
  {
    id: "2d-006", name: "LCG-2D-2005", year: 2005, basin: "Baixo Congo", operator: "ExxonMobil",
    type: "2d", coverage: 2100, coverageUnit: "km",
    coordinates: [[-5.3, 10.5], [-5.7, 10.9], [-6.1, 11.3], [-6.5, 11.6], [-7.0, 11.8], [-7.4, 12.0]],
  },
  {
    id: "2d-007", name: "NAM-2D-2008", year: 2008, basin: "Namibe", operator: "Repsol",
    type: "2d", coverage: 750, coverageUnit: "km",
    coordinates: [[-13.5, 12.3], [-14.0, 12.5], [-14.5, 12.4], [-15.0, 12.2]],
  },
  {
    id: "2d-008", name: "KWZ-2D-2012", year: 2012, basin: "Kwanza", operator: "Cobalt International",
    type: "2d", coverage: 1100, coverageUnit: "km",
    coordinates: [[-9.0, 12.0], [-9.4, 12.3], [-9.8, 12.6], [-10.2, 12.8], [-10.5, 13.0]],
  },
  {
    id: "2d-009", name: "LCG-2D-2015", year: 2015, basin: "Baixo Congo", operator: "Total E&P",
    type: "2d", coverage: 1800, coverageUnit: "km",
    coordinates: [[-5.6, 10.2], [-6.0, 10.6], [-6.4, 11.0], [-6.8, 11.4], [-7.2, 11.7]],
  },
  {
    id: "2d-010", name: "KWZ-2D-2019", year: 2019, basin: "Kwanza", operator: "Sonangol P&P",
    type: "2d", coverage: 1350, coverageUnit: "km",
    coordinates: [[-8.2, 12.2], [-8.6, 12.5], [-9.0, 12.8], [-9.4, 13.1], [-9.8, 13.3]],
  },
  {
    id: "2d-011", name: "LCG-2D-2021", year: 2021, basin: "Baixo Congo", operator: "Azule Energy",
    type: "2d", coverage: 950, coverageUnit: "km",
    coordinates: [[-6.0, 11.0], [-6.3, 11.3], [-6.6, 11.6], [-6.9, 11.9]],
  },
  {
    id: "2d-012", name: "NAM-2D-2022", year: 2022, basin: "Namibe", operator: "Sonangol P&P",
    type: "2d", coverage: 1050, coverageUnit: "km",
    coordinates: [[-13.8, 11.8], [-14.2, 12.0], [-14.6, 12.2], [-15.0, 12.0], [-15.4, 11.7]],
  },
];

// ── 3D Seismic Surveys (polygons) ──
export const seismic3dSurveys: SeismicSurvey[] = [
  {
    id: "3d-001", name: "Bloco 0 – 3D", year: 1996, basin: "Baixo Congo", operator: "Chevron",
    type: "3d", coverage: 3200, coverageUnit: "km²",
    coordinates: [[-5.5, 11.8], [-5.5, 12.3], [-6.0, 12.3], [-6.0, 11.8], [-5.5, 11.8]],
  },
  {
    id: "3d-002", name: "Bloco 14 – 3D", year: 1999, basin: "Baixo Congo", operator: "Chevron",
    type: "3d", coverage: 4500, coverageUnit: "km²",
    coordinates: [[-6.0, 11.2], [-6.0, 11.8], [-6.6, 11.8], [-6.6, 11.2], [-6.0, 11.2]],
  },
  {
    id: "3d-003", name: "Bloco 15 – 3D", year: 2000, basin: "Baixo Congo", operator: "Eni Angola",
    type: "3d", coverage: 5100, coverageUnit: "km²",
    coordinates: [[-6.5, 10.8], [-6.5, 11.4], [-7.2, 11.4], [-7.2, 10.8], [-6.5, 10.8]],
  },
  {
    id: "3d-004", name: "Bloco 17 – 3D", year: 2001, basin: "Baixo Congo", operator: "Total E&P",
    type: "3d", coverage: 4800, coverageUnit: "km²",
    coordinates: [[-7.0, 10.5], [-7.0, 11.1], [-7.6, 11.1], [-7.6, 10.5], [-7.0, 10.5]],
  },
  {
    id: "3d-005", name: "Bloco 18 – 3D", year: 2003, basin: "Baixo Congo", operator: "BP Angola",
    type: "3d", coverage: 3800, coverageUnit: "km²",
    coordinates: [[-7.4, 10.2], [-7.4, 10.8], [-8.0, 10.8], [-8.0, 10.2], [-7.4, 10.2]],
  },
  {
    id: "3d-006", name: "Bloco 31 – 3D", year: 2005, basin: "Baixo Congo", operator: "BP Angola",
    type: "3d", coverage: 5500, coverageUnit: "km²",
    coordinates: [[-7.8, 9.8], [-7.8, 10.5], [-8.5, 10.5], [-8.5, 9.8], [-7.8, 9.8]],
  },
  {
    id: "3d-007", name: "Bloco 32 – 3D", year: 2007, basin: "Kwanza", operator: "Total E&P",
    type: "3d", coverage: 6200, coverageUnit: "km²",
    coordinates: [[-8.3, 10.0], [-8.3, 10.7], [-9.0, 10.7], [-9.0, 10.0], [-8.3, 10.0]],
  },
  {
    id: "3d-008", name: "Kwanza Sul – 3D", year: 2010, basin: "Kwanza", operator: "Cobalt International",
    type: "3d", coverage: 7800, coverageUnit: "km²",
    coordinates: [[-9.5, 11.0], [-9.5, 12.0], [-10.5, 12.0], [-10.5, 11.0], [-9.5, 11.0]],
  },
  {
    id: "3d-009", name: "Bloco 20 – 3D", year: 2012, basin: "Kwanza", operator: "Sonangol P&P",
    type: "3d", coverage: 4100, coverageUnit: "km²",
    coordinates: [[-9.0, 12.2], [-9.0, 12.8], [-9.6, 12.8], [-9.6, 12.2], [-9.0, 12.2]],
  },
  {
    id: "3d-010", name: "Namibe Offshore – 3D", year: 2015, basin: "Namibe", operator: "Repsol",
    type: "3d", coverage: 5000, coverageUnit: "km²",
    coordinates: [[-14.0, 11.5], [-14.0, 12.2], [-14.8, 12.2], [-14.8, 11.5], [-14.0, 11.5]],
  },
  {
    id: "3d-011", name: "Bloco 15/06 – 3D", year: 2017, basin: "Baixo Congo", operator: "Eni Angola",
    type: "3d", coverage: 3500, coverageUnit: "km²",
    coordinates: [[-6.8, 11.0], [-6.8, 11.5], [-7.3, 11.5], [-7.3, 11.0], [-6.8, 11.0]],
  },
  {
    id: "3d-012", name: "Bloco 48 – 3D", year: 2020, basin: "Kwanza", operator: "Eni Angola",
    type: "3d", coverage: 4300, coverageUnit: "km²",
    coordinates: [[-10.0, 11.5], [-10.0, 12.2], [-10.7, 12.2], [-10.7, 11.5], [-10.0, 11.5]],
  },
  {
    id: "3d-013", name: "Cabinda Norte – 3D", year: 2022, basin: "Baixo Congo", operator: "Azule Energy",
    type: "3d", coverage: 2800, coverageUnit: "km²",
    coordinates: [[-5.2, 11.8], [-5.2, 12.2], [-5.6, 12.2], [-5.6, 11.8], [-5.2, 11.8]],
  },
  {
    id: "3d-014", name: "Namibe Sul – 3D", year: 2023, basin: "Namibe", operator: "Sonangol P&P",
    type: "3d", coverage: 3900, coverageUnit: "km²",
    coordinates: [[-15.0, 11.2], [-15.0, 11.9], [-15.7, 11.9], [-15.7, 11.2], [-15.0, 11.2]],
  },
];

// ── 4D Seismic Surveys (time-lapse repeat 3D) ──
export const seismic4dSurveys: SeismicSurvey[] = [
  {
    id: "4d-001", name: "Girassol 4D – Monitor 1", year: 2006, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 1200, coverageUnit: "km²",
    coordinates: [[-7.1, 10.6], [-7.1, 11.0], [-7.5, 11.0], [-7.5, 10.6], [-7.1, 10.6]],
  },
  {
    id: "4d-002", name: "Dália 4D – Monitor 1", year: 2009, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 900, coverageUnit: "km²",
    coordinates: [[-7.3, 10.4], [-7.3, 10.7], [-7.6, 10.7], [-7.6, 10.4], [-7.3, 10.4]],
  },
  {
    id: "4d-003", name: "Girassol 4D – Monitor 2", year: 2012, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 1200, coverageUnit: "km²",
    coordinates: [[-7.1, 10.6], [-7.1, 11.0], [-7.5, 11.0], [-7.5, 10.6], [-7.1, 10.6]],
  },
  {
    id: "4d-004", name: "BBLT 4D", year: 2013, basin: "Baixo Congo", operator: "BP Angola",
    type: "4d", coverage: 1500, coverageUnit: "km²",
    coordinates: [[-7.5, 10.2], [-7.5, 10.7], [-8.0, 10.7], [-8.0, 10.2], [-7.5, 10.2]],
  },
  {
    id: "4d-005", name: "Pazflor 4D", year: 2015, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 800, coverageUnit: "km²",
    coordinates: [[-7.2, 10.8], [-7.2, 11.1], [-7.5, 11.1], [-7.5, 10.8], [-7.2, 10.8]],
  },
  {
    id: "4d-006", name: "CLOV 4D – Monitor 1", year: 2018, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 1100, coverageUnit: "km²",
    coordinates: [[-6.9, 10.9], [-6.9, 11.3], [-7.3, 11.3], [-7.3, 10.9], [-6.9, 10.9]],
  },
  {
    id: "4d-007", name: "Dália 4D – Monitor 2", year: 2019, basin: "Baixo Congo", operator: "Total E&P",
    type: "4d", coverage: 900, coverageUnit: "km²",
    coordinates: [[-7.3, 10.4], [-7.3, 10.7], [-7.6, 10.7], [-7.6, 10.4], [-7.3, 10.4]],
  },
  {
    id: "4d-008", name: "Bloco 15 4D", year: 2021, basin: "Baixo Congo", operator: "Eni Angola",
    type: "4d", coverage: 1800, coverageUnit: "km²",
    coordinates: [[-6.6, 10.9], [-6.6, 11.4], [-7.1, 11.4], [-7.1, 10.9], [-6.6, 10.9]],
  },
  {
    id: "4d-009", name: "Girassol 4D – Monitor 3", year: 2023, basin: "Baixo Congo", operator: "TotalEnergies",
    type: "4d", coverage: 1200, coverageUnit: "km²",
    coordinates: [[-7.1, 10.6], [-7.1, 11.0], [-7.5, 11.0], [-7.5, 10.6], [-7.1, 10.6]],
  },
];

export const basinColors: Record<string, string> = {
  "Baixo Congo": "#e74c3c",
  "Kwanza": "#3498db",
  "Namibe": "#2ecc71",
};
