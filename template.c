#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "kbxui.h"
#include "FontsTH.h"

${EXTINC}



typedef int Number;
typedef int Boolean;

//using namespace std;

${VARIABLE}

${FUNCTION}

void setup()
{
  KBX.begin();
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
