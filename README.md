# AI-Powered Portfolio Website

A modern Flask-based portfolio website with intelligent email responses powered by AI.

## 🚀 Features

- **Responsive Design**: Modern, mobile-friendly portfolio layout
- **AI Email Responses**: Intelligent, personalized email replies using OpenRouter API
- **Contact Management**: MongoDB integration for storing contact submissions
- **Email Integration**: Gmail SMTP for reliable email delivery
- **Resume Integration**: Dynamic resume context for AI responses

## 🛠️ Tech Stack

- **Backend**: Flask, Python
- **AI**: OpenAI SDK with OpenRouter (Xiaomi MiMo v2 Flash)
- **Database**: MongoDB
- **Email**: Gmail SMTP
- **Frontend**: HTML5, CSS3, JavaScript
- **Deployment**: PythonAnywhere ready

## 📋 Prerequisites

- Python 3.8+
- MongoDB account (MongoDB Atlas recommended)
- Gmail account with App Password
- OpenRouter API key

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sarthakzzzzz/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   Create a `.env` file with:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   FROM_EMAIL=your-email@gmail.com
   SITE_OWNER_EMAIL=your-email@gmail.com
   REPLY_SUBJECT=Thanks for contacting us!
   OPENAI_API_KEY=your-openrouter-api-key
   MONGO_URI=your-mongodb-connection-string
   SECRET_KEY=your-secret-key
   ```

4. **Run the application**
   ```bash
   python server.py
   ```

5. **Visit** `http://localhost:5000`

## 🤖 AI Email System

The portfolio features an intelligent email response system that:

- Analyzes incoming messages using AI
- Generates personalized responses based on resume context
- References specific projects and achievements
- Provides relevant GitHub links and contact information
- Maintains professional yet enthusiastic tone

## 📁 Project Structure

```
portfolio/
├── static/
│   ├── assets/
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # JavaScript files
│   │   ├── resume/       # Resume files
│   │   └── webfonts/     # Font files
│   └── images/           # Images and icons
├── templates/            # HTML templates
├── server.py            # Main Flask application
├── flask_app.py         # WSGI file for PythonAnywhere
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (not in repo)
├── .gitignore          # Git ignore file
└── README.md           # Project documentation
```

## 🚀 Deployment

### PythonAnywhere Deployment

1. **Upload Files**
   - Upload all project files to `/home/yourusername/mysite/`
   - Or clone from GitHub: `git clone https://github.com/Sarthakzzzzz/portfolio.git mysite`

2. **Install Dependencies**
   ```bash
   cd /home/yourusername/mysite
   pip3.10 install --user -r requirements.txt
   ```

3. **Configure WSGI File**
   - Go to Web tab in PythonAnywhere dashboard
   - Set source code path: `/home/yourusername/mysite`
   - Set WSGI configuration file: `/var/www/yourusername_pythonanywhere_com_wsgi.py`
   - Replace content with:
   ```python
   import sys
   import os
   
   path = '/home/yourusername/mysite'
   if path not in sys.path:
       sys.path.insert(0, path)
   
   from server import app as application
   ```

4. **Environment Variables**
   - Create `.env` file in `/home/yourusername/mysite/`
   - Add all required environment variables

5. **Static Files**
   - URL: `/static/`
   - Directory: `/home/yourusername/mysite/static/`

6. **Reload Web App**
   - Click "Reload" button in Web tab

## 📧 Contact

- **Email**: sarthakpujari1970@gmail.com
- **LinkedIn**: [linkedin.com/in/sarthakzzzzz](https://www.linkedin.com/in/sarthakzzzzz/)
- **GitHub**: [github.com/Sarthakzzzzz](https://github.com/Sarthakzzzzz)
- **Portfolio**: [sarthakzzzzz.pythonanywhere.com](https://sarthakzzzzz.pythonanywhere.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**