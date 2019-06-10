// Copyright (c) MakerLAB. All rights reserved.

// Licensed under the MIT license. See LICENSE file in the project root for full license information.
/**
 * \par Copyright (C), 2015-2017, MakerAsia
 * \class kbxui
 * \brief   kbxui library.
 * @file    kbxui.h
 * @author  
 * @version V0.1.0
 * @date    2018/06/02
 * @brief   Header for kbxui.cpp module
 *
 * \par Description
 * This file is a drive for kbx-UI core.
 *
 * \par Method List:
 *    
 *  System:
        kbx.begin();
        kbx.update();

    LCD:
        kbx.lcd.setBrightness(uint8_t brightness);
        kbx.Lcd.drawPixel(int16_t x, int16_t y, uint16_t color);
        kbx.Lcd.drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color);
        kbx.Lcd.fillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color);
        kbx.Lcd.fillScreen(uint16_t color);
        kbx.Lcd.drawCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color);
        kbx.Lcd.drawCircleHelper(int16_t x0, int16_t y0, int16_t r, uint8_t cornername,uint16_t color);
        kbx.Lcd.fillCircle(int16_t x0, int16_t y0, int16_t r, uint16_t color);
        kbx.Lcd.fillCircleHelper(int16_t x0, int16_t y0, int16_t r, uint8_t cornername,int16_t delta, uint16_t color);
        kbx.Lcd.drawTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1, int16_t x2, int16_t y2, uint16_t color);
        kbx.Lcd.fillTriangle(int16_t x0, int16_t y0, int16_t x1, int16_t y1, int16_t x2, int16_t y2, uint16_t color);
        kbx.Lcd.drawRoundRect(int16_t x0, int16_t y0, int16_t w, int16_t h, int16_t radius, uint16_t color);
        kbx.Lcd.fillRoundRect(int16_t x0, int16_t y0, int16_t w, int16_t h, int16_t radius, uint16_t color);
        kbx.Lcd.drawBitmap(int16_t x, int16_t y, const uint8_t bitmap[], int16_t w, int16_t h, uint16_t color);
        kbx.Lcd.drawRGBBitmap(int16_t x, int16_t y, const uint16_t bitmap[], int16_t w, int16_t h),
        kbx.Lcd.drawChar(uint16_t x, uint16_t y, char c, uint16_t color, uint16_t bg, uint8_t size);
        kbx.Lcd.setCursor(uint16_t x0, uint16_t y0);
        kbx.Lcd.setTextColor(uint16_t color);
        kbx.Lcd.setTextColor(uint16_t color, uint16_t backgroundcolor);
        kbx.Lcd.setTextSize(uint8_t size);
        kbx.Lcd.setTextWrap(boolean w);
        kbx.Lcd.printf();
        kbx.Lcd.print();
        kbx.Lcd.println();
        kbx.Lcd.drawCentreString(const char *string, int dX, int poY, int font);
        kbx.Lcd.drawRightString(const char *string, int dX, int poY, int font);
        kbx.Lcd.drawJpg(const uint8_t *jpg_data, size_t jpg_len, uint16_t x, uint16_t y);
        kbx.Lcd.drawJpgFile(fs::FS &fs, const char *path, uint16_t x, uint16_t y);
        kbx.Lcd.drawBmpFile(fs::FS &fs, const char *path, uint16_t x, uint16_t y);


    Button:
        kbx.BtnA/B/C/SW1/SW2.read();
        kbx.BtnA/B/C/SW1/SW2.isPressed();
        kbx.BtnA/B/C/SW1/SW2.isReleased();
        kbx.BtnA/B/C/SW1/SW2.wasPressed();
        kbx.BtnA/B/C/SW1/SW2.wasReleased();
        kbx.BtnA/B/C/SW1/SW2.pressedFor(uint32_t ms);
        kbx.BtnA/B/C/SW1/SW2.releasedFor(uint32_t ms);
        kbx.BtnA/B/C/SW1/SW2.lastChange();

    Speaker:
        kbx.Speaker.tone(uint32_t freq);
        kbx.Speaker.tone(freq, time);
        kbx.Speaker.beep();
        kbx.Speaker.setBeep(uint16_t frequency, uint16_t duration);
        kbx.Speaker.mute();

    Buzzer:
        kbx.Buzzer.tone(uint32_t freq);
        kbx.Buzzer.tone(freq, time);
        kbx.Buzzer.beep();
        kbx.Buzzer.setBeep(uint16_t frequency, uint16_t duration);
        kbx.Buzzer.mute();
		
 *
 * \par History:
 * <pre>
 * `<Author>`         `<Time>`        `<Version>`        `<Descr>`
 * Bird Techstep     2018/06/02        0.0.1          Rebuild the new.
 * </pre>
 *
 */

#ifndef _kbxui_H_
#define _kbxui_H_

#if defined(ESP32)

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include "FS.h" // Use SPIFFS only
#include "utility/kbSD.h"
	
#include "kbxDisplay.h"
#include "utility/Config.h"
#include "utility/Button.h"
#include "utility/Speaker.h"
#include "utility/kbTimer.h"

#include "utility/Buzzer.h"
#include "utility/LEDBackpack.h"  //HT16K33
#include "utility/LM73.h"  //LM73

// #include "utility/audio/AudioFileSourceSPIFFS.h"
// #include "utility/audio/AudioFileSourceSD.h"
// #include "utility/audio/AudioFileSourceID3.h"
// #include "utility/audio/AudioGeneratorMP3.h"
// #include "utility/audio/AudioOutputI2S.h"

class kbxui {

 public:
    void begin(bool LCDEnable=true, bool SDEnable=true);
    void update();

    void setWakeupButton(uint8_t button);
    void powerOFF();

    // Button API
    #define DEBOUNCE_MS 5
    Button BtnA   = Button(BUTTON_A_PIN, true, DEBOUNCE_MS);
    Button BtnB   = Button(BUTTON_B_PIN, true, DEBOUNCE_MS);
    Button BtnC   = Button(BUTTON_C_PIN, true, DEBOUNCE_MS);

    Button BtnSW1 = Button(BUTTON_SW1_PIN, true, DEBOUNCE_MS);
    Button BtnSW2 = Button(BUTTON_SW2_PIN, true, DEBOUNCE_MS);

    // SPEAKER
    SPEAKER Speaker;
	BUZZER Buzzer;

    // LCD
    kbxDisplay Lcd = kbxDisplay();
	
	// Matrix
	TwoWire Wire1 = TwoWire(1);
	//HT16K33 LED = HT16K33();

	KBX_8x16minimatrix matrix = KBX_8x16minimatrix();
	
	//LM73 Temp sensor
	LM73 lm73 = LM73();

    // UART
    // HardwareSerial Serial0 = HardwareSerial(0);
    // HardwareSerial Serial2 = HardwareSerial(2);


 private:
    uint8_t _wakeupPin;
};

extern kbxui kbx;
#define KBX kbx
#define lcd Lcd
#define led matrix
#define Led matrix

#else
#error “This library only supports boards with ESP32 processor.”
#endif

#endif

