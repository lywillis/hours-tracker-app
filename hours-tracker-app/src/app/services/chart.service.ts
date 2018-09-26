import { Injectable } from '@angular/core';

export interface Datum {
    name: string;
    value: number;
}
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  groupTimeData() { }

  groupByMonth() { }

  groupByDay() { }

}
