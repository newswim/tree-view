var VIEW_BY_ROOM = 0;
var VIEW_BY_TYPE = 1;

var TreeView = BlazeComponent.extendComponent(
    function TreeViewConstructor(options) {
        var me = this;

        me.currentView = new ReactiveVar(VIEW_BY_TYPE);
    },{
        getRows: function() {
            var lastType = '';

            _.each(Drivers.find({},{sort:{type:1, name: 1}}).fetch(), function(driver) {
                if (driver.type !== lastType) {
                    // Add a row with depth 1
                    lastType = driver.type;
                }

                // Add a row with depth 2

                _.each(Devices.find({driverId: driver._id}).fetch(), function(device) {
                    // Add a row with depth 3
                });
            });
        }
/*
        setView: function(viewId) {
            assert([0,1].indexOf(viewId) !== -1, 'Invalid view id');
            me.currentView.set(viewId);
        },

        getTopLevel: function() {
            if (me.currentView.get() === VIEW_BY_TYPE) {
                return _.uniq(_.pluck(Drivers.find({},{fields:{type:1},{sort:{type:1}}).fetch(),'type'));
            } else {
                return ['WTF DOOD!'];
            }
        },

        get
*/
    }
).register('TreeView');
