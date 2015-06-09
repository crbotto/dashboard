var DASH = {
	"mydata" : [['Year', 'Q1', 'Q2' , 'Q3', 'Q4'],['2013',15,8,17,24], ['2014',23,19,34,33], ['2015',28,25,34,35],['2016',35,32,38,40],['2017',30,38,45,48]],
	"DEFAULT_QUARTER":1,

	//init function to be called with the "ready" event
	"init":function(){
	/* This is the code to load data from an external source, data format: JSON
		$('#getdata-button').live('click', function(){
			$.getJSON('url', function(data) {
				this.mydata = data;
				displayData();
			});
		});
	*/	
		this.displayData();
		this.drawPieChart(this.DEFAULT_QUARTER);
		this.drawColumnChart();	
		this.drawCurveChart();	
	},

	"displayData":function(){
		$('#dataTable').append('<tr class="tabletitle" style="background:coral;"><td>Year</td><td>Q1</td><td>Q2</td><td>Q3</td><td>Q4</td></tr>');
		var table = $('#dataTable').children();  
		for(var i = 1; i < this.mydata.length; i++){
			if(i%2 == 0)
				table.append('<tr style="background:lightblue;"><td>' + this.mydata[i][0] + '</td><td>' + this.mydata[i][1] + '</td><td>' + this.mydata[i][2] + '</td><td>' + this.mydata[i][3] + '</td><td>' + this.mydata[i][4] + '</td></tr>');
			else
				table.append('<tr style="background:CornflowerBlue;"><td>' + this.mydata[i][0] + '</td><td>' + this.mydata[i][1] + '</td><td>' + this.mydata[i][2] + '</td><td>' + this.mydata[i][3] + '</td><td>' + this.mydata[i][4] + '</td></tr>');

		}
	},

	"createPieChart":function(){
		google.setOnLoadCallback(drawPieChart);
	},

	"drawPieChart":function(quarter){
		//first build an array with the data selected for the Pie chart
		var chartData = [[]];

		//starts from 1 to skip the title row
		for(var i = 1; i < this.mydata.length; i++){
			if (!chartData[i-1]){
				chartData[i-1] = [];
			}
			chartData[i-1][0] = this.mydata[i][0];
			chartData[i-1][1] = this.mydata[i][quarter];	
		}

		
		//Now build Goggle DataTable needed to draw the chart
		var numRows = chartData.length - 1;
		var numCols = 2; //year and revenue for the selected quarter
		
		// Create the data table.
		var dataTable = new google.visualization.DataTable();
		//first column is a string
		dataTable.addColumn('string', chartData[0][0]);	
		for(var i = 1; i < numCols; i++){
			dataTable.addColumn('number', chartData[0][i]);
		}

		for(var i = 0; i < numRows; i++){
			dataTable.addRow(chartData[i]);
		}	
	 
		// Set chart options
		var options = {'title':'Acme Revenue for Q' + quarter + ' - Pie Chart',
					   'width':'100%',
					   'height':250};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		chart.draw(dataTable, options);	  
	},

	//To draw the columns chart
	"drawColumnChart":function(){
		dataTable = google.visualization.arrayToDataTable(this.mydata);

		options = {
			title: 'Acme Revenue - Histogram Chart',
			hAxis: {title: 'Year', titleTextStyle: {color: 'blue'}},
			vAxis: {title: '$ Millions', titleTextStyle: {color: 'green'}},
			width: '75%',
			height: 250
		};

		chart = new google.visualization.ColumnChart(document.getElementById('col_chart'));
		chart.draw(dataTable, options)
	},

	//To draw the curve chart
	"drawCurveChart":function(){
		dataTable = google.visualization.arrayToDataTable(this.mydata);
		var options = {
			title: 'Acme Revenue - Line Chart',
			curveType: 'function',
			legend: { position: 'bottom' },
			hAxis: {title: 'Year', titleTextStyle: {color: 'blue'}},
			vAxis: {title: '$ Millions', titleTextStyle: {color: 'green'}},		
			width: '75%',
			height: 250,
			colors: ['blue', 'red', 'orange', 'green']			
		};

		var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
		chart.draw(dataTable, options);
	}
}
