img="";
objects=[];
status= "";

 function setup()
 {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    
 }
 function modelLoaded()
 {
     console.log("Model Loaded!")
     status = true;
 }
 function start()
 {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    textw = document.getElementById("textw").value;
}
 
 
 function gotResult (error, results)
 {
     if (error)
     {
         console.log(error);
     }
     console.log(results);
     objects= results;
 }
 
 function draw()
 {
     image(video, 0, 0, 380, 380);
     if (status !="")
     {
         r = random(255);
         g= random(255);
         b = random(255);
         
         objectDetector.detect(video, gotResult);
         for ( i = 0; i < objects.length; i++)
         {
            document.getElementById("status").innerHTML = "Status = object detected";

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            
            if(objects[i].label == textw)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectname").innerHTML = textw + " Found!"
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(textw+ "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectname").innerHTML = textw + " Not Found!"
            }
        
        }
     }
 }

