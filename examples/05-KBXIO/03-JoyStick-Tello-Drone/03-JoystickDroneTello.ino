/*
	*Caveats: Download DJI Tello Plugin before Use 
*/

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

/*
	*Caveats: Download DJI Tello Plugin before Use 
*/
#include <TELLO.h>

typedef int Number;
typedef int Boolean;
using namespace std;

TELLO tello;

void setup() {
  board.begin();
  ldr.begin();

  KBX.begin();
  KBX.matrix.clear();
  KBX.matrix.setRotation(1);
  KBX.matrix.setTextColor(LED_ON);
  KBX.matrix.setTextWrap(false);

  tello.begin("TELLO-AA0E50", "");
  Serial.begin(115200);
  Serial.println(String("Tello Done"));
}

int stateTello = false;

void loop() {
/*
	*Caveats: Download DJI Tello Plugin before Use 
*/
  KBX.update();
  KBXio.usb_loop();

  if ((KBXio.joystick_button_start()) == 1) {
    tello.takeoff();
    delay(5000);
    stateTello = 1;
  } else if ((KBXio.joystick_button_select()) == 1) {
    tello.land();
    delay(5000);
    stateTello = 0;
  }

  if (stateTello == 1) {
    int _a = map(KBXio.joystick_right_xaxis(), 0, 255, -100, 100);
    int _b = map(KBXio.joystick_right_yaxis(), 0, 255, 100, -100);
    int _c = map(KBXio.joystick_left_yaxis(), 0, 255, 100, -100);
    int _d = map(KBXio.joystick_left_xaxis(), 0, 255, -100, 100);

    String data = "rc " + String(_a) + " " + String(_b) + " " + String(_c) + " " + String(_d);
    tello.sendCommand(data.c_str());
    delay(100);

    Serial.print(_a);
    Serial.print(" ");
    Serial.print(_b);
    Serial.print(" ");
    Serial.print(_c);
    Serial.print(" ");
    Serial.print(_d);
    Serial.println();
  }
}
