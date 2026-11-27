import type { ThemeMode } from '../types';

export interface ChapterPalette {
  accent: string;
  accentSolid: string;
  accentSoft: string;
  onAccent: string;
  glow: string;
  borderGlow: string;
}

const LIGHT_PALETTES: Record<number, ChapterPalette> = {
  1: { accent: '#0F766E', accentSolid: '#0F766E', accentSoft: 'rgba(15, 118, 110, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(15, 118, 110, 0.06)', borderGlow: 'rgba(15, 118, 110, 0.25)' },
  2: { accent: '#2563EB', accentSolid: '#2563EB', accentSoft: 'rgba(37, 99, 235, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(37, 99, 235, 0.06)', borderGlow: 'rgba(37, 99, 235, 0.25)' },
  3: { accent: '#7C3AED', accentSolid: '#7C3AED', accentSoft: 'rgba(124, 58, 237, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(124, 58, 237, 0.06)', borderGlow: 'rgba(124, 58, 237, 0.25)' },
  4: { accent: '#059669', accentSolid: '#059669', accentSoft: 'rgba(5, 150, 105, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(5, 150, 105, 0.06)', borderGlow: 'rgba(5, 150, 105, 0.25)' },
  5: { accent: '#D97706', accentSolid: '#D97706', accentSoft: 'rgba(217, 119, 6, 0.11)', onAccent: '#FFFFFF', glow: 'rgba(217, 119, 6, 0.06)', borderGlow: 'rgba(217, 119, 6, 0.28)' },
  6: { accent: '#DC2626', accentSolid: '#DC2626', accentSoft: 'rgba(220, 38, 38, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(220, 38, 38, 0.06)', borderGlow: 'rgba(220, 38, 38, 0.25)' },
  7: { accent: '#DB2777', accentSolid: '#DB2777', accentSoft: 'rgba(219, 39, 119, 0.10)', onAccent: '#FFFFFF', glow: 'rgba(219, 39, 119, 0.06)', borderGlow: 'rgba(219, 39, 119, 0.25)' },
};

/* Matte, low-saturation night-study palettes:
   - `accent`: calm desaturated pastel for text, icons, progress bars, and SVG strokes
   - `accentSolid`: deep matte fill for buttons & active pills (prevents "flashlight" glare)
   - `onAccent`: soft warm off-white text on `accentSolid`
*/
const DARK_PALETTES: Record<number, ChapterPalette> = {
  1: { accent: '#63A8A0', accentSolid: '#2A6963', accentSoft: 'rgba(99, 168, 160, 0.11)', onAccent: '#E8F3F2', glow: 'rgba(99, 168, 160, 0.08)', borderGlow: 'rgba(99, 168, 160, 0.22)' },
  2: { accent: '#769CD0', accentSolid: '#2D5385', accentSoft: 'rgba(118, 156, 208, 0.11)', onAccent: '#EAF1FA', glow: 'rgba(118, 156, 208, 0.08)', borderGlow: 'rgba(118, 156, 208, 0.22)' },
  3: { accent: '#9E8AC8', accentSolid: '#4E3E7A', accentSoft: 'rgba(158, 138, 200, 0.11)', onAccent: '#F0ECF9', glow: 'rgba(158, 138, 200, 0.08)', borderGlow: 'rgba(158, 138, 200, 0.22)' },
  4: { accent: '#67A88C', accentSolid: '#2A654D', accentSoft: 'rgba(103, 168, 140, 0.11)', onAccent: '#E9F5EF', glow: 'rgba(103, 168, 140, 0.08)', borderGlow: 'rgba(103, 168, 140, 0.22)' },
  5: { accent: '#C9A465', accentSolid: '#785B2A', accentSoft: 'rgba(201, 164, 101, 0.11)', onAccent: '#F8F1E3', glow: 'rgba(201, 164, 101, 0.07)', borderGlow: 'rgba(201, 164, 101, 0.22)' },
  6: { accent: '#C97D7D', accentSolid: '#7D3838', accentSoft: 'rgba(201, 125, 125, 0.11)', onAccent: '#F9ECEC', glow: 'rgba(201, 125, 125, 0.08)', borderGlow: 'rgba(201, 125, 125, 0.22)' },
  7: { accent: '#C682A3', accentSolid: '#753958', accentSoft: 'rgba(198, 130, 163, 0.11)', onAccent: '#F9ECF2', glow: 'rgba(198, 130, 163, 0.08)', borderGlow: 'rgba(198, 130, 163, 0.22)' },
};

export function getChapterPalette(chapterNumber: number, theme: ThemeMode): ChapterPalette {
  const table = theme === 'dark' ? DARK_PALETTES : LIGHT_PALETTES;
  return table[chapterNumber] ?? table[1];
}
