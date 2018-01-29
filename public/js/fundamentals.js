d3.csv('../data/example_csv.csv', function(err, data){
  if(err){
    console.log(err);
  }
  generate(data.columns);
});

function generate(dataset){
	d3.select('body')
	.selectAll('p')
	.data(dataset)
	.enter()
	.append('p')
	.text(function(d){
		return 'this paragraph is binded to the value ' + d
	}).attr('class', function(d){
		if(d>3){
			return 'foo'
		}else{
			return null
		}
	})
	.classed('bar', function(d){
		return d < 3;
	})
	.style('color', function(d){
		if (d > 3){
			return 'red';
		}else{
			return 'blue';
		}
	});
}
