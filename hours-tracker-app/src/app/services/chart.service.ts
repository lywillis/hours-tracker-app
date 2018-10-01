import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import * as d3 from 'd3';
import { TimeLog } from '../models/TimeLog';

export interface Datum {
    key: string;
    value: number;
}


@Injectable()
export class ChartService {

  constructor() { }
  project: Project;
  private timeLogs: Array<TimeLog>;
  private currTime: Date;

  setProject(project: Project) {
    this.project = project;
    this.timeLogs = project.logs;
    this.currTime = new Date();
  }

  getData(timeInterval: string): Array<Datum> {
    switch (timeInterval) {
      case 'Year':
        return this.groupByMonth(this.timeLogs);
      case 'Month':
        return this.groupByDay(this.timeLogs);
      case 'Day':
        return this.groupByHour(this.timeLogs);
    }
    return this.groupByDay(this.timeLogs);
  }

  private groupByMonth(logs: Array<TimeLog>): Array<Datum> {
    const monthFormat = '%b %y';
    const month = d3.timeFormat(monthFormat);
    const monthParser = d3.timeParse(monthFormat);
    const displayFormat = d3.timeFormat('%b');
    return this.groupData(logs, month).map(res => {
      return { key: displayFormat(monthParser(res.key)), value: res.value};
    });
  }

  private groupByDay(logs: Array<TimeLog>): Array<Datum> {
    const dayFormat = '%b %d %y';
    const day = d3.timeFormat(dayFormat);
    const dayParser = d3.timeParse(dayFormat);
    const displayFormat = d3.timeFormat('%b %d');
    return this.groupData(logs, day).map(res => {
      return { key: displayFormat(dayParser(res.key)), value: res.value};
    });
   }
   private groupByHour(logs: Array<TimeLog>): Array<Datum> {
    const hourFormat = '%H %b %d %y';
    const hour = d3.timeFormat(hourFormat);
    const hourParser = d3.timeParse(hourFormat);
    const displayFormat = d3.timeFormat('%H:%M');
    return this.groupData(logs, hour).map(res => {
      return {key: displayFormat(hourParser(res.key)), value: res.value};
    });
   }

   private groupData(logs: Array<TimeLog>, formatter: any): Array<Datum> {
    return d3.nest<TimeLog, number>().key(d => {
      return formatter(d.start);
    }).rollup(res => {
      return d3.sum(res, v => v.duration);
    }).entries(logs).map(res => {
      return { key: res.key, value: res.value };
    });
   }
}
