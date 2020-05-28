import tableFactory from '../common/table-factory';

export default async function lifeExpactancyTable() {
  const getData = async () => {
    try {
      const response = await fetch('data/who-gho-life-expectancy.json');
      const raw = await response.json();
      return raw.fact.filter( d => d.dim.GHO === 'Life expectancy at birth (years)'
        && d.dim.SEX === 'Both sexes'
        && d.dim.YEAR === '2014')
        .map( d => [
          d.dim.COUNTRY,
          d.Value
        ])
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  const data = await getData();
  // console.log('data', data);
  data.unshift(['Country', 'Life expectancy (years from birth)']);
  return tableFactory(data);
}