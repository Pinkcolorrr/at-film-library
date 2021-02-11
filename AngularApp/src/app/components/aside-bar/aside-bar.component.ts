import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  public readonly opened$ = new BehaviorSubject(false);

  /**
   * Toggle opened$ state
   */
  public toggleSidenav(): void {
    this.opened$.next(!this.opened$.value);
  }

  constructor() {}
}
