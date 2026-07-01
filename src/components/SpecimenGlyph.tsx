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

function AntifreezeFishGlyph() {
  const iceCrystals = [
    { cx: 74, cy: 70 },
    { cx: 292, cy: 82 },
    { cx: 266, cy: 204 },
  ];

  return (
    <>
      <path d="M62 132 C101 83 204 75 275 121 C302 139 302 158 276 176 C207 224 102 200 62 152 C54 143 54 139 62 132 Z" fill="rgba(143,247,214,0.07)" stroke="rgba(143,247,214,0.86)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <path d="M276 122 C317 99 336 117 347 151 C325 148 305 157 276 177" fill="rgba(143,247,214,0.045)" stroke="rgba(143,247,214,0.75)" strokeLinejoin="round" strokeWidth="3" />
      <path d="M118 104 C154 130 197 132 237 105 M116 168 C154 146 202 146 241 171" stroke="rgba(237,234,226,0.34)" strokeLinecap="round" strokeWidth="3" />
      <path d="M128 78 L116 45 M163 71 L165 38 M197 76 L212 43 M92 193 L76 223 M141 202 L132 235 M199 201 L212 232" stroke="rgba(217,168,92,0.68)" strokeLinecap="round" strokeWidth="3" />
      <circle cx="121" cy="125" fill="var(--ctenophore)" r="5" />
      <path d="M156 127 C177 111 201 141 223 125" stroke="rgba(217,168,92,0.78)" strokeLinecap="round" strokeWidth="3" />
      {iceCrystals.map((crystal) => (
        <g key={`${crystal.cx}-${crystal.cy}`} stroke="rgba(143,247,214,0.58)" strokeLinecap="round" strokeWidth="2">
          <path d={`M${crystal.cx - 13} ${crystal.cy} L${crystal.cx + 13} ${crystal.cy}`} />
          <path d={`M${crystal.cx} ${crystal.cy - 13} L${crystal.cx} ${crystal.cy + 13}`} />
          <path d={`M${crystal.cx - 9} ${crystal.cy - 9} L${crystal.cx + 9} ${crystal.cy + 9}`} />
          <path d={`M${crystal.cx + 9} ${crystal.cy - 9} L${crystal.cx - 9} ${crystal.cy + 9}`} />
        </g>
      ))}
    </>
  );
}

function HorseshoeLalGlyph() {
  return (
    <>
      <path d="M90 153 C86 89 128 57 181 57 C234 57 276 90 270 154 C267 195 231 219 181 219 C131 219 93 195 90 153 Z" fill="rgba(143,247,214,0.07)" stroke="rgba(143,247,214,0.86)" strokeWidth="4" />
      <path d="M116 148 C128 119 151 104 181 104 C211 104 234 119 246 148 M122 175 C151 160 211 160 239 175" stroke="rgba(237,234,226,0.34)" strokeLinecap="round" strokeWidth="3" />
      <path d="M181 218 L181 242 M102 164 C75 172 52 189 38 214 M260 164 C288 172 311 189 324 214" stroke="rgba(217,168,92,0.72)" strokeLinecap="round" strokeWidth="3" />
      <path d="M132 81 C112 66 91 57 69 54 M231 81 C251 66 271 57 294 54 M146 57 L139 36 M216 57 L224 36" stroke="rgba(143,247,214,0.5)" strokeLinecap="round" strokeWidth="3" />
      <path d="M57 94 C77 105 88 121 92 143 M305 94 C285 105 274 121 270 143" stroke="rgba(143,247,214,0.52)" strokeLinecap="round" strokeWidth="3" />
      <circle cx="164" cy="132" fill="var(--ctenophore)" r="4" />
      <circle cx="198" cy="132" fill="var(--ctenophore)" r="4" />
      <path d="M150 31 C133 49 134 66 151 77 C168 65 168 48 150 31 Z" fill="rgba(217,168,92,0.15)" stroke="rgba(217,168,92,0.82)" strokeLinejoin="round" strokeWidth="3" />
      <path d="M212 31 C195 49 196 66 213 77 C230 65 230 48 212 31 Z" fill="rgba(217,168,92,0.15)" stroke="rgba(217,168,92,0.82)" strokeLinejoin="round" strokeWidth="3" />
      <path d="M150 95 L181 116 L212 95" stroke="rgba(217,168,92,0.7)" strokeLinecap="round" strokeDasharray="4 7" strokeWidth="2" />
    </>
  );
}

function MimivirusGlyph() {
  const spikes = [
    "M181 34 L181 11",
    "M181 238 L181 215",
    "M78 135 L50 135",
    "M312 135 L284 135",
    "M108 62 L88 42",
    "M254 208 L273 228",
    "M255 62 L275 42",
    "M107 208 L88 228",
  ];

  return (
    <>
      {spikes.map((spike) => (
        <path d={spike} key={spike} stroke="rgba(217,168,92,0.68)" strokeLinecap="round" strokeWidth="3" />
      ))}
      <path d="M181 37 L259 83 L259 174 L181 219 L102 174 L102 83 Z" fill="rgba(143,247,214,0.065)" stroke="rgba(143,247,214,0.86)" strokeLinejoin="round" strokeWidth="4" />
      <path d="M181 37 L181 219 M102 83 L259 174 M259 83 L102 174" stroke="rgba(237,234,226,0.24)" strokeLinecap="round" strokeWidth="2" />
      <path d="M145 91 C168 75 204 76 226 94 C245 110 247 139 229 159 C206 184 158 183 135 157 C115 134 121 108 145 91 Z" fill="rgba(143,247,214,0.1)" stroke="rgba(143,247,214,0.58)" strokeWidth="3" />
      <path d="M145 124 C163 110 183 139 202 124 C216 113 231 130 238 145 M133 149 C151 165 174 139 195 157 C211 171 226 164 237 153" fill="none" stroke="rgba(217,168,92,0.72)" strokeLinecap="round" strokeWidth="3" />
      <circle cx="181" cy="135" fill="var(--ctenophore)" r="7" />
      {[126, 156, 207, 236].map((cx, index) => (
        <circle cx={cx} cy={index % 2 === 0 ? 104 : 178} fill="rgba(143,247,214,0.54)" key={cx} r="4" />
      ))}
    </>
  );
}

function ElectricEelGlyph() {
  return (
    <>
      <path d="M44 151 C90 96 133 94 178 130 C215 159 245 161 319 94" fill="none" stroke="rgba(143,247,214,0.88)" strokeLinecap="round" strokeWidth="15" />
      <path d="M58 150 C101 110 135 115 172 143 C209 171 253 157 307 110" fill="none" stroke="rgba(6,9,12,0.76)" strokeLinecap="round" strokeWidth="5" />
      <path d="M295 96 L340 74 L323 119 Z" fill="rgba(143,247,214,0.08)" stroke="rgba(143,247,214,0.82)" strokeLinejoin="round" strokeWidth="3" />
      <circle cx="291" cy="102" fill="var(--ctenophore)" r="4" />
      <path d="M117 61 L94 112 L135 107 L113 171 L177 88 L138 94 L154 49 Z" fill="rgba(217,168,92,0.13)" stroke="rgba(217,168,92,0.86)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M209 52 L191 91 L224 88 L204 137 L258 73 L227 78 L238 46 Z" fill="rgba(217,168,92,0.1)" stroke="rgba(217,168,92,0.72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M70 205 C96 185 119 222 145 202 C170 183 190 220 216 202 C237 187 260 203 282 189" stroke="rgba(237,234,226,0.35)" strokeLinecap="round" strokeWidth="2" />
      <path d="M61 86 C85 69 103 88 126 71 M238 192 C261 175 284 195 306 175" stroke="rgba(143,247,214,0.42)" strokeLinecap="round" strokeDasharray="4 8" strokeWidth="2" />
    </>
  );
}

function ThermogenicFlowerGlyph() {
  return (
    <>
      <path d="M180 62 C139 62 100 91 86 132 C111 124 143 133 165 158 C174 134 179 99 180 62 Z" fill="rgba(143,247,214,0.06)" stroke="rgba(143,247,214,0.78)" strokeLinejoin="round" strokeWidth="4" />
      <path d="M181 62 C222 62 261 91 275 132 C250 124 218 133 196 158 C187 134 182 99 181 62 Z" fill="rgba(143,247,214,0.06)" stroke="rgba(143,247,214,0.78)" strokeLinejoin="round" strokeWidth="4" />
      <path d="M107 138 C126 185 160 215 181 226 C201 215 235 185 254 138 C229 153 207 177 181 222 C154 177 132 153 107 138 Z" fill="rgba(143,247,214,0.075)" stroke="rgba(143,247,214,0.86)" strokeLinejoin="round" strokeWidth="4" />
      <path d="M181 45 C202 73 207 122 196 166 C192 184 188 202 181 222 C173 202 169 184 165 166 C154 122 160 73 181 45 Z" fill="rgba(217,168,92,0.16)" stroke="rgba(217,168,92,0.86)" strokeLinejoin="round" strokeWidth="4" />
      <path d="M151 46 C129 28 133 12 153 2 M211 46 C233 28 229 12 209 2 M132 75 C102 66 92 47 106 28 M230 75 C260 66 270 47 256 28" stroke="rgba(217,168,92,0.62)" strokeLinecap="round" strokeWidth="3" />
      <path d="M181 94 C191 109 191 135 181 153 C171 135 171 109 181 94 Z" fill="rgba(237,234,226,0.22)" stroke="rgba(237,234,226,0.45)" strokeWidth="2" />
      <path d="M125 218 C146 204 163 229 181 214 C199 229 216 204 237 218" stroke="rgba(143,247,214,0.42)" strokeLinecap="round" strokeDasharray="5 8" strokeWidth="2" />
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

  if (silhouette === "antifreeze-fish") {
    return <AntifreezeFishGlyph />;
  }

  if (silhouette === "horseshoe-lal") {
    return <HorseshoeLalGlyph />;
  }

  if (silhouette === "mimivirus") {
    return <MimivirusGlyph />;
  }

  if (silhouette === "electric-eel") {
    return <ElectricEelGlyph />;
  }

  if (silhouette === "thermogenic-flower") {
    return <ThermogenicFlowerGlyph />;
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
