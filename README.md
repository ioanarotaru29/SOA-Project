# SOA-Project - Flight Reservation System
### System Diagram
```mermaid
graph TD
  User([System User])--Visualize flights, \n reserve flight tickets-->System(Flight Reservation System)
  System --Processes payments --> paymentSys("Payment Processing System \n<i>#lt;External System#gt;</i>")
```

### Container Diagram
```mermaid
graph TD
  User([System User])
  paymentSys("Payment Processing System \n<i>#lt;External System#gt;</i>")
  backend(Main Service)
  backendAuth(Auth Service)
  backendUser(User Service)
  backendFlight(Flight Service)
  backendBooking(Booking Service)
  backendPayment(Payment Service)
  
  User--"Visualize flights and reserve flight tickets"-->WebApp(Web Application)
  backendPayment --Processes payments --> paymentSys("Payment Processing System \n<i>#lt;External System#gt;</i>")
  
  subgraph container[Flight Reservation System]
    direction LR
    WebApp--Call API-->backend
    WebApp--Call API-->backendAuth
    backendAuth --> backendUser
    backend --Check JWT-->backendAuth
    backend -->backendFlight
    backend -->backendBooking
    backendBooking-->backendPayment
  end
```

### Component Diagram
#### Web Application

```mermaid
graph TD
    Client(Client)-->AuthWrapperComponent
    Client-->FlightWrapperComponent
    Client-->BookingWrapperComponent
    subgraph container[Container App]
      AuthWrapperComponent
      FlightWrapperComponent
      BookingWrapperComponent
    end
    subgraph Auth
      AuthComponent
    end
    subgraph Flight
      FlightComponent
    end
    subgraph Booking
      BookingComponent
    end
    AuthComponent-->AuthService(Auth Service)
    AuthWrapperComponent -->AuthComponent
    FlightWrapperComponent-->FlightComponent-->MainService(Main Service)
    BookingWrapperComponent-->BookingComponent-->MainService
```

#### Services
```mermaid
---
title: Main Service
---
graph TD
    Client(Client)-->AppController
    AppService
    AuthGuard
    subgraph main
      AppController --> AppService
      AppController --> AuthGuard
    end
    AppService-->flight(Flight Service)
    AppService-->booking(Booking Service)
    AuthGuard-->auth(Auth Service)
```

```mermaid
---
title: Auth Service
---
graph TD
    Client(Client)-->AuthController
    AuthService
    subgraph auth
      AuthController --> AuthService
    end
    AuthService-->user(User Service)
```

```mermaid
---
title: User Service
---
graph TD
    Client(Client)-->UserController
    UserService
    subgraph user
      UserController --> UserService
    end
    UserService-->database[(MySQL Database)]
```

```mermaid
---
title: Flight Service
---
graph TD
    Client(Client)-->FlightController
    FlightService
    subgraph flight
      FlightController --> FlightService
    end
    FlightService-->database[(MySQL Database)]
```

```mermaid
---
title: Booking Service
---
graph TD
    Client(Client)-->BookingController
    BookingService
    subgraph booking
      BookingController --> BookingService
    end
    BookingService-->database[(MySQL Database)]
    BookingService-->payment(Payment Service)
```

```mermaid
---
title: Payment Service
---
graph TD
    Client(Client)-->PaymentController
    PaymentService
    subgraph payment
      PaymentController --> PaymentService
    end
    PaymentService-->database[(MySQL Database)]
    PaymentService-->paymentSys("Payment Processing System \n<i>#lt;External System#gt;</i>")
```
