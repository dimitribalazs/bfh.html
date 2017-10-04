import {Injectable} from '@angular/core';
import {UserModel} from '../shared/domainModel/viewModels';
import {BusinessService} from '../shared/services/business.service';

@Injectable()
export class UserService {
  viewModel: UserModel = new UserModel();

  constructor(private businessService: BusinessService) {
  }

  loadUser(id: string) {
    this.businessService.getUser(id).subscribe((user: UserModel) => this.viewModel = user);
  }
}
