Categories = new Mongo.Collection("categories");

// Categories.drop();

// Data from https://github.com/Voronenko/Storing_TreeView_Structures_WithMongoDB
Categories.insert({name:"Electronics",parent:'', left:1, right:44});
Categories.insert({name:"Cameras_and_Photography",parent:"Electronics", order:10, left:2, right:13});
Categories.insert({name:"Digital_Cameras",parent:"Cameras_and_Photography", order:10, left:3, right:4});
Categories.insert({name:"Camcorders",parent:"Cameras_and_Photography", order:20, left:5, right:6});
Categories.insert({name:"Lenses_and_Filters",parent:"Cameras_and_Photography", order:30, left:7, right:8});
Categories.insert({name:"Tripods_and_supports",parent:"Cameras_and_Photography", order:40, left:9, right:10});
Categories.insert({name:"Lighting_and_studio",parent:"Cameras_and_Photography", order:50, left:11, right:12});
Categories.insert({name:"Shop_Top_Products",parent:"Electronics", order:20, left:14, right:23});
Categories.insert({name:"IPad",parent:"Shop_Top_Products", order:10, left:15, right:16});
Categories.insert({name:"IPhone",parent:"Shop_Top_Products", order:20, left: 17, right:18});
Categories.insert({name:"IPod",parent:"Shop_Top_Products", order:30, left:19, right:20});
Categories.insert({name:"Blackberry",parent:"Shop_Top_Products", order:40, left:21, right:22});
Categories.insert({name:"Cell_Phones_and_Accessories",parent:"Electronics", order:30, left:24, right:43});
Categories.insert({name:"Cell_Phones_and_Smartphones",parent:"Cell_Phones_and_Accessories", order:10, left:25, right:36});
Categories.insert({name:"Headsets",parent:"Cell_Phones_and_Accessories", order:20, left:37, right:38});
Categories.insert({name:"Batteries",parent:"Cell_Phones_and_Accessories", order:30, left:39, right:40});
Categories.insert({name:"Cables_And_Adapters",parent:"Cell_Phones_and_Accessories", order:40, left:41, right:42});
Categories.insert({name:"Nokia",parent:"Cell_Phones_and_Smartphones", order:10, left:26, right:27});
Categories.insert({name:"Samsung",parent:"Cell_Phones_and_Smartphones", order:20, left:28, right:29});
Categories.insert({name:"Apple",parent:"Cell_Phones_and_Smartphones", order:30, left:30, right:31});
Categories.insert({name:"HTC",parent:"Cell_Phones_and_Smartphones", order:40, left:32, right:33});
Categories.insert({name:"Vyacheslav",parent:"Cell_Phones_and_Smartphones", order:50, left:34, right:35});

/* TODO: Do not populate unless collection is empty */
