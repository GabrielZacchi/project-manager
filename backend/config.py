import os

SECRET_KEY = os.urandom(32)

basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = True

SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@127.0.0.1:5432/project_manager"

SQLALCHEMY_TRACK_MODIFICATIONS = False

CORS_HEADERS = 'Content-Type'