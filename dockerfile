FROM node:20
WORKDIR /opt/one_time_password
COPY . .
EXPOSE 3000
CMD [ "sleep", "infinity" ]