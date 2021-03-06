import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {


  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have menu labels', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(5);
    expect(menuItems[0].textContent).toContain('New trollnet');
    expect(menuItems[1].textContent).toContain('My trollnets');
    expect(menuItems[2].textContent).toContain('Profile');
    expect(menuItems[3].textContent).toContain('Payment');
    expect(menuItems[4].textContent).toContain('Settings');
  }));

  it('should have urls', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(5);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/create');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/gallery');
    expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual('/profile');
    expect(menuItems[3].getAttribute('ng-reflect-router-link')).toEqual('/payment');
    expect(menuItems[4].getAttribute('ng-reflect-router-link')).toEqual('/settings');
  }));

});
