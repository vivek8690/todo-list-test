FROM node:latest
# Set the working directory to /dashboard
RUN mkdir /usr/src/app
WORKDIR /usr/src/

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies

ADD package.json /usr/src/package.json

RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm rebuild node-sass

# start app
CMD [ "npm", "start", "--prefix" , "/usr/src/app/" ]