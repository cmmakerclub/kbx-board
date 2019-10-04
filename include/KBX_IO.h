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

class KBX_IO
{
public:
    void io_pinMode(byte _pinH, byte _pinL, byte _state);
    void io_digitalWrite(byte _pinH, byte _pinL, byte _state);
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

protected:
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

private:
};

#endif /* KBX_IO_h */
