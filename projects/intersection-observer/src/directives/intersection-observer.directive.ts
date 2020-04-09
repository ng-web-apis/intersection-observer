import {Attribute, Directive, Inject, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IntersectionObserverService} from '../services/intersection-observer.service';
import {
    INTERSECTION_ROOT_MARGIN,
    INTERSECTION_ROOT_MARGIN_DEFAULT,
} from '../tokens/intersection-root-margin';
import {
    INTERSECTION_THRESHOLD,
    INTERSECTION_THRESHOLD_DEFAULT,
} from '../tokens/intersection-threshold';

export function rootMarginFactory(rootMargin: string | null): string {
    return rootMargin || INTERSECTION_ROOT_MARGIN_DEFAULT;
}

export function thresholdFactory(threshold: string | null): number | number[] {
    return threshold
        ? threshold.split(',').map(parseFloat)
        : INTERSECTION_THRESHOLD_DEFAULT;
}

@Directive({
    selector: '[waIntersectionObserver]',
    providers: [
        IntersectionObserverService,
        {
            provide: INTERSECTION_ROOT_MARGIN,
            deps: [[new Attribute('waIntersectionRootMargin')]],
            useFactory: rootMarginFactory,
        },
        {
            provide: INTERSECTION_THRESHOLD,
            deps: [[new Attribute('waIntersectionThreshold')]],
            useFactory: thresholdFactory,
        },
    ],
})
export class IntersectionObserverDirective {
    @Output()
    readonly waIntersectionObserver: Observable<IntersectionObserverEntry[]>;

    constructor(
        @Inject(IntersectionObserverService)
        entries$: Observable<IntersectionObserverEntry[]>,
        @Attribute('waIntersectionRootMargin') _margin: string | null,
        @Attribute('waIntersectionThreshold') _threshold: string | null,
    ) {
        this.waIntersectionObserver = entries$;
    }
}
