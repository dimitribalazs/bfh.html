import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuService {
  defaultState = {
    titleText: 'Duff\'d',
    visibleHomeLink: false,
    visibleSearchLink: false,
    visibleSearchInput: false,
    visibleTitle: false,
    visibleEdit: false,
    visibleSave: false,
    visibleMenu: false,
    visibleBack: false,
    callback: () => {
    }
  };
  state$: Subject<Object> = new Subject();

  constructor() {
    this.state$.next(this.defaultState);
  }

  setNewState(state: Object): void {
    // merge options
    const newState = {...this.defaultState, ...state};

    this.state$.next(newState);
  }
}
