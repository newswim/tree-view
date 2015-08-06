Categories = new Mongo.Collection("categories");

// Categories.drop();

// Data from https://github.com/Voronenko/Storing_TreeView_Structures_WithMongoDB

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Categories.find().count() === 0) {
      Categories.insert({name: "Electronics",childs:["Cameras_and_Photography","Shop_Top_Products","Cell_Phones_and_Accessories"]});
      Categories.insert({name: "Cameras_and_Photography",childs:["Digital_Cameras","Camcorders","Lenses_and_Filters","Tripods_and_supports","Lighting_and_studio"]});
      Categories.insert({name: "Digital_Cameras",parent:"Cameras_and_Photography", order:10});
      Categories.insert({name: "Camcorders",childs:[]});
      Categories.insert({name: "Lenses_and_Filters",childs:[]});
      Categories.insert({name: "Tripods_and_supports",childs:[]});
      Categories.insert({name: "Lighting_and_studio",childs:[]});
      Categories.insert({name: "Shop_Top_Products",childs:["IPad","IPhone","IPod","Blackberry"]});
      Categories.insert({name: "IPad",childs:[]});
      Categories.insert({name: "IPhone",childs:[]});
      Categories.insert({name: "IPod",childs:[]});
      Categories.insert({name: "Blackberry",childs:[]});
      Categories.insert({name: "Cell_Phones_and_Accessories",childs:["Cell_Phones_and_Smartphones","Headsets","Batteries","Cables_And_Adapters"]});
      Categories.insert({name: "Cell_Phones_and_Smartphones",childs:["Nokia","Samsung","Apple","HTC","Vyacheslav"]});
      Categories.insert({name: "Headsets",childs:[]});
      Categories.insert({name: "Batteries",childs:[]});
      Categories.insert({name: "Cables_And_Adapters",childs:[]});
      Categories.insert({name: "Nokia",childs:[]});
      Categories.insert({name: "Samsung",childs:[]});
      Categories.insert({name: "Apple",childs:[]});
      Categories.insert({name: "HTC",childs:[]});
      Categories.insert({name: "Vyacheslav",childs:[]});
    }
  });
}

// Data from https://github.com/Voronenko/Storing_TreeView_Structures_WithMongoDB


/* TODO: Do not populate unless collection is empty */
