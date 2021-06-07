import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  setPosition(location: string) {
    alertify.set('notifier', 'position', location);
  }

  success(message: string) {
    this.setPosition('top-center');
    alertify.success(message);
  }

  warning(message: string) {
    this.setPosition('top-center');
    alertify.warning(message);
  }

  error(message: string) {
    this.setPosition('top-center');
    alertify.error(message);
  }

}
