import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




// Cena
const scene = new THREE.Scene();

// Câmera (perspectiva)
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 70);
camera.lookAt(scene.position); //point the camera to the center of the scene

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000000");
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement);


// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);



//-----------------------------------
//objeto a iluminar

let geometry = new THREE.TorusKnotGeometry( 15, 3, 90, 8,8,20 ); 
let material = new  THREE.MeshLambertMaterial( { color: 0x2e3254 } ); 
let torusKnot = new THREE.Mesh( geometry, material );
torusKnot.position.set(0,30,-60)
torusKnot.castShadow=true
scene.add( torusKnot );


//plano horizontal XZ
let planeGeometry = new THREE.PlaneGeometry(400, 400);
let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x15172b });
const planeXZ = new THREE.Mesh(planeGeometry, planeMaterial);
planeXZ.rotation.x = -Math.PI / 2;  // Colocar o plano horizontalmente
planeXZ.receiveShadow = true;  // Configurar para receber sombras
scene.add(planeXZ);

//plano horizontal XY
planeGeometry = new THREE.PlaneGeometry(400, 400);
planeMaterial = new THREE.MeshStandardMaterial({ color: 0x15172b });
const planeXY = new THREE.Mesh(planeGeometry, planeMaterial);
planeXY.rotation.x =0;  // Colocar o plano horizontalmente
planeXY.receiveShadow = true;  // Configurar para receber sombras
planeXY.position.set(0,0,-200)
scene.add(planeXY);




//base cilindrica do candieiro
let cylinderGeometry = new THREE.CylinderGeometry(
    6, //raio da base superior
    6, //raio da base inferior
    1, //altura
    32 );//triangulos
material = new THREE.MeshLambertMaterial({
     wireframe: false,
     color: 0xc5c9e6,
   

 });
const lamp_base=  new THREE.Mesh(cylinderGeometry, material);
lamp_base.rotation.y = THREE.MathUtils.degToRad(-90);
lamp_base.position.set(70,0,10)
// lamp_base.scale.set(0.1, 0.1, 0.1);
lamp_base.castShadow=true
// add base a cena
scene.add(lamp_base);


//braço do candieiro
geometry = new THREE.BoxGeometry(1.6,10,1.5,9,9,9 );
material = new THREE.MeshLambertMaterial({ wireframe: false,color: 0xc5c9e6  });
const arm=  new THREE.Mesh(geometry, material);
arm.rotation.x = THREE.MathUtils.degToRad(-20);
arm.position.set(0, 5, -4)

//add braço a base
lamp_base.add(arm);



//articulação(pivot) entre o braço e o antebraço
let pivotArm = new THREE.Object3D()
pivotArm.position.set(0, 6, 0)
pivotArm.rotation.x = THREE.MathUtils.degToRad(70);  //aplicar a rotação do antebraço neste pivot

//add pivot ao braço
arm.add(pivotArm)

// estrutora para posicionar o pivot
geometry = new THREE.BoxGeometry(0.2,2,1.5);//triangulos
material = new THREE.MeshLambertMaterial({ wireframe: false,side: THREE.DoubleSide,color: 0xc5c9e6  });
const middleArticulation1=  new THREE.Mesh(geometry, material);
middleArticulation1.position.set(0.7, 6, 0)
arm.add(middleArticulation1);

geometry = new THREE.BoxGeometry(0.2,2,1.5);//triangulos
material = new THREE.MeshLambertMaterial({ wireframe: false,side: THREE.DoubleSide,color: 0xc5c9e6  });
const middleArticulation2=  new THREE.Mesh(geometry, material);
middleArticulation2.position.set(-0.7, 6, 0)
arm.add(middleArticulation2);
//-------


//Parafusos------------ 
cylinderGeometry = new THREE.CylinderGeometry(
    0.5, //raio da base superior
    0.5, //raio da base inferior
    0.5, //altura
    32 );//triangulos
material = new THREE.MeshLambertMaterial({ wireframe: false,color: 0xc5c9e6 });
const screwLeft=  new THREE.Mesh(cylinderGeometry, material);
screwLeft.rotation.z = THREE.MathUtils.degToRad(90);
screwLeft.position.set(-0.8, 6.1, 0)
arm.add(screwLeft);

cylinderGeometry = new THREE.CylinderGeometry(
    0.5, //raio da base superior
    0.5, //raio da base inferior
    0.5, //altura
    32 );//triangulos
material = new THREE.MeshLambertMaterial({ wireframe: false ,color: 0xc5c9e6});
const screwRight=  new THREE.Mesh(cylinderGeometry, material);
screwRight.rotation.z = THREE.MathUtils.degToRad(90);
screwRight.position.set(0.8, 6.1, 0)
arm.add(screwRight);

//Antebraço do candieeiro
geometry = new THREE.BoxGeometry(1.2,15,1.4,9,9,9 );
material = new THREE.MeshLambertMaterial({ wireframe: false,color: 0xc5c9e6  });
const forearm=  new THREE.Mesh(geometry, material);
forearm.position.set(0, 7, 0)
pivotArm.add(forearm);

//articulação(pivot) entre o antebraço e a cabeça
let pivotForeArm = new THREE.Object3D()
pivotForeArm.position.set(0, 7, 0)
pivotForeArm.rotation.x=THREE.MathUtils.degToRad(70);
pivotForeArm.rotation.z=THREE.MathUtils.degToRad(0);

//add pivot ao antebraço
forearm.add(pivotForeArm)

//cabeça--------------
//estrutura cilindrica
cylinderGeometry = new THREE.CylinderGeometry(
    2, //raio da base superior
    2, //raio da base inferior
    5, //altura
    40   // triangulos
);
material = new THREE.MeshLambertMaterial({ wireframe: false ,color: 0xc5c9e6 });
const lampTop=  new THREE.Mesh(cylinderGeometry, material);
lampTop.position.set(0, -1, 0)




//add estrutura cilindrica ao pivot localizado no antebraço 
//pivot responsvel pela movimentação da cabeça e orientação da luz
pivotForeArm.add(lampTop);


//suporte para o foco de luz- estrutura conica
cylinderGeometry = new THREE.CylinderGeometry(
    4, //raio da base superior
    2, //raio da base inferior
    5, //altura
    40   // triangulos
);
material = new THREE.MeshLambertMaterial({ wireframe: false,color: 0xc5c9e6 });
const lamp=  new THREE.Mesh(cylinderGeometry, material);
lamp.position.set(0, 5, 0)
lampTop.add(lamp);



// luzes----
let ambientLight= new THREE.AmbientLight(0xffffff,0.3)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(50, 100, -6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048); 
directionalLight.shadow.camera.far = 200;
directionalLight.shadow.camera.left = -20;
directionalLight.shadow.camera.right = 20;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.bottom = -500;
scene.add(directionalLight);


// spotlight
const spotLight = new THREE.SpotLight( 0xffffff,200.5,1000,Math.PI/6,0.1,0.8 );
spotLight.castShadow = true; // default false

spotLight.position.set(0,20,0);

spotLight.target=torusKnot


//sombras
spotLight.shadow.mapSize.width = 2048; 
spotLight.shadow.mapSize.height = 2048; 
spotLight.shadow.camera.near = 0.5; 
spotLight.shadow.camera.far = 10; 
spotLight.shadow.focus = 1; 



//-------------------------------------------------------



// start the animation
renderer.setAnimationLoop(render);


/*********************
* HELPER to visualize different CSs 
* *******************/
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// // const axesHelper2 = new THREE.AxesHelper(2);
// // cube.add(axesHelper2);

// const axesHelper3 = new THREE.AxesHelper(2);
// arm.add(axesHelper3);

// const axesHelper4 = new THREE.AxesHelper(2);
// pivotArm.add(axesHelper4)

// const axesHelper5 = new THREE.AxesHelper(2);
// forearm.add(axesHelper5)

// const axesHelper6 = new THREE.AxesHelper(2);
// pivotForeArm.add(axesHelper6)





//Interações e animações

let togglebutton =document.getElementById('togglelight')
togglebutton.addEventListener('click',()=>{


        spotLight.visible=!spotLight.visible
   
})

let LYi=0,LXi=70
let gravity=0.01
let isJumping=true
let jumpspeed=0.2*2
let damping = 100;  
let minSpeed = 0.01
let isLookingAtObject=false


function updateRotation(){

    let lamp_topRotationX=THREE.MathUtils.degToRad(50)
    let lamp_topRotationZ=THREE.MathUtils.degToRad(90) 

    if (isLookingAtObject){
        pivotForeArm.rotation.x = THREE.MathUtils.lerp(pivotForeArm.rotation.x,lamp_topRotationX,0.05)
        pivotForeArm.rotation.z = THREE.MathUtils.lerp(pivotForeArm.rotation.z,lamp_topRotationZ,0.05)
        spotLight.target=torusKnot
    }else{
        lamp_topRotationX=THREE.MathUtils.degToRad(-50)
        lamp_topRotationZ=THREE.MathUtils.degToRad(-180) 

        pivotForeArm.rotation.x = THREE.MathUtils.lerp(pivotForeArm.rotation.x,lamp_topRotationX,0.05)
        pivotForeArm.rotation.z = THREE.MathUtils.lerp(pivotForeArm.rotation.z,lamp_topRotationZ,0.05)
        spotLight.target=camera
    }



}

let oscillationSpeed = 0.01; // Velocidade do balanço
let oscillationAmplitude = THREE.MathUtils.degToRad(0.8); // Ângulo máximo do balanço

function jump(){
     
    //movimento horizontal
    if (LXi>5) {
        LXi-=(0.1*2) 
    }else{
       
        // Aplicar amortecimento para parar suavemente
        LXi += (5 - LXi) * damping; // Gradualmente aproxima-se de 5
        if (Math.abs(LXi - 5) < minSpeed) {
            LXi = 5; // Garante paragem exata em 5 
            
            //rotação da cabeça
            isLookingAtObject=true
            updateRotation()

            lampTop.add( spotLight )
        }
        isJumping=false 
        oscillationAmplitude=0
        oscillationSpeed=0
    }
    
    if (isJumping) {
        LYi+=jumpspeed //subir veticalmente
        jumpspeed-=gravity // a medida que sobe a velicidade diminui por causa da gravidade
        applyHeadOscillation(1);
        if (jumpspeed<=0) {
            isJumping = !isJumping
           
        }
    }
    else{
        LYi-=jumpspeed //descer veticalmente
        jumpspeed+=gravity //aumento da velocidade
        applyHeadOscillation(-1);
        if (LYi <= 0) {
            LYi=0
            isJumping = true
            jumpspeed=0.2*2
        }       
    }


}

function applyHeadOscillation(direction) {
    

    const oscillation = Math.sin(Date.now() * 0.005 * oscillationSpeed) * oscillationAmplitude;
    pivotForeArm.rotation.x += direction * oscillation;
}


let moveSpeed=0.01
let isMovingUp=false
let isMovingDown=false
let maxRotation=THREE.MathUtils.degToRad(120)
let minRotation=THREE.MathUtils.degToRad(0)

function moveLampArm(){
    if(isMovingUp && pivotArm.rotation.x>minRotation){
        pivotArm.rotation.x-=moveSpeed
    }

    if(isMovingDown &&pivotArm.rotation.x<maxRotation){
        pivotArm.rotation.x+=moveSpeed
    }
}

document.addEventListener('keydown',(event)=>{
    if(event.key==='ArrowUp'){
        isMovingUp=true
    }

    if(event.key==='ArrowDown'){
        isMovingDown=true
    }


})


document.addEventListener('keyup',(event)=>{
    if(event.key==='ArrowUp' ){
        isMovingUp=false
    }

    if(event.key==='ArrowDown' ){
        isMovingDown=false
    }
})

moveSpeed = 0.01;
let isMovingLeft = false;
let isMovingRight = false;
let maxLampTopRotation = THREE.MathUtils.degToRad(60);
let minLampTopRotation = THREE.MathUtils.degToRad(-60);

function moveLampTop() {
    if (isMovingLeft && lampTop.rotation.z > minLampTopRotation) {
        lampTop.rotation.z -= moveSpeed;
    }

    if (isMovingRight && lampTop.rotation.z < maxLampTopRotation) {
        lampTop.rotation.z += moveSpeed;
    }
}


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            isMovingLeft = true;
            break;
        case 'ArrowRight':
            isMovingRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            isMovingLeft = false;
            break;
        case 'ArrowRight':
            isMovingRight = false;
            break;
    }
});



function render() {

    controls.update();
    jump()
    moveLampArm()
    moveLampTop()

    lamp_base.position.set(LXi,LYi,0)
    // spotLight.position.set(LXi-10, LYi+20, 0);

    torusKnot.rotation.x+=0.01
    torusKnot.rotation.y+=0.01
    torusKnot.rotation.z+=0.01
    renderer.render(scene, camera);
};



