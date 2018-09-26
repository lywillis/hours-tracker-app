import { Component, OnInit, Input, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  @Input() project: Project;
  @ViewChild('chart') private chartContainer: ElementRef;

  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private height: number;
  private width: number;
  private x: any; // x axis scale
  private y: any; // y axis scale
  svg: any;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.initChart();
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
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.initAxis();
  }

  private initAxis() {
    this.x = d3.scaleBand().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([this.height, 0]);
  }
}
