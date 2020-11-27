import { Injectable } from '@angular/core';
import { ObserverService } from './observer.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(private observer: ObserverService) { }

  validateColor(estado, colorestado, coloraux, hastaaux, hastaestado, tiempo, aux) {

    if (aux) {
      if (Number(hastaaux) !== 0 && tiempo >= Number(hastaaux)) {
        return '#C03529';
      } else {
        return this.selectColor(coloraux);
      }


    } else {
      if (Number(hastaestado) !== 0 && tiempo >= Number(hastaestado)) {
        return '#C03529';
      } else {
        return this.selectColor(colorestado);
      }


    }
  }

  selectColor(n) {
    return this.observer.Colors[n];
  }
}
