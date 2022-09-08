import {
    animate,
    keyframes,
    style,
    transition,
    trigger
  } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition('* => *', [
        animate(
            '0.3s 0s',
            keyframes([
              style({
                opacity: 0,
                transform: 'translate3d(0, 0, 0)',
                offset: 0,
              }),
              style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
                offset: 1,
              }),
            ])
        )
    ])
])

export const fadeInUp = trigger('fadeInUp', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                    opacity: 0,
                    transform: 'translate3d(0, 100%, 0)',
                    offset: 0,
                }),
                style({
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    offset: 1,
                }),
            ])
        ),
    ])
])

export const fadeInDown = trigger('fadeInDown', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                    opacity: 0,
                    transform: 'translate3d(0, -100%, 0)',
                    offset: 0,
                }),
                style({
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    offset: 1,
                }),
            ])
        ),
    ])
])

export const fadeInLeft = trigger('fadeInLeft', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                  opacity: 0,
                  transform: 'translate3d(-100%, 0, 0)',
                  offset: 0,
                }),
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1,
                }),
            ])
        ),
    ])
])

export const fadeInRight = trigger('fadeInRight', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                  opacity: 0,
                  transform: 'translate3d(100%, 0, 0)',
                  offset: 0,
                }),
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1,
                }),
            ])
        ),
    ])
])

export const fadeOut = trigger('fadeOut', [
    transition('* => *', [
        animate(
            '0.3s 0s',
            keyframes([
              style({
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
                offset: 1,
              }),
              style({
                opacity: 0,
                transform: 'translate3d(0, 0, 0)',
                offset: 0,
              }),
            ])
        )
    ])
])

export const fadeOutUp = trigger('fadeOutUp', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    offset: 1,
                }),
                style({
                    opacity: 0,
                    transform: 'translate3d(0, 100%, 0)',
                    offset: 0,
                }),
            ])
        ),
    ])
])

export const fadeOutDown = trigger('fadeOutDown', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    offset: 1,
                }),
                style({
                    opacity: 0,
                    transform: 'translate3d(0, -100%, 0)',
                    offset: 0,
                }),
            ])
        ),
    ])
])

export const fadeOutLeft = trigger('fadeOutLeft', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1,
                }),
                style({
                  opacity: 0,
                  transform: 'translate3d(-100%, 0, 0)',
                  offset: 0,
                }),
            ])
        ),
    ])
])

export const fadeOutRight = trigger('fadeOutRight', [
    transition('* => *', [
        animate(
            '0.8s 0s',
            keyframes([
                style({
                  opacity: 1,
                  transform: 'translate3d(0, 0, 0)',
                  offset: 1,
                }),
                style({
                  opacity: 0,
                  transform: 'translate3d(100%, 0, 0)',
                  offset: 0,
                }),
            ])
        ),
    ])
])