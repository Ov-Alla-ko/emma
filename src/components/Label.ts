import {
  Container, Sprite, Text, Texture,
} from 'pixi.js';

import Icon from './Icon';

export interface IStyle {
  fontFamily?: string,
  fontSize?: number,
  fontWeight?: string,
  fill?: number,
}

export interface ILabelSetting {
  label: string;
  style: IStyle;
  image?: Icon;
  posit?: boolean;
}

export interface IImg {
  resource?: Texture;
  size?: number;
  positionStart?: boolean,
  margin?: number;
  x?: number;
  y?: number;
}

export default class Label extends Container {
  protected text: Text;
  protected label: string;
  protected style: IStyle ;
  protected image?: Icon;
  protected posit?: string;
  protected labelImg: Icon;

  constructor(options: ILabelSetting) {
    super();
    this.label = options.label;
    this.style = options.style;

    this.init();
  }
  protected init(): void {
    this.text = new Text(this.label, this.style);
    this.addChild(this.text);
  }
  public addIcon(options: IImg): void {
    this.createElements(options.resource);
    const icon = new Sprite(options.resource);
    const iconSize = options.size || icon.width;

    icon.width = iconSize;
    icon.height = iconSize;

    const startPosition = options.positionStart;
    const margin = options.margin || 5;

    if (startPosition === true) this.text.x = icon.width + margin;
    else icon.x = this.text.width + margin;
    icon.y = (this.text.height - icon.height) / 2;

    this.addChild(icon);
    if (options.x !== undefined || options.y !== undefined) {
      icon.x = options.x;
      icon.y = options.y;
    }
  }

  private createElements(resource): void {
    this.labelImg = new Icon({
      resource,
    });
  }

  public getValue(): string {
    return this.text.text;
  }

  public addTint(varible): void {
    if (varible === true) {
      this.text.tint = 0xcccccc;
    } else if (varible === false) {
      this.text.tint = 0xFFFFFF;
    }
  }
  public removeLabelText(newLabel: string) {
    this.text.text = newLabel;
  }
}
