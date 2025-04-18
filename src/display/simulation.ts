import * as PHASER from 'phaser';
import curveFactory from '../utils/curve-factory';

export default class Simulation {
    private game: PHASER.Game;
    private circle: PHASER.GameObjects.Arc;
    private isMoving: boolean = false;
    private isPaused: boolean = false;
    private startPoint: PHASER.Geom.Point;
    private endPoint: PHASER.Geom.Point;
    private moveStartTime: number = 0;
    private moveKey: PHASER.Input.Keyboard.Key;
    private keyPressed: boolean = false;
    
    private readonly ANIMATION_DURATION_MS: number = 3000; // 3 seconds
    private readonly PAUSE_DURATION_MS: number = 500; // 0.5 seconds
    private readonly CIRCLE_RADIUS: number = 40;
    private readonly MARGIN: number = 60;

    constructor(canvasID: string) {
        const canvasElement = document.getElementById(canvasID) as HTMLCanvasElement;
        if (!canvasElement) {
            throw new Error(`Canvas element with ID "${canvasID}" not found.`);
        }
        
        const self = this;
        class MainScene extends PHASER.Scene {
            create() {
                self.setupScene(this);
            }
            
            update(time: number) {
                self.updateScene(this, time);
            }
        }
        
        const config: PHASER.Types.Core.GameConfig = {
            type: PHASER.CANVAS,
            width: 800,
            height: 400,
            backgroundColor: '#222426',
            canvas: canvasElement,
            scene: MainScene,
            scale: {
                mode: PHASER.Scale.NONE,
            }
        };

        this.game = new PHASER.Game(config);
    }

    private setupScene(scene: PHASER.Scene): void {
        const startX = this.MARGIN + this.CIRCLE_RADIUS;
        const endX = scene.sys.game.config.width as number - this.MARGIN - this.CIRCLE_RADIUS;
        const centerY = (scene.sys.game.config.height as number) / 2;
        
        this.startPoint = new PHASER.Geom.Point(startX, centerY);
        this.endPoint = new PHASER.Geom.Point(endX, centerY);
        
        this.circle = scene.add.circle(
            this.startPoint.x, 
            this.startPoint.y, 
            this.CIRCLE_RADIUS, 
            0xFFFFFF
        );
        
        if (scene.input.keyboard) {
            this.moveKey = scene.input.keyboard.addKey(PHASER.Input.Keyboard.KeyCodes.M);
        } else {
            console.warn('Keyboard input is not available.');
        }

        scene.add.text(
            10, 
            10, 
            'Press M to move the circle', 
            { 
                color: '#FFFFFF', 
                fontSize: '18px' 
            }
        );
    }

    private updateScene(scene: PHASER.Scene, time: number): void {
        if (this.moveKey.isDown && !this.keyPressed) {
            this.keyPressed = true;
            
            if (!this.isMoving && !this.isPaused) {
                this.startMovement(time);
            }
        }
        
        if (!this.moveKey.isDown && this.keyPressed) {
            this.keyPressed = false;
        }
        
        if (this.isMoving) {
            this.updateCirclePosition(time);
        }
    }
    
    private startMovement(time: number): void {
        this.isMoving = true;
        this.moveStartTime = time;
    }
    
    private updateCirclePosition(currentTime: number): void {
        const elapsedTime = currentTime - this.moveStartTime;
        const progress = Math.min(elapsedTime / this.ANIMATION_DURATION_MS, 1);
        
        if (progress < 1) {
            const getCurvePoint = curveFactory();
            const currentPosition = getCurvePoint(this.startPoint, this.endPoint, progress);
            
            this.circle.setPosition(currentPosition.x, currentPosition.y);
        } else if (!this.isPaused) {
            this.circle.setPosition(this.endPoint.x, this.endPoint.y);
            
            this.isPaused = true;
            setTimeout(() => this.resetCircle(), this.PAUSE_DURATION_MS);
        }
    }
    
    private resetCircle(): void {
        this.circle.setPosition(this.startPoint.x, this.startPoint.y);
        this.isMoving = false;
        this.isPaused = false;
    }
}