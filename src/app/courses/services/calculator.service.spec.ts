import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    let calc: CalculatorService;
    let loggerSpy: LoggerService;

    beforeEach( () => {
        loggerSpy = jasmine.createSpyObj('LoggerService', [ 'log' ] );
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });
        calc = TestBed.inject(CalculatorService);
    });

    it('should add two numbers', () => {
        // const logger = new LoggerService();
        // spyOn(logger, 'log');
        expect( calc.add(2, 2) ).toBe(4);
        expect( loggerSpy.log ).toHaveBeenCalledTimes(1);
    });
    
    it('should subtract two numbers', () => {
        expect( calc.subtract(2, 2) ).toBe(0);
        expect( loggerSpy.log ).toHaveBeenCalledTimes(1);
    });
});