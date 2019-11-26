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

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  pinMode(33, INPUT_PULLUP);
  pinMode(34, INPUT_PULLUP);
  pinMode(35, INPUT_PULLUP);
  KBX.Lcd.spi_init();
  KBX.Lcd.fillScreen(0x0);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xf800, 0xffff);
  KBX.Lcd.drawUTF8String("เกมตอบคำถาม", 20, 0, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กดสวิตซ์ด้านขวาเพื่อตอบ", 10, 70, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ปุ่ม 1 ตอบ ก", 0, 100, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ปุ่ม 2 ตอบ ข", 0, 130, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ปุ่ม 3 ตอบ ค", 0, 160, 1);

  delay(5000);
  KBX.Lcd.spi_init();
  KBX.Lcd.fillScreen(0x0);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_24_EN, CF_KN_REG_24_TH, NULL);
  KBX.Lcd.setTextColor(0xf800, 0xffff);
  KBX.Lcd.drawUTF8String("เกมตอบคำถาม", 20, 0, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("โลโก้ของ KidBright คือสัตว์อะไร", 0, 70, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ก) ไก่", 50, 100, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ข) ลิง", 50, 130, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ค) หมู", 50, 160, 1);
}
void loop() {
  KBX.update();
  if (digitalRead(33) == 0) {
    KBX.Lcd.spi_init();
    KBX.Lcd.fillScreen(0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("คำตอบของคุณผิด", 10, 100, 1);
  } else if (digitalRead(34) == 0) {
    KBX.Lcd.spi_init();
    KBX.Lcd.fillScreen(0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("ถูกต้องนะครับ", 10, 100, 1);
  } else if (digitalRead(35) == 0) {
    KBX.Lcd.spi_init();
    KBX.Lcd.fillScreen(0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("ยังไม่ถูก ลองใหม่นะ", 10, 100, 1);
  }
}
