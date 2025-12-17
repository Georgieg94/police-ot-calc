const STORE_KEY='police_ot_entries';

function storeGet(){
return JSON.parse(localStorage.getItem(STORE_KEY)||'[]');
}

function storeAdd(e){
const all=storeGet();
all.push(e);
localStorage.setItem(STORE_KEY,JSON.stringify(all));
}

clearData.onclick=()=>{
if(confirm('Clear all data?')){
localStorage.removeItem(STORE_KEY);
renderLog();
}
};
