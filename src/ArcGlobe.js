import Globe from 'react-globe.gl';
import { useEffect, useRef } from 'react';


const N = 20;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [['red', 'white', 'blue'][Math.round(Math.random() * 3)], ['red', 'white', 'blue'][Math.round(Math.random() * 3)]]
}));

function ArcGlobe() {
    const globeEl = useRef();

    useEffect(() => {
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.7;
    }, []);

    return (
    <Globe
        ref={globeEl}
        height="1200"

        //globeImageUrl="https://cdn.pixabay.com/photo/2021/06/13/12/16/world-map-6333123_1280.jpg"
        globeImageUrl="https://unpkg.com/three-globe@2.18.11/example/img/earth-dark.jpg"
        backgroundColor="#141414"
        atmosphereColor="#0048AB"
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
        />
    );
}
export default ArcGlobe;