import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BarService} from '../barService';
import {Bar} from '../../shared/dto/bar';
import {GeoData} from '../../shared/dto/geoData';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  service: BarService

  constructor(private barService: BarService, private router: Router, ) {
    this.service = barService;
  }

  ngOnInit() {
    const geoLocation = navigator.geolocation.getCurrentPosition(this.geoLocAllowed, this.geoLocDenied);
  }

  geoLocAllowed(position) {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    const currentLocation =  {lat: position.coords.latitude, lng: position.coords.longitude };
    console.log('Your current location ' + currentLocation.lat, currentLocation.lng);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: currentLocation
    });
    var marker = new google.maps.Marker({
      position: currentLocation,
      map: map
    });

    directionsDisplay.setMap(map);

    // TODO
    // "46.956120, 7.452865"
    var targetDestination = { lat: 46.956120, lng: 7.452865 };
    // {lat: this.service.viewModel.location.latitude , lng: this.service.viewModel.location.longitude }

    directionsService.route({
      origin: currentLocation, //{lat: 41.85, lng: -87.65},
      destination: targetDestination, //{lat: 49.3, lng: -123.12},
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
