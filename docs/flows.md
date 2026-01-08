## Core System Flow: Patient Request to Doctor Allocation

1. Patient submits medical request with symptoms and location
2. API validates request and authenticates user
3. Request stored in database
4. Backend queries nearby doctors using geo index
5. Filters doctors by availability and specialization
6. Vector search ranks doctors by symptom relevance
7. AI service scores urgency and suitability
8. Allocation engine selects best doctor
9. Allocation decision stored
10. Notification sent to doctor and patient
11. Audit log recorded
