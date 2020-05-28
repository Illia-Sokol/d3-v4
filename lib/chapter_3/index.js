import chartFactory from '../common/index';
import * as d3 from 'd3';

export function yayPaths() {
  const chart = chartFactory();

  // const path = chart.container.append('path')
  //   .attr('d', 'M 10 500 L 300 100L 300 500 M 300 100 l 100 0 M 155 300 l 245 0 M 300 500 l 100 0')
  //   .attr('stroke', 'black')
  //   .attr('stroke-width', 2)
  //   .attr('fill', 'transparent')

  // create line
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

  const g1 = chart.container.append('g');
  g1.append('path')
    .datum(sine)
    .attr('d', line)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  g1.append('path')
    .datum(sine)
    .attr('d', line.curve(d3.curveNatural))
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('fill', 'none')


  // create area
  const g2 = chart.container.append('g')
    .attr('transform',
      `translate(${(chart.width / 2) + (chart.margin.left + chart.margin.right)},
      ${chart.margin.top})`
    )

  const area = d3.area()
    .x(d => x(d[0]))
    .y0(chart.height / 2)
    .y1(d => y(d[1]))
    .curve(d3.curveBasis);

  g2.append('path')
    .datum(sine)
    .attr('d', area)
    .attr('fill', 'steelblue')
    .attr('fill-pacity', 0.4);

  g2.append('path')
    .datum(sine)
    .attr('d', line.curve(d3.curveBasis))
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'none');


  // creare arc
  const arc = d3.arc();
  const g3 = chart.container.append('g')
    .attr('transform', `
      translate(${chart.margin.left + chart.margin.right},
      ${chart.height / 2 + (chart.margin.top + chart.margin.bottom)})
    `);

  g3.append('path')
    .attr('d',
      arc({
        outerRadius: 100,
        innerRadius: 50,
        startAngle: -Math.PI * 0.25,
        endAngle: Math.PI * 0.25
      })
    )
    .attr('transform', 'translate(150, 150)')
    .attr('fill', 'lightslategrey');

  
  // create symbol
  const symbols = d3.symbol()
    .type( d => (d[1] > 0 ? d3.symbolCircle : d3.symbolDiamond))
    .size((d, i) => (i % 2 ? 0 : 64));

  g2.selectAll('path')
    .data(sine)
    .enter()
    .append('path')
    .attr('d', symbols)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'white')
    .attr('transform', d => `translate(${x(d[0])}, ${y(d[1])})`)

  g3.append('g')
    .selectAll('path')
    .data([{
      source: {
        radius: 50,
        startAngle: -Math.PI * 0.30,
        endAngle: -Math.PI * 0.20
      },
      target: {
        radius: 50,
        startAngle: Math.PI * 30,
        endAngle: Math.PI * 0.30
      }
    }])
    .enter()
    .append('path')
    .attr('d', d3.ribbon());

  const data = d3.zip(d3.range(0, 12), d3.shuffle(d3.range(0, 12)));
  const colors = ['linen', 'lightsteelblue', 'lightcyan', 'lavender', 'honeydew', 'gainsboro'];
  const ribbon = d3.ribbon()
    .source(d => d[0])
    .target(d => d[1])
    .radius(150)
    .startAngle(d => -2 * Math.PI * (1 / data.length) * d)
    .endAngle(d => -2 * Math.PI * (1 / data.length) * ((d - 1) % data.length));

  g3.append('g')
    .attr('transform', 'translate(300, 300)')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', ribbon)
    .attr('fill', (d, i) => colors[i % colors.length])
    .attr('stroke', (d, i) => colors[(i + 1) % colors.length]);
}
yayPaths();