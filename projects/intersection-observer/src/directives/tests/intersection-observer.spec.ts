import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {IntersectionObserverModule} from '../../module';

describe('IntersectionObserverDirective', () => {
    @Component({
        template: `
            <section
                id="observer_root"
                style="position: relative; height: 200px; overflow: auto;"
                waIntersectionRoot
            >
                <div style="height: 900px;">Height expander</div>
                <h1
                    *ngIf="observe"
                    style="position: absolute; top: 200px; height: 200px;"
                    waIntersectionThreshold="0.5"
                    (waIntersectionObserver)="withRoot($event)"
                >
                    I'm being observed
                </h1>
                <h1
                    style="position: absolute; top: 200px; height: 200px;"
                    waIntersectionRootSelector="#observer_root"
                    (waIntersectionObserver)="withSelector($event)"
                >
                    I'm being observed
                </h1>
            </section>
        `,
    })
    class TestComponent {
        withRoot = jasmine.createSpy('withRoot');
        withSelector = jasmine.createSpy('withSelector');
        observe = true;
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IntersectionObserverModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        testComponent.withSelector.calls.reset();
        testComponent.withRoot.calls.reset();
    });

    it('Emits intersections', done => {
        document.querySelector('#observer_root')!.scrollTop = 350;
        fixture.detectChanges();

        setTimeout(() => {
            expect(testComponent.withRoot).toHaveBeenCalled();
            expect(testComponent.withSelector).toHaveBeenCalled();
            testComponent.observe = false;
            fixture.detectChanges();
            done();
        }, 100);
    });
});
