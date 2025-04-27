from flask import Flask
from .extensions import  cors
from .blueprints import register_blueprints
# from .config import Config

def create_app(config_class=None):
    app = Flask(__name__)
    # app.config.from_object(config_class)
    
    # Initialize extensions
    # db.init_app(app)
    # jwt.init_app(app)
    cors.init_app(app)
    
    # Register blueprints
    # for blueprint in blueprints:
    #     app.register_blueprint(blueprint["blueprint"], url_prefix=blueprint["url_prefix"])
    # from .auth import auth_bp
    # app.register_blueprint(auth_bp, url_prefix='')
    register_blueprints(app)
    # app.register_blueprint(todos_bp, url_prefix='/api/todos')
    
    return app