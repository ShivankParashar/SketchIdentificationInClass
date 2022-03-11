function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(15);
    stroke("yellow");
    
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
        console.log(results);
        document.getElementById("label").innerHTML = "Name is "+results[0].label;
        document.getElementById("confidence").innerHTML = "I am sure about "+Math.round(results[0].confidence*100)+"%";
        speakname = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(speakname);
}