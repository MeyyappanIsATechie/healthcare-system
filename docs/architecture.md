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
