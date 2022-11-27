package com.academia.account;

import com.academia.account.util.CorsFilter;
import jakarta.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/")
public class HelloApplication extends ResourceConfig {
    public HelloApplication() {
        register(CorsFilter.class);
        packages("com.academia.account");
    }
}