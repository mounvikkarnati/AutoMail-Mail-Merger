# 📧 Mail Automation System

A full-stack web application that automates sending personalized emails using Excel data.
Built with **React, Node.js, Express**, and **Nodemailer**.

---

## 🚀 Features

* 📂 Upload Excel file with user data
* 🧠 Automatic data parsing & normalization
* ✉️ Send personalized emails using dynamic templates
* 🔄 Placeholder replacement (e.g., `{{name}}`, `{{rollnumber}}`)
* 📊 Live email logs (success / failure tracking)
* ⏳ Controlled email sending (delay to avoid spam limits)
* 👀 Real-time preview before sending

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS (custom modern UI)

### Backend

* Node.js
* Express.js
* Nodemailer
* Multer (file upload)
* XLSX (Excel parsing)

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   └── sendMailRoutes.js
│   ├── services/
│   │   └── mailService.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/mail-automation.git
cd mail-automation
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5001
```

Run backend:

```
npm start
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

App will run at:

```
http://localhost:3000
```

---

## 📊 How It Works

1. Upload Excel file
2. Backend parses data
3. Enter subject & template
4. Use placeholders like:

```
Hello {{name}},  
Your roll number is {{rollnumber}}.
```

5. Click **Send Emails**
6. View logs directly on UI

---

## 🧾 Example Excel Format

| Name            | RollNumber | Email Address                                 |
| --------------- | ---------- | --------------------------------------------- |
| Mounvik Karnati | 23BCE8843  | [example@gmail.com](mailto:example@gmail.com) |

---

## 📌 API Endpoints

### Upload Excel

```
POST /upload
```

### Send Emails

```
POST /send-mails
```

---

## 🔥 Future Improvements

* 📊 Progress bar for email sending
* 🔄 Real-time logs (WebSockets)
* ❌ Retry failed emails
* 📥 Export logs as CSV
* 🌐 Deployment (Render / Vercel)

---

## ⚠️ Notes

* Use **App Password** for Gmail (not your main password)
* Avoid sending too many emails quickly (use delay)
* Ensure Excel column names match placeholders

---

## 👨‍💻 Author

**Mounvik Karnati**
CSE @ VIT-AP

---

## ⭐ If you like this project

Give it a star ⭐ and share it!
