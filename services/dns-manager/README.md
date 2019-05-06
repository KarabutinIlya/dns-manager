dns-manager
===========

### Usage

Start all services (background):

```
docker-compose up -d
```

Start DNS Manager (foraground):

```
docker-compose up --build dns-manager
```

### User ports

* `10053` (TCP), `10053` (UDP) - PowerDNS DNS Server
* `18081` (TCP) - PowerDNS WEB UI (http://127.0.0.1:18081/)
* `18080` (TCP) - Adminer - Database Console (http://127.0.0.1:18080/)
* `15432` (TCP) - PostgreSQL
* `13000` (TCP) - DNS Manager (**this application**)

### Database credentials

Host: postgres
Port: 5432
Name: dns_manager
User: postgres
Password: passw0rd

### Testing DNS

```
dig @127.0.0.1 -p 10053 google.com A
```

