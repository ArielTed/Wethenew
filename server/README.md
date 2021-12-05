# API

---

## Start API

L'Api ( RESTFUL ) est sous Docker pour démarrer rapidement via la commande

```console
foo@bar:~$ docker-compose up --build
```

Une fois lancée l'Api sera disponible en localhost sur le port 8080.

### API Endpoints

Replace `API_URL` by the one provided or `http://localhost:8080`

- Get a list of all customer service administrators.

  - `curl ${API_URL}/customers`

- Details of each of the customer service administrators.

  - `curl ${API_URL}/customers/{CUSTOMER_ID}`

- List of all messages listed by the client (and pagination)

  - `curl ${API_URL}/customers/{CUSTOMER_ID}/messages`
  - `curl ${API_URL}/customers/{CUSTOMER_ID}/messages?page=2`
  - `curl ${API_URL}/customers/{CUSTOMER_ID}/messages?page=2&page_size=20`
  - `curl ${API_URL}/customers/{CUSTOMER_ID}/messages?page=2&page_size=20&sort=date,desc`

- Only one message details

  - `curl ${API_URL}/customers/{CUSTOMER_ID}/messages/1001`

- Update a message as "read" (data can only be `application/json`)
  - `curl -X PATCH -H "Content-Type: application/json" ${API_URL}/customers/101/messages/1001 -d '{"read":false}'` (explicit mark as unread)
