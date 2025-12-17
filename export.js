exportCal.onclick=()=>{
const entries=storeGet();
if(!entries.length) return alert('No entries');
let ics='BEGIN:VCALENDAR\nVERSION:2.0\n';
entries.forEach(e=>{
const d=new Date(e.date).toISOString().replace(/[-:]/g,'').split('.')[0];
ics+=`BEGIN:VEVENT\nDTSTART:${d}\nSUMMARY:Police OT ${e.hours}h\nEND:VEVENT\n`;
});
ics+='END:VCALENDAR';
const a=document.createElement('a');
a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));
a.download='police-ot.ics';
a.click();
};

exportPdf.onclick=()=>alert('PDF layout coming next drop');
