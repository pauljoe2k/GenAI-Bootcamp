import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import fetch from "node-fetch"

// Prefer Gemini if provided, else OpenAI; otherwise, return a mock response
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: "1mb" }))

app.get("/health", (_, res) => {
  res.json({ ok: true })
})

app.post("/api/rewrite", async (req, res) => {
  const { text, tone } = req.body || {}
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "'text' is required" })
  }
  const toneLabel = typeof tone === "string" ? tone : "Formal"

  try {
    const prompt = `Rewrite the following email to improve clarity, grammar, and structure while preserving meaning. Match the requested tone: ${toneLabel}.\n\nEmail:\n"""${text}"""\n\nReturn only the rewritten email.`

    if (GEMINI_API_KEY) {
      // Gemini API (Generative Language API)
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
      const geminiResp = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are an assistant that rewrites emails for professionalism and clarity.\n\n${prompt}` }]
            }
          ],
          generationConfig: { temperature: 0.4 }
        })
      })
      if (!geminiResp.ok) {
        const errText = await geminiResp.text().catch(() => "")
        return res.status(500).json({ error: `Gemini error: ${geminiResp.status} ${errText}` })
      }
      const geminiData = await geminiResp.json()
      const rewritten = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ""
      return res.json({ rewritten })
    }

    if (OPENAI_API_KEY) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are an assistant that rewrites emails for professionalism and clarity." },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
        }),
      })
      if (!response.ok) {
        const errText = await response.text().catch(() => "")
        return res.status(500).json({ error: `OpenAI error: ${response.status} ${errText}` })
      }
      const data = await response.json()
      const content = data?.choices?.[0]?.message?.content || ""
      return res.json({ rewritten: content })
    }

    // Fallback mock for local dev without any API key
    return res.json({ rewritten: `[${toneLabel}] ` + text.replace(/\s+/g, " ").trim() })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return res.status(500).json({ error: msg })
  }
})

const PORT = process.env.PORT || 5175
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})


