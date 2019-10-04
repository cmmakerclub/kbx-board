#ifndef KB_MUSIC_h
#define KB_MUSIC_h

#include <Arduino.h>
#include "pins_arduino.h"
#include "vector"

class KB_music
{
 public:
  void begin(int _channel);
  void tone(unsigned int frequency, unsigned long duration = 0);
  void noTone();
  void song(std::vector<int> notes,int duration);

 protected:
  uint16_t channel;
  uint16_t bit;
  int TONE_CHANNEL = 0;

 private:
};

#endif /* KB_LDR_h */
