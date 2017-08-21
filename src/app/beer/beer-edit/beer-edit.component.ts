import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Beer} from '../../shared/dto/beer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
// import {BeerService} from '../beer.service';
import {BeerDatabaseService} from '../../shared/services/beer.service';
import { Observable } from 'rxjs/Rx';
import {isUndefined} from 'util';


@Component({
  selector: 'app-beer-edit',
  templateUrl: './beer-edit.component.html'
})
export class BeerEditComponent implements OnInit {

  beer: Beer;
  model = new Beer();
  beerForm: FormGroup;

  @Output() onAddBeer = new EventEmitter<Beer>();

  constructor(
    private formBuilder: FormBuilder,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private beerService: BeerDatabaseService<Beer>) {

  }


  ngOnInit() {

    this.beerForm = this._fb.group({
      name: [this.model.name, [Validators.required]],
      volume: [this.model.volume, [Validators.required]],
      brewType: [this.model.brewType, [Validators.required]],
      // rating: [this.model.rating, [Validators.required]],
      // brewery: [this.model.brewery],
      // bars: [this.model.bars],
      // image: [this.model.image, [Validators.required]],
      taste: [this.model.taste, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.route.params.subscribe(params => {
      this.beerService.get(params['id']).subscribe((beer: Beer) => {
        this.model = beer

        // if (isUndefined(beer.description)) {
        //   beer.description = '';
        // }
        // this.beerForm.setValue({name: beer.name, description: beer.description})
        // (first > second) ? "That is true : 5>3" : "That is false : 5<3"

        this.beerForm.setValue({
          name: beer.name,
          volume: (isUndefined(beer.volume)) ? '' : beer.volume,
          taste: (isUndefined(beer.taste)) ? '' : beer.taste,
          brewType: (isUndefined(beer.brewType)) ? '' : beer.brewType,
          description: (isUndefined(beer.description)) ? '' : beer.description});
      })
    });
  }


  // save(model: Customer) {
  //   // call API to save
  //   // ...
  //   console.log(model);
  // }

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
