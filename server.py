import os
import smtplib
import ssl
import base64
import requests
from email.message import EmailMessage
from flask import Flask, render_template, request, redirect, flash, url_for
from pymongo import MongoClient
from dotenv import load_dotenv
from openai import OpenAI
load_dotenv()
app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

# --- ROUTES ---

mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/portfolio_db')
client = MongoClient(mongo_uri)
db = client.get_database()  # Connects to the database specified in the URI
contacts_collection = db.contacts
# Verify connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/projects')
def projects():
    return render_template('projects.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/submit_form', methods=['POST'])
def submit_form():
    data = request.form.to_dict()
    try:
        contacts_collection.insert_one(data)
    except Exception as e:
        print(f"Error saving contact: {e}")
    # send reply (best-effort) via SMTP SSL if SMTP credentials provided
    try:
        subject = os.getenv('REPLY_SUBJECT', 'Thanks for contacting us')
        body = f"Hi {data.get('name', 'there')},\n\nThanks for reaching out. We received your message:\n\n{data.get('message', '')}\n\nBest regards,\nSite Team"
        send_reply_email(data)
    except Exception as e:
        print(f"Warning: failed to send reply email: {e}")
    return redirect(url_for('thankyou'))


@app.route('/thankyou')
def thankyou():
    return render_template('thankyou.html')


def generate_openai_response(name: str, message: str) -> str:
    """Generate personalized email response using OpenAI"""
    openai_key = os.getenv('OPENAI_API_KEY')
    print(f"OpenAI API Key found: {bool(openai_key)}")  # Debug line
    if not openai_key:
        return f"Hi {name},\n\nThanks for reaching out! I received your message and will get back to you soon.\n\nBest regards,\nSarthak"

    # Read and parse resume from file
    try:
        with open('static/assets/resume/resume.txt', 'r', encoding='utf-8') as f:
            resume_content = f.read()
        
        # Extract clean resume information (removing LaTeX formatting)
        resume_info = """
Sarthak Pujari - Computer Engineering Student

Education:
- Bachelor of Engineering in Computer Engineering (2023-2027)
- Savitribai Phule Pune University (Modern Education Society's College Of Engineering, Pune)
- CGPA: 8.33

Technical Skills:
- Languages: C, C++, Python, Java, SQL
- Frameworks: Next.js 15, Spring Boot, Django, Flask
- Databases: MongoDB, MySQL
- Tools: Git/GitHub, Render, Postman, Docker
- AI/ML: spaCy, Scikit-learn
- Soft Skills: Teamwork, Collaboration, Mentorship

Key Projects:
1. ProgCorn (Next.js 15, TypeScript, Prisma, SQLite)
   - Full-stack competitive-programming resource hub
   - Auto-syncs contests from 50+ platforms via Clist.by API
   - JWT auth, bcrypt hashing, admin dashboard
   - 12+ Prisma schemas for content moderation
   - GitHub: https://github.com/Sarthakzzzzz/ProgCorn

2. Secure Notes Application (Java, Spring Boot, React, H2)
   - Full-stack secure note-taking app with Spring Security + JWT
   - Client-side encryption, RESTful APIs with Spring Data JPA
   - Responsive React frontend, deployed on Render
   - GitHub: https://github.com/Sarthakzzzzz/NotesApp

3. RateMyResume (Python, Django, spaCy, Pandas)
   - Automated resume scoring tool using NLP and TF-IDF
   - PDF/DOCX parsing with 15+ metrics (ATS compatibility, keyword match)
   - Streamlined data extraction and evaluation
   - GitHub: https://github.com/Sarthakzzzzz/RateMyResume

Experience:
- Technical Team Member at CodeStorm Club
- Conducted DSA workshops for 30+ students
- Mentored juniors in C++, Python, competitive programming
- Code review and debugging sessions
- Coordinated coding contests

Achievements:
- 1000+ problems solved across platforms
- Codeforces: Pupil rank (peak 1386) - https://codeforces.com/profile/Sarthakzzzzz
- CodeChef: 3-star (peak 1625) - https://www.codechef.com/users/sarthakzzzzz
- LeetCode: https://leetcode.com/u/sarthakzzzzz/
- Top 30% in College Programming Contest (600+ participants, solved 4/7 problems)
- Certified: The Complete Python Developer (Udemy) - Data Science, REST APIs & Automation

Contact Information:
- Email: sarthakpujari1970@gmail.com
- Phone: +91 87889 71047
- Location: Pune, India
- Portfolio: https://sarthakzzzzz.pythonanywhere.com/
- GitHub: https://github.com/Sarthakzzzzz
- LinkedIn: https://www.linkedin.com/in/sarthakzzzzz/
"""
    except Exception as e:
        print(f"Error reading resume file: {e}")
        # Fallback resume info
        resume_info = "Computer Engineering student with full-stack development and competitive programming experience."

    # Analyze recruiter information from email
    email_domain = "unknown"
    if '@' in message:
        try:
            email_parts = [part for part in message.split() if '@' in part]
            if email_parts:
                email_domain = email_parts[0].split('@')[1].replace(',', '').replace('.', ' ').title()
        except:
            pass

    recruiter_analysis = f"""
Recruiter Context:
- Contact Name: {name}
- Potential Company/Domain: {email_domain}
- Message Context: Analyze their specific inquiry and respond accordingly
"""

    prompt = f"""Write a comprehensive, professional, and personalized email response to {name} based on their message: "{message}"

{resume_info}

{recruiter_analysis}

Context: You are Sarthak Pujari, a passionate Computer Engineering student responding to someone who contacted you through your portfolio website.

Instructions:
- Write a detailed, thoughtful response (4-6 paragraphs)
- Be genuinely warm, enthusiastic, and professional
- Analyze their message carefully and address ALL points they mentioned
- Use specific details from your background that are relevant to their inquiry
- Reference specific projects (ProgCorn, Secure Notes App, RateMyResume) when relevant
- Mention competitive programming achievements if they're relevant to the inquiry
- If they ask about:
  * Skills/Technologies: Mention specific projects, experience levels, and learning journey
  * Job opportunities: Show genuine interest, mention relevant coursework, projects, and availability
  * Collaboration: Discuss your experience working in teams, mentoring, and project ideas
  * Technical questions: Provide helpful insights based on your experience
  * General inquiry: Share your passion for technology and current focus areas
- Include relevant links (GitHub repos, LinkedIn, Portfolio) when appropriate
- Show personality - mention your interests in competitive programming, problem-solving, etc.
- End with a clear call-to-action (suggest next steps, meeting, call, etc.)
- Sign off with "Best regards, Sarthak Pujari"

Tone: Enthusiastic, knowledgeable, approachable, and genuinely interested in helping/connecting"""

    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=openai_key,
        )
        
        completion = client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://sarthakpujari.com",
                "X-Title": "Sarthak Portfolio",
            },
            model="xiaomi/mimo-v2-flash:free",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=800,
            temperature=0.7
        )
        
        print(f"OpenRouter API response received successfully")
        return completion.choices[0].message.content.strip()
            
    except Exception as e:
        print(f"OpenRouter response generation failed: {e}")
    
    return f"Hi {name},\n\nThanks for reaching out! I received your message about: {message}\n\nI'll get back to you soon with a detailed response.\n\nBest regards,\nSarthak"


def send_reply_email(contact: dict):
    """Send a simple reply using smtplib + EmailMessage (Real Python style).

    Environment variables:
      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, SITE_OWNER_EMAIL
    """
    recipient = contact.get('email')
    if not recipient:
        raise ValueError('No recipient email provided')

    name = contact.get('name', '')
    message_text = contact.get('message', '')

    smtp_host = os.getenv('SMTP_HOST', 'localhost')
    smtp_port = int(os.getenv('SMTP_PORT', 587))
    smtp_user = os.getenv('SMTP_USER')
    smtp_pass = os.getenv('SMTP_PASS')
    from_email = os.getenv('FROM_EMAIL', 'no-reply@localhost')
    owner_email = os.getenv('SITE_OWNER_EMAIL')

    subject = os.getenv('REPLY_SUBJECT', 'Thanks for contacting us')
    body = generate_openai_response(name or 'there', message_text)

    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = recipient
    msg.set_content(body)

    if owner_email:
        notify = EmailMessage()
        notify['Subject'] = f"New contact form submission from {name or recipient}"
        notify['From'] = from_email
        notify['To'] = owner_email
        notify.set_content(
            f"Contact details:\n\nName: {name}\nEmail: {recipient}\nMessage:\n{message_text}")

    # If Gmail OAuth refresh token is provided, prefer XOAUTH2
    gmail_refresh = os.getenv('GMAIL_OAUTH_REFRESH_TOKEN')
    gmail_client_id = os.getenv('GMAIL_OAUTH_CLIENT_ID')
    gmail_client_secret = os.getenv('GMAIL_OAUTH_CLIENT_SECRET')
    if gmail_refresh and gmail_client_id and gmail_client_secret:
        # obtain access token
        access_token = get_gmail_access_token(
            gmail_refresh, gmail_client_id, gmail_client_secret)
        if access_token:
            # perform XOAUTH2 auth to SMTP
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.ehlo()
                try:
                    server.starttls(context=ssl.create_default_context())
                    server.ehlo()
                except Exception:
                    pass
                auth_string = build_xoauth2_string(from_email, access_token)
                code, resp = server.docmd('AUTH', 'XOAUTH2 ' + auth_string)
                if code != 235:
                    raise RuntimeError(
                        f'XOAUTH2 authentication failed: {code} {resp}')
                server.send_message(msg)
                if owner_email:
                    server.send_message(notify)
            return

    # Use SMTP_SSL for port 465, otherwise STARTTLS
    if smtp_port == 465:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context) as server:
            if smtp_user and smtp_pass:
                server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            if owner_email:
                server.send_message(notify)
        return

    # STARTTLS flow
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
        server.ehlo()
        try:
            server.starttls(context=context)
            server.ehlo()
        except Exception:
            pass
        if smtp_user and smtp_pass:
            server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        if owner_email:
            server.send_message(notify)


def get_gmail_access_token(refresh_token: str, client_id: str, client_secret: str) -> str:
    """Exchange a refresh token for an access token using Google's OAuth2 token endpoint."""
    token_url = 'https://oauth2.googleapis.com/token'
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token',
    }
    try:
        r = requests.post(token_url, data=data, timeout=10)
        r.raise_for_status()
        j = r.json()
        return j.get('access_token')
    except Exception as e:
        print(f"Error fetching Gmail access token: {e}")
        return None


def build_xoauth2_string(username: str, access_token: str) -> str:
    """Build base64-encoded XOAUTH2 initial client response."""
    auth_string = f'user={username}\x01auth=Bearer {access_token}\x01\x01'
    return base64.b64encode(auth_string.encode('utf-8')).decode('utf-8')


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
