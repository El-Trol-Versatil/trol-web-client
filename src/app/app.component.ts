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
      url: '/folder/Inbox',
      icon: 'color-palette',
      description: 'Create a new net of troll bots',
    },
    {
      title: 'My trollnets',
      url: '/folder/Archived',
      icon: 'construct',
      description: 'Manage your trollnets',
    },
    {
      title: 'Profile',
      url: '/folder/Trash',
      icon: 'person',
      description: 'Customize your profile details',
    },
    {
      title: 'Payment',
      url: '/folder/Favorites',
      icon: 'cash',
      description: 'Manage payments and payment history',
    },
    {
      title: 'Settings',
      url: '/folder/Spam',
      icon: 'settings',
      description: 'App settings and notifications',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
