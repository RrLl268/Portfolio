document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('firework-container');
    /*creating fireworks,, Called when the user clicks on the page.
      Creates a new firework at the specified coordinates. Send firework
      from bottom, and move upwards until reaches the halfway point of the
      current window height.Once it touches the halfway point. It will trigger
      the explode function, create multiple particles*/
    function createFirework(x, y) {
      var firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = x + 'px';
      firework.style.bottom = '0';
      container.appendChild(firework);
     
      var halfHeight = window.innerHeight / 2;
     
      var interval = setInterval(function() {
        var currentBottom = parseInt(firework.style.bottom);
       
        if (currentBottom >= halfHeight) {
          clearInterval(interval);
          firework.style.opacity = '0';
          explode(firework);
        } else {
          firework.style.bottom = (currentBottom + 2) + 'px';
        }
      }, 10);
    }
    /*When the firework touchs the halfway line, This function will be
      called. It takes the original firework(circle) as an argument. Creates
      Multiple new particles. They will have different color.*/
    function explode(parentFirework) {
      var particles = 30;
      for (var i = 0; i < particles; i++) {
        var particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = parentFirework.style.left;
        particle.style.bottom = parentFirework.style.bottom;
        particle.style.backgroundColor = getRandomColor();
        container.appendChild(particle);
        var angle = (Math.random() * 360) * (Math.PI / 180);
        var velocity = 5 + Math.random() * 2;
        var x = Math.sin(angle) * velocity;
        var y = Math.cos(angle) * velocity + 2;
        
        animateParticle(particle, x, y);
      }
      //Get rid of the original firework
      parentFirework.remove();
    }
    /* Set the movement for each particle. The particle's position is updating based on the velocities.
      The y velocity is increased gradually to simulate the gravity effect. When the reaches the 
      Bottom of the screen it will be removed.*/
    function animateParticle(particle, x, y) {
      var posX = parseInt(particle.style.left);
      var posBottom = parseInt(particle.style.bottom);
     
      var interval = setInterval(function() {
        posX += x;
        posBottom += y;
        y -= 0.05;
       
        particle.style.left = posX + 'px';
        particle.style.bottom = posBottom + 'px';
       
        if (posBottom <= 0) {
          particle.remove();
          clearInterval(interval);
        }
      }, 20);
    }
    // Get random color...
    function getRandomColor(redInputValue, greenInputValue, blueInputValue) {
      let redOutputValue = redInputValue ?? Math.round(Math.random() * 255);
      let greenOutputValue = greenInputValue ?? Math.round(Math.random() * 255);
      let blueOutputValue = blueInputValue ?? Math.round(Math.random() * 255);
      return `rgb(${redOutputValue},${greenOutputValue},${blueOutputValue})`
    }
    // Click on the page and send a firework.
    document.addEventListener('click', function(event) {
      createFirework(event.clientX, event.clientY);
    });
  });