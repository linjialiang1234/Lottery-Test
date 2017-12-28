angular.module('mainApp').component("outputList",{
    template:`
    <div class="output-list">
            <div ng-repeat="list in $ctrl.listarray" class="single-output">
            <span>{{list.name}}</span>
            <span>{{list.percentage}}</span>
            <span>{{list.color}}</span>
            <button ng-click="remove()">Delete</button>
        </div>
    </div>

    `,
    bindings: {
        listarray:'='

    }
})