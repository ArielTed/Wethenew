from flask.views import MethodView
from flask_smorest import Blueprint, Page, abort

from wtn_crm_api_frontend.schemas.messages import MessageQueryArgsSchema, MessageSchema
from wtn_crm_api_frontend.views.helpers import MESSAGES, CUSTOMERS, count_unread


bp = Blueprint(
    "messages",
    "messages",
    url_prefix="/customers/<int:customer_id>/messages",
    description="Operations on messages",
)

PAGE_SIZE = 20


@bp.route("/")
class Messages(MethodView):
    @bp.arguments(MessageQueryArgsSchema, location="query")
    @bp.response(MessageSchema(many=True), code=200)
    @bp.doc(responses={"404": {"description": "Customers not found"}, "500": {}})
    @bp.paginate(Page)
    def get(self, args, customer_id):
        """Get all the messages of one customer

        Returns a list of messages of one customer.
        404 if customer is not found
        """
        messages = []

        for customer in CUSTOMERS:
            if customer["id"] == customer_id:
                break
        else:
            abort(404, message="Customer not found.")

        messages = [m for m in MESSAGES if m["customer_id"] == customer_id]

        sort_args = args.pop("sort", None)
        if sort_args is not None:
            sort, direction = sort_args.split(":")
            if sort is not None and direction is not None:
                messages.sort(
                    key=lambda x: x[sort],
                    reverse=(direction == "desc"),
                )
        return messages


@bp.route("/<int:message_id>")
class MessageById(MethodView):
    @bp.response(MessageSchema)
    @bp.doc(
        responses={"404": {"description": "Customer or Message not found"}, "500": {}}
    )
    def get(self, customer_id, message_id):
        """Get one message by ID.

        Returns a single message
        404 if customer is not found
        404 if message is not found
        """
        for customer in CUSTOMERS:
            if customer["id"] == customer_id:
                break
        else:
            abort(404, message="Customer not found.")

        for message in MESSAGES:
            if message["id"] == message_id:
                return message
        else:
            abort(404, message="Message not found.")

    @bp.arguments(MessageSchema)
    @bp.response(MessageSchema, code=200)
    @bp.doc(
        responses={"404": {"description": "Customer or Message not found"}, "500": {}}
    )
    def patch(self, update_data, customer_id, message_id):
        """Update a message attribute.

        Mark a message as read and returns the message representation,
        404 if message is not found.
        404 if customer is not found.
        """
        customer = None
        message = None

        for c in CUSTOMERS:
            if c["id"] == customer_id:
                customer = c
                break
        else:
            abort(404, message="Customer not found.")

        for m in MESSAGES:
            if m["id"] == message_id:
                message = m
                break
        else:
            abort(404, message="Message not found.")

        for key, value in update_data.items():
            message[key] = value
            if key == "read":
                customer["unread_messages"] = count_unread(
                    [m for m in MESSAGES if m["customer_id"] == customer_id]
                )

        return message
