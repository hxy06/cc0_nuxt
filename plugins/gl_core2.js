/**
 * Created by huangxiaoyan on 2018/11/28.
 */
var GL_CORE2={};
GL_CORE2.count=0;

GL_CORE2.makeCanvas;
GL_CORE2.renderCount=0;
GL_CORE2.swapCount=0;
GL_CORE2.mouseP=new THREE.Vector2();


function GlCore2(){
  this.prototype={};

  this.init=function(){
    initFunc();
  }


  function initFunc(){
    function t(i){
      if(n[i]){
        return n[i].exports;
      }
      var r=n[i]={i:i,l:!1,exports:{}};

      if(i==33){
        GL_CORE2.makeCanvas();
        return {};
      }else{
        f_array[i].call(r.exports,r,r.exports,t);
        r.l=true;
        return r.exports;
      }
    }

    var n={};

    t.m=f_array;
    t.c=n;

    t.d=function(f_array,n,i){

      t.o(f_array,n)||Object.defineProperty(f_array,n,{configurable:!1,enumerable:!0,get:i})
    };

    t.n=function(f_array){
      var n=f_array&&f_array.__esModule?function(){return f_array.default}:function(){return f_array};
      return t.d(n,"a",n),n
    }

    t.o=function(f_array,t){
      return Object.prototype.hasOwnProperty.call(f_array,t)};
    t.p="";

    var r=n[9]={i:9,l:false,exports:{}};
    f_array[10].call(r.exports,r,r.exports,t);

  }



  /////////////////////////////////////////////


  /////////////////////////////////////////////


  var f_array=[
    function(e,t){},

    function(e,t,n){
      e.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},

    function(e,t,n){
      "use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},

    function(e,t,n){"use strict";
      t.__esModule=!0;
      var i=n(12),
        r=function(e){return e&&e.__esModule?e:{default:e}}(i);
      t.default=function(){
        function e(e,t){for(var n=0;n<t.length;n++){
          var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,r.default)(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()},

    function(e,t){
      e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},

    function(e,t){
      var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},

    function(e,t){
      var n=e.exports={version:"2.5.4"};"number"==typeof __e&&(__e=n)},

    function(e,t,n){
      var i=n(19),r=n(20),o=n(22),a=Object.defineProperty;

      t.f=GL_CORE2.vertexShaders[2]?Object.defineProperty:function(e,t,n){
        if(i(e),t=o(t,!0),i(n),r)try{return a(e,t,n)}catch(e){}
        if("get"in n||"set"in n)throw TypeError("Accessors not supported!");

        return"value"in n&&(e[t]=n.value),e}

    },

    function(e,t){
      e.exports=function(e){try{return!!e()}catch(e){return!0}}},

    function(e,t,n){},

    function(e,t,n){
      GL_CORE2.makeCanvas=function(){
        new r.a();
      }
      var i,r=n(11),o=n(33);
    },

    function(e,t,n){"use strict";
      var i=n(2),r=n.n(i),o=n(3),a=n.n(o),s=n(25);window.glitch=window.glitch||{},
        t.a=function(){
          function e(){

            r()(this,e),
              this.resize=this.resize.bind(this),
              this.mouseMove=this.mouseMove.bind(this),
              this.touchMove=this.touchMove.bind(this),
              this.update=this.update.bind(this),
              this.initWebGL(),
              this.animationId=null,
              //this.startTime=(new Date).getTime(),
              this.startTime=0,
              this.update()
          }


          return a()(e,[{key:"initWebGL",value:function(){

              this.container=$("#three_area")[0];

              this.renderer=BALL.renderer;
              this.scene=BALL.scene;
              this.scene.name="BALL.scene";
              this.camera=BALL.camera;
              this.camera.name="BALL.camera";

              this.fluid=new s.a(this.devicePixelRatio,this.renderer,this.camera);

              this.isMousePosInited=!1;
              this.beforePointerPos=new THREE.Vector2;
              this.pointerX=null;
              this.pointerY=null;

              GL_CORE2.resizeHl=this.resize;

            }

          },
            {key:"resize",value:function(w,h){
                arguments.length>0&&void 0!==arguments[0]&&arguments[0];

                this.width=w;
                this.height=h;

                this.renderer.setSize(this.width,this.height),
                  this.camera.top=.5*this.height,
                  this.camera.bottom=.5*-this.height,
                  this.camera.left=.5*-this.width,this.camera.right=.5*this.width;
                this.camera.updateProjectionMatrix();
                this.fluid.resize(this.width,this.height);
              }},
            {key:"updatePointerPos",value:function(e,t){}},
            {key:"mouseMove",value:function(){}},
            {key:"touchMove",value:function(){}},
            {key:"update",value:function(){
                var e,t;

                //updateの外部化
                GL_CORE2.shaderUpdate=this.update;
                t=GL_CORE2.pastTime;

                e=new THREE.Vector2;

                if(this.isMousePosInited){

                  e.set(GL_CORE2.mouseP.x,GL_CORE2.mouseP.y)
                }else{
                  this.isMousePosInited=!0;
                  e=this.beforePointerPos;
                }

                this.fluid.update(t,e,this.beforePointerPos);

                this.beforePointerPos=e;
              }}]),e}()
    },

    function(e,t,n){
      e.exports={default:n(13),__esModule:!0}},

    function(e,t,n){
      n(14);
      var i=n(6).Object;
      e.exports=function(e,t,n){
        return i.defineProperty(e,t,n)}},

    function(e,t,n){
      var i=n(15);
      i(i.S+i.F*!GL_CORE2.vertexShaders[0],"Object",{defineProperty:n(7).f})},

    function(e,t,n){
      var i=n(5),r=n(6),o=n(16),a=n(18),s=n(24),u=function(e,t,n){
        var l,f,c,h=e&u.F,d=e&u.G,v=e&u.S,x=e&u.P,p=e&u.B,m=e&u.W,y=d?r:r[t]||(r[t]={}),
          g=y.prototype,_=d?i:v?i[t]:(i[t]||{}).prototype;d&&(n=t);
        for(l in n)(f=!h&&_&&void 0!==_[l])&&s(y,l)||(c=f?_[l]:n[l],y[l]=d&&"function"!=typeof _[l]?n[l]:p&&f?o(c,i):m&&_[l]==c?function(e){
          var t=function(t,n,i){if(this instanceof e){
            switch(arguments.length){
              case 0:return new e;
              case 1:return new e(t);
              case 2:return new e(t,n)
            }
            return new e(t,n,i)}
            return e.apply(this,arguments)};
          return t.prototype=e.prototype,t}(c):x&&"function"==typeof c?o(Function.call,c):c,x&&((y.virtual||(y.virtual={}))[l]=c,e&u.R&&g&&!g[l]&&a(g,l,c)))};
      u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},

    function(e,t,n){
      var i=n(17);
      e.exports=function(e,t,n){
        if(i(e),void 0===t)return e;
        switch(n){
          case 1:return function(n){return e.call(t,n)};
          case 2:return function(n,i){return e.call(t,n,i)};
          case 3:return function(n,i,r){return e.call(t,n,i,r)}}return function(){return e.apply(t,arguments)}}
    },

    function(e,t){
      e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},

    function(e,t,n){
      var i=n(7),r=n(23);e.exports=GL_CORE2.vertexShaders[0]?function(e,t,n){return i.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},

    function(e,t,n){
      var i=n(4);e.exports=function(e){if(!i(e))throw TypeError(e+" is not an object!");return e}},

    function(e,t,n){
      e.exports=!GL_CORE2.vertexShaders[0]&&!n(8)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},

    function(e,t,n){
      var i=n(4),r=n(5).document,o=i(r)&&i(r.createElement);
      e.exports=function(e){return o?r.createElement(e):{}}},

    function(e,t,n){
      var i=n(4);e.exports=function(e,t){if(!i(e))return e;
        var n,r;
        if(t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;
        if("function"==typeof(n=e.valueOf)&&!i(r=n.call(e)))return r;
        if(!t&&"function"==typeof(n=e.toString)&&!i(r=n.call(e)))return r;
        throw TypeError("Can't convert object to primitive value")}

    },

    function(e,t){
      e.exports=function(e,t){
        return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},

    function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){
      return n.call(e,t)}},

    function(e,t,n){
      "use strict";
      var i=n(2),
        r=n.n(i),
        o=n(3),
        a=n.n(o),
        s=n(26);

      t.a=function(){
        function e(t,i,o){

          r()(this,e);
          var a,u;
          this.update=this.update.bind(this),
            this.resize=this.resize.bind(this),
            this.renderer=i,
            //this.texPixelRatio=.4*2.5,
            this.texPixelRatio=.4,
            this.solverIteration=10,
            this.attenuation=1,
            this.alpha=1,
            this.beta=1,
            this.viscosity=.9,//粘度
            this.forceRadius=90*1.5,
            GL_CORE2.forceRadius=this.forceRadius;
          this.forceRadiusRatio,
            this.forceRadiusSpeed=Math.PI*0.001,
            this.forceRadiusRatioRotation=0,
            this.forceCoefficient=1,
            this.autoforceCoefficient=.06,
            this.shaders={};

          //shaders.render
          /////////////////////////////

          this.shaders.render=new THREE.RawShaderMaterial(
            {vertexShader:GL_CORE2.vertexShaders[2],fragmentShader:GL_CORE2.fragmentShaders[0],depthTest:true,depthWrite:true,wireframe:false,
              uniforms:{
                aspect:{type:"f",value:1},
                uvMouseP:{type:"v2",value:new THREE.Vector2()},
                time:{type:"1f",value:0},
                texPixelRatio:{type:"1f",value:this.texPixelRatio},
                dataTex:{type:"t",value:null},
                resolution:{type:"2f",value:null},
                devicePixelRatio:{type:"1f",value:t}
              }});


          GL_CORE2.shaderMatrial1=this.shaders.render;
          this.shaders.render.name="render";

          //shaders.updateDivergence
          /////////////////////////////
          this.shaders.updateDivergence=new THREE.RawShaderMaterial(
            {vertexShader:GL_CORE2.vertexShaders[0],fragmentShader:GL_CORE2.fragmentShaders[1],
              uniforms:{texPixelRatio:{type:"1f",value:this.texPixelRatio},
                resolution:{type:"2f",value:null},
                dataTex:{type:"t",value:null}}});

          GL_CORE2.shaderMatrial2=this.shaders.updateDivergence;

          this.shaders.updateDivergence.name="updateDivergence";



          //shaders.updatePressure
          /////////////////////////////
          this.shaders.updatePressure=new THREE.RawShaderMaterial(
            {vertexShader:GL_CORE2.vertexShaders[0],fragmentShader:GL_CORE2.fragmentShaders[2],
              uniforms:{texPixelRatio:{type:"1f",value:this.texPixelRatio},
                resolution:{type:"2f",value:null},
                dataTex:{type:"t",value:0},
                alpha:{type:"1f",value:this.alpha},
                beta:{type:"1f",value:this.beta}}});

          GL_CORE2.shaderMatrial3=this.shaders.updatePressure;

          this.shaders.updatePressure.name="updatePressure";


          //shaders.updateVelocity
          /////////////////////////////
          this.shaders.updateVelocity=new THREE.RawShaderMaterial(
            {vertexShader:GL_CORE2.vertexShaders[0],fragmentShader:GL_CORE2.fragmentShaders[3],
              uniforms:{time:{type:"1f",value:0},
                texPixelRatio:{type:"1f",value:this.texPixelRatio},
                viscosity:{type:"1f",value:this.viscosity},
                forceRadius:{type:"1f",value:this.forceRadius},
                forceCoefficient:{type:"1f",value:this.forceCoefficient},
                autoforceCoefficient:{type:"1f",value:this.autoforceCoefficient},
                resolution:{type:"2f",value:null},dataTex:{type:"t",value:null},
                pointerPos:{type:"2f",value:null},
                beforePointerPos:{type:"2f",value:null}}});

          GL_CORE2.shaderMatrial4=this.shaders.updateVelocity;

          this.shaders.updateVelocity.name="updateVelocity";


          //shaders.advectData
          /////////////////////////////
          this.shaders.advectData=new THREE.RawShaderMaterial(
            {vertexShader:GL_CORE2.vertexShaders[0],fragmentShader:GL_CORE2.fragmentShaders[4],
              uniforms:{
                aspect:{type:"f",value:1},
                uvMouseP:{type:"v2",value:new THREE.Vector2()},
                mouseP:{type:"v2",value:new THREE.Vector2()},
                resolution:{type:"2f",value:null},
                texPixelRatio:{type:"1f",value:this.texPixelRatio},
                dataTex:{type:"t",value:null},
                attenuation:{type:"1f",value:this.attenuation}}});

          GL_CORE2.shaderMatrial5=this.shaders.advectData;

          this.shaders.advectData.name="advectData";



          u=new THREE.RawShaderMaterial({vertexShader:GL_CORE2.vertexShaders[0],fragmentShader:GL_CORE2.fragmentShaders[4],depthTest:true,depthWrite:!1});

          GL_CORE2.shaderMatrial6=u;


          u.name="UU";

          this.dataTexture=new s.a(10,10,this.renderer,o,u,u.clone());



          a=new THREE.PlaneBufferGeometry(100,100),

            this.mesh=new THREE.Mesh(a,this.shaders.render);

          GL_CORE2.mesh=this.mesh;

        }

        return a()(e,[{key:"setParameters",value:function(){
            this.setShaderUniform("updateDivergence","texPixelRatio",this.texPixelRatio),
              this.setShaderUniform("updatePressure","texPixelRatio",this.texPixelRatio),
              this.setShaderUniform("updateVelocity","texPixelRatio",this.texPixelRatio),
              this.setShaderUniform("advectData","texPixelRatio",this.texPixelRatio),
              this.setShaderUniform("advectData","attenuation",this.attenuation),

              this.setShaderUniform("updatePressure","alpha",this.alpha),

              this.setShaderUniform("updatePressure","beta",this.beta),
              this.setShaderUniform("updateVelocity","viscosity",this.viscosity),
              this.setShaderUniform("updateVelocity","forceRadius",this.forceRadius),
              this.setShaderUniform("updateVelocity","forceCoefficient",this.forceCoefficient),
              this.setShaderUniform("updateVelocity","autoforceCoefficient",this.autoforceCoefficient)}},

          {key:"updateData",value:function(e){
              this.setShaderUniform(e,"dataTex",this.dataTexture.getTexture());
              this.dataTexture.swapTexture();
              this.dataTexture.setMeshMaterial(this.shaders[e]);

              try{        this.renderer.render(this.dataTexture.scene,this.dataTexture.camera,this.dataTexture.getRenderTarget());
              }catch(e){

              }

            }
          },
          {key:"setShaderUniform",value:function(e,t,n){
              this.shaders[e].uniforms[t].value=n}},
          {key:"update",value:function(e,t,n){

              ///////////////////////////
              //
              //      UPDATE
              //
              ///////////////////////////

              var i,r;
              GL_CORE2.renderCount+=1;

              GL_CORE2.swapCount=0;

              GL_CORE2.shaderMatrial1.uniforms.uvMouseP.value=PLANE.uvMouseP;
              GL_CORE2.shaderMatrial1.uniforms.aspect.value=GL_CORE2.aspect;
              GL_CORE2.shaderMatrial5.uniforms.mouseP.value=GL_CORE2.mouseP;
              GL_CORE2.shaderMatrial5.uniforms.uvMouseP.value=PLANE.uvMouseP;

              GL_CORE2.shaderMatrial5.uniforms.aspect.value=GL_CORE2.aspect;


              this.forceRadiusRatioRotation+=this.forceRadiusSpeed;
              this.forceRadiusRatio=0.5+0.5*(1+Math.cos(this.forceRadiusRatioRotation));

              for(this.updateData("updateDivergence"),i=0,r=this.solverIteration;0<=r?i<r:i>r;0<=r?++i:--i)this.updateData("updatePressure");
              this.setShaderUniform("updateVelocity","time",e),
                this.setShaderUniform("updateVelocity","pointerPos",t),
                this.setShaderUniform("updateVelocity","beforePointerPos",n),
                this.setShaderUniform("updateVelocity","forceRadius",this.forceRadius),
                this.updateData("updateVelocity"),this.updateData("advectData"),
                this.setShaderUniform("render","time",e),
                this.setShaderUniform("render","dataTex",this.dataTexture.getTexture())}},
          {key:"resize",value:function(e,t){
              var n,i;
              i=this.shaders;
              for(n in i)i[n],
                this.setShaderUniform(n,"resolution",new THREE.Vector2(e,t));
              this.dataTexture.resize(Math.round(e*this.texPixelRatio),Math.round(t*this.texPixelRatio))
            }}]),e}()},


    function(e,t,n){
      "use strict";

      var i=n(2),
        r=n.n(i),
        o=n(3),
        a=n.n(o);

      t.a=function(){

        function e(t,n,i,o,a,s){

          r()(this,e);
          var u;
          this.renderer=i,
            this.camera=o,
            this.initShaderMaterial=a,
            this.updateShaderMaterial=s,
            this.currentTextureIndex=0;

          //make RenderTarget
          this.renderTargets=[new THREE.WebGLRenderTarget(t,n,{magFilter:THREE.NearestFilter,minFilter:THREE.NearestFilter,wrapS:THREE.ClampToEdgeWrapping,wrapT:THREE.ClampToEdgeWrapping,format:THREE.RGBAFormat,type:/(iPad|iPhone|iPod)/g.test(navigator.userAgent)?THREE.HalfFloatType:THREE.FloatType,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1,shareDepthFrom:null})];


          //make Clone;
          this.renderTargets[1]=this.renderTargets[0].clone();

          GL_CORE2.renderTarget1=this.renderTargets[0];
          GL_CORE2.renderTarget2=this.renderTargets[1];

          u=new THREE.PlaneGeometry(5,5);
          this.mesh=new THREE.Mesh(u,this.initShaderMaterial);
          this.scene=new THREE.Scene;
          this.scene.name="renderTargetScene";
          //set 26
          this.scene.add(this.mesh);

          this.initShaderMaterial.dispose(),
            this.initShaderMaterial=null,
            this.mesh.material=this.updateShaderMaterial,
            this.renderTargets[0].texture.flipY=!1,
            this.renderTargets[1].texture.flipY=!1;
        }


        return a()(
          e,[

            {key:"setMeshMaterial",value:function(e){
                GL_CORE2.swapCount+=1;

                this.mesh.material=e,this.mesh.material.needsUpdate=!0;
              }},

            {key:"swapTexture",value:function(){

                this.currentTextureIndex=(this.currentTextureIndex+1)%2
              }},

            {key:"getTexture",value:function(){
                return this.getRenderTarget().texture
              }},

            {key:"getRenderTarget",value:function(){

                return this.renderTargets[this.currentTextureIndex]
              }},
            {key:"resize",value:function(e,t){
                this.renderTargets[0].setSize(e,t),
                  this.renderTargets[1].setSize(e,t)
              }
            }]),
          e
      }()},

    function(e,t){

    },

    function(e,t){

    },

    function(e,t){

    },

    function(e,t){

    },

    function(e,t){

    },

    function(e,t){

    },

    function(e,t,n){

    }]

}
