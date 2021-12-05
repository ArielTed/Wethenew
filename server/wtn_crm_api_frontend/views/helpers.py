import random
from datetime import datetime, timedelta


def count_unread(messages):
    return len([m for m in messages if not m["read"]])


def _build_data():
    """Build fake random customers, locally stored for the lifetime of the app."""
    customers = []
    messages = []
    for customer_id in range(101, 104):
        messages_by_customer = _build_messages(customer_id)
        messages.extend(messages_by_customer)

        customers.append(
            {
                "id": customer_id,
                "name": "CRM admin WeTheNew #{}".format(customer_id),
                "unread_messages": count_unread(messages_by_customer),
                "avatar": "https://eu.ui-avatars.com/api/?background=random&name={}&font-size=0.33&length=3".format(customer_id),
            }
        )
    return customers, messages


def _build_messages(customer_id):
    """Build random messages, locally stored for the lifetime of the app."""
    read_status = [True, False, False, False]
    types = ["phone", "email", "sms"]
    subjects = {
        "phone": "Appel #{}",
        "email": "Email #{}",
        "sms": "SMS #{}",
    }
    firstnames = [
        "David",
        "Jacobo",
        "Thibault",
        "Julie",
        "Remi",
        "Sufiane",
        "Gaetan",
        "Yael",
        "Elise",
        "Christopher",
        "Bouziane",
    ]
    lastnames = [
        "Cruise",
        "Simpson",
        "Brando",
        "Eastwood",
        "Wayne",
        "Hanks",
        "DiCaprio",
        "Newman",
        "Smith",
        "Reeves",
        "Anderson",
        "Deniro",
        "Pacino",
    ]
    bodies = {
        "phone": (
            "Lorem Ipsum #{} is simply dummy text of the printing and typesetting "
            "industry. Lorem Ipsum has been the industry's standard dummy text ever "
            "since the 1500s, when an unknown printer took a galley of type and "
            "scrambled it to make a type specimen book. It has survived not only five "
            "centuries, but also the leap into electronic typesetting, remaining "
            "essentially unchanged. It was popularised in the 1960s with the release "
            "of Letraset sheets containing Lorem Ipsum passages, and more recently "
            "with desktop publishing software like Aldus PageMaker including versions "
            "of Lorem Ipsum."
        ),
        "email": (
            "Lorem Ipsum #{} is simply dummy text of the printing and typesetting "
            "industry. Lorem Ipsum has been the industry's standard dummy text ever "
            "since the 1500s, when an unknown printer took a galley of type and "
            "scrambled it to make a type specimen book. It has survived not only five "
            "centuries, but also the leap into electronic typesetting, remaining "
            "essentially unchanged. It was popularised in the 1960s with the release "
            "of Letraset sheets containing Lorem Ipsum passages, and more recently "
            "with desktop publishing software like Aldus PageMaker including versions "
            "of Lorem Ipsum."
        ),
        "sms": (
            "Lorem Ipsum #{} is simply dummy text of the printing and typesetting "
            "industry. Lorem Ipsum has been the industry's standard dummy text ever "
            "since the 1500s, when an unknown printer took a galley of type and "
            "scrambled it to make a type specimen book. It has survived not only five "
            "centuries, but also the leap into electronic typesetting, remaining "
            "essentially unchanged. It was popularised in the 1960s with the release "
            "of Letraset sheets containing Lorem Ipsum passages, and more recently "
            "with desktop publishing software like Aldus PageMaker including versions "
            "of Lorem Ipsum."
        ),
    }
    messages = []
    for message_id in range(customer_id * 100, customer_id * 100 + 100):
        type_ = random.choice(types)
        d = datetime.now() - timedelta(days=random.randint(0, 30))
        firstname = random.choice(firstnames)
        lastname = random.choice(lastnames)
        messages.append(
            {
                "id": message_id,
                "customer_id": customer_id,
                "date": d,
                "type": type_,
                "contact": {
                    "firstname": firstname,
                    "lastname": lastname,
                    "phone": "06" + str(random.randint(10000000, 99999999)),
                    "email": "{}{}@gmail.com".format(firstname[0], lastname).lower(),
                },
                "subject": subjects[type_].format(message_id),
                "body": bodies[type_].format(message_id).strip(),
                "read": random.choice(read_status),
            }
        )
    return messages


CUSTOMERS, MESSAGES = _build_data()
