import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import * as d3 from 'd3';
import { TimeLog } from '../models/TimeLog';

export interface Datum {
    key: string | Date;
    value: number;
}


@Injectable()
export class ChartService {

  constructor() { }
  project: Project;
  private timeLogs: Array<TimeLog>;
  private now: Date;

  setProject(project: Project) {
    this.project = project;
    this.timeLogs = project.logs;
    this.now = new Date();
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
  }

  private groupByMonth(logs: Array<TimeLog>): Array<Datum> {
    const monthFormat = '%b %y';
    const format = d3.timeFormat(monthFormat);
    const parser = d3.timeParse(monthFormat);
    const displayFormat = d3.timeFormat('%b');
    const months = d3.timeMonths(d3.timeYear(this.now), d3.timeYear.ceil(this.now));
    const data = this.groupData(logs, format);
    return data;
  }

  private groupByDay(logs: Array<TimeLog>): Array<Datum> {
    const dayFormat = '%b %d %y';
    const format = d3.timeFormat(dayFormat);
    const parser = d3.timeParse(dayFormat);
    const displayFormat = d3.timeFormat('%b %d');
    return this.groupData(logs, format);
   }
   private groupByHour(logs: Array<TimeLog>): Array<Datum> {
    const hourFormat = '%H %b %d %y';
    const format = d3.timeFormat(hourFormat);
    const parser = d3.timeParse(hourFormat);
    const displayFormat = d3.timeFormat('%H:%M');
    return this.groupData(logs, format);
   }

   private groupData(logs: Array<TimeLog>, format: any): Array<Datum> {
     const formatter = d3.timeFormat(format);
     const parser = d3.timeParse(format);
    return d3.nest<TimeLog, number>().key(d => {
      return formatter(d.start);
    }).rollup(res => {
      return d3.sum(res, v => v.duration);
    }).entries(logs).map(res => {
      return { key: parser(res.key), value: res.value };
    });
   }
}
