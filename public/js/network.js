// svg settings
chart_width = 600;
chart_height = 600;

var svg = d3.select('#chart-O')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);


d3.json('../data/countries.json', function(error, dataset) {
  if (error) throw error;

  // load dataset with nodes and create links
  num_nodes = 30;
  nodes_data = dataset.splice(0, num_nodes);

  links_data = create_pairs(nodes_data);

  // create nodes and links
  var links = svg.selectAll('line')
    .data(links_data)
    .enter()
    .append('line')
    .style('stroke', '#CCC')
    .style('stroke-width', 2);

  var nodes = svg.selectAll('circle')
    .data(nodes_data)
    .enter()
    .append('circle')
    .attr('r', 5)
    .style('fill', 'black');

  // force layout
  var force = d3.forceSimulation(nodes_data)
    .force('charge', d3.forceManyBody().strength(-20))
    .force('links', d3.forceLink(links_data).id((d) => d.name))
    .force('center',
      d3.forceCenter()
      .x(chart_width / 2)
      .y(chart_height / 2));

  force.on('tick', function() {
    nodes.attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)

    links.attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
  })
});

function create_pairs(nodes) {
  links = [];

  nodes_copy = nodes.slice();
  while (nodes_copy.length > 0) {
    link = {
      "source": nodes_copy.splice(Math.round(Math.random() * (nodes_copy.length -
        1)), 1)[0].name,
      "target": nodes_copy.splice(Math.round(Math.random() * (nodes_copy.length -
        1)), 1)[0].name
    }
    links.push(link);
  }
  return links;
}
