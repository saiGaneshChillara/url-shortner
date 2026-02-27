# 🚀 URL Shortener — Clean Architecture (TypeScript)
Built as solution for https://roadmap.sh/projects/url-shortening-service

A production-ready URL Shortener built with:

- TypeScript
- Express
- Clean Architecture
- MongoDB
- PostgreSQL (Supabase)
- Runtime database switching via environment variables



---

## 📌 Features

- Create short URL
- Redirect to original URL
- Update URL
- Delete URL
- Access count tracking
- URL analytics endpoint
- Clean Architecture separation
- Switch between MongoDB and PostgreSQL without changing business logic

---

# 🏗 Architecture

This project follows **Clean Architecture principles**.

### Layer Structure

```
Domain → Application → Infrastructure → Presentation
```

### 🔹 Domain
- Contains business entity (`Url`)
- No dependency on frameworks or databases

### 🔹 Application
- Contains use cases
- Contains repository interface (`IUrlRepository`)
- Depends only on Domain

### 🔹 Infrastructure
- MongoDB implementation
- PostgreSQL implementation
- Implements repository interface
- Depends on Application layer

### 🔹 Presentation
- Express controllers
- Routes
- Handles HTTP only
- Calls use cases

---

# 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB (Mongoose)
- PostgreSQL (pg)
- Supabase (Hosted PostgreSQL)
- nanoid

---

# 📁 Project Structure

```
src/
 ├── domain/
 │    └── Url.ts
 │
 ├── application/
 │    ├── interfaces/
 │    │    └── IUrlRepository.ts
 │    └── usecases/
 │         ├── CreateUrl.ts
 │         ├── GetUrl.ts
 │         ├── UpdateUrl.ts
 │         ├── DeleteUrl.ts
 │         └── GetUrlDetails.ts
 │
 ├── infrastructure/
 │    ├── mongo/
 │    │    └── MongoUrlRepository.ts
 │    └── postgres/
 │         └── PostgresUrlRepository.ts
 │
 ├── presentation/
 │    ├── controllers/
 │    │    └── UrlController.ts
 │    └── routes/
 │         └── urlRoutes.ts
 │
 └── server.ts
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/saiGaneshChillara/url-shortner
cd url-shortener
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Environment File

Create a `.env` file in the root directory:

```
PORT=3000

# Choose database: "mongo" or "postgres"
DB_TYPE=postgres

# PostgreSQL (Supabase)
DATABASE_URL=your_postgres_connection_string

# MongoDB
MONGO_URI=your_mongo_connection_string
```

---

# 🗄 Database Setup

## 🟢 PostgreSQL (Supabase)

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  short_code VARCHAR(20) UNIQUE NOT NULL,
  access_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🟢 MongoDB

Database and collection are automatically created by Mongoose.

---

# ▶️ Run Project

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

Server runs at:

```
http://localhost:3000
```

---

# 📡 API Endpoints

---

## 🔹 Create Short URL

**POST /**

Body:

```json
{
  "url": "https://google.com"
}
```

Response:

```json
{
  "shortCode": "abc123",
  "url": "https://google.com"
}
```

---

## 🔹 Redirect

**GET /:code**

Redirects to original URL.

Example:

```
GET /abc123
```

---

## 🔹 Get URL Details

**GET /details/:code**

Response:

```json
{
  "shortCode": "abc123",
  "url": "https://google.com",
  "accessCount": 5,
  "createdAt": "2026-02-27T12:00:00.000Z"
}
```

---

## 🔹 Update URL

**PUT /:code**

```json
{
  "url": "https://youtube.com"
}
```

---

## 🔹 Delete URL

**DELETE /:code**

Response:

```
204 No Content
```

---

# 🔄 Runtime Database Switching

Switch database by changing `.env`:

```
DB_TYPE=postgres
```

or

```
DB_TYPE=mongo
```

No code changes required.

---

# 🧪 Testing Strategy

Because business logic depends only on `IUrlRepository`, we can:

- Mock repository
- Unit test use cases independently
- Test without real database

---

# 🚀 Future Improvements

- Add validation (Zod / class-validator)
- Add authentication
- Add rate limiting
- Add caching (Redis)
- Add Docker support
- Add CI/CD (GitHub Actions)
- Add migrations
- Add logging system

---

# 📚 Concepts Demonstrated

- Clean Architecture
- Repository Pattern
- Dependency Inversion Principle
- Dependency Injection
- Separation of concerns
- Runtime polymorphism

---

# 👨‍💻 Author

Ganesh Chillara 
Backend Developer