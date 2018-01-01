function outputListController($scope, $element, $attrs) {
    var ctrl = this; 

    ctrl.onRemoveItem = function($index) {
        console.log("111:" + $index);
        ctrl.removeItem({index:$index});

    }


}

angular.module('mainApp').component("outputList",{
    template:`
    <div class="output-list">
            <div ng-repeat="list in $ctrl.listarray" class="single-output">
            <span>{{list.name}}</span>
            <span>{{list.percentage}}</span>
            <span>{{list.color}}</span>
            <button ng-click="$ctrl.onRemoveItem($index)">Delete</button>
        </div>
    </div>

    `,

    controller: outputListController,
    bindings: {
        listarray:'=',
        removeItem: '&'

    }
})