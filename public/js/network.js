// svg settings
chart_width = 600;
chart_height = 600;

var svg = d3.select('#chart-O')
	.append('svg')
	.attr('width', chart_width)
	.attr('height', chart_height);

// force layout
var simulation = d3.forceSimulation()
	.force('charge', d3.forceManyBody().strength(-200))
	.force('center',
		d3.forceCenter()
		.x(chart_width / 2)
		.y(chart_height / 2));

d3.json('../data/countries.json', function(error, dataset) {
	if (error) throw error;

	// load dataset with nodes and create links
	num_nodes = 10;
	nodes_data = dataset.splice(0, num_nodes);

	links_data = create_network_links(nodes_data);

	simulation.nodes(nodes_data)
		.on('tick', ticked);

	simulation.force('links', d3.forceLink(links_data).id((d) => d.name));

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
		.style('fill', '#4285F4')
		.call(d3.drag()
			.on('start', dragStarted)
			.on('drag', dragging)
			.on('end', dragEnded));

	function ticked() {
		nodes.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)

		links.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y)
	}

});

function create_network_links(nodes) {
	circular_links = create_circular_links(nodes);
	pair_links = create_pair_links(nodes);
	network_links = circular_links.concat(pair_links);
	return network_links;
}
// dynamically create links
function create_circular_links(nodes) {
	links = [];

	for (var i = 0; i < nodes.length; i++) {
		source = nodes[i];
		if (i == nodes.length - 1) {
			target = nodes[0]
		} else {
			target = nodes[i + 1]
		}
		link = {
			"source": source,
			"target": target
		}
		links.push(link)
	}
	return links;
}

function create_pair_links(nodes) {
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

function dragStarted(d) {
	if (!d3.event.active) {
		simulation.alphaTarget(0.3).restart();
	}
	d.fx = d.x;
	d.fy = d.y;
}

function dragging(d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragEnded(d) {
	if (!d3.event.active) {
		simulation.alphaTarget(0);
	}
	d.fx = null;
	d.fy = null;
}
