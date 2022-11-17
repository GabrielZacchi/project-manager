from flask_api import status
from flask import jsonify, request
from models import User
from database.database import db

def add_user():
    data = request.json
    try:
        user = User(
            data['name'],
            data['username'],
            data['password']
        )
        print(user.serialize())
        db.session.add(user)
        db.session.commit()
        return  jsonify(user.serialize())
    except Exception as err:
	    return(str(err), status.HTTP_400_BAD_REQUEST)

