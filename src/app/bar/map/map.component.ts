import { Component, OnInit, AfterContentInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BarService} from '../barService';
import {Bar} from '../../shared/dto/bar';
import {GeoData} from '../../shared/dto/geoData';
import {isNullOrUndefined} from 'util';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterContentInit {
  targetDestination: GeoData;
  allDataFetched: boolean = false;

  constructor(private barService: BarService) {
    this.targetDestination = new GeoData();
  }

  ngOnInit() {
    this.barService.targetLocationSubject.subscribe((location) => {
           if (!isNullOrUndefined(location.longitude)) {
              this.targetDestination = location;
              this.allDataFetched = true;
       }
    });
  }

  ngAfterContentInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.showRoute(pos))
    }else {
      console.log('GeoLocation is disabled');
    }
  }

  showRoute(position) {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    const currentLocation =  {lat: position.coords.latitude, lng: position.coords.longitude };
    console.log('Your current location ' + currentLocation.lat, currentLocation.lng);

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: currentLocation
    });
    let marker = new google.maps.Marker({
      position: currentLocation,
      map: map
    });

    directionsDisplay.setMap(map);

    if (this.allDataFetched) {
      console.log('data fetched ' + this.allDataFetched);

      let targetDestination = { lat: this.targetDestination.latitude, lng: this.targetDestination.longitude };

      directionsService.route({
        origin: currentLocation, //{lat: 41.85, lng: -87.65},
        destination: targetDestination, //{lat: 49.3, lng: -123.12},
        optimizeWaypoints: true,
        travelMode: 'TRANSIT'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    }else {
      console.log('Geolocation of bar is unknown');
    }
  }
}
