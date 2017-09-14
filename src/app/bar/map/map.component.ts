import { Component, OnInit } from '@angular/core';
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
  model: Bar = new Bar;

  constructor(private barService: BarService) {
  }

  ngOnInit() {
    this.barService.getBar().subscribe((beer) => {
      this.model = this.barService.getViewModel();
    })

    var geoLocation = navigator.geolocation.getCurrentPosition(this.geoLocAllowed, this.geoLocDenied);
  }

  geoLocAllowed(position) {
    const directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var currentLocation =  {lat: position.coords.latitude, lng: position.coords.longitude };
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
    var targetDestination = {lat: 46.956120 , lng: 7.452865 }

    directionsService.route({
      origin: currentLocation, //{lat: 41.85, lng: -87.65},
      destination: targetDestination, //{lat: 49.3, lng: -123.12},
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
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
