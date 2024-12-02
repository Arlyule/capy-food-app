import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministrarApartadosNegocioComponent } from './administrar-apartados-negocio.component';

describe('AdministrarApartadosNegocioComponent', () => {
  let component: AdministrarApartadosNegocioComponent;
  let fixture: ComponentFixture<AdministrarApartadosNegocioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarApartadosNegocioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrarApartadosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
