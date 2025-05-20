from app.extensions import db
import bcrypt
import uuid
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100))
    created_at = db.Column(db.TIMESTAMP(timezone=True), default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP(timezone=True), default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    last_login = db.Column(db.TIMESTAMP(timezone=True))
    is_active = db.Column(db.Boolean, default=True)
    profile_picture_url = db.Column(db.String(255))
    timezone = db.Column(db.String(50), default='UTC')

    todos = db.relationship('Todo', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.name}>'

    @staticmethod
    def hash_password(password):
        """Hash a password for storing."""
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def verify_password(self, password):
        """Verify a stored password against one provided by user"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def update_last_login(self):
        """Update last login timestamp"""
        self.last_login = datetime.now(timezone.utc)
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        """Find a user by their email"""
        return cls.query.filter_by(email=email).first()

    def save_to_db(self):
        """Save user to database"""
        db.session.add(self)
        db.session.commit()