import jwt
from functools import wraps
from flask import request, jsonify
import os

# Secret key used for JWT signing (ensure this matches what you used when creating the token)
SECRET_KEY = os.getenv("JWT_SECRET", "your_default_secret")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Get the token from the Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]  # Extract the token
        print(token)
        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            # Decode the token
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.user = decoded_token  # Attach decoded token to request object
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.exceptions.InvalidTokenError:
            return jsonify({"message": SECRET_KEY}), 401

        return f(*args, **kwargs)
    return decorated
