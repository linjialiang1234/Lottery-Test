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

        // showElement("turntable", "hidden-turntable");
        // showElement("btn", "hidden-turntable");

        // var elementTurnTable = document.getElementById("turntable");
        // elementTurnTable.classList.remove("hidden-turntable");

        // var elementLinkButton = document.getElementById("btn");
        // elementLinkButton.classList.remove("hidden-turntable");
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
        var num = ctrl.inputLists.length;
        console.log("num " + num);
        console.log("abc: " + ctrl.inputLists[0].color);
        var canvas = document.getElementById('canvas');
        var btn = document.getElementById('btn');
        if(!canvas.getContext){
            alert('Sorry, this browser do not support it.');
            return;
        }

        console.log("canvas" + canvas);
        console.log("btn" + btn);

        totolRotateNumber = 0;

        var ctx = canvas.getContext('2d');
        for (var i = 0; i < num; i++) {
            // save the current state
            ctx.save();
            // start to draw
            ctx.beginPath();
            // the center has been changed
            ctx.translate(150, 150);
            // from(0, 0) define a new route
            ctx.moveTo(0, 0);
            // uese formular degrees * Math.PI/180 to change degree into arc
            // ctx.rotate((360 / num * i + 360 / num / 2) * Math.PI/180);
            ctx.rotate((360 * (totolRotateNumber/ctrl.getAllInputPercentage())) * Math.PI/180);
            totolRotateNumber += ctrl.inputLists[i].percentage;
            // draw the arc
            // ctx.arc(0, 0, 150, 0,  2 * Math.PI / num, false);
            ctx.arc(0, 0, 150, 0,  2 * Math.PI *(ctrl.inputLists[i].percentage/ctrl.getAllInputPercentage()) , false);
            // if (i % 2 == 0) {
            //     ctx.fillStyle = '#ffb820';
            // }else{
            //     ctx.fillStyle = '#ffcb3f';
            // }
            ctx.fillStyle = ctrl.inputLists[i].color;
            // fill the color
            ctx.fill();
            // draw outline
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'whitesmoke';
            ctx.stroke();
    
            // literal
            // ctx.fillStyle = '#fff';
            // ctx.font="16px sans-serif";
            // ctx.fillText(i + 1, 100, 60);
    
            //restore previous state
            ctx.restore();
        }
    }

    var result = 0;
    var counter = 0;
    ctrl.rotatePieChart = function() {
        console.log("666");
        var element = document.getElementById("winner");
        element.classList.add("hidden-winner-text");

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

        var totalRotateDegree = (3600 + 90 + 360 * (getFinalRoundRotateAngles()/ctrl.getAllInputPercentage()));
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

    <game-container class="game-container" listarray="$ctrl.inputLists" pie-chart="$ctrl.rotatePieChart()"></game-container>
    
    `,
    controller: containerController,
    
});