import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Beer} from '../Beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BeerService} from '../beer.service';

@Component({
  selector: 'app-beer-edit',
  templateUrl: './beer-edit.component.html'
})
export class BeerEditComponent implements OnInit {

  submitted = false;
  beer: Beer;
  model = new Beer();

  taste = ['Fruchtig', 'Herb',
    'Bitter'];

  theForm: FormGroup;
  @Output() onAddBeer = new EventEmitter<Beer>();

  constructor(
    formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: BeerService) {
    this.theForm = formBuilder.group({
      'BeerName': ['', []],
      'Brewery': ['', []]
    });
  }

  onSubmit() {
    console.log(this.theForm);

    this.submitted = true;

    // let beer: Beer;
    // beer  = new Beer(this.theForm.value.BeerName);
    // beer.brewery = this.theForm.value.Brewery;
    // this.onAddBeer.emit(beer);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getBeer(params.get('id')))
      .subscribe((beer: Beer) => this.model = beer);
  }

}

function validateTodo(c: FormControl) {

  const firstChar = c.value.charAt(0);

  if (!firstChar || firstChar === firstChar.toUpperCase()) {
    return null;
  } else {
    return {
      validateTodo: {
        valid: false
      }
    };
  }
}
