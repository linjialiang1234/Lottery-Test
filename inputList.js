function inputListController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.onAddItem = function() {
         console.log("123" + ctrl.name);
        ctrl.addItem({name:ctrl.name, percentage:ctrl.percentage,color:ctrl.color});
    }

}

angular.module('mainApp').component("inputList",{
    template:`
    <div class="input-list-container">
        <div class="list-container" id="input-name">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" ng-model="$ctrl.name">
        </div>
        <br>

        <div class="list-container" id="input-percentage">
            <label for="percentage">Weight</label>
            <input type="number" name="percentage" id="percentage" ng-model="$ctrl.percentage">
        </div>
        <br>

        <div class="list-container" id="input-color">
            <label for="color">Color</label>
            <input type="text" name="color" id="color" ng-model="$ctrl.color">
        </div>
        <br>
    </div>

    <div class="button-container">
        <button type"button" ng-click="$ctrl.onAddItem()">Add</button>
    </div>
    `,
    controller: inputListController,
    bindings: {
        listarray:'=',
        addItem: "&"

    }
})