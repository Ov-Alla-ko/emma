import { Container, Sprite, TARGETS } from 'pixi.js';
import { gsap } from 'gsap';
import Game from '../index';
import Label from './Label';
import Scene from '../mechanics/Scene';
import Icon from './Icon';
import CardsField from './CardsField';
import Button from './Button';

export default class SettingWindow extends Container {
    protected game: Game;
    protected icon: Sprite;
    protected iconGame : Sprite;
    protected howToPlayIcon: Sprite;
    protected iconSecond: Icon;
    protected setting: Sprite;
    protected scene: Scene;
    protected field: Sprite;

    protected flip: Label;
    protected match: Label;
    protected prizesShow: Label;
    protected prizes: Label;

    protected two: Label;
    protected four: Label;
    protected five: Label;
    protected seven: Label;
    protected ten: Label;
    protected fifteen: Label;
    protected twenty: Label;
    protected fifty: Label;
    protected oneHundred: Label;
    protected fiveHundred: Label;
    protected oneThousand: Label;
    protected fieldArea: CardsField;
    protected startButton: Button;
    protected flipForMe: Label;

    protected officialRules: Label;

    constructor(scene, game, field, button, flipForMe) {
      super();
      this.game = game;
      this.scene = scene;
      this.fieldArea = field;
      this.startButton = button;
      this.flipForMe = flipForMe;

      this.init();
    }

    private init(): void {
      this.setting = new Sprite(this.game.getRecourse('settingBg'));
      this.addChild(this.setting);
      this.alpha = 0;
      this.createFieldCards();
      this.iconClose();
      this.iconOfGame();
      this.howPlayIcon();
      this.createLabels();
    }
    protected createFieldCards(): void {
      this.field = new Sprite(this.game.getRecourse('field'));

      this.field.y = this.field.height - 120;
      this.field.x = (this.width - this.field.width) / 2;

      this.addChild(this.field);
    }

    protected createLabels() {
      const styleLabel = {
        fontFamily: 'fontMuseo',
        fontSize: 65,
        fontWeight: 'normal',
        fill: 0xFFFFFF,
      };
      this.flip = new Label({
        label: 'Flip all 12 tiles',
        style: styleLabel,
      });
      this.match = new Label({
        label: 'Match 2 to win',
        style: styleLabel,
      });
      this.prizesShow = new Label({
        label: 'Prizes shown on tiles',
        style: styleLabel,
      });
      this.prizes = new Label({
        label: 'PRIZES',
        style: styleLabel,
      });
      this.officialRules = new Label({
        label: 'Official Rules',
        style: styleLabel,
      });
      this.addChild(this.officialRules);
      this.officialRules.x = 338.5;
      this.officialRules.y = 2336;
      this.addChild(this.flip);
      this.flip.x = 324.5;
      this.flip.y = 1100;
      this.addChild(this.match);
      this.match.x = 316;
      this.match.y = 1190;
      this.addChild(this.prizesShow);
      this.prizesShow.x = 210;
      this.prizesShow.y = 1280;
      this.addChild(this.prizes);
      this.prizes.x = 429.5;
      this.prizes.y = 1413;

      this.two = new Label({
        label: '2',
        style: styleLabel,
      });
      this.addChild(this.two);
      this.two.x = 250;
      this.two.y = 1973;
      this.two.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.four = new Label({
        label: '4',
        style: styleLabel,
      });
      this.addChild(this.four);
      this.four.x = 700;
      this.four.y = 1883;
      this.four.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.five = new Label({
        label: '5',
        style: styleLabel,
      });
      this.addChild(this.five);
      this.five.x = 250;
      this.five.y = 1883;
      this.five.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.seven = new Label({
        label: '7',
        style: styleLabel,
      });
      this.addChild(this.seven);
      this.seven.x = 700;
      this.seven.y = 1793;
      this.seven.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.ten = new Label({
        label: '10',
        style: styleLabel,
      });
      this.addChild(this.ten);
      this.ten.x = 250;
      this.ten.y = 1793;
      this.ten.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.fifteen = new Label({
        label: '15',
        style: styleLabel,
      });
      this.addChild(this.fifteen);
      this.fifteen.x = 700;
      this.fifteen.y = 1703;
      this.fifteen.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.twenty = new Label({
        label: '20',
        style: styleLabel,
      });
      this.addChild(this.twenty);
      this.twenty.x = 250;
      this.twenty.y = 1703;
      this.twenty.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.fifty = new Label({
        label: '50',
        style: styleLabel,
      });
      this.addChild(this.fifty);
      this.fifty.x = 700;
      this.fifty.y = 1613;
      this.fifty.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.oneHundred = new Label({
        label: '100',
        style: styleLabel,
      });
      this.addChild(this.oneHundred);
      this.oneHundred.x = 250;
      this.oneHundred.y = 1613;
      this.oneHundred.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.fiveHundred = new Label({
        label: '500',
        style: styleLabel,
      });
      this.addChild(this.fiveHundred);
      this.fiveHundred.x = 700;
      this.fiveHundred.y = 1523;
      this.fiveHundred.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });

      this.oneThousand = new Label({
        label: '1000',
        style: styleLabel,
      });
      this.addChild(this.oneThousand);
      this.oneThousand.x = 250;
      this.oneThousand.y = 1523;
      this.oneThousand.addIcon({
        resource: this.game.getRecourse('coin3'),
        positionStart: false,
      });
    }

    protected iconClose(): void {
      this.icon = new Sprite(this.game.getRecourse('close_icon'));
      this.addChild(this.icon);
      this.icon.x = 999;
      this.icon.y = 50;
      this.icon.interactive = true;
      this.icon.on('click', () => {
        this.closeSetting();
        this.fieldArea.interactiveChildren = true;
        this.startButton.interactive = true;
        this.flipForMe.interactive = true;
      });
    }

    protected iconOfGame(): void {
      this.iconGame = new Sprite(this.game.getRecourse('icon_game'));
      this.addChild(this.iconGame);
      this.iconGame.x = 367;
      this.iconGame.y = 195;
    }

    protected howPlayIcon(): void {
      this.howToPlayIcon = new Sprite(this.game.getRecourse('how_to_play'));
      this.addChild(this.howToPlayIcon);
      this.howToPlayIcon.x = 293;
      this.howToPlayIcon.y = 870;
    }

    public showSetting = (): void => {
      gsap.to(this, {
        alpha: 1,
        duration: 1,
        ease: 'none',

      });
    }

    protected closeSetting = (): void => {
      gsap.to(this, {
        alpha: 0,
        duration: 1,
        ease: 'none',

      });
    }
}
