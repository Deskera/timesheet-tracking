package com.deskera.timetracking.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class Mail {
	@Autowired
    private JavaMailSender javaMailSender;
    
    public void sendEmail(String to,String pwd) {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Time Tracking Application Login Credentials");
        msg.setText(" userid: "+to+"\n password: "+pwd);
        javaMailSender.send(msg);
        }
}
