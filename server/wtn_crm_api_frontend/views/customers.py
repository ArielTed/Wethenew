from flask.views import MethodView
from flask_smorest import Blueprint, Page, abort

from wtn_crm_api_frontend.schemas.customers import CustomerWtnSchema
from wtn_crm_api_frontend.views.helpers import CUSTOMERS


bp = Blueprint(
    "customers", "customers", url_prefix="/customers", description="All possible operations on the information of the responsible customers."
)


@bp.route("/")
class Customers(MethodView):
    @bp.response(CustomerWtnSchema(many=True), code=200)
    @bp.doc(responses={"500": {}})
    @bp.paginate(Page)
    def get(self):
        """Get all the CRM managers of the customers

        Returns a list of all customer managers"""
        return CUSTOMERS


@bp.route("/<int:customer_id>")
class CustomersById(MethodView):
    @bp.response(CustomerWtnSchema, code=200)
    @bp.doc(responses={"404": {"description": "Customer not found"}, "500": {}})
    def get(self, customer_id):
        """
        Get one customer manager detail by ID

        Returns a dictionnary with customer manager information (id, title, ...),
        404 if customer manager is not found
        """
        for customer in CUSTOMERS:
            if customer["id"] == customer_id:
                return customer
        else:
            abort(404, message="Customer manager not found.")
