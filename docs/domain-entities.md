## Domain Entities

### 1. User
Represents an authenticated system user.
Acts as the base identity for patients and doctors.

Responsibilities:
- Authentication identity
- Role association (patient or doctor)

Does NOT handle:
- Medical data
- Availability
- Allocation logic

### 2. PatientProfile
Stores medical and demographic information related to a patient.

Responsibilities:
- Medical metadata
- Demographics
- Past request references

Does NOT handle:
- Authentication
- Allocation decisions

### 3. DoctorProfile
Stores professional details, specialization, and location of a doctor.

Responsibilities:
- Professional information
- Location
- Specialization
- Load metrics

Does NOT handle:
- Authentication
- Notifications

### 4. AvailabilitySlot
Represents the availability windows of a doctor.

Responsibilities:
- Time-based availability of doctors

Does NOT handle:
- Allocation logic
- Medical data

### 5. MedicalRequest
Represents a patient’s request for medical assistance.

Responsibilities:
- Store patient request details
- Track request status

Does NOT handle:
- Allocation logic
- Notifications

### 6. AllocationDecision
Stores the result of the doctor allocation process.

Responsibilities:
- Store allocation outcome
- Track reasoning metadata

Does NOT handle:
- Request creation
- Notification delivery

### 7. NotificationEvent
Represents notifications triggered by system events.

Responsibilities:
- Store notification intent and status

Does NOT handle:
- Business logic
- Allocation

### 8. CaseHistory
Stores historical medical cases handled by a doctor.

Responsibilities:
- Historical medical cases
- Outcome tracking

Does NOT handle:
- Live allocation
- Notifications

### 9. AuditLog
Records critical system actions for traceability and debugging.

Responsibilities:
- Record system actions
- Enable debugging and traceability

Does NOT handle:
- Business logic
- User interactions
