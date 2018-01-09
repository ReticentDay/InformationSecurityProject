P10 = [3,5,2,7,4,10,1,9,8,6]
P8 = [6,3,7,4,8,5,10,9]
P4 = [2,4,3,1]
IP = [2,6,3,1,4,8,5,7]
IPI = [4,1,3,5,7,2,8,6]
EP = [4,1,2,3,2,3,4,1]

S0 = [
        [1, 0, 3, 2],
        [3, 2, 1, 0],
        [0, 2, 1, 3],
        [3, 1, 3, 2]
     ]

S1 = [
        [0, 1, 2, 3],
        [2, 0, 1, 3],
        [3, 0, 1, 0],
        [2, 1, 0, 3]
     ]

key = [0,1,1,1,1,1,1,1,0,1]
PKey = [0,0,0,0,0,0,0,0]
plainText = [0,0,0,1,0,1,1,0]

def Permute(ori_key: list, martrix_length: list):
	tempKey = []
	for i in ori_key:
		tempKey.append(i)
	position = 0
	for i in martrix_length:
		tempKey[position] = ori_key[i-1]
		position += 1
	return tempKey

def PermuteExpand(ori_key: list, martrix_length: list):
	tempKey = [0,0,0,0,0,0,0,0]
	position = 0
	for i in martrix_length:
		tempKey[position] = ori_key[i-1]
		position += 1
	return tempKey

def Shift(ori_key: list, count: int):
	tempKey = []
	for i in ori_key:
		tempKey.append(i)
	half = int(len(ori_key) / 2)
	for i in range(1,count + 1):
		temp = tempKey[0]
		for item in range(1, half):
			tempKey[item - 1] = tempKey[item]
		tempKey[half - 1] = temp
		temp = tempKey[half]
		for item in range(half + 1, len(ori_key)):
			tempKey[item - 1] = tempKey[item]
		tempKey[len(ori_key) - 1] = temp
	return tempKey

def ComputeK1(ori_key: list):
	tempKey = [0,0,0,0,0,0,0,0]
	ori_key = Shift(ori_key, 1)
	position = 0
	for i in P8:
		tempKey[position] = ori_key[i-1]
		position += 1 
	return tempKey

def ComputeK2(ori_key: list):
	tempKey = [0,0,0,0,0,0,0,0]
	ori_key = Shift(ori_key, 3)
	position = 0
	for i in P8:
		tempKey[position] = ori_key[i-1]
		position += 1
	return tempKey

def ComputeXOR(ori_key: list, K_key: list):
	tempKey = []
	for i in ori_key:
		tempKey.append(i)
	for i in range(0, len(ori_key)):
		if ori_key[i] == K_key[i]:
			tempKey[i] = 0
		else:
			tempKey[i] = 1
	return tempKey

def BinaryToDecimal(bin: str):
	result = 0
	mutiple = 1
	for i in range(len(bin), 0, -1):
		result += int(bin[i-1]) * mutiple
		mutiple *= 2
	return result

def DecimalToBinary(dec: int):
	result = ''
	if dec == 3:
		result = '11'
	elif dec == 2:
		result = '10'
	elif dec == 1:
		result = '01'
	else:
		result = '00'
	return result

def AfterSBox(ori_key: list):
	calL = 0
	calR = 0
	calLs = ''
	calRs = ''
	Rm_t = [0,0,0,0]

	SFirstColunm = str(ori_key[0]) + str(ori_key[3])
	SFirstRow = str(ori_key[1]) + str(ori_key[2])
	SSecondColunm = str(ori_key[4]) + str(ori_key[7])
	SSecondRow = str(ori_key[5]) + str(ori_key[6])

	calL = S0[BinaryToDecimal(SFirstRow)][BinaryToDecimal(SFirstColunm)]
	calR = S1[BinaryToDecimal(SSecondRow)][BinaryToDecimal(SSecondColunm)]

	calLs = DecimalToBinary(calL)
	calRs = DecimalToBinary(calR)

	Rm_t[0] = int(calLs[0])
	Rm_t[1] = int(calLs[1])
	Rm_t[2] = int(calRs[0])
	Rm_t[3] = int(calRs[1])

	return Rm_t

def ComputeCipherFirst():
	cipherFirst = [0,0,0,0,0,0,0,0]
	RmT = [0,0,0,0]
	LmT = [0,0,0,0]

	IPPlainText = Permute(plainText, IP)
	Rm = IPPlainText[4:]
	Lm = IPPlainText[:4]

	RmT = PermuteExpand(Rm, EP)
	cipherFirst = ComputeXOR(RmT, K1)
	RmT = AfterSBox(cipherFirst)
	RmT = Permute(RmT, P4)
	LmT = ComputeXOR(RmT, Lm)

	position = 0
	for i in Rm:
		cipherFirst[position] = i
		position += 1
	for i in LmT:
		cipherFirst[position] = i
		position += 1

	return cipherFirst

def ComputeCipherSecond(ori_key: list):
	cipherSecond = [0,0,0,0,0,0,0,0]
	RmT = [0,0,0,0]
	LmT = [0,0,0,0]

	Rm = ori_key[4:]
	Lm = ori_key[:4]

	RmT = PermuteExpand(Rm, EP)
	cipherSecond = ComputeXOR(RmT, K2)
	RmT = AfterSBox(cipherSecond)
	RmT = Permute(RmT, P4)
	LmT = ComputeXOR(RmT, Lm)

	position = 0
	for i in LmT:
		cipherSecond[position] = i
		position += 1
	for i in Rm:
		cipherSecond[position] = i
		position += 1

	return cipherSecond

Pkey = Permute(key, P10)

K1 = ComputeK1(Pkey)
K2 = ComputeK2(Pkey)

cipherF = []
cipherF = ComputeCipherFirst()

cipherS = []
cipherS = ComputeCipherSecond(cipherF)

cipher = []
cipher = Permute(cipherS, IPI)