import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation, OnChanges} from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import * as d3 from 'd3';
import { Datum } from '../../services/chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: Array<Datum>;
  @ViewChild('chart') private chartContainer: ElementRef;

  private margin = {top: 20, right: 30, bottom: 20, left: 20};

  private height: number;
  private width: number;
  private x: any; // x axis scale
  private y: any; // y axis scale
  private xAxis: any;
  private yAxis: any;
  private colors: any;
  svg: any;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.initChart();
    if (this.data) {
      this.updateChart();
    }
  }
  ngOnChanges() {
    if (this.chart) {
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
    this.x = d3.scaleBand().padding(0.15).rangeRound([0, this.width]);
    this.xAxis = this.svg.append('g')
    .attr('class', 'axis axis-x')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`);
    // init y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = this.svg.append('g')
    .attr('class', 'axis axis-y')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    .call(d3.axisLeft(this.y));
  }

  private updateChart() {
    this.updateAxis();
    this.updateData();
  }
  private updateAxis() {
    const xDomain = this.data.map(d => d.key);
    this.x = this.x.domain(xDomain);
    this.xAxis.call(d3.axisBottom(this.x));
    const yDomain = [0, d3.max(this.data, d => d.value)];
    this.y = this.y.domain(yDomain);
    this.yAxis.call(d3.axisLeft(this.y));
  }

  private updateData() {
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['lightblue', 'blue']);
    const bars = this.chart.selectAll('.bar').data(this.data);
    bars.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar')
    .attr('class', 'bar')
    .attr('x', d => this.x(d.key))
    .attr('y', d => this.y(d.value))
    .attr('width', this.x.bandwidth())
    .attr('height', d => this.height - this.y(d.value))
    .style('fill', (d, i) => this.colors(i));

    // add new bars
    bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => this.x(d.key))
    .attr('y', d => this.y(d.value))
    .attr('width', this.x.bandwidth())
    .attr('height', d => this.height - this.y(d.value))
    .style('fill', (d, i) => this.colors(i));
  }
}
