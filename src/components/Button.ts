import { Container, Sprite, Texture } from 'pixi.js';
import Icon from './Icon';
import Label from './Label';

export interface IButtonSetting {
    label?: Label;
    icon?: Icon;
    resource: Texture;
    width?: number;
    height?: number;

}
export default class Button extends Container {
    protected button: Sprite;
    protected resource: Texture;
    protected label?: Label;

    protected sizeWidth: number;
    protected sizeHeight: number;

    constructor(options: IButtonSetting) {
      super();
      this.resource = options.resource;
      this.label = options.label;
      this.sizeWidth = options.width;
      this.sizeHeight = options.height;
      this.init();
    }

    protected init(): void {
      this.button = new Sprite(this.resource);
      this.addChild(this.button);
      this.addChild(this.label);
      this.label.x = (this.button.width - this.label.width) / 2;
      this.label.y = (this.button.height - this.label.height) / 3;

      /*         if (this.sizeWidth) {
            let size = this.button.width / this.sizeWidth;
            this.button.scale.set(size)
        }
        else if (this.sizeHeight) {
            let size = this.button.height / this.sizeHeight;
            this.button.scale.set(size)
        }
        else {
            let size = 100;
            this.button.scale.set(size)
        }
        this.addChild(this.label);
        this.label.x = (this.button.width - this.label.width) / 2;
        this.label.y = (this.button.height - this.label.height) / 3;

    }

    public async addEventBtn(callback, context?): Promise<void> {
        return await new Promise((resolve) => {
            if (context) this.on('pointerdown', callback, context)
            else this.on('pointerdown', callback);
            resolve();
        })
    }

    public addTint(varible): void {
        if (varible === true) {
            this.button.tint = 0xcccccc;
            this.label.addTint(varible);
        }
        else if (varible === false)
            this.button.tint = 0xFFFFFF;
        this.label.addTint(varible);
    }

    public changeLabel(varible, label): void {
        this.removeChild(this.label)
        if (varible === true) {
            this.label = label;
            this.label.addTint(varible);
            this.addChild(this.label);
            this.label.x = (this.button.width - this.label.width) / 2;
            this.label.y = (this.button.height - this.label.height) / 3;
        }
 */
    }
}
