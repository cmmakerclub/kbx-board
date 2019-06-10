#include "Buzzer.h"

BUZZER::BUZZER(void) {
    _volume = 8;
}

void BUZZER::begin() {
    ledcSetup(TONE_PIN_CHANNEL, 0, 13);
    ledcAttachPin(BUZZER_PIN, TONE_PIN_CHANNEL);
    // digitalWrite(BUZZER_PIN, 0);
    setBeep(1000, 100);
}

void BUZZER::end() {
    ledcDetachPin(BUZZER_PIN);
}

void BUZZER::tone(uint16_t frequency) {
    ledcWriteTone(TONE_PIN_CHANNEL, frequency);
}

void BUZZER::tone(uint16_t frequency, uint32_t duration) {
    tone(frequency);
    _count = millis() + duration;
    buzzer_on = 1;
}

void BUZZER::beep() {
    tone(_beep_freq, _beep_duration);
}

void BUZZER::setBeep(uint16_t frequency, uint16_t duration) {
    _beep_freq = frequency;
    _beep_duration = duration;
}

void BUZZER::setVolume(uint8_t volume) {
    _volume = 11 - volume;
}

void BUZZER::mute() {
    ledcWriteTone(TONE_PIN_CHANNEL, 0);
    digitalWrite(BUZZER_PIN, 0);
}

void BUZZER::update() {
    if(buzzer_on) {
        if(millis() > _count) {
            buzzer_on = 0;
            mute();
        }
    }
}

void BUZZER::write(uint8_t value) {
    dacWrite(BUZZER_PIN, value);
}

void BUZZER::playMusic(const uint8_t* music_data, uint16_t sample_rate) {
    uint32_t length = strlen((char*)music_data);
    uint16_t delay_interval = ((uint32_t)1000000/sample_rate);
    if(_volume != 11) {
        for(int i=0; i<length; i++) {
            dacWrite(BUZZER_PIN, music_data[i]/_volume);
            delayMicroseconds(delay_interval);
        }
    
        for(int t=music_data[length-1]/_volume; t>=0; t--) {
            dacWrite(BUZZER_PIN, t);
            delay(2);
        }
    }
    // ledcSetup(TONE_PIN_CHANNEL, 0, 13);
    ledcAttachPin(BUZZER_PIN, TONE_PIN_CHANNEL);
}
