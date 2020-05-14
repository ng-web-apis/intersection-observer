import {Attribute, Directive, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {IntersectionObserverService} from '../services/intersection-observer.service';
import {INTERSECTION_ROOT_MARGIN} from '../tokens/intersection-root-margin';
import {INTERSECTION_THRESHOLD} from '../tokens/intersection-threshold';
import {rootMarginFactory} from '../utils/root-margin-factory';
import {thresholdFactory} from '../utils/threshold-factory';

@Directive({
    selector: '[waIntersection]',
    outputs: ['waIntersection'],
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
export class IntersectionDirective {
    constructor(
        @Inject(IntersectionObserverService)
        readonly waIntersection: Observable<IntersectionObserverEntry[]>,
        @Attribute('waIntersectionRootMargin') _margin: string | null,
        @Attribute('waIntersectionThreshold') _threshold: string | null,
    ) {}
}
