import * as d3 from 'd3';

const protoChart = {
  width: window.innerWidth,
  height: window.innerHeight,
  margin: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  }
}

export default function chartFactory(opts, proto = protoChart) {
  const chart = Object.assign({}, proto, opts);
  // console.log('chart', chart);

  chart.svg = d3
    .select('body')
    .append('svg')
    .attr('id', chart.id || 'chart')
    .attr('width', chart.width - chart.margin.right)
    .attr('height', chart.height - chart.margin.bottom);

  chart.container = chart.svg
    .append('g')
    .attr('id', 'container')
    .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);

  // axes.forEach((axis, i) =>
  //   chart.container.append(g)
  //   .data(d3.range(0, amount))
  //   .classed('trippy', i%2)
  //   .attr('transform', `translate(0, ${(i * 50) + chart.margin.top})`)
  //   .call(axis)  
  // )

  return chart;
}