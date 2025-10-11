
# ClearMail – AI Email Rewriter

## Problem Statement
Writing clear and professional emails is difficult for many people, especially students, job seekers, and non-native English speakers. Emails often sound unprofessional, overly casual, or unclear, causing confusion and missed opportunities.  

ClearMail addresses this by using AI to instantly rewrite emails in a clear, polite, and grammatically correct tone.

## Goal
Create a lightweight web app that helps users write better emails using an AI model capable of understanding tone, clarity, and structure.

## How It Works
1. **User Input**: User types or pastes email text and selects a tone (Formal, Polite, Friendly).  
2. **API Request**: Frontend sends the text and tone to the backend API.  
3. **AI Processing**: Node.js backend forwards the request to OpenAI GPT model for rewriting.  
4. **Response Display**: Backend returns the rewritten text and frontend displays it to the user.

### System Workflow
```
User (Browser)
     ↓
React Frontend
     ↓
Node.js Backend (Express)
     ↓
OpenAI GPT API
     ↓
Rewritten Email → Frontend → User
```

## Tech Stack
| Layer       | Technology          | Purpose                                      |
|------------|-------------------|----------------------------------------------|
| Frontend   | React (Vite)       | User interface, input form, result display  |
| Styling    | Tailwind CSS       | Clean and responsive UI                     |
| Backend    | Node.js + Express  | API handling and communication with AI      |
| AI Model   | OpenAI GPT-3.5-Turbo | Rewriting and tone adjustment              |
| HTTP Client| Axios              | Making API calls from backend               |
| Environment| dotenv             | Handling API keys securely                  |
| CORS       | Express-CORS       | Enables frontend-backend communication      |

## Example Usage
**Input:**  
```
hey, can u send me the report? also we need to discuss tomorrow’s meeting.
```
**Tone:** Formal  

**Output:**  
```
Hi, could you please send me the report? Also, let’s schedule a time to discuss tomorrow’s meeting.  
Thank you.
```

## Real-World Impact
- Helps non-native speakers write professional emails  
- Saves time by avoiding manual proofreading  
- Useful for students, freelancers, and professionals  
- Can be extended for cover letters, LinkedIn messages, and customer support responses

## Future Enhancements
- Add grammar feedback highlights  
- Support for multiple languages  
- Store user rewrite history  
- Add voice-to-email input

## Built With
- JavaScript (ES6)  
- React + Vite  
- Node.js + Express  
- OpenAI API

## Summary
ClearMail bridges the communication gap by turning rough, unclear text into polished, professional emails using modern web technologies and generative AI.

