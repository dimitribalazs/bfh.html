import {ErrorHandler, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class DuffdErrorHandler extends ErrorHandler {
  constructor(private router: Router) {
    super();
  }

  handleError(error) {
    super.handleError(error);
    alert(`Error occurred:${error.message}`);
    //this.router.navigate(['error'])
  }
}
