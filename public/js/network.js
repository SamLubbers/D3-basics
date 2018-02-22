d3.json('../data/countries.json', function(error, dataset) {
  if (error) throw error;

  num_nodes = 10;
  nodes = dataset.splice(0, num_nodes);

  links = create_random_links(nodes);
})

function create_random_links(nodes) {
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
