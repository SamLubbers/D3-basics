// create random categorical data
var dataset = [];

categories = ['yes', 'no', 'unsure'];

for (var i = 0; i < 50; i++) {
  dataset.push(categories[Math.floor(Math.random() * categories.length)])
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
function number_of_items(dataset, item){
  return dataset.filter(x => x == item).length;
};

// find the most frequent item in a categorical dataset
function most_frequent_item(dataset){
  unique_values = [...new Set(dataset)];
  most_frequent = '';
  max_count = 0;
  for(value of unique_values){
    value_count = number_of_items(dataset, value);
    if(value_count > max_count){
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
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d){
    return x_scale(d);
  })
  .attr('y', function(d){
    return chart_height - y_scale(number_of_items(dataset, d));
  })
  .attr('width', x_scale.bandwidth())
  .attr('height', function(d){
    return y_scale(number_of_items(dataset,d));
  })
  .attr('fill', '#01FF70');

// create labels
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d){
    return d;
  })
  .attr('x', function(d, i){
    return x_scale(d) + x_scale.bandwidth()/2;
  })
  .attr('y', function(d){
    // set text inside charts
    return Math.round(chart_height - y_scale(number_of_items(dataset, d)) + 20);
  })
  .attr('fill', '#777')
  .attr('text-anchor', 'middle');
