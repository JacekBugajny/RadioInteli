
function NebuJS_initAudioEmoSlider(ImageFolderPath, divIdent, targetTextField, mp3file, oggfile, m4afile, RecordInterval, allowPause, PlayCaption, PauseCaption ){



	RecordInterval = (RecordInterval) ? (RecordInterval) : 250;
	allowPause = (allowPause) ? true: false;
	PlayCaption = (PlayCaption)? PlayCaption : "Play";
	PauseCaption = (PauseCaption)? PauseCaption : "Pause";


	var theSlider ='<div id="'+divIdent+'_slider" style="width:400px;margin:10px;"></div>';
	var thePlayer = '<div id="jquery_jplayer_1" class="jp-jplayer"></div><div id="jp_container_1" class="jp-audio">  				 		  <div class="jp-type-single">         <p class="desc">rmf fm morning program users test</p><p class="help"><a href="http://www.nebu.com" target="_blank">www.nebu.com</a></p><div class="qm"></div>           <div class="jp-gui jp-interface">       <ul class="jp-controls">          <li><a href="javascript:;" class="jp-play" tabindex="1" onclick="NebuJS_ClickedPlay();">play</a></li>          <li><a href="javascript:;" class="jp-pause" tabindex="1" onclick="NebuJS_ClickedPause();">pause</a></li>          <li><a href="javascript:;" class="jp-stop" tabindex="1" onclick="NebuJS_ClickedStop();">stop</a></li>          <li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>          <li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>          <li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>        </ul>            <div class="jp-progress">                      <div class="jp-play-bar"></div>                  </div>         	   <div class="jp-volume-bar">          <div class="jp-volume-bar-value"></div>        </div>	<div class="jp-time-holder">   <div class="jp-current-time"></div>     <div class="jp-duration"></div>        </div>     </div> <div class="slider-container"><div id="'+divIdent+'_slider" style="width:400px;margin:15px;"><div class="reminder"></div></div><p class="rate-desc-left">Uninteresting</p><p class="rate-desc-right">Interesting</p></div>    <div class="jp-no-solution">        <span>Update Required</span>        To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.      </div>    </div>  </div>';
	

	$("#"+divIdent).append(thePlayer+theSlider);

	$("#"+divIdent+"_slider").slider({
		change: function() {
			var value = $("#"+divIdent+"_slider").slider("option","value");
			$("#"+divIdent+"_slider").find(".ui-slider-handle").text(value);
		},
		slide: function() {
			var value = $("#"+divIdent+"_slider").slider("option","value");
			$("#"+divIdent+"_slider").find(".ui-slider-handle").text(value);
		},
		animate:true
	});


	$("#"+divIdent+"_slider").slider({disabled:false});

	doRecord = function (){

		 if (Running){
			 var value = $("#"+divIdent+"_slider").slider("option","value");
			 document.forms[0][targetTextField].value += value +",";
		 }


	};

	IntervalId = setInterval(function(){doRecord();},RecordInterval);




	NebuJS_ClickedPlay =function(){
		if (Ended) document.forms[0][targetTextField].value="";
		$("#"+divIdent+"_slider").slider({disabled:false});
		Running = true;
		Ended= false;
	};

	NebuJS_ClickedPause = function(){
		$("#"+divIdent+"_slider").slider({disabled:true});
		Running=false;
	};

	NebuJS_ClickedStop = function(){
		$("#"+divIdent+"_slider").slider({disabled:true});
		Running=false;
		Ended= true;
	}

	NebuJS_FileEnded = function(e) {
		$("#"+divIdent+"_slider").slider({disabled:true});
		Running=false;
		Ended=true;
document.forms[0][targetTextField].value += "End";
myDrawFunction();
prohibitNext();
	}

	 $("#jquery_jplayer_1").jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", {
mp3: mp3file,
			m4a: m4afile,
			oga: oggfile

          });
        },
		swfPath: ImageFolderPath,
		solution: "html,flash",
        supplied: "mp3,oga,m4a"
      },
	  {errorAlerts: true, warningAlerts:false});
	$("#jquery_jplayer_1").bind($.jPlayer.event.ended,NebuJS_FileEnded);



}



//Graph code:

function myDrawFunction()
{
  DrawCoordinateSystem(QuestionName);

	if (document.forms[0][QuestionName].value.split(",")[document.forms[0][QuestionName].value.split(",").length-1] == "End"){

                      DrawGraph(QuestionName);}
}

function DrawCoordinateSystem(targetDIV){
 jg.clear();
  jg.setColor("#ccc");
   jg.drawLine(10,50,300,50);
   jg.setColor("#000000");
   jg.drawLine(10,100,310,100);
   jg.drawLine(20,10,20,110);

   jg.paint();


}

function DrawGraph(NameOfData){

   theResults = document.forms[0][NameOfData].value;

   theResArray = theResults.split(",");

   jg.setColor("#e21736");

   jg.drawLine(20,100,Math.round(300/theResArray.length+20),Math.round( 100 - (90/100*theResArray[0])));

   var lastX= Math.round(300/theResArray.length+20);
   var lastY= Math.round(100 - (90/100*theResArray[0]));

   for (var i=1; i< theResArray.length-1; i++){

	 jg.drawLine(lastX, lastY,Math.round(300/theResArray.length*i+20),Math.round( 100 - (90/100*theResArray[i])));
	 lastX = Math.round(300/theResArray.length*(i+1)+20);
	 lastY = Math.round(100 - (90/100*theResArray[i]));
   }
	jg.paint();


}
var jg = new jsGraphics("myCanvas");





//JPLayer code

function prohibitNext(){

if (document.forms[0][QuestionName].value.split(",")[document.forms[0][QuestionName].value.split(",").length-1] != "End"){

	$("#btnNext").hide();

}
else
	$("#btnNext").show();
};

$(document).ready(function(){
	console.log($('.reminder'));
	$('#MyRadioEmoSlider_slider').click(function(){
		alert('asdf');
		$('.reminder').addClass('hidden');
	});
});




// setTimeout(function() {
//       var selection = $( ".selector" ).slider( "value" );
// }, 3000);
