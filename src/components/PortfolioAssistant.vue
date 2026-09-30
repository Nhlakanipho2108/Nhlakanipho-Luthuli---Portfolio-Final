<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { portfolioProfile, projectNotDocumented } from '../data/portfolio.js'

const welcomeText = "Hi! I'm Nhlaks AI.\nI'm the AI assistant for Nhlakanipho's portfolio. Ask me about his projects, technical skills, education, experience, or career interests."
const iconPaths = {
  assistant: ['M8 9h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z', 'M12 5v4', 'M10 14v.01', 'M14 14v.01', 'M10 17h4', 'M3 12h2M19 12h2'],
  briefcase: ['M3 8h18v12H3z', 'M8 8V5h8v3', 'M3 13h18', 'M10 13v2h4v-2'],
  projects: ['m4 7 8-4 8 4-8 4-8-4Z', 'm4 12 8 4 8-4', 'm4 17 8 4 8-4'],
  code: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm14 5-4 14'],
  education: ['m3 10 9-5 9 5-9 5-9-5Z', 'M7 12v5c3.2 2.2 6.8 2.2 10 0v-5', 'M21 10v6'],
  sparkle: ['M12 3v4m0 10v4m9-9h-4M7 12H3m15.36-6.36-2.83 2.83m-7.06 7.06-2.83 2.83m12.72 0-2.83-2.83M8.64 8.64 5.81 5.81'],
  terminal: ['M4 5h16v14H4z', 'm8 9 3 3-3 3', 'M13 15h3'],
  file: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M9 13h7', 'M9 17h7'],
  mail: ['M3 5h18v14H3z', 'm3 7 9 6 9-6'],
  external: ['M14 4h6v6', 'm20 4-9 9', 'M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6'],
  compass: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'm16 8-2.5 5.5L8 16l2.5-5.5L16 8Z'],
}
const suggestions = [
  { text: 'Why should I consider Nhlakanipho for a software developer role?', icon: 'briefcase' },
  { text: 'Show me his projects', icon: 'projects' },
  { text: 'What are his technical skills?', icon: 'code' },
  { text: 'Tell me about his education', icon: 'education' },
  { text: 'What AI experience does he have?', icon: 'sparkle' },
  { text: 'What technologies does he use?', icon: 'terminal' },
  { text: 'Tell me about his CV', icon: 'file' },
  { text: 'How can I contact him?', icon: 'mail' },
]
const categories = ['Web Development', 'AI', 'Backend', 'Database', 'Full Stack']
const messages = ref([{ role: 'assistant', text: welcomeText }])
const isOpen = ref(false)
const isLoading = ref(false)
const input = ref('')
const errorMessage = ref('')
const conversation = ref(null)
const messageInput = ref(null)
const launcher = ref(null)

const contactLinks = [
  { label: 'LinkedIn', href: portfolioProfile.links.linkedin, external: true, icon: 'external' },
  { label: 'GitHub', href: portfolioProfile.links.github, external: true, icon: 'code' },
  { label: 'Contact form', href: portfolioProfile.links.contact, icon: 'mail' },
  { label: 'Download CV', href: portfolioProfile.links.cv, icon: 'file' },
]

function projectMessage(project) {
  return {
    role: 'assistant',
    text: `${project.name}\n\nWhat it does: ${project.overview}\n\nTechnologies: ${project.technologies}\n\nKey features: ${project.features}\n\nMy contribution: ${project.contribution}\n\nWhat I learned: ${project.learning}`,
    links: project.url ? [{ label: project.name === 'AI-powered Portfolio' ? 'View Projects' : 'View Project', href: project.url, external: project.url.startsWith('http') }] : [],
  }
}

function recruiterSummary() {
  return {
    role: 'assistant',
    text: `Nhlakanipho Luthuli — Software Developer\n\nCore technologies: ${portfolioProfile.skills.join(', ')}.\n\nKey projects: ${portfolioProfile.projects.map((project) => project.name).join(', ')}.\n\nEducation: ${portfolioProfile.educationNote}\n\nInterests: ${portfolioProfile.interests.join(', ')}.\n\nCareer direction: seeking opportunities to grow through practical software and web development work. The portfolio documents project-based practice, not professional employment history.`,
    links: contactLinks,
  }
}

function localAnswer(question) {
  const text = question.toLowerCase()

  if (/^(explore|explore my work|what type of project)/.test(text)) {
    return { role: 'assistant', text: 'What type of project would you like to explore?', options: categories }
  }

  const category = categories.find((item) => text.includes(item.toLowerCase()))
  if (category) {
    const related = portfolioProfile.projects.filter((project) => project.categories.includes(category))
    return {
      role: 'assistant',
      text: `${category} projects (grouped by the project titles and information available):\n${related.map((project) => `• ${project.name}`).join('\n')}`,
      links: related.map((project) => ({ label: project.name, href: project.url || '/projects', external: Boolean(project.url?.startsWith('http')) })),
    }
  }

  if (/hire|recruit|consider.*role|software developer role|why.*(him|nhlakanipho)/.test(text)) return recruiterSummary()
  if (/contact|email|reach/.test(text)) {
    return { role: 'assistant', text: 'Use the portfolio contact form or Nhlakanipho’s professional profiles. No email address is listed in the portfolio.', links: contactLinks }
  }
  if (/cv|resume/.test(text)) {
    return { role: 'assistant', text: 'The portfolio has a downloadable CV on the About page. Use the button below to open it.', links: [{ label: 'Download CV', href: portfolioProfile.links.cv }] }
  }
  if (/education|degree|school|qualification|certificate/.test(text)) {
    return { role: 'assistant', text: portfolioProfile.educationNote }
  }
  if (/skill|technology|technologies|tech stack|what.*use/.test(text)) {
    return { role: 'assistant', text: `The portfolio profile includes: ${portfolioProfile.skills.join(', ')}. These are skills and areas of practice, not claims of professional experience.` }
  }
  if (/ai|generative|prompt/.test(text)) {
    return { role: 'assistant', text: `Nhlakanipho is interested in AI and Generative AI, and the portfolio lists Prompt Engineering among his skills. The certificates page also lists foundational Generative AI learning. Specific professional AI employment or project outcomes are not documented.` }
  }
  if (/project|safeher|safe her|hrms|scrap|youthconnect|portfolio/.test(text)) {
    const project = portfolioProfile.projects.find((item) => {
      const name = item.name.toLowerCase()
      return text.includes(name) || (name === 'safeher' && text.includes('safe her')) || (name === 'modern tech hrms' && text.includes('hrms')) || (name === 'web scraping analytics platform' && text.includes('scrap'))
    })
    if (project) return projectMessage(project)
    return {
      role: 'assistant',
      text: `Projects in the portfolio include ${portfolioProfile.projects.map((item) => item.name).join(', ')}. Choose a project to see its available details.`,
      links: [{ label: 'Browse projects', href: '/projects' }],
    }
  }

  if (/experience|career|interest|opportunit/.test(text)) {
    return { role: 'assistant', text: `Nhlakanipho is a software development student/developer based in ${portfolioProfile.location}. His career interests include ${portfolioProfile.interests.join(', ')}. The portfolio showcases practical project work but does not list professional employment history.` }
  }

  return null
}

async function submitQuestion(question = input.value) {
  const prompt = question.trim()
  if (!prompt || isLoading.value) return

  messages.value.push({ role: 'user', text: prompt })
  input.value = ''
  errorMessage.value = ''
  isLoading.value = true

  const answer = localAnswer(prompt)
  if (answer) {
    await new Promise((resolve) => window.setTimeout(resolve, 320))
    messages.value.push(answer)
    isLoading.value = false
    return
  }

  try {
    const history = messages.value
      .filter((message) => message.role === 'user' || message.role === 'assistant')
      .slice(-10)
      .map(({ role, text }) => ({ role, content: text }))
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'The assistant is temporarily unavailable.')
    messages.value.push({ role: 'assistant', text: result.reply })
  } catch (error) {
    errorMessage.value = error.message || 'The assistant is temporarily unavailable.'
    messages.value.push({ role: 'assistant', text: projectNotDocumented })
  } finally {
    isLoading.value = false
  }
}

function clearConversation() {
  messages.value = [{ role: 'assistant', text: welcomeText }]
  errorMessage.value = ''
  input.value = ''
  nextTick(() => messageInput.value?.focus())
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) closeAssistant()
}

function openAssistant() {
  isOpen.value = true
  nextTick(() => messageInput.value?.focus())
}

function closeAssistant() {
  isOpen.value = false
  nextTick(() => launcher.value?.focus())
}

watch(() => messages.value.length, async () => {
  await nextTick()
  if (conversation.value) conversation.value.scrollTop = conversation.value.scrollHeight
})

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <section class="assistant" aria-label="Nhlaks AI portfolio assistant">
    <Transition name="assistant-panel">
      <div v-if="isOpen" class="assistant-panel" role="region" aria-label="Chat with Nhlaks AI">
        <header class="assistant-header">
          <div class="assistant-brand">
            <span class="assistant-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path v-for="path in iconPaths.assistant" :key="path" :d="path" /></svg>
            </span>
            <div>
              <h2>Nhlaks AI</h2>
              <p>Your AI guide to Nhlakanipho's portfolio</p>
            </div>
          </div>
          <div class="header-actions">
            <button class="icon-button" type="button" aria-label="Clear conversation" title="Clear conversation" @click="clearConversation">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" /></svg>
            </button>
            <button class="icon-button" type="button" aria-label="Close assistant" title="Close assistant" @click="closeAssistant">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
        </header>

        <div ref="conversation" class="conversation" aria-live="polite" aria-relevant="additions text">
          <article v-for="(message, index) in messages" :key="index" class="message-row" :class="`message-${message.role}`">
            <span v-if="message.role === 'assistant'" class="message-avatar" aria-hidden="true">N</span>
            <div class="message-content">
              <p class="message-bubble">{{ message.text }}</p>
              <div v-if="message.links?.length" class="response-links">
                <a
                  v-for="link in message.links"
                  :key="link.label"
                  class="response-link"
                  :href="link.href"
                  :target="link.external ? '_blank' : undefined"
                  :rel="link.external ? 'noopener noreferrer' : undefined"
                >
                  <svg class="response-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path v-for="path in iconPaths[link.icon || 'external']" :key="path" :d="path" />
                  </svg>
                  {{ link.label }}
                </a>
              </div>
              <div v-if="message.options?.length" class="category-options" aria-label="Explore projects by category">
                <button v-for="option in message.options" :key="option" type="button" @click="submitQuestion(option)">{{ option }}</button>
              </div>
              <div v-if="index === 0 && messages.length === 1" class="suggestion-list" aria-label="Suggested questions">
                <button v-for="suggestion in suggestions" :key="suggestion.text" type="button" @click="submitQuestion(suggestion.text)">
                  <svg class="suggestion-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path v-for="path in iconPaths[suggestion.icon]" :key="path" :d="path" />
                  </svg>
                  <span>{{ suggestion.text }}</span>
                </button>
              </div>
            </div>
          </article>
          <div v-if="isLoading" class="message-row message-assistant" role="status" aria-label="Nhlaks AI is responding">
            <span class="message-avatar" aria-hidden="true">N</span>
            <div class="typing-indicator"><span></span><span></span><span></span><span class="sr-only">Nhlaks AI is typing</span></div>
          </div>
        </div>

        <div class="assistant-tools">
          <button type="button" class="tool-button" @click="messages.push(recruiterSummary())">
            <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="path in iconPaths.briefcase" :key="path" :d="path" /></svg>
            Generate Recruiter Summary
          </button>
          <button type="button" class="tool-button" @click="submitQuestion('Explore my work')">
            <svg class="tool-icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="path in iconPaths.compass" :key="path" :d="path" /></svg>
            Explore My Work
          </button>
        </div>

        <form class="composer" @submit.prevent="submitQuestion()">
          <label class="sr-only" for="assistant-message">Ask Nhlaks AI a question</label>
          <textarea
            id="assistant-message"
            ref="messageInput"
            v-model="input"
            rows="1"
            maxlength="1200"
            placeholder="Ask about projects, skills, or experience..."
            :disabled="isLoading"
            @keydown.enter.exact.prevent="submitQuestion()"
          ></textarea>
          <button class="send-button" type="submit" aria-label="Send message" :disabled="isLoading || !input.trim()">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14-7-4 14-3-6-7-1Zm7 1 7-8" /></svg>
          </button>
        </form>
        <p v-if="errorMessage" class="assistant-error" role="alert">{{ errorMessage }}</p>
      </div>
    </Transition>

    <button
      ref="launcher"
      class="assistant-launcher"
      type="button"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Close Nhlaks AI' : 'Open Nhlaks AI assistant'"
      @click="isOpen ? closeAssistant() : openAssistant()"
    >
      <svg v-if="!isOpen" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.5-.7L4 20l1.3-3.5A7.2 7.2 0 0 1 4 12c0-4.4 3.6-8 8-8s8 3.1 8 7.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      <span class="launcher-label">{{ isOpen ? 'Close chat' : 'Ask Nhlaks AI' }}</span>
    </button>
  </section>
</template>

<style scoped>
.assistant {
  --assistant-ink: #f8f6f8;
  --assistant-muted: #aaa5ad;
  --assistant-panel: #151318;
  --assistant-surface: #201d23;
  --assistant-line: rgba(255, 255, 255, 0.1);
  --assistant-pink: #ff3c79;
  --assistant-cyan: #76e0d0;
  color: var(--assistant-ink);
  font-family: 'Poppins', sans-serif;
}

.assistant-panel {
  position: fixed;
  z-index: 1100;
  right: 24px;
  bottom: 94px;
  display: flex;
  flex-direction: column;
  width: min(420px, calc(100vw - 32px));
  height: min(680px, calc(100dvh - 128px));
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 18px;
  background: radial-gradient(ellipse at 0 0, rgba(255, 60, 121, 0.12), transparent 42%), var(--assistant-panel);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55), 0 4px 20px rgba(0, 0, 0, 0.25);
}

.assistant-header {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--assistant-line);
  background: rgba(17, 15, 19, 0.76);
}

.assistant-brand { display: flex; align-items: center; gap: 11px; min-width: 0; }
.assistant-brand h2 { font-size: 15px; line-height: 1.4; }
.assistant-brand p { color: var(--assistant-muted); font-size: 11px; line-height: 1.4; }
.assistant-avatar, .message-avatar { display: grid; flex: 0 0 auto; place-items: center; color: #171217; font-weight: 700; }
.assistant-avatar { width: 42px; height: 42px; border-radius: 13px; color: #171217; background: linear-gradient(145deg, #ff75a1, var(--assistant-pink) 62%, #ff956c); }
.assistant-avatar svg { width: 23px; height: 23px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
.header-actions { display: flex; gap: 5px; }
.icon-button { display: grid; width: 36px; height: 36px; place-items: center; border: 0; border-radius: 9px; color: var(--assistant-muted); background: transparent; cursor: pointer; }
.icon-button:hover, .icon-button:focus-visible { color: white; background: var(--assistant-surface); }
.icon-button svg, .assistant-launcher svg, .send-button svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }

.conversation { display: flex; flex: 1 1 auto; flex-direction: column; gap: 16px; overflow: auto; padding: 18px 15px 14px; overscroll-behavior: contain; scrollbar-color: #514650 transparent; scrollbar-width: thin; }
.message-row { display: flex; align-items: flex-start; gap: 9px; max-width: 100%; }
.message-user { justify-content: flex-end; }
.message-avatar { width: 25px; height: 25px; margin-top: 2px; border: 1px solid rgba(255, 60, 121, 0.35); border-radius: 8px; color: var(--assistant-pink); background: rgba(255, 60, 121, 0.1); font-size: 12px; }
.message-content { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; max-width: calc(100% - 34px); }
.message-user .message-content { align-items: flex-end; max-width: 88%; }
.message-bubble { margin: 0; padding: 11px 13px; border: 1px solid var(--assistant-line); border-radius: 4px 13px 13px 13px; color: #eeeaf0; background: var(--assistant-surface); font-size: 12px; line-height: 1.65; white-space: pre-line; overflow-wrap: anywhere; }
.message-user .message-bubble { border-color: rgba(255, 60, 121, 0.24); border-radius: 13px 4px 13px 13px; color: #fff; background: linear-gradient(135deg, #b52456, #d83067); }
.suggestion-list { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
.suggestion-list button, .category-options button { max-width: 100%; padding: 7px 9px; border: 1px solid rgba(255, 60, 121, 0.32); border-radius: 9px; color: #eeeaf0; background: rgba(255, 60, 121, 0.07); cursor: pointer; font: inherit; font-size: 10px; line-height: 1.5; text-align: left; transition: background 150ms ease, border-color 150ms ease; }
.suggestion-list button { display: flex; align-items: flex-start; gap: 7px; }
.suggestion-icon { flex: 0 0 14px; width: 14px; height: 14px; margin-top: 1px; fill: none; stroke: var(--assistant-pink); stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.suggestion-list button:hover, .category-options button:hover, .suggestion-list button:focus-visible, .category-options button:focus-visible { border-color: var(--assistant-pink); background: rgba(255, 60, 121, 0.18); }
.category-options { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }
.response-links { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 9px; }
.response-link { display: inline-flex; align-items: center; gap: 5px; padding: 6px 9px; border: 1px solid rgba(118, 224, 208, 0.34); border-radius: 8px; color: var(--assistant-cyan); background: rgba(118, 224, 208, 0.06); font-size: 10px; text-decoration: none; }
.response-icon { flex: 0 0 13px; width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.response-link:hover, .response-link:focus-visible { background: rgba(118, 224, 208, 0.14); }
.typing-indicator { display: flex; align-items: center; gap: 4px; height: 34px; padding: 0 12px; border: 1px solid var(--assistant-line); border-radius: 4px 12px 12px 12px; background: var(--assistant-surface); }
.typing-indicator > span:not(.sr-only) { width: 5px; height: 5px; border-radius: 50%; background: var(--assistant-cyan); animation: typing 1.05s infinite ease-in-out; }
.typing-indicator > span:nth-child(2) { animation-delay: 130ms; }
.typing-indicator > span:nth-child(3) { animation-delay: 260ms; }
@keyframes typing { 0%, 60%, 100% { opacity: 0.35; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }

.assistant-tools { display: flex; flex: 0 0 auto; gap: 8px; overflow-x: auto; padding: 10px 14px; border-top: 1px solid var(--assistant-line); scrollbar-width: none; }
.assistant-tools::-webkit-scrollbar { display: none; }
.tool-button { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 6px; padding: 7px 9px; border: 1px solid var(--assistant-line); border-radius: 8px; color: #ded9df; background: transparent; cursor: pointer; font: inherit; font-size: 10px; }
.tool-icon { flex: 0 0 15px; width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.tool-button:hover, .tool-button:focus-visible { border-color: rgba(118, 224, 208, 0.55); color: var(--assistant-cyan); }
.composer { display: flex; flex: 0 0 auto; align-items: flex-end; gap: 8px; margin: 0 12px 12px; padding: 8px 8px 8px 12px; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 12px; background: #100f12; }
.composer:focus-within { border-color: rgba(255, 60, 121, 0.7); box-shadow: 0 0 0 3px rgba(255, 60, 121, 0.1); }
.composer textarea { flex: 1; max-height: 100px; resize: none; border: 0; outline: 0; color: white; background: transparent; font: inherit; font-size: 12px; line-height: 1.55; }
.composer textarea::placeholder { color: #8e8991; }
.send-button { display: grid; flex: 0 0 34px; width: 34px; height: 34px; place-items: center; border: 0; border-radius: 9px; color: #fff; background: var(--assistant-pink); cursor: pointer; }
.send-button:hover:not(:disabled) { background: #ff6493; }
.send-button:disabled { cursor: not-allowed; opacity: 0.4; }
.send-button svg { width: 18px; height: 18px; }
.assistant-error { flex: 0 0 auto; margin: -5px 14px 10px; color: #ff9daf; font-size: 10px; line-height: 1.5; }
.assistant-launcher { position: fixed; z-index: 1101; right: 22px; bottom: 20px; display: flex; align-items: center; justify-content: center; gap: 9px; min-width: 56px; height: 56px; padding: 0 16px; border: 1px solid rgba(255, 255, 255, 0.28); border-radius: 18px; color: white; background: linear-gradient(135deg, #f33370, #bf1f55); box-shadow: 0 8px 28px rgba(255, 0, 85, 0.32); cursor: pointer; transition: transform 160ms ease, box-shadow 160ms ease; }
.assistant-launcher:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255, 0, 85, 0.42); }
.assistant-launcher svg { width: 23px; height: 23px; }
.launcher-label { font-size: 12px; font-weight: 600; white-space: nowrap; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.assistant-panel-enter-active, .assistant-panel-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.assistant-panel-enter-from, .assistant-panel-leave-to { transform: translateY(10px) scale(0.98); opacity: 0; }

@media (max-width: 560px) {
  .assistant-panel { inset: max(10px, env(safe-area-inset-top)) 10px 78px; width: auto; height: auto; min-height: 0; max-height: none; border-radius: 15px; }
  .assistant-launcher { right: 14px; bottom: max(14px, env(safe-area-inset-bottom)); min-width: 52px; height: 52px; border-radius: 16px; }
  .launcher-label { font-size: 11px; }
  .conversation { padding: 15px 12px; }
  .assistant-header { min-height: 70px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
}
</style>