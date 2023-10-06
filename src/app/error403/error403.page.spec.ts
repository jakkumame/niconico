import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error403Page } from './error403.page';

describe('Error403Page', () => {
  let component: Error403Page;
  let fixture: ComponentFixture<Error403Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Error403Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
