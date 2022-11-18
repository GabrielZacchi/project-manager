import requests

def search_by_cep(cep):
    response = requests.get('https://viacep.com.br/ws/{cep}/json/'.format(cep=cep), verify=False)
    return response.json()