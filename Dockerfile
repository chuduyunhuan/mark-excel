FROM vmdev/base_node:8

LABEL MAINTAINER="Jack Zhang <kejackz@vmware.com>"



ENV project portal-incubator

WORKDIR /workspace/${project}

ADD ./  ./

RUN npm install --unsafe-perm --no-save


CMD npm run prebuild \
&&  npm start --portal-incubator:port=5601 -- --prod --no-watch

EXPOSE 5601
