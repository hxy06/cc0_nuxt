/**
 * Created by huangxiaoyan on 2018/11/28.
 */
var BALL={};


BALL.colorShiftRatio=1;
BALL.ballHBS_Xshift=0;
function Ball(){
  this.prototype={};

  this.renderer=new THREE.WebGLRenderer({antialias:false,alpha:false});
  this.renderer.setClearColor( 0x000000 ,0);
  this.renderer.setPixelRatio(MAIN.renderer.getPixelRatio());

  var dpr =MAIN.renderer.getPixelRatio();
  this.renderer.setSize(1024,512);


  var fov    = 30;//レンズの口径(deg)
  var aspect=2;
  var near   = 15;
  var far    = 100000;
  var firstZ=-1500;
  this.camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
  this.camera.position.set( 0, 0, firstZ );
  this.camera.zoom=1;

  this.scene=new THREE.Scene();

  this.threeCanvasArea=$("#ball_three_area");
  this.canvas=$(this.renderer.domElement);
  this.threeCanvasArea.append(this.canvas);

  var shadersRender;
  var shadersUpdateDivergence;//発散
  var shadersUpdatePressure;
  var shadersUpdateVelocity;
  var shadersAdvectData;

  var startTime,pastTime;

  //マウスの上下左右移動への反応感度に関係
  var centerAdjustment={x:2,y:2};

  GL_CORE2.pastTime;
  GL_CORE2.resizeHl;
  GL_CORE2.aspect=1;

  BALL.camera=this.camera;
  BALL.renderer=this.renderer;
  BALL.scene=this.scene;

  var targetCenterRatio=new THREE.Vector2().copy(PLANE.targetCenterRatio);

  var geometryR=200;
  this.initEnd;

  var startTime=new Date().getTime();


  var pointer=new THREE.Mesh(new THREE.SphereBufferGeometry(10,64,32),new THREE.MeshPhongMaterial({color:0xff0000,side:THREE.DoubleSide}));
  pointer.castShadow=true;
  pointer.receiveShadow=true;
  pointer.position.z=100;
  pointer.position.x=-100;

  var pointer2=new THREE.Mesh(new THREE.BoxBufferGeometry(10,10,32),new THREE.MeshPhongMaterial({color:0xffff00,side:THREE.DoubleSide}));
  pointer2.castShadow=true;
  pointer2.position.z=100;
  pointer2.position.y=60;
  pointer2.position.x=-50;


  var ballTexture=new THREE.CanvasTexture(this.renderer.domElement);


  var ballGeometry=new THREE.SphereBufferGeometry(geometryR,32,64,0,Math.PI*2,0.01,Math.PI);

  var ballGeometry2=new THREE.SphereBufferGeometry(geometryR,4,16,0,Math.PI*2,0.01,Math.PI);





  var ballMaterial=new THREE.ShaderMaterial({
    uniforms: {
      'time':{
        type: 'f',
        value: 0
      },
      'colorShift':{
        type: 'f',
        value: 0
      },
      'colorShiftRatio':{
        type: 'f',
        value: 1
      },
      'ballHBS_Xshift':{
        type: 'f',
        value:0
      },
      'changeColor':{
        type: 'f',
        value:GL_CORE.uMonocromeRatio
      },
      'texture':{
        type: 't',
        value:ballTexture
      },
      'resolution': {
        type: 'v2',
        value: new THREE.Vector2(MAIN.canvasW * dpr, MAIN.canvasH * dpr)
      },
      'mouseFromCenter':{
        type: 'v2',
        value: new THREE.Vector2(0,0)
      },
      'mouseDistance':{
        type: 'f',
        value: 0
      },
      'geometryR':{
        type: 'f',
        value: geometryR
      }
    },
    vertexShader:BALL.vertexShader2,
    fragmentShader:BALL.fragmentShader2,
    wireframe:false,
    transparent:true
  });

  //影
  var ballMaterial2=ballMaterial.clone();
  ballMaterial2. wireframe=false;
  ballMaterial2.vertexShader=BALL.vertexShader3;
  ballMaterial2.fragmentShader=BALL.fragmentShader3;



  var ballMesh=new THREE.Mesh(ballGeometry,ballMaterial);
  ballMesh.rotation.y=Math.PI*0.5;


  ballMesh.position.z=100;



  this.geometry=new THREE.PlaneBufferGeometry(1024,512,1);

  var glCore=new GlCore2();
  glCore.init();

  startTime=new Date().getTime();



  this.material=GL_CORE2.shaderMatrial1;

  var uvs=this.geometry.getAttribute("uv").array;


  for(var n=0;n<uvs.length;n++){
    uvs[n]= utils.getYoyoRatio2(uvs[n]);
  }
  this.geometry.getAttribute("uv").needsUpdate=true;


  this.mesh=new THREE.Mesh(this.geometry,this.material);

  var container=new THREE.Object3D();

  BALL.container=container;

  var shadowContainer=new THREE.Object3D();

  for(var n=0;n<2;n++){
    var currentMesh=ballMesh.clone();
    currentMesh.scale.multiplyScalar(0.99+0.005*n);
    container.add(currentMesh);
  }

  MAIN.stage.add(container);

  ballMesh.material=ballMaterial2;
  ballMesh.geometry=ballGeometry2;

  var scaleResolution=30;
  var targetScale=1.5;

  for(var n=0;n<scaleResolution;n++){
    var currentMesh=ballMesh.clone();

    var multiplyer=(Math.pow(n/scaleResolution,1+n/scaleResolution));

    var scale=0.825+(targetScale-1)*multiplyer;

    var scale=0.625+(targetScale-1)*multiplyer;

    currentMesh.scale.multiplyScalar(scale);
    shadowContainer.add(currentMesh)
  }

  MAIN.stage.add(shadowContainer);



  this.mesh.position.z=600;
  this.scene.add(this.mesh);

  container.scale.z=0.05;
  container.position.z=110;
  shadowContainer.scale.z=0.05;
  shadowContainer.position.z=95;


  this.initPosition=function(){

    //ボールの初期位置
    this.centerPoint=new THREE.Vector2(MAIN.canvasW/10,MAIN.canvasH/10);

    currentPoint=new THREE.Vector2().copy(this.centerPoint);

    container.position.x= (this.centerPoint.x+MAIN.canvasW/5)*container.scale.x;
    container.position.y= (this.centerPoint.y+MAIN.canvasH/4)*container.scale.x;

    //マウスの初期位置
    PLANE.realMouseP=new THREE.Vector2(MAIN.canvasW/2,MAIN.canvasH/2);
    shadowContainer.position.x=container.position.x*1.25+MAIN.canvasW/50;
    shadowContainer.position.y=container.position.y*1.25-MAIN.canvasH/50;
    this.initEnd=true;

  }



  //センター位置をずらす
  //this.centerPoint=new THREE.Vector2(MAIN.canvasW/1.5,MAIN.canvasH/1.5);

  this.centerPoint=new THREE.Vector2(MAIN.canvasW/centerAdjustment.x,MAIN.canvasH/centerAdjustment.y);

  var currentPoint=new THREE.Vector2().copy(this.centerPoint);
  this.iterationPoint=new THREE.Vector2();
  var bacePoint=new THREE.Vector2();
  var yuragi=new THREE.Vector2();
  var yuragiXR,yuragiXSpeed,yuragiXRadiuse;
  var yuragiYR,yuragiYSpeed,yuragiYRadiuse;

  var moveGLMouseP=new MoveGLMouseP();

  this.hidden=function(){

  }


  var mouseFromCenter=new THREE.Vector2(),tempMouseFromCenter=new THREE.Vector2();
  var tempMouseAngle,mouseAngle,defMouseAngle;
  var mouseDistance=0,lastMouseDistance=0;
  var tempMouseDistance=0,tempLastMouseDistance=0;
  var tempMouseDistanceRatio=1;
  var targetPoint=new THREE.Vector2();
  var LastOnCirclePoint=new THREE.Vector2();
  var mouseDistanceDirection;
  var mouseNearState;
  var mouseMoveState;
  var radius;
  var onCirclePoint=new THREE.Vector2();
  var mouseStopTimer=setTimeout(function(){},10);

  var mouseMoveCount=0;
  var mouseResetState;
  var mouseMoveStart;

  BALL.mouseP=new THREE.Vector2();

  var mouseMoveCount=2;
  if(utils.dv=="tablet"){
    mouseMoveCount=0
  }


  this.mouseMoveHl=function(p){

    GL_CORE2.mouseP.copy(p);


    if(!mouseMoveStart){
      mouseMoveStart=true;
    }


    mouseMoveState=true;
    clearTimeout(mouseStopTimer);
    mouseStopTimer=setTimeout(function(){
      mouseMoveState=false;
      mouseResetState=false;

      targetPoint.copy(onCirclePoint);
    },1000);

    BALL.mouseP.x=(p.x)/MAIN.canvasW;
    BALL.mouseP.y=(MAIN.canvasH-(p.y))/MAIN.canvasH;

    tempMouseFromCenter=new THREE.Vector2((-0.5+BALL.mouseP.x-container.position.x*container.scale.x/MAIN.canvasW)*windowAspect,-0.5+BALL.mouseP.y-container.position.y*container.scale.x/MAIN.canvasH);




    tempMouseFromCenter.divideScalar(container.scale.x);

    if(mouseMoveCount<1){
      tempMouseFromCenter.x=0.01;
      tempMouseFromCenter.y=-0.01;
    }

    mouseMoveCount+=1;



    tempMouseDistance=tempMouseFromCenter.length()*MAIN.canvasH;



    var dif=tempMouseDistance-lastMouseDistance;

    tempMouseAngle=Math.atan(tempMouseFromCenter.y,tempMouseFromCenter.x);

    defMouseAngle=Math.abs(tempMouseAngle-mouseAngle);

    mouseMoveCount+=1;

    mouseDistanceDirection=(dif<0)?-1:(dif>0)?1:mouseDistanceDirection;
    lastMouseDistance=tempMouseDistance;

    tempMouseDistanceRatio=-1+tempMouseDistance/radius;


    setOnCirclePoint();



    if(!mouseNearState && tempMouseDistanceRatio<0){
      //初回1回だけ、円内に入らないと開始しない。
      mouseNearState=true;
    }


    if(defMouseAngle>Math.PI/30 && mouseNearState){
      try{
        if(!mouseResetState){
          targetPoint.copy(onCirclePoint);
          mouseResetState=true;
        }
      }catch(e){
      }
    }

    if(tempMouseDistanceRatio<0 && mouseResetState){
      return;
    }else{
      if(tempMouseDistanceRatio>=0){
        mouseResetState=false;
      }
    }


    if(mouseDistanceDirection==1){
      if(tempMouseDistanceRatio>-0.3 && tempMouseDistanceRatio<0.5){
        //外側に引っ張る

        targetPoint.copy(onCirclePoint).multiplyScalar((1+tempMouseDistanceRatio)/0.7)

      }else{
        //離す
        targetPoint.copy(onCirclePoint);
      }
    }else{
      if(tempMouseDistanceRatio<0 &&tempMouseDistanceRatio>-0.5){
        //内側に引っ張る
        targetPoint.copy(tempMouseFromCenter).sub(onCirclePoint.clone().multiplyScalar(tempMouseDistanceRatio*-1));
      }else{
        //離す
        targetPoint.copy(onCirclePoint);
      }
    }



    if(moveGLMouseP){
      moveGLMouseP.mouseMove(p);
    }

  }


  var currentBallHBS_Xshift,nextBallHBS_Xshift,diffBallHBS_Xshift;
  var changeBallHBS_XshiftCount=25;
  var changeBallHBS_XshiftCountMax=25;



  BALL.changeBallHBS_Xshift=function(val){
    currentBallHBS_Xshift=ballMaterial.uniforms.ballHBS_Xshift.value;

    nextBallHBS_Xshift=val;
    diffBallHBS_Xshift=nextBallHBS_Xshift-currentBallHBS_Xshift;

    if(diffBallHBS_Xshift>0.5){
      diffBallHBS_Xshift-=1;
    }else if(diffBallHBS_Xshift<-0.5){
      diffBallHBS_Xshift+=1;
    }
    changeBallHBS_XshiftCount=0;

  }

  var changeCount=0;

  function chengeMousePoint(){
    changeCount+=1;

    mouseDistance=mouseFromCenter.length()*MAIN.canvasH;
    var mouseDistanceRatio=-1+mouseDistance/radius;

    var morphCoefficient=(tempMouseDistanceRatio>0)?0.1:0.1;
    var def=mouseFromCenter.clone().sub(targetPoint);

    mouseFromCenter.sub(def.multiplyScalar(morphCoefficient));

    //onCirclePointチェック

    mouseAngle=Math.atan(mouseFromCenter.y,mouseFromCenter.x);


    if(mouseNearState){
      ballMaterial.uniforms.mouseFromCenter.value=mouseFromCenter;
      ballMaterial.uniforms.mouseDistance.value=mouseDistanceRatio;

      ballMaterial2.uniforms.mouseFromCenter.value=mouseFromCenter;
      ballMaterial2.uniforms.mouseDistance.value=mouseDistanceRatio;

    }

    pointer.position.x=onCirclePoint.x*MAIN.winH*container.scale.x;
    pointer.position.y=onCirclePoint.y*MAIN.winH*container.scale.x;





  }

  var scaleRatio,aspectRatio;

  var scareAdjust=1.0;

  function setOnCirclePoint(){


    if(windowAspect>1){
      onCirclePoint=tempMouseFromCenter.clone().normalize().multiplyScalar(0.002*scareAdjust/container.scale.x*radius);
    }else{
      onCirclePoint=tempMouseFromCenter.clone().normalize().multiplyScalar((0.002*scareAdjust*windowAspect)/container.scale.x*radius)
    }

  }

  this.resizeHl=function(canvasW,canvasH){

    var ratioW=2;

    this.centerPoint.set(MAIN.canvasW/centerAdjustment.x,MAIN.canvasH/centerAdjustment.y);


    PLANE.centerPoint.copy(this.centerPoint);

    this.camera.aspect=ratioW;

    //z位置が0でピクセル等倍になるようにカメラ位置セット
    //setParmanentDistance();

    //スケールを変えた時はsetOnCirclePointの数値も変える
    scaleRatio=canvasH*0.002*scareAdjust;
    aspectRatio=canvasW/canvasH;
    windowAspect=aspectRatio;

    changeContainerScale();



    GL_CORE2.resizeHl(1024,512);

    if(moveGLMouseP){
      moveGLMouseP.resizeHl(canvasH,ratioW);
    }


    radius=2.2*0.5*geometryR;


    setOnCirclePoint();


    //リサイズ時は離した時と同様に
    targetPoint.copy(onCirclePoint);


    ballMaterial.uniforms.resolution.value.set(MAIN.canvasW * dpr, MAIN.canvasH * dpr);
    ballMaterial2.uniforms.resolution.value.set(MAIN.canvasW * dpr, MAIN.canvasH * dpr);
  }

  var bressScale=0;
  var bressScaleRortation=0;
  var bressScaleRortationSpeed=0.05;

  function changeContainerScale(){
    if(aspectRatio<1){
      container.scale.x=scaleRatio*aspectRatio+bressScale;
      container.scale.y=scaleRatio*aspectRatio+bressScale;
    }else{
      container.scale.x=scaleRatio+bressScale;
      container.scale.y=scaleRatio+bressScale;
    }

    shadowContainer.scale.x=container.scale.x*1.15;
    shadowContainer.scale.y=container.scale.y*1.15;
  }

  var nudgeSpeed=0.02;
  var nudgeSpeedCount=0;
  var nudgeSpeedCountMax=100;


  this.update=function(){

    currentPoint=PLANE.realMouseP.clone().sub(this.centerPoint);

    currentPoint.y*=-1;
    var nowPoint=container.position.clone();
    if(nudgeSpeedCount<nudgeSpeedCountMax){
      //初期位置に近づくスピード、最初早く
      nudgeSpeedCount+=1;
      nudgeSpeed=0.01+0.02*(1-Math.pow(nudgeSpeedCount/nudgeSpeedCountMax,.3));
    }

    var difPoiunt=currentPoint.clone().sub(nowPoint).multiplyScalar(nudgeSpeed);

    container.position.x= nowPoint.x+difPoiunt.x;
    container.position.y= nowPoint.y+difPoiunt.y;


    bressScaleRortation+=bressScaleRortationSpeed;
    bressScale=Math.sin(bressScaleRortation)*0.025;
    changeContainerScale();


    shadowContainer.position.x=container.position.x+4.6*MAIN.canvasW/50;


    shadowContainer.position.y=container.position.y-1.25*MAIN.canvasH/50;

    chengeMousePoint();
    //}

    //影のグネグネ
    var pastTime=new Date().getTime()-startTime;
    ballMaterial2.uniforms.time.value=pastTime*0.001;
    ballMaterial.uniforms.time.value=pastTime*0.000025;
    ballMaterial.uniforms.colorShift.value=PLANE.colorShift;
    ballMaterial.uniforms.colorShiftRatio.value=BALL.colorShiftRatio;

    if(changeBallHBS_XshiftCount<changeBallHBS_XshiftCountMax){
      changeBallHBS_XshiftCount+=1;
      var ratio=changeBallHBS_XshiftCount/changeBallHBS_XshiftCountMax;
      PLANE.material2HBS_Xshift=ballMaterial.uniforms.ballHBS_Xshift.value=currentBallHBS_Xshift+ratio*diffBallHBS_Xshift;

    }



    ballMaterial2.uniforms.colorShift.value=PLANE.colorShift;
    ballMaterial.uniforms.changeColor.value=(1-GL_CORE.uMonocromeRatio);


    if(moveGLMouseP){
      moveGLMouseP.update();
    }

    GL_CORE2.pastTime=pastTime=new Date().getTime()-startTime;
    GL_CORE2.shaderUpdate();


    ballTexture.needsUpdate=true;



    this.renderer.render( this.scene, this.camera);

  }




  GL_CORE2.mouseP=new THREE.Vector2();




  function MoveGLMouseP(){
    this.prototype={};

    var pointRadiuse=0,pointRadiuseRotateSpeed=Math.PI*0.003,pointRadiuseRotation=0;
    var rotateRadiuse=0,rotateRadiuseRotateSpeed=Math.PI*0.01,rotateRadiuseRotation=0;
    var radiuseLengthRatio=0,radiuseLengthRotateSpeed=Math.PI*0.005,radiuseLengthRotation=0;
    this.aspect=aspect;

    this.resizeHl=function(h,accept){
      pointRadiuse=h/(2*1.5);
      rotateRadiuse=pointRadiuse*0.7;

      this.aspect=accept;
    }

    var mouseMoveState;
    var mouseMoveCount=0;
    var mouseMoveStateTimer=setTimeout(function(){},100);
    this.realMouseP=new THREE.Vector2();
    var resetP=new THREE.Vector2();


    var mouseFromCenter=new THREE.Vector2(),tempMouseFromCenter=new THREE.Vector2();
    var tempMouseAngle,mouseAngle,defMouseAngle;
    var mouseDistance=0,lastMouseDistance=0;
    var tempMouseDistance=0,tempLastMouseDistance=0;
    var tempMouseDistanceRatio=1;
    var targetPoint=new THREE.Vector2();
    var LastOnCirclePoint=new THREE.Vector2();
    var mouseDistanceDirection;
    var mouseNearState;

    var radius;
    var onCirclePoint;
    var mouseStopTimer=setTimeout(function(){},10);

    var mouseResetState;

    this.mouseMove=function(p){
      mouseMoveState=true;
      mouseMoveCount+=1;

      updateCount=0;


      if(mouseMoveCount>500){
        mouseMoveCount=500;
      }

      this.realMouseP.copy(p);


      clearTimeout(mouseMoveStateTimer);
      mouseMoveStateTimer=setTimeout(function(){
        mouseMoveState=false;

        mouseMoveCount=0;
      },2300);
    }

    var updateCount=0;
    var updateInterval=10;
    var stopInterval=100;
    var defaultPointRadiuseRotateSpeed=pointRadiuseRotateSpeed;
    var defaultRotateRadiuseRotateSpeed=rotateRadiuseRotateSpeed;



    this.update=function(){
      if(!this.realMouseP){
        return;
      }

      if(mouseMoveState){
        var difP=GL_CORE2.mouseP.clone().sub(this.realMouseP).multiplyScalar(Math.pow(0.005*mouseMoveCount,2));
        GL_CORE2.mouseP.copy(this.realMouseP);
        return;
      }

      updateCount+=1;


      if(updateCount%stopInterval==0){
        stopInterval= Math.floor((0.5+Math.random())*100);
      }



      if(updateCount%updateInterval==0){
        updateInterval=1;
        pointRadiuseRotateSpeed=0.5*(1+Math.random())*defaultPointRadiuseRotateSpeed;

        rotateRadiuseRotateSpeed=0.5*(1+Math.random())*defaultRotateRadiuseRotateSpeed;

        pointRadiuseRotation+=pointRadiuseRotateSpeed;
        rotateRadiuseRotation+=rotateRadiuseRotateSpeed;
        radiuseLengthRotation+=radiuseLengthRotateSpeed;
        radiuseLengthRatio=utils.getYoyoRatio(Math.sin(radiuseLengthRotation));


        var rotateRadiuseX=rotateRadiuse*radiuseLengthRatio*Math.cos(rotateRadiuseRotation);
        var rotateRadiuseY=rotateRadiuse*radiuseLengthRatio*Math.sin(rotateRadiuseRotation);


        var pX=this.aspect*pointRadiuse*(1+0.7*Math.cos(pointRadiuseRotation));
        var pY=pointRadiuse*(1+0.7*Math.sin(pointRadiuseRotation));



        this.realMouseP.set(pX+rotateRadiuseX,pY+rotateRadiuseY);



        var nearUpdateCount=updateCount;
        if(nearUpdateCount>500){
          nearUpdateCount=500;
        }

        var difP=GL_CORE2.mouseP.clone().sub(this.realMouseP).multiplyScalar(Math.pow(0.005*nearUpdateCount,2));
        GL_CORE2.mouseP.sub(difP);

        resetP.x=pX+rotateRadiuseX;
        resetP.y=pY+rotateRadiuseY;

        if(!mouseMoveState){
          targetCenterRatio.copy(PLANE.targetCenterRatio);
          var targetCenter=PLANE.centerPoint.clone();
          targetCenter.x+=MAIN.canvasW*targetCenterRatio.x;
          targetCenter.y+=MAIN.canvasH*targetCenterRatio.y;


          var difCenter=targetCenter.clone().sub(PLANE.realMouseP);

          PLANE.realMouseP.add(difCenter.multiplyScalar(0.02));
        }
        GL_CORE2.mouseP.copy(resetP);
      }
    }
  }

}
