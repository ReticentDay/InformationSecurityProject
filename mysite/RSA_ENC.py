#!/usr/bin/env python3
# coding=utf-8
# Author: yannanxiu
""" create_rsa_key() - 创建RSA密钥 my_encrypt_and_decrypt() - 加密解密测试 """

import base64
from Cryptodome.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_OAEP, PKCS1_v1_5

def encrypt_and_decrypt_test(keyss,datess):
    recipient_key = RSA.import_key(keyss)
    cipher_rsa = PKCS1_v1_5.new(recipient_key)
    en_data = cipher_rsa.encrypt(bytes(datess, encoding = "utf8"))
    bbb = str(base64.b64encode(en_data), encoding = "utf-8")
    return bbb


if __name__ == '__main__':
    put = encrypt_and_decrypt_test(
        """-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiD7u7BZ+afYsmZrYrUvHeFNDJ
k03fYTBQOtyPEzUkLEFQvN3+TT6NbZe8peVro/Sg2EoDC4BiBWDYFxQo8mPilB1I
xXF/qpHgP3T0O0B+iNlC/5vSZTGCJEFmB38P1/xrsF2wG5MKe4GI6poYe+lGlgA4
LO1x7CNPwetoHD+nxQIDAQAB
-----END PUBLIC KEY-----""",'01111101'
    )
    print(put)