# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR ./server

# Copy the package.json and package-lock.json (if available)
COPY ./package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

CMD ["npx", "prisma", "migrate", "dev"]

CMD ["npx", "prisma", "db", "seed"]

# Start the Next.js development server
CMD ["npm", "run", "start"]
