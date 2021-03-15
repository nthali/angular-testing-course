import { fakeAsync, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async tests", () => {

    it("demonstrates async testing with jasmine done", (done:DoneFn) => {
        let test = false;

        setTimeout( () => {
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it("demonstrates async testing with Angular's fakeAsync", fakeAsync(() => {
        let test = false;

        setTimeout( () => {
            console.log("running fakeasync test");
            test = true;
        }, 1000);
        tick(1000);
        expect(test).toBeTruthy();
    }));

    it( "demonstrates async Promises testing with fakeAsync", fakeAsync(() => {
        let test = false;

        console.log("Creating immediately resolved promise");
        Promise.resolve().then( () => {
            console.log( "inside immediately resolved promise");
            test = true;
        });
        flushMicrotasks();
        console.log("running assertions");
        expect(test).toBeTruthy();
    }));

    it("demonstrates testing Promise + setTimeout", fakeAsync(() => {
        let counter = 0;

        Promise.resolve().then( () => {
            counter += 10;

            setTimeout( () => {
                counter += 1;
            }, 1000);
        });

        expect( counter ).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(11);

    }));

    it('demonstrates testing setTimeout + Promise', fakeAsync(() => {
        let counter = 0;
        setTimeout( () => {
            counter += 1;
            Promise.resolve().then( () => {
                counter += 10;
            });
        }, 1000);
        expect(counter).toBe(0);
        // important to understand that the flushMicrotasks() is called
        // at the start of the tick() so can't separate those two
        tick(1000);
        expect(counter).toBe(11);
    }));

    it("demonstrates testing of Observables", fakeAsync(() => {
        let test = false;

        const test$ = of(test).pipe(delay(1000));

        test$.subscribe( () => {
            test = true;
        });
        tick(1000);
        expect(test).toBeTruthy();
    }));
});