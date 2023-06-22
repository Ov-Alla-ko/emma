import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap/all';

export interface IIconSetting {
    firstBg: Texture;
    secondBg: Texture;
    icon: Texture;
    border: Texture;
    bigStar: Texture;
    names: string;
}
export default class Card extends Container {
    protected firstBg: Texture;
    protected secondBg:Texture;
    protected border: Texture;
    protected bigStar: Texture;
    protected icon: Texture;
    protected backgroundFirst: Sprite;
    protected backgroundSecond:Sprite;
    protected borderImage: Sprite;
    protected card: Sprite;
    protected names: string;
    protected size: number;
    protected bigStar1: Sprite;
    protected bigStar2: Sprite;
    protected bigStar3: Sprite;
    protected bigStar4: Sprite;

    constructor(options: IIconSetting) {
      super();
      this.firstBg = options.firstBg;
      this.secondBg = options.secondBg;
      this.icon = options.icon;
      this.name = options.names;
      this.border = options.border;
      this.bigStar = options.bigStar;

      this.init();
    }

    protected init(): void {
      this.backgroundFirst = new Sprite(this.firstBg);
      this.backgroundSecond = new Sprite(this.secondBg);
      this.card = new Sprite(this.icon);
      this.size = this.card.width;
      this.backgroundSecond.width = 0;
      this.backgroundSecond.x = 130;
      this.card.x = 52;

      this.card.y = 54.5;
      this.addChild(this.backgroundSecond, this.backgroundFirst);
      this.backgroundSecond.addChild(this.card);
    }

    public winCards(): void {
      this.borderImage = new Sprite(this.border);
      this.borderImage.x = -52;
      this.borderImage.y = -48.25;
      this.addChild(this.borderImage);
      gsap.to(this, {
        x: this.x - 10, y: this.y - 10, duration: 0.1, repeat: 1, yoyo: true,
      });
      gsap.to(this.scale, {
        x: 1.1, y: 1.1, duration: 0.1, repeat: 1, yoyo: true,
      });

      this.bigStar1 = new Sprite(this.bigStar);
      this.bigStar2 = new Sprite(this.bigStar);
      this.bigStar3 = new Sprite(this.bigStar);
      this.bigStar4 = new Sprite(this.bigStar);
      this.addChild(this.bigStar1);
      this.bigStar1.x = -70;
      this.bigStar1.y = -100;

      this.addChild(this.bigStar2);
      this.bigStar2.x = -70;
      this.bigStar2.y = -75;

      this.addChild(this.bigStar3);
      this.bigStar3.x = -105;
      this.bigStar3.y = 50;
      this.addChild(this.bigStar4);
      this.bigStar4.x = 65;
      this.bigStar4.y = 100;
      gsap.to(this.bigStar1, {
        alpha: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(this.bigStar2, {
        alpha: 0,
        duration: 1,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(this.bigStar3, {
        alpha: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(this.bigStar4, {
        alpha: 0,
        duration: 1,
        repeat: -1,
        yoyo: true,
      });
    }

    public async flipAnimation(speed): Promise<void> {
      if (this.backgroundFirst.width !== 0) {
        gsap.to(this.backgroundFirst, {
          x: this.backgroundFirst.x + (this.width / 2), duration: speed, repeat: 0,
        });
        await gsap.to(this.backgroundFirst.scale, {
          x: 0, duration: speed, repeat: 0,
        });
        gsap.to(this.backgroundSecond, {
          x: 0, duration: speed, repeat: 0,
        });
        gsap.to(this.backgroundSecond.scale, {
          x: 1,
          duration: speed,
          repeat: 0,

        });
      }
    }
    public restartCards() {
      this.card.x = 52;

      this.card.y = 54.5;
    }

    public addTint():void {
      this.backgroundSecond.tint = 0xcccccc;
    }
}
