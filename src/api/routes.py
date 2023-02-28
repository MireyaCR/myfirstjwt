"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def login():
    data = request.json
    
    user= User.query.filter_by(email=data['email'],password=data['password']).first()
    # user= User.query.filter_by(email=data.get['email'],password=data.get['password']).first()
    if user:
        token=create_access_token(identity=user.id)
        return jsonify({"token":token}), 200

    return jsonify({"message":"Usuario/Contraseña incorrectos"}),400

