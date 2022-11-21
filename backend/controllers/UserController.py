from flask_api import status
from flask import jsonify, request
from models import User
from database.database import db
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from utils import password_check

def add_user():
    data = request.json
    try:
        password_check_res = password_check(data.get('password'))
        if password_check_res['password_ok']:
            user = User(
                data.get('name'),
                data.get('username'),
                data.get('password')
            )
            db.session.add(user)
            db.session.commit()
            return  jsonify(user.serialize())
        else:
            response = {
                'timestamp': datetime.now(),
                'status': 400,
                'error': 'Bad Request',
                'message': password_check_res,
                'path': '/users'
            }
            return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/users'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

