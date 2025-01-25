import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Cena
const scene = new THREE.Scene();

// Câmera (perspectiva)
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 15, 35);
camera.lookAt(scene.position); //point the camera to the center of the scene

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000000");
document.body.appendChild(renderer.domElement);


// USE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// Cubo
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshNormalMaterial({ wireframe: true });
//  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(20, 0,0)
// cube.rotation.x = THREE.MathUtils.degToRad(-30); // Rotação de 45 graus no eixo X

// cube.rotation.set(
//     // THREE.MathUtils.degToRad(45),  // Rotação em torno do eixo X
//     // THREE.MathUtils.degToRad(30),  // Rotação em torno do eixo Y
//     // THREE.MathUtils.degToRad(60)   // Rotação em torno do eixo Z
//   );
scene.add(cube);


//-------------------------------------------------------

//base cylinder
let cylinderGeometry = new THREE.CylinderGeometry(
    6, //raio da base superior
    6, //raio da base inferior
    1, //altura
    32 );//triangulos
material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00  });
const lamp_base=  new THREE.Mesh(cylinderGeometry, material);
// lamp_base.position.set(20, 0,0)

// add the cube to the scene
scene.add(lamp_base);

//arm cylinder
cylinderGeometry = new THREE.CylinderGeometry(
    0.5, //raio da base superior
    0.5, //raio da base inferior
    10, //altura
    32 );//triangulos
material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00  });
const arm=  new THREE.Mesh(cylinderGeometry, material);
arm.rotation.x = THREE.MathUtils.degToRad(-15);
arm.position.set(0, 5, -4)


// add the cube to the scene
lamp_base.add(arm);


//articulations
cylinderGeometry = new THREE.CylinderGeometry(
    0.5, //raio da base superior
    0.5, //raio da base inferior
    1, //altura
    32,
    1,
    false,
    0,
    3.1);//triangulos
material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00,side: THREE.DoubleSide   });
const middleArticulation1=  new THREE.Mesh(cylinderGeometry, material);
middleArticulation1.position.set(0, 5, 0)

// add the cube to the scene
arm.add(middleArticulation1);

cylinderGeometry = new THREE.CylinderGeometry(
    0.5, //raio da base superior
    0.5, //raio da base inferior
    1, //altura
    32,
    1,
    false,
    3,
    3.1);//triangulos
material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00   });
const middleArticulation2=  new THREE.Mesh(cylinderGeometry, material);
// middleArticulation2.position.set(25, 18, -4)

// add the cube to the scene
arm.add(middleArticulation2);


// //forearm cylinder
// cylinderGeometry = new THREE.CylinderGeometry(
//     0.5, //raio da base superior
//     0.5, //raio da base inferior
//     10, //altura
//     32 );//triangulos
// material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00   });
// const forearm=  new THREE.Mesh(cylinderGeometry, material);
// forearm.position.set(20, 18, -4)

// // add the cube to the scene
// scene.add(forearm);



// //lamp cone
// cylinderGeometry = new THREE.ConeGeometry(
//     4, //raio 
//     8, //altura
//     32, //triangulos
//     12, //triangulos
//     true
// );
// material = new THREE.MeshNormalMaterial({ wireframe: false,color: 0x00ff00   });
// const lamp=  new THREE.Mesh(cylinderGeometry, material);
// lamp.position.set(20, 18, 4)

// // add the cube to the scene
// scene.add(lamp);

// start the animation
renderer.setAnimationLoop(render);

/*********************
* HELPER to visualize different CSs 
* *******************/
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const axesHelper2 = new THREE.AxesHelper(2);
cube.add(axesHelper2);

const axesHelper3 = new THREE.AxesHelper(2);
arm.add(axesHelper3);

/*********************
* ANIMATION LOOP
* *******************/
function render() {


    controls.update();

    // render the scene ("draw" the scene into the Canvas, using the camera's point of view)
    renderer.render(scene, camera);
};



// // Cubo
// let geometry = new THREE.BoxGeometry(20, 20, 20);
// let material = new THREE.MeshStandardMaterial({wireframe: false,color: 0xff0070});
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0,10,-40)

// cube.castShadow=true
// scene.add(cube);

// //Esfera
// geometry =new THREE.SphereGeometry(20,50,30)
// material = new THREE.MeshLambertMaterial({ wireframe: false,color:0x004f00  });
// let sphere = new THREE.Mesh( geometry, material ); 
// sphere.position.set(-30,10,-15)
// sphere.castShadow=true
// cube.add( sphere );

// //cone
// geometry =new THREE.ConeGeometry(25,50,50)
// material = new THREE.MeshLambertMaterial({ wireframe: false,color:0x0000ff });
// let cone = new THREE.Mesh( geometry, material ); 
// cone.position.set(30,16,-25)
// cube.castShadow=true
// cube.add( cone );


let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
forearm.name = "forearm";
lamp_base.name = "lamp_base";
arm.name = "arm";
pivotArm.name = "pivotArm";
let isMouseDown=false
let inicialMouseY=0
let previousRotationX=0

window.addEventListener('mousedown',(event)=>{
    mouse.x=( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    console.log(mouse.y);
    // let lampParts=[forearm,lamp_base,arm,pivotArm]
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects( scene.children,true );
   

    if (intersects.length>0) {
        const intersectedObject = intersects[0].object;

        if(intersectedObject.name==="forearm"){
            intersectedObject.material.color.set(0xff0000)
            isMouseDown=true
            inicialMouseY= mouse.y
            previousRotationX=pivotArm.rotation.x
            console.log(inicialMouseY);   
        }
    }
})



// window.addEventListener('mousemove',(event)=>{
//     if (isMouseDown) {
//         let maxRotation=THREE.MathUtils.degToRad(120)
//         let minRotation=THREE.MathUtils.degToRad(0)
        
//         let displacementY=event.clientY-inicialMouseY
//          // Interpola a rotação com Lerp
//          let targetRotationX = previousRotationX + displacementY * 0.01;

//          // Usa Lerp para suavizar a rotação
//          pivotArm.rotation.x = THREE.MathUtils.lerp(
//              pivotArm.rotation.x,
//              targetRotationX,
//              0.1 // Fator de suavização (quanto menor, mais suave será o movimento)
//          );


//         pivotArm.rotation.x = Math.min(Math.max(pivotArm.rotation.x, minRotation), maxRotation); 

//         console.log(`Rotação do forearm: ${THREE.MathUtils.radToDeg(pivotArm.rotation.x)} graus`);
//     }
// })

// window.addEventListener('mouseup',(event)=>{
//     if(isMouseDown){
//         console.log('done');
//         isMouseDown=false
      
//     }
  
// })


if (LXi>=1&& LXi<=5) {
    // pivotForeArm.rotation.x = THREE.MathUtils.lerp(pivotForeArm.rotation.x-90,lamp_topRotationX,0.01)
    // pivotForeArm.rotation.z = THREE.MathUtils.lerp(pivotForeArm.rotation.z,lamp_topRotationZ,0.01)





}




function handleLampClick() {

    spotLight.visible = false;
    lamp_base.position.x+=1
    isLookingAtObject=false
    updateRotation()

    // Após 2 segundos, voltar ao comportamento original
    setTimeout(() => {
        isLookingAtObject=true
        resetLampToOriginalState();
    }, 2000); // 2000ms = 2 segundos
}

// Função para restaurar a lâmpada ao estado original
function resetLampToOriginalState() {
    isLookingAtObject=true
    updateRotation()
    spotLight.visible = true;
}

// let raycaster = new THREE.Raycaster()
// let mouse = new THREE.Vector2()
// let lampParts=[forearm,lamp_base,arm,,lampTop,lamp]


// window.addEventListener('click',(event)=>{

//     mouse.x=( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     console.log(mouse.y);
    
//     raycaster.setFromCamera(mouse,camera);
//     const intersects = raycaster.intersectObjects( scene.children,true );
   
//     if (intersects.length>0) {
//         const intersectedObject = intersects[0].object;

//         if(lampParts.includes(intersectedObject)){
//             intersectedObject.material.color.set(0xff0000) 
//             handleLampClick()
            
//         }
//     }
// })