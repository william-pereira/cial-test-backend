# Base image taken from: https://hub.docker.com/r/cypress/included
FROM cypress/included:cypress-13.14.1-node-20.17.0-chrome-128.0.6613.113-1-ff-129.0.2-edge-128.0.2739.42-1

RUN mkdir /cial-test-backend

WORKDIR /cial-test-backend

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.env.json . 
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT ["npx","cypress","run"]

CMD [""]