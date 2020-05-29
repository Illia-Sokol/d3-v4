import chartFactory from '../common/index';
import * as d3 from 'd3';

// const chart = chartFactory();

(function ordinalScales() {
  const chart = chartFactory();
  const data = d3.range(30);
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const points = d3.scalePoint()
    .domain(data)
    .range([0, chart.height])
    .padding(1.0);

  const bands = d3.scaleBand()
    .domain(data)
    .range([0, chart.width])
    .padding(0.1);
  
  chart.container.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', d3.symbol()
      .type(d3.symbolCircle)
      .size(10)
    )
    .attr('transform', d => {
      return `translate(${(chart.width / 2)},
      ${points(d)})`;
    })
    .style('fill', d => colors(d));

  chart.container.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => bands(d))
    .attr('y', chart.height / 2)
    .attr('width', bands.bandwidth)
    .attr('height', 10)
    .style('fill', d => colors(d));

}());