import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'New trollnet',
      url: '/create',
      icon: 'color-palette',
      description: 'Create a new net of troll bots',
    },
    {
      title: 'My trollnets',
      url: '/gallery',
      icon: 'construct',
      description: 'Manage your trollnets',
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person',
      description: 'Customize your profile details',
    },
    {
      title: 'Payment',
      url: '/payment',
      icon: 'cash',
      description: 'Manage payments and payment history',
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
      description: 'App settings and notifications',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
