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
  allDataFetched: boolean = false;
  beerBars: any [];
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

    for(let entry of this.beerBars){
      console.log(entry.barId, entry.barName);

      this.barService.loadBar(entry.barId);
      console.log('Bar found ' + entry.barName);

      this.barService.targetLocationSubject.subscribe((location) => {
        if (!isNullOrUndefined(location.longitude)) {
           this.targetDestinations.push(location);
        }
      });
    }

    for(let target of this.targetDestinations){
      console.log(target.latitude + ' : ' + target.longitude);
    }

    this.allDataFetched = true;
  });
  }

  ngAfterContentInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.showPosition(pos))
    }else {
      console.log('GeoLocation is disabled');
      this.showBarPosition();
    }
  }

  showPosition(position) {
    let bounds = new google.maps.LatLngBounds();
    const currentLocation =  {lat: position.coords.latitude, lng: position.coords.longitude };
    console.log('Your current location ' + currentLocation.lat, currentLocation.lng);

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currentLocation
    });
    // let marker = new google.maps.Marker({
    //   position: currentLocation,
    //   map: this.map
    // });

    let  infowindow = new google.maps.InfoWindow();

    for(let markerData of this.createMarkerData()){
        let markerPos = {lat: markerData[1].latitude, lng: markerData[1].longitude };
        bounds.extend(markerPos);

        let marker = new google.maps.Marker({
        position: markerPos,
        map: this.map
      });

      // Info Fenster
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infowindow.setContent(markerData[0]);
          infowindow.open(this.map, marker);
        }
      })(marker));

    }
    this.map.fitBounds(bounds);

       // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
      // let boundsListener = google.maps.event.addListener((this.map), 'bounds_changed', function(event) {
      //     this.setZoom(14);
      //     google.maps.event.removeListener(boundsListener);
      // });
  }

  showBarPosition() {

  }

  

  createMarkerData() {
    // Test
    const geo1 = {id: '1', longitude: 7.452865, latitude: 46.95612};
    const geo2 = {id: '2', longitude: 7.536155, latitude: 47.206227};

    this.barsAndGeoData.push(['Barbièr', geo1]);
    this.barsAndGeoData.push(['Oufi', geo2]);

    for(let entry of this.barsAndGeoData){
      console.log(entry[1]);
    }

    return this.barsAndGeoData;
  }
}
