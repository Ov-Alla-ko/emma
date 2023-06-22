import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';
import Label from '../components/Label';

export interface IPopSetting {
    labelFirst: Label;
    labelSecond?: Label;
    resource: Texture;

}
export default class ResultPopUp extends Container {
    protected popUp: Sprite;
    protected resource: Texture;
    protected labelFirst: Label;
    protected labelSecond: Label;

    constructor(options: IPopSetting) {
      super();
      this.resource = options.resource;
      this.labelFirst = options.labelFirst;
      this.labelSecond = options.labelSecond;

      this.init();
    }

    protected init(): void {
      this.popUp = new Sprite(this.resource);
      this.addChild(this.popUp);
      this.addChild(this.labelFirst /* this.labelSecond */);
      this.labelFirst.x = (this.width - this.labelFirst.width) / 2;
      this.labelFirst.y = (this.height - this.labelFirst.height) / 2;
    }

    public async move(scene): Promise<void> {
      await gsap.to(this, {
        y: this.y - (this.height * 2),
        duration: 0.5,
        ease: 'none',
        onComplete: () => {
          scene.removeChild(this);
        },

      });
    }
    public async moveDown(): Promise<void> {
      await gsap.to(this, {
        y: this.y + (this.height * 2),
        duration: 0.5,
        ease: 'none',

      });
    }
}
