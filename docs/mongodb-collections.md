## MongoDB Collections

- users
- patient_profiles
- doctor_profiles
- medical_requests 1     -
                          |
- allocation_decisions 1 -
- notification_events
- audit_logs
- case_history


### AvailabilitySlot
- Embedded inside doctor_profiles
- Reason: Always accessed with doctor context

### CaseHistory
- Stored as separate collection
- Referenced from doctor_profiles
- Reason: Large growth, analytics use

### Indexes

doctor_profiles:
- 2dsphere index on location
- vector index on expertise_embedding

medical_requests:
- vector index on symptoms_embedding



