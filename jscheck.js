javascript:(function(){
src=document.getElementsByTagName('html')[0].innerHTML;
var matchword='';
var sources = ['location.hash','location.href','location.search','document.documentURI','document.URL','location.pathname','window.name','document.referer','postMessage'];
var sinks=['document.write','document.writeIn','outerHTML','innerHTML','.src','eval','setTimeout','setInterval','addEventListener'];
var libs=['prettyPhoto','yuga.js','ultimate.min.js','swfobject.js','jScrollPane','wp-include','jquery.flash','jquery.pjax.js','lodash','wp-include'];
matchword='[sources:]'+'\n';
for (var i in sources) {
 if (src.indexOf(sources[i]) !== -1)matchword=matchword+sources[i]+'\n'
}
matchword=matchword+'[sinks:]'+'\n';
for(var i in sinks) {
 if (src.indexOf(sinks[i]) !== -1)matchword=matchword+sinks[i]+'\n'
}
matchword=matchword+'[libs:]'+'\n';
for(var i in libs) {
 if (src.indexOf(libs[i]) !== -1)matchword=matchword+libs[i]+'\n'
}
var myArray;
matchword=matchword+'[links:]'+'\n';
var preregexp = new RegExp("\"(https?://[^ ]+.js?)\"", "g");
var found = src.match(preregexp);
while ((myArray = preregexp.exec(src)) !== null) {
 found=myArray[1];
 matchword=matchword+found+'\n';
}
matchword=matchword+'[links?:]'+'\n';
preregexp = new RegExp("[\"\'](/?[^ ]+\.js?)[\"\']", "ig");
found = src.match(preregexp);
while ((myArray = preregexp.exec(src)) !== null) {
 found=myArray[1];
 matchword=matchword+found+'\n';
}
matchword=matchword+'[scripts?:]'+'\n';
preregexp = new RegExp("<script.+src=\"(.+?)\"","ig");
found = src.match(preregexp);
while ((myArray = preregexp.exec(src)) !== null) {
 found=myArray[1];
 matchword=matchword+found+'\n';
}
alert(matchword);
})();