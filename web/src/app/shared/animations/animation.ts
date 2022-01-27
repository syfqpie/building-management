import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation
} from '@angular/animations';

export const slideLeftRightAnimation = trigger('slideLeftRight', [
  transition(':enter', [
    style({transform: 'translateX(-100%)'}),
    animate('0.3s ease-in', style({transform: 'translateY(0%)'}))
  ]),
  transition(':leave', [
    animate('0.3s ease-in', style({transform: 'translateX(-100%)'}))
  ])
])