from .auth import auth_bp
from .todos import todos_bp

def register_blueprints(app):
    
    blueprints = [
        {
            "blueprint": auth_bp,
            "url_prefix": "/api/auth"
        },
        {
            "blueprint": todos_bp,
            "url_prefix": "/api/todos"
        }
    ]
    for blueprint in blueprints:
        app.register_blueprint(blueprint["blueprint"], url_prefix=blueprint["url_prefix"])
    

    
