var decStr = new Array(8); 
var Rm = new Array(4);
var Rm2 = new Array(8);
var Lm = new Array(4);
var newRm = new Array(4);
var data1 = new Array(8);
	
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
		var tempS = ori_key[0];
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
	var Key1 = P8(Shift(Org,1)); 
	var Key2 = P8(Shift(Org,3));

	data1 = des_ip(data);
	for (var i=0;i<4;i++)
	{	
		Lm[i] = data1[i];
		Rm[i] = data1[i+4];
	}
	Rm2 = des_EP(Rm);
	Rm2 = des_XOR(Rm2,Key2);
	newRm= des_S0(Rm2);
	newRm = des_p4(newRm);
	Lm = des_4bitsXOR(newRm,Lm);
	var Rm3 = new Array(8);
	var newRm1 = new Array(4);
	var Lm2 = new Array(4);
	Rm3 = des_EP(Lm);
	Rm3 = des_XOR(Rm3,Key1);
	newRm1 = des_S0(Rm3);
	newRm1 = des_p4(newRm1);
	Lm2 = des_4bitsXOR(newRm1,Rm);

	decStr = des_ipi(Lm2,Lm);
    return decStr;
}

function des_ip(source){
	var temp = new Array(8);
	temp[0] = source[1];
	temp[1] = source[5];
	temp[2] = source[2];
	temp[3] = source[0];
	temp[4] = source[3];
	temp[5] = source[7];
	temp[6] = source[4];
	temp[7] = source[6];
	return temp;
}

function des_ipi(s1,s2){
	var temp = new Array(8);
	temp[0] = s1[3];
	temp[1] = s1[0];
	temp[2] = s1[2];
	temp[3] = s2[0];
	temp[4] = s2[2];
	temp[5] = s1[1];
	temp[6] = s2[3];
	temp[7] = s2[1];
	return temp;
}

function des_EP(source){
	var temp = new Array(8);
	temp[0] = source[3];
	temp[1] = source[0];
	temp[2] = source[1];
	temp[3] = source[2];
	temp[4] = source[1];
	temp[5] = source[2];
	temp[6] = source[3];
	temp[7] = source[0];
	return temp;
}

function des_p4(source){
	var temp = new Array(4);
	temp[0] = source[1];
	temp[1] = source[3];
	temp[2] = source[2];
	temp[3] = source[0];
	return temp;
}

function des_4bitsXOR(source,K2){
	var temp = new Array(4);
	for (var i=0;i<4;i++)
	{	
		temp[i] = source[i] ^ K2[i];
	}
	return temp;
}
	
function des_XOR(source,K2){
	var temp = new Array(8);
	for (var i=0;i<8;i++)
	{	
		temp[i] = source[i] ^ K2[i];
	}
	return temp;
}

function des_S0(source){
	var S0 = new Array(4);
	var S1 = new Array(4);
	var temp0 ;
	var temp1 ;
	var Last_temp = new Array(4);
	for (i = 0 ; i < 4 ; i++) {
	  S0[i] = new Array(4);
	  S1[i] = new Array(4);
	}
	S0[0] = [1,0,3,2];
	S0[1] = [3,2,1,0];
	S0[2] = [0,2,1,3];
	S0[3] = [3,1,3,2];	
	
	S1[0] = [0,1,2,3];
	S1[1] = [2,0,1,3];
	S1[2] = [3,0,1,0];
	S1[3] = [2,1,0,3];	
	
	temp0 = S0[source[1]*2 + source[2]][source[0]*2 + source[3]];
	temp1 = S1[source[5]*2 + source[6]][source[4]*2 + source[7]];
	
	
	if(temp0 === 0)
	{
		Last_temp[0] = 0;
		Last_temp[1] = 0;
	}
	else if(temp0 == 1)
	{
		Last_temp[0] = 0;
		Last_temp[1] = 1;
	}
	else if(temp0 == 2)
	{
		Last_temp[0] = 1;
		Last_temp[1] = 0;
	}
	else if(temp0 == 3)
	{
		Last_temp[0] = 1;
		Last_temp[1] = 1;
	}
	//
	if(temp1 === 0)
	{
		Last_temp[2] = 0;
		Last_temp[3] = 0;
	}
	else if(temp1 == 1)
	{
		Last_temp[2] = 0;
		Last_temp[3] = 1;
	}
	else if(temp1 == 2)
	{
		Last_temp[2] = 1;
		Last_temp[3] = 0;
	}
	else if(temp1 == 3)
	{
		Last_temp[2] = 1;
		Last_temp[3] = 1;
	}
	return Last_temp;
}
