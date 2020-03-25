import {InjectionToken} from '@angular/core';

export const INTERSECTION_ROOT = new InjectionToken<HTMLElement>(
    'Root element for IntersectionObserver',
);
