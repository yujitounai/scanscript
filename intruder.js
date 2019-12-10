javascript:(function() {
	var urls=[],cnt=0,org_cnt=0,thr=500,wordcnt=10,number_from=0,number_to=10,findurls=[];redirurls=[];
	var passes=[],t1=[],t2=[],myRequests=[];
	var checknum;
	var pre_input;
	var progress_results ,data_input,find_results;
	var secondexts=[
		'',
		];
	var extensions=[
	];
	var org_extlists=[
		['数字',''],
		['英大小文字',''],
		['記号',''],
		['数値','checked'],
	];
	var extlists=JSON.parse(JSON.stringify(org_extlists));
	function makepayload(pos,type){
		var result="";
		var numbers="0123456789";
		var alphabets="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var symbols="\"!#$%&'()*+-;:|=~";
		var word="";
		if (type & 1){
			word=word+numbers;
		}
		if (type & 2){
			word=word+alphabets;
		}
		if (type & 4){
			word=word+symbols;
		}
		if (type & 8){
			return pos;
		}
		if(pos<word.length){
			return word[pos];
		}else{
			return pos;
		}
	}

	var d = document,id = "intruder",parentel = d.getElementById(id);
	var throttle_input;
	var count_input;
	if (!parentel) {
		parentel = d.createElement("div");
		d.body.appendChild(parentel);
		parentel.setAttribute("id", id);
		parentel.setAttribute("style","position:fixed;top:10px;right:10px;padding:10px;background:#fff;font:12px/18px monospace;z-index:99999;max-height:100%;overflow:auto;border-radius:8px;border:1px solid #000");
		parentel.style.backgroundColor="#EFECCA";
		parentel.style.width="350px";
		parentel.style.display="block";
		const parenttitle = document.createElement("h2");
		parenttitle.setAttribute("style","font:14px/18px sans-serif");
		const parenttext = document.createTextNode("intruder");
		parenttitle.appendChild(parenttext);
		parentel.appendChild(parenttitle);
		parentel.addEventListener("click",handler,!1);
	}
	var switchel = document.getElementById("switch");
	if(!switchel){
		const switchbox = document.createElement("div");
		const switchtext1 = document.createTextNode("switch");
		switchbox.setAttribute("id", "switch");
		switchbox.setAttribute("style","border:1px solid;background:#FFF;width:330px;margin:2pt;padding:1pt;");
		switchbox.appendChild(switchtext1);
		parentel.appendChild(switchbox);

		const switch_start = document.createElement("a");
		const start_text = document.createTextNode("start");
		switch_start.setAttribute("id", "start");
		switch_start.setAttribute("href", "#");
		switch_start.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_start.appendChild(start_text);
		switchbox.appendChild(switch_start);

		const switch_stop = document.createElement("a");
		const stop_text = document.createTextNode("stop");
		switch_stop.setAttribute("id", "stop");
		switch_stop.setAttribute("href", "#");
		switch_stop.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_stop.appendChild(stop_text);
		switchbox.appendChild(switch_stop);

		const switch_reset = document.createElement("a");
		const reset_text = document.createTextNode("reset");
		switch_reset.setAttribute("id", "reset");
		switch_reset.setAttribute("href", "#");
		switch_reset.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_reset.appendChild(reset_text);
		switchbox.appendChild(switch_reset);

		const switch_close = document.createElement("a");
		const close_text = document.createTextNode("close");
		switch_close.setAttribute("id", "close");
		switch_close.setAttribute("href", "#");
		switch_close.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_close.appendChild(close_text);
		switchbox.appendChild(switch_close);

		const switch_test = document.createElement("a");
		const test_text = document.createTextNode("test");
		switch_test.setAttribute("id", "test");
		switch_test.setAttribute("href", "#");
		switch_test.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		switch_test.appendChild(test_text);
		switchbox.appendChild(switch_test);
	}

	var configel = document.getElementById("config");
	var extbox;
	if(!configel){
		const configbox = document.createElement("div");
		const configtext1 = document.createTextNode("config");
		configbox.setAttribute("id", "config");
		configbox.setAttribute("style","border:1px solid;background:#FFF;width:330px;margin:2pt;padding:1pt;");
		configbox.appendChild(configtext1);
		parentel.appendChild(configbox);

		const throttle_span = document.createElement("span");
		const throttle_text = document.createTextNode("throttle");
		throttle_span.setAttribute("id", "throttle");
		throttle_span.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		throttle_span.appendChild(throttle_text);
		configbox.appendChild(throttle_span);

		throttle_input = document.createElement("input");
		throttle_input.setAttribute("type","text"); 
		throttle_input.setAttribute("maxlength","5"); 
		throttle_input.setAttribute("size","5");
		throttle_input.setAttribute("name","throttle");  
		throttle_input.setAttribute("value",thr);
		configbox.appendChild(throttle_input);

		const throttle_span2 = document.createElement("span");
		const throttle_text2 = document.createTextNode("ms");
		throttle_span2.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		throttle_span2.appendChild(throttle_text2);
		configbox.appendChild(throttle_span2);

		const count_span = document.createElement("span");
		const count_text = document.createTextNode("count");
		count_span.setAttribute("id", "count");
		count_span.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		count_span.appendChild(count_text);
		configbox.appendChild(count_span);

		count_input = document.createElement("input");
		count_input.setAttribute("type","text"); 
		count_input.setAttribute("maxlength","5"); 
		count_input.setAttribute("size","5");
		count_input.setAttribute("name","count");  
		count_input.setAttribute("value",wordcnt);
		configbox.appendChild(count_input);

		const number_from_span = document.createElement("span");
		const number_from_text = document.createTextNode("number_from");
		number_from_span.setAttribute("id", "number_from");
		number_from_span.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		number_from_span.appendChild(number_from_text);
		configbox.appendChild(number_from_span);

		number_from_input = document.createElement("input");
		number_from_input.setAttribute("type","text"); 
		number_from_input.setAttribute("maxlength","5"); 
		number_from_input.setAttribute("size","5");
		number_from_input.setAttribute("name","number_from");  
		number_from_input.setAttribute("value",number_from);
		configbox.appendChild(number_from_input);

		const number_to_span = document.createElement("span");
		const number_to_text = document.createTextNode("number_to");
		number_to_span.setAttribute("id", "number_to");
		number_to_span.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		number_to_span.appendChild(number_to_text);
		configbox.appendChild(number_to_span);

		number_to_input = document.createElement("input");
		number_to_input.setAttribute("type","text"); 
		number_to_input.setAttribute("maxlength","5"); 
		number_to_input.setAttribute("size","5");
		number_to_input.setAttribute("name","number_to");  
		number_to_input.setAttribute("value",number_to);
		configbox.appendChild(number_to_input);

		extbox = document.createElement("div");
		const exttext1 = document.createTextNode(" ");
		extbox.setAttribute("id", "extbox");
		extbox.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		extbox.appendChild(exttext1);
		configbox.appendChild(extbox);
	
		var ext_input=[];
		var extlabel=[];
		for (var i = 0; i < extlists.length; i++) {
			var checkbox = document.createElement('input');
			var label = document.createElement('label');
			var br = document.createElement('br');
			var checkboxid = "checkbox" + i;
			var labelid = "label" + i;
			var name = "ext";
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("value", extlists[i][0]);
			checkbox.setAttribute("id", checkboxid);
			checkbox.setAttribute("class", name);
			checkbox.setAttribute("name", name);
			label.setAttribute("for", checkboxid);
			label.setAttribute("id", labelid);
			label.innerText = extlists[i][0];
			if(extlists[i][1] == "checked"){
				checkbox.checked = true;
			}else{
				checkbox.checked = false;
			}
			extbox.appendChild(checkbox);
			extbox.appendChild(label);
		}

		pre_input = document.createElement("input");
		pre_input.setAttribute("type","text");
		pre_input.setAttribute("size","44");
		pre_input.setAttribute("id", "pre_input");
		pre_input.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		pre_input.setAttribute("value",'http://id.example9.jp:8000/login.php?success=http%3A%2F%2Fbookmark.example9.jp%3A8000%2F');
		configbox.appendChild(pre_input);

		regexp_input = document.createElement("input");
		regexp_input.setAttribute("type","text"); 
		regexp_input.setAttribute("size","44");
		regexp_input.setAttribute("id","regexp_input"); 
		regexp_input.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;"); 
		regexp_input.setAttribute("value",'<input type="hidden" name="__token" value="(.+?)">');
		configbox.appendChild(regexp_input);
	}

	var resultsel = document.getElementById("results");
	if(!resultsel){
		const resultsbox = document.createElement("div");
		const resultstext1 = document.createTextNode("results");
		resultsbox.setAttribute("id", "results");
		resultsbox.setAttribute("style","border:1px solid;background:#FFF;width:330px;margin:2pt;padding:1pt;");
		resultsbox.appendChild(resultstext1);
		parentel.appendChild(resultsbox);

		const progressbox = document.createElement("div");
		const progresstext1 = document.createTextNode("progress");
		progressbox.setAttribute("id", "progress");
		progressbox.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		progressbox.appendChild(progresstext1);
		resultsbox.appendChild(progressbox);

		progress_results = document.createElement("span");
		progress_results.setAttribute("id", "progress");
		progress_results.setAttribute("style","border:1px solid;background:#FFF;margin:2pt;padding:1pt;");
		progressbox.appendChild(progress_results);

		const databox = document.createElement("div");
		const datatext1 = document.createTextNode("now searching...");
		databox.setAttribute("id", "data");
		databox.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		databox.appendChild(datatext1);
		resultsbox.appendChild(databox);

		data_input = document.createElement("textarea");
		data_input.setAttribute("id", "data");
		data_input.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		data_input.setAttribute('cols',36);
		data_input.setAttribute('rows',10);
		resultsbox.appendChild(data_input);

		const findbox = document.createElement("div");
		const findtext1 = document.createTextNode("urls finded");
		findbox.setAttribute("id", "find");
		findbox.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		findbox.appendChild(findtext1);
		resultsbox.appendChild(findbox);

		find_results = document.createElement("div");
		find_results.setAttribute("id", "find");
		find_results.setAttribute("style","border:1px solid;background:#FFF;width:310px;margin:2pt;padding:1pt;");
		resultsbox.appendChild(find_results);
	}
	function handler(e, t) {
		t=e.target;
		e.preventDefault();
		switch (t.id) {
			case "start":
				if(org_cnt>0){
					cnt=org_cnt;
					org_cnt=0;
				}
				buildpayloads();
				callme();
				break;
			case "stop":
				org_cnt=cnt;
				cnt=urls.length-1;
				break;
			case "reset":
				urls.length=0;
				extensions.length=0;
				cnt=0,org_cnt=0,thr=500,findurls=[];redirurls=[];
				extlists=JSON.parse(JSON.stringify(org_extlists));
				buildpayloads();
				break;
			case "close":
				cnt=urls.length-1;
				parentel.style.display="none";
				d.body.removeChild(parentel);
				break;
			case "test":
				gettoken()
				.then(data => {
					console.log(data);
					var preregexp = new RegExp(regexp_input.value);
					var found = data.match(preregexp);
					var token=found[1];
					alert(token);
				})
				.catch(function(error) {
					alert('error');
				});
			break;
		};
		switch (t.className) {
			case "ext":
				extensions.length=0;
				buildpayloads();
				extrender();
				break;
		};
	}

	async function gettoken() {
		var pretext  = pre_input.value;
		const res = await fetch(pretext);
		const data = await res.text();
		return data;
	}

	extobj = document.getElementsByName('ext');
	var myHeader;
	var method;
	var path="";
	var rawbodys=[];
	function buildpayloads(){
		urls.length=0;
		passes.length=0;
		checknum=0;
		for (var i = 0; i < extobj.length; i++) {
			if (extobj[i].checked) {
				extlists[i][1] = "checked";
				checknum=checknum+2**i;
			}else{
				extlists[i][1] = "";  
			}
		}
		wordcntobj = document.getElementsByName('count');
		number_fromobj = document.getElementsByName('number_from');
		number_toobj = document.getElementsByName('number_to');
		wordcnt=wordcntobj[0].value;
		from=number_fromobj[0].value;
		to=number_toobj[0].value;
		if (checknum & 8){
			for(var i=from; i<=to; i++){
				var pass=makepayload(i,checknum);
				passes.push(pass);
			}
		}else{
			for(var i=0; i<wordcnt; i++){
				var pass=makepayload(i,checknum);
				passes.push(pass);
			}
		}
		var text  = data_input.value.replace(/\r\n|\r/g, "\n");
		var lines = text.split( '\n' );
		myHeader = new Headers();
		var rawbody="";
		for ( var i = 0; i < lines.length; i++ ) {
			var reqmethod = lines[i].match(/^(.+) (.+) (.+)$/);
			if (i==0 && reqmethod){
				method = reqmethod[1];
				path  = reqmethod[2];
			}
			var header = lines[i].match(/^(.+): (.+)$/);
			if (header){
				myHeader.append(header[1], header[2]);
			}
			if (lines[i]==""){
				while (i < lines.length){
					if (!(lines[i]=="" && rawbody=="")){
						rawbody = rawbody+"\n"+lines[i];
					}
					i++;
				}
				break;
			}
		}
		rawbodys.length=0;
		for ( var j = 0; j < passes.length; j++ ) {
			rawbodys.push(rawbody.replace(/\|\|\|.+\|\|\|/, passes[j]));
			urls.push(location.protocol+'//'+location.host+path.replace(/\|\|\|.+\|\|\|/, passes[j]));
		}
		rawbodys.push('dummy');
		urls.push('http://xxe.tokyo');
		progress_results .innerText=( (org_cnt>0) ? org_cnt:cnt)+"/"+(urls.length-1);
		data_input.innerText="";
		find_results.innerText=passes[cnt];
	}

	function extrender(){
		for (var i = 0; i < extlists.length; i++) {
			var checkboxid = "checkbox" + i;
			var labelid = "label" + i;
			var parent = document.getElementById('extbox');
			var checkbox = document.getElementById(checkboxid);
			var label = document.getElementById(labelid);
			parent.removeChild(checkbox);
			parent.removeChild(label);
		}
		for (var i = 0; i < extlists.length; i++) {
			var checkbox = document.createElement('input');
			var label = document.createElement('label');
			var br = document.createElement('br');
			var checkboxid = "checkbox" + i;
			var labelid = "label" + i;
			var name = "ext";
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("value", extlists[i][0]);
			checkbox.setAttribute("id", checkboxid);
			checkbox.setAttribute("class", name);
			checkbox.setAttribute("name", name);
			label.setAttribute("for", checkboxid);
			label.setAttribute("id", labelid);
			label.innerText = extlists[i][0];
			if(extlists[i][1] == "checked"){
				checkbox.checked = true;
			}else{
				checkbox.checked = false;
			}
			extbox.appendChild(checkbox);
			extbox.appendChild(label);
		}
	}
	buildpayloads();
	function callme(){
		t1[cnt] = performance.now();
		var myInit;
		if (rawbodys[cnt].indexOf('$$$') != -1) {
			var bodywtoken=rawbodys[cnt].replace(/\r|\n/g, "");
			gettoken().then(data => {
				console.log(data);
				var preregexp = new RegExp(regexp_input.value);
				var found = data.match(preregexp);
				var token=found[1];
				bodywtoken=bodywtoken.replace(/\$\$\$.+\$\$\$/, token);
				if(method=="GET" || method=="HEAD"){
					myInit= {
						method: method,
						headers: myHeader,
						mode: 'cors',
						cache: 'default',
					};
				}else{
					myInit= {
						method: method,
						headers: myHeader,
						mode: 'cors',
						cache: 'default',
						body: bodywtoken,
					};
				}
				myRequests[cnt] = new Request(urls[cnt],myInit);
				var networkPromise = fetch(myRequests[cnt]).then(function(response) {
					t2[cnt] = performance.now();
					if(!response.ok){
						console.log(response.status+' ng '+response.url);
						if (response.status=='0')redirurls.push(response.url);
					}else{
						findurls.push(response.url);
						console.log(response.status+' yes '+response.url);
					}
					console.log("response time:"+cnt+":"+(t2[cnt]-t1[cnt]));
				});
				var timeOutPromise = new Promise(function(resolve, reject) {
					throbj = document.getElementsByName('throttle');
					thr=throbj[0].value;
					wordcntobj = document.getElementsByName('count');
					number_fromobj = document.getElementsByName('number_from');
					number_toobj = document.getElementsByName('number_to');
					wordcnt=wordcntobj[0].value;
					from=number_fromobj[0].value;
					to=number_toobj[0].value;
					setTimeout(resolve, thr, 'Timeout Done');
				});
				Promise.all([networkPromise, timeOutPromise]).then(function(values) {
					console.log(urls[cnt]+":");
					find_results.innerText=passes[cnt];
					progress_results .innerText=( (org_cnt>0) ? org_cnt:cnt)+"/"+(urls.length-1);
					if (cnt < urls.length-1){
						cnt++;
						callme();
					}else{
						cnt=urls.length-1;
					}
				});
			})
			.catch(function(error) {
				alert('error');
			});
		}else{
			if(method=="GET" || method=="HEAD"){
				myInit= {
					method: method,
					headers: myHeader,
					mode: 'cors',
					cache: 'default',
				};
			}else{
				myInit= {
					method: method,
					headers: myHeader,
					mode: 'cors',
					cache: 'default',
					body: rawbodys[cnt].replace(/\r|\n/, ""),
				};
			}
			myRequests[cnt] = new Request(urls[cnt],myInit);
			var networkPromise = fetch(myRequests[cnt])
			.then(function(response) {
				t2[cnt] = performance.now();
				if(!response.ok){
					console.log(response.status+' ng '+response.url);
					if (response.status=='0')redirurls.push(response.url);
				}else{
					findurls.push(response.url);
					console.log(response.status+' yes '+response.url);
				}
				console.log("response time:"+cnt+":"+(t2[cnt]-t1[cnt]));
			});
			var timeOutPromise = new Promise(function(resolve, reject) {
				throbj = document.getElementsByName('throttle');
				thr=throbj[0].value;
				wordcntobj = document.getElementsByName('count');
				number_fromobj = document.getElementsByName('number_from');
				number_toobj = document.getElementsByName('number_to');
				wordcnt=wordcntobj[0].value;
				from=number_fromobj[0].value;
				to=number_toobj[0].value;
				setTimeout(resolve, thr, 'Timeout Done');
			});
			Promise.all([networkPromise, timeOutPromise]).then(function(values) {
				console.log(urls[cnt]+":");
				find_results.innerText=passes[cnt];
				progress_results .innerText=( (org_cnt>0) ? org_cnt:cnt)+"/"+(urls.length-1);
				if (cnt < urls.length-1){
					cnt++;
					callme();
				}else{
					cnt=urls.length-1;
				}
			});
		}
	}

})();  
