FROM python:3.7.2

EXPOSE 8080
ENTRYPOINT python runserver.py

WORKDIR /usr/src/api

COPY requirements.txt ./
COPY runserver.py ./
COPY wtn_crm_api_frontend ./wtn_crm_api_frontend
COPY templates ./templates

RUN pip install --no-cache-dir -r requirements.txt
