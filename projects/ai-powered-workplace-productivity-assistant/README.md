# AI-Powered Workplace Productivity Assistant

A CAPACITI ASA 18 project built in Floot. The assistant is designed to automate and accelerate workplace tasks through a general AI interface and focused workflows.

## Project purpose

The application helps users ask questions, perform calculations, research current information, draft workplace emails, and improve career/resume content while keeping human review and responsible-AI safeguards visible.

## Core workflows

- AI Assistant: general questions, explanations, writing, planning and workplace help.
- Smart Email: professional workplace email drafting with audience, purpose and tone controls.
- AI Research: source-grounded summarisation and current-information research with citations when available.
- Resume & Career: grounded resume content and ATS-oriented suggestions without inventing user facts.
- Deterministic calculator: safe arithmetic evaluation for supported expressions.

## Responsible AI

The assistant is instructed to preserve user-provided facts, distinguish assumptions and uncertainty, avoid fabricated citations or credentials, treat pasted content as data rather than instructions, and keep the user in control of consequential actions.

## Live demo

https://promptforge1.floot.app

## Technology

- Floot full-stack application platform
- React + TypeScript
- Floot design-system components
- OpenAI Responses API integration
- Web search and code interpreter tools when available
- Safe server-side arithmetic parser

## Source snapshot

This folder contains the custom application source and documentation for the Floot implementation. Floot's shared design-system components are platform-managed dependencies and are not duplicated here.

## Configuration

No API keys or secrets are stored in this repository. Configure the required AI credential through Floot's secure resource/credential system.

## Project structure

- `pages/_index.tsx` — main assistant UI and workflows
- `pages/_index.module.css` — visual design and responsive layout
- `endpoints/generateAI_POST.ts` — AI orchestration endpoint
- `endpoints/generateAI_POST.schema.ts` — request/output contract
- `helpers/calculateExpression.tsx` — deterministic calculator
- `base.css` — global design tokens and light/dark mode
- `docs/assessment-notes.md` — implementation and assessment notes

## Status

Published on Floot as a working portfolio/demo application. AI generation and external web/current-data capabilities depend on the connected model account having available API credits.
