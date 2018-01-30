var dataset = [10,20,30,40,50];

d3.select('#chart')
  .selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .attr('class', 'bar')
  .style('height', function(d){
    var height = d*8
    return height+'px';
  });
