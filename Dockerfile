FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install 
RUN npm install dotenv
RUN npm install path

COPY . .

ENV PORT=8080
ENV AIRTABLE_API_TOKEN_RECEIVE=patVda4XZrXZ0bO0K.288e91a938d45dbb9d4bc4d9908ce7da2e8e93d55b53b04b3d74e7afcc534abd
ENV AIRTABLE_API_TOKEN_UPLOAD=patDsSjpG0kxHv2b1.361c26eeffa690891d62e505d0c893515ef984f8a1201cdf8b5660aed6232e63

EXPOSE 8080

CMD ["npm", "start"]
