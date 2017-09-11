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
    visibleBack: false
  };
  state = { ...this.defaultState };
  state$: Subject<Object> = new Subject();

  public submitCallback: () => void;
  public searchInputCallback: (e: string) => void;

  setNewState(state: MenuState, title: string = null, callback: any = null): void {
    // set defaults
    this.state = { ...this.defaultState };

    switch (state) {
      case MenuState.SEARCH: {
        this.state.visibleBack = true;
        this.state.visibleSearchInput = true;

        this.searchInputCallback = callback;
        break;
      }
      default: {
        // home
        this.state.visibleMenu = true;
        this.state.visibleTitle = true;
        this.state.visibleSearchLink = true;
      }
    }

    this.state$.next(this.state);
  }
}

export enum MenuState {
  HOME,
  SEARCH
}
