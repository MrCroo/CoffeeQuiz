import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selected: string = '';
  clickedQ: string = '';
  clickedID: number = 0;
  score: number = 0;
  selectedCatId:number = 0;
  data:any[] = [];
  random:boolean = true;
  selectedQuestion:boolean = false;

}
