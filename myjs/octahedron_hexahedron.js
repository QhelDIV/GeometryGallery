/**
 * Created by Xingguang on 2015/9/17.
 */
var container;
var camera, controls, stats, scene, renderer;
//GUI variables
var gui, parameters;

function init () {
    var i;
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;
    //GUI
    gui = new dat.GUI();
    parameters = {
    };
    //Scene
    scene = new THREE.Scene();
    //Camera
    camera = new THREE.PerspectiveCamera(45,canvasRatio, 1, 100000);
    scene.add(camera);
    camera.position.z=900
    //Renderer
    if (Detector.webgl )  renderer = new THREE.WebGLRenderer( {antialias:true}); else  renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setSize( canvasWidth, canvasHeight);
    container = document.body;
    container.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );

    //Geometry
    var radius = 100;
    for(i=0;i<6;i++) {
        var material_thick = new THREE.MeshBasicMaterial({color: 0xff0000,wireframe:true,transparent: true,opacity:0.5});
        var material_thin = new THREE.MeshBasicMaterial({color: 0x0000ff,wireframe:true});
        var oct_geo = new THREE.OctahedronGeometry(radius * 3 / 2);
        var hex_geo = new THREE.BoxGeometry(radius, radius, radius);
        scene.add(new THREE.Mesh(oct_geo, material_thin));
        scene.add(new THREE.Mesh(hex_geo, material_thick));

        radius = radius * 3/2
    }
}
function render() {
    renderer.render(scene, camera);
    controls.update();
}
var current;
function animate() {
    requestAnimationFrame( animate );
    current = Date.now();
    render();
}

init();
lastdate=Date.now();
animate();
