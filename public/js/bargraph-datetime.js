var dataset = [{
    "date": "01/01/18",
    "revenue": 1000
  },
  {
    "date": "01/02/18",
    "revenue": 2000
  },
  {
    "date": "01/03/18",
    "revenue": 3000
  },
  {
    "date": "01/04/18",
    "revenue": 4000
  },
  {
    "date": "01/05/18",
    "revenue": 5000
  },
  {
    "date": "01/06/18",
    "revenue": 6000
  },
  {
    "date": "01/07/18",
    "revenue": 5000
  },
  {
    "date": "01/08/18",
    "revenue": 4000
  },
  {
    "date": "01/09/18",
    "revenue": 3000
  },
  {
    "date": "01/10/18",
    "revenue": 3000
  },
  {
    "date": "01/11/18",
    "revenue": 8000
  },
  {
    "date": "01/12/18",
    "revenue": 10000
  }
]


// create svg container
chart_height = 400
chart_width = 800
padding = chart_width / dataset.length;
bar_padding = 5; // spacing between bars

var svg = d3.select('#chart')
  .append('svg')
  .attr('height', chart_height)
  .attr('width', chart_width)

// datetime formatting
parseTime = d3.timeParse("%d/%m/%y");
formatTime = d3.timeFormat("%e %b");

dataset.forEach(function(e, i) {
  dataset[i].date = parseTime(e.date)
});

// scales
time_scale = d3.scaleTime()
  .domain([d3.min(dataset.map(x => x.date)), d3.max(dataset.map(x => x.date))])
  .range([0, chart_width - padding]);

revenue_scale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(x => x.revenue))])
  .range([0, chart_height]);

// bind data and create bars
svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', function(d) {
    return time_scale(d.date);
  })
  .attr('y', function(d) {
    return chart_height - revenue_scale(d.revenue);
  })
  .attr('width', function(d, i) {
    if (i + 1 != dataset.length) {
      // right limit is the initial position of the next bar
      var right_limit = time_scale(dataset[i + 1].date);
    } else {
      // if this is the last bar the limit will be the end of the chart
      var right_limit = chart_width;
    }
    width = right_limit - time_scale(d.date) - bar_padding;
    return width;
  })
  .attr('height', function(d) {
    return revenue_scale(d.revenue)
  })
  .attr('fill', '#4285F4');

// create labels
svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function(d) {
    return formatTime(d.date);
  })
  .attr('x', function(d, i) {
    bar_position = time_scale(d.date)
    // center text in the chart
    if (i + 1 != dataset.length) {
      // right limit is the initial position of the next bar
      var right_limit = time_scale(dataset[i + 1].date);
    } else {
      // if this is the last bar the limit will be the end of the chart
      var right_limit = chart_width;
    }
    bar_middle = (right_limit - time_scale(d.date) - bar_padding) / 2;
    return bar_position + bar_middle;
  })
  .attr('y', function(d) {
    return chart_height - revenue_scale(d.revenue) + 18;
  })
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');

// event handler
d3.select('#graph-update-button').on('click', function() {

	dataset.forEach((o) => o.revenue = Math.random() * 9000 + 1000);

  svg.selectAll('rect')
    .data(dataset)
    .transition()
    .duration(1000)
		.ease(d3.easeCubicInOut)
    .attr('y', function(d) {
      return chart_height - revenue_scale(d.revenue);
    })
    .attr('height', function(d) {
      return revenue_scale(d.revenue);
    });


  svg.selectAll('text')
    .data(dataset)
    .transition()
    .duration(1000)
		.ease(d3.easeCubicInOut)
    .text(function(d) {
      return formatTime(d.date);
    })
    .attr('y', function(d) {
      return chart_height - revenue_scale(d.revenue) + 18;
    })
});
