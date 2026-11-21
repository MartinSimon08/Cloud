# FoodHub infra (AWS SAM)

API Gateway (HTTP API) + 2 Lambda functions (Node 20 + TypeScript) for
restaurant/menu CRUD, authenticated with an existing Cognito User Pool and
backed by an existing MongoDB Atlas cluster. Region: **us-east-2**.

This stack does **not** create the Cognito User Pool or the MongoDB cluster —
both already exist and are referenced, not managed, by this template.

## 0. Prerequisites

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed locally.
- An IAM **access key** (Access Key ID + Secret Access Key) for a scoped IAM
  user — **never use the AWS root account's credentials** for this. If you
  only have a root password, create an IAM user first (IAM console → Users →
  Add user → Programmatic access / "Create access key" in Security
  credentials), and use that user from here on.
- Node.js 20+ locally (for `npm install` / `tsc` / esbuild bundling).

```bash
aws configure
# Access Key ID / Secret Access Key: from the IAM user above (not root)
# Default region: us-east-2
```

## 1. Confirm the existing Cognito User Pool

In the Cognito console, open the existing pool and confirm:
- Sign-in option is **email**.
- **Auto-verify email** is enabled (new users get a verification code by email).

Note the **User Pool ID** and the **App Client ID** — you'll pass them as
parameters on deploy.

## 2. Confirm MongoDB Atlas network access

In Atlas, under Network Access, confirm `0.0.0.0/0` is allowed. Lambda
functions outside a VPC have no fixed outbound IP, so this is the accepted
free-tier tradeoff (no VPC/NAT Gateway for this project). Also confirm the
existing DB user has read/write access to the `foodhub` database.

## 3. Store the Mongo connection string in SSM (never in the repo)

```bash
aws ssm put-parameter \
  --name /foodhub/mongodb-uri \
  --type SecureString \
  --value "<your mongodb+srv:// connection string>" \
  --region us-east-2
```

The template references this via a `{{resolve:ssm-secure:...}}` dynamic
reference, which CloudFormation resolves to plaintext **at deploy time**
using your own `aws configure` credentials — the Lambda execution role never
needs `ssm:GetParameter`/`kms:Decrypt` permissions, only your deploying user
does (a normal IAM user already has this via the default SSM key).

If you ever rotate the Mongo password, re-run `put-parameter` (it creates a
new version) and bump the version number in `template.yaml`
(`/foodhub/mongodb-uri:1` → `:2`).

## 4. Install Lambda dependencies and build

```bash
cd infra
npm install
npm run typecheck   # tsc --noEmit
sam build
```

## 5. Deploy

```bash
sam deploy --guided --region us-east-2
```

When prompted, provide:
- `ExistingUserPoolId` — the Cognito User Pool ID from step 1.
- `ExistingUserPoolClientId` — the App Client ID from step 1.
- `AllowedWebOrigin` — your production frontend origin (e.g. the Vercel URL),
  or leave the `http://localhost:3000` default for local-only testing.

`sam deploy --guided` writes your answers to `samconfig.toml` so subsequent
deploys can just be `sam deploy`.

## 6. Wire up the frontend

Copy the stack outputs into `frontend/.env.local` (local dev) and into the
Vercel project's environment variables (production):

```
NEXT_PUBLIC_COGNITO_USER_POOL_ID=<UserPoolId output / from step 1>
NEXT_PUBLIC_COGNITO_CLIENT_ID=<UserPoolClientId output / from step 1>
NEXT_PUBLIC_COGNITO_REGION=us-east-2
NEXT_PUBLIC_API_BASE_URL=<HttpApiUrl output>
NEXT_PUBLIC_IMAGES_BASE_URL=<ImagesBucketUrl output>
```

Deployed values for this stack (account `229251310842`, region `us-east-2`):

```
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-2_p38HjKWPB
NEXT_PUBLIC_COGNITO_CLIENT_ID=5912bg2v60apah89ssc8kglp1
NEXT_PUBLIC_COGNITO_REGION=us-east-2
NEXT_PUBLIC_API_BASE_URL=https://y8zxcm48j9.execute-api.us-east-2.amazonaws.com
NEXT_PUBLIC_IMAGES_BASE_URL=https://foodhub-images-229251310842.s3.us-east-2.amazonaws.com
```

Production frontend: https://foodhub-silk-two.vercel.app (Vercel project
`martin-simons-projects/foodhub`). `AllowedWebOrigin` on this stack is set to
that URL (plus `http://localhost:3002` for local dev against this same
backend) — redeploy with a new `AllowedWebOrigin` if the Vercel URL changes.

A one-off migration (`frontend/scripts/migrate-to-cognito.mjs`) moved the
pre-existing local-auth users to this Cognito pool and their data's `ownerId`
fields to the new Cognito `sub`, and moved existing images from Mongo into
the `ImagesBucket`. It's idempotent but only needs to run once — already run
against this database.

## 7. Create indexes (once)

Connect with `mongosh` or MongoDB Compass to the existing cluster and run:

```js
db.users.createIndex({ cognitoSub: 1 }, { unique: true });
db.restaurants.createIndex({ ownerId: 1 });
db.menus.createIndex({ restaurantId: 1 });
db.menus.createIndex({ ownerId: 1 });
```

## API routes

All routes require `Authorization: Bearer <Cognito ID token>` (not the access
token — only the ID token carries the `email` claim).

| Method | Path                        | Description                         |
|--------|-----------------------------|--------------------------------------|
| GET    | `/restaurants`              | List the caller's restaurants        |
| POST   | `/restaurants`               | Create a restaurant                  |
| GET    | `/restaurants/{id}`          | Get one (must be owner)              |
| PUT    | `/restaurants/{id}`          | Update one (must be owner)           |
| DELETE | `/restaurants/{id}`          | Delete one + cascade its menus       |
| GET    | `/restaurants/{id}/menus`    | List menus of a restaurant           |
| POST   | `/restaurants/{id}/menus`    | Create a menu under a restaurant     |
| GET    | `/menus/{menuId}`            | Get one menu (must be owner)         |
| PUT    | `/menus/{menuId}`            | Update a menu (name/description/items) |
| DELETE | `/menus/{menuId}`            | Delete a menu                        |

Menu items are embedded in the menu document (`items: []`) — there is no
separate items endpoint; editing a menu's items is a `PUT` on the whole menu.
