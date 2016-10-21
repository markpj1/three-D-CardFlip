"use strict";

class SCFlipCard extends HTMLElement {

  static get SIDES () {
    return {
      FRONT: 1,
      BACK: 2
    };
  }
 //scale value perspective / (perspective + translate(z))
  flip () {
    const scale = (500 + 200) / 500;

    const sideOne = [
        {transform: `translateZ(-200px) rotateY(0deg) scale(${scale})`},
        {transform: `translateZ(-100px) rotateY(0deg) scale(${scale})`, offset: 0.15},
        {transform: `translateZ(-100px) rotateY(180deg) scale(${scale})`, offset: 0.65},
        {transform: `translateZ(-200px) rotateY(180deg) scale(${scale})`}
      ];

      const sideTwo = [
        {transform: `translateZ(-200px) rotateY(180deg) scale(${scale})`},
        {transform: `translateZ(-100px) rotateY(180deg) scale(${scale})`, offset: 0.15},
        {transform: `translateZ(-100px) rotateY(360deg) scale(${scale})`, offset: 0.65},
        {transform: `translateZ(-200px) rotateY(360deg) scale(${scale})`}
      ];

      const umbra = [
        {opacity: 0.3, transform: 'translateY(2px) rotateY(0deg)'},
        {opacity: 0.0, transform: 'translateY(62px) rotateY(0deg)', offset: 0.15},
        {opacity: 0.0, transform: 'translateY(62px) rotateY(180deg)', offset: 0.65},
        {opacity: 0.3, transform: 'translateY(2px) rotateY(180deg)'}

      ];

      const penumbra = [
        {opacity: 0.0, transform: 'translateY(2px) rotateY(0deg)'},
        {opacity: 0.5, transform: 'translateY(62px) rotateY(0deg)', offset: 0.15},
        {opacity: 0.5, transform: 'translateY(62px) rotateY(180deg)', offset: 0.65},
        {opacity: 0.0, transform: 'translateY(2px) rotateY(180deg)'}

      ];

    const timing = {
      duration: 900,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    switch (this._side) {
      case SCFlipCard.SIDES.FRONT:
        this._front.animate(sideOne, timing);
        this._back.animate(sideTwo, timing);
        break;

      case SCFlipCard.SIDES.BACK:
        this._front.animate(sideTwo, timing);
        this._back.animate(sideOne, timing);
        break;

        default:
          throw new Error('Unknown side');
    }
    this._umbra.animate(umbra, timing);
    this._penumbra.animate(penumbra, timing);

    this._side = (this._side === SCFlipCard.SIDES.FRONT) ?
    SCFlipCard.SIDES.BACK :
    SCFlipCard.SIDES.FRONT;

  }

  createdCallback () {
    this._side = SCFlipCard.SIDES.FRONT;
    this._front = this.querySelector('.front');
    this._back = this.querySelector('.back');
    this._buttons = this.querySelectorAll('button');
    this._umbra = this.querySelector('.umbra');
    this._penumbra = this.querySelector('.penumbra');
  }

  attachedCallback () {
    Array.from(this._buttons)
    .forEach(b => {
      b.addEventListener('click', _ => this.flip());
    });
  }


  detachedCallback () {

  }
}

document.registerElement('sc-card', SCFlipCard);
