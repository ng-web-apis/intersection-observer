import {Attribute, Directive, ElementRef, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {IntersectionObserverService} from '../services/intersection-observer.service';
import {INTERSECTION_ROOT_MARGIN} from '../tokens/intersection-root-margin';
import {INTERSECTION_THRESHOLD} from '../tokens/intersection-threshold';
import {rootMarginFactory} from '../utils/root-margin-factory';
import {thresholdFactory} from '../utils/threshold-factory';

// TODO: Use new Attribute('waIntersectionRootMargin') after https://github.com/angular/angular/issues/36479 is fixed
export function rootMarginExtractor({nativeElement}: ElementRef<Element>): string {
    return rootMarginFactory(nativeElement.getAttribute('waIntersectionRootMargin'));
}

export function thresholdExtractor({
    nativeElement,
}: ElementRef<Element>): number | number[] {
    return thresholdFactory(nativeElement.getAttribute('waIntersectionThreshold'));
}

@Directive({
    selector: '[waIntersection]',
    outputs: ['waIntersection'],
    providers: [
        IntersectionObserverService,
        {
            provide: INTERSECTION_ROOT_MARGIN,
            deps: [ElementRef],
            useFactory: rootMarginExtractor,
        },
        {
            provide: INTERSECTION_THRESHOLD,
            deps: [ElementRef],
            useFactory: thresholdExtractor,
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
