import Ember from 'ember';

/* HARDCODED EXAMPLE OF BUBBLE GRAPH - DOESN'T ACTUALLY WORK OR USE REAL DATA */

/* each type of component or graph which can be rendered in a gridster widget... making up a tolaboard,
   will have its own ember component. This is where the functions for how to draw this particular graph
   will live, and all it needs is the info to get the data for this viz. The element is autoamtic because
   we just use the ember view given along with the .viz class to form a combined css selector

   There are two scenarios every graph component needs to operated under:
   		1. graph that is completely defined and lives in the dashboard-view
   		   or designer components.
   		2. graph that is being built/updated via the graph builder widget

   		
   Every graph component will receive an object called tbItemConfig. In case #1,
   this comes from the items array in our Board model. In case #2, it comes from
   the tbItemConfig widget AND the tbItemGraph object in the graph builder. The
   latter serves as a dictionary of what will ultimately be saved into the 
   tbItemConfig when saving the work done in the graph builder widget.
*/
export default Ember.Component.extend({
	self: this,

	dataAgg: Ember.inject.service('data-aggregator'),

	didInsertElement: function() {

		console.log('CHARTJS Bubble COMPONENT==>',this);

		var sourceId = this.get('tbItemConfig').graph.source;
		var dataModel = this.get('tbItemConfig').graph.dataModel;

		// returns promise, on resolution returns d3.nest of aggregated data
		var tablesData = this.get('dataAgg').groupBySum(sourceId, dataModel);		
		
		var self = this;
		tablesData.then(function(result) {
			var labelArr = result.map(function(d) { return d.key});
			var dataArr = result.map(function(d) { return d.value});

			var data = {
			    datasets: [
			        {
			            label: 'First Dataset',
			            data: [
			                {
			                    x: 20,
			                    y: 30,
			                    r: 15
			                },
			                {
			                    x: 40,
			                    y: 10,
			                    r: 10
			                },
			                {
			                    x: 25,
			                    y: 12,
			                    r: 11
			                },
			                {
			                    x: 28,
			                    y: 16,
			                    r: 18
			                },
			                {
			                    x: 33,
			                    y: 23,
			                    r: 20
			                },
			                {
			                    x: 36,
			                    y: 25,
			                    r: 13
			                },
			                {
			                    x: 38,
			                    y: 27,
			                    r: 10
			                }
			            ],
			            backgroundColor:"#FF6384",
			            hoverBackgroundColor: "#FF6384",
			        }]
			};

			// self.get('tbItemConfig').get('graph').set('config', barConfig);

			// console.log('barConfig', barConfig);
			var ctx = Ember.$('#'+ self.get('elementId') + ' canvas');
						console.log('ctx', ctx)
					
			ctx.resize(function() {
				'resize detected';
			});
			var options = {
		        elements: {
		            points: {
		                borderWidth: 1,
		                borderColor: 'rgb(0, 0, 0)'
		            }
		        }
		    }


			var myBubbleChart = new Chart(ctx,{
			    type: 'bubble',
			    data: data,
			    options: options
			});

		})

		

		

					
					
		
	},	// end didInsertElement
	

	willDestroyElement: function() {
		console.log('willDestroyElement on bar chart component called');
	},



	
	
	
});
