function get(name){
	var radio = document.getElementsByName(name);
	for (i=0; i<radio.length; i++) {
		if (radio[i].checked) {
			return radio[i].value
		}
	}
}
var s = document.createElement('script');
s.type='text/javascript';
document.body.appendChild(s);
s.src='https://asdf123asdf123asdf123.github.io/404-games/'+get("type")+'/'+get("mode")+'.js';
void(0);
