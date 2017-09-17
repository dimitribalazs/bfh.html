import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap } from '@angular/router';
import {BarService} from '../barService';
import {Bar} from '../../shared/dto/bar';
import {GeoData} from '../../shared/dto/geoData';
import {} from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  targetDestination: any = {};

  constructor(private barService: BarService) {
  }

  ngOnInit() {
    this.targetDestination = { lat: 46.956120, lng: 7.452865 };

    const geoLocation = navigator.geolocation.getCurrentPosition(this.geoLocAllowed, this.geoLocDenied);
  }

  geoLocAllowed(position) {
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

    // TODO
    // "46.956120, 7.452865"
    // let targetDestination = { lat: 46.956120, lng: 7.452865 };
    // {lat: this.service.viewModel.location.latitude , lng: this.service.viewModel.location.longitude }

    directionsService.route({
      origin: currentLocation, //{lat: 41.85, lng: -87.65},
      destination: this.targetDestination, //{lat: 49.3, lng: -123.12},
      optimizeWaypoints: true,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }

  geoLocDenied(position){
      console.log('GeoLocation is disabled');
  }
}
