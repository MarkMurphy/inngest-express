## Background

I encountered an issue where the Inngest SDK caused my Docker container to unexpectedly exit with code 0 and without any additional output. This occurred while attempting to register with the Inngest CLI development server, which is running separately on my host machine.

This problem specifically arises in Docker Desktop for Mac (with Intel chip) versions 4.19.0 and above. Interestingly, it does not occur in version 4.18.0.

When running the server directly from the host machine, outside of a Docker container, there is no problem.

Upon conducting some initial debugging, it appears that the issue is related to the default `fetch` implementation used by the SDK. However, when I supplied the `fetch` implementation from the node-fetch package, the problem was resolved. Curiously, during my debugging process, the behavior was not consistently reproducible. While stepping through the SDK's code, the unexpected container exit did not always occur, and the API would sometimes receive a successful response from the register endpoint.

I have kept the line in the `src/server.ts` file that passes a different fetch implementation. You are welcome to uncomment it to observe the differences described above.

## Usage

### Run the Application

To start the application, run the following command:

```zsh
docker compose up
```

### Test Health Check Endpoint

You can test the health check endpoint to confirm that the server is working as expected. Use the following command:

```zsh
curl http://localhost:3000/healthz
```

## Test Inngest SDK Debug Page

To confirm that the Inngest SDK Debug page is working as expected, you can use either of the following commands:

```zsh
open http://localhost:3000/api/inngest
# or
curl http://localhost:3000/api/inngest
```


## Run Inngest CLI in Development Mode

To run the Inngest CLI in development mode, use the following command:

```zsh
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```

Make sure the application is running and accessible at http://localhost:3000/api/inngest before executing this command.
