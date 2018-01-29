var dataset = [1, 2, 3, 4, 5]

var el = d3.select('body')
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
