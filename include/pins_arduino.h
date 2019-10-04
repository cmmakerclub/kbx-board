#ifndef Pins_Arduino_h
#define Pins_Arduino_h

#include <stdint.h>

#define EXTERNAL_NUM_INTERRUPTS 16
#define NUM_DIGITAL_PINS        40
#define NUM_ANALOG_INPUTS       16

#define analogInputToDigitalPin(p)  (((p)<20)?(esp32_adc2gpio[(p)]):-1)
#define digitalPinToInterrupt(p)    (((p)<40)?(p):-1)
#define digitalPinHasPWM(p)         (p < 34)

static const uint8_t TX = 1;
static const uint8_t RX = 3;

static const uint8_t SDA = 21;
static const uint8_t SCL = 22;

static const uint8_t SS    = 5;
static const uint8_t MOSI  = 23;
static const uint8_t MISO  = 19;
static const uint8_t SCK   = 18;

static const uint8_t A0 = 36;
static const uint8_t A3 = 39;
static const uint8_t A4 = 32;
static const uint8_t A5 = 33;
static const uint8_t A6 = 34;
static const uint8_t A7 = 35;
static const uint8_t A10 = 4;
static const uint8_t A11 = 0;
static const uint8_t A12 = 2;
static const uint8_t A13 = 15;
static const uint8_t A14 = 13;
static const uint8_t A15 = 12;
static const uint8_t A16 = 14;
static const uint8_t A17 = 27;
static const uint8_t A18 = 25;
static const uint8_t A19 = 26;

static const uint8_t T0 = 4;
static const uint8_t T1 = 0;
static const uint8_t T2 = 2;
static const uint8_t T3 = 15;
static const uint8_t T4 = 13;
static const uint8_t T5 = 12;
static const uint8_t T6 = 14;
static const uint8_t T7 = 27;
static const uint8_t T8 = 33;
static const uint8_t T9 = 32;

static const uint8_t DAC1 = 25;
static const uint8_t DAC2 = 26;


static const uint8_t KB_LDR_PIN = 36;

static const uint8_t KB_BUTTON1 = 16;
static const uint8_t KB_BUTTON2 = 14;

static const uint8_t KB_TFT_SW1 = 33;
static const uint8_t KB_TFT_SW2 = 34;
static const uint8_t KB_TFT_SW3 = 35;

static const uint8_t KB_LED_BT = 17;
static const uint8_t KB_LED_WIFI = 2;
static const uint8_t KB_LED_NTP = 15;
static const uint8_t KB_LED_IOT = 12;

static const uint8_t KB_BUZZER = 13;
static const uint8_t KB_SPEAKER = 26;

static const uint8_t KB_INPUT1 = 32;
static const uint8_t KB_INPUT2 = 33;
static const uint8_t KB_INPUT3 = 34;
static const uint8_t KB_INPUT4 = 35;

static const uint8_t KB_OUTPUT1= 26;
static const uint8_t KB_OUTPUT2 = 27;
static const uint8_t KB_USB = 25;

static const uint8_t KB_SDA0 = 21;
static const uint8_t KB_SCL0 = 22;

static const uint8_t KB_SDA1 = 4;
static const uint8_t KB_SCL1 = 5;

static const uint8_t KB_GPIO18 = 18;
static const uint8_t KB_GPIO19 = 19;
static const uint8_t KB_GPIO23= 23;


#endif /* Pins_Arduino_h */
