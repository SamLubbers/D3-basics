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
var radius = 5
// create svg element
var svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// create circles
svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d){
    x_values = dataset.map(x => x[0]);
    return d[0] * (chart_width - radius * 2) / Math.max(...x_values);
  })
  .attr('cy', function(d){
    y_values = dataset.map(x => x[1]);
    return d[1] * (chart_height - radius * 2) / Math.max(...y_values);
  })
  .attr('r', radius)
  .attr('fill', '#444')
