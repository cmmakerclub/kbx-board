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
  music.begin(0);
  Serial.begin(115200);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(0, 0, 107, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(107, 0, 107, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(214, 0, 105, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(0, 120, 107, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(107, 120, 107, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.drawRect(214, 120, 105, 120, 0xffff);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("A")), 35, 27, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("B")), 142, 27, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("C")), 249, 27, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("D")), 35, 147, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("E")), 142, 147, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("F")), 249, 147, 1);
}
void loop() {
  KBX.update();
  if (ts.touched(1000)) {
    TS_Point p = ts.getPoint();
    int tft_point_x = map(p.x, 170, 3750, 0, 320);
    int tft_point_y = map(p.y, 200, 3855, 240, 0);
    Serial.println(((String("X:") + String(((uint16_t)tft_point_x)) +
                     String(" Y:") + String(((uint16_t)tft_point_y)))));
    if (((((uint16_t)tft_point_x) >= 0) && (((uint16_t)tft_point_x) < 107)) &&
        ((((uint16_t)tft_point_y) >= 0) && (((uint16_t)tft_point_y) <= 120))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("A")));
      KBX.matrix.writeDisplay();
      music.tone(440, 250);
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(0, 0, 107, 120, 0xfe79);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0xfe79);
      KBX.Lcd.drawString(String(String("A")), 35, 27, 1);
    }
    if (((((uint16_t)tft_point_x) >= 107) && (((uint16_t)tft_point_x) < 214)) &&
        ((((uint16_t)tft_point_y) >= 0) && (((uint16_t)tft_point_y) <= 120))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("B")));
      KBX.matrix.writeDisplay();
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(107, 0, 107, 120, 0xfe73);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0xfe73);
      KBX.Lcd.drawString(String(String("B")), 142, 27, 1);
      music.tone(494, 250);
    }
    if (((((uint16_t)tft_point_x) >= 214) && (((uint16_t)tft_point_x) < 320)) &&
        ((((uint16_t)tft_point_y) >= 0) && (((uint16_t)tft_point_y) <= 120))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("C")));
      KBX.matrix.writeDisplay();
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(214, 0, 105, 120, 0xfff3);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0xfff3);
      KBX.Lcd.drawString(String(String("C")), 249, 27, 1);
      music.tone(262, 250);
    }
    if (((((uint16_t)tft_point_x) >= 35) && (((uint16_t)tft_point_x) < 147)) &&
        ((((uint16_t)tft_point_y) >= 107) &&
         (((uint16_t)tft_point_y) <= 220))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("D")));
      KBX.matrix.writeDisplay();
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(0, 120, 107, 120, 0x9ff3);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0x9ff3);
      KBX.Lcd.drawString(String(String("D")), 35, 147, 1);
      music.tone(294, 250);
    }
    if (((((uint16_t)tft_point_x) >= 107) && (((uint16_t)tft_point_x) < 214)) &&
        ((((uint16_t)tft_point_y) >= 107) &&
         (((uint16_t)tft_point_y) <= 220))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("E")));
      KBX.matrix.writeDisplay();
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(107, 120, 107, 120, 0x9fff);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0x9fff);
      KBX.Lcd.drawString(String(String("E")), 142, 147, 1);
      music.tone(330, 250);
    }
    if (((((uint16_t)tft_point_x) >= 214) && (((uint16_t)tft_point_x) < 320)) &&
        ((((uint16_t)tft_point_y) >= 107) &&
         (((uint16_t)tft_point_y) <= 220))) {
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print(String(String("F")));
      KBX.matrix.writeDisplay();
      KBX.Lcd.spi_init();
      KBX.Lcd.fillRect(214, 120, 105, 120, 0xfe7f);
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
      KBX.Lcd.setTextColor(0x0, 0xfe7f);
      KBX.Lcd.drawString(String(String("F")), 249, 147, 1);
      music.tone(349, 250);
    }
  }
}
