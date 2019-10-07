module.exports = {
  name: "Music",
  index: 30,
  color: "230",
  icon: "/static/icons/SVG/c6.svg",
  blocks: [
    {
      xml: `<sep gap="32"></sep><label text="Buzzer" web-class="headline"></label>`
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
      xml: `<sep gap="32"></sep><label text="Example song" web-class="headline"></label>`
    },
    'music_song_mario_underworld',
    'music_song_jingle_bell',
    'music_song_cannon_rock',
    {
      xml: `<sep gap="32"></sep><label text="Text to Speak" web-class="headline"></label>`
    },
    "speaker_tts_word",
    "speaker_tts_speak",
    "speaker_tts_speak_number",
    {
      xml: `<sep gap="32"></sep><label text="Play note" web-class="headline"></label>`
    },
    "speaker_music_note",
    "speaker_play_note",
    "speaker_set_volume",
    "speaker_get_volume"
  ]
};
