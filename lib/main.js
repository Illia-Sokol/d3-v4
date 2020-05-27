import * as d3 from 'd3';
import * as styles from '../styles/index.css';

const chart = d3.select('body')
  .append('svg')
  .attr('id', 'chart');

const req = new window.XMLHttpRequest();
req.addEventListener('load', mungetData);
req.open('GET', 'data/EU-referendum-result-data.csv')
req.send();

function mungetData() {
  const data = d3.csvParse(this.responseText);
  const regions = data.reduce((last, row) => {
    if (!last[row.Region]) {
      last[row.Region] = [];
    };
    last[row.Region].push(row);
    return last;
  }, {});
  const regionsPctTurnout = Object.entries(regions)
    .map(([region, areas]) => ({
      region,
      meanPctTurnout: d3.mean(areas, d => d.Pct_Turnout)
    }))

  renderChart(regionsPctTurnout);
}

function renderChart(data) {
  // console.log('data', data);
  chart.attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  const x = d3.scaleBand()
    .domain(data.map(d => d.region))
    .rangeRound([50, window.innerWidth - 50])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.meanPctTurnout)])
    .range([window.innerHeight - 50, 50]);

  const xAxis = d3.axisBottom().scale(x);
  const yAxis = d3.axisLeft().scale(y);

  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${window.innerHeight - 50})`)
    .call(xAxis);

  chart.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);
  
  chart.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.region))
    // .attr('y', d => y(d.meanPctTurnout))
    // .attr('width', x.bandwidth())
    // .attr('height', d => (window.innerHeight - 50) - y(d.meanPctTurnout));
    .attr('y', window.innerHeight - 50)
      .attr('width', x.bandwidth())
      .attr('height', 100)
      .transition()
      .delay((d, i) => i * 50)
      .duration(1000)
      .attr('y', d => y(d.meanPctTurnout))
      .attr('height', d => (window.innerHeight - 50) - y(d.meanPctTurnout));
}
