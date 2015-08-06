Meteor.subscribe("categories");

'use strict';

var mwCategories = BlazeComponent.extendComponent(
    function mwCategories(args) {
        // Constructor Here
    },{
        events: function() {
            return [{
              'click span.catOpen': function(event) {
                  var name = this.name.substr(9);
                  var open = Session.get('categoryChildren');
                  var idx = open.indexOf(name);
                  if (idx == -1)
                      open.push(name);
                  else
                      open.splice(idx, 1);
                  Session.set('categoryChildren', open);
               }
            }];
        }
    }
).register('TreeViewDemo');

// Single use function for the current page
Template.mwCategories.categoriesExist = function() {
    return WikiPages.find({categories: this.name.substr(9),
        namespace: 'category'}).fetch().length;
}
Template.mwCategories.pagesExist = function() {
    var name = this.name.substr(9);
    return WikiPages.find({categories: name, namespace: {$exists: false}}).fetch().length;
}

Template.mwCategories_pages.pages = function() {
    var name = this.name.substr(9);
    return WikiPages.find({categories: name, namespace: {$exists: false}},
        {fields: {name: 1, categories: 1}, sort: { name: 1}});
}

Template.mwCategories_cats.categories = function() {
    var name = this.name.substr(9);
    return WikiPages.find({categories: name, namespace: 'category'},
        {fields: {name: 1, categories: 1}, sort: { name: 1}});
}

Template.mwCategories_cats.hasChildren = function() {
    var name = this.name.substr(9);
    return WikiPages.find({categories: name},
        {fields: {name: 1, categories: 1}, sort: { name: 1}}).fetch().length;
}

Template.mwCategories_cats.isReady = function() {
    return categoryChildrenSub.ready();
}
Template.mwCategories_cats.isOpen = function() {
    var name = this.name.substr(9);
    return isolateValue(function () {
        return _.contains(Session.get('categoryChildren'), name);
    });
}
