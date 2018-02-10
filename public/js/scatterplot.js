var dataset = [
  [400, 200],
  [210, 140],
  [722, 300],
  [70, 160],
  [250, 50],
  [110, 280],
  [699, 225],
  [90, 220]
];
var chart_width = 800;
var chart_height = 400;
var radius = 5;
var padding = 50;

// create svg element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// create scales
x_scale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, chart_width - padding]);

y_scale = d3.scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([chart_height - padding, padding]);

// create axis
x_axis = d3.axisBottom(x_scale);
y_axis = d3.axisLeft(y_scale)
  .ticks('6');

// add axis
svg.append('g')
  .call(x_axis)
  .attr('class', 'axis')
	.attr('id', 'x_axis')
  .attr('transform', 'translate(0,' + (chart_height - padding) + ')')

svg.append('g')
  .call(y_axis)
  .attr('class', 'axis')
	.attr('id', 'y_axis')
  .attr('transform', 'translate(' + padding + ',0)')

// create circles
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return x_scale(d[0]);
  })
  .attr('cy', function(d) {
    return y_scale(d[1]);
  })
  .attr('r', radius)
  .attr('fill', '#4285F4')

// update chart
d3.select('#graph-update-button').on('click', function(){
	dataset = dataset.map(x => [Math.random() * 700, Math.random() * 300])

	x_scale.domain([0, d3.max(dataset, (d) => d[0])]);
	y_scale.domain([0, d3.max(dataset, (d) => d[1])]);

	svg.selectAll('circle')
		.data(dataset)
		.transition()
		.duration(1000)
		.ease(d3.easeCubicInOut)
		.attr('cx', (d) => x_scale(d[0]))
		.attr('cy', (d) => y_scale(d[1]));

	svg.select('#x_axis')
		.transition()
		.duration(1000)
		.call(x_axis);

	svg.select('#y_axis')
		.transition()
		.duration(1000)
		.call(y_axis)
});
