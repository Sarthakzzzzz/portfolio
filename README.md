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
├── requirements.txt     # Python dependencies
└── README.md           # Project documentation
```

## 🚀 Deployment

### PythonAnywhere Deployment

1. Upload files to PythonAnywhere
2. Install dependencies in console
3. Configure WSGI file
4. Set environment variables
5. Configure static files
6. Reload web app

Detailed deployment instructions available in the repository.

## 📧 Contact

- **Email**: sarthakpujari1970@gmail.com
- **LinkedIn**: [linkedin.com/in/sarthakzzzzz](https://www.linkedin.com/in/sarthakzzzzz/)
- **GitHub**: [github.com/Sarthakzzzzz](https://github.com/Sarthakzzzzz)
- **Portfolio**: [sarthakzzzzz.pythonanywhere.com](https://sarthakzzzzz.pythonanywhere.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**