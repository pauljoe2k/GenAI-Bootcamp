# 📄 High-Level Design (HLD) — ClearMail

## 1. Project Title  
**ClearMail – AI Email Rewriter**

---

## 2. Team Members  
Paul (Team Leader)
Amit Yohan  
Ben Sibyy  
Fathima Sairah  
Sumeghna Banerjee  
Jyotika Upadhyay  

---

## 3. Problem Statement  
Many people struggle to write clear, professional, and well-structured emails. Common issues include unclear phrasing, grammatical errors, and inappropriate tone.  
**ClearMail** solves this by automatically rewriting emails into professional, polite, or friendly tones using AI, helping users communicate more effectively and save time.

---

## 4. Core Components  

### UI
- Built using **React.js**
- Simple text area for input, dropdown for tone selection (Formal / Polite / Friendly)
- Output section showing the rewritten email
- Minimal, clean design focused on readability and speed

### LLM API
- **OpenAI API (GPT-4/5)** integrated through a lightweight **Node.js backend**
- Receives the input email and user’s tone choice
- Returns a rewritten, grammatically-correct, and contextually accurate version

### Tools
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **AI Integration:** OpenAI API  
- **Version Control:** Git & GitHub  

---

## 5. LLM’s Primary Task  
To analyze the user’s email, understand context and intent, and **rewrite it** according to the selected tone (Formal, Polite, or Friendly) — improving clarity, grammar, and tone while preserving meaning.

---

## 6. Inputs and Outputs  

### Input
- User’s raw or unclear email text  
- Selected tone: *Formal / Polite / Friendly*

### Output
- Rewritten email maintaining the same message but with improved tone, grammar, and readability.

---

## 7. Expected Outcome  
Users can instantly convert any unclear or unpolished email into a well-written, professional message. The tool improves productivity, reduces miscommunication, and enhances the professionalism of daily communication.

---

## 8. System Diagram  

```
+-------------------------+
|       React Frontend    |
|  (User Input + Tone UI) |
+-----------+-------------+
            |
            v
+-------------------------+
|     Node.js Backend     |
|  - Handles API calls    |
|  - Sends request to LLM |
+-----------+-------------+
            |
            v
+-------------------------+
|       OpenAI API        |
|  (Rewrites Email)       |
+-----------+-------------+
            |
            v
+-------------------------+
|   React Output Screen   |
| (Displays rewritten msg)|
+-------------------------+
```

---

## 📁 GitHub Submission Folder Structure
```
/session-1-3/
 ├── hld.md
 ├── project_assets.txt
 └── system_prompt.txt
```
