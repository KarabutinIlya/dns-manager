FROM debian:stable

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -yqq \
        pdns-server \
        pdns-backend-pgsql && \
    rm -rf /var/lib/apt/lists/*

COPY start.sh /
RUN chmod +x /start.sh

ENV DB_HOST 127.0.0.1
ENV DB_PORT 5432
ENV DB_NAME pdns
ENV DB_USER pdns
ENV DB_PASSWORD postgres
ENV WEB_ENABLED yes
ENV WEB_PORT 8081

EXPOSE 53/tcp
EXPOSE 53/udp
EXPOSE 8081/tcp

CMD ["/start.sh"]
