from flask_api import status
from flask import jsonify, request
from models import Project
from database.database import db
from sqlalchemy import exc
from datetime import datetime
from utils import search_by_cep

def handle_exceptions(err, data):
    response = {
        'timestamp': datetime.now(),
        'status': 400,
        'error': 'Bad Request',
        'message': str(err.__dict__['orig']),
        'path': '/projects'
    }
    if type(err) == exc.IntegrityError:
        response['error'] = "IntegrityError"
        err_msg = "O campo deve ser preenchido!"
        if data.get('title') is None:
            response['title'] = err_msg
        if data.get('zip_code') is None:
            response['zip_code'] = err_msg
        if data.get('cost') is None:
            response['cost'] = err_msg
    elif type(err) == exc.DataError:
        response['error'] = "DataError"
        err_msg = "Formato invalido!"
        if type(data.get('title')) != str:
            response['title'] = err_msg
        if type(data.get('zip_code')) != str:
            response['zip_code'] = err_msg
        if type(data.get('cost')) != (float or int):
            response['cost'] = err_msg
    return response

def get_user_projects():
    try:
        username = request.headers.get('username')
        projects = Project.query.filter_by(username=username)
        return jsonify([p.serialize() for p in projects])
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, {})
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
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, {})
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
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, data)
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
                        'message': "O projeto não pertence ao usuário informado!",
                        'path': '/projects'
                    }
                    return(jsonify(response), status.HTTP_400_BAD_REQUEST)
        else:
            response = {
            'timestamp': datetime.now(),
            'status': 400,
            'error': 'Bad Request',
            'message': "Projeto não encontrado!",
            'path': '/projects'
        }
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, data)
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
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, {})
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
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, {})
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)


        


