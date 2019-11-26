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
}
void loop() {
  KBX.update();
  KBX.matrix.clear();
  KBX.matrix.setRotation(0);
  KBX.matrix.drawBitmap(
      0, 0, (uint8_t *)"\x0\x0\x0\x0\x0\x0\x0\x0\x4\x26\x65\xe5\xfd\x5\x6\x4",
      8, 16, LED_ON);
  KBX.matrix.writeDisplay();
  KBX.matrix.setRotation(1);
  delay(250);
  KBX.matrix.clear();
  KBX.matrix.setRotation(0);
  KBX.matrix.drawBitmap(
      0, 0, (uint8_t *)"\x0\x0\x0\x0\x0\x0\x4\x26\x65\xe5\xfd\x5\x6\x4\x0\x0",
      8, 16, LED_ON);
  KBX.matrix.writeDisplay();
  KBX.matrix.setRotation(1);
  delay(250);
  KBX.matrix.clear();
  KBX.matrix.setRotation(0);
  KBX.matrix.drawBitmap(
      0, 0, (uint8_t *)"\x0\x0\x0\x0\x4\x26\x65\xe5\xfd\x5\x6\x4\x0\x0\x0\x0",
      8, 16, LED_ON);
  KBX.matrix.writeDisplay();
  KBX.matrix.setRotation(1);
  delay(250);
  KBX.matrix.clear();
  KBX.matrix.setRotation(0);
  KBX.matrix.drawBitmap(
      0, 0, (uint8_t *)"\x0\x0\x4\x26\x65\xe5\xfd\x5\x6\x4\x0\x0\x0\x0\x0\x0",
      8, 16, LED_ON);
  KBX.matrix.writeDisplay();
  KBX.matrix.setRotation(1);
  delay(250);
  KBX.matrix.clear();
  KBX.matrix.setRotation(0);
  KBX.matrix.drawBitmap(
      0, 0, (uint8_t *)"\x4\x26\x65\xe5\xfd\x5\x6\x4\x0\x0\x0\x0\x0\x0\x0\x0",
      8, 16, LED_ON);
  KBX.matrix.writeDisplay();
  KBX.matrix.setRotation(1);
  delay(250);
}
