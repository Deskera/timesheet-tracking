This application is built with [Spring Boot](https://spring.io/projects/spring-boot) and [Gradle](https://gradle.org/)     

## How to Use  

1. Checkout code  
```
git clone https://github.com/Deskera/timesheet-tracking.git
```

2. PostgreSQL database setup  

This project uses default port 5432, you can modify it in `application.properties` file in `src/main/resources` folder   
To setup database environment run the sql script `createdatabase.sql` present in `src/main/resources` folder    
```
psql -U postgres -f src/main/resources/createdatabase.sql
```  
This will prompt for default postgres user password, enter your password.  

3. Configure mail credentials  

Fill your gmail id and password in `application.properties` file in `src/main/resources` folder to authenticate credentials, this id will be used to send credential mail while adding new employees.  

```
spring.mail.username = <enter your gmail id>
spring.mail.password = <enter your password>
```
Note: you will have to [turn on less secure app access](https://support.google.com/accounts/answer/6010255#zippy=) for this account.

4. Navigate to root of application `timesheet-tracking/backend/` where `build.gradle` is available and run the Spring Boot application  
```
gradle bootRun
```

