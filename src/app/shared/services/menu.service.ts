import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  private _titleText: string;
  private _visibleHomeLink: boolean;
  private _visibleSearchLink: boolean;
  private _visibleSearchInput: boolean;
  private _visibleTitle: boolean;
  private _visibleEdit: boolean;
  private _visibleSave: boolean;
  private _visibleMenu: boolean;
  private _visibleBack: boolean;
  public submitCallback: () => void;
  public searchInputCallback: (e) => void;

  constructor() {
    this._titleText = '';
  }

  get TitleText(): string {
    return this._titleText;
  }
  set TitleText(value: string) {
    this._titleText = value;
  }

  get visibleHomeLink(): boolean {
    return this._visibleHomeLink;
  }

  set visibleHomeLink(value: boolean) {
    this._visibleHomeLink = value;
  }

  get visibleSearchLink(): boolean {
    return this._visibleSearchLink;
  }

  set visibleSearchLink(value: boolean) {
    this._visibleSearchLink = value;
  }

  get visibleSearchInput(): boolean {
    return this._visibleSearchInput;
  }

  set visibleSearchInput(value: boolean) {
    this._visibleSearchInput = value;
  }

  get visibleTitle(): boolean {
    return this._visibleTitle;
  }

  set visibleTitle(value: boolean) {
    this._visibleTitle = value;
  }

  get visibleEdit(): boolean {
    return this._visibleEdit;
  }

  set visibleEdit(value: boolean) {
    this._visibleEdit = value;
  }

  get visibleSave(): boolean {
    return this._visibleSave;
  }

  set visibleSave(value: boolean) {
    this._visibleSave = value;
  }

  public submit(): void {
    this.submitCallback();
  }

  public onSearchInputChange(e): void {
    this.searchInputCallback(e);
  }

  get visibleMenu(): boolean {
    return this._visibleMenu;
  }

  set visibleMenu(value: boolean) {
    this._visibleMenu = value;
  }

  get visibleBack(): boolean {
    return this._visibleBack;
  }

  set visibleBack(value: boolean) {
    this._visibleBack = value;
  }

  public setDefault() {
    this._titleText = 'Duff\'d';
    this._visibleHomeLink = false;
    this._visibleSearchLink = false;
    this._visibleSearchInput = false;
    this._visibleTitle = true;
    this._visibleEdit = false;
    this._visibleSave = false;
    this._visibleMenu = false;
    this.visibleBack = false;
  }
}
