import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Beer} from '../../dto/beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {BeerService} from '../beer.service';
import {BeerDatabaseService} from '../../database.service';

@Component({
  selector: 'app-beer-edit',
  templateUrl: './beer-edit.component.html'
})
export class BeerEditComponent implements OnInit {


  beerForm: FormGroup;
  nameCtrl: FormControl;
  alcoholCtrl: FormControl;
  breweryCtrl: FormControl;
  tasteCtrl: FormControl;
  descriptionCtrl: FormControl;

  beer: Beer;

  taste = ['Fruchtig', 'Herb',
    'Bitter'];


  @Output() onAddBeer = new EventEmitter<Beer>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: BeerDatabaseService<Beer>) {

  }


  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.service.getBee(params.get('id')))
    //   .subscribe((beer: Beer) => this.beer = beer);


    this.beerForm = this.initForm(this.beer);
  }

  initForm(data: Beer ): FormGroup {
    this.nameCtrl = this.formBuilder.control(data.name, [Validators.required]);
    this.alcoholCtrl = this.formBuilder.control(data.volume, [Validators.required]);
    this.breweryCtrl = this.formBuilder.control(data.brewery, [Validators.required]);
    this.tasteCtrl = this.formBuilder.control(data.taste, [Validators.required]);
    this.descriptionCtrl = this.formBuilder.control(data.description, [Validators.required]);

    return this.formBuilder.group({
      name: this.nameCtrl,
      alcohol: this.alcoholCtrl,
      brewery: this.breweryCtrl,
      taste: this.tasteCtrl,
      description: this.descriptionCtrl
    });
  }

  save() {
    // this.service.save(this.beerForm.value);
    // this.onAddBeer.emit(beer);
  }

}

// function validateTodo(c: FormControl) {
//
//   const firstChar = c.value.charAt(0);
//
//   if (!firstChar || firstChar === firstChar.toUpperCase()) {
//     return null;
//   } else {
//     return {
//       validateTodo: {
//         valid: false
//       }
//     };
//   }
// }
