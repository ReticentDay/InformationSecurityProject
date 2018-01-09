var decStr = new Array(8); 
var Rm = new Array(4);
var Rm2 = new Array(8);
var Lm = new Array(4);
var newRm = new Array(4);
var data1 = new Array(8);
	
var ip = [ 2, 6, 3, 1, 4, 8, 5, 7 ]; 
var ipi = [ 4, 1, 3, 5, 7, 2, 8, 6 ]; 
var ep = [ 4, 1, 2, 3, 2, 3, 4, 1 ];
var p4 = [ 2, 4, 3, 1 ]; 


function Permute(ori_key){
	var P10 = [3,5,2,7,4,10,1,9,8,6];
	var temp = new Array(10);
	position = 0;
	P10.forEach(function(element){
		temp[position] = ori_key[element - 1];
		position++;
	});
	return temp;
}

function Shift(ori_key,count){
	var temp = new Array(10);
	for(var i = 0;i < 10;i++){
		 temp[i] = ori_key[i];
	}
	for(var o = 0;o < count;o++){
		var tempS = temp[0];
		for(var i = 1;i < 5;i++){
			temp[i-1] = temp[i];
		}
		temp[4] = tempS;
		tempS = temp[5]; 
		for(var i = 6;i < 10;i++){ 
			temp[i-1]=temp[i]; 
		} 
		temp[9] = tempS;
		//console.log(tempS);
	}
	return temp;
}

function P8(ori_key){
	var temp = new Array(8);
	var P8s = [6,3,7,4,8,5,10,9];
	position = 0;
	P8s.forEach(function(element){
		temp[position] = ori_key[element - 1]; 
		position++;
	});
	return temp;
	
}

function strDec(data,key){
	var Org = Permute(key);
	//console.log(Org);
	var Key1 = P8(Shift(Org,1)); 
	var Key2 = P8(Shift(Org,3));
	//console.log(Key1);
	//console.log(Key2);

	var ipt1 = IPT(data);
	//console.log(ipt1);
	var fk1 = XORThem(EPT(ipt1),Key2);
	//console.log(fk1);
	var SW1 = SW(fk1,ipt1);
	//console.log(SW1);
	SW1 = R2T2R(SW1);
	//console.log(SW1);

	var fk2 = XORThem(EPT(SW1), Key1);
	//console.log(fk2);
	var SW2 = SW(fk2, SW1);
	//console.log(SW2);

	var CText = IPTT(SW2);

	return CText;
}

function IPT(text){
	var rText = new Array(8);
	for(var i = 0;i < 8;i++){
		rText[i] = text[ip[i] - 1];
	}
	return rText;
}

function EPT(text){
	var rText = new Array(8); 
	for(var i = 0;i < 8;i++){ 
		rText[i]= text[ep[i] - 1 + 4]; 
	} 
	return rText;
}

function XORThem(text,key){
	var rText = new Array(8);
	for(var i = 0;i < 8;i++){ 
		if(text[i] == key[i])
			rText[i] = "0";
		else
			rText[i] = "1"; 
	} 
	return rText;
}

function S2I(i2,i1){
	var p = 0;
	if (i2 == "1")
		p += 2;
	if (i1 == "1")
		p += 1;
	return p;
}

function pat(count, strs) {
	var lem = strs.length;
	for (var i = lem; i < count; i++)
		strs = '0' + strs;
	return strs;
}

function SW(text,Itext){
	var s0 = [
				[1, 0, 3, 2], 
				[3, 2, 1, 0], 
				[0, 2, 1, 3], 
				[3, 1, 3, 2]
			];
	var s1 = [
				[0, 1, 2, 3], 
				[2, 0, 1, 3], 
				[3, 0, 1, 0], 
				[2, 1, 0, 3]
			];
	
	var v1 = s0[S2I(text[1], text[2])][S2I(text[0], text[3])].toString(2);
	var v2 = s1[S2I(text[5], text[6])][S2I(text[4], text[7])].toString(2);

	v1 = pat(2, v1);
	v2 = pat(2, v2);
	var V = "".concat(v1, v2);
	
	//console.log(V);
	var VList = Array.from(V);
	var P4T = new Array(4);
	
	for(var i = 0;i < 4;i++){
		P4T[i] = VList[p4[i]-1];
	}

	var rText = new Array(8);
	for(var i = 0;i < 4;i++){
		if (P4T[i] == Itext[i])
			rText[i] = "0";
		else
			rText[i] = "1";
	}
	//console.log(Itext);
	for(var i = 4;i < 8;i++){
		rText[i] = Itext[i];
	}
	return rText;
}

function IPTT(text){
	var rText = new Array(8);
	for(var i = 0;i < 8;i++){
		rText[i] = text[ipi[i] - 1];
	}
	return rText;
}

function R2T2R(text){
	var rText = new Array(8);
	for (var i = 4; i < 8; i++) {
		rText[i - 4] = text[i];
	} 
	for (var i = 0; i < 4; i++) {
		rText[i + 4] = text[i];
	}
	return rText;
}