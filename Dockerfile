FROM node:slim

WORKDIR /home/nodejs/bank_app
COPY ./bank_account/.env ./
COPY ./bank_account/package*.json ./

RUN mkdir ./src
COPY bank_account/src/ ./src

RUN mkdir ./frontend
COPY ./bank_account_frontend/dist/ ./frontend

RUN npm install --production

CMD ["npm", "start"]
# CMD ["bash"]