import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import * as d3 from 'd3';
import { Datum } from '../../services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  @Input() data: Array<Datum>;
  @ViewChild('chart') private chartContainer: ElementRef;

  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private height: number;
  private width: number;
  private x: any; // x axis scale
  private y: any; // y axis scale
  private xAxis: any;
  private yAxis: any;
  svg: any;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.initChart();
    if (this.data) {
      this.updateChart();
    }
  }

  private initChart() {
    const element = this.chartContainer.nativeElement;
    // init chart dimensions
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(element)
    .append('svg')
    .attr('width', element.offsetWidth)
    .attr('height', element.offsetHeight);

    this.chart = this.svg.append('g')
    .attr('class', 'bars')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.initAxis();
  }

  private initAxis() {
    // init x axis
    this.x = d3.scaleBand().rangeRound([0, this.width]);
    this.xAxis = this.svg.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
    .call(d3.axisBottom(this.x));
    // init y axis
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
    this.yAxis = this.svg.append('g')
    .attr('class', 'axis axis-y')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.updateAxis();
  }

  private updateChart() {
    this.updateAxis();
  }
  private updateAxis() {
    const xDomain = this.data.map(d => d.key);
    this.x = this.x.domain(xDomain);
    this.xAxis.call(d3.axisBottom(this.x));

    const yDomain = [0, d3.max(this.data, d => d.value)];
    this.y = this.y.domain(yDomain);
    this.yAxis.call(d3.axisLeft(this.y));
  }
}
