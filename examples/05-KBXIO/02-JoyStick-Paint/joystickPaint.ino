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

typedef int Number;
typedef int Boolean;
using namespace std;

Number obj_x;
Number obj_y;

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  obj_x = 160;
  obj_y = 160;

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบ Joystick วาดรูป", 5, 0, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กดปุ่ม Y เพื่อวาด", 5, 30, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กดปุ่ม A เพื่อลบ", 5, 60, 1);

  KBX.Lcd.drawRect(0, 100, 320, 140, 0xffff);
}
void loop() {
  KBX.update();
  KBXio.usb_loop();
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_09_EN, CF_KN_REG_09_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(((String("x : ") + String(obj_x) + String(" y:") +
                              String(obj_y)))),
                     200, 65, 1);
  delay(50);
  KBX.lcd.fillRect(200, 65, 130, 20, 0x0);
  if ((KBXio.joystick_left_xaxis()) == 0) {
    obj_x = obj_x - 1;
  } else if ((KBXio.joystick_left_xaxis()) == 255) {
    obj_x = obj_x + 1;
  }
  if ((KBXio.joystick_left_yaxis()) == 0) {
    obj_y = obj_y - 1;
  } else if ((KBXio.joystick_left_yaxis()) == 255) {
    obj_y = obj_y + 1;
  }
  if ((KBXio.joystick_button_y()) == 1) {
    KBX.Lcd.fillCircle(obj_x, obj_y, 3, 0xffe0);
  }
  if ((KBXio.joystick_button_a()) == 1) {
    KBX.Lcd.spi_init();
    KBX.Lcd.fillScreen(0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("ทดสอบ Joystick วาดรูป", 5, 0, 1);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("กดปุ่ม Y เพื่อวาด", 5, 30, 1);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("กดปุ่ม A เพื่อลบ", 5, 60, 1);
    KBX.Lcd.drawRect(0, 100, 320, 140, 0xffff);
  }
}
