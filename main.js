var renderer=new THREE.WebGLRenderer({antialias:true});//Create renderer
renderer.setClearColor(0x55aa00,0.7);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMapEnabled=true;//for shadows
renderer.shadowMapSoft = true;

var scene=new THREE.Scene();//create the scene
var camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);

camera.position.set(500,5,0);
camera.lookAt(scene.position);

camera.setLens(100,100);
var axes=new THREE.AxisHelper(50);

var spotLight=new THREE.SpotLight(0xFFFFFF);//light
spotLight.position.set(camera.position.x,camera.position.y+285,camera.position.z);
scene.add(spotLight);
spotLight.castShadow=true;
var loader = new THREE.TextureLoader();
var texture = loader.load( 'ym.jpg' );
var texture3 = loader.load( 'back.jpg' );//loaging image as texture
// create the cube and add to the scene
var cube=new THREE.Mesh(new THREE.BoxGeometry(1000,2,30),new THREE.MeshLambertMaterial({map:texture}));
scene.add(cube);
cube.receiveShadow=true;
cube.position.set(0,0,0);
// create antoher cube for left side
var cubeLeft=new THREE.Mesh(new THREE.BoxGeometry(1000,2,10),new THREE.MeshLambertMaterial({map:texture3}));
scene.add(cubeLeft);
cubeLeft.rotation.x=90;
cubeLeft.position.z=20;
cubeLeft.position.y=0;
// create antoher cube for right side
var cubeRight=new THREE.Mesh(new THREE.BoxGeometry(1000,2,10),new THREE.MeshLambertMaterial({map:texture3}));
scene.add(cubeRight);
cubeRight.rotation.x=-90;
cubeRight.position.z=-20;
cubeRight.position.y=0;
//This is for background image .
var back = loader.load( 'back.jpg' );
var backgroundMesh = new THREE.Mesh(
new THREE.PlaneGeometry(2, 2, 0),
new THREE.MeshBasicMaterial({
map: back
}));
renderer.autoClear = false;
backgroundMesh.material.depthTest = false;
backgroundMesh.material.depthWrite = false;
backgroundScene = new THREE.Scene();
backgroundCamera = new THREE.Camera();
backgroundScene.add(backgroundCamera );
backgroundScene.add(backgroundMesh );
var x=0;
var score=0;//score
var sphereTexture=loader.load("Img/1.jpg");
var time;
var isGameOver=false;
var speed=1000;
function startTimer()
{
time=setInterval(addSphere,speed);
}
function startGame()
{
startTimer();
speed=1000;
isGameOver=false;
score=0;
var x=document.querySelector("#gOver");
var y=document.querySelector("#start");
document.getElementById('score').innerHTML=score;
y.style.display="none";
x.style.height="0px";
x.style.boxShadow="0px 0px 0px 0px black";
x.style.padding="0px";
}
function render()
{
renderer.clear();
renderer.render(backgroundScene, backgroundCamera);
renderer.render(scene,camera);
requestAnimationFrame(render);
}
render();
function addSphere()
{

// Creates a sphere and makes it to move towards camera.
var texture2 = loader.load( "Img/tex"+Math.ceil(Math.random()*5)+".png" );
var sphere=new THREE.Mesh(new THREE.SphereGeometry(4,20,20),
new THREE.MeshBasicMaterial({map:texture2}));
scene.add(sphere);
sphere.position.x=-500;
sphere.position.y=5;
sphere.position.z=-10+Math.ceil(Math.random()*20);
sphere.castShadow=true;
moveShpere(sphere);
}
function moveShpere(sphere)
{
if(sphere.position.x==camera.position.x)
{
//Game over condition .
if(sphere.position.z==camera.position.z-4||
sphere.position.z==camera.position.z+4||sphere.position.z==camera.position.z-1||sphere.position.z==camera.position.z+3||sphere.position.z==camera.position.z|| 
sphere.position.z==camera.position.z+1|| sphere.position.z==camera.position.z-1 ||
 sphere.position.z==camera.position.z+2|| sphere.position.z==camera.position.z-2)
{
clearInterval(time);
isGameOver=true;
gameOVer();
}
}
// here is the code for moving of the sphere
sphere.position.x+=10;
sphere.rotation.z+=10;
if(sphere.position.x<700)
requestAnimationFrame(function(){moveShpere(sphere);});
else if(!isGameOver){
score++;
document.getElementById('score').innerHTML=score;

//This is for changing fastness of the shpere movement
if(score==30){
clearInterval(time);
time=setInterval(addSphere,800)
}
else if(score==50){
clearInterval(time);
time=setInterval(addSphere,500)
}
else if(score==70){
clearInterval(time);
time=setInterval(addSphere,300)
}
}
}
window.addEventListener("resize",onResize,false);
window.addEventListener("keydown",keyDown,false);
function onResize()
{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
}

//This is for movement of the camera to left ,right ,front and back.
function keyDown(e)
{
var x=e.which;
if(x==38)
{
if(camera.position.x<-450)
return;
camera.position.x-=10;
console.log(camera.position.x);
}
else if(x==40)
{
if(camera.position.x>480)
return;
camera.position.x+=10;
console.log(camera.position.x);
}
else if(x==65)
{
window.location.href="";
}
else if(x==37)
{

changeSlow(6,"plus");
}
else if(x==39)
{

changeSlow(6,"minus");
}
e.preventDefault();
return false;
}
function changeSlow(x,str)
{
if(x!=0)
{
if(str!="plus")
{
if(camera.position.z<=-12 )
return ;
camera.position.z-=1;
}
else
{
if(camera.position.z>=12 )
return ;
camera.position.z+=1;
}

requestAnimationFrame(function(){changeSlow(--x,str);});
}
}
function gameOVer()
{
var x=document.querySelector("#gOver");
document.getElementById('score1').innerHTML=score;
x.style.height="150px";
x.style.boxShadow=" 0px 0px 5px 1px black";
x.style.padding="10%";
}