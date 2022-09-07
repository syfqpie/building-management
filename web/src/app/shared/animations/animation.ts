import {
  animate,
  animation,
  AUTO_STYLE,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

export const collapsedAnimation = trigger('collapsed', [
  transition(':enter', [
    style({ 
      height: 0,
      visibility: 'hidden'
    }),
    animate('300ms ease-out', style({
      height: AUTO_STYLE,
      visibility: AUTO_STYLE,
      overflow: AUTO_STYLE 
    }))
  ]),
  transition(':leave', [
    style({
      height: AUTO_STYLE,
      visibility: AUTO_STYLE,
      overflow: 'hidden'
    }),
    animate('300ms ease-in', style({
      height: 0,
      visibility: 'hidden',
      overflow: 'hidden'
    }))
  ])
])

export const slideLeftRightAnimation = trigger('slideLeftRight', [
  state('in', style({
    width: '*',
    transform: 'translateX(0)', opacity: 1
  })),
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('0.3s ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({transform: 'translateX(-100%)'}))
  ])
])

export const inOutAnimation = trigger('inOutAnimation', [
  state('in', style({
    width: '*',
    transform: 'translateX(0)', opacity: 1
  })),
  transition(':enter', [
    style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
    group([
      animate('0.3s 0.1s ease', style({
        transform: 'translateX(0)',
        width: '*'
      })),
      animate('0.3s ease', style({
        opacity: 1
      }))
    ])
  ]),
  transition(':leave', [
    group([
      animate('0.3s ease', style({
        transform: 'translateX(50px)',
        width: 10
      })),
      animate('0.3s 0.2s ease', style({
        opacity: 0
      }))
    ])
  ])
])

export const headshake = trigger('headshake', [
  transition(':enter', [
    animate(
      '1s 0s ease-in-out',
      keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-6px) rotateY(-9deg)', offset: 0.065 }),
        style({ transform: 'translateX(5px) rotateY(7deg)', offset: 0.185 }),
        style({ transform: 'translateX(-3px) rotateY(-5deg)', offset: 0.315 }),
        style({ transform: 'translateX(2px) rotateY(3deg)', offset: 0.435 }),
        style({ transform: 'translateX(0)', offset: 0.5 }),
      ])
    )
  ])
])

export const flip = trigger('flip', [
  transition(':enter', [
    style({ 'backface-visibility': 'visible' }),
    animate(
      '1s 0s ease-out',
      keyframes([
        style({
          transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)',
          offset: 0,
        }),
        style({
          transform:
            'perspective(400px) scale3d(1.5, 1.5, 1.5) rotate3d(0, 1, 0, -190deg)',
          offset: 0.4,
        }),
        style({
          transform:
            'perspective(400px) scale3d(1.5, 1.5, 1.5) rotate3d(0, 1, 0, -170deg)',
          offset: 0.5,
        }),
        style({
          transform: 'perspective(400px) scale3d(.95, .95, .95)',
          offset: 0.8,
        }),
        style({
          transform: 'perspective(400px)',
          offset: 1,
        }),
      ])
    )
  ])
])

export const flipInX = trigger('flipInX', [])
export const flipInY = trigger('flipInY', [])
export const flipOutX = trigger('flipOutX', [])
export const flipOutY = trigger('flipOutY', [])

export const testAnimation = trigger('testAnimation', [
  transition(':enter', [
    style({ 'backface-visibility': 'visible' }),
    animate(
      '1s 0s ease-in',
      keyframes([
        style({
          opacity: 0,
          transform:
            'perspective(400px) rotate3d(1, 0, 0, 90deg)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform:
            'perspective(400px) rotate3d(1, 0, 0, -20deg)',
          offset: 0.4,
        }),
        style({
          transform:
            'perspective(400px) rotate3d(1, 0, 0, 10deg)',
          offset: 0.6,
        }),
        style({
          transform:
            'perspective(400px) rotate3d(1, 0, 0, -5deg)',
          offset: 0.8,
        }),
        style({
          transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
          offset: 1,
        }),
      ])
    ),
  ]),
  transition(':leave', [
    style({ 
      opacity: AUTO_STYLE,
    }),
    animate('0s ease-out', style({ 
      opacity: 0,
    }))
  ])
])

// transition(':enter', [
//   style({ 
//     visibility: 'hidden',
//     opacity: 0,
//   }),
//   animate('250ms 250ms ease-in', style({ 
//     visibility: AUTO_STYLE,
//     opacity: AUTO_STYLE,
//   }))
// ]),
// transition(':leave', [
//   style({ 
//     visibility: AUTO_STYLE,
//     opacity: AUTO_STYLE,
//   }),
//   animate('0s ease-in', style({ 
//     visibility: 'hidden',
//     opacity: 0,
//   }))
// ])