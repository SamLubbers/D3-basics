var dataset = [];

//random data generation
for( var i = 0; i<25;i++){
  dataset[i] = Math.round(Math.random() * 50)
}

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
