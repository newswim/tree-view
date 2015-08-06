Meteor.publish("categories", function () {
    return Categories.find({});
});

Meteor.publish('categoryChildren', function(categories) {
    return WikiPages.find({categories: {$in: categories}},
        {fields: {name: 1, categories: 1, namespace: 1}});
});
