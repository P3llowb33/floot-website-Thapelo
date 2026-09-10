# Assessment notes

## Problem
Workplace users spend time switching between tools for writing, calculations, research and planning. The assistant provides one reviewable interface for common tasks.

## Prompt engineering
The backend uses explicit workflow instructions plus global rules for factual grounding, uncertainty, prompt-injection resistance, tool selection, and human review. Workflow-specific instructions cover resume, email, research and general assistant behavior.

## Functionality demonstrated
1. General AI assistant interface with short-term session history.
2. Safe deterministic arithmetic for supported expressions.
3. Smart workplace email drafting.
4. Research summarisation with web-search support when model credits are available.
5. Resume/career content generation with ATS suggestions that do not invent credentials.

## Responsible AI
- User facts are preserved rather than invented.
- Citations and statistics are not fabricated.
- Pasted material is treated as data, not executable instructions.
- Consequential external actions are not claimed unless a real integration executes them.
- AI output is presented for human review.

## Current limitation
The connected OpenAI account currently has no API credits, so live model generation may return an unavailable/credit message. Deterministic calculations continue to work independently. The repository does not contain API keys.

## Live deployment
https://promptforge1.floot.app
