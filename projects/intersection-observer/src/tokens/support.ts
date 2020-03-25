import {inject, InjectionToken} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';

// TODO: Remove when moved to Angular 10
declare global {
    interface Window {
        IntersectionObserver: IntersectionObserver;
    }
}

export const INTERSECTION_OBSERVER_SUPPORT = new InjectionToken<boolean>(
    'Intersection Observer API support',
    {
        providedIn: 'root',
        factory: () => !!inject(WINDOW).IntersectionObserver,
    },
);
