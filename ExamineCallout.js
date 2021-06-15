var header = null;
var content = null;
var calloutFocused = false;
var calloutStart = new THREE.Vector3();
var calloutDefRot = new THREE.Vector3();

AFRAME.registerComponent('examinecallout',{
  schema: {
    defHeader: {type:'string', default: "Welcome"},
    defContent: {type:'string', default:"Click on a part of the plant for more information\n test test"},
    focusDepth: {type:'float', default:0.3},
    focusCooldown: {type:'float', default:0}
  },
  init: function(){
    calloutStart.x = this.el.object3D.position.x;
    calloutStart.y = this.el.object3D.position.y;
    calloutStart.z = this.el.object3D.position.z;
    calloutDefRot = this.el.object3D.rotation;
    
    var comp = this;
    window.addEventListener('keydown', function(evt){
      //the F key in decimol ascii
      var shortcutPressed = evt.keyCode === 71;
      if (!shortcutPressed || comp.data.focusCooldown > 0){
        return;
      }
      comp.focusScreen(comp);
      comp.data.focusCooldown = 2;
    });
    
    header = document.querySelector('#examinetextheader').components.text;
    content = document.querySelector('#examinetextbody').components.text;
    let ref = this.el.components.examinecallout;
    header.data.value = ref.data.defHeader;
    content.data.value = ref.data.defContent;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      header.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.headerText);
      content.el.setAttribute('text','value',event.detail.associatedEntity.components.examinable.data.contentText);
    });
    exambox.addEventListener('disassociated', function(){
      header.el.setAttribute('text','value',ref.data.defHeader);
      content.el.setAttribute('text', 'value', ref.data.defContent);
    });
  },
  tick: function(time, timeDelta){
    if(this.data.focusCooldown > 0){
      this.data.focusCooldown -= timeDelta;
    }
  },
  focusScreen: function(comp){
    var entity = comp.el;
    if(!calloutFocused){
      //lerp the callout to be just in front of the viewer's camera
      var cam = entity.sceneEl.camera;
      //the fourth row contains the forward direction of the matrix, negative because openGL https://gamedev.net/forums/topic/319213-direction-vector-from-rotation-matrix/3053474/
      var forward = new THREE.Vector3( cam.matrixWorld.elements[7], cam.matrixWorld.elements[11], cam.matrixWorld.elements[15]);
      forward.multiplyScalar(-this.data.focusDepth);
      var worldCamPos = new THREE.Vector3();
      cam.getWorldPosition(worldCamPos);
      forward.addVectors(forward,worldCamPos);
      forward = entity.object3D.parent.worldToLocal(forward);
      
      //now setup rotation
      
      
      TweenMax.to(entity.object3D, 0.4, {three:{positionX: forward.x, positionY: forward.y,positionZ: forward.z}, ease:Sine.easeIn});
      calloutFocused = true;
      console.log("going " + " " + calloutFocused);
      return;
    }
    if(calloutFocused){
      console.log("returning " + " " + calloutStart.x + " " + calloutStart.y + " " + calloutStart.z);
      TweenMax.to(entity.object3D, 0.4, {three:{positionX: calloutStart.x, positionY: calloutStart.y,positionZ: calloutStart.z}, ease:Sine.easeIn});
      calloutFocused = false;
    }
  }
});