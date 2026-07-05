// Seagull.js — Storm boss class for the boss fight (Maggie vs the thundercloud)
class ChocolateBoss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'chocolate_boss');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(70, 70);
        this.body.setOffset(13, 13);
        this.body.setAllowGravity(false); // flying storm — hovers, never sinks into the floor
        this.setCollideWorldBounds(true);

        this.maxHP = 24;
        this.hp = 24;
        this.phaseTint = 0xffffff;
        this.isTornado = false;
        this.debrisTimer = 0;
        this.tornadoDir = 1;
        this.isDead = false;
        this.isInvulnerable = false;
        this.isEntering = true;
        this.phase = 1;
        this.phaseTransitioning = false;

        this.attackTimer = 0;
        this.slamming = false;
        this.telegraphing = false;

        this.chocoBalls = scene.physics.add.group();
    }

    enter() {
        this.y = -80;
        this.body.setAllowGravity(false);
        this.scene.tweens.add({
            targets: this,
            y: 180,
            duration: 1500,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                this.isEntering = false;
                this.body.setAllowGravity(false); // keep hovering
                this.scene.cameras.main.shake(200, 0.01);
            }
        });
    }

    takeDamage() {
        if (this.isInvulnerable || this.isDead) return false;
        this.hp--;
        this.isInvulnerable = true;

        this.setTint(0xFF0000);
        this.scene.time.delayedCall(200, () => {
            if (!this.isDead) this.setTint(this.phaseTint);   // keep the current phase color
        });

        this.scene.cameras.main.shake(100, 0.008);
        this.playHitSound();

        // Check for phase transitions
        const oldPhase = this.phase;
        if (this.hp <= 8) this.phase = 3;
        else if (this.hp <= 16) this.phase = 2;

        if (this.phase !== oldPhase) {
            this.startPhaseTransition(this.phase);
        }

        this.scene.time.delayedCall(400, () => {
            this.isInvulnerable = false;
        });

        if (this.hp <= 0) {
            this.die();
            return true;
        }
        return false;
    }

    playHitSound() {
        try {
            const audioCtx = this.scene.sound.context;
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.3);
        } catch(e) {}
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.body.setVelocity(0, 0);
        this.body.setAllowGravity(false);
        this.body.setEnable(false);

        // Kill all active tweens on the boss
        this.scene.tweens.killTweensOf(this);

        // Destroy all chocolate balls
        this.chocoBalls.clear(true, true);

        // Chocolate splatter
        for (let i = 0; i < 15; i++) {
            const splat = this.scene.add.circle(
                this.x + Phaser.Math.Between(-40, 40),
                this.y + Phaser.Math.Between(-30, 30),
                Phaser.Math.Between(4, 14),
                0x8FB8CC, 0.8
            ).setDepth(20);
            this.scene.tweens.add({
                targets: splat,
                y: splat.y + Phaser.Math.Between(30, 100),
                scaleX: 2,
                scaleY: 0.3,
                alpha: 0,
                duration: 1000,
                delay: i * 40,
                onComplete: () => splat.destroy()
            });
        }

        // Melt away
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.5,
            scaleY: 0.15,
            alpha: 0,
            y: this.y + 40,
            duration: 1200,
            ease: 'Power2'
        });

        // Defeat sound
        try {
            const audioCtx = this.scene.sound.context;
            if (!audioCtx) return;
            [500, 400, 300, 200, 100].forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'square';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.12 + 0.15);
                osc.start(audioCtx.currentTime + i * 0.12);
                osc.stop(audioCtx.currentTime + i * 0.12 + 0.15);
            });
        } catch(e) {}
    }

    startPhaseTransition(newPhase) {
        this.phaseTransitioning = true;
        this.isInvulnerable = true;
        this.body.setVelocity(0, 0);

        // Clear existing projectiles
        this.chocoBalls.clear(true, true);

        // Visual flash
        this.setTint(0xFFFFFF);
        this.scene.cameras.main.shake(300, 0.015);

        const w = this.scene.cameras.main.width;
        const h = this.scene.cameras.main.height;

        let phaseText = '';
        let phaseColor = '#FFFFFF';
        if (newPhase === 2) {
            phaseText = 'PHASE 2: THUNDERHEAD!';
            phaseColor = '#B39DDB';
            this.phaseTint = 0x6a4fb0;
            this.setTint(this.phaseTint);
            this.setScale(1.12);
        } else if (newPhase === 3) {
            phaseText = 'PHASE 3: TORNADO!!';
            phaseColor = '#E0E0E0';
            this.phaseTint = 0x9aa4ad;
            this.setTint(this.phaseTint);
            this.setScale(1.25, 1.6);   // stretch into a spinning funnel
            this.isTornado = true;
        }

        const announcement = this.scene.add.text(w / 2, h / 2 - 30, phaseText, {
            fontSize: '26px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: phaseColor,
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5).setDepth(200).setScale(0.3);

        this.scene.tweens.add({
            targets: announcement,
            scaleX: 1, scaleY: 1,
            duration: 400,
            ease: 'Back.easeOut'
        });

        // Phase transition sound
        try {
            const audioCtx = this.scene.sound.context;
            if (audioCtx) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.4);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                osc.start(audioCtx.currentTime);
                osc.stop(audioCtx.currentTime + 0.5);
            }
        } catch(e) {}

        // Pause gives player breathing room
        this.scene.time.delayedCall(1800, () => {
            if (this.isDead) return;
            announcement.destroy();
            this.phaseTransitioning = false;
            this.isInvulnerable = false;
            this.attackTimer = 0;
        });
    }

    shootChocolate(targetX, targetY) {
        if (this.isDead || this.isEntering || this.phaseTransitioning) return;
        if (!this.chocoBalls || !this.scene) return;

        const ball = this.chocoBalls.create(this.x, this.y + 20, 'choco_ball');
        if (!ball) return;
        ball.setDepth(8);

        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        const speed = 140 + this.phase * 40;
        ball.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        ball.body.setAllowGravity(false);

        this.scene.time.delayedCall(3500, () => {
            if (ball && ball.active) ball.destroy();
        });

        // Throw sound
        try {
            const audioCtx = this.scene.sound.context;
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(250, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.12);
        } catch(e) {}
    }

    telegraphAttack(callback) {
        if (this.isDead || this.telegraphing) return;
        this.telegraphing = true;

        // Flash warning above boss
        const warn = this.scene.add.text(this.x, this.y - 50, '!', {
            fontSize: '28px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FF0000',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setDepth(200);

        this.scene.tweens.add({
            targets: warn,
            alpha: 0.3,
            duration: 150,
            yoyo: true,
            repeat: 2,
            onComplete: () => {
                warn.destroy();
                this.telegraphing = false;
                if (!this.isDead) callback();
            }
        });
    }

    groundSlam() {
        if (this.isDead || this.isEntering || this.slamming || this.phaseTransitioning) return;
        this.slamming = true;

        const startY = this.y;
        this.body.setAllowGravity(false);

        this.scene.tweens.add({
            targets: this,
            y: startY - 120,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                if (this.isDead) return;
                this.scene.tweens.add({
                    targets: this,
                    y: this.scene.cameras.main.height - 150,
                    duration: 200,
                    ease: 'Power4',
                    onComplete: () => {
                        if (this.isDead) return;
                        this.scene.cameras.main.shake(300, 0.02);

                        // Rise back up to hover (never rest on / sink through the floor)
                        this.scene.tweens.add({
                            targets: this,
                            y: startY,
                            duration: 500,
                            ease: 'Sine.easeOut',
                            onComplete: () => { if (!this.isDead) this.slamming = false; }
                        });

                        // Shockwave
                        const wave = this.scene.add.rectangle(
                            this.x, this.scene.cameras.main.height - 105,
                            20, 8, 0x8FB8CC, 0.7
                        ).setDepth(6);
                        this.scene.tweens.add({
                            targets: wave,
                            scaleX: 30,
                            alpha: 0,
                            duration: 600,
                            onComplete: () => wave.destroy()
                        });

                        // Slam sound
                        try {
                            const audioCtx = this.scene.sound.context;
                            if (!audioCtx) return;
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.connect(gain);
                            gain.connect(audioCtx.destination);
                            osc.type = 'sawtooth';
                            osc.frequency.value = 55;
                            gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
                            osc.start(audioCtx.currentTime);
                            osc.stop(audioCtx.currentTime + 0.4);
                        } catch(e) {}
                    }
                });
            }
        });
    }

    // PHASE 2 attack: a lightning bolt strikes down a column at targetX
    lightningStrike(targetX) {
        if (this.isDead || this.phaseTransitioning) return;
        const w = this.scene.cameras.main.width;
        const h = this.scene.cameras.main.height;
        const groundY = h - 86;
        const cx = Phaser.Math.Clamp(targetX, 20, w - 20);

        // Telegraph column (a warning flash where the bolt will land)
        const warn = this.scene.add.rectangle(cx, groundY / 2, 34, groundY, 0xFFF176, 0.22).setDepth(7);
        this.scene.tweens.add({ targets: warn, alpha: 0.55, duration: 160, yoyo: true, repeat: 2 });

        this.scene.time.delayedCall(720, () => {
            warn.destroy();
            if (this.isDead) return;
            // The strike
            const bolt = this.scene.add.rectangle(cx, groundY / 2, 8, groundY, 0xFFFFFF, 0.95).setDepth(9);
            const glow = this.scene.add.rectangle(cx, groundY / 2, 22, groundY, 0xB39DDB, 0.5).setDepth(8);
            this.scene.tweens.add({ targets: [bolt, glow], alpha: 0, duration: 260, onComplete: () => { bolt.destroy(); glow.destroy(); } });
            this.scene.cameras.main.flash(120, 230, 220, 255);
            this.scene.cameras.main.shake(220, 0.012);
            this.playThunder();
            const jen = this.scene.jennifer;
            if (jen && Math.abs(jen.x - cx) < 28 && this.scene.hurtJennifer) {
                this.scene.hurtJennifer();
            }
        });
    }

    playThunder() {
        try {
            const ctx = this.scene.sound.context;
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.6);
        } catch (e) {}
    }

    // PHASE 3 (tornado) flings debris sideways
    shootDebris(dir) {
        if (this.isDead || !this.chocoBalls || !this.scene) return;
        const ball = this.chocoBalls.create(this.x, this.y + Phaser.Math.Between(-18, 18), 'choco_ball');
        if (!ball) return;
        ball.setDepth(8);
        ball.body.setAllowGravity(false);
        ball.setVelocity(dir * Phaser.Math.Between(230, 300), Phaser.Math.Between(-50, 50));
        this.scene.time.delayedCall(3000, () => { if (ball && ball.active) ball.destroy(); });
    }

    updateTornado(time, delta) {
        const w = this.scene.cameras.main.width;
        // Spin fast like a funnel
        this.angle += 16;
        // Sweep across the arena, bouncing off the edges
        this.setVelocityX(this.tornadoDir * 165);
        if (this.x < 70) this.tornadoDir = 1;
        else if (this.x > w - 70) this.tornadoDir = -1;
        // Fling debris + occasional lightning
        this.debrisTimer += delta;
        if (this.debrisTimer >= 620) {
            this.debrisTimer = 0;
            this.shootDebris(-1);
            this.shootDebris(1);
            const jen = this.scene.jennifer;
            if (jen && Math.random() < 0.45) this.lightningStrike(jen.x);
        }
    }

    updateBoss(time, delta) {
        if (this.isDead || this.isEntering || !this.body || !this.body.enable) return;

        const jennifer = this.scene.jennifer;
        if (!jennifer) return;

        // Don't act during phase transitions
        if (this.phaseTransitioning) {
            this.setVelocityX(0);
            this.alpha = 0.6 + Math.sin(time * 0.01) * 0.4;
            return;
        }
        this.alpha = 1;

        // Safety: keep the storm hovering above the floor so it's always hittable
        const floorLimit = this.scene.cameras.main.height - 130;
        if (this.y > floorLimit) {
            this.y = floorLimit;
            if (this.body) this.body.setVelocityY(0);
        }

        // PHASE 3: the storm has TRANSFORMED into a tornado — completely different behavior
        if (this.phase === 3) {
            this.updateTornado(time, delta);
            return;
        }

        // Phases 1 & 2: chase the player
        if (!this.telegraphing) {
            const speed = this.phase === 1 ? 38 : 64;
            if (jennifer.x < this.x - 30) { this.setVelocityX(-speed); this.setFlipX(true); }
            else if (jennifer.x > this.x + 30) { this.setVelocityX(speed); this.setFlipX(false); }
            else { this.setVelocityX(0); }
        }

        // Attacks
        this.attackTimer += delta;
        const attackInterval = this.phase === 1 ? 2500 : 1700;
        if (this.attackTimer >= attackInterval) {
            this.attackTimer = 0;
            const rand = Math.random();
            if (this.phase === 1) {
                // Rain cloud: telegraphed aimed hail
                this.telegraphAttack(() => this.shootChocolate(jennifer.x, jennifer.y));
            } else {
                // Thunderhead: lightning strikes + a hail spread
                if (rand < 0.5) {
                    this.lightningStrike(jennifer.x);
                } else {
                    this.telegraphAttack(() => {
                        this.shootChocolate(jennifer.x, jennifer.y);
                        this.scene.time.delayedCall(280, () => this.shootChocolate(jennifer.x + 70, jennifer.y - 30));
                    });
                }
            }
        }

        // Gentle wobble
        const wobbleSpeed = this.phase === 1 ? 0.002 : 0.004;
        const wobbleAmt = this.phase === 1 ? 2 : 4;
        this.angle = Math.sin(time * wobbleSpeed) * wobbleAmt;
    }
}
