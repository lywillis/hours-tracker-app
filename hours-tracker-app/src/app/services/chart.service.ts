import { Injectable } from '@angular/core';
import { Project } from '../models/Project';
import * as d3 from 'd3';
import { TimeLog } from '../models/TimeLog';

export interface Datum {
  key: string | Date;
  value: number;
}

const secsPerHour = 3600;

@Injectable()
export class ChartService {

  constructor() { }
  project: Project;
  private title: string;
  private timeLogs: Array<TimeLog>;
  private now: Date;

  setProject(project: Project) {
    this.project = project;
    this.timeLogs = project.logs;
    this.now = new Date();
  }

  getChartLabels() {
    if (this.project) {
      return {
        title: this.title
      };
    }
  }
  getData(timeInterval: string): Array<Datum> {
    switch (timeInterval) {
      case 'Year':
        const yearFormat = d3.timeFormat('%Y');
        this.title = yearFormat(this.now);
        return this.groupByMonth(this.timeLogs);
      case 'Month':
        const monthFormat = d3.timeFormat('%b %Y');
        this.title = monthFormat(this.now);
        return this.groupByDay(this.timeLogs);
      case 'Day':
        const dayFormat = d3.timeFormat('%b %d');
        this.title = dayFormat(this.now);
        return this.groupByHour(this.timeLogs);
    }
  }

  private groupByMonth(logs: Array<TimeLog>): Array<Datum> {
    const monthFormat = '%b %y';
    const displayFormat = d3.timeFormat('%b');
    const months = d3.timeMonths(d3.timeYear(this.now), d3.timeYear.ceil(this.now))
      .map(month => {
        return {
          key: displayFormat(month),
          value: 0
        };
      });
    const data = this.groupData(logs, monthFormat);
    for (const d of data) {
      const idx = months.findIndex(m => m.key === displayFormat(d.key));
      months[idx].value += d.value;
      return months;
    }
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
    const data = this.groupData(logs, dayFormat).filter(d => d.key >= d3.timeMonth(this.now) && d.key <= d3.timeMonth.ceil(this.now));
    for (const d of data) {
      const idx = days.findIndex(i => i.key === displayFormat(d.key));
      const duration = days[idx].value + d.value;
      const secsPerDay = secsPerHour * 60;
      if (duration > secsPerDay) {

      } else { days[idx].value += d.value; }
    }
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
    const data = this.groupData(logs, hourFormat).filter(d => d.key >= d3.timeDay(this.now) && d.key <= d3.timeDay.ceil(this.now));
    for (const d of data) {
      const idx = hours.findIndex(i => i.key === displayFormat(d.key));
      const duration = hours[idx].value + d.value;
      if (duration > secsPerHour) {// over 1 hour
        const diff = duration - secsPerHour;
        hours[idx].value = secsPerHour;
        if (idx !== hours.length - 1) {
          hours[idx + 1].value += diff;
        }
      } else { hours[idx].value += d.value; }
    }
    return hours;
  }

  private groupData(logs: Array<TimeLog>, format: any): Array<any> {
    const formatter = d3.timeFormat(format);
    const parser = d3.timeParse(format);
    return d3.nest<TimeLog, number>().key(d => {
      return formatter(d.start);
    }).rollup(res => {
      return d3.sum(res,
        v => {
          return v.duration;
        });
    }).entries(logs).map(res => {
      return { key: parser(res.key), value: res.value };
    });
  }
}
