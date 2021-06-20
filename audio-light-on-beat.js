/**
 * Create expanding ring on audioanalyser beat.
 */
AFRAME.registerComponent('light-on-beat', {
  schema: {
    analyserEl: {type: 'selector'},
  },

  init: function () {
    var analyserEl = this.data.analyserEl || this.el;
    var el = this.el;


    analyserEl.addEventListener('audioanalyser-beat', function () {
      el.setAttribute('light', 'intensity', Math.random() * (2 - 1) + 1);
    });
  },


});