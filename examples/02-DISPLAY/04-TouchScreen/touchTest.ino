#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "kbxui.h"
#include "FontsTH.h"
#include "KB_initBoard.h"
#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_music.h"
#include "KBX_IO.h"

KB_board board = KB_board();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_music music = KB_music();
KBX_IO KBXio = KBX_IO();

#include <XPT2046_Touchscreen.h>

typedef int Number;
typedef int Boolean;
using namespace std;

XPT2046_Touchscreen ts(TOUCH_PIN);

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  SPI.begin(22, 32, 21, 27);
  ts.begin();
  ts.setRotation(1);
  Serial.begin(115200);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบจอ Touch", 10, 10, 1);
}
void loop() {
  KBX.update();
  if (ts.touched()) {
    TS_Point p = ts.getPoint();
    int tft_point_x = map(p.x, 170, 3750, 0, 320);
    int tft_point_y = map(p.y, 200, 3855, 240, 0);
    KBX.lcd.fillRect(90, 50, 50, 70, 0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawString(
        String(((String("X pos : ") + String(((int)tft_point_x))))), 10, 50, 1);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawString(
        String(((String("Y pos : ") + String(((int)tft_point_y))))), 10, 80, 1);
    Serial.println(((String(((int)tft_point_x)) + String("&") +
                     String(((int)tft_point_y)))));
  }
}
