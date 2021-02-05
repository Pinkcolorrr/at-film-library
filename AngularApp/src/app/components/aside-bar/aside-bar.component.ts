import { Component } from '@angular/core';

/**
 * Aside bar component
 */
@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.css'],
})
export class AsideBarComponent {
  /**
   * Boolean var for toggle aside bar
   */
  public opened = false;

  constructor() {}
}
