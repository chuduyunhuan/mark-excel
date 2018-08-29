import { APP_INITIALIZER, Provider, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export function bootstrapFactory (
    http: HttpClient,
) {
  return async function () {

    await Promise.resolve(42);

    // more init define done below

  };
}


export const appInitProviders: Provider[] = [

  <FactoryProvider>{
    provide: APP_INITIALIZER,
    useFactory: bootstrapFactory,
    multi: true,
    deps: [
      HttpClient,
    ],
  },

];

