from . import auth_bp
from flask import request, jsonify
from .models import User
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)
import uuid

# Test routes - remove in production
@auth_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    data = []
    for user in users:
        data.append({
            "user_id": str(user.user_id),
            "name": user.name,
            "email": user.email,
            "password_hash": user.password_hash,  # Only for debugging
            "profile_picture_url": user.profile_picture_url,
            "timezone": user.timezone
        })
    return jsonify(data), 200

@auth_bp.route('/create-test-user', methods=['GET'])
def create_test_user():
    # Check if test user already exists
    if User.find_by_email('test@example.com'):
        return jsonify({"message": "Test user already exists"}), 200

    # Create a test user with a known password
    try:
        test_user = User(
            email='test@example.com',
            password_hash=User.hash_password('password123'),
            name='Test User',
            timezone='UTC'
        )
        test_user.save_to_db()

        return jsonify({
            "message": "Test user created successfully",
            "user": {
                "email": test_user.email,
                "password": "password123"  # Only for testing
            }
        }), 201
    except Exception as e:
        return jsonify({"message": f"Error creating test user: {str(e)}"}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate required fields
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    # Check if user already exists
    if User.find_by_email(data.get('email')):
        return jsonify({"message": "User with this email already exists"}), 409

    # Create new user
    try:
        new_user = User(
            email=data.get('email'),
            password_hash=User.hash_password(data.get('password')),
            name=data.get('name', ''),
            timezone=data.get('timezone', 'UTC')
        )
        new_user.save_to_db()

        return jsonify({
            "message": "User created successfully",
            "user_id": str(new_user.user_id)
        }), 201
    except Exception as e:
        return jsonify({"message": f"Error creating user: {str(e)}"}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate required fields
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400

    # Find user by email
    user = User.find_by_email(data.get('email'))

    # Check if user exists and password is correct
    if user and user.verify_password(data.get('password')):
        # Update last login time
        user.update_last_login()

        # Create tokens
        access_token = create_access_token(identity=str(user.user_id))
        refresh_token = create_refresh_token(identity=str(user.user_id))

        return jsonify({
            "message": "Login successful",
            "user": {
                "user_id": str(user.user_id),
                "name": user.name,
                "email": user.email
            },
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    return jsonify({
        "access_token": access_token
    }), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()

    try:
        user = User.query.filter_by(user_id=uuid.UUID(current_user_id)).first()

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "user_id": str(user.user_id),
            "name": user.name,
            "email": user.email,
            "profile_picture_url": user.profile_picture_url,
            "timezone": user.timezone,
            "last_login": user.last_login.isoformat() if user.last_login else None
        }), 200
    except Exception as e:
        return jsonify({"message": f"Error retrieving user profile: {str(e)}"}), 500