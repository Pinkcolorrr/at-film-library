import React from 'react';
import { Unsubscribe } from 'redux';

export function withSubscription(Component: React.ElementType): React.ElementType {
  let unsubscribers: Unsubscribe[] = [];

  const pushUnsubscriber = (unsubscribe: Unsubscribe): void => {
    unsubscribers.push(unsubscribe);
  };

  const unsubscribeAll = (): void => {
    unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
  };

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
