from flask_api import status
from flask import jsonify, request
from models import Project
from database.database import db
from sqlalchemy import exc
from datetime import datetime
from utils import search_by_cep
from controllers.AuthController import token_required

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
        if not bool(data.get('title')) :
            response['title'] = err_msg
        if not bool(data.get('zip_code')):
            response['zip_code'] = err_msg
        if not bool(data.get('cost')):
            response['cost'] = err_msg
        if not bool(data.get('deadline')):
            response['deadline'] = err_msg
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

@token_required
def get_user_projects(current_user):
    try:
        projects = Project.query.filter_by(username=current_user.username)
        return jsonify([p.serialize() for p in projects])
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, {})
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

@token_required
def get_project_by_id(current_user, id):
    try:
        project = Project.query.filter_by(id=id, username=current_user.username).first()
        if project:
            project = project.serialize()
            project['cep'] = project['zip_code']
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

@token_required
def add_project(current_user):
    data = request.json
    try:
        project = Project(
            data.get('title'),
            data.get('zip_code'),
            data.get('cost'),
            data.get('done'),
            data.get('deadline'),
            current_user.username,
            data.get('created_at'),
            data.get('updated_at')
        )
        db.session.add(project)
        db.session.commit()
        return  jsonify(project.serialize())
    except exc.SQLAlchemyError as err:
        response = handle_exceptions(err, data)
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

@token_required
def update_project(current_user, id):
    try:
        data = request.json
        project = Project.query.filter_by(id=id).first()
        if project:
                if current_user.username == project.username:
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

@token_required
def finalize_project(current_user, id):
    try:
        project = Project.query.filter_by(id=id).first()
        if project:
                if current_user.username == project.username:
                    project.done = True
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
        response = handle_exceptions(err, {})
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)

@token_required
def delete_project(current_user, id):
    try:
        project = Project.query.filter_by(id=id).first()
        if project:
                if current_user.username == project.username:
                    db.session.delete(project)
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
        response = handle_exceptions(err, {})
        return(jsonify(response), status.HTTP_400_BAD_REQUEST)


        


