var dataset = [1, 2, 3, 4, 5]

var el = d3.select('body')
				.selectAll('p')
				.data(dataset)
				.enter()
				.append('p')
				.text(function(d){
					return 'this paragraph is binded to the value ' + d
				});
