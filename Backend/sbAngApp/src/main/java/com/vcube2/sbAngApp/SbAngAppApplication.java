package com.vcube2.sbAngApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.vcube2.sbAngApp.model")
@EnableJpaRepositories(basePackages = "com.vcube2.sbAngApp.repository")
public class SbAngAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbAngAppApplication.class, args);
	}

}
