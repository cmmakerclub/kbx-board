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
#include <KBSound.h>
#include <tts.h>

KB_board board = KB_board();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_music music = KB_music();
KBX_IO KBXio = KBX_IO();
KBSound kbsound;

char *wordsString[] = {
  "chiangmai",   "makerasia",   "kidbright",   "kbx",      "kbxio",    "maker",    "club",    "hello",
  "that",  "it",   "he",    "was",    "for",   "on",    "are",   "as",
  "with",  "his",  "they",  "I",      "at",    "be",    "this",  "have",
  "from",  "or",   "one",   "had",    "by",    "word",  "but",   "not",
  "what",  "all",  "were",  "we",     "when",  "your",  "can",   "said",
  "there", "use",  "an",    "each",   "which", "she",   "do",    "how",
  "their", "if",   "will",  "up",     "other", "about", "out",   "many",
  "then",  "them", "these", "so",     "some",  "her",   "would", "make",
  "like",  "him",  "into",  "time",   "has",   "look",  "two",   "more",
  "write", "go",   "see",   "number", "no",    "way",   "could", "people",
  "my",    "than", "first", "water",  "been",  "call",  "who",   "oil",
  "its",   "now",  "find",  "long",   "down",  "day",   "did",   "get",
  "come",  "made", "may",   "part"
};

typedef int Number;
typedef int Boolean;
using namespace std;

String input;
String textString;
int randomWord = 0;

uint32_t pevTime = 0;
uint32_t curTime = 0;
int16_t score = 0;

void setup() {
  Serial.begin(115200);
  board.begin();
  ldr.begin();
  
  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  kbsound.begin(0);
  kbsound.setVolume(10);
  
  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("Typing Game !!!")), 10, 10, 1);

  KBX.Lcd.spi_init();
  KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
  KBX.Lcd.setTextColor(0xffff, 0x0);
  KBX.Lcd.drawString(String(String("Your Type is : ") + String(input)), 10, 150, 1);

  randomWord = random(0, 100);

}
void loop() {
  KBX.update();
  KBXio.usb_loop();

  curTime = millis();
  if (curTime - pevTime >= 500) {
    pevTime = curTime;

    KBX.lcd.fillRect(0, 60, 320, 30, 0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawString(String(String("Your Score is ") + String(score)), 10, 60, 1);

    textString = wordsString[randomWord];
    textString.toUpperCase();

    KBX.lcd.fillRect(120, 120, 200, 30, 0x0);
    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawString(String(String("Word is : ")), 10, 120, 1);
    KBX.Lcd.setTextColor(0xf800, 0x0);
    KBX.Lcd.drawString(String(String(textString)), 120, 120, 1);

    Serial.print("Word is ");
    Serial.println(wordsString[randomWord]);
  }


  if(KBXio.keyboard_1_char() != "=") {
    delay(100);

    if(KBXio.keyboard_1_char() != "$") {
      if(KBXio.keyboard_1_char() == "~") {
        if(input.length() > 0) {
          int lastIndex = input.length() - 1;
          input.remove(lastIndex);
        }

        KBX.Lcd.spi_init();
        KBX.lcd.fillRect(160, 150, 230, 30, 0x0);
        KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
        KBX.Lcd.setTextColor(0xffff, 0x0);
        KBX.Lcd.drawString(String(String("Your Type is : ") + String(input)), 10, 150, 1);
      } else {
        input += KBXio.keyboard_1_char(); 
        input.toUpperCase();
      }
    }
    

    KBX.Lcd.spi_init();
    KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
    KBX.Lcd.setTextColor(0xffff, 0x0);
    KBX.Lcd.drawString(String(String("Your Type is : ") + String(input)), 10, 150, 1);

    Serial.print("You typed : ");
    Serial.print(input);

  }

  if(KBXio.keyboard_1_char() == "$") {
    input.toUpperCase();

    textString = wordsString[randomWord];
    textString.toUpperCase();

    if (input.equals(textString)) {
      KBX.matrix.clear();
      KBX.matrix.setRotation(0);
      KBX.matrix.drawBitmap(0, 0, (uint8_t *)"\x0\x0\x0\x80\x40\x20\x10\x8\x4\x2\x1\x2\x4\x0\x0\x0", 8, 16, LED_ON);
      KBX.matrix.writeDisplay();
      KBX.matrix.setRotation(1);
      
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
      KBX.Lcd.setTextColor(0xffff, 0x0);
      KBX.Lcd.drawString(String(String("  Correct !!!")), 10, 90, 1);

      kbsound.speak((std::vector<const uint8_t *>{spYES}));
      
      score += 1;

    } else {
      KBX.matrix.clear();
      KBX.matrix.setRotation(0);
      KBX.matrix.drawBitmap(0, 0, (uint8_t *)"\x0\x0\x0\x0\x81\x42\x24\x18\x18\x24\x42\x81\x0\x0\x0\x0", 8, 16, LED_ON);
      KBX.matrix.writeDisplay();
      KBX.matrix.setRotation(1);
  
      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
      KBX.Lcd.setTextColor(0xffff, 0x0);
      KBX.Lcd.drawString(String(String("  Incorrect !!!")), 10, 90, 1);

      kbsound.speak((std::vector<const uint8_t *>{spNO}));
      
      score -= 1;
    }

    randomWord = random(0, 100);
    input = "";
    delay(500);
    KBX.lcd.fillRect(10, 90, 200, 30, 0x0);
    KBX.lcd.fillRect(160, 150, 230, 30, 0x0);
    KBX.matrix.clear();
    KBX.matrix.setCursor(0, 0);
    KBX.matrix.print("     ");
    KBX.matrix.writeDisplay();
  }

    if(score == 5) {
      score = 0;
      KBX.matrix.clear();
      KBX.matrix.setCursor(0, 0);
      KBX.matrix.print("     ");
      KBX.matrix.writeDisplay();

      
      KBX.Lcd.spi_init();
      KBX.Lcd.fillScreen(0x0);
      KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
      KBX.Lcd.setTextColor(0xffff, 0x0);
      KBX.Lcd.drawString(String(String("YOU WIN !!!")), 70, 90, 1);

      music.song((std::vector<int>{659,659,659,-1,659,659,659,-1,659,784,523,587,659,-1,698,698,-1,698,698,-1,698,659,659,659,659,-1,659,587,587,659,587,784}),250);
      // music.song((std::vector<int>{262,523,220,440,233,466,-1,-1,175,349,147,294,156,311,-1,-1,175,349,147,294,156,311,-1,-1,175,349,147,294,156,311,-1,-1,311,277,294,277,311,311,208,196,277,262,370,349,165,466,440,415,311,247,233,220,208}),250);
      
      KBX.Lcd.spi_init();
      KBX.Lcd.fillScreen(0x0);
      KBX.Lcd.setUTF8Font(CF_KN_REG_18_EN, CF_KN_REG_18_TH, NULL);
      KBX.Lcd.setTextColor(0xffff, 0x0);
      KBX.Lcd.drawString(String(String("Typing Game !!!")), 10, 10, 1);

      KBX.Lcd.spi_init();
      KBX.Lcd.setUTF8Font(CF_KN_REG_12_EN, CF_KN_REG_12_TH, NULL);
      KBX.Lcd.setTextColor(0xffff, 0x0);
      KBX.Lcd.drawString(String(String("Your Type is : ") + String(input)), 10, 150, 1);
  }
}
