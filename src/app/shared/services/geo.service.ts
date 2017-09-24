import { Injectable, OnInit } from '@angular/core';
import {GeoData} from '../dto/geoData';
import {isNullOrUndefined} from "util";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GeoService {
  private _earthRadius: number = 6371;
  private _radius = 80;

  public positionSubject: Subject<GeoData> = new BehaviorSubject<GeoData>(new GeoData())

  /**
   * Check if distance is in around you range
   * @param {number} range
   * @returns {boolean}
   */
   public isInAroundYouRange(range: number): boolean {
     if(isNullOrUndefined(range)) return false;
      return range <= this._radius;
   }

  /**
   * Calculate between to distances
   * @param {GeoData} currentPosition
   * @param {GeoData} positionToCheck
   * @returns {number}
   */
   public getDistance(currentPosition: GeoData, positionToCheck: GeoData): number {
     let destinationLat = this._deg2rad(positionToCheck.latitude - currentPosition.latitude);
     let destinationLon = this._deg2rad(positionToCheck.longitude - currentPosition.longitude);

     let a = Math.sin(destinationLat/2) * Math.sin(destinationLat/2) + Math.cos(this._deg2rad(currentPosition.latitude)) * Math.cos(this._deg2rad(positionToCheck.latitude)) * Math.sin(destinationLon/2) * Math.sin(destinationLon/2);
     let c = 2 * Math.asin(Math.sqrt(a));
     let d = this._earthRadius * c;

     return d;
   }

  /**
   * Update current position
   */
  public setCurrentPosition() {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((pos) => {
         let geoData: GeoData = {
           longitude: pos.coords.longitude,
           latitude: pos.coords.latitude
         };
         this.positionSubject.next(geoData);
       });
     }
     else {
       console.log('GeoLocation is disabled');
       throw new Error("GeoLocation is disabled")
     }
   }

  /**
   * Get current position from user
   * @returns {Subject<GeoData>}
   */
  public getCurrentPosition(): Subject<GeoData> {
      return this.positionSubject;
   }


  private _deg2rad(point): number {
    return Math.tan(point * (Math.PI/180))
  }
}

/*
function withinRadius(point, interest, kms) {
  'use strict';
   let R = 6371;
   let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };

   let dLat = deg2rad(interest.latitude - point.latitude );
   let dLon = deg2rad( interest.longitude - point.longitude );

   let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(point.latitude)) * Math.cos(deg2rad(interest.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
   let c = 2 * Math.asin(Math.sqrt(a));
   let d = R * c;

   return (d <= kms);

   }  */
