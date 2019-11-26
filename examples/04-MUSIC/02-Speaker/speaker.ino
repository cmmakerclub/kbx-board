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

#include <KBSound.h>
#include <tts.h>

typedef int Number;
typedef int Boolean;
using namespace std;

KBSound kbsound;

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  kbsound.begin(0);
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบลำโพง", 10, 10, 1);

  kbsound.setVolume(10);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_09_EN, CF_KN_REG_09_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กด SW1 เล่นเสียงพูด", 10, 60, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_09_EN, CF_KN_REG_09_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กด SW2 เพื่อบอกอุณหภูมิ", 10, 90, 1);
}
void loop() {
  KBX.update();
  if ((!(int)digitalRead(KB_BUTTON1))) {
    KBX.matrix.clear();
    KBX.matrix.setCursor(0, 0);
    KBX.matrix.print(String(String("Hello")));
    KBX.matrix.writeDisplay();
    kbsound.speak((std::vector<const uint8_t *>{spHELLO}));
    KBX.matrix.clear();
    KBX.matrix.setCursor(0, 0);
    KBX.matrix.print("     ");
    KBX.matrix.writeDisplay();
  } else if ((!(int)digitalRead(KB_BUTTON2))) {
    KBX.matrix.clear();
    KBX.matrix.setCursor(0, 0);
    KBX.matrix.print(String(lm73.readTemp()));
    KBX.matrix.writeDisplay();
    kbsound.speak((std::vector<const uint8_t *>{spTEMPERATURE, spIS}));
    kbsound.speak(lm73.readTemp());
    KBX.matrix.clear();
    KBX.matrix.setCursor(0, 0);
    KBX.matrix.print("     ");
    KBX.matrix.writeDisplay();
  }
}
