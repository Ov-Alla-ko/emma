import { Container, Sprite, Texture } from 'pixi.js';
import Card from './Сard';

export interface IPopSetting {
    resource: Texture;
    names: string;
    cards: Texture;

}
export default class CardsField extends Container {
    protected resource: Texture;
    protected cards: Texture;
    protected cardsField: Sprite;
    protected field : Sprite;
    protected names: string;
    protected card: Card;
    protected firstCardIcon : Texture;
    protected secondCardIcon: Texture;

    constructor(options: IPopSetting) {
      super();
      this.resource = options.resource;
      this.names = options.names;
      this.cards = options.cards;
      this.init();
    }

    protected init(): void {
      this.field = new Sprite(this.resource);
      this.addChild(this.field);
      this.cardsField = new Sprite(this.cards);
      this.cardsField.x = (this.field.width - this.cardsField.width) / 2;
      this.cardsField.y = (this.field.height - this.cardsField.height) / 2 - 25;
      this.addChild(this.cardsField);
      this.field.tint = 0xcccccc;
      this.cardsField.tint = 0xcccccc;
    }

    public deleteTint():void {
      this.field.tint = 0xFFFFFF;
      this.cardsField.tint = 0xFFFFFF;
    }
    public addTint():void {
      this.field.tint = 0xcccccc;
      this.cardsField.tint = 0xcccccc;
    }
}
