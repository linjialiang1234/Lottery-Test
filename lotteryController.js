angular.module('mainApp',[]).controller('lotteryController', function lotteryController($scope, $element, $attrs) {
    var ctrl = this;
    ctrl.inputLists = [];

    $scope.addItem = function() {
        ctrl.inputLists.push({
            "name" :  $scope.name,
            "percentage" : $scope.percentage,
            "color" : $scope.color 
        });

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

});