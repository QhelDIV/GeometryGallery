/**
 * Created by Xingguang on 2015/9/8.
 */
var camera, scene, renderer;
var geometry, material, mesh,mesh1,mesh2;

function init () {

    renderer = new THREE.WebGLRenderer( {antialias:true});
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setSize( 600, 300 );
    renderer.globalAlpha=0.4;
    document.getElementById("center").appendChild(renderer.domElement);
    camera = new THREE.OrthographicCamera(-600,600,300,-300,-600,600);

    //camera.position.z = 500;

    scene = new THREE.Scene();

    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    spheregeometry = new THREE.SphereGeometry(200,48,48);
    var sun_texture=THREE.ImageUtils.loadTexture('textures/texture_sun.jpg');
    var earth_texture=THREE.ImageUtils.loadTexture('textures/texture_earth_clouds.jpg');
    var moon_texture=THREE.ImageUtils.loadTexture('textures/texture_moon.jpg');
    material1 = new THREE.MeshLambertMaterial( { map: earth_texture} );
    material2 = new THREE.MeshLambertMaterial( { map: sun_texture} );
    material3 = new THREE.MeshLambertMaterial( { map: moon_texture} );

    mesh = new THREE.Mesh( spheregeometry, material1 );
    scene.add( mesh );
    mesh1 = new THREE.Mesh( spheregeometry, material2 );
    mesh1.position.set(-450,0,-100);
    scene.add( mesh1 );
    mesh2 = new THREE.Mesh( spheregeometry, material3 );
    mesh2.position.set(450,0,100);
    scene.add( mesh2 );

    paralight = new THREE.DirectionalLight(0xffffff,1);
    paralight.position.set(0, 0, 500);
    scene.add( paralight );
    scene.add( new THREE.AmbientLight( 0x333333 ) );
}
function render() {
    renderer.render(scene, camera);
}
function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x = Date.now() * 0.0005;
    mesh1.rotation.y = Date.now() * 0.0005;
    mesh2.rotation.z = Date.now() * 0.0005;
    render();

}

init();
animate();
