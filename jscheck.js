javascript:(function(){
src=document.getElementsByTagName('html')[0].innerHTML;
var matchword='';
var sources = ['document.URL','document.documentURI','document.URLUnencoded','document.baseURI','document.cookie','document.referrer','location','location.href','location.search','location.replace','location.assign','location.hash','location.pathname','localStorage.getItem','sessionStorage.getItem','sessionStorage.key','responseText','data','value','name','window.name','websockets.onMessage'];
var sinks=['eval','function','setTimeout','setInterval','execScript','.generateCRFMRequest','.src','.text','.textContent','.innerText','.onEventName','document.write','document.writeln','.innerHTML','outerHTML','.createContextualFragment','.value','location','location.href','location.pathname','location.search','location.protocol','location.hostname','location.assign','location.replace','addEventListener','appendChild','window.open','postMessage'];
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
alert(matchword);
remotescripts='[remotescripts:]'+'\n'+'curl';
localscripts='[localscripts:]'+'\n';
var snodes = document.getElementsByTagName("script");
for (var i=0; i < snodes.length; i++) {
	var remotesrc = snodes[i].src;
	var localsrc = snodes[i].textContent;
	if (remotesrc!==""){
		var splitsrc = remotesrc.split("/");
		remotescripts=remotescripts+' -o "'+splitsrc[splitsrc.length-1]+'.js" "'+remotesrc+'"';
	}
	if (localsrc!==""){
		localscripts=localscripts+'<script>'+localsrc+'<\/script>\n';
	}
}
console.log(remotescripts);
console.log(localscripts);
})();