javascript:(function() {
	var properties=[
		'navigator.userAgent',
		'location.protocol',
		'location.host',
		'location.hostname',
		'location.href',
		'location.pathname',
		'location.search',
		'location.hash',
		'location.origin',
		'document.domain',
		'document.cookie',
		'document.referrer',
		'document.URL',
		'window.name',
		'window.history.URL',
		'window.length',
		'window.localStorage',
	];


	var d = document,id = "Properties",parentel = d.getElementById(id);
	if (!parentel) {
		parentel = d.createElement("div");
		d.body.appendChild(parentel);
		parentel.setAttribute("id", id);
		parentel.setAttribute("style","position:fixed;top:10px;right:10px;padding:10px;background:#fff;font:12px/18px monospace;z-index:99999;max-height:100%;overflow:auto;border-radius:8px;border:1px solid #000");
		parentel.style.backgroundColor="#E6E2AF";
		parentel.style.width="350px";
		parentel.style.display="block";
		const parenttitle = document.createElement("h2");
		parenttitle.setAttribute("style","font:14px/18px sans-serif");
		const parenttext = document.createTextNode("Properties");
		parenttitle.appendChild(parenttext);
		parentel.appendChild(parenttitle);
		parentel.addEventListener("click",handler,!1);
	}
	coverel = d.getElementById("cover");
	if(!coverel){
		const coverbox = document.createElement("div");
		const covertext1 = document.createTextNode("Objects");
		coverbox.setAttribute("id", "cover");
		coverbox.setAttribute("style","border:1px solid;background:#FFF;width:305px;margin:2pt;padding:1pt;");
		coverbox.style.backgroundColor="#F3F3F3";
		coverbox.appendChild(covertext1);
		parentel.appendChild(coverbox);

		const switch_close = document.createElement("a");
		const close_text = document.createTextNode("close");
		switch_close.setAttribute("id", "close");
		switch_close.setAttribute("href", "#");
		switch_close.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_close.appendChild(close_text);
		coverbox.appendChild(switch_close);

		for (var i = 0; i < properties.length; i++) {
			var property = document.createElement('div');
			var label = document.createElement('div');
			var br = document.createElement('br');
			var propertyid = "property" + i;
			var labelid = "label" + i;
			property.innerText = properties[i];
			property.setAttribute("style","border:1px solid;background:#FFF;width:300px;margin:1pt;padding:1pt;");
property.style.backgroundColor="#EFECCA";
			label.setAttribute("for", propertyid);
			label.setAttribute("id", labelid);
			label.innerText = eval(properties[i]);
			label.setAttribute("style","border:1px solid;background:#FFF;width:293px;margin:1pt;padding:0pt;");
			coverbox.appendChild(property);
			property.appendChild(br);
			property.appendChild(label);
		}
	}

	function handler(e, t) {
		t=e.target;
		e.preventDefault();
		switch (t.id) {
            case "close":
				parentel.style.display="none";
				d.body.removeChild(parentel);
				break;
		};
	}
})();