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

export const testAnimation = trigger('testAnimation', [
  transition(':enter', [
    style({ height: 0, visibility: 'hidden' }),
    animate('300ms ease-out', style({ height: AUTO_STYLE}))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ height: 0, visibility: 'hidden' }))
  ])
])