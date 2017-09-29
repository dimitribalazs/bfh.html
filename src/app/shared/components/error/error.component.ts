import {Component} from "@angular/core";
import {BusinessService} from "../../services/business.service";

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})

/**
 * Display error messages
 */
export class ErrorComponent {
  error: string;
  stack: string;
  constructor(businessService: BusinessService) {
    //stringify help to display objects
    if(typeof businessService.appError == "object" && businessService.appError.message && businessService.appError.stack) {
      this.error = businessService.appError.message;
      if(businessService.debugMode) {
        this.stack = businessService.appError.stack;
      }
    }
    else {
      this.error = businessService.appError
    }
  }
}
