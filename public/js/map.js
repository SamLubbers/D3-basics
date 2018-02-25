chart_width = 1000;
chart_height = 600;

map_colors = d3.scaleQuantize()
	.domain([0, 1])
	.range(d3.schemeBlues[8]);

// geoPath with projection
projection = d3.geoAlbersUsa()
	.scale([chart_width])
	.translate([chart_width / 2, chart_height / 2]);

geo_path = d3.geoPath(projection);

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
