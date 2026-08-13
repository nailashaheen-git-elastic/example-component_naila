# PetStore API Component

## Description

[elastic.io](https://www.elastic.io) integration component that connects to the [PetStore API](https://petstore.elastic.io/docs/).

Demo server base URL: `https://petstore.elastic.io/v2`  
Demo API key: `secret` (use header `api-key`)

## Credentials

| Field | Required | Description |
|-------|----------|-------------|
| **API Base URI** | yes | e.g. `https://petstore.elastic.io/v2` |
| **API Key** | yes | Use `secret` for the demo PetStore server |

Credential verification calls `GET /user/me`.

## Actions

### Make Raw Request

Send a custom HTTP request to the PetStore API.

**Input:** Url, Method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), optional Request Body  
**Output:** Status Code, HTTP headers, Response Body

### Lookup Object By ID

Fetch a single object by ID.

| Object Type | API endpoint |
|-------------|--------------|
| Pets | `GET /pet/{id}` |
| Orders | `GET /store/order/{id}` |

**Input:** ID Value

### Upsert Object

Create or update a pet.

| Case | API call |
|------|----------|
| No ID | `POST /pet` (create) |
| With ID | `PUT /pet` (update) |

**Input:** Name, Status (`available`, `pending`, `sold`), optional ID

### Lookup Objects (plural)

Find pets by status.

**Configuration:** Pet Status (`available`, `pending`, `sold`)  
**API:** `GET /pet/findByStatus?status=...`  
**Output:** `{ results: [ ...pets ] }` when Emit all is selected

## Triggers

### Get Pets By Status (polling)

Polls PetStore and emits pets matching the selected status.

**Configuration:** Pet Status  
**API:** `GET /pet/findByStatus?status=...`  
**Output:** One message per pet

## Local development

### Requirements

- Node.js 16.x (or newer for local dev)
- npm
- Git Bash on Windows (for `npm test`)

### Install & test

```bash
npm install
npm test
```

### Manual test examples

```bash
# Verify credentials
npx ts-node -e "const verify = require('./verifyCredentials'); verify.call({ logger: console }, { url: 'https://petstore.elastic.io/v2', apiKey: 'secret' }).then(r => console.log(r));"

# Lookup pet by ID
npx ts-node -e "const action = require('./src/actions/lookupObjectById'); action.process.call({ logger: console }, { body: { idValue: '1' } }, { objectType: 'pet', url: 'https://petstore.elastic.io/v2', apiKey: 'secret' }).then(r => console.log(r.body));"
```

## Notes

- Auth header must be `api-key`, not `api_key`
- Some template actions (Delete Object, Lookup Object) are not yet adapted for PetStore
- Integration tests require a `.env` file with `API_BASE_URI` and `API_KEY`
