// create random categorical data
var dataset = [];

categories = ['Spain', 'UK', 'France', 'Italy', 'Germany', 'Canada', 'US', 'Mexico'];

for (var i = 0; i < 50; i++) {
  dataset.push(categories[Math.floor(Math.random() * categories.length)])
}

/*
obtain unique values of an array with keys associated to each item
*/
function unique_with_keys(array){
	unique_keyed_dataset = [];
	array = [...new Set(array)];
	for (var i = 0; i < array.length; i++) {
		unique_keyed_dataset.push({'key':i,'value':array[i]});
	}
	return unique_keyed_dataset;
}

// create svg container
chart_height = 400;
chart_width = 800;
bar_padding = 5; // spacing between bars

var svg = d3.select('#chart')
  .append('svg')
  .attr('height', chart_height)
  .attr('width', chart_width);

// count number of elements in each array
function number_of_items(dataset, item) {
  return dataset.filter(x => x == item).length;
};

// find the most frequent item in a categorical dataset
function most_frequent_item(dataset) {
  unique_values = [...new Set(dataset)];
  most_frequent = '';
  max_count = 0;
  for (value of unique_values) {
    value_count = number_of_items(dataset, value);
    if (value_count > max_count) {
      max_count = value_count;
      most_frequent = value
    };
  };
  return most_frequent;
};

// scales
x_scale = d3.scaleBand()
  .domain(dataset)
  .rangeRound([0, chart_width])
  .paddingInner(0.05);

y_scale = d3.scaleLinear()
  .domain([0, number_of_items(dataset, most_frequent_item(dataset))])
  .rangeRound([0, chart_height]);

// bind data and create bars
svg.selectAll('rect')
  .data(unique_with_keys(dataset), (d) => d.key)
  .enter()
  .append('rect')
  .attr('x', (d) => x_scale(d.value))
  .attr('y', function(d) {
    return chart_height - y_scale(number_of_items(dataset, d.value));
  })
  .attr('width', x_scale.bandwidth())
  .attr('height', function(d) {
    return y_scale(number_of_items(dataset, d.value));
  })
  .attr('fill', '#4285F4');

// create labels
svg.selectAll('text')
  .data(unique_with_keys(dataset), (d) => d.key)
  .enter()
  .append('text')
  .text((d) => d.value)
  .attr('x', function(d, i) {
    return x_scale(d.value) + x_scale.bandwidth() / 2;
  })
  .attr('y', function(d) {
    // set text inside charts
    return chart_height - y_scale(number_of_items(dataset, d.value)) + 20;
  })
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');

d3.select('#graph-add').on('click', function() {
  category = d3.select('#add-category').property('value');
  dataset.push(category);

  x_scale.domain(dataset);
  y_scale.domain([0, number_of_items(dataset, most_frequent_item(dataset))]);

  var bars = svg.selectAll('rect').data(unique_with_keys(dataset), (d) => d.key);

  bars.enter()
    .append('rect')
    .attr('x', (d) => x_scale(d.value))
    .attr('y', chart_height)
    .attr('height', 0)
    .attr('width', x_scale.bandwidth())
    .attr('fill', '#4285F4')
    .merge(bars)
    .transition()
    .duration(1000)
    .attr('x', (d) => x_scale(d.value))
    .attr('y', (d) => chart_height - y_scale(number_of_items(dataset, d.value)))
    .attr('width', x_scale.bandwidth())
    .attr('height', (d) => y_scale(number_of_items(dataset, d.value)));

  var labels = svg.selectAll('text').data(unique_with_keys(dataset), (d) => d.key)

  labels.enter()
		.append('text')
    .text((d) => d.value)
    .attr('x', (d) => x_scale(d.value) + x_scale.bandwidth() / 2)
    .attr('y', chart_height)
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .merge(labels)
    .transition()
    .duration(1000)
    .attr('x', (d) => x_scale(d.value) + x_scale.bandwidth() / 2)
		.attr('y', (d) => chart_height - y_scale(number_of_items(dataset, d.value)) + 20);
});

d3.select('#graph-delete').on('click', function(){

	category = d3.select('#remove-category').property('value');
	index = dataset.indexOf(category);
	if(index !== -1){
		dataset.splice(index, 1);
		x_scale.domain(dataset);
		y_scale.domain([0, number_of_items(dataset, most_frequent_item(dataset))]);

		var bars = svg.selectAll('rect').data(unique_with_keys(dataset), (d) => d.key);

		bars.transition()
			.duration(1000)
			.attr('x', (d) => x_scale(d.value))
			.attr('y', (d) => chart_height - y_scale(number_of_items(dataset, d.value)))
			.attr('width', x_scale.bandwidth())
			.attr('height', (d) => y_scale(number_of_items(dataset, d.value)));

		bars.exit()
			.transition()
			.attr('y', chart_height)
			.remove();

		var labels = svg.selectAll('text').data(unique_with_keys(dataset), (d) => d.key)

		labels.transition()
			.duration(1000)
			.attr('x', (d) => x_scale(d.value) + x_scale.bandwidth() / 2)
			.attr('y', (d) => chart_height - y_scale(number_of_items(dataset, d.value)) + 20);

		labels.exit()
			.transition()
			.attr('y', chart_height)
			.remove();
	}
});
