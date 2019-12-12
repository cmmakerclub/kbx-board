// Copyright (c) MakerLAB. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

#include "kbxui.h"

void kbxui::begin(bool LCDEnable, bool SDEnable) {
    matrix.begin(0x70);  // pass in the address
    for (uint8_t i=0; i<8; i++) {
        matrix.displaybuffer[i] = 0;
    }
    matrix.writeDisplay();  
    // UART 
    Serial.begin(115200);
    //Serial.flush();
    Serial.print("KBX-UI initializing...");

    // I2C
    //pinMode(I2C0_SCL, OUTPUT);
    //digitalWrite(I2C0_SDA, 1);
    //pinMode(I2C1_SCL, OUTPUT);
    //digitalWrite(I2C1_SDA, 1);
	
	//TwoWire Wire1 = TwoWire(0);
	TwoWire Wire1  = TwoWire(1);

    // TONE
    Speaker.begin();
    Buzzer.begin();

    // Setup the button with an internal pull-up
    pinMode(BUTTON_A_PIN, INPUT_PULLUP);
    pinMode(BUTTON_B_PIN, INPUT_PULLUP);
    pinMode(BUTTON_C_PIN, INPUT_PULLUP);

    pinMode(BUTTON_SW1_PIN, INPUT_PULLUP);
    pinMode(BUTTON_SW2_PIN, INPUT_PULLUP);

	// Matrix INIT
	matrix.begin(0x70);  // pass in the address

	  // KBX-UI LCD INIT
    if (LCDEnable) Lcd.begin();
	//KBX.Lcd.fillScreen(RED);

    // TF Card
    // if (SDEnable) SD.begin(TFCARD_CS_PIN, SPI, 40000000);
	
    // Set wakeup button
    setWakeupButton(BUTTON_A_PIN);

	//Wire1.begin(LED_SDA, LED_SCL);
	Wire.begin(I2C_SDA, I2C_SCL);

    Serial.println("KBX-UI OK");
	
	// LED Status Active LOW
    pinMode(LED_BT,   OUTPUT);
    pinMode(LED_WIFI, OUTPUT);
    pinMode(LED_NTP,  OUTPUT);
    pinMode(LED_IOT,  OUTPUT);
    digitalWrite(LED_BT,   1);
    digitalWrite(LED_WIFI, 1);
    digitalWrite(LED_NTP,  1);
    digitalWrite(LED_IOT,  1);

	// BUZZER
    pinMode(BUZZER_PIN, OUTPUT);

	// Light Sensor LDR
    pinMode(LDR_PIN, INPUT);

	// USB Type A ON/OFF Active HIGH
    pinMode(USBA_SW, OUTPUT);
    digitalWrite(USBA_SW, 0);
	
	// Power Bank Current Drain Active HIGH
    pinMode(PBCD_PIN, OUTPUT);
    digitalWrite(PBCD_PIN, 0);
		
    Serial.println("KidBright32 OK");
}

void kbxui::update() {

    //Button update
    BtnA.read();
    BtnB.read();
    BtnC.read();

    BtnSW1.read();
    BtnSW2.read();

	// TP.read();

    //Speaker update
    Speaker.update();
//    Buzzer.update();
}

void kbxui::setWakeupButton(uint8_t button) {
    _wakeupPin = button;
}

void kbxui::powerOFF() {
    
    // power off the Lcd
    //Lcd.setBrightness(0);
    //Lcd.sleep();

    // ESP32 into deep sleep
    USE_SERIAL.printf("Enabling EXT0 wakeup on pins GPIO%d\n", _wakeupPin);
    esp_sleep_enable_ext0_wakeup((gpio_num_t)_wakeupPin , LOW);
    
    while(digitalRead(_wakeupPin) == LOW) {
        delay(10);
    }
    USE_SERIAL.println("On deep sleep mode.");
    esp_deep_sleep_start();
    USE_SERIAL.println("On power OFF fail!");
}

kbxui kbx;
