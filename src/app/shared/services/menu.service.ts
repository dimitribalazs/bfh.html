import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

/**
 * Holds current state of the main menu bar as well as callback functions
 */
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

  /**
   * Sets a new state
   *
   * Expects an Object containing any of the fields in [[MenuState]]
   * @param state
   */
  setNewState(state): void {
    // merge options
    this.state = {...this.defaultState, ...state};

    this.state$.next(this.state);
  }

  /**
   * Executes callback
   *
   * @param a any params
   */
  onInput(...a): void {
    return this.state.onInput(...a);
  }

  /**
   * Executes callback
   *
   * @param a any params
   */
  onSubmit(...a): void {
    return this.state.onSubmit(...a);
  }
}

export class MenuState {
  /**
   * Text to be displayed
   */
  titleText: string;

  visibleHomeLink: boolean;
  visibleSearchLink: boolean;
  visibleSearchInput: boolean;
  visibleTitle: boolean;
  visibleEdit: boolean;
  visibleSave: boolean;
  visibleMenu: boolean;
  visibleBack: boolean;

  /**
   * Input event callback
   */
  onInput: any;

  /**
   * Submit event callback
   */
  onSubmit: any;
}
