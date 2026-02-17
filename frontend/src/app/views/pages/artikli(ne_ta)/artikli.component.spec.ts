import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikliComponent } from './artikli.component';

describe('ArtikliComponent', () => {
  let component: ArtikliComponent;
  let fixture: ComponentFixture<ArtikliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
