


function addText(){

   $('#uploadFile').trigger('click');
   $('#uploadFile').on('change',function(){
         console.log("here");
         var file = document.getElementById('uploadFile').files[0];
         var all   = $.when(file);   
         all.done(function(){
      
         if (file) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
            textProcess(e.target.result);
          };
        }
    });
  });

}

var URL = window.URL || window.webkitURL
var displayMessage = function (message, isError) {
    alert("Can't play this file");
   }

function addVideo(){
  
    $('#uploadVideo').trigger('click');
    $('#uploadVideo').on('change',function(){
      console.log("here");
          var file = this.files[0]
          var type = file.type
          var videoNode = document.getElementById('video')
          var canPlay = videoNode.canPlayType(type)
          if (canPlay === '') canPlay = 'no'
          var message = 'Can play type "' + type + '": ' + canPlay
          var isError = canPlay === 'no'
          //displayMessage(message, isError)

          if (isError) {
            return
          }
          var fileURL = URL.createObjectURL(file)
          videoNode.src = fileURL;
  });   
}

function updateTime(event){
            var showTime=document.getElementById("showTime");
            showTime.innerHTML=event.currentTime;
          };

function drawTimeLine(videoNode){
    var length=videoNode.duration;

    var canvas = document.getElementById('timeCanvas'),
    ctx = canvas.getContext('2d');
    var W = canvas.width;
    var H = canvas.height;
    var x = 3,
        y = 3,
        w = 2,
        h = 40;
    var vx = 0.1;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      x += vx;
      ctx.fillRect(x, y, w, h);
    }setInterval(draw,length);

}

function textProcess(file){
    var parentNode=document.getElementById("contentDiv");
    if(parentNode.hasChildNodes()){
      parentNode.innerHTML="";
    }
    var splited=file.replace(/(\.+|\:|\!|\?|\!|\;|\,)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|"); 
    var i=0;
    for(;i<splited.length;i++){
       
        var childNode=document.createElement("p");
        childNode.innerHTML=splited[i];
        var source;
        childNode.ondblclick=function(){
          this.setAttribute("contenteditable","true");
        };
        childNode.onkeypress=function(){
          if(this.onkeypress.arguments[0].charCode == 13){
            this.setAttribute("contenteditable","false");
          } 
        }
        childNode.onclick=function(){
          this.style.borderColor="blue";
        }
        parentNode.appendChild(childNode);
    }

  
}

function addTextElement(){
        var parentNode=document.getElementById("contentDiv");
        var childNode=document.createElement("p");

        childNode.innerHTML="please input texts";
                var source;
        childNode.ondblclick=function(){
          this.setAttribute("contenteditable","true");
        };
        childNode.onkeypress=function(){
          if(this.onkeypress.arguments[0].charCode == 13){
            this.setAttribute("contenteditable","false");
          } 
        }

        parentNode.appendChild(childNode);
}
