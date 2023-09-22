import { Component, OnInit } from '@angular/core';
import { MapService } from '../service/google/map/map.service';
import { CookieService } from '../service/cookie/cookie.service';  // 追加

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  private map?: google.maps.Map;
  private markers: google.maps.Marker[] = [];

  constructor(private mapService: MapService, private cookie: CookieService) { }  // 更新

  ngOnInit() {
    this.mapService.loadGoogleMapsApi().then(() => {
      this.initializeMap();
      this.addMarkerWithInfo(33.947317911296906, 131.25260123062438, '神原にこにこkitchen');
    });

    this.cookie.set("cookieName", "cookieValue");  // 更新
  }

  private initializeMap(): void {
    const defaultPosition = { lat: 33.947317911296906, lng: 131.25260123062438 };
    const mapOptions: google.maps.MapOptions = {
      center: defaultPosition,
      zoom: 17,
      mapTypeControl: false
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  private addMarkerWithInfo(lat: number, lng: number, title: string): void {
    const marker = this.addMarker(lat, lng, title);
    this.addInfoWindow(marker, title);
  }

  private addMarker(lat: number, lng: number, title: string): google.maps.Marker {
    const markerOptions: google.maps.MarkerOptions = {
      position: { lat, lng },
      map: this.map,
      title: title
    };
    const marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);
    return marker;
  }

  private addInfoWindow(marker: google.maps.Marker, content: string): void {
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });

    infoWindow.open(this.map, marker);
  }
}
