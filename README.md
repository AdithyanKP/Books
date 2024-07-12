# Books

## Overview
Books app
 
## Features

1. **Add Book details**
2. **View Added Books (Paginated View )**
3. **Search Book by name and description**
 
## Prerequisites

1. **Node JS and npm Installed on your machine**.

2. **PostgreSQL Installed on you machine**
.
## Technologies Used

- **frontend**: React,Vite,Tailwind CSS
- **backend**: Node.js, Express ,Psql ,Prisma, Typescript

### backend

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/AdithyanKP/Books.git>
   cd backend
  
2. **Install Dependancies**:
   ```bash
   npm i

3. **Set up the database**: 
   - **Ensure PostgreSQL is running on your machine**
   - **Add .env file with your database connection details located in  ( /backend /src /prisma )**

4. **Genrate Prisma Client**: 
   ```bash
   cd  src/prisma
   
   npx prisma generate


5. **Push the Prisma schema to the database**: 
    ```bash
   cd src/prisma
   
   npx prisma db push
   
  
6. **Build Application**:
   ```bash
   npm run build
   
7. **Run Application**:
   ```bash
   npm run start
   
 ### frontend

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/AdithyanKP/Books.git>
   cd frontend
  
2. **Install Dependancies**:
   ```bash
   npm i
   
3. **Add env in .env file**:
   ```bash
   
    VITE_BACKEND_BASE_URL= 'http://localhost:4001/api/'
  
3. **Run Application**:
   ```bash
   npm run dev