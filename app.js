const WEEKLY_HOURS=40;

const PAY={
met:{PC:{1:31646,2:32472,3:33789,4:35106,5:37737,6:43038,7:50256},PS:{2:53568,3:54660,4:56208}},
other:{PC:{1:31646,2:32472,3:33789,4:35106,5:37737,6:43038,7:50256},PS:{2:53568,3:54660,4:56208}}
};

const screenCalc=screen-calc;
const screenLog=screen-log;
const screenSettings=screen-settings;

function switchScreen(s){
screenCalc.style.display=s==='calc'?'block':'none';
screenLog.style.display=s==='log'?'block':'none';
screenSettings.style.display=s==='settings'?'block':'none';
tabCalc.classList.toggle('active',s==='calc');
tabLog.classList.toggle('active',s==='log');
tabSettings.classList.toggle('active',s==='settings');
}

tabCalc.onclick=()=>switchScreen('calc');
tabLog.onclick=()=>switchScreen('log');
tabSettings.onclick=()=>switchScreen('settings');

function loadRanks(){
rank.innerHTML='';
Object.keys(PAY[force.value]).forEach(r=>rank.add(new Option(r,r)));
loadPoints();
}

function loadPoints(){
point.innerHTML='';
Object.keys(PAY[force.value][rank.value]).forEach(p=>point.add(new Option(p,p)));
calculate();
}

function calculate(){
if(startTime.value&&finishTime.value){
const [sh,sm]=startTime.value.split(':').map(Number);
const [fh,fm]=finishTime.value.split(':').map(Number);
let diff=(fh+fm/60)-(sh+sm/60); if(diff<0) diff+=24;
hours.value=diff.toFixed(2);
}
const annual=PAY[force.value][rank.value][point.value];
if(!annual) return;
const base=annual/52/WEEKLY_HOURS;
const ot=base*Number(otType.value);
const hrs=Number(hours.value)||0;
const gross=ot*hrs;
const higher=annual>50270;
const ded=gross*((higher?.42:.28));
const net=gross-ded;
base.textContent=base.toFixed(2);
otEl.textContent=ot.toFixed(2);
grossEl.textContent=gross.toFixed(2);
dedEl.textContent=ded.toFixed(2);
netEl.textContent=net.toFixed(2);
return {hrs,gross,net};
}

save.onclick=()=>{
const c=calculate();
if(!c) return;
const entry={date:date.value,hours:c.hrs,net:c.net,rank:rank.value,point:point.value,warrant:warrant.value};
storeAdd(entry);
renderLog();
};

function renderLog(){
log.innerHTML='';
storeGet().forEach(e=>{
log.innerHTML+=`<div class="entry">${e.date} • ${e.rank} PP${e.point} • ${e.hours}h • £${e.net.toFixed(2)}</div>`;
});
}

force.onchange=loadRanks;
rank.onchange=loadPoints;
startTime.onchange=calculate;
finishTime.onchange=calculate;
otType.onchange=calculate;

date.valueAsDate=new Date();
loadRanks();
renderLog();
