/* eslint-disable no-return-await */
import * as PIXI from 'pixi.js';
import {
  Application, Container, Loader, LoaderResource, Texture,
} from 'pixi.js';
import { WebfontLoaderPlugin } from 'pixi-webfont-loader';
import Scene from './mechanics/Scene';

const globalAny : any = global;
globalAny.window.PIXI = PIXI;
Loader.registerPlugin(WebfontLoaderPlugin);
export default class Game {
    private app: Application;
    protected mainContainer: Container;
    private arrResources: LoaderResource[] = [];
    protected scene: Scene;
    constructor() {
      this.buildGame();
    }

    public async buildGame() {
      await this.loadAssets();
      await this.init();

      this.scene = new Scene(this);
      this.mainContainer.addChild(this.scene);
      this.scene.sortableChildren = true;
    }

    private init() {
      this.app = new PIXI.Application({
        width: 1125,
        height: 2436,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
      });

      this.mainContainer = new Container();
      this.app.stage.addChild(this.mainContainer);
      document.body.appendChild(this.app.view);
    }

    public getApp() {
      return this.app;
    }

    private async loadAssets(): Promise<boolean> {
      const loader = new Loader();

      loader.add('bg', './assets/BG.png')
        .add('start_pop_up', './assets/pop_up_2.png')
        .add('result_pop_up', './assets/pop_up_1.png')
        .add('button', './assets/button_1.png')
        .add('coin1', './assets/coin_1.png')
        .add('coin2', './assets/coin_2.png')
        .add('coin3', './assets/coin_3.png')
        .add('field', './assets/Artboard 15.png')
        .add('cards', './assets/Artboard 14.png')
        .add('question_2', './assets/question_2.png')
        .add('firstBgCard', './assets/card_3.png')
        .add('secondBgCard', './assets/card_1.png')
        .add('close_icon', './assets/close_icon.png')
        .add('icon_game', './assets/icon.png')
        .add('how_to_play', './assets/how_to_play.png')
        .add('settingBg', './assets/Flip It Emma theme.png')
        .add('border', './assets/glow.png')
        .add('bigStar', './assets/star.png')
        .add('spine', './assets/characterEmma/Emma.json')
        .add('fontMuseo', './assets/fonts/900.ttf');

      return await new Promise((resolve) => {
        loader.load((_loader, resources) => {
          for (const key in resources) {
            if (Object.prototype.hasOwnProperty.call(resources, key)) {
              this.arrResources.push(resources[key]);
            }
          }
          resolve(true);
        });
      });
    }

    public getRecourse(name: string): Texture {
      let texture = null;
      for (let i = 0; i < this.arrResources.length; i++) {
        const element = this.arrResources[i];

        if (element.name === name) {
          texture = element.texture;
        }
      }

      return texture;
    }

    public getRecourseSpine(name: string): any {
      let texture = null;
      for (let i = 0; i < this.arrResources.length; i++) {
        const element = this.arrResources[i];

        if (element.name === name) {
          // @ts-ignore
          texture = element.spineData;
        }
      }

      return texture;
    }
}

const game = new Game();
