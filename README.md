--

## Project Setup

The project contains the following main directories:

- **Frontend (React with NX framework)**: Located in the `/frontend` directory.
- **Backend (TypeScript Express API)**: Located in the `/backend` directory. The backend uses SQLite for storage.


### Prerequisites

1. Make sure you have everything downloaded locally. You should set up a new git repository.
1. Have [Docker installed](https://www.docker.com/get-started/).

### Running the build

1. Navigate to the root directory.
1. Run `docker-compose up -d`
1. Visit the frontend at `http://localhost:8080/`
1. Visit the backend at `http://localhost:3001/`.

---




### Backend

RESTful API with SQLite storage. The following endpoints are implemented:

- `POST /api/jobs`: Create a new job posting.
- `GET /api/jobs`: Get all job postings (with optional filtering for recently posted and most active).
- `GET /api/jobs/:id`: Get details of a specific job posting.
- `POST /api/jobs/:id/bids`: Place a new bid on a specific job.

### Frontend


- **Home Page**: Displays the 5 most recent and 5 most active job postings with links to job details and posting a new job.
- **New Job Page**: Form to create a new job posting.
- **Job Details Page**: Displays job details and allows placing a new bid.

---
