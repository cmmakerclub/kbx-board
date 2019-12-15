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

int i;

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  ledcSetup(0, 5000, 8);
  ledcAttachPin(17, 0);
  ledcAttachPin(2, 0);
  ledcAttachPin(15, 0);
  ledcAttachPin(12, 0);
  KBX.matrix.clear();
  KBX.matrix.setCursor(0, 0);
  KBX.matrix.print("     ");
  KBX.matrix.writeDisplay();

  KBX.Lcd.spi_init();
  KBX.Lcd.fillScreen(0x0);

  pinMode(17, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(15, OUTPUT);
  pinMode(12, OUTPUT);
}
void loop() {
  KBX.update();
  for (i = 0; i <= 255; i += 8) {
    ledcWrite(0, i);
    ledcWrite(0, i);
    ledcWrite(0, i);
    ledcWrite(0, i);
    delay(100);
  }
  for (i = 255; i >= 0; i -= 8) {
    ledcWrite(0, i);
    ledcWrite(0, i);
    ledcWrite(0, i);
    ledcWrite(0, i);
    delay(100);
  }
}
