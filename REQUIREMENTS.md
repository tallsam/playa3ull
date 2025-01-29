# Technical Test: Game Event Ingesting

## Overview

Develop a self-contained system to ingest events from a hypothetical game.
This test evaluates your ability to design, implement, and explain a multi-component system as a senior engineer end to end.

- The goal is not production-grade code but a clear demonstration of quality, functionality, and thought process.
- **Timebox:** The test is designed to be completed in 4 hours or less.
- **Commit Often:** Show your working process through regular commits.
- **External dependencies:** Use any external dependencies you see fit, you do not need to implement everything from scratch.
- **Keep It Minimal:** Use lightweight libraries and avoid adding unnecessary features, or over-engineering the solution.

## Requirements

- API:
  - Create a REST-compliant API to ingest events.
  - Ensure the API is type-safe and validates input at runtime.
- Queue:
  - Queue the ingested data for processing using a worker system.
- Worker:
  - Implement a worker to process the queued data.
- Database:
  - Store the processed data in a database.
  - Develop a schema to store the data.
- Unit Test:
  - Write one unit test for a critical part of the system.
- Self Contained & Docker Compose:
  - Ensure everything required to run the system is in the repository.
  - Provide a `docker-compose.yml` file to run external dependencies (e.g database)
  - Document the commands to run the system.

## Questions

- What did you use for the API and why?

I chose NextJs as it is a modern framework that is easy to use, I am experienced with it and it is mentioned on the job description.

- What queue/worker system did you choose and why?

I chose bullmq as it has few dependencies (redis) and meets the requirements. I have used it previously and know it works well and covers a large range of use cases. I would have chosen RabbitMQ if more complex queue management was required.

- What database did you use and why?

I chose postgresql as I haven't used it for a while, and I wanted to take Prisma for a spin. Postgres is highly flexible and has a large range of features.

- What key decisions did you make about how the system is structured and why?

Given that this is a test with a time limit, I chose a simple structure - app/api contains the endpoints as per the nextjs AppRouter standard, lib contains the shared reusable code and library configuration. Types contains the type definitions.

If the project was larger I would have grouped files into folders by feature.

> [!IMPORTANT]
> Answer the above questions in this file

## Extra Credit

- Implement a retry mechanism in the worker for failed jobs
- Include a performance optimization (e.g. batch processing in the worker)
- Create additional tests for edge cases
