import * as d3 from 'd3';
import chartFactory from '../common';
import spirograph from './spirograph';
import prisonChart from './prisonChart';

// spirograph(false);

function easingChart(enabled) {
  if (!enabled) return;

  const chart = chartFactory();
  
  const easing = ['easeLinear', 'easePolyIn(4)', 'easeQuadIn',
    'easeCubicIn', 'easeSinIn', 'easeExpIn', 'easeCircleIn', 'easeElasticIn(10, -5)',
    'easeBackIn(0.5)', 'easeBounceIn', 'easeCubicIn', 'easeCubicOut',
    'easeCubicInOut'];
  const y = d3.scaleBand()
    .domain(easing)
    .range([50, 500]);
  const svg = chart.container;

  easing.forEach((easing) => {
    const transition = svg.append('circle')
      .attr('cx', 30)
      .attr('cy', y(easing))
      .attr('r', (y.bandwidth() / 2) - 5)
      .transition()
      .delay(400)
      .duration(1500)
      .attr('cx', 500);

    if (easing.indexOf('(') > -1) {
      const args = easing.match(/[0-9]+/g);
      const funcName = easing.match(/^[a-z]+/i).shift();
      const type = d3[funcName];
      transition.ease(type, args[0], args[1]);
    } else {
      const type = d3[easing];
      transition.ease(type);
    }

    svg.append('text')
      .text(easing)
      .attr('x', 10)
      .attr('y', y(easing) + 5);
  })

  console.log('easingChart', y.bandwidth());
}

(async (enabled) => {
  if (!enabled) return;
  await prisonChart.init();
  const data = prisonChart.data;
  function getRandomInit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomChart = () => {
    try {
      const from = getRandomInit(0, data.length - 1);
      const to = getRandomInit(from, data.length - 1);
      prisonChart.update(data.slice(from, to));
    } catch(e) {
      console.error(e);
    }
  }
  prisonChart.update(data);
  setInterval(randomChart, 5000);
})(true);
export default easingChart;