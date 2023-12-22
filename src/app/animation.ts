import { transition,style,animate,trigger } from "@angular/animations"


export const slideRightAnimation = trigger('slideRight', [
    transition(':enter', [
      style({ opacity: 0, left: '-100%' }),
      animate('500ms ease', style({ opacity: 1, left: '0%' })),
    ]),
    transition(':leave', [
      animate('500ms ease', style({ opacity: 0, left: '-100%' })),
    ]),
])