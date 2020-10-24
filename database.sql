CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(180) NOT NULL,
    "completed" BOOLEAN NOT NULL
);