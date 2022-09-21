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
export const flipInX = trigger('flipInX', [
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

export const flipInY = trigger('flipInY', [
    transition(':enter', [
        style({ 'backface-visibility': 'visible' }),
        animate(
          '1s 0s ease-in',
          keyframes([
            style({
              opacity: 0,
              transform:
                'perspective(400px) rotate3d(0, 1, 0, 90deg)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform:
                'perspective(400px) rotate3d(0, 1, 0, -20deg)',
              offset: 0.4,
            }),
            style({
              transform:
                'perspective(400px) rotate3d(0, 1, 0, 10deg)',
              offset: 0.6,
            }),
            style({
              transform:
                'perspective(400px) rotate3d(0, 1, 0, -5deg)',
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

export const flipOutX = trigger('flipOutX', [
    transition(':enter', [
        style({ 'backface-visibility': 'visible' }),
        animate(
          '1s 0s',
          keyframes([
            style({
                transform: 'perspective(400px)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform:
                    'perspective(400px) rotate3d(1, 0, 0, -20deg)',
                offset: 0.3,
            }),
            style({
                opacity: 0,
                transform:
                    'perspective(400px) rotate3d(1, 0, 0, 90deg)',
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

export const flipOutY = trigger('flipOutY', [
    transition(':enter', [
        style({ 'backface-visibility': 'visible' }),
        animate(
          '1s 0s',
          keyframes([
            style({
                transform: 'perspective(400px)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform:
                    'perspective(400px) rotate3d(0, 1, 0, -20deg)',
                offset: 0.3,
            }),
            style({
                opacity: 0,
                transform:
                    'perspective(400px) rotate3d(0, 1, 0, 90deg)',
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