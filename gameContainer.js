function gameContainerController($scope, $element, $attrs) {
    var ctrl = this; 

    ctrl.onPieChart = function() {
        ctrl.pieChart();

    }

}

angular.module('mainApp').component("gameContainer",{
    template:`
    <div id="turntable" class="hidden-turntable">
        <div class="turntable-content" >
            <div class="canvas"></div>
            <a id="btn" class="hidden-turntable" href="javascript:;" ng-click="$ctrl.onPieChart()">Go</a>
        </div>  
    </div>

    <div class="winner-container">
        <span class="winner-text hidden-winner-text" id="winner">The winner is {{$ctrl.winner}}</span>
    </div>
    `,

    controller: gameContainerController,
    bindings: {
        listarray: '=',
        pieChart: '&',
        winner: '='
    }
})