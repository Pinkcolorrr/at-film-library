import React from 'react';
import { Unsubscribe } from 'redux';

/** Hoc for unsubscribing from data update */
export function withSubscription(Component: React.ElementType): React.ElementType {
  let unsubscribers: Unsubscribe[] = [];

  /** Psuh unsubscribe function in array */
  const pushUnsubscriber = (unsubscribe: Unsubscribe): void => {
    unsubscribers.push(unsubscribe);
  };

  /** Call all unsubscribe functions */
  const unsubscribeAll = (): void => {
    unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
  };

  /** Clear unsubscribe array */
  const clearUnsubscribers = () => {
    unsubscribers = [];
  };

  return (props): JSX.Element => (
    <Component
      {...props}
      clearUnsubscribers={clearUnsubscribers}
      pushUnsubscriber={pushUnsubscriber}
      unsubscribeAll={unsubscribeAll}
    />
  );
}
