import { Component, OnInit, AfterContentInit } from '@angular/core';
import {BeerService} from '../beerService'
import {Bar} from '../../shared/dto/bar';
import {BeerBarModel} from '../../shared/domainModel/viewModels';
import {BarService} from '../../bar/barService';
import {GeoData} from '../../shared/dto/geoData';
import {isNullOrUndefined} from 'util';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-beer-map',
  templateUrl: './beer-map.component.html',
  styleUrls: ['./beer-map.component.css']
})
export class BeerMapComponent implements OnInit, AfterContentInit {
  private map: google.maps.Map;
  targetDestinations: Array<GeoData>;
  beerBars: BeerBarModel [];
  barsAndGeoData: Array<[string, GeoData]>;


  constructor(private beerService: BeerService,
              private barService: BarService) {
    this.targetDestinations = new Array<GeoData>();
    this.barsAndGeoData = new Array<[string, GeoData]>();
  }

  ngOnInit() {
    this.beerService.viewModel.bars.subscribe((beerBars) => {
      if (!isNullOrUndefined(beerBars)) {
        this.beerBars = beerBars;
    };

    let locationsResultArray = new Array<GeoData>();

    for (let beerBar of this.beerBars){
      // console.log(beerBar.barId, beerBar.barName);

      this.barService.loadBar(beerBar.barId);
      // console.log('Bar found ' + beerBar.barName);

      this.barService.targetLocationSubject.distinct().subscribe((location) => {
        if (!isNullOrUndefined(location.longitude)) {
              locationsResultArray.push(location);
        }
      });
    }

    // Filter duplicates -> better way ?
    this.targetDestinations = locationsResultArray.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });

    // Create barsAndGeoData [barName, GeoData[]]
    for (let i = 0; i < this.beerBars.length; i++) {
      this.barsAndGeoData.push([this.beerBars[i].barName, this.targetDestinations[i]]);
    }
  });
  }

  ngAfterContentInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos))
    }else {
      // console.log('GeoLocation is disabled');
      this.showPosition(null);
    }
  }

  showPosition(position) {
    let firstLocation: google.maps.LatLng;

    if (position) {
      firstLocation =  new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
    }else {
      firstLocation =  new google.maps.LatLng(this.barsAndGeoData[0][1].latitude, this.barsAndGeoData[0][1].longitude);
    }

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: firstLocation
    });

    const  infowindow = new google.maps.InfoWindow();

    for (let markerData of this.barsAndGeoData){
      let markerPos = {lat: markerData[1].latitude, lng: markerData[1].longitude };

      let marker = new google.maps.Marker({
      position: markerPos,
      map: this.map
      });

      // Info Fenster für jeden Marker
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(markerData[0]);
          infowindow.open(this.map, marker);
        }
      })(marker));
    }
  }
}
