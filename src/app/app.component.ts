import { Component } from '@angular/core';
import { DatabaseService } from './database.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatabaseService]
})

export class AppComponent {
  title = 'app';

  constructor(private databaseService: DatabaseService) { 
    //this.databaseService.listen();

  }

  test(woot): void {
    console.log(woot);
    this.databaseService.saveTest();
  }
}
