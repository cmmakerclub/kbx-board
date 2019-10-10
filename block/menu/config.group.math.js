module.exports = {
    override: true,
    name: 'Math',
    index: 40,
    color: '230',
    icon: '/static/icons/calculator.png',
    blocks: [
        'math_number',
        {
            xml:
                `<block type="math_arithmetic">
                    <value name="A">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                    <value name="B">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>`
        },
        {
            xml:
                `<block type="math_variables_set">
                    <value name="VALUE">
                        <shadow type="math_number">
                            <field name="NUM">1</field>
                        </shadow>
                    </value>
                </block>`
        },
        'math_variables_get',
        {
            xml:
                `<block type="math_pow">
                    <value name="NUM1">
                        <shadow type="math_number">
                            <field name="NUM">2</field>
                        </shadow>
                    </value>
                    <value name="NUM2">
                        <shadow type="math_number">
                            <field name="NUM">3</field>
                        </shadow>
                    </value>
                </block>`
        },
        /*'math_sqrt',*/
        {
            xml:
                `<block type="math_single">
                    <value name="NUM">
                        <shadow type="math_number">
                            <field name="NUM">9</field>
                        </shadow>
                    </value>
                </block>`
        },
        {
            xml:
                `<block type="math_trig">
                    <value name="NUM">
                        <shadow type="math_number">
                            <field name="NUM">90</field>
                        </shadow>
                    </value>
                </block>`
        },
        {
            xml:
                `<block type="math_round">
                    <value name="NUM">
                        <shadow type="math_number">
                            <field name="NUM">1.2</field>
                        </shadow>
                    </value>
                </block>`
        },
        /*'math_min',
        'math_max',
        'math_map',*/
        'math_random_int',
        {
            xml:
                `<block type="math_number_property">
                    <value name="NUMBER_TO_CHECK">
                        <shadow type="math_number">
                            <field name="NUM">5</field>
                        </shadow>
                    </value>
                </block>`
        },
        {
            xml:
                `<block type="math_map_value">
                    <value name="VALUE">
                        <block type="io_analog_read">
                            <value name="pin">
                                <shadow type="math_number">
                                    <field name="NUM">36</field>
                                </shadow>
                            </value>
                        </block>
                    </value>
                    <value name="fromLOW">
                        <shadow type="math_number">
                        <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="fromHIGH">
                        <shadow type="math_number">
                        <field name="NUM">1023</field>
                        </shadow>
                    </value>
                    <value name="toLOW">
                        <shadow type="math_number">
                        <field name="NUM">0</field>
                        </shadow>
                    </value>
                    <value name="toHIGH">
                        <shadow type="math_number">
                        <field name="NUM">100</field>
                        </shadow>
                    </value>
                </block>`
        }
    ]
};