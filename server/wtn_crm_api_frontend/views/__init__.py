from wtn_crm_api_frontend.views import messages, customers


def init(api):
    api.register_blueprint(customers.bp)
    api.register_blueprint(messages.bp)
