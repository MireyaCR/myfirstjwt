"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import re
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required,get_jwt_identity
# from sqlalchemy.orm import validates

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def login():
    data = request.json    
    user= User.query.filter_by(email=data.get('email'),password=data.get('password')).first()
    if user:
        token=create_access_token(identity=user.id)
        return jsonify({"token":token, "status":200}), 200
    return jsonify({"message":"Usuario/Contraseña incorrectos","status":403}),403


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id=get_jwt_identity()
    user=User.query.filter_by(id=user_id).first()
    return jsonify(user.serialize()),200

@api.route('/registro', methods=['POST'])
def registro():   
    body = request.get_json()
    if body is None:
        return jsonify({"msg":"The body is empty"}), 400
    elif 'email' not in body or 'password' not in body:
        return jsonify({"msg": "Email or password missing"}), 400
    else:
        email = body['email']
        password = body['password']
            
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"msg": "El correo electrónico no es válido"}), 400
        
        if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", password):
            return jsonify({"msg": "La contraseña no cumple con los requisitos. Debe tener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial, y tener una longitud mínima de 8 caracteres."}), 400

        user = User.query.filter_by(email=body['email']).first()
        if user is None:
            new_user = User(email=body['email'], password=body['password'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"msg": "User registered successfully","status":200}), 200
        return jsonify({"msg": "User already exists","status":400}), 400