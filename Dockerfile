FROM nginx
LABEL maintainer="guzhongren@live.cn"
COPY ./build/ /usr/share/nginx/html
EXPOSE 80