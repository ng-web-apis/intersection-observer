import {Directive, ElementRef} from '@angular/core';
import {INTERSECTION_ROOT} from '../tokens/intersection-root';

export function intersectionRootFactory({
    nativeElement,
}: ElementRef<HTMLElement>): HTMLElement {
    return nativeElement;
}

@Directive({
    selector: '[waIntersectionRoot]',
    providers: [
        {
            provide: INTERSECTION_ROOT,
            deps: [ElementRef],
            useFactory: intersectionRootFactory,
        },
    ],
})
export class IntersectionRootDirective {}
