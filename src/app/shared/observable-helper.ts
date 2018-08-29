import sleeep from 'sleeep';

import { Observable } from 'rxjs/Observable';
import { AnonymousSubscription } from 'rxjs/Subscription';



export class Bucket {

  private readonly subscriptions = new Set<AnonymousSubscription>();

  readonly add = (...subscription: AnonymousSubscription[]) => {
    subscription.forEach(item => this.subscriptions.add(item));
    return this;
  }

  readonly release = () => {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions.clear();
  }

}


export function sleep (seconds = 0) {
  return sleeep(seconds * 1000);
}


export function deepMap <T, R> (project: (value: T, index: number) => R) {
  return function (source: Observable<T[]>) {
    return source.map(list => list.map(project));
  };
}

