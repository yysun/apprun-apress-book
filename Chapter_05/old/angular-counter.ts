import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';

@Component({
  selector: 'app',
  template: `
    <h1>{{counter}}</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="decrement()">Decrement</button>`
})
export class App {
  public counter: number = 0;

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }
}

bootstrap(App, []);