var dataset            =   [
    [ 400, 200 ],
    [ 210,140 ],
    [ 722,300 ],
    [ 70,160 ],
    [ 250,50 ],
    [ 110,280 ],
    [ 699,225 ],
    [ 90, 220 ]
];
var chart_width     =   800;
var chart_height    =   400;
var radius = 5;
var padding = 50;

// create svg element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

x_values = dataset.map(x => x[0]);
y_values = dataset.map(x => x[1]);


// create scales
x_scale = d3.scaleLinear()
    .domain([0,d3.max(x_values)])
    .range([padding, chart_width - padding]);

y_scale = d3.scaleLinear()
    .domain([0,d3.max(y_values)])
    .range([chart_height - padding, padding]);

// create axis
x_axis = d3.axisBottom( x_scale);
y_axis = d3.axisLeft(y_scale);

// add axis
svg.append('g')
  .call(x_axis)
  .attr('class', 'axis')
  .attr('transform', 'translate(0,'+(chart_height-padding)+')')

svg.append('g')
  .call(y_axis)
  .attr('class', 'axis')
  .attr('transform', 'translate('+padding+',0)')
// create circles
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    return x_scale(d[0]);
  })
  .attr('cy', function(d){
    return y_scale(d[1]);
  })
  .attr('r', radius)
  .attr('fill', '#444')
