FROM nginx:latest

VOLUME ["/usr/src/public"]

COPY /bin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE  80