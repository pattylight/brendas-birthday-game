// MusterScene.js - Brenda calls in to 97.9 WRMF for the $1,000 birthday contest!
class MusterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MusterScene' });
    }

    create() {
        const w = 800, h = 450;
        this.events.on('shutdown', () => this.cleanup());

        this.answer = '97.9';

        // === RADIO STUDIO BACKGROUND ===
        this.add.rectangle(w / 2, h / 2, w, h, 0x14121f).setDepth(-10);
        this.add.rectangle(w / 2, h - 45, w, 90, 0x241f33).setDepth(-9); // desk area

        // Acoustic foam wall
        for (let y = 40; y < 175; y += 34) {
            for (let x = 30; x < w - 20; x += 34) {
                const alt = (Math.floor(x / 34) + Math.floor(y / 34)) % 2 === 0;
                this.add.rectangle(x, y, 28, 28, alt ? 0x2b2540 : 0x201b30, 0.7).setDepth(-8);
            }
        }

        // ON AIR sign (blinking)
        this.onAirBg = this.add.rectangle(w / 2, 40, 150, 34, 0x330000).setDepth(-2).setStrokeStyle(3, 0xFF3333);
        this.onAir = this.add.text(w / 2, 40, 'ON AIR', {
            fontSize: '22px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FF5555', stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(-1);
        this.tweens.add({ targets: [this.onAir, this.onAirBg], alpha: 0.35, duration: 700, yoyo: true, repeat: -1 });

        // Station logo
        this.add.rectangle(135, 120, 175, 74, 0x0b1e5b).setDepth(-2).setStrokeStyle(3, 0xFFD700);
        this.add.text(135, 106, '97.9', {
            fontSize: '34px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFD700', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5).setDepth(-1);
        this.add.text(135, 138, 'W R M F', {
            fontSize: '16px', fontFamily: 'Arial Black, Arial, sans-serif', color: '#FFFFFF'
        }).setOrigin(0.5).setDepth(-1);
        this.add.text(135, 158, '80s  90s  &  today', {
            fontSize: '10px', fontFamily: 'Arial Black, Arial, sans-serif', color: '#9fb0ff'
        }).setOrigin(0.5).setDepth(-1);

        // $1,000 cash poster
        this.add.rectangle(665, 118, 130, 82, 0x0d3d1a).setDepth(-2).setStrokeStyle(3, 0x33cc66);
        this.add.text(665, 104, 'WIN', {
            fontSize: '18px', fontFamily: 'Arial Black, Arial, sans-serif', color: '#B6FFCB'
        }).setOrigin(0.5).setDepth(-1);
        this.add.text(665, 130, '$1,000', {
            fontSize: '26px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#7CFC9A', stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(-1);

        // Boombox on the desk (the DJ's voice)
        this.drawRadio(w / 2, h - 95);

        // Brenda calling in on her phone
        this.jennifer = this.add.image(560, h - 95, 'jennifer').setDepth(5).setScale(2);
        this.add.rectangle(546, h - 118, 6, 15, 0x222222).setDepth(6);   // phone
        this.add.rectangle(546, h - 118, 4, 11, 0x66ccff).setDepth(6);   // screen

        this.cameras.main.fadeIn(500);
        this.time.delayedCall(700, () => this.djIntro());
    }

    drawRadio(x, y) {
        this.add.rectangle(x, y, 122, 58, 0x333333).setDepth(4).setStrokeStyle(2, 0x666666);
        this.add.circle(x - 32, y + 4, 16, 0x111111).setDepth(5).setStrokeStyle(2, 0x888888);
        this.add.circle(x + 32, y + 4, 16, 0x111111).setDepth(5).setStrokeStyle(2, 0x888888);
        this.spk1 = this.add.circle(x - 32, y + 4, 6, 0x00d0ff, 0.7).setDepth(6);
        this.spk2 = this.add.circle(x + 32, y + 4, 6, 0x00d0ff, 0.7).setDepth(6);
        this.tweens.add({ targets: [this.spk1, this.spk2], scale: 1.4, alpha: 0.4, duration: 300, yoyo: true, repeat: -1 });
        this.add.rectangle(x, y - 17, 58, 12, 0x001a10).setDepth(5);
        this.add.text(x, y - 17, '97.9 FM', { fontSize: '9px', fontFamily: 'monospace', color: '#33ff88' }).setOrigin(0.5).setDepth(6);
        this.add.rectangle(x + 50, y - 40, 3, 40, 0x888888).setDepth(4).setAngle(20);
    }

    djIntro() {
        const w = 800;
        const bubbleBg = this.add.rectangle(w / 2, 232, 540, 74, 0xFFFFFF, 0.97)
            .setDepth(50).setStrokeStyle(3, 0x000000);

        const lines = [
            "📻  You're LIVE on 97.9!",
            "Caller, you can WIN $1,000!",
            "Name the station with the best variety\nof the 80s, 90s, and today!"
        ];
        this.djTexts = [];
        lines.forEach((line, i) => {
            this.time.delayedCall(i * 1700, () => {
                this.djTexts.forEach(t => t.destroy());
                this.djTexts = [];
                const t = this.add.text(w / 2, 232, line, {
                    fontSize: '18px', fontFamily: 'Arial Black, Arial, sans-serif',
                    color: '#111111', align: 'center', wordWrap: { width: 500 }
                }).setOrigin(0.5).setDepth(51);
                this.djTexts.push(t);
                this.playJingle();
                if (i === lines.length - 1) {
                    this.time.delayedCall(2000, () => {
                        bubbleBg.destroy();
                        this.djTexts.forEach(t => t.destroy());
                        this.djTexts = [];
                        this.showInput();
                    });
                }
            });
        });
    }

    showInput() {
        const w = 800;
        this.promptText = this.add.text(w / 2, 195, 'TYPE THE STATION TO WIN $1,000!', {
            fontSize: '20px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFD700', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5).setDepth(100);
        this.tweens.add({ targets: this.promptText, scaleX: 1.05, scaleY: 1.05, duration: 600, yoyo: true, repeat: -1 });
        this.createInputField();
    }

    createInputField() {
        // Remove any stray container from a prior run so there's never a duplicate/orphan
        const stray = document.getElementById('muster-radio-input');
        if (stray) stray.remove();

        this.inputContainer = document.createElement('div');
        this.inputContainer.id = 'muster-radio-input';
        this.inputContainer.style.cssText = 'position:fixed;left:50%;top:53%;transform:translate(-50%,-50%);z-index:10000;text-align:center;';

        this.inputElement = document.createElement('input');
        this.inputElement.type = 'text';
        this.inputElement.inputMode = 'numeric';
        this.inputElement.placeholder = '9 7 . 9';
        this.inputElement.maxLength = 4;
        this.inputElement.style.cssText = 'font-family:"Courier New",monospace;font-size:34px;padding:12px 20px;width:200px;text-align:center;background:#0b1e5b;color:#FFD700;border:3px solid #FFD700;border-radius:8px;outline:none;letter-spacing:8px;box-shadow:0 0 20px rgba(255,215,0,0.4);';

        this.submitBtn = document.createElement('button');
        this.submitBtn.textContent = 'CALL IN!';
        this.submitBtn.style.cssText = 'font-family:"Courier New",monospace;font-size:20px;padding:10px 30px;margin:12px auto 0;display:block;background:#CC0000;color:#FFFFFF;border:2px solid #FFD700;border-radius:6px;cursor:pointer;letter-spacing:2px;';

        this.inputContainer.appendChild(this.inputElement);
        this.inputContainer.appendChild(this.submitBtn);
        document.body.appendChild(this.inputContainer);
        this.time.delayedCall(100, () => { if (this.inputElement) this.inputElement.focus(); });

        // Auto-format: digits only, dot appears automatically after the first two (97.9)
        this.inputElement.addEventListener('input', () => {
            const d = this.inputElement.value.replace(/\D/g, '').slice(0, 3);
            this.inputElement.value = d.length > 2 ? d.slice(0, 2) + '.' + d.slice(2) : d;
        });

        const submit = () => this.checkAnswer();
        this.submitBtn.addEventListener('click', submit);
        this.inputElement.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    }

    checkAnswer() {
        if (!this.inputElement) return;
        const val = this.inputElement.value.trim();
        this.removeInput();
        if (this.promptText) {
            this.tweens.killTweensOf(this.promptText);
            this.promptText.destroy();
            this.promptText = null;
        }
        if (val === this.answer) this.win();
        else this.wrong(val);
    }

    win() {
        const w = 800, h = 450;
        this.playWinFanfare();
        this.cameras.main.flash(300, 255, 240, 150);

        const big = this.add.text(w / 2, h / 2 - 45, '🎉 $1,000 WINNER! 🎉', {
            fontSize: '38px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFD700', stroke: '#000000', strokeThickness: 7
        }).setOrigin(0.5).setDepth(300).setScale(0.2);
        this.tweens.add({ targets: big, scaleX: 1, scaleY: 1, duration: 600, ease: 'Back.easeOut' });

        this.add.text(w / 2, h / 2 + 8, "97.9 WRMF — the best variety\nof the 80s, 90s & today!", {
            fontSize: '20px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFFFFF', stroke: '#000000', strokeThickness: 4, align: 'center'
        }).setOrigin(0.5).setDepth(300);

        // Cash + confetti rain
        this.time.addEvent({
            delay: 60, repeat: 50, callback: () => {
                const c = this.add.text(
                    Phaser.Math.Between(40, w - 40), -15,
                    ['🎉', '💵', '⭐', '🎊'][Phaser.Math.Between(0, 3)],
                    { fontSize: '24px' }
                ).setDepth(260);
                this.tweens.add({
                    targets: c, y: h + 20, x: c.x + Phaser.Math.Between(-40, 40),
                    duration: Phaser.Math.Between(1500, 2600), onComplete: () => c.destroy()
                });
            }
        });

        // Brenda jumps for joy
        this.tweens.add({ targets: this.jennifer, y: this.jennifer.y - 18, duration: 300, yoyo: true, repeat: 5, ease: 'Sine.easeInOut' });

        this.time.delayedCall(4800, () => this.finish());
    }

    wrong(val) {
        const w = 800, h = 450;
        this.playWrongBuzzer();
        this.cameras.main.shake(300, 0.01);

        const t1 = this.add.text(w / 2, h / 2 - 30, val ? '"' + val + '"? So close!' : 'So close!', {
            fontSize: '30px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FF5555', stroke: '#000000', strokeThickness: 5
        }).setOrigin(0.5).setDepth(300);

        const t2 = this.add.text(w / 2, h / 2 + 15, "The answer is 97.9 WRMF — give it another try!", {
            fontSize: '18px', fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFD700', stroke: '#000000', strokeThickness: 4, align: 'center'
        }).setOrigin(0.5).setDepth(300);

        // Let her try again — the answer is right there
        this.time.delayedCall(2800, () => {
            t1.destroy();
            t2.destroy();
            this.showInput();
        });
    }

    finish() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.registry.set('musterDone', true);
            this.scene.start('VictoryScene');
        });
    }

    removeInput() {
        if (this.inputContainer && this.inputContainer.parentNode) {
            this.inputContainer.parentNode.removeChild(this.inputContainer);
        }
        const stray = document.getElementById('muster-radio-input');
        if (stray) stray.remove();
        this.inputElement = null;
        this.submitBtn = null;
        this.inputContainer = null;
    }

    cleanup() {
        this.removeInput();
    }

    // === SOUNDS ===

    playJingle() {
        try {
            const ctx = this.sound.context; if (!ctx) return;
            [660, 880].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'square'; osc.frequency.value = freq;
                const t = ctx.currentTime + i * 0.09;
                gain.gain.setValueAtTime(0.04, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
                osc.start(t); osc.stop(t + 0.12);
            });
        } catch (e) {}
    }

    playWinFanfare() {
        try {
            const ctx = this.sound.context; if (!ctx) return;
            const melody = [523, 659, 784, 1047, 784, 1047, 1319];
            const durs = [0.14, 0.14, 0.14, 0.28, 0.14, 0.14, 0.5];
            let t = ctx.currentTime;
            melody.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.type = 'square'; osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.06, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + durs[i]);
                osc.start(t); osc.stop(t + durs[i]);
                t += durs[i];
            });
        } catch (e) {}
    }

    playWrongBuzzer() {
        try {
            const ctx = this.sound.context; if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sawtooth'; osc.frequency.value = 110;
            gain.gain.setValueAtTime(0.07, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5);
        } catch (e) {}
    }
}
