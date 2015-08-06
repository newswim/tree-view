// 'use strict';
//
// var stripJSONComments = Npm.require('strip-json-comments');
//
// loadProject = function(project) {
//     var rank = 0
//         ,deviceHash = {} // Key = Name, Value = document _id
//         // ,driverHash = {} // Key = Name, Value = document _id
//         ,proxyHash = {} // Key = Name, Value = proxy properties
//         ,volumeProfileHash = {}
//         ;
//
//
//     project = (typeof project === 'string') ? JSON.parse(stripJSONComments(project)) : project;
//
//     Connections.remove({});
//     Devices.remove({});
//     Drivers.remove({isBuiltIn: false});
//     SceneFilterGroups.remove({});
//     SceneFilters.remove({});
//     SceneSectionPresets.remove({});
//     SceneSections.remove({});
//     Scenes.remove({});
//     Settings.remove({});
//     VolumeProfiles.remove({});
//
//     // Settings
//     _.each(project.settings, function(setting) {
//         var values;
//         Settings.insert(setting);
//     });
//
//     // Drivers
//     // driverHash.driver = Drivers.insert({
//     //     name: 'driver'
//     //     ,type: 'generic'
//     // });
//
//     _.each(project.drivers, function(driver) {
//         driver._id = driver.name;
//
//         // Default the hasDiscretePower value
//         if (driver.type !== 'macro') {
//             driver.capabilities = _.defaults(driver.capabilities || {}, {
//                 hasDiscretePower: true
//             });
//         }
//
//         // For televisions, default the hasDiscreteInputs value
//         if (driver.type === 'television') {
//             driver.capabilities = _.defaults(driver.capabilities || {}, {
//                 hasDiscreteInputs: true
//             });
//         }
//
//         // For leds, default the hasInfiniteColors value
//         if (driver.type === 'led') {
//             driver.capabilities = _.defaults(driver.capabilities || {}, {
//                 hasInfiniteColors: true
//             });
//         }
//
//         // Default the driverKlass to the name of the driver
//         if (!driver.driverKlass) {
//             driver.driverKlass = driver.name;
//         }
//
//         console.log('inserting driver ' + driver.name + ' with class ' + driver.driverKlass + ': ' + JSON.stringify(driver));
//         Drivers.insert(driver);
//     })
//
//     // Volume Profiles
//     _.each(project.volumeProfiles, function(volumeProfile) {
//         volumeProfileHash[volumeProfile.name] = VolumeProfiles.insert(volumeProfile);
//     })
//
//     // Devices
//     _.each(project.devices, function(device) {
//         var deviceProps, driver, driverId, proxy;
//
//         // If the device *is* a proxy, insert just its name and type
//         if (device.type === 'proxy') {
//             device._id = deviceHash[device.name] = Devices.insert(_.pick(device,'name','type'));
//             proxyHash[device.name] = device;
//             return;
//         }
//
//         // If the device *has* a proxy, mixin the proxy's "proxiedProps"
//         if (device.proxy) {
//             if (!_.has(proxyHash, device.proxy)) throw new Meteor.Error(500, 'Unable to find proxy: ' + device.proxy);
//             proxy = proxyHash[device.proxy];
//
//             deviceProps = _.extend({}, proxy.proxiedProps, _.omit(device,'proxy'), {
//                 proxyId: proxy._id
//             });
//         } else {
//             deviceProps = device;
//         }
//
//         // Make sure we can find the driver
//         driver = Drivers.findOne({name: deviceProps.driver});
//         if (!driver) throw new Meteor.Error(500, 'Unable to find driver(' + deviceProps.driver + ') for device named ' + deviceProps.name);
//         driverId = driver._id;
//
//         // If the device has a volume profile, but we can't find the profile
//         if (deviceProps.volumeProfile && !_.has(volumeProfileHash, deviceProps.volumeProfile)) throw new Meteor.Error(500, 'Unable to find volumeProfile: ' + deviceProps.volumeProfile);
//
//         // If the device has a volume profile, add the _id to the deviceProps
//         if (deviceProps.volumeProfile) {
//             deviceProps.volumeProfileId = volumeProfileHash[deviceProps.volumeProfile];
//         }
//
//         // Make a copy of device excluding driver/volumeProfile and adding driverId/power
//         deviceProps = _.extend({},_.omit(deviceProps,'driver','volumeProfile'),{
//             driverId: driverId
//             // ,power: (device.type === 'macro') ? 'alwaysOn' : 'off'
//         });
//
//         // Default the capabilities' audio/video properties
//         deviceProps.capabilities = _.defaults(deviceProps.capabilities || {},{
//             audio: true
//             ,video: (deviceProps.type !== 'speaker')
//         });
//
//         // Insert the device
//         console.log('inserting device ' + device.name + ' with type ' + device.type);
//         device._id = deviceHash[device.name] = Devices.insert(deviceProps);
//     });
//
//     // // Connection Profiles
//     // _.each(project.connectionProfiles, function(cp) {
//     //     if (!cp.connectedTo) throw new Meteor.Error(500, 'connectionProfiles.connectedTo is required');
//     //     if (!cp.ports) throw new Meteor.Error(500, 'connectionProfiles.ports is required');
//
//     //     _.each(cp.ports, function(port) {
//     //         if (!_.has(deviceHash, port.from)) throw new Meteor.Error(500, 'Unable to find device: ' + port.from);
//
//     //         _.each(cp.connectedTo, function(to) {
//     //             if (!_.has(deviceHash, to)) throw new Meteor.Error(500, 'Unable to find device: ' + to);
//
//     //             Connections.insert({
//     //                 fromDeviceId: deviceHash[port.from]
//     //                 ,toDeviceId: deviceHash[to]
//     //                 ,toPort: port.toPort
//     //             });
//     //         });
//     //     });
//     // });
//
//     // Connections
//     _.each(project.connections, function(connection) {
//         var fromId, tempConnection, toId;
//
//         if (!_.has(deviceHash, connection.from)) throw new Meteor.Error(500, 'Unable to find device: ' + connection.from);
//         if (!_.has(deviceHash, connection.to)) throw new Meteor.Error(500, 'Unable to find device: ' + connection.to);
//
//         connection._id = Connections.insert(_.extend(_.pick(connection, 'fromPort', 'toPort', 'toChannel'), {
//             fromDeviceId: deviceHash[connection.from]
//             ,toDeviceId: deviceHash[connection.to]
//         }));
//     });
//
//     // Scenes
//     _.each(project.scenes, function(scene) {
//         var filterGroupRank = 1
//             ,sectionRank = 1
//             ;
//
//         scene = _.defaults(scene, {
//             isDefault: false
//         });
//
//         // Insert the scene
//         scene._id = Scenes.insert(_.omit(scene,'filterGroups','sections'));
//
//         // Each filterGroup
//         _.each(scene.filterGroups, function(filterGroup) {
//             var filterRank = 1
//                 ,tempFilterGroup
//                 ;
//
//             // Setup the filterGroup document
//             tempFilterGroup = _.extend(_.pick(filterGroup, 'name'),{
//                 sceneId: scene._id
//                 ,rank: filterGroupRank++
//             });
//
//             // Insert the filterGroup document
//             filterGroup._id = SceneFilterGroups.insert(tempFilterGroup);
//
//             // Each filter
//             _.each(filterGroup.filters, function(filter) {
//                 var tempFilter
//                     ;
//
//                 // Setup the filter document
//                 tempFilter = _.extend(_.pick(filter, 'name'), {
//                     groupId: filterGroup._id
//                     ,rank: filterRank++
//                     ,items: []
//                 });
//
//                 // Each filter item
//                 _.each(filter.items, function(item) {
//                     if (_.isString(item)) item = {name: item};
//                     if (!_.has(deviceHash, item.name)) {
//                         console.warn('Ignoring unknown device: ' + item.name);
//                     }
//
//                     var id = deviceHash[item.name];
//                     if (id) {
//                         tempFilter.items.push(id);
//                     }
//                 });
//
//                 // Insert the filter
//                 filter._id = SceneFilters.insert(tempFilter);
//             });
//         });
//
//         // Each Section
//         _.each(scene.sections, function(section) {
//             var tempSection
//                 ,presetRank = 1
//                 ;
//
//             // Setup the section document
//             tempSection = _.extend(_.pick(section, 'name', 'type', 'options'), {
//                 sceneId: scene._id
//                 ,rank: sectionRank++
//                 ,items: []
//             });
//
//             // Each item
//             _.each(section.items, function(item) {
//                 if (_.isString(item)) item = {name: item};
//                 if (!_.has(deviceHash, item.name)) {
//                     console.warn('Ignoring unknown device: ' + item.name);
//                 }
//
//                 var id = deviceHash[item.name];
//                 if (id) {
//                     tempSection.items.push(id);
//                 }
//             });
//
//             // Insert the section
//             section._id = SceneSections.insert(tempSection);
//
//             // Each preset
//             if (section.presets) {
//
//                 // The only way we know to add the 'All' & 'None' presets
//                 // is if we include a preset array property. So, if the
//                 // section has an empty preset array, we pass that through
//                 tempSection.presets = [];
//
//                 _.each(section.presets, function(preset) {
//                     var tempPreset;
//
//                     if (!_.isString(preset.name)) throw new Meteor.Error(500, 'Presets must have a name');
//                     tempPreset = {
//                         sectionId: section._id
//                         ,name: preset.name
//                         ,rank: presetRank++
//                         ,items: []
//                     };
//
//                     // Each item in this preset
//                     _.each(preset.items, function(item) {
//                         if (_.isString(item)) item = {name: item};
//                         if (!_.has(deviceHash, item.name)) {
//                             console.warn('Ignoring unknown device: ' + item.name);
//                         }
//
//                         var id = deviceHash[item.name];
//                         if (id) {
//                             tempPreset.items.push(id);
//                         }
//                     });
//
//                     // If this preset has any items, add it to the section preset list
//                     if (tempPreset.items.length > 0) {
//                         preset._id = SceneSectionPresets.insert(tempPreset);
//                     }
//                 })
//             }
//         });
//     });
// }
