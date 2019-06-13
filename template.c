#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "kbxui.h"
#include "FontsTH.h"
#include "KB_LDR.h"
#include "KB_LM73.h"

KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();

${EXTINC}

typedef int Number;
typedef int Boolean;

${VARIABLE}

${FUNCTION}

void setup()
{
  lm73.begin();
  
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
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
  KBX.update();
  while(1); {delay(1);}
}
