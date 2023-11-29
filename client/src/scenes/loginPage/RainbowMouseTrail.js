import React from 'react';
import Loader from './Loader';

function RainbowMouseTrail() {
  const handleMouseMove = (e) => {
    const loaders = document.getElementsByClassName('loader-container');

    if (loaders.length > 50) {
      loaders[0].remove();
    }

    const parentDiv = document.createElement('div');
    parentDiv.className = 'loader-container';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'loader';

    parentDiv.appendChild(innerDiv);
    document.body.appendChild(parentDiv);

    parentDiv.style.left = e.clientX - 50 + 'px';
    parentDiv.style.top = e.clientY - 50 + 'px';
  };

  return (
    <div className="rainbow-mouse-trail" onMouseMove={handleMouseMove}>
      <Loader />
    </div>
  );
}

export default RainbowMouseTrail;
