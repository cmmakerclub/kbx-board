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

  music.begin(0);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบบัซเซอร์", 10, 10, 1);

  music.tone(1047, 250);
  music.tone(1175, 250);
  music.tone(1319, 250);
  music.tone(1397, 250);
  music.tone(1568, 250);
  music.tone(1760, 250);
  music.tone(1976, 250);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_09_EN, CF_KN_REG_09_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กด SW1 เพื่อเล่นเพลง Mario", 10, 60, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_09_EN, CF_KN_REG_09_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กด SW2 เพื่อเล่นเพลง Jingle Bells", 10, 90, 1);
}
void loop() {
  KBX.update();
  if ((!(int)digitalRead(KB_BUTTON1))) {
    music.song(
        (std::vector<int>{262, 523, 220, 440, 233, 466, -1,  -1,  175, 349, 147,
                          294, 156, 311, -1,  -1,  175, 349, 147, 294, 156, 311,
                          -1,  -1,  175, 349, 147, 294, 156, 311, -1,  -1,  311,
                          277, 294, 277, 311, 311, 208, 196, 277, 262, 370, 349,
                          165, 466, 440, 415, 311, 247, 233, 220, 208}),
        250);
  } else if ((!(int)digitalRead(KB_BUTTON2))) {
    music.song(
        (std::vector<int>{659, 659, 659, -1,  659, 659, 659, -1,  659, 784, 523,
                          587, 659, -1,  698, 698, -1,  698, 698, -1,  698, 659,
                          659, 659, 659, -1,  659, 587, 587, 659, 587, 784}),
        250);
  }
}
