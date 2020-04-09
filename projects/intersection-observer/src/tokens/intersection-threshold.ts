import {InjectionToken} from '@angular/core';

export const INTERSECTION_THRESHOLD = new InjectionToken<number | number[]>(
    'threshold for IntersectionObserver',
    {
        providedIn: 'root',
        factory: () => 0,
    },
);
