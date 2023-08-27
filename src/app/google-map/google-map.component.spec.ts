import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapComponent } from './google-map.component';
import { google } from 'src/app/google-map/google-map.component.mock'; 

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;

  beforeAll(() => {
    // google モックをグローバルに割り当て
    (window as any).google = google;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleMapComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 必要に応じて他のテストケースを追加してください。
});
