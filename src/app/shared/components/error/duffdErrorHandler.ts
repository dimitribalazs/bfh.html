import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";

@Injectable()
export class DuffdErrorHandler extends ErrorHandler {
  router: Router;

  constructor(private injector: Injector,
              private businessService: BusinessService) {
    super();
  }

  handleError(error) {
    super.handleError(error);
    alert(`Error occurred:${error.message}`);
    this.businessService.setError(error);
    this.injector.get(Router).navigate(['/error']);
  }
}
