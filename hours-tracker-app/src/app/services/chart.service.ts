import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import * as d3 from 'd3';
import { TimeLog } from '../models/TimeLog';
import { ProjectService } from './project.service';

export interface Datum {
    key: string;
    value: number;
}
const monthFormat = d3.timeFormat('%b %y');
const dayFormat = d3.timeFormat('%b %d');
const hourFormat = d3.timeFormat('%H');
@Injectable()
export class ChartService {

  constructor() { }

  groupTimeData(logs: Array<TimeLog>): Datum[] {
    return this.groupByDay(logs);
  }

  private groupByMonth(logs: Array<TimeLog>): Datum[] {
    return d3.nest<TimeLog, number>().key(d => {
      return monthFormat(d.start);
    }).rollup(res => {
      return d3.sum(res, v => v.duration);
    }).entries(logs).map(res => {
      return { key: res.key, value: res.value };
    });
  }

  private groupByDay(logs: Array<TimeLog>): Datum[] {
    return d3.nest<TimeLog, number>().key(d => {
      return dayFormat(d.start);
    }).rollup(res => {
      return d3.sum(res, v => v.duration);
    }).entries(logs).map(res => {
      return { key: res.key, value: res.value };
    });
   }
   private groupByHour(logs: Array<TimeLog>): Datum[] {
    return d3.nest<TimeLog, number>().key(d => {
      return hourFormat(d.start);
    }).rollup(res => {
      return d3.sum(res, v => v.duration);
    }).entries(logs).map(res => {
      return { key: res.key, value: res.value };
    });
   }
}
