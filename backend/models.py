from database.database import db
from sqlalchemy.orm import backref

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(40), nullable=False)
    password = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False)

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name,
            'username':self.username
        }

class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(15), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    done = db.Column(db.Boolean, default=False, nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    username = db.Column(db.String(40), db.ForeignKey('user.username'), nullable=False)
    user_project = db.relationship("User", backref=backref("user", uselist=False))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), nullable=False)