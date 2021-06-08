AFRAME.registerComponent('examineaudio',{
  schema: {
    defAudioClip: {type:'string', default: "none"}
  },
  init: function(){
    var entity = this.el;
    let exambox = document.querySelector('[ExamBox]');
    exambox.addEventListener('associated', function(event){
      entity.components.examineaudio.data.defAudioClip = event.detail.associatedEntity.components.examinable.data.audioClipUrl;
      console.log('audio added: ' + entity.components.examineaudio.data.defAudioClip);
    });
    exambox.addEventListener('disassociated', function(){
      entity.components.examineaudio.data.defAudioClip = event.detail.associatedEntity.components.examinable.data.audioClipUrl;
    });
    this.el.addEventListener('mousedown', function(evt){
      if(entity.data.defAudioClip !== "none"){
        console.log('audio playback: ' + entity.components.examineaudio.data.defAudioClip);
        entity.setAttribute('sound',{src: entity.data.defAudioClip});
        entity.components.sound.playSound();
      }
    });
  }
});