import {IntersectionObserverService} from '../intersection-observer.service';

describe('IntersectionObserverService', () => {
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
