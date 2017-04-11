module.exports = {
	url: function () {
    return "http://localhost:1337/";
    //return "http://c2c.acmvit.in/";

},

encode: function(urrl){
	var newurl="";
	for(var i=0;i<urrl.length;i++){
		var c=urrl[i];
		if(c=='/')
			newurl+="%2F";
		else
			newurl+=c;
	}
	return newurl;
}
}
