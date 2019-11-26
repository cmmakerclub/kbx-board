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
  lm73.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  KBX.matrix.clear();
  KBX.matrix.setCursor(0, 0);
  KBX.matrix.print(String(String("HI!")));
  KBX.matrix.writeDisplay();

  KBX.Lcd.setRotation(0);
  KBX.Lcd.spi_init();
  KBX.Lcd.fillScreen(0x0);
  pinMode(16, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
  pinMode(33, INPUT_PULLUP);
  pinMode(34, INPUT_PULLUP);
  pinMode(35, INPUT_PULLUP);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบสวิตซ์กด", 10, 10, 1);
}
void loop() {
  KBX.update();
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(
      String(((String("SW1      : ") + String(digitalRead(16))))), 20, 60, 1);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(
      String(((String("SW2      : ") + String(digitalRead(14))))), 20, 90, 1);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(
      String(((String("Button 1 : ") + String(digitalRead(33))))), 20, 120, 1);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(
      String(((String("Button 2 : ") + String(digitalRead(34))))), 20, 150, 1);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(
      String(((String("Button 3 : ") + String(digitalRead(35))))), 20, 180, 1);
  delay(250);
  KBX.Lcd.fillRect(120, 55, 50, 150, 0x0);
}
