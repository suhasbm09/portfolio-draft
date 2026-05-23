# AI Implementation Documentation

## Overview

Signum integrates **Google Gemini 2.5 Flash** as an AI-powered learning assistant with context-aware tutoring capabilities. The system implements **Retrieval-Augmented Generation (RAG)** to provide accurate, course-specific responses by combining real-time course content with generative AI.

**AI Model:** Google Gemini 2.5 Flash  
**Architecture:** Three-pipeline system (Q&A, Code Evaluation, Anti-Cheat placeholder)  
**Context Awareness:** Screen content + course material + conversation history  
**Integration:** FastAPI backend with React frontend  

---

## System Components

### Backend Components

**1. AI Service** (`app/services/ai/ai_service.py`)
- Main AI orchestration service
- Three independent pipelines
- Gemini API integration
- Response formatting and error handling

**2. Course Content Store** (`app/services/ai/course_content_store.py`)
- In-memory course content storage
- Keyword-based content retrieval (RAG foundation)
- Topic-to-content mapping
- Dynamic content addition support

**3. AI Routes** (`app/domains/ai/routes.py`)
- `/ai/chat` - Send messages with context
- `/ai/status` - Check AI service availability

### Frontend Components

**1. AIChat Component** (`components/AI/AIChat.jsx`)
- Chat interface with markdown rendering
- Voice input support (Speech Recognition API)
- Message history display
- Context-aware messaging

**2. AIAssistant Component** (`components/AI/AIAssistant.jsx`)
- Floating chat widget
- Minimizable interface
- Global accessibility across all pages

**3. AIContext** (`contexts/AIContext.jsx`)
- Centralized AI state management
- Conversation history tracking
- Context switching
- API communication layer

---

## Three AI Pipelines

### Pipeline 1: Q&A with RAG (Active)

**Purpose:** Context-aware tutoring and question answering

**Features:**
- Course content retrieval based on user query
- Screen content awareness (Copilot-style)
- Conversation history maintenance
- Formatted responses (bullets, code blocks, emojis)

**Input:**
```javascript
{
  message: "How does binary search work?",
  context: "Data Structures - Arrays",
  screen_content: "Current page text...",
  conversation_history: [...]
}
```

**Output:**
```javascript
{
  success: true,
  response: "Binary search is an efficient O(log n) algorithm...",
  context: "Data Structures - Arrays",
  model: "gemini-2.5-flash"
}
```

### Pipeline 2: Code Evaluation (Active)

**Purpose:** Analyze time/space complexity of coding solutions

**Features:**
- Complexity detection using AI analysis
- Expected vs actual complexity comparison
- Scoring (0-100) based on efficiency
- Optimization suggestions

**Input:**
```javascript
{
  code: "def binary_search(arr, target): ...",
  language: "python",
  problem_id: "binary-search",
  expected_complexity: {
    time: "O(log n)",
    space: "O(1)"
  }
}
```

**Output:**
```javascript
{
  success: true,
  detected_time_complexity: "O(log n)",
  detected_space_complexity: "O(1)",
  matches_expected: true,
  score: 95,
  explanation: "Efficient binary search implementation",
  suggestions: []
}
```

### Pipeline 3: Anti-Cheat (Placeholder)

**Purpose:** Video/audio proctoring analysis (future implementation)

**Status:** Not implemented (returns placeholder response)

---

## RAG Implementation

### What is RAG?

**Retrieval-Augmented Generation** combines:
1. **Retrieval** - Fetch relevant course content from knowledge base
2. **Augmentation** - Add retrieved content to AI prompt
3. **Generation** - AI generates response using both query and retrieved content

**Benefits:**
- Accurate answers based on actual course material
- Reduces AI hallucinations
- Course-specific responses
- Up-to-date information without model retraining

### Current Implementation

**Content Storage:**
```python
courses = {
  "Data Structures": {
    "Arrays": "Arrays are linear data structures...",
    "Stacks": "Stack is LIFO data structure...",
    "Queues": "Queue is FIFO data structure...",
    ...
  }
}
```

**Retrieval Strategy:**
- **Keyword-based search** - Match query terms with topic names and content
- **Context filtering** - Prioritize current course/topic
- **Limited results** - Return top 2 most relevant topics
- **Fallback** - Search all courses if no context match

**Retrieval Logic:**
```python
def get_relevant_content(query, context):
  1. Extract keywords from user query
  2. Check current course context (e.g., "Data Structures")
  3. Search topics in context course first
  4. Match keywords in topic names and content
  5. Return top 2 relevant content blocks
  6. If nothing found, search all courses
```

**Prompt Augmentation:**
```python
system_prompt = base_prompt + context + screen_content
if course_content:
  system_prompt += "Relevant Course Material:\n{content}"
full_prompt = system_prompt + conversation_history + user_message
```

---

## Response Formatting

### System Prompt Guidelines

AI responses follow a **strict format** to ensure readability:

**Rules:**
- ❌ No long paragraphs (max 2 sentences in a row)
- ❌ No walls of text
- ✅ Use bullets, numbered lists, code blocks
- ✅ Each point: 1-2 lines maximum
- ✅ Conversational and friendly tone
- ✅ Use emojis for visual breaks (📌 💡 ⚠️)

**Structure:**
```
1. One short sentence answer (max 15 words)

**Key Points:**
• Bullet 1
• Bullet 2

**Quick Example:**
```code```

**Why It Matters:**
One sentence explanation

**Try This:** [Question to check understanding]
```

---

## Context Awareness

### Three Layers of Context

**1. Course Context**
- Current course ID (e.g., "data-structures")
- Specific topic being studied (e.g., "Arrays")
- Passed from frontend via `context` parameter

**2. Screen Content**
- Text visible on user's current page
- Captured via `document.innerText` (first 6000 chars)
- Enables Copilot-style awareness of what user is viewing

**3. Conversation History**
- Last 3 messages stored in memory
- Maintains dialogue continuity
- Prevents repetitive responses

### Context Flow

```
User on "Data Structures - Arrays" page
  ↓
Frontend captures:
  - context: "Data Structures - Arrays"
  - screen_content: "Binary search is an algorithm..."
  - conversation_history: ["What is binary search?", ...]
  ↓
Backend retrieves:
  - Course content for "Arrays" topic
  ↓
AI receives full context:
  - User query
  - Course material (RAG)
  - Screen content
  - Previous conversation
  ↓
Generates context-aware response
```

---

## API Specification

### POST /ai/chat

**Request:**
```json
{
  "message": "Explain time complexity",
  "context": "Data Structures - Arrays",
  "screen_content": "Binary search divides the array...",
  "conversation_history": [
    {
      "role": "user",
      "content": "What is binary search?"
    },
    {
      "role": "assistant",
      "content": "Binary search is..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Time complexity measures...\n\n**Key Points:**\n• O(1) - constant...",
  "context": "Data Structures - Arrays",
  "model": "gemini-2.5-flash"
}
```

**Error Response:**
```json
{
  "success": false,
  "response": "Sorry, I encountered an error. Please try again.",
  "error": "API key invalid"
}
```

### GET /ai/status

**Response:**
```json
{
  "status": "operational",
  "model": "gemini-2.5-flash",
  "features": ["chat", "code-evaluation", "anti-cheat"]
}
```

---

## Frontend Integration

### AIContext Provider

**State Management:**
```javascript
const AIContext = createContext({
  chat: async (message, context) => {...},
  conversationHistory: [],
  isLoading: false,
  clearHistory: () => {...},
  setContext: (ctx) => {...}
});
```

**Usage:**
```javascript
const { chat, conversationHistory } = useAI();

await chat("What is a stack?", "Data Structures");
```

### Voice Input Support

**Feature:** Speech-to-text for hands-free interaction

**Implementation:**
- Web Speech Recognition API
- `SpeechRecognition` or `webkitSpeechRecognition`
- English language (`en-US`)
- Single utterance mode

**User Flow:**
```
User clicks microphone button
  ↓
recognitionRef.start()
  ↓
User speaks: "What is binary search?"
  ↓
onresult event fires
  ↓
Transcript → input field
  ↓
Auto-submit or manual send
```

---

## Feature Flags

**Configuration:** `frontend/src/config/features.js`

```javascript
AI_ENABLED: true              // Enable/disable AI globally
AI_TESTING_MODE: false        // Show "Testing Mode" banner
VOICE_INPUT_ENABLED: true     // Enable voice input
```

**Testing Mode:**
- Displays banner: "AI Assistant - Testing Mode"
- Same functionality as production
- Used for development/QA

---

## Environment Variables

**Backend (.env):**
```bash
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

**Frontend (Vite):**
```bash
VITE_BACKEND_URL=http://localhost:8000
```

---

## Visual Diagrams

### Diagram 1: AI System Connection

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI SYSTEM ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────────────┘

                      ┌──────────────────┐
                      │   React Frontend │
                      └────────┬─────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        ┌──────────────┐            ┌──────────────────┐
        │  AIAssistant │            │    AIChat.jsx    │
        │  (Widget)    │            │  (Interface)     │
        └──────┬───────┘            └────────┬─────────┘
               │                             │
               └──────────┬──────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   AIContext     │
                 │  (State Mgmt)   │
                 └────────┬────────┘
                          │
                   Captures context:
                   ├─ Current course/topic
                   ├─ Screen content (6000 chars)
                   └─ Conversation history (last 3)
                          │
                          │ POST /ai/chat
                          │ {message, context, screen_content, history}
                          ▼
              ┌───────────────────────────┐
              │   FastAPI Backend         │
              │   /ai/chat                │
              └───────────┬───────────────┘
                          │
                          ▼
              ┌───────────────────────────┐
              │   AIService               │
              │   ai_service.chat()       │
              └───────────┬───────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐
│ CourseContentStore│             │  Build Prompt    │
│ (RAG Retrieval)  │              │  - System prompt │
└────────┬─────────┘              │  - Course content│
         │                        │  - Screen content│
         │                        │  - History       │
  get_relevant_content()          │  - User message  │
         │                        └────────┬─────────┘
         │                                 │
  Extract keywords                         │
  Match with course topics                 │
  Return top 2 relevant blocks             │
         │                                 │
         └─────────────┬───────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Google Gemini API   │
            │  gemini-2.5-flash    │
            └──────────┬───────────┘
                       │
                       │ AI generates response
                       │ (formatted: bullets, code, emojis)
                       │
                       ▼
            ┌──────────────────────┐
            │  Response            │
            │  {                   │
            │    success: true,    │
            │    response: "...",  │
            │    context: "...",   │
            │    model: "..."      │
            │  }                   │
            └──────────┬───────────┘
                       │
                       │ Return to frontend
                       ▼
            ┌──────────────────────┐
            │  AIChat displays     │
            │  - Markdown rendering│
            │  - Code highlighting │
            │  - Message history   │
            └──────────────────────┘


═══════════════════════════════════════════════════════════════════════
                      DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════════

User on Arrays page types: "What is binary search?"
         │
         ▼
AIChat captures:
  ├─ message: "What is binary search?"
  ├─ context: "Data Structures - Arrays"
  ├─ screen_content: "Binary search is an efficient algorithm..."
  └─ conversation_history: []
         │
         │ POST /ai/chat
         ▼
AIService receives request
         │
         ├─── RAG Retrieval ────────────────────┐
         │                                      │
         │   CourseContentStore                 │
         │   .get_relevant_content()            │
         │                                      │
         │   Keywords: ["binary", "search"]     │
         │   Context: "Data Structures - Arrays"│
         │                                      │
         │   Matches:                           │
         │   ✅ Topic: "Arrays"                 │
         │   ✅ Content: "...binary search..."  │
         │                                      │
         │   Returns:                           │
         │   "**Arrays:**                       │
         │    Binary search is O(log n)..."     │
         │                                      │
         └──────────────┬───────────────────────┘
                        │
                        ▼
         Build Full Prompt:
         ┌─────────────────────────────────────┐
         │ System: "You are an AI tutor..."    │
         │                                     │
         │ Context: "Data Structures - Arrays" │
         │                                     │
         │ Screen: "Binary search divides..."  │
         │                                     │
         │ Course Material:                    │
         │ "**Arrays:** Binary search is..."   │
         │                                     │
         │ User: "What is binary search?"      │
         └─────────────┬───────────────────────┘
                       │
                       │ Send to Gemini API
                       ▼
         ┌─────────────────────────────────────┐
         │ Gemini 2.5 Flash generates:        │
         │                                     │
         │ "Binary search finds elements       │
         │  in sorted arrays efficiently.      │
         │                                     │
         │ **Key Points:**                     │
         │ • O(log n) time complexity          │
         │ • Requires sorted array             │
         │ • Divides search space in half      │
         │                                     │
         │ **Quick Example:**                  │
         │ ```python                           │
         │ def binary_search(arr, target):     │
         │   left, right = 0, len(arr)-1       │
         │   while left <= right:              │
         │     mid = (left + right) // 2       │
         │     if arr[mid] == target:          │
         │       return mid                    │
         │     elif arr[mid] < target:         │
         │       left = mid + 1                │
         │     else:                           │
         │       right = mid - 1               │
         │   return -1                         │
         │ ```                                 │
         │                                     │
         │ **Try This:** What's the complexity │
         │ if the array isn't sorted?"         │
         └─────────────┬───────────────────────┘
                       │
                       │ Return response
                       ▼
         AIChat renders with:
         ├─ Markdown formatting (ReactMarkdown)
         ├─ Code syntax highlighting
         ├─ Bullet points
         └─ Add to conversation history
```

---

### Diagram 2: RAG (Retrieval-Augmented Generation) Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│              RAG: RETRIEVAL-AUGMENTED GENERATION                    │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ STEP 1: USER QUERY                                                 │
└────────────────────────────────────────────────────────────────────┘

        User asks: "Explain time complexity of quicksort"
                           │
                           ▼
                ┌──────────────────────┐
                │  Frontend captures:  │
                │  - Query             │
                │  - Context           │
                │  - Screen content    │
                └──────────┬───────────┘
                           │
                           ▼

┌────────────────────────────────────────────────────────────────────┐
│ STEP 2: RETRIEVAL (Find Relevant Course Content)                  │
└────────────────────────────────────────────────────────────────────┘

                ┌──────────────────────────────┐
                │  CourseContentStore          │
                │  get_relevant_content()      │
                └──────────┬───────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
        ▼                                     ▼
┌──────────────────┐              ┌──────────────────┐
│ Keyword Extract  │              │ Context Filter   │
├──────────────────┤              ├──────────────────┤
│ "quicksort"      │              │ Course:          │
│ "time"           │              │ "Data Structures"│
│ "complexity"     │              │                  │
└────────┬─────────┘              └────────┬─────────┘
         │                                 │
         └─────────────┬───────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────┐
        │  Search Course Topics            │
        │                                  │
        │  Match keywords in:              │
        │  ├─ Topic names                  │
        │  └─ Topic content                │
        └──────────┬───────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────────┐
        │  Matches Found:                  │
        │                                  │
        │  ✅ "Arrays" topic               │
        │     Contains: "quicksort O(n²)"  │
        │                                  │
        │  ✅ "Sorting Algorithms"         │
        │     Contains: "quicksort..."     │
        └──────────┬───────────────────────┘
                   │
                   │ Return top 2
                   ▼
        ┌──────────────────────────────────┐
        │  Retrieved Content:              │
        │                                  │
        │  "**Arrays:**                    │
        │   Quicksort is a divide-and-     │
        │   conquer algorithm with         │
        │   O(n log n) average time        │
        │   complexity and O(n²) worst     │
        │   case."                         │
        │                                  │
        │  "**Sorting Algorithms:**        │
        │   Quicksort uses pivot-based     │
        │   partitioning..."               │
        └──────────┬───────────────────────┘
                   │
                   ▼

┌────────────────────────────────────────────────────────────────────┐
│ STEP 3: AUGMENTATION (Add Retrieved Content to Prompt)            │
└────────────────────────────────────────────────────────────────────┘

        ┌──────────────────────────────────┐
        │  Build Enhanced Prompt:          │
        │                                  │
        │  ┌────────────────────────────┐  │
        │  │ System Prompt:             │  │
        │  │ "You are an AI tutor..."   │  │
        │  └────────────────────────────┘  │
        │             +                    │
        │  ┌────────────────────────────┐  │
        │  │ Context:                   │  │
        │  │ "Data Structures - Arrays" │  │
        │  └────────────────────────────┘  │
        │             +                    │
        │  ┌────────────────────────────┐  │
        │  │ Screen Content:            │  │
        │  │ "Sorting algorithms..."    │  │
        │  └────────────────────────────┘  │
        │             +                    │
        │  ┌────────────────────────────┐  │
        │  │ ⭐ Retrieved Course        │  │
        │  │    Material (RAG):         │  │
        │  │                            │  │
        │  │ "**Arrays:**               │  │
        │  │  Quicksort is O(n log n)...│  │
        │  │                            │  │
        │  │ **Sorting Algorithms:**    │  │
        │  │  Quicksort uses pivot..."  │  │
        │  └────────────────────────────┘  │
        │             +                    │
        │  ┌────────────────────────────┐  │
        │  │ User Query:                │  │
        │  │ "Explain time complexity   │  │
        │  │  of quicksort"             │  │
        │  └────────────────────────────┘  │
        └──────────┬───────────────────────┘
                   │
                   ▼

┌────────────────────────────────────────────────────────────────────┐
│ STEP 4: GENERATION (AI Creates Response)                          │
└────────────────────────────────────────────────────────────────────┘

        ┌──────────────────────────────────┐
        │  Send to Gemini 2.5 Flash:       │
        │  - Enhanced prompt with RAG      │
        │  - Course content included       │
        └──────────┬───────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────────┐
        │  AI Processing:                  │
        │                                  │
        │  1. Reads user query             │
        │  2. Sees retrieved course content│
        │  3. Combines knowledge with      │
        │     course material              │
        │  4. Generates accurate response  │
        └──────────┬───────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────────────────┐
        │  Generated Response:                     │
        │                                          │
        │  "Quicksort's time complexity varies:    │
        │                                          │
        │  **Key Points:**                         │
        │  • Average: O(n log n) - most cases      │
        │  • Worst: O(n²) - already sorted         │
        │  • Best: O(n log n) - random pivot       │
        │                                          │
        │  **Why?**                                │
        │  Divide-and-conquer splits array in half │
        │  recursively, leading to log n levels.   │
        │                                          │
        │  **Quick Example:**                      │
        │  ```                                     │
        │  [3,1,4,1,5] → pivot=3                   │
        │  [1,1] | 3 | [4,5]                       │
        │  Each partition takes O(n)               │
        │  ```                                     │
        │                                          │
        │  **Try This:** What pivot choice         │
        │  avoids worst case?"                     │
        └──────────┬───────────────────────────────┘
                   │
                   ▼

┌────────────────────────────────────────────────────────────────────┐
│ STEP 5: DISPLAY (Show to User)                                    │
└────────────────────────────────────────────────────────────────────┘

        ┌──────────────────────────────────┐
        │  Frontend Rendering:             │
        │  - ReactMarkdown formatting      │
        │  - Syntax highlighting           │
        │  - Add to conversation history   │
        └──────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                       RAG BENEFITS
═══════════════════════════════════════════════════════════════════════

┌────────────────────┐          ┌────────────────────┐
│ Without RAG        │          │ With RAG           │
├────────────────────┤          ├────────────────────┤
│ • Generic answers  │          │ • Course-specific  │
│ • May hallucinate  │          │ • Accurate content │
│ • No course link   │    VS    │ • Verified info    │
│ • Outdated info    │          │ • Context-aware    │
└────────────────────┘          └────────────────────┘

Example:
  User: "What is quicksort complexity?"
  
  ❌ Without RAG: "Quicksort is O(n log n) [generic answer]"
  
  ✅ With RAG: "According to the Arrays module in this course,
                quicksort has O(n log n) average complexity
                and O(n²) worst case when... [course-specific]"


═══════════════════════════════════════════════════════════════════════
                     CURRENT VS FUTURE RAG
═══════════════════════════════════════════════════════════════════════

┌────────────────────────────────────────────────────────────────────┐
│ CURRENT: Keyword-Based Retrieval                                  │
├────────────────────────────────────────────────────────────────────┤
│ • In-memory Python dictionary                                      │
│ • Simple keyword matching                                          │
│ • Fast but limited accuracy                                        │
│ • Works for small course catalogs                                  │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ FUTURE: Vector-Based Retrieval (ChromaDB/Pinecone)                │
├────────────────────────────────────────────────────────────────────┤
│ • Semantic similarity search                                       │
│ • Understands meaning, not just keywords                           │
│ • Better accuracy for complex queries                              │
│ • Scales to large course libraries                                 │
└────────────────────────────────────────────────────────────────────┘
```

---

# Anti-Cheat System Documentation

## Overview

Signum implements a **real-time academic integrity monitoring system** for both quiz and coding assessments. The system detects suspicious activities, tracks violations, and enforces progressive blocking to ensure fair evaluation of student performance.

**Coverage:** Quiz assessments and coding challenges  
**Detection:** Client-side monitoring with server-side enforcement  
**Enforcement:** Progressive time-based blocking  
**Storage:** Immutable violation logs in Firestore  

---

## System Architecture

### Components

**Frontend (React)**
- Real-time violation detection
- Event listeners for suspicious activities
- Local violation count display
- Block timer UI

**Backend (FastAPI)**
- Violation logging (`anti_cheat_events` collection)
- Block creation and management
- Status checking and validation
- Auto-expiry handling

**Database (Firestore)**
- Violation records (append-only, immutable)
- Block records (time-based expiration)
- Per-user, per-course, per-assessment tracking

---

## Detection Mechanisms

### Quiz Anti-Cheat

**Detected Activities:**

| Violation Type | Description | Detection Method |
|----------------|-------------|------------------|
| **Tab/Window Switch** | User switches to another tab or application | `document.visibilitychange` event |
| **Copy/Paste** | User attempts to copy or paste content | `Ctrl+C`, `Ctrl+V` keyboard events |
| **Right-Click** | User opens context menu | `contextmenu` event prevention |
| **Developer Tools** | User opens browser DevTools | Window size difference detection |
| **Fullscreen Exit** | User exits fullscreen mode | `fullscreenchange` event |
| **Browser Blur** | Quiz window loses focus | `blur` and `focus` events |
| **Forbidden Keys** | F5 (refresh), F11 (fullscreen), F12 (devtools) | `keydown` event filtering |
| **Restricted Shortcuts** | Ctrl+S (save), Ctrl+P (print), Ctrl+U (view source) | Keyboard combination blocking |

**Implementation:**
```javascript
// Frontend Detection (QuizPage.jsx)
MAX_VIOLATIONS = 3  // Violation threshold before block

// Event Listeners:
- document.addEventListener('visibilitychange', detectTabSwitch)
- document.addEventListener('contextmenu', detectRightClick)
- document.addEventListener('keydown', detectKeyboardShortcuts)
- window.addEventListener('blur', detectWindowBlur)
- document.addEventListener('fullscreenchange', detectFullscreenExit)
```

### Coding Challenge Anti-Cheat

**Detected Activities:**

| Violation Type | Description | Detection Method |
|----------------|-------------|------------------|
| **Tab Switch** | User switches away from coding page | `document.hidden` state change |
| **Copy Attempt** | User tries to copy code | `copy` event prevention |
| **Paste Attempt** | User tries to paste code | `paste` event prevention |
| **Window Blur** | Coding window loses focus | `blur` event tracking |

**Implementation:**
```javascript
// Frontend Detection (CodingChallengePage.jsx)
MAX_VIOLATIONS = 3  // Violation threshold before block

// Event Listeners:
- document.addEventListener('visibilitychange', handleVisibilityChange)
- document.addEventListener('copy', handleCopy)
- document.addEventListener('paste', handlePaste)
- window.addEventListener('blur', handleBlur)
```

---

## Violation Workflow

### 1. Violation Detection (Frontend)

```javascript
// User triggers suspicious activity (e.g., tab switch)
↓
addViolation(type)
  ├─ Check if assessment started (quiz/coding)
  ├─ Check if at MAX_VIOLATIONS (3)
  ├─ Create violation object:
  │    {
  │      type: "Tab Switch",
  │      timestamp: ISO 8601,
  │      id: unique ID
  │    }
  ├─ Add to local state (violations array)
  └─ Send to backend API
```

### 2. Violation Reporting (Backend)

```
POST /assessment/{course_id}/anti-cheat/report
Body: {
  user_id: "user123",
  course_id: "data-structures",
  assessment_type: "quiz" | "coding",
  violation_type: "Tab Switch",
  timestamp: "2025-11-01T12:00:00Z"
}

↓
AntiCheatService.report_violation()
  ├─ AssessmentRepository.record_violation()
  │    └─ Save to anti_cheat_events collection (UUID)
  ├─ Get total violation count
  └─ Check blocking thresholds:
       └─ If ≥3 violations → Create block
```

### 3. Progressive Blocking

**Thresholds:**

| Violation Count | Block Duration | Action |
|----------------|----------------|--------|
| 1-2 violations | No block | Warning only |
| 3 violations | 15 minutes | First block |
| 5 violations | 30 minutes | Extended block |
| 7+ violations | 60 minutes | Maximum block |

**Block Creation:**
```
AntiCheatService.create_block()
  └─ AssessmentRepository.create_block()
       ├─ Document ID: {user_id}_{course_id}_{assessment_type}_block
       ├─ block_end_time: current_time + duration_minutes
       ├─ violation_count: total violations
       └─ is_active: true
```

### 4. Block Enforcement

**Frontend Auto-Block:**
```javascript
// Check after each violation
if (violations.length >= MAX_VIOLATIONS) {
  blockQuizAccess() // or blockChallengeAccess()
  ├─ Set blocked state
  ├─ Start countdown timer
  ├─ Disable submit button
  └─ Show block message with time remaining
}
```

**Backend Validation:**
```
Before quiz/coding submission:
  ├─ GET /assessment/{course_id}/anti-cheat/status
  ├─ Check is_blocked status
  └─ If blocked:
       ├─ Return 403 Forbidden
       ├─ Return time_remaining_ms
       └─ Reject submission
```

### 5. Block Expiration

**Auto-Clear (Frontend):**
```javascript
// Countdown timer in QuizPage/CodingChallengePage
useEffect(() => {
  if (blockEndTime && timeRemaining > 0) {
    interval = setInterval(() => {
      remaining = blockEndTime - now
      
      if (remaining <= 0) {
        ├─ Set blocked = false
        ├─ Clear violations array
        ├─ POST /anti-cheat/clear (backend cleanup)
        └─ Allow new quiz/coding attempt
      }
    }, 1000)
  }
}, [blockEndTime])
```

**Backend Status Check:**
```python
AssessmentRepository.get_block_status()
  ├─ Fetch block document
  ├─ Check block_end_time > now
  └─ If expired:
       ├─ Set is_active = false
       └─ Return is_blocked = false
```

---

## Data Models

### Violation Event (Firestore)

```javascript
// Collection: anti_cheat_events
// Document ID: UUID (auto-generated)

{
  id: "550e8400-e29b-41d4-a716-446655440000",
  user_id: "user123@example.com",
  course_id: "data-structures",
  assessment_type: "quiz",  // or "coding"
  event_type: "violation",
  violation_type: "Tab Switch",
  timestamp: "2025-11-01T12:00:00.000Z",
  created_at: Timestamp  // Firestore server timestamp
}
```

### Block Event (Firestore)

```javascript
// Collection: anti_cheat_events
// Document ID: {user_id}_{course_id}_{assessment_type}_block

{
  id: "user123_data-structures_quiz_block",
  user_id: "user123@example.com",
  course_id: "data-structures",
  assessment_type: "quiz",  // or "coding"
  event_type: "block",
  violation_count: 3,
  block_end_time: Timestamp("2025-11-01T12:15:00.000Z"),
  blocked_at: Timestamp("2025-11-01T12:00:00.000Z"),
  is_active: true
}
```

---

## API Endpoints

### Report Violation
```
POST /assessment/{course_id}/anti-cheat/report

Request Body:
{
  "user_id": "user123",
  "course_id": "data-structures",
  "assessment_type": "quiz",
  "violation_type": "Tab Switch",
  "timestamp": "2025-11-01T12:00:00Z"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "violation_type": "Tab Switch",
    "created_at": "timestamp"
  }
}
```

### Check Status
```
GET /assessment/{course_id}/anti-cheat/status
Query Params: ?user_id={id}&assessment_type={quiz|coding}

Response:
{
  "success": true,
  "data": {
    "violations": [
      {
        "id": "uuid",
        "violation_type": "Tab Switch",
        "timestamp": "2025-11-01T12:00:00Z"
      }
    ],
    "violation_count": 3,
    "is_blocked": true,
    "block_end_time": "2025-11-01T12:15:00Z",
    "time_remaining_ms": 900000  // 15 minutes in milliseconds
  }
}
```

### Clear Violations
```
POST /assessment/{course_id}/anti-cheat/clear
Query Params: ?user_id={id}&assessment_type={quiz|coding}

Response:
{
  "success": true,
  "data": {
    "violations_cleared": 3,
    "block_cleared": true,
    "timestamp": "2025-11-01T12:15:00Z"
  }
}
```

---

## Feature Flags

**Configuration File:** `frontend/src/config/features.js`

### Quiz Anti-Cheat
```javascript
QUIZ_ANTI_CHEAT_ENABLED: true   // Enable/disable anti-cheat
QUIZ_TESTING_MODE: false         // Bypass anti-cheat for testing
```

**Behavior:**
- `QUIZ_ANTI_CHEAT_ENABLED = true` → Full anti-cheat monitoring active
- `QUIZ_TESTING_MODE = true` → Violations detected but not enforced (testing only)
- Both `false` → No anti-cheat (not recommended for production)

### Usage in Code
```javascript
import { isQuizAntiCheatEnabled, isQuizTestingMode } from './config/features';

const antiCheatEnabled = isQuizAntiCheatEnabled() && !isQuizTestingMode();

if (antiCheatEnabled) {
  // Add event listeners and track violations
}
```

---

## User Experience

### Warning System

**Visual Indicators:**
- 🔴 **Red Warning Bar:** Appears when violation detected
- **Violation Counter:** Shows `(1/3)`, `(2/3)`, `(3/3)`
- **Toast Notifications:** "⚠️ Violation detected: Tab Switch (2/3)"

**Progressive Warnings:**
```
1st Violation → Yellow warning: "Warning: 1 violation detected"
2nd Violation → Orange warning: "Caution: 2 violations detected (1 more = block)"
3rd Violation → Red alert: "Blocked for 15 minutes"
```

### Block UI

**Quiz Block Screen:**
```
┌─────────────────────────────────────────┐
│   🚫 Quiz Access Blocked                │
│                                         │
│   You have exceeded the maximum number  │
│   of violations (3).                    │
│                                         │
│   Time Remaining: 14:32                 │
│                                         │
│   Please wait before retrying.          │
│                                         │
│   Violations:                           │
│   • Tab Switch (12:00:05)               │
│   • Copy Attempt (12:01:23)             │
│   • Right-click (12:02:45)              │
└─────────────────────────────────────────┘
```

**Coding Challenge Block Screen:**
```
┌─────────────────────────────────────────┐
│   ⚠️ Challenge Access Blocked           │
│                                         │
│   Anti-cheat violations detected.       │
│   Cooldown: 14:32 remaining             │
│                                         │
│   [Clear Violations] (Testing Mode Only)│
└─────────────────────────────────────────┘
```

---

## System Constraints

**Assessment Context:**
- Violations only tracked when quiz/coding is **actively started**
- Browsing quiz page before starting does NOT trigger violations
- Violations cleared when user returns to page after block expiry

**Testing Mode:**
- `QUIZ_TESTING_MODE = true` disables all enforcement
- Violations still logged but not counted
- Used for development/debugging only

**Block Behavior:**
- Blocks are time-based, not attempt-based
- User can retry immediately after block expires
- Violations reset after successful completion

**Scope:**
- Anti-cheat only applies to quiz and coding assessments
- Does NOT monitor learning modules, course reading, AI chat, or profile pages

**Database:**
- Violation records are append-only (immutable)
- Block records auto-expire based on timestamp
- Manual clearing available via testing mode only

---

## Visual System Diagram

```
┌───────────────────────────────────────────────────────────────────────┐
│                    ANTI-CHEAT SYSTEM ARCHITECTURE                     │
└───────────────────────────────────────────────────────────────────────┘

                         ┌──────────────┐
                         │     USER     │
                         │  (Browser)   │
                         └──────┬───────┘
                                │
                    Suspicious Activity Detected
                                │
        ┌───────────────────────┴────────────────────────┐
        │                                                │
        ▼                                                ▼
┌──────────────────┐                          ┌──────────────────┐
│   QuizPage.jsx   │                          │CodingChallenge   │
│                  │                          │  Page.jsx        │
├──────────────────┤                          ├──────────────────┤
│ Event Listeners: │                          │ Event Listeners: │
│ • visibilitychange│                         │ • visibilitychange│
│ • contextmenu    │                          │ • copy           │
│ • keydown        │                          │ • paste          │
│ • blur/focus     │                          │ • blur           │
│ • fullscreenchange│                         └────────┬─────────┘
└────────┬─────────┘                                   │
         │                                             │
         └─────────────────┬───────────────────────────┘
                           │
                    addViolation(type)
                           │
                ┌──────────┴─────────┐
                │                    │
         Check Conditions:           │
         ├─ Quiz/Coding Started?     │
         ├─ At MAX_VIOLATIONS?       │
         └─ Anti-Cheat Enabled?      │
                │                    │
                ▼                    │
         Create Violation            │
         Object:                     │
         {                           │
           type,                     │
           timestamp,                │
           id                        │
         }                           │
                │                    │
                ├─ Update Local      │
                │  State (UI)        │
                │                    │
                └─ Send to Backend ──┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │   FastAPI Backend                │
        │   POST /anti-cheat/report        │
        └──────────┬───────────────────────┘
                   │
                   ▼
        ┌──────────────────────────────────┐
        │   AntiCheatService               │
        │   report_violation()             │
        └──────────┬───────────────────────┘
                   │
        ┌──────────┴────────────────────┐
        │                               │
        ▼                               ▼
┌────────────────┐            ┌──────────────────┐
│AssessmentRepo  │            │  Get Violation   │
│record_violation│            │  Count           │
└───────┬────────┘            └────────┬─────────┘
        │                              │
        ▼                              ▼
┌─────────────────────────┐   Check Thresholds:
│ anti_cheat_events       │   ├─ 3 violations → 15min
│ collection              │   ├─ 5 violations → 30min
│                         │   └─ 7+ violations → 60min
│ Document (Violation):   │            │
│ {                       │            ▼
│   id: UUID,             │   ┌─────────────────┐
│   user_id,              │   │  Create Block   │
│   course_id,            │   │  (if threshold  │
│   assessment_type,      │   │   reached)      │
│   event_type: "violation"│  └────────┬────────┘
│   violation_type,       │            │
│   timestamp             │            ▼
│ }                       │   ┌─────────────────────────┐
└─────────────────────────┘   │ anti_cheat_events       │
                              │ collection              │
                              │                         │
                              │ Document (Block):       │
                              │ {                       │
                              │   id: composite_key,    │
                              │   user_id,              │
                              │   course_id,            │
                              │   assessment_type,      │
                              │   event_type: "block",  │
                              │   violation_count,      │
                              │   block_end_time,       │
                              │   is_active: true       │
                              │ }                       │
                              └────────┬────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Return Status  │
                              │  to Frontend    │
                              └────────┬────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Frontend UI    │
                              ├─────────────────┤
                              │ if blocked:     │
                              │ ├─ Show timer   │
                              │ ├─ Disable submit│
                              │ └─ Show violations│
                              │                 │
                              │ if not blocked: │
                              │ ├─ Show warning │
                              │ └─ Allow continue│
                              └─────────────────┘


═══════════════════════════════════════════════════════════════════════
                        VIOLATION FLOW SEQUENCE
═══════════════════════════════════════════════════════════════════════

  User starts quiz/coding
         │
         ▼
  ┌─────────────────┐
  │ Anti-Cheat      │
  │ Listeners       │
  │ Activated       │
  └────────┬────────┘
           │
    ┌──────┴────────────────────────────┐
    │                                   │
    ▼                                   ▼
Violation 1:                    Violation 2:
Tab Switch                      Copy Attempt
    │                                   │
    ├─ addViolation()                   ├─ addViolation()
    ├─ Local: violations = [V1]         ├─ Local: violations = [V1, V2]
    ├─ Backend: Save to Firestore       ├─ Backend: Save to Firestore
    └─ UI: Show warning (1/3)           └─ UI: Show warning (2/3)
                                               │
                                               ▼
                                        Violation 3:
                                        Right-click
                                               │
                                        ┌──────┴─────────┐
                                        │                │
                                 addViolation()          │
                                        │                │
                                 Check: count >= 3?      │
                                        │                │
                                        ▼                │
                                    ┌──YES               │
                                    │                    │
                                    ▼                    │
                            blockQuizAccess()            │
                            ├─ Set blocked = true        │
                            ├─ blockEndTime = now + 15min│
                            ├─ Disable submit button     │
                            └─ Show block UI             │
                                    │                    │
                                    │                    │
                        Backend: create_block()          │
                        ├─ Save block record             │
                        ├─ block_end_time = T + 15min    │
                        └─ is_active = true              │
                                    │                    │
                                    │                    │
                            ┌───────┴────────┐           │
                            │                │           │
                         Timer Loop          │           │
                      (every 1 second)       │           │
                            │                │           │
                            ▼                │           │
                    remaining = end - now    │           │
                            │                │           │
                    if remaining <= 0:       │           │
                    ├─ blocked = false       │           │
                    ├─ violations = []       │           │
                    ├─ POST /clear           │           │
                    └─ Allow retry           │           │
                            │                │           │
                            └────────────────┴───────────┘
                                      │
                                      ▼
                              User can retry quiz/coding


═══════════════════════════════════════════════════════════════════════
                          BLOCK EXPIRATION FLOW
═══════════════════════════════════════════════════════════════════════

  Block Created (block_end_time = T + 15min)
         │
         ▼
  ┌─────────────────────────────────────┐
  │ Frontend Countdown Timer            │
  │ useEffect([blockEndTime])           │
  │                                     │
  │ setInterval(() => {                 │
  │   remaining = blockEndTime - now    │
  │   setTimeRemaining(remaining)       │
  │                                     │
  │   if (remaining <= 0) {             │
  │     ├─ Set blocked = false          │
  │     ├─ Clear violations             │
  │     └─ POST /anti-cheat/clear       │
  │   }                                 │
  │ }, 1000)                            │
  └──────────────┬──────────────────────┘
                 │
                 ▼ (after 15 minutes)
  ┌─────────────────────────────────────┐
  │ POST /anti-cheat/clear              │
  │ Query: user_id, course_id, type     │
  └──────────────┬──────────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────────┐
  │ Backend: clear_violations_and_block │
  │                                     │
  │ 1. Delete all violation events      │
  │    (event_type = "violation")       │
  │                                     │
  │ 2. Delete block event               │
  │    (composite key)                  │
  │                                     │
  │ 3. Return: {                        │
  │      violations_cleared: 3,         │
  │      block_cleared: true            │
  │    }                                │
  └──────────────┬──────────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────────┐
  │ Frontend State Update               │
  │ ├─ violations = []                  │
  │ ├─ blocked = false                  │
  │ ├─ blockEndTime = null              │
  │ └─ Allow quiz/coding retry          │
  └─────────────────────────────────────┘
         │
         ▼
  User can start new attempt
  (fresh violation tracking)
```

---

*This anti-cheat system provides robust academic integrity monitoring while maintaining clear constraints and user-friendly violation management.*
# Backend Architecture Documentation

## Overview

Signum backend is built using **FastAPI** with a **Domain-Driven Design (DDD)** architecture pattern. The system is organized into 5 independent domains, each handling specific business logic with dedicated repositories for data access, ensuring clean separation of concerns and maintainability.

**Framework:** FastAPI v2.0.0  
**Architecture:** Domain-Driven Design (DDD)  
**Database:** Google Cloud Firestore (via Repository Pattern)  
**Authentication:** Firebase Authentication  
**AI Service:** Google Gemini 2.5 Flash  
**Language:** Python 3.x

---

## Project Structure

```
backend/
├── app/
│   ├── main.py                        # FastAPI application entry point
│   │
│   ├── core/                          # Core infrastructure
│   │   ├── database.py                # Firestore client singleton
│   │   ├── exceptions.py              # Custom HTTP exceptions
│   │   └── models.py                  # Shared Pydantic models
│   │
│   ├── repositories/                  # Data Access Layer
│   │   ├── base.py                    # Base repository (CRUD operations)
│   │   ├── user_repository.py         # User data access
│   │   ├── progress_repository.py     # Progress tracking data
│   │   ├── assessment_repository.py   # Quiz/coding submissions + anti-cheat
│   │   └── certification_repository.py # NFT certificate records
│   │
│   ├── domains/                       # Business Logic Layer (5 domains)
│   │   ├── auth/
│   │   │   ├── routes.py              # Authentication endpoints
│   │   │   └── models.py              # Auth request/response models
│   │   │
│   │   ├── progress/
│   │   │   ├── routes.py              # Progress tracking endpoints
│   │   │   └── models.py              # Progress sync models
│   │   │
│   │   ├── assessment/
│   │   │   ├── routes.py              # Unified quiz/coding/anti-cheat endpoints
│   │   │   ├── models.py              # Assessment request models
│   │   │   ├── quiz_service.py        # Quiz business logic
│   │   │   ├── coding_service.py      # Code evaluation logic
│   │   │   └── anti_cheat_service.py  # Violation detection logic
│   │   │
│   │   ├── certification/
│   │   │   ├── routes.py              # NFT certification endpoints
│   │   │   └── models.py              # Certification models
│   │   │
│   │   └── ai/
│   │       └── routes.py              # AI chat assistant endpoints
│   │
│   ├── services/                      # Shared Services
│   │   ├── firebase_admin.py          # Firebase initialization
│   │   ├── certificate_template.py    # NFT certificate HTML generation
│   │   ├── metadata_service.py        # IPFS/Arweave metadata upload
│   │   └── ai/
│   │       ├── ai_service.py          # Gemini AI integration
│   │       ├── course_content_store.py # Course content for context
│   │       └── coding_evaluation_service.py # AI code evaluation
│   │
│   └── templates/                     # HTML Templates
│       └── certificates/              # Course-specific certificate templates
│
├── requirements.txt                   # Python dependencies
├── Dockerfile                         # Container configuration
└── serviceAccountKey.json             # Firebase service account (gitignored)
```

---

## Domain Architecture

### Domain-Driven Design Principles

Each domain is **self-contained** with:
- **Routes** - HTTP endpoints (controllers)
- **Models** - Request/response validation (Pydantic)
- **Services** - Business logic (optional, for complex domains)
- **Repository Access** - Data persistence via repository pattern

**Benefits:**
- ✅ **Modularity** - Domains can be developed/tested independently
- ✅ **Scalability** - Easy to add new domains without affecting existing ones
- ✅ **Maintainability** - Clear responsibility boundaries
- ✅ **Testability** - Mock repositories for unit testing

---

## 5 Core Domains

### 1. **Authentication Domain** (`/auth`)
**Responsibility:** User identity, session management, profile updates, wallet integration

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/verify-firebase-token` | Verify Firebase JWT and create session |
| POST | `/auth/logout` | Destroy user session |
| GET | `/auth/me` | Get current user profile |
| GET | `/auth/courses` | Get all available courses |
| POST | `/auth/courses/enroll` | Enroll user in a course |
| PUT | `/auth/profile` | Update user profile (bio, interests) |
| PUT | `/auth/phantom-wallet` | Save Phantom wallet address |
| DELETE | `/auth/account` | Soft delete user account |

**Session Management:**
- In-memory session store (token → user data)
- Session token stored in HTTP-only cookies
- No database calls for session validation

**Key Features:**
- Firebase Authentication integration
- Profile management
- Course enrollment tracking
- Phantom wallet connection

---

### 2. **Progress Domain** (`/progress`)
**Responsibility:** Learning module tracking, progress synchronization, certification eligibility

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/progress/{course_id}` | Get user progress for a course |
| POST | `/progress/{course_id}/sync` | Sync module completion and percentage |
| GET | `/progress/{course_id}/certification-status` | Check certification eligibility |

**Progress Calculation:**
- **Learning Progress:** Percentage of modules completed (0-100%)
- **Quiz Score:** Best score achieved across attempts
- **Coding Status:** Challenge completion flag
- **Overall:** `(learning × 0.7) + (final_exam × 0.3) = 100%` required

**Eligibility Requirements:**
- All learning modules completed (100%)
- Quiz passed with ≥85% score
- Coding challenge completed successfully

---

### 3. **Assessment Domain** (`/assessment`)
**Responsibility:** Quiz management, coding evaluation, anti-cheat monitoring

**Unified Domain:** Combines 3 sub-systems under one domain

#### **Quiz Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assessment/{course_id}/quiz/{quiz_id}` | Get quiz questions |
| POST | `/assessment/{course_id}/quiz/{quiz_id}/submit` | Submit quiz answers |
| GET | `/assessment/{course_id}/quiz/attempts` | Get quiz attempt history |

#### **Coding Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/assessment/{course_id}/coding/run` | Run code with first test case (testing) |
| POST | `/assessment/{course_id}/coding/submit` | Submit code for full evaluation |
| GET | `/assessment/{course_id}/coding/submissions` | Get coding submission history |

#### **Anti-Cheat Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/assessment/{course_id}/anti-cheat/report` | Report violation (tab switch, copy/paste) |
| GET | `/assessment/{course_id}/anti-cheat/status` | Check if user is blocked |
| POST | `/assessment/{course_id}/anti-cheat/clear` | Clear violations after cooldown |

**Anti-Cheat Logic:**
- **Violations Tracked:** Tab switch, copy/paste, devtools, right-click, browser blur
- **Thresholds:** 3→5min, 5→15min, 7→30min, 10+→60min block
- **Auto-Expiry:** Blocks automatically clear after duration
- **Penalty:** Quiz/coding scores reduced by violation count percentage

**Code Evaluation:**
- Test case execution (input/output validation)
- Time complexity analysis (AI-powered)
- Security checks (restricted imports)
- Execution timeout protection

---

### 4. **Certification Domain** (`/certification`)
**Responsibility:** NFT certificate generation, blockchain minting, verification

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/certification/{course_id}/mint` | Generate NFT metadata and upload to IPFS |
| POST | `/certification/{course_id}/save` | Save minting transaction details |
| GET | `/certification/{course_id}/status` | Check if certificate exists |
| DELETE | `/certification/{course_id}/delete` | Delete certificate (testing mode only) |

**NFT Workflow:**
1. Check eligibility (via progress domain)
2. Generate certificate HTML (user name, course, date, score)
3. Convert to image (HTML → PNG)
4. Upload to IPFS/Arweave (decentralized storage)
5. Create metadata JSON (name, description, image URL)
6. Return metadata for Solana minting (frontend handles blockchain tx)
7. Save transaction signature and mint address

**Certificate Data:**
- User name and wallet address
- Course title and completion date
- Quiz score and coding completion status
- Unique certificate ID
- Solana transaction signature

---

### 5. **AI Domain** (`/ai`)
**Responsibility:** Conversational AI assistant, context-aware tutoring

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/chat` | Send message with conversation history |
| GET | `/ai/status` | Check AI service availability |

**AI Features:**
- **Model:** Google Gemini 2.5 Flash
- **Context Awareness:** Receives current screen content from frontend
- **Course Context:** Knows user's current course and topic
- **Conversation History:** Maintains multi-turn dialogue
- **Safety:** Content filtering and moderation enabled

**Request Format:**
```json
{
  "message": "How does binary search work?",
  "conversation_history": ["Previous messages..."],
  "context": "data-structures",
  "screen_content": "Current page text..."
}
```

**Response Format:**
```json
{
  "success": true,
  "response": "Binary search is...",
  "model": "gemini-2.5-flash"
}
```

---

## Repository Pattern

### Base Repository (`base.py`)
Provides generic CRUD operations for all repositories:

```python
class BaseRepository:
    def __init__(self, collection_name: str)
    
    # CRUD Operations
    def create(id: str, data: dict) → dict
    def get(id: str) → dict | None
    def update(id: str, data: dict) → dict
    def delete(id: str) → bool
    def set(id: str, data: dict, merge: bool) → dict
    def query(filters: list, order_by: str, limit: int) → list[dict]
```

### Specialized Repositories

**1. UserRepository** (`users` collection)
- `get_by_email(email)` - Retrieve user by email
- `create_or_update_user(email, data)` - Upsert user
- `update_profile(email, profile_data)` - Update bio/interests
- `update_wallet(email, wallet_address)` - Save Phantom wallet
- `enroll_course(email, course_id)` - Add course to enrollment list
- `soft_delete(email)` - Mark account as deleted

**2. ProgressRepository** (`course_progress` collection)
- `get_user_course_progress(user_id, course_id)` - Get progress document
- `sync_progress(user_id, course_id, modules, percentage)` - Update learning progress
- `update_quiz_progress(user_id, course_id, score, passed)` - Save quiz results
- `update_coding_progress(user_id, course_id, score, code, passed)` - Save coding results
- `get_certification_eligibility(user_id, course_id)` - Calculate if eligible

**3. AssessmentRepository** (`assessment_submissions` + `anti_cheat_events`)
- `create_submission(user_id, course_id, type, score, ...)` - Store quiz/coding submission
- `get_user_submissions(user_id, course_id, type)` - Retrieve submission history
- `get_best_score(user_id, course_id, type)` - Get highest score
- `record_violation(user_id, course_id, type, violation_type)` - Log anti-cheat event
- `get_violations(user_id, course_id, type)` - Get violation count
- `create_block(user_id, course_id, type, duration)` - Block user from assessment
- `get_block_status(user_id, course_id, type)` - Check if currently blocked
- `clear_violations_and_block(user_id, course_id, type)` - Reset after cooldown

**4. CertificationRepository** (`nft_certificates` collection)
- `save_certificate(user_id, course_id, image_url, tx_sig, mint_addr)` - Store NFT data
- `get_certificate(user_id, course_id)` - Retrieve certificate details
- `delete_certificate(user_id, course_id)` - Remove certificate (testing only)

---

## Services Layer

### Shared Services

**1. Firebase Admin** (`firebase_admin.py`)
- Initialize Firebase app with service account
- Provide Firestore client singleton
- Used by all repositories

**2. Certificate Template** (`certificate_template.py`)
- Generate HTML certificate from user data
- Convert HTML to PNG image
- Template customization per course

**3. Metadata Service** (`metadata_service.py`)
- Upload certificate images to IPFS/Arweave
- Create NFT metadata JSON
- Return decentralized URLs

**4. AI Service** (`ai/ai_service.py`)
- Initialize Google Gemini client
- Send chat messages with context
- Parse AI responses
- Handle API errors gracefully

**5. Coding Evaluation** (`ai/coding_evaluation_service.py`)
- Execute Python/JavaScript code safely
- Run test cases with input/output validation
- Calculate time complexity using AI analysis
- Detect restricted imports and malicious code

**6. Course Content Store** (`ai/course_content_store.py`)
- Store course outlines and module content
- Provide context to AI for accurate tutoring
- Map course IDs to content text

---

## Data Flow Patterns

### 1. User Authentication Flow
```
Frontend (Firebase Auth)
    ↓ (Firebase JWT)
POST /auth/verify-firebase-token
    ↓
Validate JWT → Create Session
    ↓
UserRepository.create_or_update_user()
    ↓
Return session token (HTTP-only cookie)
```

### 2. Progress Tracking Flow
```
Frontend (Module Completed)
    ↓
POST /progress/{course_id}/sync
    ↓
ProgressRepository.sync_progress()
    ↓
Update modules_completed[] & completion_percentage
    ↓
Return updated progress
```

### 3. Quiz Submission Flow
```
Frontend (Quiz Answers)
    ↓
POST /assessment/{course_id}/quiz/{quiz_id}/submit
    ↓
QuizService.submit_quiz()
    ├─→ Calculate score (correct/total × 100)
    ├─→ AssessmentRepository.create_submission() [history]
    └─→ ProgressRepository.update_quiz_progress() [current best]
    ↓
Return score, passed status, detailed results
```

### 4. Anti-Cheat Violation Flow
```
Frontend (Violation Detected: tab switch)
    ↓
POST /assessment/{course_id}/anti-cheat/report
    ↓
AntiCheatService.report_violation()
    ├─→ AssessmentRepository.record_violation()
    ├─→ Get total violation count
    └─→ If threshold reached:
        └─→ AssessmentRepository.create_block(duration)
    ↓
Return block status (if blocked, return time remaining)
```

### 5. NFT Certificate Minting Flow
```
Frontend (Request Certificate)
    ↓
GET /progress/{course_id}/certification-status
    ├─→ Check: learning 100%, quiz ≥85%, coding complete
    └─→ If eligible: continue
    ↓
POST /certification/{course_id}/mint
    ├─→ Generate certificate HTML (user data)
    ├─→ Convert to PNG image
    ├─→ Upload to IPFS (MetadataService)
    └─→ Create metadata JSON
    ↓
Return metadata URI (frontend mints on Solana)
    ↓
Frontend (Mint NFT on blockchain)
    ↓
POST /certification/{course_id}/save
    └─→ CertificationRepository.save_certificate()
        (tx_signature, mint_address, image_url)
```

### 6. AI Chat Flow
```
Frontend (User Message + Screen Content)
    ↓
POST /ai/chat
    ↓
AIService.send_message()
    ├─→ Add course content context
    ├─→ Include screen content
    ├─→ Append conversation history
    └─→ Send to Gemini 2.5 Flash API
    ↓
Return AI response to frontend
```

---

## Request/Response Models (Pydantic)

### Authentication Models
```python
# Profile Update
{
  "displayName": "John Doe",
  "bio": "Software Engineer",
  "interests": ["AI", "Blockchain"],
  "preferredLanguage": "en",
  "timezone": "UTC"
}

# Wallet Update
{
  "walletAddress": "5ZWj7a1f2WNaH9..."
}
```

### Progress Models
```python
# Progress Sync
{
  "user_id": "user123",
  "course_id": "data-structures",
  "modules_completed": ["arrays", "stacks", "trees"],
  "completion_percentage": 75.5
}
```

### Assessment Models
```python
# Quiz Submission
{
  "user_id": "user123",
  "answers": ["a", "b", "c", "d"],
  "time_taken": 1800  # seconds
}

# Coding Submission
{
  "user_id": "user123",
  "code": "def binary_search(arr, target): ...",
  "language": "python",
  "problem_id": "binary-search",
  "anti_cheat_data": {
    "violations": 0,
    "time_taken": 3600
  }
}

# Violation Report
{
  "user_id": "user123",
  "course_id": "data-structures",
  "assessment_type": "quiz",
  "violation_type": "tab_switch",
  "timestamp": "2025-11-01T12:00:00Z"
}
```

---

## Middleware & Configuration

### CORS Configuration
```python
allow_origins = [
  "http://localhost:5173",  # Vite dev server
  "http://localhost:5174",
  "http://localhost:3000"
]
allow_credentials = True  # Cookies allowed
allow_methods = ["*"]
allow_headers = ["*"]
```

### Error Handling
Custom exception classes with HTTP status codes:
- `NotFoundError` (404) - Resource not found
- `UnauthorizedError` (401) - Authentication required
- `ForbiddenError` (403) - Insufficient permissions
- `BadRequestError` (400) - Invalid request data
- `ConflictError` (409) - Resource already exists

---

## Environment Variables

```bash
# Firebase
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json

# Google AI
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Server
PORT=8000
HOST=0.0.0.0

# CORS
FRONTEND_URL=http://localhost:5173

# NFT Storage (for IPFS/Arweave)
NFT_STORAGE_API_KEY=your_key_here
```

---

## API Versioning

**Current Version:** 2.0.0

**Version Strategy:**
- Major version changes for breaking API changes
- Minor version for new features (backward compatible)
- Patch version for bug fixes

**Version Information Endpoint:**
```
GET /
Returns: API version, status, architecture, endpoints
```

---

## Security Features

### Authentication
- Firebase JWT validation
- Session token management (HTTP-only cookies)
- Automatic token expiration
- Session invalidation on logout

### Data Validation
- Pydantic models for all request/response
- Type checking and validation
- Sanitization of user inputs

### Anti-Cheat
- Real-time violation monitoring
- Progressive blocking system
- Immutable violation logs
- Auto-expiring blocks

### Code Execution Safety
- Restricted imports (no `os`, `sys`, `subprocess`)
- Execution timeout limits
- Resource usage constraints
- Input sanitization

---

## Testing Strategy

### Unit Tests
- Repository layer (mock Firestore)
- Service layer business logic
- Model validation

### Integration Tests
- Full request/response cycle
- Database operations
- External API calls (AI, IPFS)

### End-to-End Tests
- Complete user workflows
- Authentication → Progress → Assessment → Certification
- Anti-cheat violation scenarios

---

## Deployment

### Docker Support
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Running Locally
```bash
# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --port 8000

# Access API
http://localhost:8000
```

---

## Visual Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      SIGNUM BACKEND ARCHITECTURE                        │
│                    FastAPI + Domain-Driven Design                       │
└─────────────────────────────────────────────────────────────────────────┘

                         ┌──────────────┐
                         │   Frontend   │
                         │  (React App) │
                         └───────┬──────┘
                                 │ HTTP/REST API
                                 ▼
                    ┌────────────────────────┐
                    │   FastAPI Router       │
                    │   (main.py)            │
                    └────────┬───────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Middleware   │    │  CORS        │    │ Exception    │
│ Layer        │    │  Config      │    │ Handlers     │
└──────────────┘    └──────────────┘    └──────────────┘
                             │
        ┌────────────────────┼────────────────────────────┐
        │                    │                            │
        ▼                    ▼                            ▼
┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
│ /auth        │    │ /progress    │    │ /assessment        │
│ Routes       │    │ Routes       │    │ Routes             │
└──────┬───────┘    └──────┬───────┘    └──────┬─────────────┘
       │                   │                    │
       │                   │                    │
        ▼                  ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌────────────────────┐
│ /certification│   │ /ai          │    │                    │
│ Routes       │    │ Routes       │    │                    │
└──────┬───────┘    └──────┬───────┘    └────────────────────┘
       │                   │                    
       │                   │                    
       └───────────────────┴──────────────────────┐
                                                  │
                           ┌──────────────────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  DOMAIN SERVICES    │
                ├─────────────────────┤
                │ ▸ QuizService       │
                │ ▸ CodingService     │
                │ ▸ AntiCheatService  │
                │ ▸ AIService         │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  REPOSITORIES       │
                ├─────────────────────┤
                │ ▸ UserRepository    │
                │ ▸ ProgressRepository│
                │ ▸ AssessmentRepo    │
                │ ▸ CertificationRepo │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  DATABASE CLIENT    │
                │  (Firestore)        │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │  Google Cloud       │
                │  Firestore          │
                │  (5 Collections)    │
                └─────────────────────┘


═══════════════════════════════════════════════════════════════════════
                          DOMAIN BREAKDOWN
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 1: AUTHENTICATION (/auth)                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │ Auth Routes  │─────▶│    Session   │─────▶│     User     │    │
│  │   8 endpoints│      │  Management  │      │  Repository  │    │
│  └──────────────┘      └──────────────┘      └──────────────┘    │
│                                                       │            │
│                                                       ▼            │
│                                              ┌──────────────┐     │
│                                              │    users     │     │
│  Handles:                                    │  collection  │     │
│  • Firebase JWT validation                   └──────────────┘     │
│  • User profile management                                        │
│  • Course enrollment                                              │
│  • Phantom wallet connection                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 2: PROGRESS (/progress)                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │   Progress   │─────▶│  Eligibility │─────▶│   Progress   │    │
│  │    Routes    │      │  Calculator  │      │  Repository  │    │
│  │ 3 endpoints  │      └──────────────┘      └──────────────┘    │
│  └──────────────┘                                     │            │
│                                                       ▼            │
│                                              ┌──────────────┐     │
│  Handles:                                    │course_progress│    │
│  • Module completion tracking                │  collection  │     │
│  • Quiz/coding score updates                 └──────────────┘     │
│  • Certification eligibility                                      │
│    (learning×0.7 + exam×0.3 = 100%)                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 3: ASSESSMENT (/assessment)                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │  Assessment  │─────▶│Quiz Service  │─────▶│  Assessment  │    │
│  │   Routes     │      │Coding Service│      │  Repository  │    │
│  │ 9 endpoints  │      │AntiCheat Svc │      └──────────────┘    │
│  └──────────────┘      └──────────────┘              │            │
│                                                       ▼            │
│  Sub-Systems:                            ┌──────────────────────┐ │
│  ┌─────────────────────┐                 │assessment_submissions││
│  │ 1. Quiz (3 routes)  │                 │  collection          ││
│  │    • Get questions  │                 ├──────────────────────┤│
│  │    • Submit answers │                 │anti_cheat_events     ││
│  │    • Get attempts   │                 │  collection          ││
│  └─────────────────────┘                 └──────────────────────┘│
│  ┌─────────────────────┐                                          │
│  │ 2. Coding (3 routes)│                                          │
│  │    • Run test       │                                          │
│  │    • Submit code    │                                          │
│  │    • Get submissions│                                          │
│  └─────────────────────┘                                          │
│  ┌─────────────────────┐                                          │
│  │ 3. Anti-Cheat       │                                          │
│  │    • Report violation│                                         │
│  │    • Check status   │                                          │
│  │    • Clear violations│                                         │
│  └─────────────────────┘                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 4: CERTIFICATION (/certification)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │Certification │─────▶│   Metadata   │─────▶│Certification │    │
│  │   Routes     │      │   Service    │      │  Repository  │    │
│  │ 4 endpoints  │      │  (IPFS)      │      └──────────────┘    │
│  └──────────────┘      └──────────────┘              │            │
│                                                       ▼            │
│                                              ┌──────────────┐     │
│  NFT Workflow:                               │nft_certificates│   │
│  1. Generate certificate HTML                │  collection  │     │
│  2. Convert to PNG image                     └──────────────┘     │
│  3. Upload to IPFS/Arweave                           │            │
│  4. Create metadata JSON                             │            │
│  5. Return URI for Solana mint                       ▼            │
│  6. Save transaction details             ┌──────────────────┐    │
│                                           │ Solana Blockchain│    │
│                                           │   (Devnet)       │    │
│                                           └──────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DOMAIN 5: AI ASSISTANT (/ai)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐    │
│  │  AI Routes   │─────▶│  AI Service  │─────▶│Google Gemini │    │
│  │ 2 endpoints  │      │              │      │  2.5 Flash   │    │
│  └──────────────┘      └──────────────┘      └──────────────┘    │
│                               │                                    │
│                               ▼                                    │
│  Features:            ┌──────────────┐                            │
│  • Context-aware chat │Course Content│                            │
│  • Screen content     │    Store     │                            │
│  • Conversation history└──────────────┘                           │
│  • Safety filtering                                               │
│                                                                     │
│  Use Cases:                                                        │
│  • Answer learning questions                                      │
│  • Explain code concepts                                          │
│  • Debug assistance                                               │
│  • Quiz preparation                                               │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                       REPOSITORY PATTERN LAYER
═══════════════════════════════════════════════════════════════════════

                    ┌────────────────────────┐
                    │   BaseRepository       │
                    ├────────────────────────┤
                    │ + create(id, data)     │
                    │ + get(id)              │
                    │ + update(id, data)     │
                    │ + delete(id)           │
                    │ + set(id, data, merge) │
                    │ + query(filters)       │
                    └───────────┬────────────┘
                                │ (inherits)
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│UserRepository   │   │ProgressRepo     │   │AssessmentRepo   │
├─────────────────┤   ├─────────────────┤   ├─────────────────┤
│+ get_by_email   │   │+ sync_progress  │   │+ create_submission│
│+ create_or_update│  │+ update_quiz    │   │+ get_submissions │
│+ update_profile │   │+ update_coding  │   │+ record_violation│
│+ update_wallet  │   │+ get_eligibility│   │+ create_block   │
│+ enroll_course  │   └─────────────────┘   │+ get_block_status│
│+ soft_delete    │                         │+ clear_violations│
└─────────────────┘                         └─────────────────┘
        │                                            │
        ▼                                            ▼
┌─────────────────┐                         ┌─────────────────┐
│CertificationRepo│                         │assessment_      │
├─────────────────┤                         │ submissions     │
│+ save_certificate│                        │                 │
│+ get_certificate│                         │anti_cheat_events│
│+ delete_cert    │                         └─────────────────┘
└─────────────────┘
        │
        ▼
┌─────────────────┐
│nft_certificates │
└─────────────────┘


═══════════════════════════════════════════════════════════════════════
                         REQUEST FLOW EXAMPLE
                    (User Submits Quiz with Violation)
═══════════════════════════════════════════════════════════════════════

┌─────────────┐
│  Frontend   │ User completes quiz, detects tab switch
└──────┬──────┘
       │
       ├─── 1. Report Violation ────────────────────────────────────┐
       │                                                            │
       │    POST /assessment/{course_id}/anti-cheat/report          │
       │    Body: {violation_type: "tab_switch", timestamp: ...}    │
       │                                                            │
       │    ▼                                                       │
       │    AntiCheatService.report_violation()                     │
       │    ├─→ AssessmentRepo.record_violation()                  │
       │    ├─→ Count total violations (3)                          │
       │    └─→ Create 5-minute block                              │
       │                                                            │
       │    Response: {is_blocked: true, time_remaining: 300000}    │
       │                                                            │
       ├─── 2. Submit Quiz Answers ─────────────────────────────────┤
       │                                                            │
       │    POST /assessment/{course_id}/quiz/{quiz_id}/submit      │
       │    Body: {answers: ["a","b","c"], time_taken: 600}         │
       │                                                            │
       │    ▼                                                       │
       │    QuizService.submit_quiz()                               │
       │    ├─→ Check block status (BLOCKED - reject submission)   │
       │    └─→ Return error: "You are blocked for 5 minutes"      │
       │                                                            │
       └────────────────────────────────────────────────────────────┘
              User must wait 5 minutes before retrying
                           │
                           ▼ (after 5 minutes)
       ┌───────────────────────────────────────┐
       │ Block auto-expires (is_active = false)│
       │ User can submit quiz again            │
       └───────────────────────────────────────┘
```

---

*This backend architecture is designed for scalability, maintainability, and clean separation of concerns using Domain-Driven Design principles.*
# Blockchain Certificate System Documentation

## Overview

Signum mints **NFT certificates on Solana blockchain** when users complete courses with required scores. The system combines smart contract validation, dynamic certificate image generation, and decentralized metadata storage.

**Blockchain:** Solana Devnet (Anchor framework)  
**Smart Contract:** On-chain eligibility validation + NFT minting  
**Certificate Images:** Pillow/PIL template-based generation  
**Metadata Storage:** IPFS (Pinata) or data URIs  
**Wallet Integration:** Phantom wallet for transaction signing  

**Key Features:**
- Multi-user support on same wallet (userId-based PDA)
- Eligibility validation (quiz ≥85%, completion ≥90%)
- Dynamic certificate images with user data
- Metaplex-compliant NFT metadata
- Certificate revocation support


---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────────┤
│  File: CertificationsContent.jsx                                │
│  ├── Phantom Wallet Connection                                  │
│  ├── Eligibility Checking (quiz ≥85%, completion ≥90%)         │
│  ├── Solana Transaction Execution                               │
│  └── Certificate Display                                        │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                        HTTP POST Request
                     localhost:8000/blockchain/mint
                                │
┌───────────────────────────────┴─────────────────────────────────┐
│                     BACKEND (FastAPI)                           │
├─────────────────────────────────────────────────────────────────┤
│  Endpoint: POST /blockchain/mint                                │
│  ├── Verifies eligibility (quiz, completion, anti-cheat)       │
│  ├── CertificateTemplate.generate_certificate()                │
│  ├── MetadataService.generate_metadata()                       │
│  └── Returns metadata URI + certificate image                  │
│                                                                  │
│  Files:                                                         │
│  ├── app/routes/blockchain.py                                  │
│  ├── app/services/metadata_service.py                          │
│  └── app/services/certificate_template.py                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    Certificate Image + Metadata
                                │
┌───────────────────────────────┴─────────────────────────────────┐
│                 SOLANA BLOCKCHAIN                               │
├─────────────────────────────────────────────────────────────────┤
│  Smart Contract: solana/program/programs/program/src/lib.rs     │
│  Program ID: 2EWf5TXq3jW8iQ1yuQorrgmaBc4Wjd8PMwDEBCWod5tp       │
│                                                                  │
│  Instruction: mint_certificate()                                │
│  ├── Validates eligibility (score ≥85, completion ≥90)         │
│  ├── Calculates final score: (quiz × 0.7) + (completion × 0.3) │
│  ├── Mints NFT with metadata URI                               │
│  └── Stores certificate data on-chain                          │
│                                                                  │
│  PDA Derivation:                                                │
│  seeds = ["certificate", wallet, courseId, userId]             │
│  (userId ensures unique certificate per user per wallet)        │
└─────────────────────────────────────────────────────────────────┘
```


---

## Smart Contract Implementation

### Program Details

**File:** `solana/program/programs/program/src/lib.rs`  
**Program ID:** `2EWf5TXq3jW8iQ1yuQorrgmaBc4Wjd8PMwDEBCWod5tp`  
**Framework:** Anchor (Solana smart contract framework)

### Instruction: mint_certificate()

```rust
pub fn mint_certificate(
    ctx: Context<MintCertificate>,
    course_id: String,
    user_id: String,              // Multi-user support
    quiz_score: u8,
    completion_percentage: u8,
    name: String,
    symbol: String,
    uri: String,
) -> Result<()> {
    // Eligibility validation
    require!(quiz_score >= 85, ErrorCode::InsufficientQuizScore);
    require!(completion_percentage >= 90, ErrorCode::InsufficientCompletion);

    // Calculate final score (70% quiz + 30% completion)
    let final_score = ((quiz_score as u16 * 70 + completion_percentage as u16 * 30) / 100) as u8;

    // Store certificate data
    certificate.user_id = user_id;
    certificate.quiz_score = quiz_score;
    certificate.completion_percentage = completion_percentage;
    certificate.final_score = final_score;
    // ... NFT minting logic
}
```

### PDA (Program Derived Address)

**Multi-User Support:** The PDA includes `userId` to allow multiple users on the same wallet.

```rust
#[derive(Accounts)]
#[instruction(course_id: String, user_id: String)]
pub struct MintCertificate<'info> {
    #[account(
        init,
        payer = recipient,
        space = 8 + Certificate::SIZE,
        seeds = [
            b"certificate",
            recipient.key().as_ref(),      // Wallet address
            course_id.as_bytes(),          // Course ID
            user_id.as_bytes()             // User ID (enables multi-user)
        ],
        bump
    )]
    pub certificate: Account<'info, Certificate>,
    // ... other accounts
}
```

**Why userId in PDA?**
- **Without userId:** One wallet = One certificate per course (conflict if shared wallet)
- **With userId:** Multiple users can share wallet, each gets unique certificate
- **Example:** `wallet1 + data-structures + user123` vs `wallet1 + data-structures + user456`

### Certificate Account Structure

```rust
#[account]
pub struct Certificate {
    pub owner: Pubkey,              // Wallet address
    pub course_id: String,          // Course identifier
    pub user_id: String,            // User identifier (Firebase UID)
    pub quiz_score: u8,             // Quiz score (≥85)
    pub completion_percentage: u8,  // Completion (≥90)
    pub final_score: u8,            // Calculated score
    pub mint_address: Pubkey,       // NFT mint address
    pub minted_at: i64,             // Unix timestamp
    pub is_revoked: bool,           // Revocation status
}
```

### Error Codes

```rust
#[error_code]
pub enum ErrorCode {
    #[msg("Quiz score must be at least 85%")]
    InsufficientQuizScore,
    #[msg("Course completion must be at least 90%")]
    InsufficientCompletion,
    #[msg("Certificate has been revoked")]
    CertificateRevoked,
}
```


---

## Certificate Template System

### Overview

**File:** `backend/app/services/certificate_template.py`  
**Library:** Pillow (PIL) for image manipulation  
**Template:** PNG files with dynamic text overlay  

### Template Structure

```
backend/app/templates/certificates/
├── data-structures/
│   └── certificate_template.png  (976 x 693px)
└── [other-courses]/
    └── certificate_template.png
```

### Dynamic Fields Overlaid

**Certificate Generator:**
```python
class CertificateTemplate:
    def generate_certificate(
        course_id: str,
        wallet_address: str,
        final_score: int,
        timestamp: str,
        user_name: str
    ) -> bytes:  # Returns PNG bytes
```

**Overlay Positions:**

| Field | Position | Font | Color |
|-------|----------|------|-------|
| **User Name** | 47% down, centered | 32px bold | Black |
| **Wallet Address** | 54% down, centered | 16px regular | Gray (#555555) |
| **Final Score** | 68.5% down, 51% right | 27px bold | Black |
| **Timestamp** | 82% down, centered | 20px regular | Black |

**Timestamp Format:** "January 15, 2025" (IST timezone)  
**Output:** PNG bytes (for base64 encoding or IPFS upload)

---

## NFT Metadata Generation

### MetadataService

**File:** `backend/app/services/metadata_service.py`  
**Purpose:** Generate Metaplex-compliant NFT metadata with embedded certificate image

```python
class MetadataService:
    def generate_metadata(
        course_id, user_id, quiz_score, 
        completion_percentage, final_score,
        wallet_address, user_name
    ) -> Dict[str, Any]:
```

### Metadata Flow

```
1. Generate certificate image (CertificateTemplate)
   ↓
2. Upload image to IPFS (if configured) or use data URI
   ↓
3. Create metadata JSON (Metaplex standard)
   ↓
4. Upload metadata to IPFS (optional)
   ↓
5. Return: {metadata, metadata_uri, image_uri, certificate_image}
```

### Metadata Structure

```json
{
  "name": "Data Structures Master NFT",
  "symbol": "SGN",
  "description": "Certificate of completion for Data Structures course on Signum",
  "image": "ipfs://Qm..." or "data:image/png;base64,...",
  "attributes": [
    {"trait_type": "Course", "value": "data-structures"},
    {"trait_type": "Quiz Score", "value": 90},
    {"trait_type": "Completion", "value": 95},
    {"trait_type": "Final Score", "value": 91}
  ],
  "properties": {
    "category": "certificate",
    "files": [{"uri": "ipfs://Qm...", "type": "image/png"}]
  }
}
```

### IPFS Integration (Pinata)

**Configuration (.env):**
```bash
PINATA_JWT=your_jwt_token
```

**Fallback:** If Pinata not configured, uses data URIs (base64 encoded images)


---

## Backend API

### POST /blockchain/mint

**Purpose:** Generate certificate metadata and image for Solana minting

**Request:**
```json
{
  "user_id": "firebase_uid_123",
  "course_id": "data-structures",
  "wallet_address": "SolanaWalletAddress...",
  "user_name": "John Doe"
}
```

**Validation:**
- Quiz score ≥ 85%
- Course completion ≥ 90%
- No anti-cheat violations

**Response:**
```json
{
  "success": true,
  "data": {
    "eligible": true,
    "quiz_score": 90,
    "completion_percentage": 95,
    "final_score": 91,
    "metadata": {
      "name": "Data Structures Master NFT",
      "symbol": "SGN",
      "image": "ipfs://Qm...",
      "attributes": [...]
    },
    "metadata_uri": "ipfs://Qm...",
    "certificate_image_url": "data:image/png;base64,..."
  }
}
```

---

## Frontend Implementation

### Mint Flow

**File:** `frontend/src/courses/data-structures/components/CertificationsContent.jsx`

```javascript
const handleMintNFT = async () => {
  // 1. Request metadata from backend
  const response = await fetch('/blockchain/mint', {
    method: 'POST',
    body: JSON.stringify({ 
      user_id, 
      course_id, 
      wallet_address, 
      user_name 
    })
  });
  
  // 2. Generate certificate PDA with userId
  const [certificatePda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('certificate'),
      wallet.publicKey.toBuffer(),
      Buffer.from(courseId),
      Buffer.from(userId)  // Multi-user support
    ],
    program.programId
  );
  
  // 3. Call Solana smart contract
  const tx = await program.methods
    .mintCertificate(
      courseId, 
      userId, 
      quizScore, 
      completion, 
      name, 
      symbol, 
      uri
    )
    .accounts({ 
      certificate: certificatePda,
      mint,
      // ... other accounts
    })
    .rpc();
  
  // 4. Save to Firebase
  await saveNFTStatusToFirebase(imageUrl, tx, mintAddress);
};
```

### Features

**Wallet Integration:**
- Phantom wallet connection
- Address storage in Firebase profile

**Eligibility Display:**
- Quiz score and completion percentage
- Final exam status
- Validation before minting

**Error Handling:**
- Duplicate transaction detection
- Insufficient score errors
- Wallet connection errors
- Insufficient SOL balance


---

## Security & Validation

### Eligibility Requirements

**Quiz Score:** ≥ 85%  
**Course Completion:** ≥ 90%  
**Anti-Cheat:** No violations detected  
**Final Exam:** Passed (if applicable)

### Dual Validation Layers

**1. Backend Validation** (`blockchain.py`)
- Verifies scores against Firestore database
- Checks anti-cheat violation status
- Returns error response if ineligible

**2. Smart Contract Validation** (`lib.rs`)
- Re-validates scores on-chain
- Enforces ≥ 85 quiz, ≥ 90 completion requirements
- Reverts transaction if validation fails

### Security Features

- No private keys stored on backend
- Client-side transaction signing (Phantom wallet)
- On-chain data immutability
- Multi-user support via userId-based PDA
- Certificate revocation capability

---

## System Constraints

**Certificate Uniqueness:**
- One certificate per user per course per wallet
- userId in PDA prevents wallet conflicts
- Multiple users can share same wallet safely

**Eligibility Calculation:**
- Final score = (quiz × 0.7) + (completion × 0.3)
- Both thresholds must be met independently
- Anti-cheat violations block certificate minting

**IPFS/Metadata:**
- Pinata JWT required for IPFS uploads
- Falls back to data URIs if IPFS not configured
- Certificate images generated server-side only

**Blockchain:**
- Solana Devnet only (testing environment)
- Requires SOL balance for transaction fees
- Transaction signing requires Phantom wallet
- PDAs are deterministic (same inputs = same address)

**Testing Features:**
- Certificate closure (returns rent to wallet)
- Available only in development mode
- Not available on production/mainnet

---

## Visual Diagrams

### Diagram 1: Certificate Minting Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              CERTIFICATE MINTING WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │  User completes  │
                    │  course (quiz +  │
                    │  all modules)    │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  Navigate to         │
                  │  Certifications page │
                  └──────────┬───────────┘
                             │
                             ▼
               ┌─────────────────────────────┐
               │  Check Eligibility          │
               │  ├─ Quiz ≥ 85%?             │
               │  ├─ Completion ≥ 90%?       │
               │  └─ Anti-cheat OK?          │
               └──────────┬──────────────────┘
                          │
             ┌────────────┴─────────────┐
             │                          │
          ❌ NO                      ✅ YES
             │                          │
             ▼                          ▼
    ┌─────────────────┐      ┌──────────────────┐
    │ Show ineligible │      │ Enable "Mint NFT"│
    │ message         │      │ button           │
    └─────────────────┘      └────────┬─────────┘
                                      │
                                      │ User clicks "Mint NFT"
                                      ▼
                         ┌────────────────────────┐
                         │ Connect Phantom wallet │
                         └───────────┬────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │ Frontend: handleMintNFT()      │
                    └───────────┬────────────────────┘
                                │
      ┌─────────────────────────┴──────────────────────────┐
      │                                                     │
      ▼                                                     ▼
┌──────────────────────┐                      ┌────────────────────────┐
│ STEP 1:              │                      │ STEP 2:                │
│ Request Metadata     │                      │ Generate PDA           │
├──────────────────────┤                      ├────────────────────────┤
│ POST /blockchain/mint│                      │ PublicKey.find         │
│                      │                      │ ProgramAddressSync()   │
│ Body:                │                      │                        │
│ {                    │                      │ Seeds:                 │
│   user_id,           │                      │ ["certificate",        │
│   course_id,         │                      │  wallet,               │
│   wallet_address,    │                      │  courseId,             │
│   user_name          │                      │  userId]               │
│ }                    │                      │                        │
└──────────┬───────────┘                      └────────┬───────────────┘
           │                                           │
           ▼                                           │
┌──────────────────────────────────────┐              │
│ Backend Processing                   │              │
├──────────────────────────────────────┤              │
│ 1. Verify eligibility (quiz, etc)    │              │
│                                      │              │
│ 2. CertificateTemplate               │              │
│    .generate_certificate()           │              │
│    ├─ Load PNG template              │              │
│    ├─ Overlay: user name             │              │
│    ├─ Overlay: wallet address        │              │
│    ├─ Overlay: final score           │              │
│    └─ Overlay: timestamp             │              │
│    → Returns PNG bytes               │              │
│                                      │              │
│ 3. MetadataService                   │              │
│    .generate_metadata()              │              │
│    ├─ Upload image to IPFS/Pinata    │              │
│    │   (or data URI fallback)        │              │
│    ├─ Create metadata JSON           │              │
│    │   {                              │              │
│    │     name, symbol, description,   │              │
│    │     image: "ipfs://...",         │              │
│    │     attributes: [quiz, completion]│             │
│    │   }                              │              │
│    └─ Upload metadata to IPFS        │              │
│    → Returns metadata_uri            │              │
│                                      │              │
│ 4. Return response:                  │              │
│    {                                 │              │
│      eligible: true,                 │              │
│      quiz_score, completion,         │              │
│      final_score,                    │              │
│      metadata: {...},                │              │
│      metadata_uri: "ipfs://...",     │              │
│      certificate_image_url           │              │
│    }                                 │              │
└──────────┬───────────────────────────┘              │
           │                                           │
           │                                           │
           └───────────────┬───────────────────────────┘
                           │
                           ▼
               ┌───────────────────────────┐
               │ STEP 3:                   │
               │ Call Solana Smart Contract│
               └───────────┬───────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────────┐
        │ program.methods.mintCertificate(         │
        │   courseId,                              │
        │   userId,  // Multi-user support         │
        │   quizScore,                             │
        │   completionPercentage,                  │
        │   name,                                  │
        │   symbol,                                │
        │   metadataUri                            │
        │ )                                        │
        │ .accounts({                              │
        │   certificate: certificatePda,           │
        │   mint,                                  │
        │   recipient,                             │
        │   ...                                    │
        │ })                                       │
        │ .rpc()                                   │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ Solana Smart Contract Execution          │
        ├──────────────────────────────────────────┤
        │ lib.rs: mint_certificate()               │
        │                                          │
        │ 1. Validate eligibility on-chain:        │
        │    require!(quiz_score >= 85)            │
        │    require!(completion >= 90)            │
        │                                          │
        │ 2. Calculate final score:                │
        │    (quiz × 70 + completion × 30) / 100   │
        │                                          │
        │ 3. Create certificate account (PDA):     │
        │    {                                     │
        │      owner: wallet,                      │
        │      course_id,                          │
        │      user_id,                            │
        │      quiz_score,                         │
        │      completion_percentage,              │
        │      final_score,                        │
        │      mint_address,                       │
        │      minted_at: timestamp,               │
        │      is_revoked: false                   │
        │    }                                     │
        │                                          │
        │ 4. Mint NFT with metadata URI            │
        │    (Metaplex Token Metadata)             │
        │                                          │
        │ 5. Return transaction signature          │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────────┐
        │ STEP 4:                                  │
        │ Save to Firebase                         │
        ├──────────────────────────────────────────┤
        │ POST /progress/nft-certificate           │
        │                                          │
        │ {                                        │
        │   user_id,                               │
        │   course_id,                             │
        │   nft_minted: true,                      │
        │   certificate_image_url,                 │
        │   transaction_signature,                 │
        │   mint_address,                          │
        │   timestamp                              │
        │ }                                        │
        └──────────────┬───────────────────────────┘
                       │
                       ▼
               ┌───────────────────┐
               │ SUCCESS!          │
               │                   │
               │ ✅ NFT minted      │
               │ ✅ Stored on-chain │
               │ ✅ Saved to Firebase│
               │ ✅ Display certificate│
               └───────────────────┘


═══════════════════════════════════════════════════════════════════════
                           DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════════

User: John Doe
Course: Data Structures
Quiz Score: 90%
Completion: 95%

         │
         ▼
Frontend checks eligibility → ✅ Pass
         │
         ▼
POST /blockchain/mint
  {
    user_id: "user123",
    course_id: "data-structures",
    wallet_address: "5Yq7...",
    user_name: "John Doe"
  }
         │
         ▼
Backend generates:
  ├─ Certificate Image (PNG)
  │  ├─ Name: "John Doe"
  │  ├─ Wallet: "5Yq7..."
  │  ├─ Score: "91%"
  │  └─ Date: "November 1, 2025"
  │
  ├─ Upload to IPFS → ipfs://QmABC123...
  │
  └─ Metadata JSON
     {
       "name": "Data Structures Master NFT",
       "symbol": "SGN",
       "image": "ipfs://QmABC123...",
       "attributes": [
         {"trait_type": "Quiz Score", "value": 90},
         {"trait_type": "Completion", "value": 95},
         {"trait_type": "Final Score", "value": 91}
       ]
     }
     Upload to IPFS → ipfs://QmXYZ789...
         │
         ▼
Frontend receives metadata_uri: "ipfs://QmXYZ789..."
         │
         ▼
Generate PDA:
  seeds = [
    "certificate",
    "5Yq7...",           // wallet
    "data-structures",   // courseId
    "user123"            // userId
  ]
  → PDA: "Cert8kL9..."
         │
         ▼
Call smart contract:
  program.methods.mintCertificate(
    "data-structures",
    "user123",
    90,
    95,
    "Data Structures Master NFT",
    "SGN",
    "ipfs://QmXYZ789..."
  )
         │
         ▼
Solana processes transaction:
  ├─ Validate: 90 ≥ 85 ✅
  ├─ Validate: 95 ≥ 90 ✅
  ├─ Calculate: (90×70 + 95×30)/100 = 91
  ├─ Create certificate account at PDA
  └─ Mint NFT with metadata URI
         │
         ▼
Transaction signature: "3Kz9..."
         │
         ▼
Save to Firebase:
  nft_certificates/user123_data-structures
  {
    nft_minted: true,
    certificate_image_url: "ipfs://QmABC123...",
    transaction_signature: "3Kz9...",
    mint_address: "NFTMint4X...",
    timestamp: "2025-11-01T12:00:00Z"
  }
         │
         ▼
Display certificate to user ✅
```

---

### Diagram 2: Multi-User PDA Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│            MULTI-USER PDA (Program Derived Address)                 │
└─────────────────────────────────────────────────────────────────────┘

Problem: What if multiple users share the same Phantom wallet?

┌──────────────────────────────────────────────────────────────────┐
│ WITHOUT userId in PDA (Old Approach)                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A                   User B                                 │
│  ├─ user_id: "alice"      ├─ user_id: "bob"                     │
│  └─ wallet: "Wallet1..."  └─ wallet: "Wallet1..." (same!)       │
│                                                                  │
│  Both try to mint for "data-structures" course                  │
│                                                                  │
│  PDA seeds:                                                      │
│  ├─ "certificate"                                                │
│  ├─ "Wallet1..."                                                 │
│  └─ "data-structures"                                            │
│                                                                  │
│  Generated PDA: "CertXYZ..."                                     │
│                                                                  │
│  ❌ CONFLICT: Same PDA for both users!                           │
│  ❌ Second mint transaction fails: "Account already exists"      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│ WITH userId in PDA (Current Approach)                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  User A                                                          │
│  ├─ user_id: "alice"                                             │
│  ├─ wallet: "Wallet1..."                                         │
│  └─ course: "data-structures"                                    │
│                                                                  │
│  PDA seeds:                                                      │
│  ├─ "certificate"                                                │
│  ├─ "Wallet1..."                                                 │
│  ├─ "data-structures"                                            │
│  └─ "alice"  ← Unique identifier                                 │
│                                                                  │
│  Generated PDA: "CertABC..."                                     │
│                                                                  │
│  ✅ Certificate minted successfully                              │
│                                                                  │
│  ───────────────────────────────────────────────────────────     │
│                                                                  │
│  User B                                                          │
│  ├─ user_id: "bob"                                               │
│  ├─ wallet: "Wallet1..." (same wallet!)                          │
│  └─ course: "data-structures"                                    │
│                                                                  │
│  PDA seeds:                                                      │
│  ├─ "certificate"                                                │
│  ├─ "Wallet1..."                                                 │
│  ├─ "data-structures"                                            │
│  └─ "bob"  ← Different userId                                    │
│                                                                  │
│  Generated PDA: "CertDEF..."  (different from User A!)           │
│                                                                  │
│  ✅ Certificate minted successfully                              │
│                                                                  │
│  ───────────────────────────────────────────────────────────     │
│                                                                  │
│  Result:                                                         │
│  ✅ Both users have unique certificates                          │
│  ✅ Same wallet, different PDAs                                  │
│  ✅ No conflicts                                                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        PDA GENERATION LOGIC
═══════════════════════════════════════════════════════════════════════

Frontend (JavaScript):
┌──────────────────────────────────────────────────────────────────┐
│ const [certificatePda, bump] = PublicKey.findProgramAddressSync( │
│   [                                                              │
│     Buffer.from('certificate'),                                  │
│     wallet.publicKey.toBuffer(),                                 │
│     Buffer.from(courseId),                                       │
│     Buffer.from(userId)  // ← Added for uniqueness               │
│   ],                                                             │
│   programId                                                      │
│ );                                                               │
└──────────────────────────────────────────────────────────────────┘

Smart Contract (Rust):
┌──────────────────────────────────────────────────────────────────┐
│ #[account(                                                       │
│   init,                                                          │
│   seeds = [                                                      │
│     b"certificate",                                              │
│     recipient.key().as_ref(),                                    │
│     course_id.as_bytes(),                                        │
│     user_id.as_bytes()  // ← Added for uniqueness                │
│   ],                                                             │
│   bump                                                           │
│ )]                                                               │
│ pub certificate: Account<'info, Certificate>                     │
└──────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                         REAL-WORLD EXAMPLE
═══════════════════════════════════════════════════════════════════════

Scenario: Family sharing one Phantom wallet

Family Wallet: "5Yq7mKGPXJb..."

├─ Dad (user_id: "dad123")
│  Completes: Data Structures
│  PDA: ["certificate", "5Yq7...", "data-structures", "dad123"]
│  Certificate: ✅ Minted at CertABC...
│
├─ Mom (user_id: "mom456")
│  Completes: Data Structures (same course!)
│  PDA: ["certificate", "5Yq7...", "data-structures", "mom456"]
│  Certificate: ✅ Minted at CertDEF... (different PDA!)
│
└─ Kid (user_id: "kid789")
   Completes: Data Structures (same course!)
   PDA: ["certificate", "5Yq7...", "data-structures", "kid789"]
   Certificate: ✅ Minted at CertGHI... (different PDA!)

All three certificates exist on-chain simultaneously! ✅
```
# Database Schema Documentation

## Overview

Signum uses **Google Cloud Firestore** as its primary NoSQL database. The database architecture follows a **Domain-Driven Design (DDD)** pattern with 5 optimized collections that support the complete learning platform lifecycle: user management, progress tracking, assessments, anti-cheat monitoring, and blockchain certification.

**Total Collections:** 5  
**Database Type:** Cloud Firestore (NoSQL)  
**Access Pattern:** Repository Pattern with domain-specific services

---

## Collections

### 1. `users`
**Purpose:** Core user identity, authentication, profile management, and course enrollment tracking.

**Document ID:** User email address (e.g., `user@example.com`)

**Schema:**
```javascript
{
  // Identity
  uid: string,                          // Firebase Auth UID
  email: string,                        // Primary identifier
  displayName: string,                  // User's full name
  photoURL: string,                     // Profile picture URL
  
  // Profile
  bio: string,                          // User biography
  interests: [string],                  // Array of interests/skills
  
  // Blockchain
  phantomWalletAddress: string,         // Solana Phantom wallet address
  
  // Course Management
  coursesEnrolled: [string],            // Array of course IDs
  
  // Account Status
  isDeleted: boolean,                   // Soft delete flag
  deletedAt: timestamp,                 // Deletion timestamp
  
  // Audit
  createdAt: timestamp,                 // Account creation time
  lastLoginAt: timestamp                // Last login time
}
```

**Key Operations:**
- User registration and authentication
- Profile updates (bio, interests)
- Phantom wallet connection
- Course enrollment management
- Soft account deletion

**Indexes:** Email (primary key)

---

### 2. `course_progress`
**Purpose:** Track learning module completion, quiz scores, coding challenge results, and certification eligibility.

**Document ID:** `{user_id}_{course_id}` (e.g., `user123_data-structures`)

**Schema:**
```javascript
{
  // Identification
  user_id: string,                      // Reference to user
  course_id: string,                    // Course identifier
  
  // Learning Progress
  modules_completed: [string],          // Array of completed module IDs
  completion_percentage: number,        // 0-100, learning modules only
  
  // Quiz Performance
  quiz: {
    best_score: number,                 // Highest score achieved (0-100)
    last_score: number,                 // Most recent score
    attempts: number,                   // Total quiz attempts
    passed: boolean,                    // True if score >= 85%
    last_attempt: timestamp             // Last quiz submission time
  },
  
  // Coding Challenge Performance
  coding: {
    completed: boolean,                 // Challenge completion status
    best_score: number,                 // Highest score achieved (0-100)
    last_score: number,                 // Most recent score
    problem_id: string,                 // Challenge problem identifier
    language: string,                   // Programming language used
    code: string,                       // Last submitted code
    last_submission: timestamp          // Last coding submission time
  },
  
  // Tracking
  last_updated: timestamp               // Last progress sync time
}
```

**Certification Eligibility Calculation:**
- Learning Progress: 100% of modules completed
- Quiz: Score ≥ 85% (50% of final exam)
- Coding: Challenge completed (50% of final exam)
- Overall: `(learning_progress × 0.7) + (final_exam_score × 0.3) = 100%`

**Key Operations:**
- Sync module completion
- Update quiz/coding scores
- Calculate certification eligibility
- Track best scores across attempts

**Indexes:** Composite index on `(user_id, course_id)`

---

### 3. `assessment_submissions`
**Purpose:** Store complete submission history for quizzes and coding challenges with detailed results.

**Document ID:** UUID (auto-generated)

**Schema:**
```javascript
{
  // Identification
  id: string,                           // UUID submission ID
  user_id: string,                      // Reference to user
  course_id: string,                    // Course identifier
  type: string,                         // "quiz" or "coding"
  
  // Results
  score: number,                        // Final score (0-100)
  submitted_at: timestamp,              // Submission time
  
  // Quiz-Specific Fields (when type = "quiz")
  answers: [
    {
      question_id: string,              // Question identifier
      user_answer: string,              // Selected answer
      correct_answer: string,           // Correct answer
      is_correct: boolean               // Correctness flag
    }
  ],
  
  // Coding-Specific Fields (when type = "coding")
  code: string,                         // Submitted source code
  problem_id: string,                   // Challenge problem ID
  language: string,                     // Programming language
  test_results: [
    {
      test_case: number,                // Test case number
      passed: boolean,                  // Test result
      input: string,                    // Test input
      expected: string,                 // Expected output
      output: string,                   // Actual output
      execution_time: number            // Time in milliseconds
    }
  ],
  time_complexity: {
    analysis: string,                   // Big-O notation
    explanation: string                 // Complexity explanation
  }
}
```

**Key Operations:**
- Record quiz submissions with detailed answers
- Store coding submissions with test results
- Retrieve submission history
- Calculate best scores

**Indexes:** 
- Composite: `(user_id, course_id, type)`
- Sort: `submitted_at DESC`

---

### 4. `anti_cheat_events`
**Purpose:** Monitor and enforce academic integrity through violation tracking and assessment blocking.

**Document ID:** 
- Violations: UUID (auto-generated)
- Blocks: `{user_id}_{course_id}_{assessment_type}_block`

**Schema:**

**Violation Event:**
```javascript
{
  // Identification
  id: string,                           // UUID event ID
  user_id: string,                      // Reference to user
  course_id: string,                    // Course identifier
  assessment_type: string,              // "quiz" or "coding"
  event_type: "violation",              // Event type marker
  
  // Violation Details
  violation_type: string,               // "tab_switch", "copy_paste", "devtools", etc.
  timestamp: string,                    // ISO 8601 timestamp
  created_at: timestamp                 // Database entry time
}
```

**Block Event:**
```javascript
{
  // Identification
  id: string,                           // Composite ID (user_course_type_block)
  user_id: string,                      // Reference to user
  course_id: string,                    // Course identifier
  assessment_type: string,              // "quiz" or "coding"
  event_type: "block",                  // Event type marker
  
  // Block Details
  violation_count: number,              // Number of violations triggering block
  block_end_time: timestamp,            // Block expiration time
  blocked_at: timestamp,                // Block creation time
  is_active: boolean                    // Block status
}
```

**Violation Thresholds:**
- 3 violations → 5-minute block
- 5 violations → 15-minute block
- 7 violations → 30-minute block
- 10+ violations → 1-hour block

**Detected Violations:**
- Tab switching (fullscreen exit)
- Copy/paste operations
- Developer tools access
- Browser blur/focus events
- Right-click/context menu

**Key Operations:**
- Record real-time violations
- Calculate block duration
- Check block status
- Auto-expire blocks
- Clear violations (testing mode)

**Indexes:**
- Composite: `(user_id, course_id, assessment_type, event_type)`
- Filter: `is_active = true`

---

### 5. `nft_certificates`
**Purpose:** Record blockchain NFT certificate minting details and verification data.

**Document ID:** `{user_id}_{course_id}_nft` (e.g., `user123_data-structures_nft`)

**Schema:**
```javascript
{
  // Identification
  user_id: string,                      // Reference to user
  course_id: string,                    // Course identifier
  
  // Certificate Details
  certificate_image_url: string,        // IPFS/Arweave image URL
  
  // Blockchain Data (Solana)
  transaction_signature: string,        // Solana transaction hash
  mint_address: string,                 // NFT mint public key
  minted_at: string,                    // ISO 8601 minting timestamp
  
  // Tracking
  saved_at: timestamp                   // Database save time
}
```

**Blockchain Integration:**
- Network: Solana Devnet
- Token Standard: Metaplex NFT
- Storage: IPFS/Arweave (off-chain metadata)
- Wallet: Phantom (user-side), System Program (server-side)

**Key Operations:**
- Save NFT minting transaction
- Verify certificate existence
- Retrieve certificate details
- Delete certificate (testing mode only)

**Indexes:** Composite primary key `(user_id, course_id)`

---

## Database Architecture

### Design Principles

1. **Denormalization by Design**
   - Quiz/coding scores stored in both `course_progress` (current best) and `assessment_submissions` (history)
   - Optimizes read performance for dashboard displays
   - Reduces join operations in NoSQL environment

2. **Composite Document IDs**
   - Pattern: `{user_id}_{course_id}_{optional_suffix}`
   - Enables efficient single-document lookups
   - Eliminates need for complex queries

3. **Event Sourcing for Anti-Cheat**
   - Immutable violation records
   - Separate block state management
   - Enables violation history audit trails

4. **Soft Deletes**
   - Users: `isDeleted` flag preserves data integrity
   - Certificates: Hard delete only in testing mode
   - Maintains referential context for historical records

### Data Flow

```
User Authentication (Firebase Auth)
    ↓
users collection (profile + enrollment)
    ↓
course_progress (learning tracking)
    ↓
assessment_submissions (quiz/coding results)
    ↓ (if violations detected)
anti_cheat_events (monitoring)
    ↓ (if eligible)
nft_certificates (blockchain proof)
```

---

## Repository Pattern

Each collection has a dedicated repository class providing CRUD operations:

| Repository | Collection | Primary Methods |
|------------|-----------|-----------------|
| `UserRepository` | `users` | `create_or_update_user`, `update_profile`, `enroll_course`, `update_wallet` |
| `ProgressRepository` | `course_progress` | `sync_progress`, `update_quiz_progress`, `update_coding_progress`, `get_certification_eligibility` |
| `AssessmentRepository` | `assessment_submissions` + `anti_cheat_events` | `create_submission`, `get_user_submissions`, `record_violation`, `create_block`, `get_block_status` |
| `CertificationRepository` | `nft_certificates` | `save_certificate`, `get_certificate`, `delete_certificate` |

---

## Query Patterns

### Common Queries

**Get User Progress:**
```python
progress_repo.get_user_course_progress(user_id, course_id)
# Returns: Single document from course_progress
```

**Check Certification Eligibility:**
```python
progress_repo.get_certification_eligibility(user_id, course_id)
# Calculates: learning (70%) + final exam (30%) = 100%
```

**Get Submission History:**
```python
assessment_repo.get_user_submissions(user_id, course_id, type="quiz", limit=10)
# Returns: Last 10 quiz submissions ordered by submitted_at DESC
```

**Check Anti-Cheat Status:**
```python
assessment_repo.get_block_status(user_id, course_id, assessment_type="quiz")
# Returns: Block status with time remaining
```

**Verify NFT Certificate:**
```python
cert_repo.get_certificate(user_id, course_id)
# Returns: Certificate with blockchain transaction details
```

---

## Optimization Strategies

### Indexing
- **Primary Keys:** Email (users), composite IDs (other collections)
- **Query Indexes:** `(user_id, course_id)` across all collections
- **Sort Indexes:** `submitted_at DESC` for chronological queries

### Caching
- Session tokens stored in-memory (not in database)
- User profile cached on frontend after `/auth/me` call
- Progress synced only on module completion (not real-time)

### Data Lifecycle
- **Violations:** Auto-cleared after block expiration
- **Submissions:** Retained indefinitely for audit trails
- **Certificates:** Immutable once minted (blockchain-backed)
- **Users:** Soft-deleted, never hard-deleted

---

## Security & Compliance

### Access Control
- Authentication: Firebase session tokens
- Authorization: Row-level via `user_id` matching
- Wallet Verification: Public key validation before NFT minting

### Data Integrity
- Anti-cheat events: Immutable append-only logs
- Submissions: Cryptographically linked to user sessions
- Blockchain records: Verified against Solana explorer

### Privacy
- Personal data: Email, name, photo (GDPR-compliant soft delete)
- Learning data: Not shared between users
- Blockchain: Public NFT metadata, private user identity

---

## Migration Path

Current schema supports future expansion:

**Planned Additions:**
- `course_analytics` - Aggregated learning metrics
- `leaderboards` - Performance rankings
- `peer_reviews` - Collaborative assessments

**Backward Compatibility:**
- All new fields optional with defaults
- Existing documents auto-migrated on read
- No breaking changes to API contracts

---

## Performance Metrics

**Expected Query Times (95th percentile):**
- User authentication: <100ms
- Progress sync: <150ms
- Submission retrieval: <200ms
- Anti-cheat check: <80ms
- Certificate lookup: <100ms

**Scalability:**
- Supports: 100,000+ concurrent users
- Storage: ~5KB per user, ~50KB per course completion
- Firestore quotas: Well within free tier for development

---

## Technical Stack

**Database:** Google Cloud Firestore  
**ORM Pattern:** Repository Pattern with Firebase Admin SDK  
**Authentication:** Firebase Authentication  
**Blockchain:** Solana (Devnet)  
**Storage:** IPFS/Arweave (NFT metadata)

---

## Visual Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SIGNUM DATABASE ARCHITECTURE                         │
│                        Google Cloud Firestore (NoSQL)                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────┐
│  COLLECTION: users        │
│  ID: email                │
├───────────────────────────┤
│ ▸ uid                     │──┐
│ ▸ email                   │  │
│ ▸ displayName             │  │
│ ▸ photoURL                │  │
│ ▸ bio                     │  │ USER IDENTITY
│ ▸ interests []            │  │ & PROFILE
│ ▸ phantomWalletAddress    │  │
│ ▸ coursesEnrolled []      │  │
│ ▸ isDeleted               │  │
│ ▸ createdAt               │  │
│ ▸ lastLoginAt             │──┘
└───────────────────────────┘
         │
         │ enrolled in
         ▼
┌────────────────────────────────────┐
│  COLLECTION: course_progress       │
│  ID: {user_id}_{course_id}         │
├────────────────────────────────────┤
│ ▸ user_id                          │──┐
│ ▸ course_id                        │  │
│ ▸ modules_completed []             │  │ LEARNING
│ ▸ completion_percentage            │  │ PROGRESS
│ ▸ quiz: {                          │  │ TRACKING
│     best_score, last_score,        │  │
│     attempts, passed               │  │
│   }                                │  │
│ ▸ coding: {                        │  │
│     completed, best_score,         │  │
│     problem_id, language, code     │  │
│   }                                │  │
│ ▸ last_updated                     │──┘
└────────────────────────────────────┘
         │
         │ submissions
         ▼
┌─────────────────────────────────────────┐
│  COLLECTION: assessment_submissions     │
│  ID: UUID                               │
├─────────────────────────────────────────┤
│ ▸ id                                    │──┐
│ ▸ user_id                               │  │
│ ▸ course_id                             │  │
│ ▸ type ("quiz" | "coding")              │  │ SUBMISSION
│ ▸ score                                 │  │ HISTORY
│ ▸ submitted_at                          │  │
│                                         │  │
│ [IF type = "quiz"]                      │  │
│ ▸ answers: [{                           │  │
│     question_id, user_answer,           │  │
│     correct_answer, is_correct          │  │
│   }]                                    │  │
│                                         │  │
│ [IF type = "coding"]                    │  │
│ ▸ code, problem_id, language            │  │
│ ▸ test_results: [{                      │  │
│     test_case, passed, input,           │  │
│     expected, output, execution_time    │  │
│   }]                                    │  │
│ ▸ time_complexity: {                    │  │
│     analysis, explanation               │  │
│   }                                     │──┘
└─────────────────────────────────────────┘
         │
         │ monitored by
         ▼
┌──────────────────────────────────────────┐
│  COLLECTION: anti_cheat_events           │
│  ID: UUID | {user_course_type}_block     │
├──────────────────────────────────────────┤
│ [VIOLATION EVENT]                        │──┐
│ ▸ id                                     │  │
│ ▸ user_id                                │  │
│ ▸ course_id                              │  │
│ ▸ assessment_type                        │  │ ACADEMIC
│ ▸ event_type: "violation"                │  │ INTEGRITY
│ ▸ violation_type                         │  │ MONITORING
│ ▸ timestamp                              │  │
│                                          │  │
│ [BLOCK EVENT]                            │  │
│ ▸ id                                     │  │
│ ▸ user_id                                │  │
│ ▸ course_id                              │  │
│ ▸ assessment_type                        │  │
│ ▸ event_type: "block"                    │  │
│ ▸ violation_count                        │  │
│ ▸ block_end_time                         │  │
│ ▸ is_active                              │──┘
└──────────────────────────────────────────┘

         [WHEN ELIGIBLE: 100% completion]
         
┌─────────────────────────────────────────┐
│  COLLECTION: nft_certificates           │
│  ID: {user_id}_{course_id}_nft          │
├─────────────────────────────────────────┤
│ ▸ user_id                               │──┐
│ ▸ course_id                             │  │
│ ▸ certificate_image_url (IPFS)          │  │ BLOCKCHAIN
│ ▸ transaction_signature (Solana)        │  │ CERTIFICATES
│ ▸ mint_address (NFT)                    │  │
│ ▸ minted_at                             │  │
│ ▸ saved_at                              │──┘
└─────────────────────────────────────────┘
         │
         │ verified on
         ▼
    ┌─────────────────┐
    │ Solana Devnet   │
    │ (Blockchain)    │
    └─────────────────┘


═══════════════════════════════════════════════════════════════════════════
                            DATA RELATIONSHIPS
═══════════════════════════════════════════════════════════════════════════

users.email ──────────► course_progress.user_id
                             │
                             ├──────► assessment_submissions.user_id
                             │
                             ├──────► anti_cheat_events.user_id
                             │
                             └──────► nft_certificates.user_id

users.coursesEnrolled[] ───► course_progress.course_id


═══════════════════════════════════════════════════════════════════════════
                          CERTIFICATION FLOW
═══════════════════════════════════════════════════════════════════════════

  ┌─────────────┐
  │ User Login  │
  └──────┬──────┘
         │
         ▼
  ┌──────────────────┐
  │ Enroll in Course │ ───► users.coursesEnrolled[]
  └──────┬───────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Complete Modules     │ ───► course_progress.modules_completed[]
  │ (100% required)      │      course_progress.completion_percentage = 100
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Take Quiz            │ ───► assessment_submissions (type: quiz)
  │ (85%+ required)      │      course_progress.quiz.best_score >= 85
  └──────┬───────────────┘      course_progress.quiz.passed = true
         │
         │ [Anti-Cheat Monitoring Active]
         │ ───► anti_cheat_events.event_type = "violation"
         │      (tab switch, copy/paste, devtools, etc.)
         │
         ▼
  ┌──────────────────────┐
  │ Coding Challenge     │ ───► assessment_submissions (type: coding)
  │ (Pass all tests)     │      course_progress.coding.completed = true
  └──────┬───────────────┘      course_progress.coding.best_score
         │
         │ [Anti-Cheat Monitoring Active]
         │ ───► anti_cheat_events.event_type = "violation"
         │
         ▼
  ┌──────────────────────┐
  │ Eligibility Check    │
  │ Learning: 100%       │
  │ Quiz: Passed (85%+)  │ ───► course_progress (eligibility calculation)
  │ Coding: Completed    │      (learning × 0.7) + (final_exam × 0.3) = 100%
  │ Overall: 100%        │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Connect Phantom      │ ───► users.phantomWalletAddress
  │ Wallet               │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │ Mint NFT Certificate │ ───► nft_certificates.transaction_signature
  │ (Solana Blockchain)  │      nft_certificates.mint_address
  └──────────────────────┘      nft_certificates.certificate_image_url (IPFS)


═══════════════════════════════════════════════════════════════════════════
                        ANTI-CHEAT VIOLATION FLOW
═══════════════════════════════════════════════════════════════════════════

  Violation Detected
  (tab switch, copy, devtools, etc.)
         │
         ▼
  ┌─────────────────────┐
  │ Record Violation    │ ───► anti_cheat_events (event_type: "violation")
  └──────┬──────────────┘
         │
         ▼
  Check Total Violations
         │
         ├─── 3 violations ───► 5-minute block
         ├─── 5 violations ───► 15-minute block
         ├─── 7 violations ───► 30-minute block
         └─── 10+ violations ─► 1-hour block
         │
         ▼
  ┌─────────────────────┐
  │ Create Block Event  │ ───► anti_cheat_events (event_type: "block")
  │                     │      block_end_time, is_active = true
  └──────┬──────────────┘
         │
         ▼
  User Cannot Submit Quiz/Coding
  Until block_end_time Expires
         │
         ▼
  Auto-Clear on Expiration
  (is_active = false)
```

---

*This schema is optimized for the Signum AI-powered learning platform, supporting interactive education, real-time anti-cheat monitoring, and blockchain-verified credentials.*# FRONTEND DOCUMENTATION

## Overview

The Signum frontend is a modern single-page application built with React 19, designed to deliver an interactive learning platform for data structures and blockchain courses. The architecture emphasizes real-time state synchronization, client-side routing without external routing libraries, and modular component design. The application integrates Firebase Authentication for user management, Solana Web3.js for blockchain interactions, and a custom AI assistant powered by Gemini 2.5 Flash.

The frontend operates as a thin client that communicates with the backend through a RESTful API layer, using React Context for global state management and sessionStorage for state persistence across page reloads. The application supports feature flags for production control, enabling or disabling AI assistance, anti-cheat systems, blockchain certificates, and voice input capabilities.

## Technology Stack

**Core Framework:**
- React 19.1.1 (concurrent rendering, automatic batching)
- Vite 7.1.2 (build tool with HMR)
- Tailwind CSS 4.1.11 (utility-first styling)

**State Management:**
- React Context API (ProgressContext, AIContext)
- sessionStorage for persistence
- No Redux or external state libraries

**Authentication:**
- Firebase Auth 12.2.1 (Google OAuth)
- Firebase Firestore (progress synchronization)
- HTTP-only cookies for backend sessions

**Blockchain:**
- @solana/web3.js 1.98.4 (Solana blockchain interactions)
- @coral-xyz/anchor 0.32.1 (Anchor program client)
- Phantom wallet integration

**Code & Content:**
- Monaco Editor 4.7.0 (code editing with syntax highlighting)
- React Markdown 10.1.0 (course content rendering)
- highlight.js 11.11.2 (syntax highlighting)
- KaTeX 0.16.17 (mathematical notation)

**UI Components:**
- Lucide React 0.547.0 (icon library)
- Custom components (no external UI library)

## Application Architecture

### Entry Point

**main.jsx**: Renders the application root with React 19 StrictMode, mounts to `#root` element.

**App.jsx**: Main application container managing:
- Authentication state (Firebase auth listener)
- Global navigation state (currentPage, selectedCourse, selectedTopic)
- Session persistence (loads/saves state to sessionStorage)
- Provider composition (AIProvider → ProgressProvider → application)
- Client-side routing logic

### Routing System

The application uses a **custom client-side routing system** without React Router. Navigation is managed through state variables:

**State-Based Routing:**
```javascript
currentPage: 'dashboard' | 'course' | 'quiz' | 'coding-challenge' | 'profile' | 'about' | 'login'
selectedCourse: 'data-structures' | 'solana-blockchain' | null
selectedTopic: string | null
```

**Navigation Flow:**
1. User clicks navigation element (e.g., course card, header link)
2. Parent component calls `onNavigate()` or `navigateTo()`
3. App.jsx updates state variables
4. React re-renders with new page component
5. State saved to sessionStorage for persistence
6. Browser history API updates URL (history.pushState)

**Session Persistence:**
- On load: Check sessionStorage for saved state
- On navigation: Save state to sessionStorage
- On reload: Restore state from sessionStorage
- Session cleared on logout

### Page Components

**1. Login Page (Login.jsx)**
- Google OAuth authentication via Firebase
- Animated feature showcase (typewriter effect)
- Backend token verification on successful login
- Responsive design with logo and feature highlights

**2. Dashboard (Dashboard.jsx)**
- Course catalog display (2 courses: Data Structures, Solana Blockchain)
- "Continue Learning" section for enrolled courses with progress
- "Available Courses" section for unenrolled courses
- Course enrollment flow
- Progress percentage and quiz scores per course

**3. Course Content (CourseContent.jsx)**
- Dynamic course outline rendering from courseRegistry
- Auto-hide header/footer on scroll (better reading experience)
- Progress bar showing completion percentage
- Module navigation with locked/unlocked indicators
- Content rendering: Markdown, visualizations, quiz, coding challenge, certification
- Module completion tracking integrated with ProgressContext

**4. Quiz Page (QuizPage.jsx)**
- Multi-choice question display
- Anti-cheat detection system (if enabled)
- Real-time answer selection and submission
- Score calculation and feedback
- Integration with backend quiz evaluation
- Retry logic based on course configuration

**5. Coding Challenge Page (CodingChallengePage.jsx)**
- Monaco Editor integration for code editing
- Language selection (Python, JavaScript, C++, Java)
- Code execution via backend sandbox
- Test case validation
- Submission with anti-cheat monitoring
- Real-time output display

**6. Profile Page (Profile.jsx)**
- User profile display and editing
- Phantom wallet connection
- Bio, interests, preferences management
- Enrolled courses list
- Account deletion option
- Backend synchronization for profile updates

**7. About Page (About.jsx)**
- Platform information and mission
- Feature highlights
- Contact information

### State Management

**ProgressContext (Global Progress State):**

Manages course progress, module completion, and quiz attempts across the application.

**State Structure:**
```javascript
{
  moduleProgress: {
    [courseId]: {
      [moduleId]: { completed: boolean, timestamp: Date }
    }
  },
  courseProgress: {
    [courseId]: {
      completedModules: string[],
      totalModules: number,
      lastAccessedModule: string,
      progress: number,
      quiz_score: number,
      coding_score: number,
      final_score: number
    }
  },
  quizAttempts: {
    [courseId]: number
  }
}
```

**Key Functions:**
- `loadProgressFromFirebase(courseId)`: Fetches progress from Firebase Firestore
- `syncCourseProgress(courseId, progressData)`: Syncs progress to backend and Firebase
- `markModuleComplete(courseId, moduleId)`: Marks module as complete, excludes quiz/certification
- `calculateProgressPercentage(courseId)`: Calculates percentage based on completed learning modules
- `getCourseProgress(courseId)`: Returns course-specific progress object

**Firebase Synchronization:**
- User identification: `window.currentUser.uid` from Firebase Auth
- Collection: `user_progress/{userId}/courses/{courseId}`
- Document structure: Matches courseProgress state
- Real-time updates on module completion

**AIContext (AI Assistant State):**

Manages AI chat functionality, conversation history, and feature flag integration.

**State Structure:**
```javascript
{
  conversationHistory: [
    { role: 'user' | 'model', parts: [{ text: string }] }
  ],
  isLoading: boolean,
  currentContext: { courseId, topicId, content } | null,
  aiEnabled: boolean,
  testingMode: boolean
}
```

**Key Functions:**
- `chat(userMessage)`: Sends message to AI backend, updates conversation history
- `clearHistory()`: Resets conversation (e.g., on topic change)
- `setContext(context)`: Sets current learning context for AI (course, topic)

**Feature Flag Integration:**
- Checks `isAIEnabled()` before rendering AI components
- Displays testing mode indicator when in development
- Disables chat functionality if feature flag is off

### Component Architecture

**Layout Components:**

**Layout.jsx**: Wrapper component providing consistent page structure
- Header (user info, navigation, logout)
- Main content area (children)
- Footer (copyright, links)

**Header.jsx**: Top navigation bar
- Logo and navigation links
- User profile display
- Logout functionality
- Active page highlighting

**Footer.jsx**: Bottom page footer
- Copyright information
- Social links (if applicable)

**Utility Components:**

**LoadingButton.jsx**: Button with loading state
- Prevents double-clicks during async operations
- Spinner animation during loading
- Disabled state management

**ProgressBar.jsx**: Visual progress indicator
- Percentage-based bar
- Animated fill transition
- Used in Dashboard and CourseContent

**Toast.jsx**: Notification system
- Success, error, info types
- Auto-dismiss after timeout
- Custom hook: `useToast()`

**EmptyState.jsx**: Placeholder for empty data
- Used when no courses enrolled
- Customizable message and icon

**SkeletonLoader.jsx**: Loading placeholder
- Shimmer animation
- Used during async data fetching

**CourseCard.jsx**: Course display card
- Course title, description, image
- Progress bar (if enrolled)
- Enrollment/continue button

**CompletionTracker.jsx**: Module completion checklist
- Visual checkmarks for completed modules
- Progress percentage
- Used in course content sidebar

**AI Components:**

**AIAssistant.jsx**: Floating AI button
- Bottom-right corner fixed position
- Green glow animation
- Testing mode indicator (yellow dot)
- Opens AIChat modal on click
- Hidden when AI feature is disabled

**AIChat.jsx**: AI chat interface
- Full-screen modal overlay
- Conversation history display
- Message input with send button
- Context-aware responses
- Clear history button
- Close button

**AIHelper.jsx**: Contextual AI integration
- Embedded AI assistance within course content
- Automatically sets context based on current topic

**Visualization Components:**

Seven interactive algorithm visualizations for data structures course:
- **Array1D.jsx**: 1D array visualization with index highlighting
- **Array2D.jsx**: 2D matrix visualization with row/column selection
- **StackVisualization.jsx**: Stack push/pop operations
- **QueueVisualization.jsx**: Queue enqueue/dequeue operations
- **SinglyLinkedList.jsx**: Singly linked list traversal and operations
- **DoublyLinkedList.jsx**: Doubly linked list bidirectional traversal
- **TreeVisualization.jsx**: Binary tree visualization with traversal algorithms

**Common Features:**
- Step-by-step execution with play/pause controls
- Pseudocode highlighting synchronized with visualization
- Auto-play mode with speed control
- Reset functionality
- Educational annotations

### Service Layer

**progressService.js**: Backend API integration for progress and assessments

**Endpoints:**
- `syncCourseProgress(courseId, progressData)`: POST to `/progress/{courseId}/sync`
- `getCourseProgress(courseId)`: GET from `/progress/{courseId}`
- `submitQuiz(courseId, quizId, answers)`: POST to `/assessment/{courseId}/quiz/{quizId}/submit`
- `submitCodingChallenge(courseId, challengeData)`: POST to `/assessment/{courseId}/coding/submit`
- `getNFTCertificate(courseId)`: GET from `/certification/{courseId}/status`

**Error Handling:**
- Try-catch blocks with console logging
- Graceful fallbacks (e.g., return null on error)
- User-facing error messages via Toast

**ai/aiService.js**: AI backend integration

**Endpoints:**
- `sendMessage(conversationHistory, context)`: POST to `/ai/chat`
- `getAIStatus()`: GET from `/ai/status`

**api.js**: Centralized API configuration

**Features:**
- Base URL configuration: `http://localhost:8000`
- Endpoint organization by domain (AUTH, PROGRESS, ASSESSMENT, CERTIFICATION, AI)
- Helper function: `buildUrl(endpoint, params)` for query parameter handling
- Typed endpoint structure for code clarity

**Firebase Integration:**

**config.js**: Firebase initialization and authentication

**Functions:**
- `signInWithGoogle()`: Google OAuth popup, Firebase token → backend verification
- `logOut()`: Firebase sign out + backend session termination

**Firestore Structure:**
```
user_progress/
  {userId}/
    courses/
      {courseId}/
        - completedModules: string[]
        - progress: number
        - quiz_score: number
        - coding_score: number
        - final_score: number
        - lastAccessedModule: string
```

### Feature Flag System

**features.js**: Production feature control

**Feature Flags:**
```javascript
AI_ENABLED: true | false                  // AI assistant availability
QUIZ_ANTI_CHEAT_ENABLED: true | false     // Anti-cheat during quizzes
BLOCKCHAIN_ENABLED: true | false          // NFT certificate minting
VOICE_INPUT_ENABLED: true | false         // Voice input for AI (future)
AI_TESTING_MODE: true | false             // Testing indicator for AI
QUIZ_TESTING_MODE: true | false           // Testing mode for quizzes
```

**Helper Functions:**
- `isAIEnabled()`: Returns AI_ENABLED flag
- `isQuizAntiCheatEnabled()`: Returns QUIZ_ANTI_CHEAT_ENABLED flag
- `isBlockchainEnabled()`: Returns BLOCKCHAIN_ENABLED flag
- `isVoiceInputEnabled()`: Returns VOICE_INPUT_ENABLED flag

**Usage:**
```javascript
import { isAIEnabled } from './config/features';

if (!isAIEnabled()) return null;  // Hide AI components
```

### Course Configuration System

**courseConfig.js**: Centralized course configuration

**Structure:**
```javascript
COURSE_CONFIGS: {
  'data-structures': {
    learningModules: [...],           // List of learning module IDs
    excludedModules: ['quiz', 'certification'],
    finalExam: {
      quiz: { weight: 0.5, id: 'quiz' },
      coding: { weight: 0.5, id: 'coding-challenge' }
    },
    certification: {
      requiredCompletion: 1.0,        // 100% module completion
      requiredFinalScore: 0.825       // 82.5% final exam score
    }
  }
}
```

**Helper Functions:**
- `getCourseConfig(courseId)`: Returns course configuration object
- `calculateProgressPercentage(courseId, completedModules)`: Calculates completion percentage
- `isFinalExamPassed(finalScore, courseId)`: Checks if final exam passed
- `canUnlockCertification(courseId, progressData)`: Checks certification eligibility

**Design Philosophy:**
- Scalable: Easy to add new courses
- Centralized: Single source of truth for course rules
- Typed: Clear structure for course requirements

### Build Configuration

**vite.config.js**: Vite build configuration

**Plugins:**
- `@vitejs/plugin-react`: React support with Fast Refresh
- `@tailwindcss/vite`: Tailwind CSS integration

**Optimizations:**
- Node globals polyfill for Solana Web3.js (Buffer)
- esbuild define: `global` → `globalThis`
- Resolve alias: `buffer` → npm buffer package

**Purpose:**
Solana Web3.js requires Node.js globals (Buffer) that are not available in browsers. The configuration polyfills these dependencies for client-side usage.

## System Constraints

**Browser Requirements:**
- Modern browsers supporting ES2020+ features
- JavaScript enabled
- LocalStorage and sessionStorage enabled
- Cookies enabled (for backend sessions)

**Network Dependencies:**
- Backend API must be running at `http://localhost:8000`
- Firebase Auth and Firestore services must be accessible
- Solana blockchain (devnet/mainnet) must be accessible
- Gemini AI API must be operational (for AI features)

**Authentication Constraints:**
- Google OAuth only (no email/password, GitHub, etc.)
- Session persists until logout or browser close
- Concurrent sessions across devices not supported
- Backend session timeout: 24 hours

**Progress Synchronization Constraints:**
- Firebase Firestore required for progress persistence
- Network errors may result in temporary desynchronization
- Manual refresh required after prolonged offline periods
- Progress saved only on explicit actions (module completion, quiz submission)

**Blockchain Constraints:**
- Phantom wallet required for certificate minting
- Solana devnet used for testing (not mainnet)
- Wallet connection popup blockers may interfere
- Gas fees (lamports) deducted from user wallet

**Performance Constraints:**
- Monaco Editor increases initial bundle size (~2MB)
- Large conversation histories may degrade AI chat performance
- Visualization animations may lag on low-end devices
- Course content Markdown parsing occurs on every render

**Content Constraints:**
- Course content hardcoded in frontend (not CMS)
- Adding new courses requires code changes
- Content updates require rebuild and deployment
- No dynamic content loading from backend

**State Management Constraints:**
- Context API causes entire subtree re-renders
- No state persistence across browser sessions (except sessionStorage)
- State cleared on logout
- No conflict resolution for concurrent state updates

**Routing Constraints:**
- No deep linking support (URLs not synced with routing state)
- Browser back/forward buttons do not navigate pages
- Bookmarking specific pages not supported
- No URL-based state sharing

**Feature Flag Constraints:**
- Feature flags hardcoded in `features.js`
- Require rebuild to change flags
- No user-specific feature flags
- No A/B testing support

## Visual Diagrams

### Application Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND APPLICATION                               │
│                          (React 19 Single Page App)                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                        ┌─────────────┴─────────────┐
                        │        main.jsx           │
                        │   (React 19 StrictMode)   │
                        └─────────────┬─────────────┘
                                      │
                        ┌─────────────▼─────────────┐
                        │         App.jsx           │
                        │  - Auth State Management  │
                        │  - Navigation State       │
                        │  - Session Persistence    │
                        │  - Provider Composition   │
                        └─────────────┬─────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
      ┌─────────▼──────────┐ ┌───────▼────────┐ ┌─────────▼──────────┐
      │   AIProvider       │ │ ProgressProvider│ │  Firebase Auth     │
      │  (AIContext.jsx)   │ │(ProgressContext) │ │   Listener         │
      │                    │ │                  │ │                    │
      │ - conversationHist │ │ - moduleProgress │ │ - onAuthChange     │
      │ - chat()           │ │ - courseProgress │ │ - signInWithGoogle │
      │ - clearHistory()   │ │ - quizAttempts   │ │ - logOut()         │
      │ - setContext()     │ │ - markModuleComp │ │                    │
      │ - aiEnabled flag   │ │ - syncProgress() │ │                    │
      └─────────┬──────────┘ └───────┬──────────┘ └─────────┬──────────┘
                │                    │                       │
                └────────────────────┼───────────────────────┘
                                     │
              ┌──────────────────────┴───────────────────────┐
              │            ROUTING LOGIC                     │
              │  (State-based: currentPage, selectedCourse)  │
              └──────────────────────┬───────────────────────┘
                                     │
          ┌──────────┬──────────┬────┴────┬──────────┬──────────┬─────────┐
          │          │          │         │          │          │         │
     ┌────▼───┐ ┌───▼────┐ ┌───▼────┐ ┌──▼─────┐ ┌──▼──────┐ ┌▼────────┐ │
     │ Login  │ │Dashboard│ │ Course │ │  Quiz  │ │ Coding  │ │ Profile │ │
     │ Page   │ │  Page   │ │Content │ │  Page  │ │Challenge│ │  Page   │ │
     └────┬───┘ └───┬────┘ └───┬────┘ └──┬─────┘ └──┬──────┘ └┬────────┘ │
          │         │          │         │          │         │          │
          │    ┌────▼──────────▼─────────▼──────────▼─────────▼───┐      │
          │    │              Layout.jsx                           │      │
          │    │  ┌──────────────────────────────────────────┐    │      │
          │    │  │         Header.jsx (Navigation)          │    │      │
          │    │  └──────────────────────────────────────────┘    │      │
          │    │  ┌──────────────────────────────────────────┐    │      │
          │    │  │        Main Content (children)           │    │      │
          │    │  └──────────────────────────────────────────┘    │      │
          │    │  ┌──────────────────────────────────────────┐    │      │
          │    │  │         Footer.jsx (Copyright)           │    │      │
          │    │  └──────────────────────────────────────────┘    │      │
          │    └──────────────────────────────────────────────────┘      │
          │                                                               │
          └───────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI ASSISTANT COMPONENTS                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                        ┌────────────▼────────────┐
                        │   AIAssistant.jsx       │
                        │  (Floating Button)      │
                        │  - Green glow animation │
                        │  - Testing mode dot     │
                        │  - Hidden if disabled   │
                        └────────────┬────────────┘
                                     │
                        ┌────────────▼────────────┐
                        │     AIChat.jsx          │
                        │   (Modal Interface)     │
                        │  - Conversation display │
                        │  - Message input        │
                        │  - Clear history button │
                        └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    VISUALIZATION COMPONENTS (7 Total)                        │
└─────────────────────────────────────────────────────────────────────────────┘
      │
      ├── Array1D.jsx (1D array with index highlighting)
      ├── Array2D.jsx (2D matrix with row/column selection)
      ├── StackVisualization.jsx (Push/Pop operations)
      ├── QueueVisualization.jsx (Enqueue/Dequeue operations)
      ├── SinglyLinkedList.jsx (Singly linked list traversal)
      ├── DoublyLinkedList.jsx (Bidirectional traversal)
      └── TreeVisualization.jsx (Binary tree with traversal algorithms)

           Common Pattern: Step controls + Pseudocode + Animation

┌─────────────────────────────────────────────────────────────────────────────┐
│                          UTILITY COMPONENTS                                  │
└─────────────────────────────────────────────────────────────────────────────┘
      │
      ├── LoadingButton.jsx (async operation state)
      ├── ProgressBar.jsx (visual completion indicator)
      ├── Toast.jsx (notification system)
      ├── EmptyState.jsx (no-data placeholder)
      ├── SkeletonLoader.jsx (loading placeholder)
      ├── CourseCard.jsx (course display card)
      └── CompletionTracker.jsx (module checklist)

┌─────────────────────────────────────────────────────────────────────────────┐
│                      CONFIGURATION & FEATURE FLAGS                           │
└─────────────────────────────────────────────────────────────────────────────┘
      │
      ├── features.js (AI, anti-cheat, blockchain, voice flags)
      ├── courseConfig.js (course rules, final exam weights, certification)
      └── api.js (centralized endpoint definitions)
```

### State Management & Data Synchronization Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER AUTHENTICATION FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

    User Clicks "Sign in with Google"
              │
              ▼
    ┌─────────────────────────┐
    │  signInWithGoogle()     │
    │  (firebase/config.js)   │
    └──────────┬──────────────┘
               │
               ├──► Firebase Auth (Google OAuth Popup)
               │
               ▼
    ┌─────────────────────────┐
    │  Get Firebase ID Token  │
    └──────────┬──────────────┘
               │
               ▼    POST /auth/verify-firebase-token
    ┌─────────────────────────┐         {idToken}
    │   Backend Verification  │◄────────────────────────────
    │  - Verify token         │
    │  - Create/update user   │
    │  - Set HTTP-only cookie │
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Return user data       │
    │  + session cookie       │
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  App.jsx updates state  │
    │  - setUser(userData)    │
    │  - window.currentUser   │
    │  - Save to sessionStorage│
    └──────────┬──────────────┘
               │
               ▼
    ┌─────────────────────────┐
    │  Navigate to Dashboard  │
    └─────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                     PROGRESS TRACKING & SYNCHRONIZATION                      │
└─────────────────────────────────────────────────────────────────────────────┘

    User Completes Module
              │
              ▼
    ┌─────────────────────────────────┐
    │  markModuleComplete(courseId,   │
    │       moduleId)                 │
    │  (ProgressContext)              │
    └──────────┬──────────────────────┘
               │
               ├──► Update Local State (moduleProgress)
               │
               ├──► Calculate Progress Percentage
               │    (excludes quiz & certification modules)
               │
               ▼
    ┌─────────────────────────────────┐
    │  syncCourseProgress(courseId,   │
    │      progressData)              │
    └──────────┬──────────────────────┘
               │
               ├────────────────────────────────────────────┐
               │                                            │
               ▼                                            ▼
    ┌──────────────────────┐              ┌─────────────────────────┐
    │  Firebase Firestore  │              │   Backend API           │
    │                      │              │  POST /progress/{id}/sync│
    │  user_progress/      │              │                         │
    │    {userId}/         │              │  - Save to PostgreSQL   │
    │      courses/        │              │  - Update user_progress │
    │        {courseId}    │              │  - Return confirmation  │
    │                      │              │                         │
    │  Document:           │              └─────────────────────────┘
    │  - completedModules  │
    │  - progress          │
    │  - quiz_score        │
    │  - coding_score      │
    │  - final_score       │
    └──────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          QUIZ SUBMISSION FLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

    User Submits Quiz Answers
              │
              ▼
    ┌─────────────────────────────────┐
    │  submitQuiz(courseId, quizId,   │
    │      answers)                   │
    │  (progressService.js)           │
    └──────────┬──────────────────────┘
               │
               ▼    POST /assessment/{courseId}/quiz/{quizId}/submit
    ┌─────────────────────────────────┐
    │   Backend Quiz Service          │
    │  - Validate answers             │
    │  - Calculate score              │
    │  - Check anti-cheat violations  │
    │  - Update quiz_attempts         │
    │  - Calculate final_score        │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Return score & feedback        │
    │  {score, passed, feedback}      │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Update ProgressContext         │
    │  - Update courseProgress        │
    │  - Update quiz_score            │
    │  - Increment quizAttempts       │
    │  - Recalculate final_score      │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Sync to Firebase & Backend     │
    │  (same as module completion)    │
    └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      CODING CHALLENGE SUBMISSION FLOW                        │
└─────────────────────────────────────────────────────────────────────────────┘

    User Submits Code
              │
              ▼
    ┌─────────────────────────────────┐
    │  submitCodingChallenge(courseId,│
    │      challengeData)             │
    │  (progressService.js)           │
    └──────────┬──────────────────────┘
               │
               ▼    POST /assessment/{courseId}/coding/submit
    ┌─────────────────────────────────┐
    │   Backend Coding Service        │
    │  - Run code in sandbox          │
    │  - Validate test cases          │
    │  - AI code evaluation           │
    │  - Check anti-cheat violations  │
    │  - Calculate coding_score       │
    │  - Calculate final_score        │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Return results                 │
    │  {score, passed, testResults,   │
    │   aiEvaluation}                 │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Update ProgressContext         │
    │  - Update courseProgress        │
    │  - Update coding_score          │
    │  - Recalculate final_score      │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Sync to Firebase & Backend     │
    └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                          AI CHAT INTERACTION FLOW                            │
└─────────────────────────────────────────────────────────────────────────────┘

    User Sends Message to AI
              │
              ▼
    ┌─────────────────────────────────┐
    │  Check isAIEnabled()            │
    │  (features.js)                  │
    └──────────┬──────────────────────┘
               │
               ├──► If disabled: Return null (no AI components)
               │
               ▼    If enabled
    ┌─────────────────────────────────┐
    │  chat(userMessage)              │
    │  (AIContext.jsx)                │
    └──────────┬──────────────────────┘
               │
               ├──► Add user message to conversationHistory
               │
               ├──► Set isLoading = true
               │
               ▼
    ┌─────────────────────────────────┐
    │  sendMessage(conversationHistory│
    │      , currentContext)          │
    │  (ai/aiService.js)              │
    └──────────┬──────────────────────┘
               │
               ▼    POST /ai/chat
    ┌─────────────────────────────────┐
    │   Backend AI Service            │
    │  - RAG: Retrieve course content │
    │  - Build context-aware prompt   │
    │  - Send to Gemini 2.5 Flash     │
    │  - Return AI response           │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Add AI response to             │
    │  conversationHistory            │
    └──────────┬──────────────────────┘
               │
               ├──► Set isLoading = false
               │
               ▼
    ┌─────────────────────────────────┐
    │  AIChat.jsx renders updated     │
    │  conversation                   │
    └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    CERTIFICATION UNLOCKING FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘

    User Completes All Requirements
              │
              ▼
    ┌─────────────────────────────────┐
    │  canUnlockCertification()       │
    │  (courseConfig.js)              │
    │                                 │
    │  Check:                         │
    │  - 100% module completion       │
    │  - quiz_score ≥ 0 (submitted)   │
    │  - coding_score ≥ 0 (submitted) │
    │  - final_score ≥ 82.5%          │
    └──────────┬──────────────────────┘
               │
               ├──► If not passed: Show locked state
               │
               ▼    If passed
    ┌─────────────────────────────────┐
    │  Unlock Certification Module    │
    │  (CourseContent.jsx)            │
    └──────────┬──────────────────────┘
               │
               ▼    User Clicks "Mint Certificate"
    ┌─────────────────────────────────┐
    │  Check isBlockchainEnabled()    │
    │  (features.js)                  │
    └──────────┬──────────────────────┘
               │
               ├──► If disabled: Save to database only
               │
               ▼    If enabled
    ┌─────────────────────────────────┐
    │  Connect Phantom Wallet         │
    │  (window.solana.connect())      │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  POST /certification/{id}/mint  │
    │  {walletAddress}                │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │   Backend Certification Service │
    │  - Generate certificate metadata│
    │  - Upload to IPFS               │
    │  - Mint NFT on Solana (PDA)     │
    │  - Save to database             │
    │  - Return NFT mint address      │
    └──────────┬──────────────────────┘
               │
               ▼
    ┌─────────────────────────────────┐
    │  Display Certificate            │
    │  - Download PDF option          │
    │  - View on Solana Explorer      │
    └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                    SESSION PERSISTENCE MECHANISM                             │
└─────────────────────────────────────────────────────────────────────────────┘

    Page Load
       │
       ▼
    ┌─────────────────────────────────┐
    │  App.jsx useEffect (mount)      │
    └──────────┬──────────────────────┘
               │
               ├──► Check sessionStorage for 'appState'
               │
               ▼    If exists
    ┌─────────────────────────────────┐
    │  Parse JSON                     │
    │  {user, currentPage,            │
    │   selectedCourse, selectedTopic}│
    └──────────┬──────────────────────┘
               │
               ├──► Restore state
               │
               ├──► Set window.currentUser = user
               │
               ├──► Firebase Auth listener verifies token
               │
               ▼
    ┌─────────────────────────────────┐
    │  Render last viewed page        │
    └─────────────────────────────────┘

    Navigation Event
       │
       ▼
    ┌─────────────────────────────────┐
    │  App.jsx updates state          │
    │  (currentPage, selectedCourse,  │
    │   selectedTopic)                │
    └──────────┬──────────────────────┘
               │
               ├──► Save to sessionStorage
               │    JSON.stringify(appState)
               │
               ├──► history.pushState() (browser history)
               │
               ▼
    ┌─────────────────────────────────┐
    │  React re-renders with new page │
    └─────────────────────────────────┘

    Logout Event
       │
       ▼
    ┌─────────────────────────────────┐
    │  logOut() (firebase/config.js)  │
    └──────────┬──────────────────────┘
               │
               ├──► Firebase signOut()
               │
               ├──► POST /auth/logout (clear cookie)
               │
               ├──► sessionStorage.clear()
               │
               ├──► window.currentUser = null
               │
               ▼
    ┌─────────────────────────────────┐
    │  Navigate to Login Page         │
    └─────────────────────────────────┘
```

---

**End of Frontend Documentation**
# Interactive Learning System Documentation

## Overview

Signum implements **interactive algorithm visualizations** with synchronized pseudocode to transform passive learning into active exploration. Each visualization demonstrates data structure operations through step-by-step animations with real-time code highlighting.

**Coverage:** 7 data structures with complete operation sets  
**Technology:** React 19 + Pure JavaScript + Tailwind CSS  
**Theme:** Dark background (#060807) with emerald accents (#10B981)  
**Architecture:** Pure frontend with no backend dependency  

**Key Features:**
- Synchronized pseudocode highlighting during operations
- Step-by-step execution with adjustable speed (150-1500ms)
- Auto-play mode with pause/resume controls
- Direct data manipulation (click-to-edit cells)
- Seed data for quick testing
- Responsive layout with 75% visualizer / 25% code split

---

## Implemented Visualizations


---

## Implemented Visualizations

### 1. Binary Search Tree (BST)

**File:** `TreeVisualization.jsx`  
**Visual:** SVG-based tree with automatic layout (in-order columns, depth rows)

**Operations:**
- **Insert** - Visual path highlighting to insertion point
- **Search** - Step-by-step trace with path animation
- **Delete** - All cases demonstrated (leaf, one child, two children with successor)
- **Find Min/Max** - Path trace to extreme nodes

**Traversals:**
- **Inorder** - Sorted output (left → root → right)
- **Preorder** - Root → left → right
- **Postorder** - Left → right → root  
- **Level-order** - Breadth-first traversal

**Features:**
- Auto-play with adjustable speed (200-1500ms)
- Step navigation (prev/next through trace)
- Seed with example tree [50,30,70,20,40,60,80]
- 25% code panel with operation-specific pseudocode
- Node highlighting during operations (emerald → black contrast)
- Traversal output ribbon showing visit order

**Layout Algorithm:**
- In-order traversal assigns X coordinates (68px gap)
- Depth level assigns Y coordinates (100px gap)
- useMemo optimization prevents re-computation
- Dynamic SVG sizing based on tree structure

---

### 2. Stack Data Structure

**File:** `StackVisualization.jsx`  
**Visual:** Vertical container with bottom-aligned elements (LIFO visualization)

**Operations:**
- **Push** - Add element to top (with overflow detection)
- **Pop** - Remove from top (with underflow detection)
- **Peek** - View top element without removal
- **isEmpty** - Check for empty stack
- **isFull** - Check for capacity limit

**Features:**
- Adjustable capacity (1-24 elements)
- Vertical container (52vh height) with emerald glow
- TOP/BOTTOM markers for orientation
- Seed with sample data [A, B, C]
- Enter key support for quick push
- Filled cells highlighted with emerald/80 background
- Step-by-step pseudocode highlighting (380ms per step)

**Visual Design:**
- `flex-col-reverse` for bottom-up rendering
- Capacity indicator in real-time
- Item entrance animation on push

---

### 3. Queue (Circular)

**File:** `QueueVisualization.jsx`  
**Visual:** Horizontal tray with FRONT/REAR markers

**Operations:**
- **Enqueue** - Add to rear (with overflow detection)
- **Dequeue** - Remove from front (with underflow detection)
- **Peek** - View front element
- **isEmpty** - Check for empty queue
- **isFull** - Check for capacity limit

**Circular Queue Implementation:**
- Front/rear pointer visualization
- Modulo arithmetic for wrap-around: `(front + size) % capacity`
- Efficient space utilization
- Next write slot highlighted with ring

**Features:**
- Adjustable capacity (2-20 elements)
- FRONT/REAR badges on appropriate cells
- Index labels (0-based) on each cell
- Seed with sample data
- 360ms step delay for operation visibility
- Real-time metrics: capacity, front pointer, size

---

### 4. 1D Array Operations

**File:** `Array1DVisualization.jsx`  
**Visual:** Horizontal grid with index chips

**Basic Operations:**
- **Set(i, val)** - Direct element assignment
- **Get(i)** - Element retrieval with highlighting
- **Fill(val)** - Populate entire array
- **Randomize** - Generate 2-digit random values
- **Length** - Dynamic resize (1-24 elements)

**Search Algorithms:**
- **Linear Search** - Animated sequential scan
- **Binary Search** - Animated divide-and-conquer (requires sorted array)

**Advanced Operations:**
- **Traverse** - Left-to-right animation
- **Find Min/Max** - Animated search with comparisons
- **Reverse** - Two-pointer swap animation
- **Bubble Sort** - Complete animated sort with compare/swap visualization

**Direct Editing:**
- Click any cell to edit in-place
- Enter to save, Escape to cancel
- Blur auto-saves changes
- Real-time value updates

**Visual Feedback:**
- Active cell: black background with emerald ring
- Filled cells: emerald/80 background
- Empty cells: white/5 background
- Index chips on each cell
- Sort comparison animations (120-1500ms adjustable)

---

### 5. 2D Array (Matrix) Operations

**File:** `Array2DVisualization.jsx`  
**Visual:** CSS Grid layout with row/column labels

**Matrix Operations:**
- **Set(r, c, value)** - Direct cell assignment
- **Get(r, c)** - Cell value retrieval
- **Fill(value)** - Populate entire matrix
- **Randomize** - Generate 2-digit random values
- **Search(target)** - Animated linear search

**Traversal Algorithms:**
- **Row-Major** - Standard iteration (row by row)
- **Column-Major** - Vertical iteration (column by column)
- **Spiral** - Clockwise traversal from outer to inner

**Matrix Transformations:**
- **Transpose** - Row↔column swap with size change
- **Rotate 90°** - Clockwise rotation with animation

**Dimension Controls:**
- Adjustable rows (1-10)
- Adjustable columns (1-12)
- Dynamic resizing preserves existing data
- Auto-layout grid system

**Direct Editing:**
- Click any cell to edit in-place
- Enter to save, Escape to cancel
- Blur auto-saves changes
- Cell coordinates displayed (1-based for UX)

---

### 6. Singly Linked List

**File:** `SinglyLinkedListVisualization.jsx`  
**Visual:** Horizontal nodes with arrows and HEAD/TAIL markers

**Operations:**
- **Insert Head** - Add node at beginning
- **Insert Tail** - Add node at end
- **Delete Head** - Remove first node
- **Delete Tail** - Remove last node
- **Search** - Find node by value
- **Traverse** - Visit all nodes in sequence

**Features:**
- HEAD/TAIL markers for orientation
- Arrow connections between nodes
- Seed with sample data
- Clear list function
- 360ms step delay for visibility
- Pseudocode highlighting for each operation

---

### 7. Doubly Linked List

**File:** `DoublyLinkedListVisualization.jsx`  
**Visual:** Horizontal nodes with bidirectional arrows

**Operations:**
- **Insert Head** - Add node at beginning
- **Insert Tail** - Add node at end
- **Insert After** - Add node after specific index
- **Delete Head** - Remove first node
- **Delete Tail** - Remove last node
- **Delete Node** - Remove specific node
- **Search** - Find node by value
- **Traverse Forward** - HEAD to TAIL
- **Traverse Backward** - TAIL to HEAD

**Features:**
- Bidirectional arrow visualization (prev/next pointers)
- Index-based insertion support
- Forward and backward traversal animations
- Real-time node highlighting during operations

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Visualization Components (Pure Frontend)                       │
│  ├── TreeVisualization.jsx         (BST with SVG rendering)     │
│  ├── StackVisualization.jsx        (Vertical LIFO container)    │
│  ├── QueueVisualization.jsx        (Circular FIFO)              │
│  ├── Array1DVisualization.jsx      (Array + sorting algorithms) │
│  ├── Array2DVisualization.jsx      (Matrix operations)          │
│  ├── SinglyLinkedListVisualization.jsx  (Linked list basics)   │
│  └── DoublyLinkedListVisualization.jsx  (Bidirectional list)   │
│                                                                  │
│  Rendering Technologies                                         │
│  ├── SVG (TreeVisualization - scalable tree rendering)          │
│  ├── CSS Grid (Matrix layout with dynamic sizing)               │
│  ├── Flexbox (Stack/Queue containers)                           │
│  └── Tailwind CSS (Dark theme with emerald accents)             │
│                                                                  │
│  State Management (React Hooks)                                 │
│  ├── useState - Component state (array, tree, list data)        │
│  ├── useRef - Animation timers and DOM references               │
│  ├── useEffect - Auto-play logic and step synchronization       │
│  └── useMemo - Expensive layout calculations (BST positioning)  │
│                                                                  │
│  Algorithm Execution                                            │
│  ├── Pure JavaScript implementations (no external libraries)    │
│  ├── Step-by-step trace generation                              │
│  ├── async/await for animation control                          │
│  ├── Auto-play with pause/resume                                │
│  └── Manual step navigation (prev/next)                         │
│                                                                  │
│  Code Panel Integration (25% split)                             │
│  ├── Operation-specific pseudocode                              │
│  ├── Line-by-line highlighting synchronized with visual steps   │
│  ├── Academic-standard algorithm notation                       │
│  └── Scrollable for longer algorithms                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Design Principles:**

**1. Pure Frontend Architecture**
- No backend API calls for visualizations
- Instant load times and responsiveness
- Works offline after initial page load
- Reduces server load

**2. Consistent Visual Language**
- Dark background (#060807) across all visualizations
- Emerald accents (#10B981, #34D399) for active elements
- 75/25 split: Visualizer | Pseudocode panel
- Tailwind-only styling (no CSS files)

**3. Educational Focus**
- Pseudocode matches academic standards
- Big O notation in algorithm descriptions
- Step-by-step execution for deep understanding
- Active cell highlighting for operation clarity

**4. Performance Optimization**
- `useMemo` for expensive BST layout calculations
- Efficient re-renders via React best practices
- Minimal DOM manipulation for 60 FPS animations
- Web Workers ready for heavy computations

---

## Technology Stack

**Core Technologies:**
- **React 19** - Component framework with hooks API
- **Tailwind CSS** - Utility-first styling with dark theme
- **Pure JavaScript** - Algorithm implementations (no libraries)
- **SVG** - Scalable vector graphics for tree rendering
- **CSS Grid** - Matrix layout system
- **Flexbox** - Stack/queue container alignment

**Animation Control:**
- **async/await** - Step-by-step animation sequencing
- **setTimeout** - Delay control between steps
- **useRef** - Timer management without state updates
- **Speed Control** - 150ms to 1500ms adjustable range

**Layout Algorithms:**
- **BST Layout** - In-order X-axis, depth Y-axis with useMemo optimization
- **Array Grid** - Dynamic columns based on length
- **Matrix Grid** - CSS Grid with `repeat(cols, minmax(56px, 1fr))`

---

## Feature Summary

### Common Features Across All Visualizations

**Control Panel:**
- Input fields with Enter key support
- Operation buttons (Insert, Delete, Search, etc.)
- Seed button for quick data population
- Clear button to reset visualization
- Adjustable speed slider (150-1500ms)
- Auto-play with pause/resume

**Code Panel (25% width):**
- Operation-specific pseudocode
- Line-by-line highlighting synchronized with visual steps
- Scrollable for longer algorithms
- Academic-standard algorithm notation

**Tracer Controls:**
- Step navigation (Previous/Next buttons)
- Current step indicator (e.g., "3 / 15")
- Step description in status area
- Reset button to clear trace

**Visual Feedback:**
- Active cell/node highlighting (emerald accents)
- Smooth transitions (Tailwind animations)
- Real-time status messages
- Operation completion indicators

### Direct Manipulation (Arrays/Matrix)

**In-Place Editing:**
- Click any cell to edit directly
- Enter key saves changes
- Escape key cancels editing
- Blur event auto-saves
- Visual focus indicator during edit

**Dynamic Sizing:**
- Arrays: 1-24 elements
- Matrix: 1-10 rows × 1-12 columns
- Stack: 1-24 capacity
- Queue: 2-20 capacity
- Preserves existing data on resize

---

## System Constraints

**Browser Requirements:**
- Modern browser with ES6+ support
- SVG rendering capability (for BST)
- CSS Grid support (for matrices)
- No Internet Explorer support

**Performance Limits:**
- BST: Optimal for trees with <100 nodes
- Arrays: Maximum 24 elements per visualization
- Matrix: Maximum 10×12 grid (120 cells)
- Animation: 150ms minimum step delay (60 FPS target)

**Data Types:**
- Arrays/Matrices: String or number values
- BST: Numeric values only (for comparison)
- Lists: Any string/number values
- No object or complex type support

**Operation Scope:**
- Visualizations are independent (no cross-component state)
- No persistence (data lost on page refresh)
- No undo/redo functionality
- Single active animation per component

**Editing Constraints:**
- Direct editing only for arrays and matrices
- BST nodes cannot be edited in-place (must delete+insert)
- Lists use separate insert/delete operations
- No bulk edit operations

---

## Visual Diagrams

### Diagram 1: Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                  VISUALIZATION COMPONENT FLOW                       │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  USER INTERACTION                                                │
└───────────────────┬──────────────────────────────────────────────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
┌────────────────┐   ┌──────────────────┐
│ Direct Edit    │   │ Operation Button │
│ (Click cell)   │   │ (Insert/Delete)  │
└────────┬───────┘   └─────────┬────────┘
         │                     │
         │                     ▼
         │          ┌──────────────────────┐
         │          │ Build Trace Steps    │
         │          │ [{msg, cells, pc}]   │
         │          └──────────┬───────────┘
         │                     │
         └─────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Update State        │
        │  - Data structure    │
        │  - Trace array       │
        │  - Pseudocode kind   │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Render Loop         │
        │  (React re-render)   │
        └──────────┬───────────┘
                   │
      ┌────────────┴────────────┐
      │                         │
      ▼                         ▼
┌──────────────┐      ┌──────────────────┐
│ Visualizer   │      │ Code Panel       │
│ (75% width)  │      │ (25% width)      │
├──────────────┤      ├──────────────────┤
│ • Data view  │      │ • Pseudocode     │
│ • Highlight  │      │ • Line highlight │
│ • Animation  │      │ • Scrollable     │
└──────┬───────┘      └────────┬─────────┘
       │                       │
       └───────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Auto-Play Timer     │
        │  (if enabled)        │
        └──────────┬───────────┘
                   │
              useEffect
         setInterval(speed)
                   │
                   ▼
        ┌──────────────────────┐
        │  Increment Step      │
        │  setStep(s => s + 1) │
        └──────────┬───────────┘
                   │
                   │  Loop until
                   │  step >= trace.length
                   │
                   ▼
        ┌──────────────────────┐
        │  Animation Complete  │
        │  setIsPlaying(false) │
        └──────────────────────┘
```

---

### Diagram 2: Data Flow Example (Binary Search)

```
┌─────────────────────────────────────────────────────────────────────┐
│           BINARY SEARCH VISUALIZATION FLOW                          │
└─────────────────────────────────────────────────────────────────────┘

User Input: "Search for 40"
Array: [10, 20, 30, 40, 50, 60, 70]  (sorted)
Speed: 500ms

         │
         ▼
┌──────────────────────────────────┐
│ onBinarySearch() triggered       │
└──────────┬───────────────────────┘
           │
           ▼
Check: Is array sorted?
  ├─ NO → Show error: "Array must be sorted. Use Sort ↑ button."
  └─ YES → Continue
           │
           ▼
┌──────────────────────────────────┐
│ Build Trace Steps                │
│                                  │
│ Initialize:                      │
│  left = 0, right = 6             │
│  target = 40                     │
│                                  │
│ Step 1:                          │
│  msg: "l=0, r=6"                 │
│  cells: []                       │
│  pc: [1]  // Line 1 of pseudocode│
│                                  │
│ Step 2:                          │
│  mid = (0 + 6) / 2 = 3           │
│  msg: "mid=3"                    │
│  cells: [3]  // Highlight A[3]   │
│  pc: [2]  // Line 2 of pseudocode│
│                                  │
│ Step 3:                          │
│  A[3] = 40 == target             │
│  msg: "Found at i=3"             │
│  cells: [3]                      │
│  pc: [3]                         │
│                                  │
│ trace = [Step1, Step2, Step3]    │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ Update React State               │
│  setTrace(trace)                 │
│  setStep(0)                      │
│  setIsPlaying(true)              │
│  setPseudo({kind:'bsearch',...}) │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ useEffect (step change)          │
│  Current step: 0                 │
│                                  │
│  s = trace[0]                    │
│  setStatus("l=0, r=6")           │
│  setPcHi(new Set([1]))           │
│  setHiCells(new Set())           │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Render                                   │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ VISUALIZER (75%)                   │  │
│ │                                    │  │
│ │  [10] [20] [30] [40] [50] [60] [70]│  │
│ │   0    1    2    3    4    5    6  │  │
│ │                                    │  │
│ │  (no cells highlighted yet)        │  │
│ │                                    │  │
│ │  Status: "l=0, r=6"                │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ CODE PANEL (25%)                   │  │
│ │                                    │  │
│ │ Binary Search Algorithm            │  │
│ │                                    │  │
│ │ 1. Initialize left=0, right=n-1 ← ✓│  │
│ │ 2. Calculate middle index          │  │
│ │ 3. If A[middle] equals target      │  │
│ │ 4. If target < A[middle]           │  │
│ │ 5. If target > A[middle]           │  │
│ │ 6. Return -1 if not found          │  │
│ │                                    │  │
│ │ (Line 1 highlighted in emerald)    │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
           │
           │ Wait 500ms (speed setting)
           ▼
┌──────────────────────────────────┐
│ Auto-Play Timer fires            │
│  setStep(1)                      │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ useEffect (step change)          │
│  Current step: 1                 │
│                                  │
│  s = trace[1]                    │
│  setStatus("mid=3")              │
│  setPcHi(new Set([2]))           │
│  setHiCells(new Set(['i-3']))    │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Render                                   │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ VISUALIZER (75%)                   │  │
│ │                                    │  │
│ │  [10] [20] [30] ⦗40⦘ [50] [60] [70]│  │
│ │   0    1    2    3    4    5    6  │  │
│ │                  ↑                 │  │
│ │         (emerald highlight)        │  │
│ │                                    │  │
│ │  Status: "mid=3"                   │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ CODE PANEL (25%)                   │  │
│ │                                    │  │
│ │ Binary Search Algorithm            │  │
│ │                                    │  │
│ │ 1. Initialize left=0, right=n-1    │  │
│ │ 2. Calculate middle index        ← ✓│  │
│ │ 3. If A[middle] equals target      │  │
│ │ 4. If target < A[middle]           │  │
│ │ 5. If target > A[middle]           │  │
│ │ 6. Return -1 if not found          │  │
│ │                                    │  │
│ │ (Line 2 highlighted in emerald)    │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
           │
           │ Wait 500ms
           ▼
┌──────────────────────────────────┐
│ Auto-Play Timer fires            │
│  setStep(2)                      │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│ useEffect (step change)          │
│  Current step: 2 (FINAL)         │
│                                  │
│  s = trace[2]                    │
│  setStatus("Found at i=3")       │
│  setPcHi(new Set([3]))           │
│  setHiCells(new Set(['i-3']))    │
│                                  │
│  if (step >= trace.length - 1):  │
│    setIsPlaying(false)           │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ Final Render                             │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ VISUALIZER (75%)                   │  │
│ │                                    │  │
│ │  [10] [20] [30] ⦗40⦘ [50] [60] [70]│  │
│ │   0    1    2    3    4    5    6  │  │
│ │                  ↑                 │  │
│ │         (emerald highlight)        │  │
│ │                                    │  │
│ │  Status: "Found at i=3"            │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ CODE PANEL (25%)                   │  │
│ │                                    │  │
│ │ Binary Search Algorithm            │  │
│ │                                    │  │
│ │ 1. Initialize left=0, right=n-1    │  │
│ │ 2. Calculate middle index          │  │
│ │ 3. If A[middle] equals target    ← ✓│  │
│ │ 4. If target < A[middle]           │  │
│ │ 5. If target > A[middle]           │  │
│ │ 6. Return -1 if not found          │  │
│ │                                    │  │
│ │ (Line 3 highlighted in emerald)    │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ TRACER CONTROLS                    │  │
│ │                                    │  │
│ │  [⟵ Prev]  [Next ⟶]  [Pause]       │  │
│ │                                    │  │
│ │  Step: 3 / 3                       │  │
│ │                                    │  │
│ │  Status: "Found at i=3"            │  │
│ └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
           │
           ▼
    Animation Complete
    (User can step back/forward or reset)


═══════════════════════════════════════════════════════════════════════
                      STATE MANAGEMENT FLOW
═══════════════════════════════════════════════════════════════════════

React Component State:
┌────────────────────────────────────┐
│ const [arr, setArr] = useState([]) │  ← Data structure
│ const [trace, setTrace] = ...     │  ← Animation steps
│ const [step, setStep] = ...       │  ← Current step index
│ const [isPlaying, setIsPlaying]   │  ← Auto-play state
│ const [speed, setSpeed] = ...     │  ← Animation speed (ms)
│ const [pseudo, setPseudo] = ...   │  ← Current pseudocode
│ const [pcHi, setPcHi] = ...       │  ← Highlighted code lines
│ const [hi, setHi] = ...           │  ← Highlighted cells/nodes
└────────────────────────────────────┘

Auto-Play Mechanism:
┌────────────────────────────────────┐
│ useEffect(() => {                  │
│   if (!isPlaying) return;          │
│   timer = setInterval(() => {      │
│     setStep(s => s + 1);           │
│   }, speed);                       │
│   return () => clearInterval(...); │
│ }, [isPlaying, speed]);            │
└────────────────────────────────────┘

Step Synchronization:
┌────────────────────────────────────┐
│ useEffect(() => {                  │
│   const s = trace[step];           │
│   setStatus(s.msg);                │
│   setPcHi(new Set(s.pc));          │
│   setHi(new Set(s.cells));         │
│   if (step >= trace.length - 1)    │
│     setIsPlaying(false);           │
│ }, [step, trace]);                 │
└────────────────────────────────────┘
```

---

*This interactive learning system provides hands-on algorithm exploration through synchronized visual and code demonstrations, enabling students to understand data structures and algorithms through active learning.*
# RAG Implementation (Signum)

This document describes the **actual RAG system** implemented for Signum’s AI tutor.

## High-level flow (diagram)

![RAG flow diagram](docs/rag_flow_diagram.svg)

### A) Offline indexing flow (build once, update when content changes)

(See diagram above.)

### B) Online chat flow (every user question)

(See diagram above.)

## Why this change

Previously, “RAG” was a **small keyword lookup** from an in-memory dictionary ([backend/app/services/ai/course_content_store.py](backend/app/services/ai/course_content_store.py)).
That approach:
- Didn’t ingest real platform/course content
- Retrieved little/no relevant context
- Allowed unrelated questions to reach Gemini (e.g., BMW cars)

## What’s implemented now

## How to think about it (plain-English)

There are two separate parts:

1) **Indexing (offline)**: we take Signum’s real content, split it into smaller chunks, compute an embedding for each chunk, and store everything in a persistent vector database (Chroma).

2) **Answering (online)**: when a user asks a question, we search the vector DB for the most relevant chunks, pass those chunks to the model as context, and require citations. If the question looks unrelated to Signum and there’s no strong retrieval match, we block it.

This is why it behaves “Copilot-like”: it uses the *current screen context* plus *nearby course content* instead of general internet-style answers.

### 1) Content sources (source of truth)
The index is built from:
- Frontend course content files under `frontend/src/courses/**` (JSX/JS/TS files; extracted to readable text)
- Platform documentation Markdown (repo root + backend docs)

### 2) Chunking + metadata
Content is extracted and chunked into overlapping word-based chunks:
- Default chunk size: `450` words
- Default overlap: `60` words

Each chunk stores metadata:
- `course_id` (when available from `CompletionTracker` props or inferred from path)
- `module_id` (when available)
- `source_path` (file path)
- `title` (first meaningful line or filename)

### 3) Embeddings + vector store (Chroma)
The vector store is **ChromaDB** in persistent mode.
- Default collection: `signum_rag`
- Default persistence dir (from repo root): `backend/app/services/ai/rag_storage`
- If you run commands from `backend/`, the configured path is `app/services/ai/rag_storage`

Embedding function preference order:
1. `FastEmbedEmbeddingFunction` (requires `fastembed`, avoids heavy torch installs)
2. `SentenceTransformerEmbeddingFunction` (fallback)

### 4) Context-first retrieval + screen augmentation
On each chat request:
- The system infers `course_id/module_id` when possible and uses them as Chroma filters.
- The current `screen_content` is injected as a bounded top context block (`[SCREEN] ...`) so the tutor behaves more like Copilot.

### 5) Citations
The RAG context is passed into Gemini with stable source IDs (`S1`, `S2`, ...).
The system prompt instructs:
- If the model uses provided sources, it must end the answer with **Sources:** listing the used IDs.
- The API response also includes a structured `sources` array with file path + distance.

### 6) Strict out-of-scope gate (prevents BMW-style mistakes)
The scope guard is now **conservative**:
- If the message has clear Signum/platform keywords, it is allowed.
- Otherwise it requires good RAG similarity.
- If the RAG index is missing/unavailable, it **fails closed** (blocks the request), preventing unrelated questions from ever reaching Gemini.

This specifically fixes the issue where being on a course page used to auto-allow any question.

Additionally, Copilot-style questions like “what is on this page?” are treated as **in-scope** when `screen_content` is present, so the tutor can summarize/explain the *current Signum screen* even if the vector index isn’t available.

## Files added/changed

- New RAG module:
  - `backend/app/services/ai/rag/rag_service.py` (retrieval + scope gating)
  - `backend/app/services/ai/rag/indexer.py` (index building)
  - `backend/app/services/ai/rag/text_extract.py` (best-effort JSX/MD text extraction)
  - `backend/app/services/ai/rag/chunking.py` (word-based chunker)
  - `backend/app/services/ai/rag/chroma_store.py` (Chroma collection + embeddings)
  - `backend/app/services/ai/rag/sources.py` (file discovery)
  - `backend/app/services/ai/rag/rag_config.py` (env-based config)

- Wired into chat:
  - `backend/app/services/ai/ai_service.py` now uses `rag_service.retrieve()`

- Kept legacy store:
  - `backend/app/services/ai/course_content_store.py` marked as legacy fallback

- Added build script:
  - `backend/scripts/build_rag_index.py`

- Added unit test:
  - `backend/tests/unit/test_ai_service.py` ensures out-of-platform questions are blocked even with course context.

## How to build the index

From repo root:

```bash
python3 backend/scripts/build_rag_index.py
```

This creates/updates the persistent Chroma index in `backend/app/services/ai/rag_storage`.

## Config (env vars)

- `RAG_PERSIST_DIR` (default `backend/app/services/ai/rag_storage`)
- `RAG_COLLECTION` (default `signum_rag`)
- `RAG_CHUNK_WORDS` (default `450`)
- `RAG_CHUNK_OVERLAP_WORDS` (default `60`)
- `RAG_TOP_K` (default `5`)
- `RAG_IN_SCOPE_DISTANCE_THRESHOLD` (default `0.42`) lower = stricter
- `RAG_EMBED_MODEL` (default `BAAI/bge-small-en-v1.5` with fastembed)

## Notes / limitations

- JSX extraction is best-effort (regex-based) and designed to capture human-visible text.
- For maximum accuracy, it’s recommended to periodically rebuild the index when course content changes.
