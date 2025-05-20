from app.extensions import db
from sqlalchemy.dialects.postgresql import UUID, ARRAY
import uuid

class Todo(db.Model):
    __tablename__ = 'todos'

    todo_id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('users.user_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.TIMESTAMP(timezone=True))
    priority = db.Column(db.Integer, default=2)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True), default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP(timezone=True), default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    completed_at = db.Column(db.TIMESTAMP(timezone=True))
    category = db.Column(db.String(50))

    def __repr__(self):
        return f'<Todo {self.title}>'