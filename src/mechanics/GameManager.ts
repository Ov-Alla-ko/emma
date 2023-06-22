/* eslint-disable import/order */
// eslint-disable-next-line import/no-unresolved
// @ts-ignore
import CardsField from '../components/CardsField';
import { Sprite, Texture } from 'pixi.js';
import Game from '../index';
import Scene from './Scene';
import Card from '../components/Сard';
import ResultPopUp from '../UI/ResultPopUp';
import Label from '../components/Label';

export default class GameManager {
    protected game: Game;
    protected scene: Scene;
    protected field: CardsField;
    protected cardsArray: any[] = [];
    protected finalArray: any[][] = [];
    protected cardObject: { id: number, img: Texture };
    protected card: Sprite;
    protected cardContainer: Card;
    protected cardsContainersArray: Card[] = [];
    protected arrayOf: any;
    protected matchName: string[];
    protected popUp: ResultPopUp;
    protected resultLabel: Label;
    protected item: any;
    protected flip: Label;
    protected isClick: boolean;
    protected winOrLoose: boolean;

    constructor(scene, game, field, flip, variable) {
      this.scene = scene;
      this.game = game;
      this.field = field;
      this.flip = flip;
      this.winOrLoose = variable;
      this.startField();
    }

    protected shuffle(array: any[]): void {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    protected getIcons = (): void => {
      for (let i = 0; i < 12; i++) {
        this.cardObject = {
          id: i + 1,
          img: Texture.from(`./assets/cards_icons/${i + 1}.png`),
        };
        this.cardsArray.push(this.cardObject);
      }
      if (this.winOrLoose) {
        this.cardsArray.splice(0, 1);
        this.item = this.cardsArray[Math.floor(Math.random() * this.cardsArray.length)];
        this.cardsArray.push(this.item);
        // let itemDelete = this.cardsArray.indexOf(this.item)
        for (let index = 0; index < this.cardsArray.length; index++) {
          if (index !== this.item) { console.log(); }
        }
      }
    }

    protected getCardsForField(): void {
      const column = this.cardsArray.length / 4;

      for (let index = 0; index < 4; index++) {
        this.finalArray.push(this.cardsArray.slice(index * column, (index * column) + column));
      }
    }

    protected async getField():Promise<void> {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 3; x++) {
          this.cardContainer = new Card({
            firstBg: this.game.getRecourse('firstBgCard'),
            secondBg: this.game.getRecourse('secondBgCard'),
            border: this.game.getRecourse('border'),
            icon: this.finalArray[y][x].img,
            bigStar: this.game.getRecourse('bigStar'),
            names: `${this.finalArray[y][x].id}`,
          });

          this.cardContainer.x = (x * 1.12) * (this.cardContainer.width) + 90;
          this.cardContainer.y = (y * 1.12) * this.cardContainer.height + 67;

          this.field.addChild(this.cardContainer);
          this.cardsContainersArray.push(this.cardContainer);
        }
      }
      this.clickAnimate();
      this.openAnimation();
    }
    protected async clickAnimate() {
      this.arrayOf = [];
      this.matchName = [];
      let clickOnFirst = 0;

      for (let index = 0; index < this.cardsContainersArray.length; index++) {
        this.cardsContainersArray[index].interactive = true;

        // eslint-disable-next-line no-loop-func
        this.cardsContainersArray[index].on('click', async () => {
          this.flip.interactive = false;
          clickOnFirst += 1;
          if (clickOnFirst === 1) {
            await this.scene.setAnimation('Emma_worry_st', true);
            this.scene.setAnimation('Emma_worry_loop', true);
          }
          if (this.matchName.length === 0) {
            this.cardsContainersArray[index].flipAnimation(0.5);

            this.arrayOf.push(this.cardsContainersArray[index].name);
            this.findMatchElement();
            this.cardsContainersArray[index].interactive = false;

            if (this.matchName.length !== 0) {
              for (let i = 0; i < this.cardsContainersArray.length; i++) {
                this.cardsContainersArray[i].interactive = false;
                await this.cardsContainersArray[i].flipAnimation(0.2); console.log(11111);
              } this.resultPopUp(true);
              this.addTintField();
              this.popUp.moveDown();
              this.scene.restartGame();
            }
          }
          if (this.matchName.length === 0 && this.cardsContainersArray.length === this.arrayOf.length) {
            this.resultPopUp(false);
            this.addTintField();
            this.popUp.moveDown();
            this.scene.restartGame();
          }
        });
      }
    }

    public async openAnimation(): Promise<void> {
      this.arrayOf = [];
      this.matchName = [];
      this.flip.on('click', async () => {
        //  await this.scene.setAnimation('Emma_worry_st', true);
        this.scene.setAnimation('Emma_worry_loop', true);
        this.flip.interactive = false;
        this.field.interactiveChildren = false;
        for (let index = 0; index < this.cardsContainersArray.length; index++) {
          if (this.matchName.length === 0 && this.arrayOf.length !== 12) {
            await this.cardsContainersArray[index].flipAnimation(0.5);
            this.arrayOf.push(this.cardsContainersArray[index].name);
            this.findMatchElement();

            if (this.matchName.length !== 0) {
              for (let i = 0; i < this.cardsContainersArray.length; i++) {
                await this.cardsContainersArray[i].flipAnimation(0.2);
                console.log(this.cardsContainersArray.length);
              }
              this.resultPopUp(true);
              this.addTintField();
              this.popUp.moveDown();
              this.scene.restartGame();
            }

            if (this.matchName.length === 0
            /* && this.cardsContainersArray.length */
                    && this.arrayOf.length === 12) {
              this.resultPopUp(false);
              this.addTintField();
              this.popUp.moveDown();
              this.scene.restartGame();
            }
          }
        }
      });
    }

    protected findMatchElement(): void {
      this.matchName = this.arrayOf.filter((e, i, a) => a.indexOf(e) !== i);
    }

    protected addTintField(): void {
      this.field.addTint();
      for (let i = 2; i < this.field.children.length; i++) {
        if (this.matchName[0] !== this.field.children[i].name) {
          // @ts-ignore
          this.field.children[i].addTint();
          // @ts-ignore
        } else this.field.children[i].winCards();
      }
    }

    protected async animationHappy(): Promise<void> {
      await this.scene.setAnimation('Emma_worry_end', false);

      await this.scene.setAnimation('Emma_happy_st', false);
      await this.scene.setAnimation('Emma_happy_loop', false);
      await this.scene.setAnimation('Emma_happy_end', false);

      await this.scene.setAnimation('Emma_idle_st', false);
      await this.scene.setAnimation('Emma_idle_loop', true);
    }

    protected async animationSad(): Promise<void> {
      await this.scene.setAnimation('Emma_worry_end', false);

      await this.scene.setAnimation('Emma_sad_st', false);
      await this.scene.setAnimation('Emma_sad_loop', false);
      await this.scene.setAnimation('Emma_sad_end', false);

      await this.scene.setAnimation('Emma_idle_st', false);
      await this.scene.setAnimation('Emma_idle_loop', true);
    }

    protected async resultPopUp(varible): Promise<void> {
      const styleLabel = {
        fontFamily: 'fontMuseo',
        fontSize: 80,
        fontWeight: 'bold',
        fill: 0xfc6400,
        wordWrap: true,
        wordWrapWidth: this.scene.width / 2.5,
        align: 'center',
      };
      if (varible) {
        this.resultLabel = new Label({
          label: 'YOU WIN 500',
          style: styleLabel,
        });
        this.resultLabel.addIcon({
          resource: this.game.getRecourse('coin2'),
          x: 276,
          y: 97,
        }); this.animationHappy();
      } else {
        this.resultLabel = new Label({
          label: 'TRY AGAIN!',
          style: styleLabel,
        }); this.animationSad();
      }
      this.popUp = new ResultPopUp({
        resource: this.game.getRecourse('result_pop_up'),
        labelFirst: this.resultLabel,
      });

      this.scene.addChild(this.popUp);
      this.popUp.x = (this.scene.width - this.popUp.width) / 2;
      this.popUp.y = -this.popUp.height;
      this.popUp.name = 'result_popUp';
    }

    protected restartGame(): void {
      this.field.interactiveChildren = true;
      if (this.field.children.length > 14) {
        this.matchName.length = 0;
        this.field.removeChildren(2, 14);
        console.log(this.matchName, this.matchName.length);
        // @ts-ignore
        this.scene.getChildByName('result_popUp').move(this.scene);
      }
    }

    public async startField() {
      this.getIcons();
      this.shuffle(this.cardsArray);
      this.getCardsForField();
      this.getField();
      this.restartGame();
    }
}
