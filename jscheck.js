javascript:(function(){
src=document.getElementsByTagName('html')[0].innerHTML;
var matchword='';
var sources = ['location.hash','location.href','location.search','location.replace','location.assign','location.pathname','document.documentURI','document.URL','document.referer','window.name'];
var sinks=['document.write','document.writeIn','outerHTML','innerHTML','.src','eval','setTimeout','setInterval','addEventListener','appendChild','window.open','postMessage'];
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
remotescripts='[remotescripts:]'+'\n'+'curl ';
localscripts='[localscripts:]'+'\n';
var snodes = document.getElementsByTagName("script");
for (var i=0; i < snodes.length; i++) {
	var remotesrc = snodes[i].src;
	var localsrc = snodes[i].textContent;
	if (remotesrc!==""){
		remotescripts=remotescripts+'-O '+remotesrc+' ';
	}
	if (localsrc!==""){
		localscripts=localscripts+'<script>'+localsrc+'<\/script>\n';
	}
}
console.log(remotescripts);
console.log(localscripts);
})();