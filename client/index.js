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
        allCategories: function() {
          return Categories.find();
        },
        hasChildren: function() {
          me = this;
          return Categories.findOne({id: me._id, child: { $exists: true }});
        }
    }
).register('TreeViewDemo');
