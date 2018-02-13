// create dataset
dataset = []
for (var i = 0; i < 10; i++) {
  dataset.push(Math.round(Math.random() * 100) + 10);
}

chart_height = 400
chart_width = 800
  // padding = chart_width / dataset.length;
bar_padding = 5; // spacing between bars

// scales
x_scale = d3.scaleLinear()
  .domain([0, dataset.length])
  .range([0, chart_width]);

y_scale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, chart_height]);

// create bars

svg = d3.select('#chart')
  .append('svg')
  .attr('height', chart_height)
  .attr('width', chart_width)

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => x_scale(i))
  .attr('y', (d) => chart_height - y_scale(d))
  .attr('width', chart_width / dataset.length - bar_padding)
  .attr('height', (d) => y_scale(d))
  .attr('fill', '#4285F4')

// create text
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text((d) => d)
  .attr('x', (d, i) => x_scale(i) + ((chart_width / dataset.length -
    bar_padding) / 2))
  .attr('y', (d) => chart_height - y_scale(d) + 20)
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')


sort_ascending = true;
// events
d3.select('#graph-sort').on('click', function() {
  d3.selectAll('rect')
    .sort((a, b) => (sort_ascending ? d3.ascending(a, b) : d3.ascending(b,
      a)))
    .transition()
    .duration(1000)
    .attr('x', (d, i) => x_scale(i));

  d3.selectAll('text')
    .sort((a, b) => (sort_ascending ? d3.ascending(a, b) : d3.ascending(b,
      a)))
    .transition()
    .duration(1000)
    .attr('x', (d, i) => x_scale(i) + ((chart_width / dataset.length -
      bar_padding) / 2));

  sort_ascending = !sort_ascending;
});
