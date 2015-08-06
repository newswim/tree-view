Categories = new Mongo.Collection("categories");

// Categories.drop();

// Data from https://github.com/Voronenko/Storing_TreeView_Structures_WithMongoDB

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Categories.find().count() === 0) {
      Categories.insert({name: _id, _id:"Electronics",childs:["Cameras_and_Photography","Shop_Top_Products","Cell_Phones_and_Accessories"]});
      Categories.insert({name: _id, _id:"Cameras_and_Photography",childs:["Digital_Cameras","Camcorders","Lenses_and_Filters","Tripods_and_supports","Lighting_and_studio"]});
      Categories.insert({name: _id, _id:"Digital_Cameras",parent:"Cameras_and_Photography", order:10});
      Categories.insert({name: _id, _id:"Camcorders",childs:[]});
      Categories.insert({name: _id, _id:"Lenses_and_Filters",childs:[]});
      Categories.insert({name: _id, _id:"Tripods_and_supports",childs:[]});
      Categories.insert({name: _id, _id:"Lighting_and_studio",childs:[]});
      Categories.insert({name: _id, _id:"Shop_Top_Products",childs:["IPad","IPhone","IPod","Blackberry"]});
      Categories.insert({name: _id, _id:"IPad",childs:[]});
      Categories.insert({name: _id, _id:"IPhone",childs:[]});
      Categories.insert({name: _id, _id:"IPod",childs:[]});
      Categories.insert({name: _id, _id:"Blackberry",childs:[]});
      Categories.insert({name: _id, _id:"Cell_Phones_and_Accessories",childs:["Cell_Phones_and_Smartphones","Headsets","Batteries","Cables_And_Adapters"]});
      Categories.insert({name: _id, _id:"Cell_Phones_and_Smartphones",childs:["Nokia","Samsung","Apple","HTC","Vyacheslav"]});
      Categories.insert({name: _id, _id:"Headsets",childs:[]});
      Categories.insert({name: _id, _id:"Batteries",childs:[]});
      Categories.insert({name: _id, _id:"Cables_And_Adapters",childs:[]});
      Categories.insert({name: _id, _id:"Nokia",childs:[]});
      Categories.insert({name: _id, _id:"Samsung",childs:[]});
      Categories.insert({name: _id, _id:"Apple",childs:[]});
      Categories.insert({name: _id, _id:"HTC",childs:[]});
      Categories.insert({name: _id, _id:"Vyacheslav",childs:[]});
    }
  });
}

var categoryChildrenSub;
Session.setDefault('categoryChildren', []);

Tracker.autorun(function() {
    var cats = Session.get('categoryChildren');
    categoryChildrenSub = Meteor.subscribe('categoryChildren', cats);
});
