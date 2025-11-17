
AFRAME.registerComponent('snow', {
  init: function () {
    const container = this.el;     
    const numFlakes = 200;         // Anzahl der Schneeflocken
    this.flakes = [];              

    // Schneeflocken zufällig im Raum verteilt
    for (let i = 0; i < numFlakes; i++) {
      const flake = document.createElement('a-sphere');
      flake.setAttribute('radius', Math.random() * 0.01 + 0.005); 
      flake.setAttribute('color', '#FFFFFF'); 
      flake.setAttribute('position', {
        x: (Math.random() - 0.5) * 3, // zufällige X-Position
        y: Math.random() * 2 + 1,     // zufällige Y-Höhe
        z: (Math.random() - 0.5) * 3  // zufällige Z-Position
      });

      container.appendChild(flake); // Flocke in die Szene einfügen
      this.flakes.push(flake);      // und im Array speichern
    }
  },

  tick: function (time, timeDelta) {
    // Wenn der Marker nicht sichtbar ist, nichts tun.
    if (!this.el.getAttribute('visible')) return;

    // Jede Schneeflocke nach unten
    this.flakes.forEach(flake => {
      const pos = flake.getAttribute('position');
      pos.y -= timeDelta / 1000 * 0.2; // Geschwindigkeit

      // Wenn Flocke unten ist, wieder oben erscheinen lassen
      if (pos.y < 0) pos.y = 2;

      flake.setAttribute('position', pos);
    });
  }
});


window.addEventListener('load', () => {
  // Referenzen auf Marker und Schneebehälter
  const marker = document.querySelector('#custom-marker');
  const snowContainer = document.querySelector('#snowContainer');

  // Schneekomponente an den Container hängen
  snowContainer.setAttribute('snow', '');

  // Wenn der Marker in der Kamera erkannt wird
  marker.addEventListener('markerFound', () => {
    console.log('Marker erkannt → Schnee sichtbar');
    snowContainer.setAttribute('visible', 'true'); // Schnee zeigen
  });

  // Wenn der Marker wieder verschwindet
  marker.addEventListener('markerLost', () => {
    console.log('Marker verloren → Schnee ausblenden');
    snowContainer.setAttribute('visible', 'false'); // Schnee ausblenden
  });
});