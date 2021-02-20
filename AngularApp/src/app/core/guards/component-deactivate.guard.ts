import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Interface for sharing guard in some components
 */
export interface CanComponentDeactivate {
  /**
   * Every component have to implement caDeactivate method,
   * to check if a component can be deactivated
   */
  canDeactivate: () => Observable<boolean> | boolean;
}

/**
 * Check if a component can be deactivated
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  /**
   * Method that checks if the component can be deactivated
   */
  public canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate();
  }
}
