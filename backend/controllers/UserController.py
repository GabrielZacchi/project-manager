from flask_api import status
from flask import jsonify, request
from models import User
from database.database import db
from sqlalchemy import exc
from datetime import datetime
from utils import password_check

def handle_exceptions(err, data, password_check_res):
    response = {
        'timestamp': datetime.now(),
        'status': 400,
        'error': 'Bad Request',
        'message': str(err.__dict__['orig']),
        'path': '/users'
    }
    if password_check_res:
        response['password_check'] = password_check_res
        
    if type(err) == exc.IntegrityError:
        response['error'] = "IntegrityError"
        err_msg = "O campo deve ser preenchido!"
        if not bool(data.get('name')) :
            response['name'] = err_msg
        if not bool(data.get('username')) :
            response['username'] = err_msg
        if not bool(data.get('password')):
            response['password'] = err_msg

    return response

def add_user():
    data = request.json
    try:
        password_check_res = password_check(data.get('password'))
        user = User(
            data.get('name'),
            data.get('username'),
            data.get('password') if password_check_res['password_ok'] else ""
        )
        db.session.add(user)
        db.session.commit()
        return  jsonify(user.serialize())
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, data, password_check_res)
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

