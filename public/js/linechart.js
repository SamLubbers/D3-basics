// create dataset
dataset = [];

for (var i = 1990; i <= 2010; i++) {
  dataset.push({
    'date': i,
    'value': Math.round(i * i / 100 - Math.random() * 100)
  });
}

var timeParse = d3.timeParse('%Y');
var timeFormat = d3.timeFormat('%Y');

var chart_width = 1000;
var chart_height = 600;
var padding = 75;

dataset.forEach(function(d, i) {
  dataset[i].date = timeParse(d.date);
});

// scales
x_scale = d3.scaleTime()
  .domain([d3.min(dataset.map(x => x.date)),
    d3.max(dataset.map(x => x.date))
  ])
  .range([padding, chart_width - padding]);

y_scale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(x => x.value))])
  .range([chart_height - padding, padding]);

// svg
svg = d3.select('#chart-L')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// axes
x_axis = d3.axisBottom(x_scale)
  .ticks(10)
  .tickFormat(timeFormat);

y_axis = d3.axisLeft(y_scale)
  .ticks(8);

svg.append('g')
  .call(x_axis)
  .attr('class', 'axis')
  .attr('id', ' x_axis')
  .attr('transform', 'translate(0,' + (chart_height - padding) + ')');

svg.append('g')
  .call(y_axis)
  .attr('class', 'axis')
  .attr('id', 'y_axis')
  .attr('transform', 'translate(' + padding + ',0)');
