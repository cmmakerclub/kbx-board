#include "KBX_SD.h"

#include "driver/spi_common.h"
#include "driver/gpio.h"

#define SPI_MISO_GPIO GPIO_NUM_32
#define SPI_MOSI_GPIO GPIO_NUM_21
#define SPI_CLK_GPIO GPIO_NUM_22
#define FUNC_GPIO PIN_FUNC_GPIO
#define SPI_SETTING SPISettings(2000000, MSBFIRST, SPI_MODE0)

void KBX_SD::sw2spi()
{
    Serial.println("switch2spi");
    spi_bus_config_t bus_config;
    bus_config.miso_io_num = SPI_MISO_GPIO;
    bus_config.mosi_io_num = SPI_MOSI_GPIO;
    bus_config.sclk_io_num = SPI_CLK_GPIO;

    // MUST init sclk before mosi  //
    /*  SPI SCLK PIN  */
    while (ESP_OK != gpio_set_direction(SPI_CLK_GPIO, GPIO_MODE_INPUT_OUTPUT));
    while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY));
    gpio_matrix_out(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_out, false, false);
    gpio_matrix_in(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_in, false);
    PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.sclk_io_num], FUNC_GPIO);

    /*  SPI MOSI PIN  */
    while (ESP_OK != gpio_set_direction(SPI_MOSI_GPIO, GPIO_MODE_INPUT_OUTPUT));
    while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY));
    gpio_matrix_out(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_out, false, false);
    gpio_matrix_in(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_in, false);
    PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.mosi_io_num], FUNC_GPIO);
}

void KBX_SD::begin()
{
    // sw2spi();
    // SPI.begin(TFCARD_CLK_PIN, TFCARD_MISO_PIN, TFCARD_MOSI_PIN, TFCARD_CS_PIN);
    // if (!SD.begin(TFCARD_CS_PIN, SPI, 40000000)) {
    //     Serial.println("Card Mount Failed");
    // } 
    // Serial.println("Card Mount Failed");

}

//#########################################################
// uint16_t KBX_IO::io_analogRead(byte input)
// {
//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(input);
//     Wire1.endTransmission(true);
//     Wire1.requestFrom((uint8_t)0x34, 2, true);
//     byte buff[16];
//     byte idx = 0;
//     while (Wire1.available())
//     {
//         buff[idx++] = Wire1.read();
//         //    Serial.println(Wire1.read(),BIN);
//     }
//     return word(buff[0], buff[1]);
// }
// byte KBX_IO::io_digitalRead(byte input)
// {
//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(0x22);
//     Wire1.endTransmission(true);
//     Wire1.requestFrom((uint8_t)0x34, 2, true);
//     byte buff[16];
//     byte idx = 0;
//     while (Wire1.available())
//     {
//         buff[idx++] = Wire1.read();
//     }
//     return bitRead(word(buff[0], buff[1]), input);
// }
// void KBX_IO::io_set_period_PWM()
// {
//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(0x27);
//     Wire1.write(periodX1);
//     Wire1.write(periodX1);
//     Wire1.write(periodX1);
//     Wire1.endTransmission(true);
// }

// void KBX_IO::io_PWMWrite(byte pin, uint8_t PWM)
// {
//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(pin);
//     Wire1.write(PWM);
//     Wire1.endTransmission(true);
// }

// void KBX_IO::io_pinMode(byte _pinH, byte _pinL, byte _state)
// {
//     if (_pinH != 0)
//     {
//         if (_state == 0)
//         {
//             _pinSetup_H = _pinSetup_H & (0xFF - _pinH);
//         }
//         else
//         {
//             _pinSetup_H |= _pinH;
//         };
//     }

//     if (_pinL != 0)
//     {
//         if (_state == 0)
//         {
//             _pinSetup_L = _pinSetup_L & (0xFF - _pinL); // 0B11111111 - B00000000
//         }
//         else
//         {
//             _pinSetup_L |= _pinL;
//         }
//     }

//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(32);
//     Wire1.write(_pinSetup_H);
//     Wire1.write(_pinSetup_L);
//     Wire1.endTransmission(true);
// }

// void KBX_IO::io_digitalWrite(byte _pinH, byte _pinL, byte _state)
// {
//     if (_pinH != 0)
//     {
//         if (_state == 0)
//         {
//             _pinmask_H = 0xFF;
//             _status_H = _status_H & (0xFF - _pinH);
//         }
//         else
//         {
//             _pinmask_H = 0xFF;
//             _status_H |= _pinH;
//         };
//     }

//     if (_pinL != 0)
//     {
//         if (_state == 0)
//         {
//             _pinmask_L = 0xFF;
//             _status_L = _status_L & (0xFF - _pinL);
//         }
//         else
//         {
//             _pinmask_L = 0xFF;
//             _status_L |= _pinL;
//         }
//     }

//     Wire1.begin(4, 5);
//     Wire1.beginTransmission(0x34);
//     Wire1.write(33);
//     Wire1.write(_pinmask_H);
//     Wire1.write(_pinmask_L);
//     Wire1.endTransmission(true);

//     Wire1.beginTransmission(0x34);
//     Wire1.write(34);
//     Wire1.write(_status_H);
//     Wire1.write(_status_L);
//     Wire1.endTransmission(true);
// }

// void KBX_IO::usb_loop()
// {
//     curTime_kb = millis();
//     if (curTime_kb - prevTime_kb >= 50)
//     {
//         prevTime_kb = curTime_kb;

//         Wire1.begin(4, 5);
//         Wire1.beginTransmission(0x34);
//         Wire1.write(0);
//         Wire1.endTransmission(false);
//         Wire1.requestFrom((uint8_t)0x34, (uint8_t)16, true); //request 16 Bytes

//         byte buff[16];
//         byte idx = 0;
//         while (Wire1.available())
//             ((uint8_t *)buff)[idx++] = Wire1.read();

//         // keyboard A-Z
//         _data1 = char(buff[1] + 61);
//         _data2 = char(buff[2] + 61);

//         _keyboard_1_char = _data1;
//         _keyboard_2_char = _data2;

//         // keyboard direction
//         if ((buff[1] + 61) == 140)
//             _keyboard_1_char = ">";
//         else if ((buff[1] + 61) == 141)
//             _keyboard_1_char = "<";
//         else if ((buff[1] + 61) == 142)
//             _keyboard_1_char = "v";
//         else if ((buff[1] + 61) == 143)
//             _keyboard_1_char = "^";
//         else if ((buff[1] + 61) == 101)
//             _keyboard_1_char = "$";
//         else if ((buff[1] + 61) == 103)
//             _keyboard_1_char = "~";

//         if ((buff[2] + 61) == 140)
//             _keyboard_2_char = ">";
//         else if ((buff[2] + 61) == 141)
//             _keyboard_2_char = "<";
//         else if ((buff[2] + 61) == 142)
//             _keyboard_2_char = "v";
//         else if ((buff[2] + 61) == 143)
//             _keyboard_2_char = "^";
//         else if ((buff[2] + 61) == 101)
//             _keyboard_2_char = "$";
//         else if ((buff[2] + 61) == 103)
//             _keyboard_2_char = "~";

//         // joystick left X axis
//         _joystick_lX = buff[8];
//         // joystick left Y axis
//         _joystick_lY = buff[9];
//         // joystick right X axis
//         _joystick_rX = buff[11];
//         // joystick right Y axis
//         _joystick_rY = buff[12];

//         if ((buff[13] & 0x8F) == 0x8F)
//             _joystick_button_x = 1;
//         else
//             _joystick_button_x = 0;
//         if ((buff[13] & 0x4F) == 0x4F)
//             _joystick_button_y = 1;
//         else
//             _joystick_button_y = 0;
//         if ((buff[13] & 0x2F) == 0x2F)
//             _joystick_button_a = 1;
//         else
//             _joystick_button_a = 0;
//         if ((buff[13] & 0x1F) == 0x1F)
//             _joystick_button_b = 1;
//         else
//             _joystick_button_b = 0;

//         // joystick paddle
//         if ((buff[14] & 0x01) == 0x01)
//         {
//             _joystick_paddle = "L1";
//         }
//         else if ((buff[14] & 0x02) == 0x02)
//         {
//             _joystick_paddle = "R1";
//         }
//         else if ((buff[14] & 0x04) == 0x04)
//         {
//             _joystick_paddle = "L2";
//         }
//         else if ((buff[14] & 0x08) == 0x08)
//         {
//             _joystick_paddle = "R2";
//         }
//         else
//         {
//             _joystick_paddle = "";
//         }

//         // joystick select & start button
//         if ((buff[14] & 0x10) == 0x10)
//             _joystick_button_select = 1;
//         else
//             _joystick_button_select = 0;

//         if ((buff[14] & 0x20) == 0x20)
//             _joystick_button_start = 1;
//         else
//             _joystick_button_start = 0;
//     }
// }

// String KBX_IO::keyboard_1_char()
// {
//     return _keyboard_1_char;
// }

// String KBX_IO::keyboard_2_char()
// {
//     return _keyboard_2_char;
// }

// String KBX_IO::joystick_paddle()
// {
//     return _joystick_paddle;
// }

// uint8_t KBX_IO::joystick_left_xaxis()
// {
//     return _joystick_lX;
// }

// uint8_t KBX_IO::joystick_left_yaxis()
// {
//     return _joystick_lY;
// }

// uint8_t KBX_IO::joystick_right_xaxis()
// {
//     return _joystick_rX;
// }

// uint8_t KBX_IO::joystick_right_yaxis()
// {
//     return _joystick_rY;
// }

// boolean KBX_IO::joystick_button_x()
// {
//     return _joystick_button_x;
// }

// boolean KBX_IO::joystick_button_y()
// {
//     return _joystick_button_y;
// }

// boolean KBX_IO::joystick_button_a()
// {
//     return _joystick_button_a;
// }

// boolean KBX_IO::joystick_button_b()
// {
//     return _joystick_button_b;
// }

// boolean KBX_IO::joystick_button_select()
// {
//     return _joystick_button_select;
// }

// boolean KBX_IO::joystick_button_start()
// {
//     return _joystick_button_start;
// }
