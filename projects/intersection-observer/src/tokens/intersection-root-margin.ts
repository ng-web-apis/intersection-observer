import {InjectionToken} from '@angular/core';

export const INTERSECTION_ROOT_MARGIN = new InjectionToken<string>(
    'rootMargin for IntersectionObserver',
    {
        providedIn: 'root',
        factory: () => '0px 0px 0px 0px',
    },
);
