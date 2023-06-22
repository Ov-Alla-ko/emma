import { Container, Sprite, Texture } from 'pixi.js';

export interface IIconSetting {
    resource: Texture;
    size?: number;
}
export default class Icon extends Container {
    protected resource: Texture;
    protected icon: Sprite;
    protected size: number;

    constructor(options: IIconSetting) {
      super();
      this.resource = options.resource;
      this.size = options.size;
      this.init();
    }

    protected init(): void {
      this.icon = new Sprite(this.resource);

      this.addChild(this.icon);
    }
}
