module.exports = {
    override: true,
    name: "Time",
    index: 50,
    color: "230",
    icon: "/static/icons/icons8_Story_Time_96px.png",
    blocks: [
        {
            xml: `<sep gap="32"></sep><label text="Delay" web-class="headline"></label>`
        },
        {
            xml:
                `<block type="time_delay">
                          <value name="delay">
                              <shadow type="math_number">
                                  <field name="NUM">1000</field>
                              </shadow>
                          </value>
                      </block>`
        },
        {
            xml:
                `<block type="time_delay_microsec">
                          <value name="delay">
                              <shadow type="math_number">
                                  <field name="NUM">1000</field>
                              </shadow>
                          </value>
                      </block>`
        },
        "time_millis",
        "time_micros",
        {
            xml: `<sep gap="32"></sep><label text="Internet Time" web-class="headline"></label>`
        },
        "time_sync",
        "time_get_year",
        "time_get_month",
        "time_get_day",
        "time_get_day_of_week",
        "time_get_hour",
        "time_get_minute",
        "time_get_second",
        {
            xml: `<sep gap="32"></sep><label text="Local RTC Time" web-class="headline"></label>`
        },
        {
            xml: `<sep gap="16"></sep><label text="Not supported yet" web-class="body-1"></label>`
        }
    ]
};
