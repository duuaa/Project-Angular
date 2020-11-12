import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from "@angular/common/http/testing";
 
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DISHES } from '../shared/dishes';
import { BaseURL } from '../shared/baseurl';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('MenuComponent', () => {
  
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  // let localStorageMock: Partial<LocalStorageService>;

  beforeEach(async(() => {

    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }]),
         HttpClientTestingModule

      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: BaseURL }

      ]
    })
    .compileComponents();

    const dishservice = TestBed.get(DishService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();});

  it('should use dishes in the tamplate',()=>{
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;
    
    de=fixture.debugElement.query(By.css('h1'));
    el= de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());
  });
});
