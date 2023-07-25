FROM httpd:2.4

COPY ./docker/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./dist /usr/local/apache2/htdocs

WORKDIR /usr/local/apache2/htdocs

EXPOSE 443 80