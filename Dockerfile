# download the latest version of node
FROM node:17.4.0

# add a label 
LABEL maintainer="Stone"
LABEL description="This is a basic user managment system with mongo db"
LABEL cohort="13"
LABEL animal="Dog"

# Make the working directory View
WORKDIR /userapp
COPY . .

# use port 3000
EXPOSE 3000

# Install all fo the npm modules
RUN npm install

# Start the Website
CMD ["npm", "start"]