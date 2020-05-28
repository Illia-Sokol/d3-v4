import chartFactory from '../common/index';
import * as d3 from 'd3';

export function yayPaths() {
  const chart = chartFactory();

  // const path = chart.container.append('path')
  //   .attr('d', 'M 10 500 L 300 100L 300 500 M 300 100 l 100 0 M 155 300 l 245 0 M 300 500 l 100 0')
  //   .attr('stroke', 'black')
  //   .attr('stroke-width', 2)
  //   .attr('fill', 'transparent')

  const sine = d3.range(0, 10)
    .map(k => [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)])

  const x = d3.scaleLinear()
    .range([
      0,
      (chart.width / 2) - (chart.margin.left + chart.margin.right)
    ])
  .domain(d3.extent(sine, d => d[0]));

  const y = d3.scaleLinear()
    .range([
      (chart.height / 2) - (chart.margin.top + chart.margin.bottom),
      0
    ])
  .domain([-1, 1]);

  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]))

  const g = chart.container.append('g');
  console.log(sine);
  g.append('path')
    .datum(sine)
    .attr('d', line)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
}
yayPaths();