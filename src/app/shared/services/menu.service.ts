import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuService {
  defaultState = {
    titleText: '',
    visibleHomeLink: false,
    visibleSearchLink: false,
    visibleSearchInput: false,
    visibleTitle: true,
    visibleEdit: false,
    visibleSave: false,
    visibleMenu: false,
    visibleBack: false,
    callback: () => {
    }
  };
  state = {...this.defaultState};
  state$: Subject<MenuState> = new Subject();

  setNewState(state): void {
    // merge options
    console.log(state);
    this.state = {...this.defaultState, ...state};

    this.state$.next(this.state);
  }

  callback(): void {
    return this.state.callback();
  }
}

export class MenuState {
  titleText: string;
  visibleHomeLink: boolean;
  visibleSearchLink: boolean;
  visibleSearchInput: boolean;
  visibleTitle: boolean;
  visibleEdit: boolean;
  visibleSave: boolean;
  visibleMenu: boolean;
  visibleBack: boolean;
  callback: any;
}
