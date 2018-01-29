d3.csv('../data/example.csv', function(err, data){
  if(err){
    console.log(err);
  }
	// generate(data);
});

d3.json('../data/example.json', function(err, data){
	if(err){
		console.log(err);
	}else{
		generate(data)
	}
});

function generate(dataset){
	d3.select('body')
	.selectAll('p')
	.data(dataset)
	.enter()
	.append('p')
	.text(function(d){
		return 'the temperature in ' + d.location + ' is ' + d.temperature + 'ºC'
	}).attr('class', function(d){
		if(d.temperature>30){
			return 'warm'
		}else{
			return null
		}
	})
	.classed('cold', function(d){
		return d.temperature < 15;
	})
	.style('color', function(d){
		if (d.temperature > 20){
			return 'red';
		}else{
			return 'blue';
		}
	});
}
