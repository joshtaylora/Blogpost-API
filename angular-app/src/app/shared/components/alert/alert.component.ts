import { Component, OnInit } from '@angular/core';
/**
 * @author ng-bootstrap team
 * @source https://ng-bootstrap.github.io/#/components/alert/examples
 */

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'success',
    message: '',
  },
  {
    type: 'error',
    message: '',
  },
  {
    type: 'info',
    message: '',
  },
];

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  alerts: Alert[];

  successAlert: Alert;
  errorAlert: Alert;
  infoAlert: Alert;
  constructor() {
    this.reset();
  }

  reset() {
    this.alerts = Array.from(ALERTS);
    this.successAlert = this.alerts[0];
    this.errorAlert = this.alerts[1];
    this.infoAlert = this.alerts[2];
  }
}
