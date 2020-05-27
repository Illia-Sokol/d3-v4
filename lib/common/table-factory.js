import * as d3 from 'd3';

export default function tableFactory(_rows) {
  const rows = Array.from(_rows);
  const header = rows.shift();
  const data = rows;

  const table = d3.select('body')
    .append('table')
    .attr('class', 'table');

    return {
      table,
      header,
      data
    };
}