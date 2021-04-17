import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'angular-app';
  // imported the service
  constructor(private service: AppServiceService) {

  }
  ngOnInit() {
  }
}
