import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css'],
})
export class EndpointComponent implements OnInit {
  constructor() {}

  private route: string = '';
  private method: string = '';
  private description: string = '';

  ngOnInit(): void {
    this.route = '/Users/:userID';
    this.method = 'get';
    this.description = 'Used to retrieve a User by its userId';
  }

  getRoute(): string {
    return this.route;
  }

  getMethod(): string {
    return this.method;
  }

  getDescription(): string {
    return this.description;
  }
}
