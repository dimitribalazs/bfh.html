import {AfterContentInit, Component, OnInit} from '@angular/core';
import {BarService} from '../barService';
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
  private map: google.maps.Map;
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
      navigator.geolocation.getCurrentPosition((pos) => {
       this.showRoute(pos)
      }, function(data) {
          throw new Error("Timeout while getting current position");
      }, {
        enableHighAccuracy: true,
        timeout : 15000
      });
    } else {
      this.showBarPosition();
    }
  }

  showRoute(position) {
    const directionsService = new google.maps.DirectionsService;
    const directionsDisplay = new google.maps.DirectionsRenderer;

    const currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currentLocation
    });
    let marker = new google.maps.Marker({
      position: currentLocation,
      map: this.map
    });

    directionsDisplay.setMap(this.map);

    if (this.allDataFetched) {
      let targetDestination = {lat: this.targetDestination.latitude, lng: this.targetDestination.longitude};

      directionsService.route({
        origin: currentLocation,
        destination: targetDestination,
        optimizeWaypoints: true,
        travelMode: 'TRANSIT'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          // console.log('Directions request failed due to ' + status);
        }
      });
    } else {
      // console.log('Geolocation of bar is unknown');
    }
  }

  showBarPosition() {
    let location;

    if (this.allDataFetched) {
      location = {lat: this.targetDestination.latitude, lng: this.targetDestination.longitude};
    } else {
      // location => Try Adress ?
      // console.log('No Bar Geodata');
    }

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location
    });

    let marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
}
