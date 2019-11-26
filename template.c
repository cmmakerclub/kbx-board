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

${EXTINC}

typedef int Number;
typedef int Boolean;
using namespace std;

${VARIABLE}
${FUNCTION}

void setup()
{
  board.begin();
  ldr.begin();
  
  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  KBX.update();
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
}
