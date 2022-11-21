from flask import Flask
from flask_cors import CORS
from database import database
from routes.user_bp import user_bp
from routes.project_bp import project_bp
from routes.auth_bp import auth_bp

def create_app():
    app = Flask(__name__)
    CORS(app, support_credentials=True)
    app.config.from_object('config')

    database.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(project_bp, url_prefix='/projects')

    return app

if __name__ == '__main__':
    create_app().run()