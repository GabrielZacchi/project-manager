import requests
import re

def search_by_cep(cep):
    response = requests.get('https://viacep.com.br/ws/{cep}/json/'.format(cep=cep), verify=False)
    return response.json()

def password_check(password):
    length_error = len(password) < 8
    digit_error = re.search(r"\d", password) is None
    uppercase_error = re.search(r"[A-Z]", password) is None
    lowercase_error = re.search(r"[a-z]", password) is None

    password_ok = not ( length_error or digit_error or uppercase_error or lowercase_error )

    return {
        'password_ok' : password_ok,
        'length_error' : length_error,
        'digit_error' : digit_error,
        'uppercase_error' : uppercase_error,
        'lowercase_error' : lowercase_error,
    }