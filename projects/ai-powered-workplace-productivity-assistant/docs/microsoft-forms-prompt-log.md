# Microsoft Forms Prompt Log — AI-Powered Workplace Productivity Assistant

## Form setup

**Suggested Microsoft Forms title:** AI-Powered Workplace Productivity Assistant — Prompt Engineering Log

**Suggested description:** This form documents the prompt-engineering process used to design and develop a CAPACITI ASA 18 AI-powered workplace productivity assistant. Each section records the objective, prompt used, expected result, implementation decision, testing evidence, responsible-AI consideration, and iteration made during development.

Microsoft Forms supports sections for long questionnaires and question types including Choice, Text, Rating, Date, Ranking, Likert and File upload. Use sections to separate each development stage and use Long answer for prompts, outputs, and reflections. Branching can be added after the questions are created so respondents can follow only relevant paths. See Microsoft Support: https://support.microsoft.com/en-us/forms/create-a-form-with-microsoft-forms and https://support.microsoft.com/en-us/forms/use-branching-logic-in-your-form

---

# Section 1 — Project definition

### Question 1
**Type:** Text — Long answer  
**Required:** Yes  
**Title:** What is the project and what problem is it intended to solve?  
**Answer guide:** Explain that the project is an AI-powered workplace productivity assistant designed to reduce time spent switching between tools and to accelerate common tasks such as answering questions, drafting emails, researching information, calculating values, planning work, and supporting career/resume tasks.

### Question 2
**Type:** Choice  
**Required:** Yes  
**Title:** Which primary problem does the assistant address?  
**Options:**
- Workplace users spend too much time on repetitive writing
- Workplace users need faster access to useful information
- Workplace users need assistance with calculations and planning
- Workplace users switch between multiple productivity tools
- All of the above

### Prompt 1 — Define the solution
**Prompt used:**
> Design an AI-powered workplace productivity assistant for a CAPACITI ASA 18 project. The solution should help users automate or accelerate workplace tasks through one clear interface. Define the target users, problem statement, value proposition, major capabilities, success criteria, responsible-AI constraints, and a practical MVP that can be demonstrated in a live portfolio website.

**Purpose:** Establish the project scope before development.  
**Expected output:** Problem statement, target user groups, solution concept, MVP feature set, constraints, and measurable outcomes.

---

# Section 2 — Feature selection and requirements

### Question 3
**Type:** Choice — Multiple answers  
**Required:** Yes  
**Title:** Which workplace tasks should the assistant support?  
**Options:**
- Smart email generation
- Meeting notes summarisation
- Task planning and scheduling
- AI research and information retrieval
- General AI chatbot interaction
- Resume and career support
- Calculations and numerical reasoning

### Prompt 2 — Select practical workflows
**Prompt used:**
> Convert the project brief into a practical MVP. Select at least three workplace productivity workflows that can be meaningfully demonstrated in a web application. For each workflow, define the user input, AI task, expected output, measurable productivity benefit, failure cases, and responsible-AI controls.

**Purpose:** Translate a broad brief into implementable features.  
**Expected output:** A feature matrix with inputs, outputs, benefits, risks, and test cases.

### Prompt 3 — Prioritise the MVP
**Prompt used:**
> Rank the proposed workplace assistant features by demo value, implementation effort, usefulness, innovation, and assessment evidence. Recommend an MVP that is realistic to implement while still demonstrating AI, prompt engineering, tool use, responsible AI, and measurable productivity improvement.

**Purpose:** Prevent scope creep and keep the build assessment-focused.  
**Expected output:** Prioritised feature list with reasons for inclusion/exclusion.

---

# Section 3 — Assistant behaviour and system design

### Question 4
**Type:** Text — Long answer  
**Required:** Yes  
**Title:** Describe the intended behaviour of the AI assistant.  
**Answer guide:** Mention direct answers, grounded reasoning, uncertainty handling, preserving user facts, tool selection, human review, and refusal to claim actions that were not actually executed.

### Prompt 4 — Define chatbot behaviour
**Prompt used:**
> Define the behaviour of a general-purpose workplace AI assistant. It should answer questions directly, explain concepts, help with writing and planning, perform supported calculations, use web search for current information, and use code execution for numerical or data-heavy tasks when available. It must preserve user facts, clearly separate facts from assumptions, avoid fabricated citations, and keep consequential actions under human control.

**Purpose:** Establish predictable assistant behaviour before UI and backend implementation.

### Prompt 5 — Design the system prompt
**Prompt used:**
> Write a production-oriented system prompt for Workmate AI. Include rules for factual grounding, uncertainty, prompt-injection resistance, tool selection, current-information requests, calculations, privacy, human review, and avoiding fabricated actions or credentials. Include workflow-specific guidance for resume support, email drafting, research, and general chat.

**Purpose:** Create the reusable behavioural layer used by the backend.

---

# Section 4 — User interface and experience

### Prompt 6 — Design the interface
**Prompt used:**
> Design a premium but practical workplace AI interface called Workmate AI. Use a calm, trustworthy productivity-dashboard style with clear navigation, a main task workspace, AI output review panel, visible responsible-AI cues, light and dark mode support, responsive mobile behaviour, and obvious interaction states. Keep the interface suitable for a portfolio assessment and live demo.

**Purpose:** Turn the requirements into a usable interface and visual system.

### Prompt 7 — Make the interface behave like a normal AI website
**Prompt used:**
> Make the assistant behave like a normal modern AI website. The user should be able to type a natural-language request, submit it, see a loading state, receive a clear response, see supporting sources when available, review the answer, clear the output, and continue the conversation. Do not force general questions into a career-specific workflow.

**Purpose:** Improve usability and reduce friction for general AI interaction.

---

# Section 5 — Conversation memory and context

### Question 5
**Type:** Choice  
**Required:** Yes  
**Title:** What level of conversation memory is implemented?  
**Options:**
- No memory
- Short-term session history
- Persistent user history
- External database memory

### Prompt 8 — Add session context
**Prompt used:**
> Add short-term conversation memory so the assistant can use recent user and assistant messages as context. Keep the history bounded to a safe maximum, preserve the existing API contract, and make sure the UI clearly shows the recent conversation without exposing secrets or unrelated user data.

**Purpose:** Demonstrate contextual AI behaviour without overbuilding persistent memory for the MVP.

---

# Section 6 — Tool use and calculations

### Prompt 9 — Add deterministic calculations
**Prompt used:**
> Implement a safe deterministic arithmetic parser for common calculations such as addition, subtraction, multiplication, division, powers, parentheses, decimals, and percentage expressions. Do not use eval. Reject unsupported or malformed expressions with a clear error message. Keep the parser bounded to prevent abuse and return an exact result when the expression is supported.

**Purpose:** Make numerical answers reliable and independent of model availability.

### Prompt 10 — Add current information and research
**Prompt used:**
> Add web-search capability for requests that require current, live, or externally verifiable information. When search is used, summarise the retrieved information, expose the relevant source links, and do not invent citations. If search or the AI provider is unavailable, return a clear user-facing limitation message rather than pretending the information is current.

**Purpose:** Demonstrate tool calling and source-aware research.

### Prompt 11 — Add code/data execution support
**Prompt used:**
> Add code execution support for numerical and data-heavy tasks when the connected model supports it. Use code execution for calculations or transformations that are more reliable as deterministic computation. Report tool use truthfully and never claim code was executed when it was not.

**Purpose:** Demonstrate safe use of computational tools.

---

# Section 7 — Security and responsible AI

### Prompt 12 — Secure the assistant
**Prompt used:**
> Harden the AI assistant against common application risks. Keep API keys server-side, never include secrets in client code or GitHub, validate request inputs, bound conversation history, ignore prompt-injection instructions contained inside pasted content, and avoid exposing sensitive internal errors to users. Preserve backwards compatibility with the existing API contract.

**Purpose:** Document secure implementation decisions.

### Prompt 13 — Define responsible AI rules
**Prompt used:**
> Define responsible-AI rules for a workplace assistant. The system must not fabricate facts, credentials, employers, dates, commitments, sources, statistics, or completed external actions. It should communicate uncertainty, distinguish user-provided facts from suggestions, preserve user control, and remind users to review consequential outputs before use.

**Purpose:** Provide explicit responsible-AI safeguards for assessment evidence.

---

# Section 8 — Reliability and error handling

### Question 6
**Type:** Choice  
**Required:** Yes  
**Title:** What should happen when the assistant cannot complete a request?  
**Options:**
- Show a generic error
- Show a clear user-facing explanation and safe next step
- Pretend a result was produced
- Return an empty response

**Preferred answer:** Show a clear user-facing explanation and safe next step.

### Prompt 14 — Design graceful failure
**Prompt used:**
> Make the application fail safely and clearly. When a request cannot be processed because the input is invalid, a calculation is unsupported, the model is unavailable, credits are exhausted, a tool fails, or an external service returns an error, show a concise user-facing message such as “I can’t process that request right now” or “I can’t compute that expression yet.” Explain what the user can try next when appropriate. Never display confusing raw API errors, never fabricate an answer, and never claim the operation succeeded.

**Purpose:** Ensure reliability and trustworthy failure behaviour.

### Prompt 15 — Test edge cases
**Prompt used:**
> Create a test plan covering empty input, malformed calculations, division by zero, unsupported percentage phrasing, very long prompts, prompt injection inside pasted text, unavailable AI credits, failed web search, missing source annotations, and normal successful requests. Define the expected status, user-facing message, and safe fallback for each case.

**Purpose:** Turn reliability requirements into explicit test evidence.

---

# Section 9 — Evaluation and iteration

### Question 7
**Type:** Likert  
**Required:** Yes  
**Title:** Rate the assistant against the assessment criteria.  
**Statements:**
- The solution addresses a relevant workplace problem.
- The prompts are structured and specific.
- The key workflows function as demonstrated.
- The solution shows meaningful innovation.
- Responsible AI is visible and understandable.
- The presentation/demo communicates the solution clearly.

**Suggested scale:** Strongly disagree / Disagree / Neutral / Agree / Strongly agree

### Prompt 16 — Evaluate and revise
**Prompt used:**
> Review the AI workplace assistant against problem relevance, prompt engineering, functionality, innovation, responsible AI, and presentation. Identify the top weaknesses, prioritise the highest-impact fixes, and propose concrete revisions. Re-test the revised behaviour and document what changed and why.

**Purpose:** Demonstrate an iterative prompt-engineering cycle rather than a one-shot build.

---

# Section 10 — Final reflection and evidence

### Question 8
**Type:** Text — Long answer  
**Required:** Yes  
**Title:** What measurable productivity improvement does the assistant provide?  
**Answer guide:** Compare manual task time with assisted task time for examples such as drafting an email, finding current information, performing a calculation, summarising content, or producing a structured plan. Record the task, baseline time, assisted time, and observed improvement.

### Question 9
**Type:** Text — Long answer  
**Required:** Yes  
**Title:** What challenges were encountered and how were they solved?  
**Answer guide:** Include model availability/credits, calculation handling, prompt injection, preserving user facts, UI usability, tool failures, source display, and testing.

### Question 10
**Type:** Text — Long answer  
**Required:** Yes  
**Title:** What evidence demonstrates that the project is complete?  
**Answer guide:** Include live Floot URL, GitHub source snapshot, README, assessment notes, prompt log, screenshots/demo evidence, test cases, and responsible-AI safeguards.

---

# Microsoft Forms build order

1. Create a new **Form** in Microsoft Forms.
2. Use the suggested title and description above. Microsoft Forms currently supports form titles up to 90 characters and descriptions up to 1,000 characters.
3. Create the ten sections in the exact order above using **Add new > More question types > Section**.
4. For each prompt-log item, add the question first and then use the **Long answer** setting for prompts, explanations, reflections, and evidence.
5. Use **Choice** for single-selection decisions and **Multiple answers** where more than one feature can apply.
6. Use **Likert** for the final assessment/self-evaluation statements.
7. Mark the core project and reflection questions as **Required**.
8. Add branching after all questions are created. For example, if a respondent selects “No memory” in Question 5, skip any questions specifically about persistent-memory implementation. Microsoft Forms branching can move responders to later questions or the end of the form; it cannot branch backward to earlier questions.
9. Preview the form on both computer and mobile before sending it.
10. Keep the submitted responses as evidence of the prompt-engineering process and iteration history.

## Evidence statement for submission

This prompt log documents the development sequence from problem definition through feature selection, system prompting, UI design, tool use, memory, security, responsible AI, error handling, testing, evaluation, and final reflection. It can be used as supporting evidence that the project was developed progressively with deliberate prompt engineering rather than produced from a single prompt.
