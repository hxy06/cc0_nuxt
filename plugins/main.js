/**
 * Created by huangxiaoyan on 2018/11/28.
 */
var MAIN={};
MAIN.burgerShow;


(function(MAIN){
  //top main.js

  MAIN.winW,MAIN.winH;
  var win;
  var threeBase;
  var shaderPlan,planeObject;
  var vertexshader,fragmentshader;
  var bergerInner,bergerNavie,bergerBtn;
  var bergerInnerMinH;
  var scrollEnabled;

  var mainLogo;
  var mainLogoStops;


  MAIN.shaderPlane;

  $(function(){
    utils.init();
    //utils.setTraceBox();
    win=$(window);


    threeBase=new ThreeBase();

    shaderPlane=new ShaderPlane();
    MAIN.shaderPlane=shaderPlane;

    shaderPlane.addInitFunc(initFunc);

    var location=String(window.location.href).replace(/http:\/\/|https:\/\//,"").split("/");

    var referrer=String(document.referrer).replace(/http:\/\/|https:\/\//,"").split("/");

    var domein=location[0];

    var currentLocation=String(window.location.href).replace(/http:\/\/|https:\/\//,"").replace(location[0],"");

    //window.addEventListener("touchstart",touchHl,{passive: false});
    window.addEventListener("touchmove",touchHl,{passive: false});

    if(location[1]=="service"){
      var reg=/it|entertainment|ses|product/;
      if(reg.test(location[2])){
        MAIN.stopServiceColor();
      }
    }

    mainLogo=$("#logo_svg");
    mainLogoStops=$("stop",mainLogo);

    mainLogoStops.each(function(id){

      $(this).data("id",id);
    });

    setTimeout(logoShow,800);

    function openClose(){
      if(bergerBtnEnabled){return;}
      bergerBtnEnabled=true;
      setTimeout(function(){
        bergerBtnEnabled=false;
      },1500)

      if(bergerInner.hasClass("show")){
        bergerInner.removeClass("show");
        bergerBtn.removeClass("close");
        $("body").removeClass("noscroll");

      }else{
        bergerInner.addClass("show");
        bergerBtn.addClass("close");
        $("body").addClass("noscroll");

      }
    }

    function initFunc(){
      //shaderPlaneでシェーダーを読み込んだ後に初期化
      threeBase.addResizeHl(MAIN.resizeHl);
      threeBase.addUpdateHl(MAIN.update);
      threeBase.addMouseMoveHl(MAIN.mouseMoveHl);

      setTimeout(function(){
        planeObject=shaderPlane.getShaderObject();
      },100);

      planeObject=shaderPlane.getShaderObject();


      showLogo();


      //レンダリングスタート
      //threeBase.init();

      $("nav.category_change .b2").bind("click",function(){
        shaderPlane.stopColorShift();
      });

      $("nav.category_change .b1").bind("click",function(){
        shaderPlane.startColorShift();
      });

      if(referrer[0]==location[0]){
        //同一ドメインからのリンク
        $("#over_lay").addClass("open");
      }else{
        //他ドメインからのリンク
        $("#over_lay").addClass("hide");
        setTimeout(function(){
          $("#over_lay").addClass("notransition open");
          setTimeout(function(){
            $("#over_lay").removeClass("notransition hide");
          },10)
        },1000)
      }

      $("a").bind("click",function(){
        var targetURL=$(this).attr("href");
        if(targetURL==currentLocation){
          openClose();
          return false;
        }

        if(new RegExp("^mailto").test(targetURL)){
          //メール送信
        }else{


          if(!$("#over_lay").hasClass("close")){

            if(new RegExp("^"+location[0]).test(targetURL) || new RegExp("^/").test(targetURL)){
              //console.log("同一ドメインへのリンク");

              $("#over_lay").addClass("close");
              setTimeout(function(){
                utils.jump(targetURL,"_self");
              },1000);
            }else{

              utils.jump(targetURL,"_blank");
            };



          }

          return false;
        }
      });



    }


    window.addEventListener("touchmove",function(event){
      //メニューが出ている間はスクロールしない
      if($("body").hasClass("noscroll")){
        var touchState;
        $("header .inner *").each(function(e){
          if(event.target === this){
            touchState=true;
            return;
          }
        });
        if(!touchState){
          event.preventDefault();
        }
      }

    },{ passive: false })


    //バーガーメニューの開閉
    bergerInner=$("header .inner");
    bergerNavie=$("nav",bergerInner);
    bergerBtn=$("header .barger_btn");

    var bergerBtnEnabled;

    bergerBtn.bind("click",function(){

      openClose();

    })

    bergerBtn.bind("mouseenter",function(){
      setTimeout(function(){
        bergerBtn.addClass("no_blink");
      },200)
    })

    bergerBtn.bind("mouseleave",function(){
      bergerBtn.removeClass("no_blink")
    });


    function showLogo(){
      $("#top_content .main_logo").addClass("show");
      return;

      var alphabet=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

      var changeCount;
      var lastChangeCount=4;
      var interval=4;
      var mainLogo=$("#top_content h1 .main_logo");
      var mainLogoText=mainLogo.text().trim();
      var h1length=mainLogoText.length;
      mainLogo.text("");

      var rollingTextsSet=[];

      for(var n=0;n<h1length;n++){
        var rollingTexts=[];
        var rollingTextsNums=[];
        var subNum=Math.floor((interval-2)*Math.pow(1-(n/h1length),2));

        var intrevalsNum=(interval-subNum)*(h1length-n);
        for(var m=0;m<intrevalsNum;m++){
          rollingTextsNums.push(m%alphabet.length);
        }
        rollingTextsNums=utils.makeRandomArray(rollingTextsNums);

        for(var m=0;m<intrevalsNum;m++){
          if(m==intrevalsNum-1){
            rollingTexts.push(mainLogoText.charAt(n));
          }else{
            rollingTexts.push(alphabet[rollingTextsNums[m]]);
          }
        }
        var rollingTextObj=new RollingText(n,rollingTexts,intrevalsNum);

        rollingTextsSet.push(rollingTextObj);
      }

      var textCount=0;
      var rollTextCount=0;


      $("#top_content .main_logo").addClass("show");
      rollText();

      function rollText(){
        var targetText="";
        var completeNum=0;
        rollTextCount+=1;
        if(rollTextCount%interval==0){
          textCount+=1;
        }
        for(var n=0;n<textCount;n++){
          targetTextObj=rollingTextsSet[n];
          targetText+=targetTextObj.update();
          if(targetTextObj.complete){
            completeNum+=1;
          }
        }

        mainLogo.text(targetText);
        if(completeNum<h1length){
          setTimeout(rollText,20);
        }else{


          setTimeout(function(){

            $("#top_content .center_area").addClass("show");

            $("#top_content nav.top_menu").addClass("show");

            threeBase.init();
            $("#three_area").addClass("show");
            win.bind("scroll",MAIN.scrollHl);
            scrollEnabled=true;
          },50);
        }
      }


      function RollingText(id,texts,maxNum){
        this.prototype={};
        this.complete=false;
        this.textCount=0;


        this.update=function(){
          var currentCount=this.textCount;
          if(!this.complete){

            if(this.textCount>=maxNum-1){
              this.complete=true;
            }else{
              this.textCount+=1;
            }
          }


          return texts[currentCount];
        }

      }
    }

  });

  MAIN.mouseMoveHl=function(p){
    shaderPlane.mouseMoveHl(p);
  }

  MAIN.resizeHl=function(winW,winH,canvasW,canvasH){

    if(win){
      MAIN.winW=winW;
      MAIN.winH=winH;
      MAIN.canvasW=canvasW;
      MAIN.canvasH=canvasH;


      if(shaderPlane){
        shaderPlane.resizeHl(canvasW,canvasH);
      }
    }


    if(bergerNavie){

      bergerInnerMinH=$(">ul",bergerNavie).height()*1.2;

      if($("header").height()>bergerInnerMinH){
        bergerNavie.innerHeight($("header").height());
      }else{
        bergerNavie.height(bergerInnerMinH);
      }

    }
  }

  MAIN.mouseWheelHl=function(e){

  }

  MAIN.scrollHl=function(){

  }

  var changeColors;
  var changeColorState;
  var changeColorCount=0;
  var changeColorCountMax=50;
  var targetHSL,nextHSL,currentHSL,difHSL;
  var targetRgb,difRgb;
  var targetColor=new THREE.Color();


  function ChangeColor(){
    GL_CORE.targetColor=changeColors.next; GL_CORE.shaderMatrial1.uniforms.targetColor.value=GL_CORE.targetColor;
  }

  function updateChangeColor(){

    var ratio=changeColorCount/changeColorCountMax;
    if(ratio>=1){
      changeColorState=false;
    }
    targetHSL={
      h:currentHSL.h+difHSL.h*ratio,
      s:currentHSL.s+difHSL.s*ratio,
      l:currentHSL.l+difHSL.l*ratio
    }
    targetColor.setHSL(targetHSL.h,targetHSL.s,targetHSL.l);

    GL_CORE.targetColor=targetColor;
    GL_CORE.shaderMatrial1.uniforms.targetColor.value=GL_CORE.targetColor;

    changeColorCount+=1;
  }

  function touchHl(e){
    if($("body").hasClass("noscroll")){
      if(window.orientation==90 || window.orientation==-90){
        return;
      }
      if($("header .inner nav").height()<screen.height){
        if(utils.android){
          if(e.target.tagName=="A" || $(e.target).closest(".close").length>0){
          }else{
            e.preventDefault();
          }
        }else{
          e.preventDefault();
        }
      }
    }
  }

  MAIN.update=function(){
    shaderPlane.update();

    if(changeColorState){
      updateChangeColor()
    }

  }

  MAIN.changeServiceColor=function(_changeColors){
    if(MAIN.shaderPlane){
      MAIN.shaderPlane.stopColorShift();
      changeColorState=true;
      changeColorCount=0;
      changeColors=_changeColors;
      currentHSL=changeColors.current.getHSL();
      nextHSL=changeColors.next.getHSL();
      difHSL={
        h:nextHSL.h-currentHSL.h,
        s:nextHSL.s-currentHSL.s,
        l:nextHSL.l-currentHSL.l
      }
      if(Math.abs(difHSL.h)>0.5){
        difHSL.h=(difHSL.h>0)?(-1+difHSL.h):(1+difHSL.h);
      }
    }
  }

  MAIN.stopServiceColor=function(){

    if(MAIN.shaderPlane){
      MAIN.shaderPlane.startColorShift();
      changeColors=GL_CORE.setTargetColor("stop");
      changeColorState=true;
      changeColorCount=0;
      currentHSL=targetColor.getHSL();
      nextHSL=new THREE.Color(1,1,1).getHSL();
      difHSL={
        h:nextHSL.h-currentHSL.h,
        s:nextHSL.s-currentHSL.s,
        l:nextHSL.l-currentHSL.l
      }

    }
  }

  var logoShowEnd;
  var logoShowCount=0;
  var logoShowCountMax=30;



  function logoShow(){

    //var ratio=Math.pow(logoShowCount/logoShowCountMax,.5);
    var ratio=utils.getYoyoRatio(logoShowCount/logoShowCountMax,.5);
    logoShowCount+=1;
    if(ratio==1){
      logoShowEnd=true;
      setTimeout(function(){

        $("#top_content .center_area").addClass("show");

        $("#top_content nav.top_menu").addClass("show");

        threeBase.init();
        $("#three_area").addClass("show");
      },50);
    }
    mainLogoStops.each(function(id){
      if(id>0 && id<3){
        $(this).attr("offset",ratio);
      }
    })

    if(!logoShowEnd){
      requestAnimationFrame(logoShow);
    }
  }



})(MAIN);
