import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
 
  visibility: BehaviorSubject<boolean>;
 
  constructor() {
    this.visibility = new BehaviorSubject(false);
  }
 
  show() {
    Promise.resolve(null).then(() => {this.visibility.next(true)})
  }
 
  hide() {
    Promise.resolve(null).then(() => {this.visibility.next(false)})
  }
}