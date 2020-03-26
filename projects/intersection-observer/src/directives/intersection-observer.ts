import {Attribute, Directive, Inject, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {IntersectionObserverService} from '../services/intersection-observer.service';
import {INTERSECTION_ROOT_MARGIN} from '../tokens/intersection-root-margin';
import {INTERSECTION_THRESHOLD} from '../tokens/intersection-threshold';

export function rootMarginFactory(rootMargin: string | null): string | null {
    return rootMargin;
}

export function thresholdFactory(threshold: string | null): number[] | null {
    return threshold ? threshold.split(',').map(value => parseFloat(value)) : null;
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
        @Inject(IntersectionObserverService) service: IntersectionObserverService,
    ) {
        this.waIntersectionObserver = service;
    }
}
