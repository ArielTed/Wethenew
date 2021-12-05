from marshmallow import Schema, fields


class CustomerWtnSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String()
    unread_messages = fields.Int()
    avatar = fields.String()
