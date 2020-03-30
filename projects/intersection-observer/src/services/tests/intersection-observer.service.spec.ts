import {IntersectionObserverService} from '../intersection-observer.service';

describe('IntersectionObserverService', () => {
    it('throws when not supported', () => {
        let error = false;
        const service = new IntersectionObserverService(
            {
                nativeElement: document.createElement('DIV'),
            },
            false,
            null,
            null,
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
