import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';
import Label from '../components/Label';
import Button from '../components/Button';
import Scene from '../mechanics/Scene';

export interface IPopSetting {
    label?: Label;
    resource: Texture;
    width?: number;
    button?: Button;
    names: string;
    scene: Scene;

}
export default class StartPopUp extends Container {
    protected popUp: Sprite;
    protected resource: Texture;
    protected label?: Label;
    protected button: Button;
    protected names: string;
    protected scene: Scene;

    constructor(options: IPopSetting) {
      super();
      this.resource = options.resource;
      this.label = options.label;
      this.button = options.button;
      this.names = options.names;
      this.scene = options.scene;

      this.init();
    }

    protected init(): void {
      this.popUp = new Sprite(this.resource);
      this.addChild(this.popUp);

      if (this.label !== undefined) {
        this.addChild(this.label);
        this.label.y = this.label.height - (this.label.height / 4);
        this.label.x = (this.width - this.label.width) / 2;
      }
      if (this.button !== undefined) {
        this.button.y = this.label.height * 2;
        this.button.x = (this.width - this.button.width) / 2;
        this.addChild(this.button);
      }
      // this.button.interactive = true;
      this.button.on('click', () => {
        this.move();
        this.scene.startGame();
      });
    }

    public move(): void {
      gsap.to(this, {
        y: this.y + this.height,
        duration: 0.5,
        ease: 'none',

      });
    }
    public moveUp(): void {
      gsap.to(this, {
        y: this.y - this.height,
        duration: 0.5,
        ease: 'none',

      });
    }
}
