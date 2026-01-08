### Users (/users)
Method	Endpoint	Description	Request	Response
POST	/users/register	Create a new user (patient or doctor)	{username, email, password, role}	{userId, username, role, createdAt}
POST	/users/login	Authenticate user	{email, password}	{token, userId, role}
GET	/users/:id	Get user info	Header: Auth token	{userId, username, email, role}
### Patients (/patients)
Method	Endpoint	Description	Request	Response
GET	/patients/:id/profile	Fetch patient profile	Auth header	{patientId, demographics, medicalHistory}
PUT	/patients/:id/profile	Update profile	{age, gender, medicalHistory}	Updated object
### Doctors (/doctors)
Method	Endpoint	Description	Request	Response
GET	/doctors/:id/profile	Fetch doctor profile	Auth header	{doctorId, specialization, location, availability}
PUT	/doctors/:id/profile	Update profile	{specialization, location, availability}	Updated object
GET	/doctors/nearby	List nearby doctors	?lat=&lng=&specialization=	[doctor1, doctor2, ...]
### Medical Requests (/requests)
Method	Endpoint	Description	Request	Response
POST	/requests	Patient submits request	{patientId, symptoms, location}	{requestId, status, createdAt}
GET	/requests/:id	Get request status	Auth header	{requestId, patientId, allocationStatus, assignedDoctor}
GET	/requests/patient/:id	Get all patient requests	Auth header	[request1, request2, ...]
### Allocation Decisions (/allocations)
Method	Endpoint	Description	Request	Response
GET	/allocations/:requestId	Get allocation result for request	Auth header	{doctorId, score, timestamp}
### Notifications (/notifications)
Method	Endpoint	Description	Request	Response
GET	/notifications/:userId	Fetch notifications	Auth header	[notif1, notif2, ...]
POST	/notifications/test	Send test notification	{userId, message}	{status: success}
### Case History (/cases)
Method	Endpoint	Description	Request	Response
GET	/cases/doctor/:id	Get all cases for a doctor	Auth header	[case1, case2, ...]
POST	/cases	Create new case	{doctorId, patientId, diagnosis, outcome}	{caseId, createdAt}
### Audit (/audit) — internal
Method	Endpoint	Description	Request	Response
GET	/audit/logs	Fetch system logs	Admin token	[log1, log2, ...]

### Authentication

Every endpoint requires JWT token except /users/register and /users/login

Token contains userId and role

Role-based access example:

Patients cannot access /doctors/:id/availability for other doctors

Only admin can access /audit/logs