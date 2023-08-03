import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];

  ngOnInit() {
    this.initializeMap();
    this.addMarker(33.947317911296906, 131.25260123062438, '神原にこにこkitchen');
  }

  initializeMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 33.947317911296906, lng: 131.25260123062438 }, // Default center
      zoom: 15,// Default zoom level
      gestureHandling: 'cooperative', // 二本指での操作時のみ操作可能
      mapTypeControl: false // 航空写真との入れ替えボタン非表示
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  addMarker(lat: number, lng: number, title: string) {
    const markerOptions: google.maps.MarkerOptions = {
      position: { lat, lng },
      map: this.map,
      title: title
    };
    const marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);

    // Create and open InfoWindow
    const infoWindow = new google.maps.InfoWindow({
      content: title  // Set the title as the content of the InfoWindow
    });

    infoWindow.open(this.map, marker);
  }
}
