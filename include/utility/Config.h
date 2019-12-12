#ifndef _CONFIG_H_
#define _CONFIG_H_

// Screen
#define TFT_DC_PIN   18
#define TFT_CS_PIN   19
#define TFT_MOSI_PIN 21
#define TFT_CLK_PIN  22
#define TFT_MISO_PIN 32 //IN1

// XPT2046 Resistive Touch Screen
#define TP_CS_PIN   27 //OUT2
#define TP_MOSI_PIN 21
#define TP_CLK_PIN  22
#define TP_MISO_PIN 32 //IN1

// SD card
#define TFCARD_CLK_PIN  22
#define TFCARD_MOSI_PIN 21
#define TFCARD_MISO_PIN 32 //IN1
#define TFCARD_CS_PIN   23


// Buttons
#define BTN_A 0
#define BTN_B 1
#define BTN_C 2
#define BUTTON_A 0
#define BUTTON_B 1
#define BUTTON_C 2
#define BUTTON_A_PIN 33 //IN2
#define BUTTON_B_PIN 34 //IN3
#define BUTTON_C_PIN 35 //IN4

// BEEP PIN
#define SPEAKER_PIN 26
#define TONE_PIN_CHANNEL 1

// UART
#define USE_SERIAL Serial

// KidBright32 GPIO

// ADDR[0x70] HT16K33 : RAM Mapping 16*8 LED Controller Driver with keyscan
//#define I2C0_SCL 22
//#define I2C0_SDA 21
#define LED_SCL 22
#define LED_SDA 21

// ADDR[0x6F] MPC7940N : Battery-Backed I2C™ Real-Time Clock/Calendar with SRAM
// ADDR[0x4D] LM73 : 14 Bit Digital Temperature Sensor Default 11 Bit 
//#define I2C1_SCL 5
//#define I2C1_SDA 4
#define I2C_SCL 5
#define I2C_SDA 4

// LED Status Active LOW
#define LED_BT  17
#define LED_WIFI 2
#define LED_NTP 15
#define LED_IOT 12

// Switch Input
#define BTN_SW1 3
#define BTN_SW2 4
#define BUTTON_SW1 3
#define BUTTON_SW2 4
#define BUTTON_SW1_PIN 16
#define BUTTON_SW2_PIN 14

// BUZZER
#define BUZZER_PIN 13

// Light Sensor LDR
#define LDR_PIN 36

// USB Type A ON/OFF Active HIGH
#define USBA_SW 25

// Power Bank Current Drain Active HIGH
#define PBCD_PIN 17

#endif /* SETTINGS_C */
