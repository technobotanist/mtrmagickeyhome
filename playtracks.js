AFRAME.registerComponent('playtracks', {
  init: function () {
      let playing = false;
      var el = this.el;
      let audio1 = document.querySelector(".music1");
      let audio2 = document.querySelector(".music2");
      let audio3 = document.querySelector(".music3");
      let audio4 = document.querySelector(".music4");
      let audio5 = document.querySelector(".music5");
      let audio6 = document.querySelector(".music6");

          el.addEventListener('click', (ee) => {
          console.log(ee)
          if (!playing) {
            audio1.play();
            audio2.play();
            audio3.play();
            audio4.play();
            audio5.play();
            audio6.play();
          } else {
            audio1.pause();
            audio2.pause();
            audio3.pause();
            audio4.pause();
            audio5.pause();
            audio6.pause();

          }
          playing = !playing;
        });

      }})
  

