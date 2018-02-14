// dataset
var dataset = [];

// create dataset where all values round up to 100
num_instances = 4
for (var i = 0; i < num_instances; i++) {
  if (i == num_instances - 1) {
    dataset.push(100 - dataset.reduce((a, b) => a + b, 0));
  } else {
    dataset.push(Math.round(Math.random() * 33) + 5);
  }
}

var chart_width = 600;
var chart_height = 600;
var color = d3.scaleOrdinal(d3.schemeGreys[dataset.length]);

// create svg element
svg = d3.select('#chart-O')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// scale our data to angles for pie chart
var pie = d3.pie();

// circular sector
var arc = d3.arc()
  .innerRadius(chart_width / 3)
  .outerRadius(chart_width / 2);

// groups with angles where arcs need to be created
coordinates = svg.selectAll('g.coor')
  .data(pie(dataset))
  .enter()
  .append('g')
  .attr('class', 'coor')
  .attr('transform',
    'translate(' + chart_width / 2 + ',' + chart_height / 2 + ')')


coordinates.append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => color(i))
  .attr('class', 'arc')
  .on('mouseover', function(d, i) {
    d3.selectAll('path.arc')
      .transition('highlight')
      .attr('fill', '#ECF4FC')
    d3.select(this)
      .transition()
      .attr('fill', '#4285F4')
    d3.select('#text_' + i)
      .transition('text')
      .attr('fill', 'white');
  })
  .on('mouseout', function(d, i) {
    d3.selectAll('path.arc')
      .transition('highlight')
      .attr('fill', (d, i) => color(i));
    d3.select('#text_' + i)
      .transition('text')
      .attr('fill', 'none');

  });

coordinates.append('text')
  .attr('transform', function(d) {
    return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('text-anchor', 'text-middle')
  .text((d) => d.value)
  .attr('id', (d, i) => 'text_' + i)
  .attr('fill', 'none')
  .style('font-size', '18px')
  .style('pointer-events', 'none');
