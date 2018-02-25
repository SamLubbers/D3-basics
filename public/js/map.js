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

d3.json('../data/us-geo/us-flu.json', function(us_flu_dataset) {
	map_colors.domain([
		d3.min(us_flu_dataset, (d) => d.num),
		d3.max(us_flu_dataset, (d) => d.num)
	]);

	d3.json('../data/us-geo/us.json', function(us_dataset) {
		us_dataset.features.forEach(function(us_e, us_i) {
			state = us_e.properties.name;
			us_flu_dataset.forEach(function(flu_e) {
				if (flu_e.state === state) {
					us_dataset.features[us_i].properties.flu_risk = flu_e.num;
				}
			})
		})
		svg.selectAll('path')
			.data(us_dataset.features)
			.enter()
			.append('path')
			.attr('d', geo_path)
			.attr('fill', function(d) {
				if (d.properties.flu_risk) {
					return map_colors(d.properties.flu_risk)
				} else {
					return '#DFDFDF'
				}
			})
			.attr('stroke', function(d) {
				if (d.properties.flu_risk) {
					return '#4285F4';
				} else {
					return '#DFDFDF';
				}
			})
			.attr('stroke-width', 1);
	});

});
