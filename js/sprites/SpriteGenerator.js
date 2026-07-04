// SpriteGenerator.js - All pixel art drawn programmatically via Canvas API
// Every sprite is hand-coded pixel by pixel to showcase coding skills!

const SpriteGen = {

    // Helper: create a canvas and draw pixels from a color map
    createSprite(width, height, pixelData, scale = 1) {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const color = pixelData[y]?.[x];
                if (color && color !== '.') {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
        return canvas;
    },

    // Helper: create a spritesheet canvas from multiple frames
    createSpriteSheet(width, height, frames, scale = 1) {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale * frames.length;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');

        frames.forEach((pixelData, i) => {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const color = pixelData[y]?.[x];
                    if (color && color !== '.') {
                        ctx.fillStyle = color;
                        ctx.fillRect((i * width + x) * scale, y * scale, scale, scale);
                    }
                }
            }
        });
        return canvas;
    },

    // Color palette
    colors: {
        // BRENDA — player recolor (uses same pixel layout as before)
        skin: '#E7B98F',
        skinDark: '#C68642',
        skinLight: '#F3D3B0',
        hair: '#E6C069',        // warm blonde hair
        hairHighlight: '#F4DD9C',
        sunglasses: '#2b2b2b',
        sunglassesLens: '#3a5a6a',
        sunglassesShine: '#FFFACD',
        dressTop: '#2E8B7F',    // teal camping shirt
        dressBottom: '#7A5A38', // khaki/hiking shorts
        dressAccent: '#F4A259', // sunset-orange accent
        shoes: '#5A3A22',       // hiking boots
        white: '#FFFFFF',
        // MAGGIE — German Shepherd recolor (reuses "pom" keys)
        pomFur: '#6E4A2A',      // dark brown ears/outline
        pomFurLight: '#C88A3C', // tan body/face
        pomFurDark: '#1c1c1c',  // black legs/paws/saddle
        pomNose: '#161616',
        pomTongue: '#FF6B8A',
        pomEye: '#161006',
        // S'more collectible colors (reuses "martini" draw keys)
        glass: '#E8C98F',       // graham cracker
        glassShine: '#F0DCB0',
        coffee: '#4A2C17',       // chocolate
        coffeeLight: '#6B4226',
        olive: '#FFF8E7',        // marshmallow
        foam: '#FFFDF5',         // toasted marshmallow
        // Seagull colors
        feather: '#F5F5F5',
        featherGray: '#D3D3D3',
        beak: '#FFB347',
        beakDark: '#E8952E',
        hatBlue: '#1B2A4A',
        hatGold: '#FFD700',
        seagullEye: '#111111',
        // Environment
        wood: '#8B6914',
        woodLight: '#A0822A',
        woodDark: '#6B5210',
        ocean: '#1E90FF',
        oceanDark: '#1565C0',
        oceanLight: '#64B5F6',
        sky: '#87CEEB',
        skyTop: '#5DADE2',
        cloud: '#FFFFFF',
        cloudShadow: '#E0E0E0',
        railing: '#CCCCCC',
        railingDark: '#999999',
    },

    // ==========================================
    // JENNIFER — Player Character (32x32)
    // ==========================================
    generateJennifer() {
        const c = this.colors;
        const _ = '.'; // transparent

        // Idle frame — Latina woman with long dark hair, cute sunglasses, pink dress, gold shoes
        const idle1 = [
            [_,_,_,_,_,_,_,_,_,_,_,_,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.hair,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.hair,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.skin,c.sunglasses,c.sunglassesLens,c.sunglassesShine,c.sunglasses,c.sunglasses,c.sunglasses,c.sunglassesLens,c.sunglassesShine,c.sunglasses,c.hair,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.skin,c.sunglasses,c.sunglassesLens,c.sunglassesLens,c.sunglasses,c.skin,c.sunglasses,c.sunglassesLens,c.sunglassesLens,c.sunglasses,c.skin,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.skin,c.skin,c.skin,c.skin,c.skin,c.skinDark,c.skin,c.skin,c.skin,c.skin,c.skin,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,c.hair,c.skin,c.skin,c.skin,c.skin,c.skinLight,c.skinLight,c.skinLight,c.skin,c.skin,c.skin,c.skin,c.hair,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,_,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,_,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,_,_,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,_,_,_,c.skin,c.skin,c.skin,c.skin,c.skin,_,_,_,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,_,_,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,_,_,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,_,c.dressTop,c.dressTop,c.dressTop,c.dressAccent,c.dressAccent,c.dressAccent,c.dressTop,c.dressTop,c.dressTop,_,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,c.skin,c.dressTop,c.dressTop,c.dressTop,c.dressAccent,c.dressAccent,c.dressAccent,c.dressTop,c.dressTop,c.dressTop,c.skin,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,c.skin,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.skin,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.hair,_,c.skin,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.skin,_,c.hair,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressAccent,c.dressBottom,c.dressBottom,c.dressBottom,c.dressAccent,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,c.dressBottom,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,_,_,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_],
        ];

        // Run frame 1 — legs apart
        const run1 = JSON.parse(JSON.stringify(idle1));
        // Move left leg forward, right leg back
        run1[23] = [_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_];
        run1[24] = [_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_];
        run1[25] = [_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_];
        run1[26] = [_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_];
        run1[27] = [_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,_,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_];

        // Run frame 2 — legs together
        const run2 = JSON.parse(JSON.stringify(idle1));

        // Run frame 3 — legs opposite
        const run3 = JSON.parse(JSON.stringify(idle1));
        run3[23] = [_,_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_,_];
        run3[24] = [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_];
        run3[25] = [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_];
        run3[26] = [_,_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,_,_,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_,_];
        run3[27] = [_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,c.shoes,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_];

        // Jump frame — arms up, legs tucked
        const jump = JSON.parse(JSON.stringify(idle1));
        // Arms raised
        jump[12] = [_,_,_,_,_,_,_,_,c.hair,_,c.skin,c.skin,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.dressTop,c.skin,c.skin,_,c.hair,_,_,_,_,_,_,_,_,_];
        jump[13] = [_,_,_,_,_,_,_,_,c.hair,c.skin,c.skin,c.dressTop,c.dressTop,c.dressTop,c.dressAccent,c.dressAccent,c.dressAccent,c.dressTop,c.dressTop,c.dressTop,c.skin,c.skin,c.hair,_,_,_,_,_,_,_,_,_];
        // Legs tucked up
        jump[23] = [_,_,_,_,_,_,_,_,_,_,_,_,c.skin,c.skin,c.skin,_,_,c.skin,c.skin,c.skin,_,_,_,_,_,_,_,_,_,_,_,_];
        jump[24] = [_,_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.skin,_,_,c.skin,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_,_];
        jump[25] = [_,_,_,_,_,_,_,_,_,_,_,_,c.shoes,c.shoes,c.shoes,_,_,c.shoes,c.shoes,c.shoes,_,_,_,_,_,_,_,_,_,_,_,_];
        jump[26] = [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_];
        jump[27] = [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_];

        return { idle: idle1, run: [run1, run2, run3, run2], jump: jump };
    },

    // ==========================================
    // HONEY — Pomeranian Companion (24x24)
    // ==========================================
    generateHoney() {
        const c = this.colors;
        const _ = '.';
        const f = c.pomFur;      // orange fur
        const l = c.pomFurLight; // light fur
        const d = c.pomFurDark;  // dark fur (paws)
        const n = c.pomNose;     // black nose
        const e = c.pomEye;      // dark eye
        const w = c.white;       // eye whites
        const t = c.pomTongue;   // pink tongue

        // Redesigned: clearly a cute small Pomeranian with pointy ears, round fluffy body, snout, tail
        const idle1 = [
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,f,f,_,_,_,_,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,f,l,f,_,_,f,l,f,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,f,l,l,f,f,l,l,f,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,f,l,l,l,l,l,l,l,l,f,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,f,l,w,e,l,l,w,e,l,f,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,f,l,l,l,l,l,l,l,l,f,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,f,l,l,n,l,l,l,f,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,f,l,l,t,l,f,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,f,f,l,l,l,l,f,f,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,f,l,l,l,l,l,l,l,l,l,f,_,_,_,_,_,_,_,_,_,_,_],
            [_,f,l,l,l,l,l,l,l,l,l,l,l,f,_,_,_,_,_,_,_,_,_,_],
            [_,f,l,l,l,l,l,l,l,l,l,l,l,f,_,_,_,_,_,_,_,_,_,_],
            [_,f,f,l,l,l,l,l,l,l,l,l,f,f,f,f,_,_,_,_,_,_,_,_],
            [_,_,f,f,l,l,l,l,l,l,l,f,f,_,f,l,f,_,_,_,_,_,_,_],
            [_,_,_,f,f,l,l,l,l,l,f,f,_,_,f,l,f,_,_,_,_,_,_,_],
            [_,_,_,_,d,d,_,_,_,d,d,_,_,_,_,f,_,_,_,_,_,_,_,_],
            [_,_,_,_,d,d,_,_,_,d,d,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,d,d,d,d,_,d,d,d,d,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        ];

        // Run frame — legs spread apart, tail wagging up
        const run1 = JSON.parse(JSON.stringify(idle1));
        run1[13] = [_,f,f,l,l,l,l,l,l,l,l,l,f,f,_,f,f,_,_,_,_,_,_,_];
        run1[14] = [_,_,f,f,l,l,l,l,l,l,l,f,f,_,f,l,f,_,_,_,_,_,_,_];
        run1[15] = [_,_,_,f,f,l,l,l,l,l,f,f,_,f,l,f,_,_,_,_,_,_,_,_];
        run1[16] = [_,_,_,d,d,_,_,_,_,_,d,d,_,_,f,_,_,_,_,_,_,_,_,_];
        run1[17] = [_,_,d,d,_,_,_,_,_,_,_,d,d,_,_,_,_,_,_,_,_,_,_,_];
        run1[18] = [_,_,d,d,_,_,_,_,_,_,_,d,d,_,_,_,_,_,_,_,_,_,_,_];

        return { idle: idle1, run: [idle1, run1] };
    },

    // ==========================================
    // MARGARITA — Glamping collectible (16x16). Raccoons want the tequila!
    // ==========================================
    generateMartini() {
        const _ = '.';
        const o = '#CFE8F5';   // glass edge
        const g = '#AEDD6B';   // margarita
        const h = '#CDEB90';   // liquid highlight
        const r = '#FFFFFF';   // salt rim
        const s = '#DCEEF7';   // stem/base glass
        const l = '#3FA535';   // lime wedge

        return [
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,r,r,r,r,r,r,r,r,r,r,_,_,_,_],
            [_,_,o,g,g,g,g,g,g,g,g,o,l,l,_,_],
            [_,_,_,o,g,g,h,g,g,g,o,_,l,l,_,_],
            [_,_,_,_,o,g,g,g,g,o,_,_,_,_,_,_],
            [_,_,_,_,_,o,g,g,o,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,o,o,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,s,s,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,s,s,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,s,s,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,s,s,s,s,_,_,_,_,_,_,_],
            [_,_,_,_,s,s,s,s,s,s,_,_,_,_,_,_],
            [_,_,_,s,s,s,s,s,s,s,s,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        ];
    },

    // ==========================================
    // CAPTAIN SEAGULL — Boss (48x48)
    // ==========================================
    generateSeagull() {
        const c = this.colors;
        const _ = '.';

        const body = [
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,_,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.hatBlue,c.hatBlue,c.hatGold,c.hatGold,c.hatBlue,c.hatBlue,c.hatBlue,c.hatGold,c.hatGold,c.hatBlue,c.hatBlue,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,c.hatBlue,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.white,c.white,c.seagullEye,c.feather,c.feather,c.feather,c.white,c.white,c.seagullEye,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.white,c.white,c.seagullEye,c.feather,c.feather,c.feather,c.white,c.white,c.seagullEye,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.beak,c.beak,c.beak,c.beakDark,c.beakDark,c.beak,c.beak,c.beak,c.beak,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,c.beak,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,c.featherGray,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,c.featherGray,c.featherGray,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,c.featherGray,c.featherGray,c.featherGray,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,c.featherGray,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,c.featherGray,c.featherGray,c.featherGray,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,c.featherGray,c.featherGray,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [c.featherGray,c.featherGray,c.featherGray,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,c.featherGray,c.featherGray,_,c.featherGray,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,c.featherGray,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,c.featherGray,_,_,_,_,c.featherGray,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,_,_,_,_,_,_,_,c.featherGray,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,c.featherGray,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,c.feather,c.feather,c.feather,c.feather,c.feather,c.feather,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,c.beak,c.beak,c.beak,c.beak,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_,_,c.beak,_,_,c.beak,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
        ];

        return { body: body };
    },

    // ==========================================
    // FISH BONE — Boss projectile (12x8)
    // ==========================================
    generateFishBone() {
        const _ = '.';
        const w = '#FFFFFF';
        const g = '#DDDDDD';
        return [
            [_,_,_,_,_,w,w,_,_,_,_,_],
            [_,_,w,_,w,w,w,w,_,w,_,_],
            [_,w,_,w,_,g,g,_,w,_,w,_],
            [w,w,w,w,w,w,w,w,w,w,w,w],
            [_,w,_,w,_,g,g,_,w,_,w,_],
            [_,_,w,_,w,w,w,w,_,w,_,_],
            [_,_,_,_,_,w,w,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_,_,_],
        ];
    },

    // ==========================================
    // STORM BOSS — Giant angry thundercloud (canvas drawn, 96x96) — key 'chocolate_boss'
    // ==========================================
    generateChocolateBoss() {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 96;
        const ctx = canvas.getContext('2d');

        // Big billowing storm cloud — stack of dark puffs
        const puffs = [
            [30, 40, 22], [58, 40, 22], [44, 32, 24],
            [18, 50, 16], [72, 50, 16], [48, 52, 26],
        ];
        ctx.fillStyle = '#4A5568';
        puffs.forEach(([x, y, r]) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); });
        // Lighter top highlight
        ctx.fillStyle = '#647089';
        [[36, 28, 14], [56, 28, 14], [46, 24, 12]].forEach(([x, y, r]) => {
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        });
        // Dark underbelly
        ctx.fillStyle = '#39414F';
        ctx.beginPath();
        ctx.ellipse(48, 62, 40, 14, 0, 0, Math.PI);
        ctx.fill();

        // Angry glowing eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.ellipse(36, 42, 9, 8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(60, 42, 9, 8, 0, 0, Math.PI * 2); ctx.fill();
        // Angry brows
        ctx.fillStyle = '#2b3340';
        ctx.save(); ctx.translate(36, 34); ctx.rotate(0.3); ctx.fillRect(-11, -2, 15, 5); ctx.restore();
        ctx.save(); ctx.translate(60, 34); ctx.rotate(-0.3); ctx.fillRect(-4, -2, 15, 5); ctx.restore();
        // Electric-blue pupils
        ctx.fillStyle = '#4FC3F7';
        ctx.beginPath(); ctx.arc(37, 43, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(59, 43, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath(); ctx.arc(38, 43, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(60, 43, 2, 0, Math.PI * 2); ctx.fill();

        // Grumbling mouth
        ctx.strokeStyle = '#2b3340';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(38, 58); ctx.quadraticCurveTo(48, 52, 58, 58);
        ctx.stroke();

        // Lightning bolts crackling below
        ctx.fillStyle = '#FFE44D';
        const bolt = (ox) => {
            ctx.beginPath();
            ctx.moveTo(ox, 66); ctx.lineTo(ox - 6, 80); ctx.lineTo(ox - 1, 80);
            ctx.lineTo(ox - 6, 94); ctx.lineTo(ox + 8, 76); ctx.lineTo(ox + 2, 76);
            ctx.lineTo(ox + 7, 66); ctx.closePath(); ctx.fill();
        };
        bolt(30); bolt(66);

        return canvas;
    },

    // ==========================================
    // RACCOON — Campsite critter enemy (canvas drawn, 32x48) — key 'creepy_man'
    // ==========================================
    generateCreepyMan() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 48;
        const ctx = canvas.getContext('2d');

        const fur = '#8A8F98';
        const furDark = '#5D636C';
        const cream = '#D8DBE0';

        // Bushy ringed tail (behind body, left side)
        ctx.fillStyle = furDark;
        ctx.beginPath(); ctx.ellipse(4, 30, 5, 8, -0.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = fur;
        ctx.fillRect(2, 24, 4, 2);
        ctx.fillStyle = furDark;
        ctx.fillRect(2, 28, 4, 2);
        ctx.fillStyle = fur;
        ctx.fillRect(2, 32, 4, 2);

        // Body (round gray raccoon)
        ctx.fillStyle = fur;
        ctx.beginPath();
        ctx.ellipse(16, 30, 11, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        // Cream belly
        ctx.fillStyle = cream;
        ctx.beginPath();
        ctx.ellipse(16, 32, 6, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = fur;
        ctx.beginPath();
        ctx.arc(16, 12, 9, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = fur;
        ctx.beginPath(); ctx.moveTo(8, 6); ctx.lineTo(6, 0); ctx.lineTo(13, 5); ctx.fill();
        ctx.beginPath(); ctx.moveTo(24, 6); ctx.lineTo(26, 0); ctx.lineTo(19, 5); ctx.fill();
        ctx.fillStyle = furDark;
        ctx.beginPath(); ctx.moveTo(9, 5); ctx.lineTo(8, 2); ctx.lineTo(12, 5); ctx.fill();
        ctx.beginPath(); ctx.moveTo(23, 5); ctx.lineTo(24, 2); ctx.lineTo(20, 5); ctx.fill();

        // Cream face + snout
        ctx.fillStyle = cream;
        ctx.beginPath(); ctx.arc(16, 15, 6, 0, Math.PI * 2); ctx.fill();

        // Signature black bandit mask
        ctx.fillStyle = '#2b2b2b';
        ctx.beginPath();
        ctx.moveTo(8, 11); ctx.lineTo(24, 11); ctx.lineTo(22, 16);
        ctx.lineTo(18, 13); ctx.lineTo(14, 13); ctx.lineTo(10, 16); ctx.closePath();
        ctx.fill();

        // Eyes (bright, mischievous)
        ctx.fillStyle = '#FFE44D';
        ctx.beginPath(); ctx.arc(12, 13, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(20, 13, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath(); ctx.arc(12, 13, 1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(20, 13, 1, 0, Math.PI * 2); ctx.fill();

        // Nose + snout line
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath(); ctx.arc(16, 17, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7a7f88';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(16, 18); ctx.lineTo(16, 20); ctx.stroke();

        // Little grabby paws reaching for food
        ctx.fillStyle = furDark;
        ctx.beginPath(); ctx.arc(6, 26, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(26, 26, 2.5, 0, Math.PI * 2); ctx.fill();

        // Feet
        ctx.fillStyle = furDark;
        ctx.fillRect(10, 40, 5, 4);
        ctx.fillRect(17, 40, 5, 4);

        return canvas;
    },

    // ==========================================
    // BOUNCE PAD — Spring platform (canvas drawn, 64x16)
    // ==========================================
    generateBouncePad() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');

        // Spring coils (zigzag)
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        for (let x = 4; x < 60; x += 8) {
            ctx.beginPath();
            ctx.moveTo(x, 14);
            ctx.lineTo(x + 4, 4);
            ctx.lineTo(x + 8, 14);
            ctx.stroke();
        }

        // Top pad
        ctx.fillStyle = '#FF69B4';
        ctx.fillRect(2, 0, 60, 5);
        ctx.fillStyle = '#FF1493';
        ctx.fillRect(2, 0, 60, 2);

        // Arrow indicator
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(28, 4);
        ctx.lineTo(32, 0);
        ctx.lineTo(36, 4);
        ctx.fill();

        return canvas;
    },

    // ==========================================
    // MAGGIE BLASTER — German Shepherd in guardian form (canvas drawn, 40x24) — key 'honey_gun'
    // ==========================================
    generateHoneyGun() {
        const tan = '#C88A3C';
        const tanLight = '#E0B87A';
        const blk = '#1c1c1c';
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 24;
        const ctx = canvas.getContext('2d');

        // Body (black saddle over tan)
        ctx.fillStyle = tan;
        ctx.beginPath();
        ctx.ellipse(18, 13, 12, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = blk;
        ctx.beginPath();
        ctx.ellipse(16, 10, 9, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head (front)
        ctx.fillStyle = tan;
        ctx.beginPath();
        ctx.arc(30, 11, 8, 0, Math.PI * 2);
        ctx.fill();
        // Lighter muzzle/cheeks
        ctx.fillStyle = tanLight;
        ctx.beginPath();
        ctx.arc(32, 13, 5, 0, Math.PI * 2);
        ctx.fill();

        // Big pointy black-tipped ears
        ctx.fillStyle = tan;
        ctx.beginPath(); ctx.moveTo(25, 5); ctx.lineTo(23, -2); ctx.lineTo(29, 3); ctx.fill();
        ctx.beginPath(); ctx.moveTo(34, 5); ctx.lineTo(37, -2); ctx.lineTo(31, 3); ctx.fill();
        ctx.fillStyle = blk;
        ctx.beginPath(); ctx.moveTo(24.5, 2); ctx.lineTo(23.5, -1); ctx.lineTo(27, 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(35, 2); ctx.lineTo(36, -1); ctx.lineTo(32.5, 2); ctx.fill();

        // Determined eyes
        ctx.fillStyle = '#221100';
        ctx.beginPath(); ctx.arc(28, 9, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(33, 9, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(28.5, 8.5, 0.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(33.5, 8.5, 0.5, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#8a5a24';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(26, 7); ctx.lineTo(29, 7.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(36, 7); ctx.lineTo(32, 7.5); ctx.stroke();

        // Black nose
        ctx.fillStyle = blk;
        ctx.beginPath(); ctx.arc(31, 13, 2, 0, Math.PI * 2); ctx.fill();

        // "Blast" muzzle (bark energy comes out here)
        ctx.fillStyle = '#8fd0e0';
        ctx.beginPath(); ctx.arc(39, 13, 2.5, 0, Math.PI * 2); ctx.fill();

        // Grip (curled tail)
        ctx.fillStyle = blk;
        ctx.beginPath();
        ctx.moveTo(10, 14); ctx.lineTo(8, 22); ctx.lineTo(14, 22); ctx.lineTo(12, 14);
        ctx.fill();
        ctx.fillStyle = tan;
        ctx.beginPath();
        ctx.arc(11, 14, 4, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    },

    // ==========================================
    // BARK BULLET — Honey gun projectile (canvas drawn, 16x16)
    // ================================================================
    generateBarkBullet() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');

        // Bark sound-wave blast (blue energy)
        ctx.fillStyle = '#4FC3F7';
        ctx.beginPath();
        ctx.arc(8, 8, 6, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = '#E1F5FE';
        ctx.beginPath();
        ctx.arc(8, 8, 3, 0, Math.PI * 2);
        ctx.fill();

        // Trailing wave arcs
        ctx.strokeStyle = '#81D4FA';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(4, 8, 5, -0.9, 0.9); ctx.stroke();
        ctx.beginPath(); ctx.arc(2, 8, 7, -0.7, 0.7); ctx.stroke();

        return canvas;
    },

    // ==========================================
    // HAILSTONE — Storm boss projectile (canvas drawn, 20x20) — key 'choco_ball'
    // ==========================================
    generateChocolateBall() {
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        canvas.height = 20;
        const ctx = canvas.getContext('2d');

        // Icy hailstone
        ctx.fillStyle = '#9FD3E8';
        ctx.beginPath();
        ctx.arc(10, 10, 8, 0, Math.PI * 2);
        ctx.fill();

        // Cooler shaded lower half
        ctx.fillStyle = '#6FB0CC';
        ctx.beginPath();
        ctx.arc(10, 12, 6, 0, Math.PI * 2);
        ctx.fill();

        // Bright shine
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(7, 6, 2.5, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    },

    // ==========================================
    // TESLA & OBSTACLES
    // ==========================================
    // Class A MOTORHOME (Brenda's RV) — reuses texture key 'tesla', faces right
    generateTesla() {
        const canvas = document.createElement('canvas');
        canvas.width = 96;
        canvas.height = 48;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(48, 45, 44, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Main body — big boxy motorhome, cream/white
        ctx.fillStyle = '#F3EFE4';
        ctx.beginPath();
        ctx.moveTo(4, 12);
        ctx.lineTo(70, 12);
        ctx.quadraticCurveTo(80, 12, 84, 18); // sloped cab nose (front-right)
        ctx.lineTo(92, 26);
        ctx.lineTo(92, 38);
        ctx.lineTo(4, 38);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#CFC7B4';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Roof line + AC unit
        ctx.fillStyle = '#E4DDCB';
        ctx.fillRect(4, 12, 66, 3);
        ctx.fillStyle = '#D8D2C0';
        ctx.fillRect(30, 8, 16, 4);

        // Teal + orange swoosh stripe (matches Brenda's palette)
        ctx.fillStyle = '#2E8B7F';
        ctx.beginPath();
        ctx.moveTo(4, 30); ctx.lineTo(70, 26); ctx.lineTo(90, 30);
        ctx.lineTo(90, 34); ctx.lineTo(4, 34); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#F4A259';
        ctx.beginPath();
        ctx.moveTo(4, 34); ctx.lineTo(90, 34); ctx.lineTo(90, 36); ctx.lineTo(4, 36); ctx.closePath(); ctx.fill();

        // Living-area side windows (tinted)
        ctx.fillStyle = '#8FC7D6';
        ctx.fillRect(10, 17, 14, 9);
        ctx.fillRect(28, 17, 14, 9);
        ctx.fillRect(46, 17, 12, 9);
        // Window frames
        ctx.strokeStyle = '#CFC7B4';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(10, 17, 14, 9);
        ctx.strokeRect(28, 17, 14, 9);
        ctx.strokeRect(46, 17, 12, 9);

        // Cab windshield (front-right)
        ctx.fillStyle = '#B6DCE6';
        ctx.beginPath();
        ctx.moveTo(70, 15); ctx.lineTo(80, 15);
        ctx.quadraticCurveTo(86, 19, 88, 26);
        ctx.lineTo(70, 26); ctx.closePath(); ctx.fill();

        // Entry door
        ctx.fillStyle = '#DDD6C4';
        ctx.fillRect(60, 22, 8, 14);
        ctx.strokeStyle = '#B8B09C';
        ctx.strokeRect(60, 22, 8, 14);
        ctx.fillStyle = '#8FC7D6';
        ctx.fillRect(62, 24, 4, 4);

        // Wheels (dual-ish)
        ctx.fillStyle = '#222222';
        ctx.beginPath(); ctx.arc(22, 39, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(76, 39, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#8a8a8a';
        ctx.beginPath(); ctx.arc(22, 39, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(76, 39, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath(); ctx.arc(22, 39, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(76, 39, 1.5, 0, Math.PI * 2); ctx.fill();

        // Headlight (front-right) + taillight (rear-left)
        ctx.fillStyle = '#FFEE88';
        ctx.fillRect(89, 30, 3, 4);
        ctx.fillStyle = '#FF3B3B';
        ctx.fillRect(4, 30, 3, 4);

        return canvas;
    },

    generateTrafficCone() {
        const canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // Cone body
        ctx.fillStyle = '#FF6600';
        ctx.beginPath();
        ctx.moveTo(12, 2);
        ctx.lineTo(20, 26);
        ctx.lineTo(4, 26);
        ctx.closePath();
        ctx.fill();

        // White stripes
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(8, 14); ctx.lineTo(16, 14);
        ctx.lineTo(15, 11); ctx.lineTo(9, 11);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(6, 22); ctx.lineTo(18, 22);
        ctx.lineTo(17, 19); ctx.lineTo(7, 19);
        ctx.closePath();
        ctx.fill();

        // Base
        ctx.fillStyle = '#FF5500';
        ctx.fillRect(2, 26, 20, 4);

        return canvas;
    },

    generateObstacleCar() {
        const canvas = document.createElement('canvas');
        canvas.width = 80;
        canvas.height = 44;
        const ctx = canvas.getContext('2d');

        // Red sedan facing left (oncoming)
        ctx.fillStyle = '#DD3333';
        ctx.beginPath();
        ctx.moveTo(72, 30);
        ctx.lineTo(74, 16);
        ctx.quadraticCurveTo(68, 8, 55, 6);
        ctx.lineTo(30, 6);
        ctx.quadraticCurveTo(18, 8, 12, 16);
        ctx.lineTo(6, 28);
        ctx.lineTo(6, 34);
        ctx.lineTo(76, 34);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#446688';
        ctx.fillRect(35, 8, 16, 10);
        ctx.fillRect(18, 10, 14, 8);

        // Wheels
        ctx.fillStyle = '#222222';
        ctx.beginPath(); ctx.arc(22, 36, 7, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(60, 36, 7, 0, Math.PI * 2); ctx.fill();
        // Rims
        ctx.fillStyle = '#777777';
        ctx.beginPath(); ctx.arc(22, 36, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(60, 36, 3, 0, Math.PI * 2); ctx.fill();

        // Headlight
        ctx.fillStyle = '#FFEE88';
        ctx.fillRect(5, 22, 3, 4);
        // Taillight
        ctx.fillStyle = '#FF3333';
        ctx.fillRect(74, 22, 3, 4);

        return canvas;
    },

    // ==========================================
    // SHOO SCENE SPRITES
    // ==========================================
    generateBoyfriend() {
        // Tall jacked white guy, green eyes, brown hair — canvas drawn
        const canvas = document.createElement('canvas');
        canvas.width = 48;
        canvas.height = 72;
        const ctx = canvas.getContext('2d');

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.beginPath(); ctx.ellipse(24, 70, 14, 3, 0, 0, Math.PI * 2); ctx.fill();

        // Legs (jeans)
        ctx.fillStyle = '#3D5A80';
        ctx.fillRect(14, 50, 8, 18);
        ctx.fillRect(26, 50, 8, 18);
        // Shoes
        ctx.fillStyle = '#333333';
        ctx.fillRect(12, 66, 11, 4);
        ctx.fillRect(25, 66, 11, 4);

        // Torso (tight white t-shirt showing muscles)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.moveTo(10, 30);
        ctx.lineTo(10, 50);
        ctx.lineTo(38, 50);
        ctx.lineTo(38, 30);
        ctx.quadraticCurveTo(36, 26, 24, 26);
        ctx.quadraticCurveTo(12, 26, 10, 30);
        ctx.closePath();
        ctx.fill();

        // Pec definition
        ctx.strokeStyle = '#E0E0E0';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.arc(19, 35, 5, 0.3, 2.8); ctx.stroke();
        ctx.beginPath(); ctx.arc(29, 35, 5, 0.3, 2.8); ctx.stroke();
        // Ab line
        ctx.beginPath(); ctx.moveTo(24, 38); ctx.lineTo(24, 48); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, 41); ctx.lineTo(28, 41); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, 45); ctx.lineTo(28, 45); ctx.stroke();

        // Arms (big, muscular)
        ctx.fillStyle = '#FFE0C2';
        // Left arm
        ctx.fillRect(4, 28, 7, 6);
        ctx.fillRect(2, 28, 9, 5);
        ctx.fillRect(5, 33, 6, 12);
        // Right arm
        ctx.fillRect(37, 28, 7, 6);
        ctx.fillRect(37, 28, 9, 5);
        ctx.fillRect(37, 33, 6, 12);
        // Bicep highlights
        ctx.fillStyle = '#FFD1A3';
        ctx.beginPath(); ctx.arc(7, 32, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(41, 32, 4, 0, Math.PI * 2); ctx.fill();
        // Hands
        ctx.fillStyle = '#FFE0C2';
        ctx.fillRect(5, 44, 5, 4);
        ctx.fillRect(38, 44, 5, 4);

        // Neck
        ctx.fillStyle = '#FFE0C2';
        ctx.fillRect(20, 22, 8, 6);

        // Head
        ctx.fillStyle = '#FFE0C2';
        ctx.beginPath(); ctx.arc(24, 14, 10, 0, Math.PI * 2); ctx.fill();

        // Salt-and-pepper hair at the sides
        ctx.fillStyle = '#9a9a9a';
        ctx.fillRect(14, 10, 3, 7);
        ctx.fillRect(31, 10, 3, 7);
        ctx.fillStyle = '#7d7d7d';
        ctx.fillRect(14, 13, 3, 4);
        ctx.fillRect(31, 13, 3, 4);

        // Ball cap (Tony's camping cap — teal)
        ctx.fillStyle = '#2E8B7F';
        ctx.beginPath();
        ctx.arc(24, 9, 11, Math.PI, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(13, 8, 22, 3);
        // Cap brim
        ctx.fillStyle = '#256f65';
        ctx.fillRect(30, 9, 12, 3);
        // Gray sideburns peeking under cap
        ctx.fillStyle = '#8a8a8a';
        ctx.fillRect(14, 11, 2, 5);
        ctx.fillRect(32, 11, 2, 5);

        // Green eyes
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(18, 12, 5, 4);
        ctx.fillRect(26, 12, 5, 4);
        ctx.fillStyle = '#22AA44';
        ctx.fillRect(20, 13, 3, 3);
        ctx.fillRect(27, 13, 3, 3);
        ctx.fillStyle = '#115522';
        ctx.fillRect(21, 13, 1.5, 2);
        ctx.fillRect(28, 13, 1.5, 2);

        // Smile
        ctx.strokeStyle = '#CC8866';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(24, 18, 4, 0.2, Math.PI - 0.2); ctx.stroke();

        // Jaw definition
        ctx.strokeStyle = '#E8C9A8';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(15, 18); ctx.lineTo(18, 22); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(33, 18); ctx.lineTo(30, 22); ctx.stroke();

        return canvas;
    },

    // Small raccoon sneaking toward the campsite food — key 'approach_girl'
    generateApproachGirl() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 52;
        const ctx = canvas.getContext('2d');

        const fur = '#8A8F98';
        const furDark = '#5D636C';
        const cream = '#D8DBE0';

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.beginPath(); ctx.ellipse(16, 50, 10, 2, 0, 0, Math.PI * 2); ctx.fill();

        // Ringed tail
        ctx.fillStyle = furDark;
        ctx.beginPath(); ctx.ellipse(26, 40, 4, 8, 0.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = fur; ctx.fillRect(24, 36, 5, 2);
        ctx.fillStyle = furDark; ctx.fillRect(24, 40, 5, 2);

        // Feet
        ctx.fillStyle = furDark;
        ctx.fillRect(10, 44, 5, 5);
        ctx.fillRect(17, 44, 5, 5);

        // Body
        ctx.fillStyle = fur;
        ctx.beginPath(); ctx.ellipse(16, 34, 10, 12, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = cream;
        ctx.beginPath(); ctx.ellipse(16, 36, 5, 8, 0, 0, Math.PI * 2); ctx.fill();

        // Grabby paws reaching up
        ctx.fillStyle = furDark;
        ctx.beginPath(); ctx.arc(8, 26, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(24, 26, 2.5, 0, Math.PI * 2); ctx.fill();

        // Head
        ctx.fillStyle = fur;
        ctx.beginPath(); ctx.arc(16, 14, 9, 0, Math.PI * 2); ctx.fill();
        // Ears
        ctx.beginPath(); ctx.moveTo(9, 8); ctx.lineTo(7, 2); ctx.lineTo(14, 7); ctx.fill();
        ctx.beginPath(); ctx.moveTo(23, 8); ctx.lineTo(25, 2); ctx.lineTo(18, 7); ctx.fill();
        // Cream muzzle
        ctx.fillStyle = cream;
        ctx.beginPath(); ctx.arc(16, 17, 5, 0, Math.PI * 2); ctx.fill();
        // Bandit mask
        ctx.fillStyle = '#2b2b2b';
        ctx.beginPath();
        ctx.moveTo(8, 13); ctx.lineTo(24, 13); ctx.lineTo(22, 18);
        ctx.lineTo(18, 15); ctx.lineTo(14, 15); ctx.lineTo(10, 18); ctx.closePath(); ctx.fill();
        // Eyes
        ctx.fillStyle = '#FFE44D';
        ctx.beginPath(); ctx.arc(12, 15, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(20, 15, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.arc(12, 15, 1, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(20, 15, 1, 0, Math.PI * 2); ctx.fill();
        // Nose
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath(); ctx.arc(16, 19, 1.5, 0, Math.PI * 2); ctx.fill();

        // Little tequila bottle they're eyeing (above head)
        ctx.fillStyle = '#C9A24B';       // amber tequila
        ctx.fillRect(14, 2, 5, 6);       // body
        ctx.fillStyle = '#7A5A2A';       // neck + cap
        ctx.fillRect(15, 0, 3, 2);
        ctx.fillStyle = '#F2E3B0';       // label
        ctx.fillRect(14, 4, 5, 2);

        return canvas;
    },

    // ==========================================
    // CAPTAIN (muster station scene)
    // ==========================================
    generateCaptain() {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Legs — dark green ranger pants
        ctx.fillStyle = '#2f3d24';
        ctx.fillRect(12, 48, 7, 16);
        ctx.fillRect(22, 48, 7, 16);

        // Shoes — brown boots
        ctx.fillStyle = '#3a2412';
        ctx.fillRect(11, 60, 9, 4);
        ctx.fillRect(21, 60, 9, 4);

        // Body — tan ranger shirt
        ctx.fillStyle = '#C7B37E';
        ctx.fillRect(10, 22, 21, 28);

        // Uniform details — buttons
        ctx.fillStyle = '#6b5a2e';
        ctx.fillRect(19, 26, 3, 2);
        ctx.fillRect(19, 31, 3, 2);
        ctx.fillRect(19, 36, 3, 2);

        // Ranger badge (gold star)
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(13, 27, 4, 4);

        // Epaulettes — green shoulder boards
        ctx.fillStyle = '#3a4a2a';
        ctx.fillRect(8, 22, 5, 3);
        ctx.fillRect(28, 22, 5, 3);

        // Arms — tan sleeves
        ctx.fillStyle = '#C7B37E';
        ctx.fillRect(5, 24, 6, 18);
        ctx.fillRect(30, 24, 6, 18);

        // Hands — skin
        ctx.fillStyle = '#FFDCB5';
        ctx.fillRect(5, 40, 6, 4);
        ctx.fillRect(30, 40, 6, 4);

        // Neck
        ctx.fillStyle = '#FFDCB5';
        ctx.fillRect(16, 18, 9, 5);

        // Head — skin tone
        ctx.fillStyle = '#FFDCB5';
        ctx.fillRect(12, 4, 17, 16);

        // Ranger campaign hat — brown felt with wide brim
        ctx.fillStyle = '#6b4a26';
        ctx.fillRect(13, 1, 15, 6);      // crown
        ctx.fillStyle = '#5a3d1f';
        ctx.fillRect(15, 0, 11, 2);      // pinched top
        ctx.fillStyle = '#7a5730';
        ctx.fillRect(6, 6, 29, 3);       // wide brim
        // Hat band
        ctx.fillStyle = '#4a3218';
        ctx.fillRect(13, 5, 15, 1);

        // Eyes
        ctx.fillStyle = '#222222';
        ctx.fillRect(15, 10, 3, 3);
        ctx.fillRect(23, 10, 3, 3);
        // Eyebrows — stern
        ctx.fillStyle = '#444444';
        ctx.fillRect(14, 8, 5, 1);
        ctx.fillRect(22, 8, 5, 1);

        // Gray mustache
        ctx.fillStyle = '#888888';
        ctx.fillRect(15, 15, 11, 2);

        // Mouth
        ctx.fillStyle = '#CC4444';
        ctx.fillRect(17, 17, 7, 1);

        // Megaphone in right hand
        ctx.fillStyle = '#FF6600';
        ctx.fillRect(34, 34, 4, 3);
        ctx.fillRect(36, 32, 4, 7);
        ctx.fillStyle = '#FF8833';
        ctx.fillRect(38, 30, 2, 11);

        return canvas;
    },

    // ==========================================
    // PLATFORM TILES
    // ==========================================
    generateDeckTile() {
        const c = this.colors;
        const _ = '.';
        // 16x16 wooden deck tile
        const tile = [];
        for (let y = 0; y < 16; y++) {
            const row = [];
            for (let x = 0; x < 16; x++) {
                if (y === 0) row.push(c.woodLight);
                else if (y === 15) row.push(c.woodDark);
                else if (x % 8 === 0 && y > 1 && y < 14) row.push(c.woodDark);
                else row.push((x + y) % 7 === 0 ? c.woodLight : c.wood);
            }
            tile.push(row);
        }
        return tile;
    },

    generatePoolFloat() {
        const _ = '.';
        const pink = '#FF69B4';
        const pinkD = '#FF1493';
        const white = '#FFFFFF';
        // 32x12 pool float
        const f = [];
        for (let y = 0; y < 12; y++) {
            const row = [];
            for (let x = 0; x < 32; x++) {
                if (y < 2 || y > 9) {
                    if (x > 3 && x < 28) row.push(pink);
                    else row.push(_);
                } else if (y === 2 || y === 9) {
                    if (x > 1 && x < 30) row.push(pinkD);
                    else row.push(_);
                } else {
                    if (x > 0 && x < 31) {
                        if ((x + y) % 6 < 3) row.push(pink);
                        else row.push(white);
                    } else row.push(_);
                }
            }
            f.push(row);
        }
        return f;
    },

    // ==========================================
    // SPARKLE — Collection effect (8x8)
    // ==========================================
    generateSparkle() {
        const _ = '.';
        const y = '#FFD700'; // gold
        const w = '#FFFFFF';
        return [
            [_,_,_,w,w,_,_,_],
            [_,_,w,y,y,w,_,_],
            [_,w,y,y,y,y,w,_],
            [w,y,y,y,y,y,y,w],
            [w,y,y,y,y,y,y,w],
            [_,w,y,y,y,y,w,_],
            [_,_,w,y,y,w,_,_],
            [_,_,_,w,w,_,_,_],
        ];
    },

    // ==========================================
    // REGISTER ALL TEXTURES WITH PHASER
    // ==========================================
    registerAll(scene) {
        const scale = 2;

        // Jennifer spritesheet (4 run frames + 1 idle + 1 jump = 6 frames)
        const jen = this.generateJennifer();
        const jenFrames = [jen.idle, ...jen.run, jen.jump]; // 6 frames: 0=idle, 1-4=run, 5=jump
        const jenSheet = this.createSpriteSheet(32, 28, jenFrames, scale);
        scene.textures.addSpriteSheet('jennifer', jenSheet, { frameWidth: 32 * scale, frameHeight: 28 * scale });

        // Honey spritesheet (2 frames: idle + run)
        const honey = this.generateHoney();
        const honeyFrames = [honey.idle, ...honey.run];
        const honeySheet = this.createSpriteSheet(24, 20, honeyFrames, scale);
        scene.textures.addSpriteSheet('honey', honeySheet, { frameWidth: 24 * scale, frameHeight: 20 * scale });

        // Martini
        const martiniCanvas = this.createSprite(16, 16, this.generateMartini(), scale);
        scene.textures.addCanvas('martini', martiniCanvas);

        // Seagull
        const seagull = this.generateSeagull();
        const seagullCanvas = this.createSprite(48, 28, seagull.body, scale);
        scene.textures.addCanvas('seagull', seagullCanvas);

        // Fish bone
        const fishBoneCanvas = this.createSprite(12, 8, this.generateFishBone(), scale);
        scene.textures.addCanvas('fishbone', fishBoneCanvas);

        // Chocolate boss
        const chocoCanvas = this.generateChocolateBoss();
        scene.textures.addCanvas('chocolate_boss', chocoCanvas);

        // Creepy man enemy
        const creepyManCanvas = this.generateCreepyMan();
        scene.textures.addCanvas('creepy_man', creepyManCanvas);

        // Bounce pad
        const bounceCanvas = this.generateBouncePad();
        scene.textures.addCanvas('bounce_pad', bounceCanvas);

        // Bark bullet
        const barkCanvas = this.generateBarkBullet();
        scene.textures.addCanvas('bark_bullet', barkCanvas);

        // Honey gun
        const honeyGunCanvas = this.generateHoneyGun();
        scene.textures.addCanvas('honey_gun', honeyGunCanvas);

        // Chocolate ball projectile
        const chocoballCanvas = this.generateChocolateBall();
        scene.textures.addCanvas('choco_ball', chocoballCanvas);

        // Tesla Model Y
        const teslaCanvas = this.generateTesla();
        scene.textures.addCanvas('tesla', teslaCanvas);

        // Traffic cone obstacle
        const coneCanvas = this.generateTrafficCone();
        scene.textures.addCanvas('traffic_cone', coneCanvas);

        // Obstacle car
        const obsCarCanvas = this.generateObstacleCar();
        scene.textures.addCanvas('obstacle_car', obsCarCanvas);

        // Boyfriend (jacked guy)
        const bfCanvas = this.generateBoyfriend();
        scene.textures.addCanvas('boyfriend', bfCanvas);

        // Approaching girl
        const girlCanvas = this.generateApproachGirl();
        scene.textures.addCanvas('approach_girl', girlCanvas);

        // Captain
        const captainCanvas = this.generateCaptain();
        scene.textures.addCanvas('captain', captainCanvas);

        // Deck tile
        const deckCanvas = this.createSprite(16, 16, this.generateDeckTile(), scale);
        scene.textures.addCanvas('deck_tile', deckCanvas);

        // Pool float
        const floatCanvas = this.createSprite(32, 12, this.generatePoolFloat(), scale);
        scene.textures.addCanvas('pool_float', floatCanvas);

        // Sparkle
        const sparkleCanvas = this.createSprite(8, 8, this.generateSparkle(), scale);
        scene.textures.addCanvas('sparkle', sparkleCanvas);

        // Generate simple colored rectangles for backgrounds
        this.generateBackgrounds(scene);
    },

    generateBackgrounds(scene) {
        // Ocean gradient tile (for background)
        const oceanCanvas = document.createElement('canvas');
        oceanCanvas.width = 800;
        oceanCanvas.height = 450;
        const octx = oceanCanvas.getContext('2d');
        const grad = octx.createLinearGradient(0, 0, 0, 450);
        grad.addColorStop(0, '#87CEEB');
        grad.addColorStop(0.4, '#5DADE2');
        grad.addColorStop(0.6, '#2E86C1');
        grad.addColorStop(1, '#1B4F72');
        octx.fillStyle = grad;
        octx.fillRect(0, 0, 800, 450);
        scene.textures.addCanvas('bg_ocean', oceanCanvas);

        // Cloud puff
        const cloudCanvas = document.createElement('canvas');
        cloudCanvas.width = 80;
        cloudCanvas.height = 40;
        const cctx = cloudCanvas.getContext('2d');
        cctx.fillStyle = '#FFFFFF';
        cctx.beginPath();
        cctx.ellipse(40, 25, 35, 15, 0, 0, Math.PI * 2);
        cctx.fill();
        cctx.beginPath();
        cctx.ellipse(25, 18, 20, 14, 0, 0, Math.PI * 2);
        cctx.fill();
        cctx.beginPath();
        cctx.ellipse(50, 15, 22, 14, 0, 0, Math.PI * 2);
        cctx.fill();
        cctx.beginPath();
        cctx.ellipse(38, 10, 18, 12, 0, 0, Math.PI * 2);
        cctx.fill();
        scene.textures.addCanvas('cloud', cloudCanvas);

        // Sun
        const sunCanvas = document.createElement('canvas');
        sunCanvas.width = 60;
        sunCanvas.height = 60;
        const sctx = sunCanvas.getContext('2d');
        sctx.fillStyle = '#FFD700';
        sctx.beginPath();
        sctx.arc(30, 30, 25, 0, Math.PI * 2);
        sctx.fill();
        sctx.fillStyle = '#FFF8DC';
        sctx.beginPath();
        sctx.arc(30, 30, 18, 0, Math.PI * 2);
        sctx.fill();
        scene.textures.addCanvas('sun', sunCanvas);

        // Life preserver (decoration)
        const lpCanvas = document.createElement('canvas');
        lpCanvas.width = 24;
        lpCanvas.height = 24;
        const lpctx = lpCanvas.getContext('2d');
        lpctx.fillStyle = '#FF4444';
        lpctx.beginPath();
        lpctx.arc(12, 12, 10, 0, Math.PI * 2);
        lpctx.fill();
        lpctx.fillStyle = '#FFFFFF';
        lpctx.beginPath();
        lpctx.arc(12, 12, 6, 0, Math.PI * 2);
        lpctx.fill();
        lpctx.fillStyle = '#87CEEB';
        lpctx.beginPath();
        lpctx.arc(12, 12, 3, 0, Math.PI * 2);
        lpctx.fill();
        // White stripes
        lpctx.fillStyle = '#FFFFFF';
        lpctx.fillRect(10, 2, 4, 6);
        lpctx.fillRect(10, 16, 4, 6);
        lpctx.fillRect(2, 10, 6, 4);
        lpctx.fillRect(16, 10, 6, 4);
        scene.textures.addCanvas('life_preserver', lpCanvas);

        // Heart particle
        const heartCanvas = document.createElement('canvas');
        heartCanvas.width = 12;
        heartCanvas.height = 12;
        const hctx = heartCanvas.getContext('2d');
        hctx.fillStyle = '#FF69B4';
        hctx.beginPath();
        hctx.moveTo(6, 3);
        hctx.bezierCurveTo(6, 1, 2, 0, 1, 3);
        hctx.bezierCurveTo(0, 6, 6, 10, 6, 11);
        hctx.bezierCurveTo(6, 10, 12, 6, 11, 3);
        hctx.bezierCurveTo(10, 0, 6, 1, 6, 3);
        hctx.fill();
        scene.textures.addCanvas('heart', heartCanvas);

        // Confetti pieces (4 colors)
        const confettiColors = ['#FF6B8A', '#FFD700', '#4169E1', '#32CD32', '#FF69B4', '#FF8C00'];
        confettiColors.forEach((color, i) => {
            const cc = document.createElement('canvas');
            cc.width = 8;
            cc.height = 8;
            const ctx = cc.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(1, 1, 6, 6);
            scene.textures.addCanvas('confetti_' + i, cc);
        });
    }
};
