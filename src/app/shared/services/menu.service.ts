import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MenuService {
  defaultState = {
    titleText: '',
    visibleHomeLink: false,
    visibleSearchLink: false,
    visibleSearchInput: false,
    visibleTitle: false,
    visibleEdit: false,
    visibleSave: false,
    visibleMenu: false,
    visibleBack: false,
    onInput: () => {
    },
    onSubmit: () => {
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

  onInput(...a): void {
    return this.state.onInput(...a);
  }

  onSubmit(...a): void {
    return this.state.onSubmit(...a);
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
  onInput: any;
  onSubmit: any;
}
