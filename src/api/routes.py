"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email",None)
    password = request.json.get("password",None)

    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify({"msj":"El usuario ya existe"}), 400
    
    new_user =User(email= email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msj":"Usuario creado correctamente"}), 201

@api.route("/token", methods=["POST"])
def createa_token():
    email = request.json.get("email",None)
    password = request.json.get("password",None)

    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401
    
    access_token = create_access_token(identity = str(user.id))  
    return jsonify({"token": access_token, "user_id": user.id}), 200
