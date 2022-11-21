from flask import Blueprint
import controllers.AuthController as authController

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/signin', methods=['POST'])(authController.login)
auth_bp.route('/current_user', methods=['GET'])(authController.current_user)