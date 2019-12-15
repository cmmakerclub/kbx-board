#ifndef KBX_IO_h
#define KBX_IO_h

#include <Arduino.h>
#include <Wire.h>

// DAT-L
#define PIN_RB0 0x01
#define PIN_RB1 0x02
#define PIN_RB2 0x04
#define PIN_RB3 0x08
#define PIN_RB4 0x10
#define PIN_RB13 0x20
#define PIN_RB15 0x80

// DAT-R
#define PIN_RC0 0x01
#define PIN_RC1 0x02
#define PIN_RC2 0x04
#define PIN_RA4 0x08
#define PIN_RA8 0x10
#define PIN_RA9 0x20


#define IN_RB0 0
#define IN_RB1 1
#define IN_RB2 2
#define IN_RB3 3
#define IN_RB4 4
#define IN_RB13 5
#define IN_RB14 6
#define IN_RB15 7
#define IN_RC0 8
#define IN_RC1 9
#define IN_RC2 10
#define IN_RA4 11
#define IN_RA8 12
#define IN_RA9 13

#define IO_PWM1 0x2A
#define IO_PWM2 0x2B
#define IO_PWM3 0x2C
#define periodX1 0x08

#define IO_Analog1 0x2D
#define IO_Analog2 0x2E

class KBX_IO
{
public:
    void io_pinMode(byte _pinH, byte _pinL, byte _state);
    void io_digitalWrite(byte _pinH, byte _pinL, byte _state);
    byte io_digitalRead ( byte input );
    uint16_t io_analogRead ( byte input );
    void io_set_period_PWM();
    ///PWM 0-200
    void io_PWMWrite(byte pin, byte PWM);
    void usb_loop();

    String keyboard_1_char();
    String keyboard_2_char();

    String joystick_paddle();
    uint8_t joystick_left_xaxis();
    uint8_t joystick_left_yaxis();
    uint8_t joystick_right_xaxis();
    uint8_t joystick_right_yaxis();
    boolean joystick_button_x();
    boolean joystick_button_y();
    boolean joystick_button_a();
    boolean joystick_button_b();
    boolean joystick_button_select();
    boolean joystick_button_start();

    String _keyboard_1_char;
    String _keyboard_2_char;

    String _joystick_paddle = " ";

    uint8_t _joystick_lX = 128;
    uint8_t _joystick_lY = 128;
    uint8_t _joystick_rX = 128;
    uint8_t _joystick_rY = 128;

    boolean _joystick_button_x = 0;
    boolean _joystick_button_y = 0;
    boolean _joystick_button_a = 0;
    boolean _joystick_button_b = 0;
    boolean _joystick_button_select = 0;
    boolean _joystick_button_start = 0;

protected:
    
private:
    byte _pinSetup_H = 0xFF;
    byte _pinSetup_L = 0xFF;

    byte _status_H = 0x00;
    byte _status_L = 0x00;

    byte _pinmask_H = 0x00;
    byte _pinmask_L = 0x00;

    unsigned long prevTime_kb = 0;
    unsigned long curTime_kb = 0;

    char _data1;
    char _data2;

    

};

#endif /* KBX_IO_h */
