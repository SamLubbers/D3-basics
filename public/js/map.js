chart_width = 1000;
chart_height = 1000;

map_colors = d3.scaleQuantize()
	.domain([0, 1])
	.range(['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1',
		'#6baed6', '#4292c6', '#2171b5', '#084594'
	]);

// geoPath
geo_path = d3.geoPath(d3.geoAlbersUsa());

svg = d3.select('#chart-L')
	.append('svg')
	.attr('width', chart_width)
	.attr('height', chart_height);

d3.json('../data/us-geo/us.json', function(dataset) {
	svg.selectAll('path')
		.data(dataset.features)
		.enter()
		.append('path')
		.attr('d', geo_path)
		.attr('fill', 'white')
		.attr('stroke', '#4285F4')
		.attr('stroke-width', 1);
});
