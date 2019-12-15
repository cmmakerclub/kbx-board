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

#include "utility/kbSD.h"

typedef int Number;
typedef int Boolean;
using namespace std;

int file1;

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("ทดสอบ SD Card", 0, 0, 1);

  if (!SD.begin(TFCARD_CS_PIN, SPI, 4000000, "/sd")) {
    Serial.println("Card Mount Failed");
  }
  Serial.println("Card Mount Done");

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String(((String("ชนิด : ") + String((SD.readCardtype())))), 0,
                         40, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String(
      ((String("ขนาด : ") + String((SD.readCardSize())) + String(" MB"))), 0,
      70, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String(
      ((String("พื้นที่ทั้งหมด : ") + String((SD.readTotalBytes())) + String(" MB"))),
      0, 100, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String(
      ((String("พื้นที่ที่ใช้ : ") + String((SD.readUsedBytes())) + String(" MB"))), 0,
      130, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawUTF8String("กดปุ่ม 1 เพื่อบันทึก", 0, 160, 1);
}
void loop() {
  KBX.update();
  if ((!(int)digitalRead(KB_BUTTON1))) {
    SD.writeFile(SD, "/file1.txt", String(lm73.readTemp()).c_str());
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawUTF8String("บันทึกลง file.txt เรียบร้อย", 0, 190, 1);
  }
}
