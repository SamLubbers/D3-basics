// create data
dataset = []

countries = ['Botswana', 'Tanzania', 'Madagascar']

num_instances = 5
for (var i = 0; i < 5; i++) {
	obj = {};
	for (country of countries) {
		obj[country] = Math.round(Math.random() * 20) + 5;
	}
	dataset.push(obj);
}

// chart settings
chart_width = 800;
chart_height = 400;
padding_inner = 0.05

// colors
color = d3.interpolateMagma;
start_color = 0.6;
end_color = 0.9;
color_scale = d3.scaleBand()
	.domain(d3.range(countries.length))
	.range([start_color, end_color]);

// layout
var stack = d3.stack().keys(countries);

var stack_dataset = stack(dataset);

// scales
x_scale = d3.scaleBand()
	.domain(d3.range(dataset.length))
	.range([0, chart_width])
	.paddingInner(padding_inner);

y_scale = d3.scaleLinear()
	.domain([0, d3.max(dataset, (d) => Object.values(d).reduce((a, b) => a + b))])
	.range([chart_height, 0]);

// draw elements
var svg = d3.select('#chart')
	.append('svg')
	.attr('width', chart_width)
	.attr('height', chart_height);

var stacked_groups = svg.selectAll('g')
	.data(stack_dataset)
	.enter()
	.append('g')
	.attr('fill', (d, i) => color(color_scale(i)));

stacked_groups.selectAll('rect')
	.data((d) => d)
	.enter()
	.append('rect')
	.attr('x', (d, i) => x_scale(i))
	.attr('y', (d) => y_scale(d[1]))
	.attr('height', (d) => y_scale(d[0]) - y_scale(d[1]))
	.attr('width', x_scale.bandwidth());
