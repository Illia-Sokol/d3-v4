import * as d3 from 'd3';

export default function tableFactory(_rows) {
  const rows = Array.from(_rows);
  const header = rows.shift();
  const data = rows;

  const table = d3.select('body')
    .append('table')
    .attr('class', 'table');

  const tableHeader = table.append('thead')
    .append('tr');

  const tableBody = table.append('tbody');

  header.forEach(value => {
    tableHeader.append('th')
      .text(value);
  });

  console.log(data);
  data.forEach(row => {
    const tableRow = tableBody.append('tr');
    row.forEach(value => {
      tableRow.append('td')
        .text(value);
    })
  })

    return {
      table,
      header,
      data
    };
}