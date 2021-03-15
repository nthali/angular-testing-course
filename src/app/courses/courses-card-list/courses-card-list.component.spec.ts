import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';
import { componentFactoryName } from '@angular/compiler';




describe('CoursesCardListComponent', () => {

  let courseList: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let debugElement: DebugElement;

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      imports: [CoursesModule]
    })
    .compileComponents()
    .then( () => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      courseList = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });
  }));

  it("should create the component", () => {

    expect(courseList).toBeTruthy();

  });


  it("should display the course list", () => {

    courseList.courses = setupCourses();
    // critical!
    fixture.detectChanges();
    const cards = debugElement.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(12);
  });


  it("should display the first course", () => {

    courseList.courses = setupCourses();
    // critical!
    fixture.detectChanges();
    const card = debugElement.query(By.css(".course-card:first-child"));
    expect(card).toBeTruthy();

    const title = debugElement.query(By.css("mat-card-title"));
    expect(title.nativeElement.textContent).toBe(courseList.courses[0].titles.description);

    const imgUrl = debugElement.query(By.css("img"));
    expect(imgUrl.nativeElement.src).toBe(courseList.courses[0].iconUrl);
  });


});


