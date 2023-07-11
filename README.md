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
