function containerController($scope, $element, $attrs) {
    var ctrl = this;
    ctrl.inputLists = [];

    ctrl.addItem = function(name, percentage, color) {
        // console.log(name+percentage+color);
        ctrl.inputLists.push({
            "name" :  name,
            "percentage" : percentage,
            "color" : color 
        });


        ctrl.drawPieChart();


        // this.abc = $scope.inputLists;

        // console.log("13: " + $scope.inputLists[0].name);
        // console.log("15: " + this.abc[0].name);

        // $scope.input
        // drawPieChart();

        showElement("turntable", "hidden-turntable");
        showElement("btn", "hidden-turntable");

        // var elementTurnTable = document.getElementById("turntable");
        // elementTurnTable.classList.remove("hidden-turntable");

        // var elementLinkButton = document.getElementById("btn");
        // elementLinkButton.classList.remove("hidden-turntable");
    } 


    showElement = function(idOfElement,classOfElement) {
        var getElement = document.getElementById(idOfElement);
        getElement.classList.remove(classOfElement);

    }

    ctrl.remove = function(index) {
        ctrl.inputLists.splice(index,1);

        ctrl.drawPieChart();

    }

    ctrl.getAllInputPercentage = function() {
        var totalInputPercentage = 0;
        for(var i = 0; i < ctrl.inputLists.length; i++) {
            totalInputPercentage += ctrl.inputLists[i].percentage;
        }
        return totalInputPercentage;
    }

    ctrl.drawPieChart = function() {
        d3.selectAll("svg").remove();
        var width = 300;  
        var height = 300;
        var dataset = [];

        for(var i = 0; i < ctrl.inputLists.length; i++) {
            dataset.push(ctrl.inputLists[i].percentage);
            
        }
        // var dataset = [ 30 , 10 , 43 , 55 , 13 ];  
          
        var svg = d3.select(".canvas").append("svg")  
                                .attr("width",width)  
                                .attr("height",height);  
          
        var pie = d3.layout.pie().sort(null);  
          
        var outerRadius = width / 2;  
        var innerRadius = width / 4;  
        var arc = d3.svg.arc()  
                        .innerRadius(innerRadius)  
                        .outerRadius(outerRadius);  
          
        // var color = d3.scale.category10();  

        var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding','0 10px')
        .style('background', 'white')
        .style('opacity', 0)
          
        var arcs = svg.selectAll("g")  
                      .data(pie(dataset))
                      .enter()  
                      .append("g")  
                      .attr("transform","translate("+outerRadius+","+outerRadius+")")
                      .on('mouseover', function(d) {

                        //   tooltip.transition()

                          tooltip.html(d.data)
                          .style('opacity', 1)
                            .style('left', (d3.event.pageX) + 'px')
                            .style('top', (d3.event.pageY) + 'px')

                          d3.select(this)
                          .transition()
                          .style('opacity', .5);

                      })
                      .on('mouseout', function(d) {
                          d3.select(this)
                          .transition()
                          .delay(1000)
                          .duration(800)
                          .style('opacity', 1);
                      });  
                        
        arcs.append("path")
            .transition()
            .delay(function(d,i) {
                return i * 1000;
            })
            .duration(3000)
            .ease('elastic')
            .attr("fill",function(d,i){  
                // return color(i);
                return ctrl.inputLists[i].color;
            })
            .attr("d",function(d){  
                return arc(d);  
            });  
          
        arcs.append("text")  
            .attr("transform",function(d){  
                return "translate(" + arc.centroid(d) + ")";  
            })  
            .attr("text-anchor","middle")  
            .text(function(d){  
                return d.value;  
            });

        console.log(dataset);  
        console.log(pie(dataset));  

       
            
    }
  
    var result = 0;
    var counter = 0;
    ctrl.rotatePieChart = function() {
        console.log("666");
        var element = document.getElementById("winner");
        element.classList.add("hidden-winner-text");

         var canvas = document.getElementsByClassName("canvas")[0]


        if(counter === 0) {
            result = randomRotateDegree();
        }else {
            result = (3600 * counter + randomRotateDegree());
        }

        canvas.style.transform = 'rotate(-' + result +'deg)'; 
        setTimeout(() => {

            showElement("winner", "hidden-winner-text");

            // var element = document.getElementById("winner");
            // element.classList.remove("hidden-winner-text");
        }, 6000);
        // console.log("counter")
        counter += 1;
    }

    


    randomRotateDegree = function() {
        ctrl.winner = "";

        //get the random number
        var num = parseInt((Math.random()*(ctrl.inputLists.length)) + 1);

        decideWinner = function() {
            ctrl.winner = ctrl.inputLists[num-1].name;
            console.log("the winner is:" + $scope.winner);
        }

        decideWinner();


        getFinalRoundRotateAngles = function() {
            var finalRoundRotateAngles = 0;

            for(var i = 0 ; i < (num-1); i++) {
                finalRoundRotateAngles += ctrl.inputLists[i].percentage;
            }
    
            finalRoundRotateAngles += Math.floor((ctrl.inputLists[num-1].percentage)/2);

            return finalRoundRotateAngles;
        }

        var totalRotateDegree = (3600 + 360 * (getFinalRoundRotateAngles()/ctrl.getAllInputPercentage()));
        console.log("123:   " + totalRotateDegree);

        return totalRotateDegree;
    }  
}

angular.module('mainApp').component('container', {
    template: `
    <div class="main-container">
        <input-list class="input-list" listarray="$ctrl.inputLists" add-item="$ctrl.addItem(name,percentage,color)"></input-list>
        <output-list listarray="$ctrl.inputLists" remove-item="$ctrl.remove(index)"></output-list>
    
    </div>

    <game-container class="game-container" listarray="$ctrl.inputLists" pie-chart="$ctrl.rotatePieChart()" winner="$ctrl.winner"></game-container>
    
    `,
    controller: containerController,
    
});