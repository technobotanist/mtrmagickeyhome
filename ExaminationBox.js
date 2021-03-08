var castPoint;
var trackedList;
var storedObject;
var canAssociate = true;

AFRAME.registerComponent('exambox',{
  schema: {
    snapedRotation: {type: 'vec3'}
  },
  init: function (){
    //find the point we're going to cast from
    castPoint = document.querySelector('#castPoint');
    //if we don't have it log it
    if(castPoint === null){
      console.log("No cast point found! Add one to the entity that has the exam box");
    }
    //check for tagged entries and add them to our check list
    trackedList = document.querySelectorAll('.collidable');
  },
  tick: function(){
  //get the location of all the entities in our check list
    if(!canAssociate){
      if(storedObject.object3D.position.distanceTo(castPoint.object3D.position) > 0.5){
        this.disassociate();
      }
      return;
    }
    trackedList.forEach(element =>{
      if(element.object3D.position.distanceTo(castPoint.object3D.position) < 0.5){
        this.associate(element);
      }
    });
  //if any of them are close enough to our cast point and the box is empty
    //make that object our stored object and require it be removed before 
    //adding any other new objects
},
  associate: function(entity){
    //move the element to the point
    entity.object3D.position = castPoint.object3D.position;
    //rotate to our ideal rotation
    //set to ideal scale
    //make it impossible to associate other objects
    canAssociate = false;
  },
  disassociate: function(){
    storedObject = null;
    canAssociate = true;
  }
});