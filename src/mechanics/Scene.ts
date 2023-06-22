/* eslint-disable import/default */
/* eslint-disable import/namespace */
import 'pixi-spine';
import {
  Application, Container, Sprite, Texture,
} from 'pixi.js';

import Game from '../index';
import StartPopUp from '../UI/StartPopUp';
import Button from '../components/Button';
import Label from '../components/Label';
import Icon from '../components/Icon';
import CardsField from '../components/CardsField';
import ResultPopUp from '../UI/ResultPopUp';
import GameManager from './GameManager';
import SettingWindow from '../components/SettingWindow';

export default class Scene extends Container {
  protected game: Game;
  protected app: Application;
  protected startPopUp: StartPopUp;
  protected resultPopUp: ResultPopUp
  protected startPopUpButton: Button;
  protected buttonLabel:Label;
  protected popUpLabel: Label;
  protected resultLabel: Label;
  protected flipLabelTop: Label;
  protected flipLabel: Label;
  protected buttonIcon :Icon;
  protected flipIcon: Icon;
  protected field : CardsField;
  protected manager: GameManager;
  protected setWindow: SettingWindow;
  protected character;

  constructor(game) {
    super();

    this.game = game;
    this.app = this.game.getApp();

    this.createElements();
  }

  protected createElements(): void {
    this.createBg();
    this.createFlipForMe();
    this.createStartPopUp();
    this.createFieldCards();
    this.createFlipLabel();
    this.createResultPopUp();
    this.createSpine();
    this.createHowToPlay();
  }

  private createBg(): void {
    const bg = new Sprite(this.game.getRecourse('bg'));
    bg.height = this.app.screen.height;
    bg.width = this.app.screen.width;
    this.addChild(bg);
    this.sortableChildren = true;
  }

  protected createHowToPlay(): void {
    this.setWindow = new SettingWindow(this, this.game, this.field, this.startPopUpButton, this.flipLabel);
    this.setWindow.height = this.app.screen.height;
    this.addChild(this.setWindow);
    this.setWindow.zIndex = 100;
    this.setWindow.name = 'how_to_play';
  }

  protected createSpine():void {
    this.character = new PIXI.spine.Spine(this.game.getRecourseSpine('spine'));

    this.character.y = 1000;
    this.character.x = 558;
    this.character.zIndex = 99;

    this.addChild(this.character);
    setTimeout(async () => {
      await this.setAnimation('Emma_idle_st', true);
      await this.setAnimation('Emma_idle_loop', true);
    });
  }
  public async setAnimation(name: string, loop: boolean) {
    // eslint-disable-next-line no-return-await
    return await new Promise((resolve) => {
      this.character.state.setAnimation(0, name, loop);
      this.character.state.addListener({
        complete: () => resolve(true),
      });
    });
  }

  protected createStartPopUp(): void {
    const styleLabel = {
      fontFamily: 'fontMuseo',
      fontSize: 65,
      fontWeight: 'normal',
      fill: 0xFFFFFF,
    };

    const styleLabelHow = {
      fontFamily: 'fontMuseo',
      fontSize: 65,
      fontWeight: 'normal',
      fill: 0xfc6400,
    };

    this.buttonLabel = new Label({
      label: 'Play for 5',
      style: styleLabel,
    });

    this.popUpLabel = new Label({
      label: 'How to play',
      style: styleLabelHow,
    });

    this.popUpLabel.addIcon({
      resource: this.game.getRecourse('question_2'),
      positionStart: true,
    });

    this.buttonLabel.addIcon({
      resource: this.game.getRecourse('coin3'),
      positionStart: false,

    });

    this.startPopUpButton = new Button({
      label: this.buttonLabel,
      resource: this.game.getRecourse('button'),
    });

    this.startPopUp = new StartPopUp({
      resource: this.game.getRecourse('start_pop_up'),
      names: 'startPopUp',
      button: this.startPopUpButton,
      label: this.popUpLabel,
      scene: this,
    });
    this.startPopUpButton.interactive = true;
    this.startPopUp.y = this.height - this.startPopUp.height + 40;
  }

  protected createFieldCards(): void {
    this.field = new CardsField({
      resource: this.game.getRecourse('field'),
      names: 'cardsField',
      cards: this.game.getRecourse('cards'),
    });
    this.field.y = this.height - this.field.height - (this.startPopUp.height / 2) - 60;
    this.field.x = (this.width - this.field.width) / 2;

    this.addChild(this.field);
    this.addChild(this.startPopUp);
    this.popUpLabel.interactive = true;
    this.popUpLabel.on('click', () => {
      this.setWindow.showSetting();
      this.startPopUpButton.interactive = false;
    });
  }

  protected createFlipLabel(): void {
    const styleLabel = {
      fontFamily: 'fontMuseo',
      fontSize: 95,
      fontWeight: 'normal',
      fill: 0xfc6400,
      wordWrap: true,
      wordWrapWidth: this.width / 1.5,
      align: 'center',
      stroke: '#ffffff',
      strokeThickness: 20,
    };
    this.flipLabelTop = new Label({
      label: "Flip'em all, match any two!",
      style: styleLabel,
    });
    this.addChild(this.flipLabelTop);
    this.flipLabelTop.x = (this.width - this.flipLabelTop.width) / 2;
    this.flipLabelTop.y = 320;
  }

  protected createResultPopUp():void {
    const styleLabel = {
      fontFamily: 'fontMuseo',
      fontSize: 65,
      fontWeight: 'normal',
      fill: 0xfc6400,
      wordWrap: true,
      wordWrapWidth: this.width / 1.7,
      align: 'center',
    };
    this.resultLabel = new Label({
      label: 'WIN COINS UP TO 1000 ',
      style: styleLabel,
    });
    this.resultPopUp = new ResultPopUp({
      resource: this.game.getRecourse('result_pop_up'),
      labelFirst: this.resultLabel,
    });

    this.resultLabel.addIcon({
      resource: this.game.getRecourse('coin2'),
      x: 398,
      y: 74,
    });

    this.addChild(this.resultPopUp);
    this.resultPopUp.name = 'result_popUp';
    this.resultPopUp.x = (this.width - this.resultPopUp.width) / 2;
    this.resultPopUp.y = this.resultPopUp.height;
  }

  protected createGameManager(flip, int): void {
    this.manager = new GameManager(this, this.game, this.field, flip, int);
  }

  protected createFlipForMe(): void {
    const styleLabel = {
      fontFamily: 'fontMuseo',
      fontSize: 65,
      fontWeight: 'normal',
      fill: 0xfc6400,
      wordWrap: true,
      wordWrapWidth: this.width / 1.7,
      align: 'center',
    };
    this.flipLabel = new Label({
      label: 'Flip for me',
      style: styleLabel,
    });
    this.flipIcon = new Icon({
      resource: this.game.getRecourse('question_2'),
    });
    this.addChild(this.flipLabel);
    this.flipLabel.x = 338;
    this.flipLabel.y = 2291;
    this.flipIcon.x = 765;
    this.flipIcon.y = 2291;
    this.addChild(this.flipIcon);
    this.flipIcon.interactive = true;
    this.flipIcon.on('click', () => {
      this.setWindow.showSetting();
      this.field.interactiveChildren = false;
      this.flipLabel.interactive = false;
    });
  }
  public restartGame(): void {
    this.startPopUp.moveUp();
  }

  protected getWin(): boolean {
    return true;
  }

  protected randomInteger(min:number, max: number): boolean {
    const randomVar = Math.floor(min + Math.random() * (max + 1 - min));
    let variable;
    if (randomVar >= 5) variable = true;
    else variable = false;

    return variable;
  }

  public startGame(): void {
    this.field.deleteTint();
    this.resultPopUp.move(this);
    const variable = this.randomInteger(1, 10);
    console.log(variable);

    this.createGameManager(this.flipLabel, variable);

    this.flipLabel.interactive = true;
  }
}
