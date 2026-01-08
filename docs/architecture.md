## High-Level Architecture

[ Client (Next.js SPA) ]
            |
            v
[ API Layer / BFF ]
            |
            v
[ Core Backend (Node.js) ]
   |        |        |
   v        v        v
[ MongoDB ] [ Redis ] [ Notification Service ]
      |
      v
[ Vector Search Index ]

[ Core Backend ] <----> [ AI / ML Services (Python) ]

----------------------------------------------
 CI/CD Pipeline → Build → Test → Deploy
 Logging & Monitoring across all layers
----------------------------------------------

## Component Responsibilities

### Client (Next.js)
- Collect user input
- Display system responses
- No business logic

### API Layer
- Authentication
- Request validation
- Rate limiting
- API versioning

### Core Backend
- Business rules
- Allocation logic
- Orchestration
- Audit logging

### Database Layer
- Persistent storage
- Geo queries
- Vector similarity search

### AI / ML Services
- Risk scoring
- Recommendation ranking
- Model inference

### Async & Notifications
- Event handling
- Retries
- User notifications

### CI/CD & Observability
- Automated builds
- Tests
- Deployments
- Logs & metrics
