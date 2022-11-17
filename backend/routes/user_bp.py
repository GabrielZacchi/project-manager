from flask import Blueprint
import controllers.UserController as userController

user_bp = Blueprint('user_bp', __name__)

user_bp.route('/', methods=['POST'])(userController.add_user)