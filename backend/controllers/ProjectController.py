from flask_api import status
from flask import jsonify, request
from models import Project
from database.database import db
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from utils import search_by_cep

def get_user_projects():
    try:
        username = request.headers.get('username')
        projects = Project.query.filter_by(username=username)
        return jsonify([p.serialize() for p in projects])
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

def get_project_by_id(id):
    try:
        project = Project.query.filter_by(id=id).first()
        if project:
            project = project.serialize()
            location = search_by_cep(project['zip_code'])
            project['zip_code'] = '{cidade}/{uf}'.format(
                cidade = location['localidade'],
                uf = location['uf']
            )
            return jsonify(project)
        else:
            response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': "Project not found!",
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)


def add_project():
    data = request.json
    username = request.headers.get('username')
    try:
        project = Project(
            data.get('title'),
            data.get('zip_code'),
            data.get('cost'),
            data.get('done'),
            data.get('deadline'),
            username,
            data.get('created_at'),
            data.get('updated_at')
        )
        db.session.add(project)
        db.session.commit()
        return  jsonify(project.serialize())
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

def update_project(id):
    try:
        data = request.json
        username = request.headers.get('username')
        project = Project.query.filter_by(id=id).first()
        if project:
                if username == project.username:
                    project.title = data.get('title')
                    project.zip_code = data.get('zip_code')
                    project.cost = data.get('cost')
                    project.updated_at = db.func.current_timestamp()
                    db.session.commit()
                    return jsonify(project.serialize())
                else:
                    response = {
                        'timestamp': datetime.now(),
                        'status': 400,
                        'error': 'Bad Request',
                        'message': "This project does not belong to the informed user!",
                        'path': '/projects'
                    }
                    return(jsonify(response), status.HTTP_400_BAD_REQUEST)
        else:
            response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': "Project not found!",
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

def finalize_project(id):
    try:
        username = request.headers.get('username')
        project = Project.query.filter_by(id=id).first()
        if project:
                if username == project.username:
                    project.done = True
                    project.updated_at = db.func.current_timestamp()
                    db.session.commit()
                    return jsonify(project.serialize())
                else:
                    response = {
                        'timestamp': datetime.now(),
                        'status': 400,
                        'error': 'Bad Request',
                        'message': "This project does not belong to the informed user!",
                        'path': '/projects'
                    }
                    return(jsonify(response), status.HTTP_400_BAD_REQUEST)
        else:
            response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': "Project not found!",
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

def delete_project(id):
    try:
        username = request.headers.get('username')
        project = Project.query.filter_by(id=id).first()
        if project:
                if username == project.username:
                    db.session.delete(project)
                    db.session.commit()
                    return jsonify(project.serialize())
                else:
                    response = {
                        'timestamp': datetime.now(),
                        'status': 400,
                        'error': 'Bad Request',
                        'message': "This project does not belong to the informed user!",
                        'path': '/projects'
                    }
                    return(jsonify(response), status.HTTP_400_BAD_REQUEST)
        else:
            response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': "Project not found!",
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except SQLAlchemyError as err:
        response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': str(err.__dict__['orig']),
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)


        


