import { trigger, state, style, animate, transition, query, group , animateChild} from '@angular/animations';

/** ANIMACION DE DESLIZAMIENTO ENTRE RUTAS */
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('enviomail => enviocodigo', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-in-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    // -----------------------------------------------------------------------------------------
    transition('enviocodigo => enviopass', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-in-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-in-out', style({ right: '0%' }))   // ease-in-out
        ])
      ]),
      query(':enter', animateChild()),
    ]),
      // -----------------------------------------------------------------------------------------
      transition('enviocodigo => enviomail', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
              style({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%'
              })
          ]),
          query(':enter', [
              style({ left: '-100%' })
          ]),
          query(':leave', animateChild()),
          group([
              query(':leave', [
                  animate('1000ms ease-in-out', style({ left: '100%' }))
              ]),
              query(':enter', [
                  animate('1000ms ease-in-out', style({ left: '0%' }))   // ease-in-out
              ])
          ]),
          query(':enter', animateChild()),
      ]),
      // -----------------------------------------------------------------------------------------
      transition('enviopass => enviocodigo', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
              style({
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%'
              })
          ]),
          query(':enter', [
              style({ left: '-100%' })
          ]),
          query(':leave', animateChild()),
          group([
              query(':leave', [
                  animate('1000ms ease-in-out', style({ left: '100%' }))
              ]),
              query(':enter', [
                  animate('1000ms ease-in-out', style({ left: '0%' }))   // ease-in-out
              ])
          ]),
          query(':enter', animateChild()),
      ])
  ]);

/** ANIMACION DE DESPLEGABLE NAV BAR MENU */
export const navbar =
trigger('entrada', [
    state('true', style({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        textAlign: 'right',
        transform: 'translateY(0) scaleY(1)'
    })),
    state('false', style({
        backgroundColor: '#ffffff',
        transform: 'translateY(-50%) scaleY(0)',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right'
    })),
    transition('true <=> false', animate(300) )
]);
