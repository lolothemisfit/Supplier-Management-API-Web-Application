# Supplier Management API Web Application

A full-stack travel supplier management application built using React, ASP.NET Core Web API, Entity Framework Core and SQL Server.

The application allows users to create, view and manage travel suppliers and the services they provide.

---

## Technology Stack

### Backend

* C#
* .NET 10
* ASP.NET Core Web API
* Entity Framework Core 10
* SQL Server
* Docker
* Swagger / OpenAPI

### Frontend

* React
* JavaScript
* Vite
* Tailwind CSS
* React Router
* React Icons

---

# 1. Prerequisites

Install the following before setting up the application:

* Git
* .NET 10 SDK
* Node.js and npm
* Docker
* Docker Compose

## Git

Download Git:

https://git-scm.com/downloads

Verify:

```bash
git --version
```

## .NET 10 SDK

Download the .NET 10 SDK:

https://dotnet.microsoft.com/download/dotnet/10.0

Verify:

```bash
dotnet --version
```

The project targets .NET 10.

## Node.js and npm

Download the Node.js LTS release:

https://nodejs.org/

npm is included with Node.js.

Verify:

```bash
node --version
npm --version
```

## Docker

Install Docker Desktop for Windows or macOS:

https://www.docker.com/products/docker-desktop/

For Linux:

https://docs.docker.com/engine/install/

Verify:

```bash
docker --version
docker compose version
```

Docker must be running before starting the SQL Server container.

---

# 2. Clone the Repository

```bash
git clone <repository-url>
cd Supplier-Management-API-Web-Application
```

Replace `<repository-url>` with the repository URL.

---

# 3. Configure SQL Server

SQL Server runs in Docker using the included `docker-compose.yml`.

The Docker Compose configuration already contains the SQL Server image, container configuration and port mapping. The only value that needs to be supplied locally is the SQL Server SA password.

## Create `.env`

Create a `.env` file in the project root, alongside `docker-compose.yml`.

Add:

```env
MSSQL_SA_PASSWORD=YourOwnStrongPassword
```

Use a strong password of your choice.

The `.env` file is excluded from source control because it contains a database password.

The password is supplied to SQL Server through Docker Compose:

```text
.env
    MSSQL_SA_PASSWORD=YourOwnStrongPassword
              ↓
      Docker Compose
              ↓
        SQL Server
```

Start SQL Server from the project root:

```bash
docker compose up -d
```

Check that the container is running:

```bash
docker compose ps
```

The SQL Server container should be running before continuing.


---

# 4. Start SQL Server

From the project root:

```bash
docker compose up -d
```

Check the container:

```bash
docker compose ps
```

The SQL Server container should be running before continuing.

---

# 5. Configure .NET User Secrets

The ASP.NET Core API reads the database connection string from:

```text
ConnectionStrings:DefaultConnection
```

The connection string is stored using .NET User Secrets so that the database password is not committed to the repository.

Navigate to the backend project:

```bash
cd backend/SupplierApi
```

If User Secrets have not already been initialised for the project:

```bash
dotnet user-secrets init
```

Set the database connection string:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=SupplierManagementDb;User Id=sa;Password=YourOwnStrongPassword;TrustServerCertificate=True;"
```

Replace `YourOwnStrongPassword` with the same password used in the `.env` file.

For example:

```text
.env

MSSQL_SA_PASSWORD=PasswordA
        │
        ▼
   SQL Server
        ▲
        │
DefaultConnection

Server=localhost,1433;
Database=SupplierManagementDb;
User Id=sa;
Password=PasswordA;
TrustServerCertificate=True;
```

The password in the User Secret must match the `MSSQL_SA_PASSWORD` value in `.env`.

Each developer or reviewer can use their own password. The original development password is not required.

Verify the User Secret:

```bash
dotnet user-secrets list
```

The following key should be present:

```text
ConnectionStrings:DefaultConnection
```

---

# 6. Create and Update the Database

The project uses Entity Framework Core migrations to create and update the SQL Server database.

From:

```text
backend/SupplierApi
```

run:

```bash
dotnet restore
dotnet ef database update
```

If the Entity Framework CLI is not installed:

```bash
dotnet tool install --global dotnet-ef
```

Then run:

```bash
dotnet ef database update
```

## Seed Data

The project includes supplier and service seed data in JSON format.

On a fresh database, the application reads the JSON seed data, deserializes it and inserts the records into the database.

This allows the seeded database to be recreated on another machine without using the original development database.

---

# 7. Run the Backend

From:

```text
backend/SupplierApi
```

run:

```bash
dotnet build
dotnet run
```

The API is available at:

```text
http://localhost:5288
```

Swagger is available at:

```text
http://localhost:5288/swagger
```

Swagger can be used to inspect and test the API independently from the frontend.

---

# 8. Run the Frontend

Open a new terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is available at:

```text
http://localhost:5173
```

---

# 9. Application Features

The application supports:

* View all travel suppliers
* View individual supplier details
* Create suppliers
* Add multiple services to a supplier
* Add multiple phone numbers
* Supplier categories
* Service pricing
* Service duration
* Frontend and backend validation
* Duplicate supplier detection
* Responsive design
* Swagger / OpenAPI documentation

---

# 10. Supplier Categories

Available supplier categories:

* Accommodations
* Activities
* Tours
* Transfers
* CarHires
* OtherServices

---

# 11. Services

Each supplier can have one or more services.

A service contains:

* Service name
* Service description
* Price
* Pricing unit
* Duration
* Duration unit

Available pricing units:

* PerPerson
* PerNight
* PerVehicle
* PerTreatment
* PerService

Available duration units:

* Day
* Hours
* Minutes

---

# 12. Multiple Phone Numbers

Multiple phone numbers can be added to a supplier.

Example:

```text
+27 81 457 5566
+27 12 345 6789
```

The frontend sends the numbers to the API as a comma-separated value:

```json
{
  "phoneNumber": "+27 81 457 5566, +27 12 345 6789"
}
```

The supplier details page displays the stored numbers individually.

Phone numbers use international format and the combined stored value is limited to 100 characters.

---

# 13. Validation and Duplicate Handling

Supplier and service data is validated on both the frontend and backend.

Validation includes:

* Required supplier fields
* Supplier field length limits
* Valid email format
* International phone number format
* At least one phone number
* At least one service
* Service field length limits
* Non-negative service prices
* Valid service duration
* Valid pricing and duration units
* Duplicate supplier detection

A supplier cannot be created if the same supplier name and category combination already exists.

The same supplier name can exist under a different category.

---

# 14. API Endpoints

## Suppliers

### Get all suppliers

```http
GET /api/Suppliers
```

### Get supplier by ID

```http
GET /api/Suppliers/{id}
```

### Create supplier

```http
POST /api/Suppliers
```

## Reference Data

### Get supplier categories

```http
GET /api/Suppliers/categories
```

### Get pricing units

```http
GET /api/Suppliers/pricingUnit
```

### Get duration units

```http
GET /api/Suppliers/durationUnit
```

---

# 15. Project Structure

```text
Supplier-Management-API-Web-Application/
│
├── backend/
│   └── SupplierApi/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Entities/
│       ├── Enums/
│       ├── Migrations/
│       ├── Services/
│       ├── Properties/
│       ├── Program.cs
│       └── SupplierApi.csproj
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 16. Application Architecture

The frontend and backend are separated:

```text
React
  │
  │ HTTP
  ▼
ASP.NET Core Web API
  │
  │ Entity Framework Core
  ▼
SQL Server
  │
  ▼
Docker
```

The backend uses a service layer between the controllers and Entity Framework Core.

The API can therefore be run and tested independently from the React frontend.

---

# 17. Docker Commands

Start SQL Server:

```bash
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

Stop SQL Server:

```bash
docker compose down
```

Restart SQL Server:

```bash
docker compose down
docker compose up -d
```

### Important

Avoid:

```bash
docker compose down -v
```

unless you intentionally want to remove the Docker volume and reset the database.

---

# 18. Troubleshooting

## SQL Server is not running

Check:

```bash
docker compose ps
```

If the container is not running:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs
```

---

## API cannot connect to SQL Server

Check that:

1. Docker is running.
2. The SQL Server container is running.
3. `.env` exists in the project root.
4. `SA_PASSWORD` is set in `.env`.
5. `ConnectionStrings:DefaultConnection` exists in User Secrets.
6. The password in `DefaultConnection` matches `SA_PASSWORD`.
7. Database migrations have been applied.

Check User Secrets:

```bash
dotnet user-secrets list
```

---

## Database has not been created or is out of date

From:

```text
backend/SupplierApi
```

run:

```bash
dotnet ef database update
```

If the Docker database needs to be restarted:

```bash
docker compose down
docker compose up -d
```

Then run:

```bash
dotnet ef database update
```

---

## Seed data is missing

Make sure the database was created successfully and the application's seed process has run.

For a fresh development database, apply the migrations:

```bash
dotnet ef database update
```

---

## Frontend cannot connect to the API

Make sure the API is running:

```bash
dotnet run
```

Check Swagger:

```text
http://localhost:5288/swagger
```

If Swagger is unavailable, check the API console for errors.

Then start or restart the frontend:

```bash
npm run dev
```

---

## Frontend dependencies are missing

From the frontend directory:

```bash
npm install
```

Then:

```bash
npm run dev
```

---

# 19. Stopping the Application

Stop the React development server:

```text
Ctrl + C
```

Stop the ASP.NET Core API:

```text
Ctrl + C
```

Stop SQL Server:

```bash
docker compose down
```

Using `docker compose down` keeps the Docker volume and its database data.

---

# 20. Security

Database credentials are kept outside the repository.

The following should not be committed:

```text
.env
.NET User Secrets
database passwords
```

Each developer or reviewer can create their own SQL Server password.

The password used in `.env` must match the password in that environment's `ConnectionStrings:DefaultConnection` User Secret.

The application does not require the original developer's database credentials to be run on another machine.

---

## Application URLs

| Application      | URL                             |
| ---------------- | ------------------------------- |
| React Frontend   | `http://localhost:5173`         |
| ASP.NET Core API | `http://localhost:5288`         |
| Swagger          | `http://localhost:5288/swagger` |
