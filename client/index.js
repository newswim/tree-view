Meteor.subscribe("categories");

'use strict';

var TreeViewDemo = BlazeComponent.extendComponent(
    function TreeViewDemo(args) {
        // Constructor Here
    },{
        events: function() {
            return [{
                // 'click': this.onClicked,
            }];
        },
        getCategories: function(){
          return Categories.find();
        }
    }
).register('TreeViewDemo');
