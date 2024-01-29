// import * as THREE from 'three';


const canvasEl = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({canvas: canvasEl});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const controls = new OrbitControls( camera, renderer.domElement );


import { TrackballControls } from '//unpkg.com/three/examples/jsm/controls/TrackballControls.js';
  Object.assign(THREE , { TrackballControls });

  fetch('./ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
  {
    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
      .polygonCapColor(() => 'rgba(200, 0, 0, 0.7)')
      .polygonSideColor(() => 'rgba(0, 200, 0, 0.1)')
      .polygonStrokeColor(() => '#111');

    setTimeout(() => Globe.polygonAltitude(() => Math.random()), 4000);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globeViz').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() { // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  });

// document.body.appendChild( renderer.domElement );
onResize();

const myGlobe = new ThreeGlobe().globeImageUrl("./images/earth-dark.jpg").backgroundColor("#191919");
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const sphere = new THREE.Mesh(
// 	new THREE.SphereGeometry(5, 50, 50),
// 	new THREE.MeshBasicMaterial({
// 		map: new THREE.TextureLoader().load("./images/earth-dark.jpg")
// 	})
// );
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.3;
// disable zoom
// controls.enableZoom = false;

//pointOfView({ altitude: 4 }, 5000);

scene.add( myGlobe );

camera.position.z = 200;

function animate() {
	requestAnimationFrame( animate );

	// sphere.rotation.x += 0.01;
	// myGlobe.rotation.y += 0.001;

	
	renderer.render( scene, camera );
}

animate();

function onResize(){
	// alert("sadf");
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


$(function(){
	$(window).resize(onResize);
});
