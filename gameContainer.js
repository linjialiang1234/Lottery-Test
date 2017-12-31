function gameContainerController($scope, $element, $attrs) {
    var ctrl = this; 

    ctrl.onPieChart = function() {
        ctrl.pieChart({index:"123"});

    }


}

angular.module('mainApp').component("gameContainer",{
    template:`
    <div id="turntable">
        <div class="turntable-content">
            <canvas id="canvas" width="300" height="300">Sorry, this browser do not support it.</canvas>
            <a id="btn" href="javascript:;" ng-click="$ctrl.onPieChart()">Go</a>
        </div>  
    </div>

    <div class="winner-container">
        <span class="winner-text hidden-winner-text" id="winner">The winner is {{winner}}</span>
    </div>
    `,

    controller: gameContainerController,
    bindings: {
        listarray: '=',
        pieChart: '&'
    }
})