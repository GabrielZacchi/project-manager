from flask_api import status
from flask import jsonify, request
from models import User
from database.database import db
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

def add_user():
    data = request.json
    try:
        user = User(
            data.get('name'),
            data.get('username'),
            data.get('password')
        )
        db.session.add(user)
        db.session.commit()
        return  jsonify(user.serialize())
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/users'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

