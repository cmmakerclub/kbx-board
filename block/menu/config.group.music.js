module.exports = {
  name: "Music",
  index: 30,
  color: "230",
  icon: "/static/icons/SVG/c6.svg",
  blocks: [
    {
      xml: `<sep gap="32"></sep><label text="Buzzer" web-class="headline"></label>`
    },
    {
      xml: `<sep gap="32"></sep><label text="Play Buzzer note" web-class="headline"></label>`
    },
    "music_begin",
    "music_note",
    "music_notes",
    {
      xml:
        `<block type="music_play_notes">
                        <value name="note">                    
                            <block type="music_notes">
                                <field name="notes">C4,B4,E4</field>
                            </block>
                        </value>
                    </block>`
    },
    {
      xml: `<sep gap="32"></sep><label text="Example for Buzzer note" web-class="headline"></label>`
    },
    'music_song_mario_underworld',
    'music_song_jingle_bell',
    'music_song_cannon_rock',
    {
      xml: `<sep gap="32"></sep><label text="Speaker" web-class="headline"></label>`
    },
    {
      xml: `<sep gap="32"></sep><label text="Text to Speak" web-class="headline"></label>`
    },
    {
      xml:
      `<block type="speaker_set_volume">
          <value name="VOLUME">                    
            <shadow type="math_number">
              <field name="NUM">5</field>
            </shadow>
          </value>
        </block>`
    },
    "speaker_get_volume",
    "speaker_tts_word",
    {
      xml:
        `<block type="speaker_tts_speak">
          <value name="words">                    
            <block type="speaker_tts_word">
            </block>
          </value>
        </block>`
    },
    {
      xml:
        `<block type="speaker_tts_speak_number">
          <value name="number">                    
            <block type="math_number">
              <field name="NUM">326</field>
            </block>
          </value>
        </block>`
    },
    {
      xml: `<sep gap="32"></sep><label text="Play speaker note" web-class="headline"></label>`
    },
    "speaker_music_note",
    {
      xml:
        `<block type="speaker_play_note">
          <value name="note">                    
            <block type="speaker_music_note">
            </block>
          </value>
        </block>`
    }
  ]
};
