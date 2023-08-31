import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private static googleMapPromise: Promise<void>;

  constructor() { }

  public loadGoogleMapsApi(): Promise<void> {
    if (!MapService.googleMapPromise) {
      MapService.googleMapPromise = new Promise<void>((resolve) => {
        window['onGoogleMapsApiLoaded'] = () => {
          resolve();
        };

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = 'https://maps.google.com/maps/api/js?key=ここに入ります0&callback=onGoogleMapsApiLoaded';
        document.body.appendChild(script);
      });
    }

    return MapService.googleMapPromise;
  }
}
