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
    const displayFormat = d3.timeFormat('%b');
    const months = d3.timeMonths(d3.timeYear(this.now), d3.timeYear.ceil(this.now))
    .map(month => {
      return {key: displayFormat(month),
      value: 0
    };
    });
    const data = this.groupData(logs, monthFormat);
    data.forEach(d => {
      const found = months.find(m => {
        return m.key === displayFormat(d.key);
      }
      );
      if (found) { found.value = d.value; }
    });
    return months;
  }

  private groupByDay(logs: Array<TimeLog>): Array<Datum> {
    const dayFormat = '%b %d %y';
    const displayFormat = d3.timeFormat('%d');
    const days = d3.timeDays(d3.timeMonth(this.now), d3.timeMonth.ceil(this.now))
    .map(day => {
      return {
        key: displayFormat(day),
        value: 0
      };
    });
    const data = this.groupData(logs, dayFormat).filter(d => d.key >= d3.timeMonth(this.now) && d.key <= d3.timeMonth.ceil(this.now) );
    data.forEach(d => {
      const found = days.find(day => {
        return day.key === displayFormat(d.key);
      }
      );
      if (found) {found.value = d.value; }
    });
    return days;
   }
   private groupByHour(logs: Array<TimeLog>): Array<Datum> {
    const hourFormat = '%H %b %d %y';
    const displayFormat = d3.timeFormat('%H:%M');
    const hours = d3.timeHours(d3.timeDay(this.now), d3.timeDay.ceil(this.now))
    .map(hour => {
      return {
        key: displayFormat(hour),
        value: 0
      };
    });
    const data = this.groupData(logs, hourFormat).filter(d => d.key >= d3.timeDay(this.now) && d.key <= d3.timeDay.ceil(this.now) );
    data.forEach(d => {
      const found = hours.find(h => {
        return h.key === displayFormat(d.key);
      }
      );
      if (found) {found.value = d.value; }
    });
    return hours;
   }

   private groupData(logs: Array<TimeLog>, format: any): Array<any> {
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
