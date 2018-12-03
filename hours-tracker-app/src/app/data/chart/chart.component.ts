import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation, OnChanges } from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import * as d3 from 'd3';
import { Datum } from '../../services/chart.service';

const minsPerHour = 60;
const secsPerMin = 60;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: Array<Datum>;
  @Input() title: string;
  @ViewChild('chart') private chartContainer: ElementRef;

  private margin = { top: 20, right: 30, bottom: 30, left: 40 };

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

    // init chart title as x axis title
    this.svg.append('text')
      .attr('class', 'axis-x label')
      .attr('x', this.width / 2 + this.margin.left)
      .attr('y', this.height + this.margin.top + this.margin.bottom)
      .attr('text-anchor', 'middle')
      .text(this.title);

    // init y axis
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.yAxis = this.svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.y));
    // y axis label
    this.svg.append('text')
      .attr('class', 'axis-y label')
      .attr('x', -(this.height / 2) - this.margin.top)
      .attr('y', this.margin.left / 6)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Total Duration');
  }

  private updateChart() {
    this.svg.select('.axis-x.label')
      .text(this.title);

    this.updateAxis();
    this.updateData();
  }
  private updateAxis() {
    const xDomain = this.data.map(d => d.key);
    this.x = this.x.domain(xDomain);
    this.xAxis.call(d3.axisBottom(this.x));
    const yDomain = [0, d3.max(this.data, d => d.value)];
    this.y = this.y.domain(yDomain);

    this.yAxis.call(
      d3.axisLeft(this.y)
        .tickFormat(this.timeFormat)
    );
  }

  private timeFormat = (d) => {
    const numFormat = d3.format('.2');
    if (d <= secsPerMin) { // seconds
      return numFormat(d) + 's';
    } else if (d <= secsPerMin * minsPerHour) { // minutes
      return numFormat(d / secsPerMin) + 'm';
     } else { return numFormat(d / (secsPerMin * minsPerHour)) + 'h'; }
  }
  private updateData() {
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['lightblue', 'blue']);
    const textPadding = 5;

    const bars = this.chart.selectAll('.bar').data(this.data);
    const vals = this.chart.selectAll('.val').data(this.data);

    bars.exit().remove();
    vals.exit().remove();

    // update existing bars
    bars.attr('class', 'bar')
      .attr('x', d => this.x(d.key))
      .attr('y', d => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', d => this.height - this.y(d.value))
      .style('fill', (d, i) => this.colors(i));

    vals.attr('class', 'val')
      .attr('x', d => this.x(d.key) + this.x.bandwidth() / 2)
      .attr('y', d => this.y(d.value) - textPadding)
      .text(d => {
        if (d.value !== 0) {
          return this.timeFormat(d.value);
        }
      }
      );

    // add new bars
    bars.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.x(d.key))
      .attr('y', d => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', d => this.height - this.y(d.value))
      .style('fill', (d, i) => this.colors(i));

    vals.enter()
      .append('text')
      .attr('class', 'val')
      .attr('text-anchor', 'middle')
      .attr('x', d => this.x(d.key) + this.x.bandwidth() / 2)
      .attr('y', d => this.y(d.value) - textPadding)
      .text(d => {
        if (d.value !== 0) {
          return d.value;
        }
      }
      );
  }
}
