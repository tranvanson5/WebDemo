package org.example.webdemo.utils.OTPGenerator;

import org.springframework.stereotype.Component;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class OTPGenerator {

    private static final int OTP_LENGTH = 6; // Length of the OTP

    public String generateOTP() {
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < OTP_LENGTH; i++) {
            int digit = ThreadLocalRandom.current().nextInt(0, 10);
            otp.append(digit);
        }

        return otp.toString();
    }
}
