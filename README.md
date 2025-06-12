
# 🚀 Leadmint Backend Assignment

This is a backend API system for a platform that connects **publishers** and **advertisers** via app-based campaigns. It includes features such as user authentication (manual and Google OAuth), Google Play Store scraping, app addition, AWS S3 uploads, campaign creation, and click tracking.

---

## 🔧 Tech Stack

- **Node.js**, **Express.js**
- **MySQL** + **Sequelize ORM**
- **AWS S3** (file uploads)
- **Sendinblue** (email OTPs)
- **JWT** (authentication)
- **Google OAuth**
- **Postman** (API testing)

---

## 📁 Folder Structure

```
Leadmint_Backend_Assignment/
├── controllers/
├── routes/
├── models/
├── services/
├── middlewares/
├── config/
├── postman/
│   ├── leadmint.postman_collection.json
│   └── LMT_ENV.postman_environment.json
├── app.js
├── .env.example
├── package.json
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/SpNain/Leadmint-Backend-Assignment.git
cd Leadmint-Backend-Assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file using the provided `.env.example`:

```env

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=
PORT=3000

TOKEN_SECRET=

SENDINBLUE_API_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
S3_BUCKET_NAME=
```

### 4. Start the Server
```bash
npm start
```

> Ensure MySQL and your AWS/S3/Sendinblue settings are correctly configured.

---

## 🔐 Authentication Features

- **Manual Signup**
  - Requires `name`, `email`, `password`, `mobile`, `role`
  - Sends OTP to email (via Sendinblue)
  - Verifies OTP to activate account
- **Manual Login**
  - Returns JWT token on successful login
- **Google OAuth Login**
  - Accepts Google access token
  - Creates new user (without OTP) or logs in existing user

---

## 👨‍💼 Publisher App Management

| Feature       | Route                        | Notes                                 |
|---------------|------------------------------|----------------------------------------|
| Search App    | `GET /api/apps/search?query=...` | Scrapes Play Store using `google-play-scraper` |
| Add App       | `POST /api/apps`             | Accepts logo as file or URL, uploads to S3 |
| App Count     | `GET /api/apps/count`        | Returns total apps added by publisher |

---

## 💼 Advertiser Campaign Management

| Feature         | Route                      | Notes                                 |
|-----------------|----------------------------|----------------------------------------|
| Add App         | `POST /api/apps`           | Same as publisher                     |
| Create Campaign | `POST /api/campaigns`      | Upload logo + banner, store campaign details |
| Edit Campaign   | `PUT /api/campaigns/:id`   | Update all campaign fields and assets |

---

## 📈 Click Tracking

| Feature       | Route             | Description                          |
|---------------|------------------|--------------------------------------|
| Log Click     | `POST /api/click`| Accepts `campaignId` & `appId` and saves timestamped record |

---

## 🧪 Postman Collection

### 📂 Files in `postman/` Folder:
- `leadmint.postman_collection.json` – All API requests
- `LMT_ENV.postman_environment.json` – Contains `baseUrl`

### ✅ Steps to Use:
1. Import both files into Postman
2. Set environment `LMT_ENV`
3. Run requests like `/signup`, `/verify-otp`, `/login`, `/apps`, `/campaigns`, etc.
4. Use Bearer Token after login for protected routes

---

### 🌐 Live API Documentation (Postman Cloud)
You can view the full interactive documentation here:  
🔗 [View Postman Docs](https://documenter.getpostman.com/view/45807552/2sB2x6jr4c)

---

## 👥 Sample Roles

### 👤 Publisher (to test publisher APIs)
```json
{
  "name": "Pub User",
  "email": "pub@example.com",
  "password": "123456",
  "mobile": "9999999999",
  "role": "publisher"
}
```

### 👤 Advertiser (to test campaign features)
```json
{
  "name": "Adv User",
  "email": "adv@example.com",
  "password": "123456",
  "mobile": "8888888888",
  "role": "advertiser"
}
```

---

## 📌 Key Notes

- JWT token must be included in **Authorization: Bearer** header for protected routes.
- You can test `logo` and `banner` uploads using **form-data** in Postman.
- Google access tokens for `/google-auth` can be generated via [OAuth Playground](https://developers.google.com/oauthplayground).
