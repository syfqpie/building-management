import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const slideLeftRightAnimation = trigger('slideLeftRight', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('200ms ease-in', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
    ])
])