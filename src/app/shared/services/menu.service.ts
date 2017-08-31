import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  private title: string;

  constructor() {
    this.title = '';
  }

  get Title(): string {
    return this.title;
  }
  set Title(value: string) {
    this.title = value;
  }

}
