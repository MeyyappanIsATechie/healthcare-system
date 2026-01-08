## Entity Relationships

- A User has one PatientProfile OR one DoctorProfile
- A DoctorProfile has many AvailabilitySlots
- A PatientProfile can create many MedicalRequests
- Each MedicalRequest has one AllocationDecision
- A DoctorProfile has many CaseHistory records
- AllocationDecision triggers NotificationEvents
- All critical actions create AuditLog entries
