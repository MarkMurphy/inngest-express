## Background

I discovered an issue where the Inngest SDK would cause my docker container to exit with code 0 and no other output while attempting to register with the Inngest CLI dev server, which I have running separately on my host machine.

I've been having this issue in Docker Desktop for mac (with Intel chip) in v4.19.0 and above. Strangely, it's not an in issue in v4.18.0.

When the server is run directly from the host machine (not within a Docker container), there's no issue.

After some quick debugging, it seems related to the default `fetch` implementation used by the SDK. When I provided the `fetch` implementation from the node-fetch package, the issue went away. Strangely, while I was debugging, it didn't always seem consistent. As I stepped through the SDK's code the unexpected exit would not not always occur and the api would recieve a succesful response to the register endpoint.

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
