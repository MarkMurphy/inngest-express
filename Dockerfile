FROM node:lts
RUN apt-get update \
  && apt-get install -yq --no-install-recommends curl dumb-init \
  && apt-get clean

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Set the entrypoint script to use dumb-init
ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]

# Run the app
CMD [ "npm", "run", "dev" ]

