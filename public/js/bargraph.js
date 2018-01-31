var dataset = [];

// random data generation
for( var i = 0; i<25;i++){
  dataset[i] = Math.round(Math.random() * 50)
}

// create svg container
chart_height = 400
chart_width = 800
bar_padding = 1 // spacing between bars

var svg = d3.select('#chart')
  .append('svg')
  .attr('height', chart_height)
  .attr('width', chart_width)


// bind data and create bars
svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d, i){
    // set the spacing dynamically adjusted to the data
    return i * (chart_width / dataset.length);
  })
  .attr('y', function(d){
    // set height dynamically so that bars start at bottom of chart
    return chart_height - (d * chart_height / Math.max(...dataset));
  })
  .attr('width', function(d){
    // set the bars width dynamically adjusted to the data
    return (chart_width / dataset.length) - bar_padding;
  })
  .attr('height', function(d){
    // set the bars height dynamically adjusted to the data
    return d * chart_height / Math.max(...dataset);
  })
  .attr('fill', '#01FF70');

// create labels
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d){
    return d
  })
  .attr('x', function(d, i){
    // center text in the chart
    bar_position = i * (chart_width / dataset.length);
    bar_middle = ((chart_width/dataset.length) - bar_padding) / 2;
    return bar_position + bar_middle;
  })
  .attr('y', function(d){
    // set text inside charts
    return chart_height - (d * chart_height / Math.max(...dataset)) + 18;
  })
  .attr('fill', '#777')
  .attr('text-anchor', 'middle');
