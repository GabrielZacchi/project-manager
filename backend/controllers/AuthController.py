from functools import wraps
from flask import jsonify, request, current_app
import jwt
from datetime import datetime, timedelta
from models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'token está faltando', 'data': []}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(username=data['sub']).first()
        except:
            return jsonify({'message': 'O token é inválido ou expirou', 'data': []}), 401
        return f(current_user, *args, **kwargs)
    return decorated

def login():
    auth = request.authorization
    user = User.authenticate(**auth)

    if not user:
        return jsonify({ 'message': 'Credenciais inválidas', 'authenticated': False }), 401

    token = jwt.encode({
        'sub': user.username,
        'iat':datetime.now(),
        'exp': datetime.now() + timedelta(hours=12)},
        current_app.config['SECRET_KEY'])
    return jsonify({'message': 'Validado com sucesso', 
                    'token': token.encode().decode('utf-8'),
                    'iat': datetime.now(),
                    'exp': datetime.now() + timedelta(hours=12)
                    })

@token_required
def current_user(current_user):
    return jsonify(current_user.serialize())
