
import { OrbitControls } from '//unpkg.com/three/examples/jsm/controls/OrbitControls.js';
Object.assign(THREE , { OrbitControls });

fetch('./countries.geojson').then(res => res.json()).then(countries =>
{
  const Globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
    .polygonCapColor(() => 'rgba(200, 0, 0, 0.7)')
    .polygonSideColor(() => 'rgba(255, 255, 255, 0.1)')
    .polygonStrokeColor(() => '#111')
    .polygonAltitude(() => 0.05)
    .atmosphereColor("rgb(125, 0, 0)")
    .atmosphereAltitude(1);

    Globe.rotation.x = Math.PI/16;
    Globe.rotation.z = Math.PI/8;

    Globe.position.y = -15;


//   setTimeout(() => Globe.polygonAltitude(() => Math.random()), 4000);

  // Setup renderer
  const canvasEl = document.getElementById('canvas');
  const renderer = new THREE.WebGLRenderer({canvas: canvasEl});


  // Setup scene
  const scene = new THREE.Scene();
  scene.add(Globe);
  scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));
  scene.background = new THREE.Color(0x000000)

  //Create stars
  let starArray = [];
  for(let i = 0; i < 100; i++){
    starArray[i] = {x: Math.random(), y: Math.random(), distance: Math.random()}
  }

  // Setup camera
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 300;


  onResize();

  // Add camera controls
  // Kick-off renderer

  let scrollAmount = 0;
  let scrollInertia = 0;
  let lastScroll = 0;

  //Fill in nav if necessary
  if($(window).scrollTop() > 0){
    $("#nav").addClass("scroll");
  } else {
    $("#nav").removeClass("scroll");
  }

  (function animate() { // IIFE
    // Frame cycle
    // tbControls.update();
    // Globe.rotation.y += 0.001;
    Globe.rotateOnAxis(new THREE.Vector3(0, 1, 0), scrollInertia * 0.00005 + 0.001);
    // Globe.position.y = scrollAmount * 0.04 - 15;
    // Globe.rotation.y += scrollInertia * 0.0001;
    scrollInertia = scrollInertia * 0.98;
    renderer.render(scene, camera);

    for(let i = 0; i < 100; i++){
      starArray[i] = {x: Math.random(), y: Math.random(), distance: Math.random()}
    }


    requestAnimationFrame(animate);
  })();

  function onResize(){
	// alert("sadf");
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        Globe.position.x = window.innerWidth/10;
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    $(window).resize(onResize);
    
    $(window).scroll(function(){
      scrollAmount = $(this).scrollTop();
      scrollInertia += scrollAmount - lastScroll;
      lastScroll = scrollAmount;
      if(scrollAmount > 0){
        $("#nav").addClass("scroll");
      } else {
        $("#nav").removeClass("scroll");
      }
  });


});
