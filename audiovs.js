let canvas=document.getElementById('canvas');
let audioElement=document.getElementById('audio-source');
canvas.width=window.innerWidth
canvas.height="400";
let ctx=canvas.getContext('2d')
let AudioCtx=new AudioContext() || new webkitAudioContext();
let analyser=AudioCtx.createAnalyser();
analyser.fftSize=2048;
let source=AudioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
source.connect(AudioCtx.destination);
let data=new Uint8Array(analyser.frequencyBinCount);
function initVisualiser() {
 requestAnimationFrame(loopFunc);
}
function loopFunc() {
requestAnimationFrame(loopFunc);
 analyser.getByteFrequencyData(data);
 draw(data)
}
function draw(data) {
  data=[...data];
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let space=canvas.width / data.length;
  data.map((value,index)=>{
   ctx.beginPath()
   let angle=Math.random() * space + index
   ctx.moveTo(space+index,canvas.height - value)
   ctx.lineTo(space+index,canvas.height - value);
  ctx.lineCap="round"
   ctx.lineWidth=`${Math.random() * 15 +1}`
   ctx.strokeStyle=`hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
   ctx.strokeWidth="2"
   ctx.stroke();
 
  })
}
audioElement.onplay=()=>{
 initVisualiser()
 AudioCtx.resume()
}