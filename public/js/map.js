chart_width = 1000;
chart_height = 600;

map_colors = d3.scaleQuantize()
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
		d3.min(us_flu_dataset, (d) => parseFloat(d.num)),
		d3.max(us_flu_dataset, (d) => parseFloat(d.num))
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
			.attr('stroke-width', 1)

		draw_cities();
	});

});

function draw_cities() {
	d3.json('../data/us-geo/us-cities.json', function(us_cities_dataset) {

		population_scale = d3.scaleSqrt()
			.domain([
				d3.min(us_cities_dataset, (d) => parseInt(d.population)),
				d3.max(us_cities_dataset, (d) => parseInt(d.population))
			])
			.rangeRound([10, 20]);

		// map coordinates to projections on svg
		us_cities_dataset.forEach(function(e, i) {
			var [x, y] = projection([e.lon, e.lat]);
			us_cities_dataset[i].x = x;
			us_cities_dataset[i].y = y;
		});

		svg.selectAll('circle')
			.data(us_cities_dataset)
			.enter()
			.append('circle')
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)
			.attr('r', (d) => population_scale(d.population))
			.attr('fill', '#4CFFF4')
			.attr('opacity', '0.8')
			.on('mouseover', function(d) {
				self = d3.select(this);
				var [x, y] = projection([d.lon, d.lat]);
				x = x - 25 - self.attr('r') / 2 - d.city.length;
				y = y - 40;
				d3.select('#tooltip')
					.style('left', x + 'px')
					.style('top', y + 'px')
					.style('display', 'block')
					.text(d.city);
			})
			.on('mouseout', function() {
				d3.select('#tooltip')
					.style('display', 'none')
			});
	});
}
