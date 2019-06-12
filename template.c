#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "kbxui.h"
#include "FontsTH.h"

${EXTINC}

typedef int Number;
typedef int Boolean;

${VARIABLE}

${FUNCTION}

void setup()
{
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
