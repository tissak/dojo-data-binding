dojo.provide("data.binding");

dojo.declare("data.binding",null,{
  map:{},
  idMap: {},
  idMapReverse: {},
  events:{},
  constructor: function(bindings){
    for(var key in bindings){
      this.bind(bindings[key], key);
    }
  },
  bind: function(nodeId,mapName){
    this.idMap[mapName] = nodeId;
    this.idMapReverse[nodeId] = mapName;
    
    var node = dojo.byId(nodeId);
    this.map[mapName]=node.value;
    dojo.connect(node,"change",this, "update");
    this.events[mapName+"Change"] = function(){};
  },
  bindingActions: function(map){
    for(var key in map){
      var mapName = key;
      var args = map[key];
      this.connect.apply(this, [mapName].concat(args));
    }
  },
  connect:function(/*args*/){
    var connect = null;
    var args = [].splice.call(arguments,0);
    args[0] = args[0]+"Change";    
    args = [this.events].concat(args);
    connect = dojo.connect.apply(this, args);
    return connect;
  },
  update: function(event){
    var id = event.target.id;
    var mapName = this.idMapReverse[id];
    this.map[mapName] = event.target.value;
    this.fireChangeEvent(mapName);
  },
  toJson: function(){
    return dojo.toJson(this.map);
  },
  set: function(name, value){
    this.map[name] = value;
    dojo.byId(this.idMap[name]).value = value;
    this.fireChangeEvent(name);
  },
  get: function(name){
    return this.map[name];
  },
  fireChangeEvent: function(mapName){
    this.events[mapName+"Change"](this.get(mapName));
  }
});