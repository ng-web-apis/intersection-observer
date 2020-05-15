import {IntersectionObserverService} from '../intersection-observer.service';

describe('IntersectionObserverService', () => {
    it('works', () => {
        let called = false;
        const service = new IntersectionObserverService(
            {
                nativeElement: document.createElement('DIV'),
            },
            true,
            '0px 0px 0px 0px',
            0,
            {
                nativeElement: document.body,
            },
        );

        service.subscribe({
            next: () => {
                called = true;
            },
        });

        expect(called).toBe(true);
    });

    it('throws when not supported', () => {
        let error = false;
        const service = new IntersectionObserverService(
            {
                nativeElement: document.createElement('DIV'),
            },
            false,
            '0px 0px 0px 0px',
            0,
            null,
        );

        service.subscribe({
            error: () => {
                error = true;
            },
        });

        expect(error).toBe(true);
    });
});
