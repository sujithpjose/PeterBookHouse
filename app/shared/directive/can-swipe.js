angular.module('canSwipe', [])
.directive('canSwipe', function() {
  return {
    restrict: 'A',
    require:  '^ionItem',
    link: function(scope, element, attr, itemCtrl) {

      if(attr.canSwipe !== null && attr.canSwipe.length > 0 && 
         typeof(!!attr.canSwipe) === "boolean") {
        scope.$watch('!!(' + attr.canSwipe + ')', function(value) {
          canSwipe(value);
        });
      }

      canSwipe(attr.canSwipe === 'true');

      function canSwipe(can) {
        if (!itemCtrl.optionsContainer) {
          return;
        }
        // Class item-options is the flag for ionic.views.ListView whether 
        // item can be swiped (dragged):
        //    if (item && item.querySelector('.item-options')) { do drag ...}
        itemCtrl.optionsContainer.toggleClass('item-options', can);
        // Hide options button container.
        itemCtrl.optionsContainer.toggleClass('ng-hide', !can);
      } // canSwipe

    } // link
  }; // return
});