// ===================================================================
// ROUNDTABLE SCENE V5: 2D VECTOR CAMPUS PATIO, 5 COZY CHARACTERS & MOUTH FLAP
// ===================================================================

export const ROUNDTABLE_BACKDROP_SVG = `    <svg id="campus-backdrop" width="100%" height="100%" viewBox="0 0 440 825" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <!-- Warm Sunlit Sky -->
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0.2" y2="1">
         <stop offset="0%" stop-color="#c6e5f7" />
         <stop offset="48%" stop-color="#f7ebd8" />
         <stop offset="100%" stop-color="#fde0be" />
        </linearGradient>

        <!-- Golden Morning Sunbeams -->
        <linearGradient id="sunBeam" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#fff9db" stop-opacity="0.48" />
         <stop offset="100%" stop-color="#fff9db" stop-opacity="0" />
        </linearGradient>

        <!-- Foliage Gradients -->
        <radialGradient id="foliageLight" cx="35%" cy="30%" r="70%">
         <stop offset="0%" stop-color="#c5e69e" />
         <stop offset="65%" stop-color="#96c474" />
         <stop offset="100%" stop-color="#73a154" />
        </radialGradient>
        <radialGradient id="foliageDeep" cx="40%" cy="30%" r="70%">
         <stop offset="0%" stop-color="#a6d184" />
         <stop offset="75%" stop-color="#7aa85b" />
         <stop offset="100%" stop-color="#5d8743" />
        </radialGradient>

        <!-- Building & Roof Gradients -->
        <linearGradient id="roofTerracotta" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="#eb9c7a" />
         <stop offset="100%" stop-color="#c97252" />
        </linearGradient>
        <linearGradient id="wallCream" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="#fff3e2" />
         <stop offset="100%" stop-color="#ebd4b7" />
        </linearGradient>

        <!-- Cafe Wooden Deck Gradient -->
        <linearGradient id="deckWood" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="#e3b98f" />
         <stop offset="55%" stop-color="#d2a274" />
         <stop offset="100%" stop-color="#bd895b" />
        </linearGradient>

        <!-- Fairy Light Radial Glow -->
        <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
         <stop offset="0%" stop-color="#fff9c4" stop-opacity="0.95" />
         <stop offset="45%" stop-color="#ffe082" stop-opacity="0.45" />
         <stop offset="100%" stop-color="#ffe082" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Sky Backdrop -->
      <rect x="0" y="0" width="440" height="440" fill="url(#skyGradient)" />

      <!-- Soft Hand-Drawn Fluffy Clouds -->
      <g fill="#ffffff" opacity="0.82">
       <path d="M55 112 Q65 94 86 98 Q100 84 122 94 Q138 94 142 110 Q152 114 146 124 L50 124 Q44 116 55 112 Z" />
       <path d="M292 94 Q302 80 318 84 Q330 74 348 83 Q362 84 364 96 Q372 100 366 108 L288 108 Q284 100 292 94 Z" />
      </g>

      <!-- Lush Background Trees Behind Campus -->
      <g stroke="#55783e" stroke-width="1.8">
       <circle cx="38" cy="192" r="68" fill="url(#foliageDeep)" />
       <circle cx="96" cy="176" r="54" fill="url(#foliageLight)" />
       <circle cx="20" cy="252" r="56" fill="url(#foliageLight)" />
       <circle cx="348" cy="196" r="62" fill="url(#foliageDeep)" />
       <circle cx="408" cy="188" r="52" fill="url(#foliageLight)" />
      </g>

      <!-- Classic Two-Story University Building (Right Mid-Background) -->
      <g>
        <rect x="276" y="196" width="150" height="145" fill="url(#wallCream)" stroke="#6e4d3b" stroke-width="2.2" />
        <polygon points="266,198 351,150 436,198" fill="url(#roofTerracotta)" stroke="#6e4332" stroke-width="2.2" stroke-linejoin="round" />
        <line x1="276" y1="201" x2="426" y2="201" stroke="#8f5b42" stroke-width="3" opacity="0.45" />
        <rect x="276" y="252" width="150" height="6" fill="#dfc19f" stroke="#6e4d3b" stroke-width="1.5" />
        <!-- Arched Campus Windows -->
        <g fill="#b9d8eb" stroke="#6e4d3b" stroke-width="1.8">
          <path d="M294 244 L294 220 A11 11 0 0 1 316 220 L316 244 Z" />
          <path d="M338 244 L338 220 A11 11 0 0 1 360 220 L360 244 Z" />
          <path d="M382 244 L382 220 A11 11 0 0 1 404 220 L404 244 Z" />
          <path d="M294 302 L294 278 A11 11 0 0 1 316 278 L316 302 Z" />
          <path d="M338 302 L338 278 A11 11 0 0 1 360 278 L360 302 Z" />
          <path d="M382 302 L382 278 A11 11 0 0 1 404 278 L404 302 Z" />
        </g>
      </g>

      <!-- Center University Gate Structure ("ĐẠI HỌC") -->
      <g stroke="#6e4d3b" stroke-width="2.2" stroke-linejoin="round">
        <rect x="100" y="222" width="22" height="116" fill="url(#wallCream)" />
        <rect x="228" y="222" width="22" height="116" fill="url(#wallCream)" />
        <rect x="94" y="212" width="162" height="14" rx="3" fill="#f5e1cb" />
        <!-- Gate Signboard: "ĐẠI HỌC" -->
        <rect x="126" y="186" width="98" height="28" rx="7" fill="#fff9ee" stroke="#7c533c" stroke-width="2" />
        <text x="175" y="205" font-family="'Baloo 2', Nunito, sans-serif" font-weight="900" font-size="13" fill="#6e4332" text-anchor="middle" letter-spacing="1.5">ĐẠI HỌC</text>
        <!-- Iron Gate Bars -->
        <g stroke="#8093a3" stroke-width="2.5" opacity="0.8">
          <line x1="130" y1="228" x2="130" y2="336" />
          <line x1="145" y1="228" x2="145" y2="336" />
          <line x1="160" y1="228" x2="160" y2="336" />
          <line x1="175" y1="228" x2="175" y2="336" />
          <line x1="190" y1="228" x2="190" y2="336" />
          <line x1="205" y1="228" x2="205" y2="336" />
          <line x1="220" y1="228" x2="220" y2="336" />
        </g>
      </g>

      <!-- Wooden Deck Floor with Warm Planks -->
      <rect x="0" y="334" width="440" height="491" fill="url(#deckWood)" />
      <g stroke="#9c6c44" stroke-width="1.8" opacity="0.65">
        <line x1="0" y1="384" x2="440" y2="384" />
        <line x1="0" y1="440" x2="440" y2="440" />
        <line x1="0" y1="504" x2="440" y2="504" />
        <line x1="0" y1="576" x2="440" y2="576" />
        <line x1="0" y1="656" x2="440" y2="656" />
        <line x1="0" y1="744" x2="440" y2="744" />
      </g>

      <!-- Pergola Wooden Posts & Top Beams -->
      <g stroke="#4a3022" stroke-width="2.4" stroke-linejoin="round">
        <!-- Left & Right Main Columns -->
        <rect x="18" y="24" width="22" height="340" rx="3" fill="#804d2e" />
        <rect x="400" y="24" width="22" height="340" rx="3" fill="#804d2e" />
        <!-- Top Horizontal Header Beam -->
        <rect x="8" y="36" width="424" height="20" rx="4" fill="#9c5f38" />
        <rect x="2" y="40" width="436" height="6" rx="2" fill="#ba774b" stroke="none" />
      </g>

      <!-- Hanging Fairy String Lights -->
      <path d="M28 54 Q120 114 220 72 Q320 114 412 54" fill="none" stroke="#52392b" stroke-width="2.2" stroke-linecap="round" />
      <g>
        <circle cx="78" cy="84" r="14" fill="url(#bulbGlow)" />
        <ellipse cx="78" cy="84" rx="4.5" ry="6" fill="#fff59d" stroke="#5c432d" stroke-width="1.4" />
        <circle cx="140" cy="98" r="14" fill="url(#bulbGlow)" />
        <ellipse cx="140" cy="98" rx="4.5" ry="6" fill="#fff59d" stroke="#5c432d" stroke-width="1.4" />
        <circle cx="220" cy="74" r="14" fill="url(#bulbGlow)" />
        <ellipse cx="220" cy="74" rx="4.5" ry="6" fill="#fff59d" stroke="#5c432d" stroke-width="1.4" />
        <circle cx="300" cy="98" r="14" fill="url(#bulbGlow)" />
        <ellipse cx="300" cy="98" rx="4.5" ry="6" fill="#fff59d" stroke="#5c432d" stroke-width="1.4" />
        <circle cx="362" cy="84" r="14" fill="url(#bulbGlow)" />
        <ellipse cx="362" cy="84" rx="4.5" ry="6" fill="#fff59d" stroke="#5c432d" stroke-width="1.4" />
      </g>

      <!-- Hanging Potted Plants on Pergola -->
      <g stroke="#4a3022" stroke-width="1.8" stroke-linejoin="round">
        <!-- Left Hanging Terracotta Planter -->
        <path d="M52 56 L62 90 M88 56 L78 90" stroke="#755239" stroke-width="1.6" />
        <polygon points="56,90 84,90 78,110 62,110" fill="#cf7651" />
        <circle cx="62" cy="88" r="10" fill="#88b560" />
        <circle cx="78" cy="88" r="10" fill="#6d9949" />
        <circle cx="70" cy="82" r="12" fill="#a4d173" />
        <path d="M66 98 Q58 122 66 136 M74 98 Q82 120 74 134" fill="none" stroke="#6d9949" stroke-width="2.5" stroke-linecap="round" />
        <!-- Balcony Potted Plants Left & Right -->
        <g transform="translate(14, 300)">
          <polygon points="4,24 24,24 21,46 7,46" fill="#cf7651" />
          <circle cx="14" cy="18" r="14" fill="#88b560" />
          <circle cx="14" cy="12" r="11" fill="#a4d173" />
        </g>
        <g transform="translate(396, 300)">
          <polygon points="4,24 24,24 21,46 7,46" fill="#cf7651" />
          <circle cx="14" cy="18" r="14" fill="#88b560" />
          <circle cx="14" cy="12" r="11" fill="#a4d173" />
        </g>
      </g>
    </svg>`;

export const ROUNDTABLE_TABLE_SVG = `
  <div id="round-table" class="rt-table-wrap">
    <svg width="326" height="185" viewBox="0 0 326 185" fill="none" aria-hidden="true">
      <defs>
       <radialGradient id="tableTopGrad" cx="45%" cy="35%" r="65%">
         <stop offset="0%" stop-color="#f5d1a6" />
         <stop offset="75%" stop-color="#dea973" />
         <stop offset="100%" stop-color="#c48a54" />
       </radialGradient>
      </defs>
      <!-- Table Pedestal & Legs -->
      <ellipse cx="163" cy="172" rx="76" ry="11" fill="#6e462b" opacity="0.32" />
      <rect x="148" y="96" width="30" height="74" rx="8" fill="#8f5c38" stroke="#4a3228" stroke-width="2.2" />
      <path d="M116 168 Q163 156 210 168 L204 176 Q163 166 122 176 Z" fill="#784b2c" stroke="#4a3228" stroke-width="2" />

     <!-- Round Wooden Tabletop Thickness & Surface -->
     <ellipse cx="163" cy="84" rx="146" ry="52" fill="#9c673e" stroke="#4a3228" stroke-width="2.4" />
     <ellipse cx="163" cy="76" rx="146" ry="50" fill="url(#tableTopGrad)" stroke="#4a3228" stroke-width="2.4" />
     <ellipse cx="163" cy="76" rx="134" ry="43" fill="none" stroke="#f7dfc1" stroke-width="1.5" opacity="0.65" />

     <!-- Leader's Silver Laptop (Left-Center) -->
     <g transform="translate(86, 44)">
      <polygon points="8,24 54,20 66,34 18,38" fill="#d9e1eb" stroke="#4a3228" stroke-width="2" stroke-linejoin="round" />
      <polygon points="4,0 50,-4 54,20 8,24" fill="#eef3f8" stroke="#4a3228" stroke-width="2" stroke-linejoin="round" />
      <circle cx="29" cy="10" r="3" fill="#a4b3c7" />
      <polygon points="7,2 47,-2 50,18 10,21" fill="#b9e1f5" />
     </g>

     <!-- Stack of Study Books (Right-Center) -->
     <g transform="translate(196, 48)">
      <path d="M4 18 L54 12 L60 22 L8 28 Z" fill="#db5353" stroke="#4a3228" stroke-width="1.8" />
      <path d="M2 10 L52 4 L58 14 L6 20 Z" fill="#4d82b8" stroke="#4a3228" stroke-width="1.8" />
      <path d="M0 2 L50 -4 L56 6 L4 12 Z" fill="#58a368" stroke="#4a3228" stroke-width="1.8" />
      <rect x="5" y="1" width="46" height="3" fill="#ffffff" opacity="0.85" />
     </g>

     <!-- Takeout Coffee Cups with Straws -->
     <g transform="translate(162, 70)">
      <ellipse cx="9" cy="22" rx="7" ry="2.5" fill="#5c3822" opacity="0.3" />
      <polygon points="2,8 16,8 14,22 4,22" fill="#f7be8b" stroke="#4a3228" stroke-width="1.6" />
      <ellipse cx="9" cy="8" rx="7" ry="2.2" fill="#ffffff" stroke="#4a3228" stroke-width="1.6" />
      <line x1="9" y1="8" x2="13" y2="-2" stroke="#e05353" stroke-width="2.2" stroke-linecap="round" />
     </g>
     <g transform="translate(122, 68)">
      <ellipse cx="9" cy="22" rx="7" ry="2.5" fill="#5c3822" opacity="0.3" />
      <polygon points="2,8 16,8 14,22 4,22" fill="#e6a477" stroke="#4a3228" stroke-width="1.6" />
      <ellipse cx="9" cy="8" rx="7" ry="2.2" fill="#ffffff" stroke="#4a3228" stroke-width="1.6" />
      <line x1="9" y1="8" x2="6" y2="-3" stroke="#5cb85c" stroke-width="2.2" stroke-linecap="round" />
     </g>

     <!-- White Notes / Papers -->
     <polygon points="56,76 82,72 88,88 62,92" fill="#ffffff" stroke="#4a3228" stroke-width="1.6" />
     <line x1="62" y1="78" x2="78" y2="75" stroke="#a1b0c2" stroke-width="1.2" />
     <line x1="64" y1="83" x2="82" y2="80" stroke="#a1b0c2" stroke-width="1.2" />
    </svg>
  </div>`;

// Standard mood mapper ensuring only valid SVG states are loaded
export function normalizeMood(mood) {
  if (!mood) return 'idle';
  const m = mood.toLowerCase();
  const valid = ['happy', 'sad', 'worried', 'angry', 'confused', 'surprised', 'embarrassed', 'idle', 'talk'];
  if (valid.includes(m)) return m;
  if (m === 'neutral') return 'idle';
  if (m === 'thoughtful') return 'confused';
  if (m === 'serious' || m === 'overwhelmed') return 'worried';
  return 'idle';
}

// Render dynamic characters seated intimately around the 3D table
export function renderRoundtableCharacters(state, moods = {}, activeSpeakerKey = null) {
  const userRole = state?.role || 'leader';
  const userAvatarType = state?.avatarType || 'girl';
  const userOutfit = state?.outfit || 'vnu';

  const SEATS = [
    {
      key: 'Leader',
      role: 'leader',
      label: 'Leader',
      style: 'left: 28%; top: 37%; transform: translate(-50%, -50%); width: 96px; height: 122px; z-index: 12;',
      chair: `
        <svg class="rt-chair-back" viewBox="0 0 50 60" style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:54px; height:60px; z-index:1; pointer-events:none;">
          <rect x="8" y="10" width="34" height="38" rx="8" fill="#ba8054" stroke="#4a3228" stroke-width="2.2"/>
          <line x1="16" y1="16" x2="16" y2="44" stroke="#4a3228" stroke-width="2"/>
          <line x1="25" y1="16" x2="25" y2="44" stroke="#4a3228" stroke-width="2"/>
          <line x1="34" y1="16" x2="34" y2="44" stroke="#4a3228" stroke-width="2"/>
        </svg>
      `
    },
    {
      key: 'QC',
      role: 'qc',
      label: 'QC',
      style: 'left: 72%; top: 37%; transform: translate(-50%, -50%); width: 96px; height: 122px; z-index: 12;',
      chair: `
        <svg class="rt-chair-back" viewBox="0 0 50 60" style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); width:54px; height:60px; z-index:1; pointer-events:none;">
          <rect x="8" y="10" width="34" height="38" rx="8" fill="#ba8054" stroke="#4a3228" stroke-width="2.2"/>
          <line x1="16" y1="16" x2="16" y2="44" stroke="#4a3228" stroke-width="2"/>
          <line x1="25" y1="16" x2="25" y2="44" stroke="#4a3228" stroke-width="2"/>
          <line x1="34" y1="16" x2="34" y2="44" stroke="#4a3228" stroke-width="2"/>
        </svg>
      `
    },
    {
      key: 'Doer',
      role: 'doer',
      label: 'Doer',
      style: 'left: 14%; top: 50%; transform: translate(-50%, -50%); width: 96px; height: 122px; z-index: 22;',
      chair: `
        <svg class="rt-chair-back rt-chair-left" viewBox="0 0 50 65" style="position:absolute; top:-8px; left:10px; width:48px; height:62px; z-index:1; pointer-events:none;">
          <rect x="8" y="10" width="34" height="42" rx="8" fill="#c48a54" stroke="#4a3228" stroke-width="2.2"/>
          <line x1="16" y1="16" x2="16" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="25" y1="16" x2="25" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="34" y1="16" x2="34" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="12" y1="48" x2="8" y2="62" stroke="#8c532b" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `
    },
    {
      key: 'Mediator',
      role: 'mediator',
      label: 'Mediator',
      style: 'left: 86%; top: 50%; transform: translate(-50%, -50%); width: 96px; height: 122px; z-index: 22;',
      chair: `
        <svg class="rt-chair-back rt-chair-right" viewBox="0 0 50 65" style="position:absolute; top:-8px; right:10px; width:48px; height:62px; z-index:1; pointer-events:none;">
          <rect x="8" y="10" width="34" height="42" rx="8" fill="#c48a54" stroke="#4a3228" stroke-width="2.2"/>
          <line x1="16" y1="16" x2="16" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="25" y1="16" x2="25" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="34" y1="16" x2="34" y2="46" stroke="#4a3228" stroke-width="2"/>
          <line x1="38" y1="48" x2="42" y2="62" stroke="#8c532b" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `
    },
    {
      key: 'BanThan',
      role: 'follower',
      label: 'Bạn thân',
      style: 'left: 68%; top: 64%; transform: translate(-50%, -50%); width: 96px; height: 122px; z-index: 26;',
      chair: `
        <svg class="rt-stool" viewBox="0 0 54 36" style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); width:54px; height:36px; z-index:1; pointer-events:none;">
          <ellipse cx="27" cy="10" rx="24" ry="7" fill="#dea973" stroke="#4a3228" stroke-width="2.2"/>
          <ellipse cx="27" cy="8" rx="22" ry="5.5" fill="#f5d1a6" stroke="none"/>
          <line x1="12" y1="14" x2="8" y2="32" stroke="#8c532b" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="22" y1="15" x2="20" y2="34" stroke="#70401d" stroke-width="3" stroke-linecap="round"/>
          <line x1="32" y1="15" x2="34" y2="34" stroke="#70401d" stroke-width="3" stroke-linecap="round"/>
          <line x1="42" y1="14" x2="46" y2="32" stroke="#8c532b" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="10" y1="24" x2="44" y2="24" stroke="#4a3228" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `
    }
  ];

  let html = '';

  SEATS.forEach(seat => {
    const isPlayer = seat.role === userRole;
    const baseChar = isPlayer
      ? (userAvatarType === 'boy' ? seat.role : userAvatarType)
      : seat.role;

    const rawMood = moods[seat.key] || 'idle';
    const mood = normalizeMood(rawMood);
    const isSpeaking = activeSpeakerKey === seat.key;

    const badgeLabel = isPlayer ? `${seat.label} (Bạn)` : seat.label;
    const badgeClass = isPlayer ? 'char-badge badge-player' : 'char-badge';

    const speakingClass = isSpeaking ? 'is-speaking' : 'is-resting';

    html += `
      <div
        id="seat-${seat.key}"
        class="character-seat ${speakingClass}"
        style="${seat.style}"
        data-base="${baseChar}"
        data-role="${seat.role}"
      >
        <div class="character-art" style="position:relative; width:100%; height:100%;">
          ${seat.chair || ''}
          <div class="rt-char-shadow" style="position:absolute; bottom:2px; left:50%; transform:translateX(-50%); width:68px; height:12px; background:radial-gradient(ellipse at center, rgba(57,93,110,0.28) 0%, rgba(57,93,110,0) 72%); z-index:2; pointer-events:none;"></div>
          
          <img
            class="rt-seat-char-img rt-char-face"
            src="assets/characters/${baseChar}_${mood}.svg"
            alt="${badgeLabel}"
            style="position:relative; width:100%; height:100%; object-fit:contain; z-index:3;"
          >

          ${(isPlayer && userOutfit && userOutfit !== 'vnu') ? `
            <img
              class="rt-seat-char-img rt-char-outfit"
              src="assets/characters/${baseChar}_outfit_${userOutfit}.svg"
              alt=""
              style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; clip-path: inset(50% 0 0 0); z-index:4; pointer-events:none;"
            >
          ` : ''}

          <!-- Animated Mouth Flap: Perfectly placed over the character mouth -->
          <div class="rt-mouth-flap" style="position:absolute; left:48%; top:33%; width:14%; height:6.5%; transform:translate(-50%, -50%); z-index:6; pointer-events:none;">
            <svg viewBox="0 0 28 18" width="100%" height="100%" style="overflow:visible;">
              <ellipse cx="14" cy="9" rx="12" ry="7.5" fill="#a83244" stroke="#353b4a" stroke-width="1.8"/>
              <path d="M7 11 Q14 7 21 11 Q17 15 14 15 Q11 15 7 11 Z" fill="#ff7a8a"/>
              <path d="M6 8 Q14 11 22 8" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <span class="${badgeClass}">${badgeLabel}</span>
      </div>
    `;
  });

  // Include the 3D table right in between the back characters and front characters
  html += ROUNDTABLE_TABLE_SVG;

  return html;
}

// Keep export for backward compatibility
export const ROUNDTABLE_CHARACTERS_HTML = '';

// Update facial expressions without tearing down DOM
export function applyRoundtableExpressions(expMap, state) {
  if (!expMap) return;
  const userRole = state?.role || 'leader';
  const userAvatarType = state?.avatarType || 'girl';

  Object.entries(expMap).forEach(([charKey, rawMood]) => {
    const seat = document.getElementById(`seat-${charKey}`);
    if (!seat) return;
    const faceImg = seat.querySelector('.rt-char-face');
    if (!faceImg) return;

    const role = seat.dataset.role || 'leader';
    const isPlayer = role === userRole;
    const base = isPlayer ? (userAvatarType === 'boy' ? role : userAvatarType) : role;

    const mood = normalizeMood(rawMood);
    faceImg.src = `assets/characters/${base}_${mood}.svg`;
  });
}

// Highlight the active speaker, dim non-speakers, and activate mouth flap
export function focusRoundtableSpeaker(speakerKey) {
  ['Leader', 'QC', 'Doer', 'Mediator', 'BanThan'].forEach(key => {
    const seat = document.getElementById(`seat-${key}`);
    if (!seat) return;
    if (key === speakerKey) {
      seat.classList.add('is-speaking');
      seat.classList.remove('is-resting');
    } else {
      seat.classList.remove('is-speaking');
      seat.classList.add('is-resting');
    }
  });
}

export function startMouthFlap(speakerKey) {
  focusRoundtableSpeaker(speakerKey);
}

export function stopMouthFlap() {
  focusRoundtableSpeaker(null);
}
