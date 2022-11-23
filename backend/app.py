from flask import Flask, jsonify
from flask_cors import CORS
from database import database
from routes.user_bp import user_bp
from routes.project_bp import project_bp
from routes.auth_bp import auth_bp
from utils import search_by_cep

def create_app():
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    app.config.from_object('config')

    database.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(project_bp, url_prefix='/projects')

    @app.route('/cep/<cep>', methods=['GET'])
    def get_cep(cep):
        response = search_by_cep(cep)
        return jsonify(response)

    return app

if __name__ == '__main__':
    create_app().run()