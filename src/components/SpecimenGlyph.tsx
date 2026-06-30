import type { Specimen } from "@/types/specimen";

type SpecimenSignalGlyphProps = {
  specimen: Specimen;
  className?: string;
};

function AxolotlGlyph() {
  const paths = [
    "M80 125 C118 73 236 72 286 124 C309 148 302 183 264 198 C207 221 107 198 75 153 C63 137 65 130 80 125 Z",
    "M279 130 C318 112 342 124 350 151 C326 150 304 158 281 173",
    "M118 111 C101 94 87 76 81 52 M103 119 C80 111 61 99 45 80",
    "M239 111 C257 94 271 75 278 51 M254 120 C279 112 299 99 316 80",
    "M117 153 C95 169 73 178 48 182 M150 181 C135 205 115 220 90 226 M220 181 C236 207 258 221 286 227",
  ];

  return (
    <>
      <path d={paths[0]} fill="rgba(143,247,214,0.075)" stroke="rgba(143,247,214,0.86)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      {paths.slice(1).map((path, index) => (
        <path
          d={path}
          key={path}
          stroke={index > 1 ? "rgba(217,168,92,0.78)" : "rgba(143,247,214,0.78)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      ))}
      <circle cx="139" cy="111" fill="var(--ctenophore)" r="4" />
    </>
  );
}

function EnzymeGlyph() {
  return (
    <>
      <path d="M54 142 C92 102 132 104 169 139 C202 170 244 166 306 112" fill="none" stroke="rgba(217,168,92,0.7)" strokeLinecap="round" strokeWidth="7" />
      <path d="M73 143 L98 116 L132 122 L148 153 L128 181 L91 176 Z" fill="rgba(143,247,214,0.055)" stroke="rgba(143,247,214,0.8)" strokeLinejoin="round" strokeWidth="3" />
      <path d="M205 103 C231 66 292 80 307 125 C326 183 248 217 205 181 C179 159 179 126 205 103 Z" fill="rgba(143,247,214,0.09)" stroke="rgba(143,247,214,0.85)" strokeWidth="4" />
      <path d="M226 128 C248 113 275 118 286 140 M219 162 C245 181 276 174 290 151" fill="none" stroke="rgba(237,234,226,0.4)" strokeLinecap="round" strokeWidth="3" />
      <circle cx="237" cy="143" fill="var(--anglerfish-amber)" r="5" />
      <circle cx="269" cy="148" fill="var(--ctenophore)" r="4" />
    </>
  );
}

function FluorescentProteinGlyph() {
  return (
    <>
      <path d="M119 116 C132 65 230 63 249 116 C258 143 238 164 185 166 C135 168 111 143 119 116 Z" fill="rgba(143,247,214,0.1)" stroke="rgba(143,247,214,0.88)" strokeWidth="4" />
      <path d="M140 162 C125 190 118 214 111 233 M165 164 C160 197 157 217 156 239 M190 166 C190 195 193 218 199 239 M217 162 C235 193 243 214 251 234" stroke="rgba(217,168,92,0.72)" strokeLinecap="round" strokeWidth="3" />
      <path d="M160 115 C174 95 201 95 214 116 C206 137 172 137 160 115 Z" fill="rgba(143,247,214,0.2)" stroke="rgba(237,234,226,0.42)" strokeWidth="2" />
      <circle cx="187" cy="118" fill="var(--ctenophore)" r="9" />
      {[76, 93, 282, 304, 178, 210].map((cx, index) => (
        <circle cx={cx} cy={index < 2 ? 82 + index * 70 : index < 4 ? 74 + (index - 2) * 88 : 42} fill="rgba(143,247,214,0.82)" key={`${cx}-${index}`} r={index > 3 ? 3 : 4} />
      ))}
      <path d="M187 26 L187 64 M72 116 L108 116 M266 116 L306 116" stroke="rgba(143,247,214,0.38)" strokeLinecap="round" strokeWidth="2" />
    </>
  );
}

function TardigradeShieldGlyph() {
  return (
    <>
      <path d="M105 137 C99 86 149 59 207 75 C266 91 290 139 262 178 C236 215 149 215 119 177 C109 165 106 151 105 137 Z" fill="rgba(143,247,214,0.08)" stroke="rgba(143,247,214,0.86)" strokeWidth="4" />
      <path d="M133 114 C160 101 209 103 241 124 M128 149 C158 169 210 172 249 151" stroke="rgba(237,234,226,0.34)" strokeLinecap="round" strokeWidth="3" />
      <path d="M116 176 C97 196 76 204 53 203 M149 195 C139 220 122 233 97 237 M223 195 C237 220 255 232 280 236 M266 164 C293 173 313 187 326 207" stroke="rgba(217,168,92,0.74)" strokeLinecap="round" strokeWidth="3" />
      <path d="M182 98 C202 112 224 114 246 104 L246 142 C245 167 225 185 214 192 C202 183 183 166 182 142 Z" fill="rgba(217,168,92,0.11)" stroke="rgba(217,168,92,0.82)" strokeLinejoin="round" strokeWidth="3" />
      <path d="M201 118 C217 128 212 143 228 153 M228 118 C211 128 216 143 199 153" stroke="rgba(143,247,214,0.78)" strokeLinecap="round" strokeWidth="2" />
    </>
  );
}

function RadioduransGlyph() {
  const cells = [
    { cx: 151, cy: 110 },
    { cx: 202, cy: 110 },
    { cx: 151, cy: 161 },
    { cx: 202, cy: 161 },
  ];

  return (
    <>
      {cells.map((cell) => (
        <circle cx={cell.cx} cy={cell.cy} fill="rgba(143,247,214,0.08)" key={`${cell.cx}-${cell.cy}`} r="38" stroke="rgba(143,247,214,0.86)" strokeWidth="4" />
      ))}
      <path d="M105 78 L80 48 M249 78 L278 48 M105 193 L80 222 M249 193 L280 222" stroke="rgba(217,168,92,0.72)" strokeLinecap="round" strokeWidth="3" />
      <path d="M135 110 C153 92 174 128 193 110 C209 94 228 123 243 109" fill="none" stroke="rgba(237,234,226,0.45)" strokeLinecap="round" strokeWidth="2" />
      <path d="M124 160 C149 139 170 182 194 160 C215 142 235 175 252 157" fill="none" stroke="rgba(237,234,226,0.45)" strokeLinecap="round" strokeWidth="2" />
      <path d="M84 136 L116 136 M238 136 L270 136 M176 69 L176 101 M176 170 L176 204" stroke="rgba(143,247,214,0.4)" strokeLinecap="round" strokeDasharray="4 7" strokeWidth="2" />
      <circle cx="177" cy="136" fill="var(--anglerfish-amber)" r="6" />
    </>
  );
}

function renderGlyph(silhouette: string) {
  if (silhouette === "enzyme") {
    return <EnzymeGlyph />;
  }

  if (silhouette === "fluorescent-protein") {
    return <FluorescentProteinGlyph />;
  }

  if (silhouette === "tardigrade-shield") {
    return <TardigradeShieldGlyph />;
  }

  if (silhouette === "radiodurans") {
    return <RadioduransGlyph />;
  }

  return <AxolotlGlyph />;
}

export function SpecimenSignalGlyph({ specimen, className }: SpecimenSignalGlyphProps) {
  return (
    <svg aria-label={`${specimen.commonName} signal glyph`} className={className} fill="none" viewBox="0 0 360 250">
      {renderGlyph(specimen.silhouette)}
    </svg>
  );
}
