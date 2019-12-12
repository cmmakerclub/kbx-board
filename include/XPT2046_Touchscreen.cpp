/* Touchscreen library for XPT2046 Touch Controller Chip
 * Copyright (c) 2015, Paul Stoffregen, paul@pjrc.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice, development funding notice, and this permission
 * notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "XPT2046_Touchscreen.h"
#include "driver/spi_common.h"
#include "driver/gpio.h"

#define SPI_MISO_GPIO GPIO_NUM_32
#define SPI_MOSI_GPIO GPIO_NUM_21
#define SPI_CLK_GPIO GPIO_NUM_22
// #define SPI_CS_GPIO GPIO_NUM_19
// #define SPI_DC_GPIO GPIO_NUM_18
#define FUNC_GPIO PIN_FUNC_GPIO

#define Z_THRESHOLD 400	// 400 10500
#define Z_THRESHOLD_INT 75 // 75
#define MSEC_THRESHOLD 3
#define SPI_SETTING SPISettings(2000000, MSBFIRST, SPI_MODE0)

static XPT2046_Touchscreen *isrPinptr;
void isrPin(void);

bool XPT2046_Touchscreen::begin()
{
	SPI.begin(22, 32, 21, 27);
	pinMode(csPin, OUTPUT);
	digitalWrite(csPin, HIGH);
	if (255 != tirqPin)
	{
		pinMode(tirqPin, INPUT);
		attachInterrupt(digitalPinToInterrupt(tirqPin), isrPin, FALLING);
		isrPinptr = this;
	}
	return true;
}

ISR_PREFIX
void isrPin(void)
{
	XPT2046_Touchscreen *o = isrPinptr;
	o->isrWake = true;
}


TS_Point XPT2046_Touchscreen::getPoint()
{
	return TS_Point(xraw, yraw, _tz);
}

bool XPT2046_Touchscreen::tirqTouched()
{
	return (isrWake);
}

bool XPT2046_Touchscreen::touched(uint16_t touch_threshold)
{
	update();
	_threshold = touch_threshold;
	if ((uint16_t)_tz >= _threshold)
	{
		return true;
	}
	else
	{
		return false;
	}
}

void XPT2046_Touchscreen::readData(uint16_t *x, uint16_t *y, uint8_t *z)
{
	update();
	*x = xraw;
	*y = yraw;
	*z = zraw;
}

bool XPT2046_Touchscreen::bufferEmpty()
{
	return ((millis() - msraw) < MSEC_THRESHOLD);
}

static int16_t besttwoavg(int16_t x, int16_t y, int16_t z)
{
	int16_t da, db, dc;
	int16_t reta = 0;
	if (x > y)
		da = x - y;
	else
		da = y - x;
	if (x > z)
		db = x - z;
	else
		db = z - x;
	if (z > y)
		dc = z - y;
	else
		dc = y - z;

	if (da <= db && da <= dc)
		reta = (x + y) >> 1;
	else if (db <= da && db <= dc)
		reta = (x + z) >> 1;
	else
		reta = (y + z) >> 1; //    else if ( dc <= da && dc <= db ) reta = (x + y) >> 1;

	return (reta);
}

// TODO: perhaps a future version should offer an option for more oversampling,
//       with the RANSAC algorithm https://en.wikipedia.org/wiki/RANSAC

void XPT2046_Touchscreen::sw2spi()
{
	spi_bus_config_t bus_config;
	bus_config.miso_io_num = SPI_MISO_GPIO;
	bus_config.mosi_io_num = SPI_MOSI_GPIO;
	bus_config.sclk_io_num = SPI_CLK_GPIO;

	// MUST init sclk before mosi  //
	/*  SPI SCLK PIN  */
	while (ESP_OK != gpio_set_direction(SPI_CLK_GPIO, GPIO_MODE_INPUT_OUTPUT));
	while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY));
	gpio_matrix_out(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_out, false, false);
	gpio_matrix_in(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_in, false);
	PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.sclk_io_num], FUNC_GPIO);

	/*  SPI MOSI PIN  */
	while (ESP_OK != gpio_set_direction(SPI_MOSI_GPIO, GPIO_MODE_INPUT_OUTPUT));
	while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY));
	gpio_matrix_out(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_out, false, false);
	gpio_matrix_in(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_in, false);
	PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.mosi_io_num], FUNC_GPIO);
}

uint16_t XPT2046_Touchscreen::getTouchZ()
{
	// digitalWrite(19, HIGH); // TFT_CS_PIN
	// digitalWrite(27, HIGH); // TP_CS_PIN
	// SPI.begin(22, 32, 21, 27);
	// SPI.setFrequency(2500000); // SPI_TOUCH_FREQUENCY
	// digitalWrite(27, LOW);	 // TP_CS_PIN

	// sw2spi();

	// // Z sample request
	// _tz = 0xFFF;
	// SPI.transfer(0xb1);
	// _tz += SPI.transfer16(0xc1) >> 3;
	// _tz -= SPI.transfer16(0x91) >> 3;

	// digitalWrite(27, HIGH); // TP_CS_PIN
	// SPI.begin(22, 32, 21, 19);
	// SPI.setFrequency(160000000);

	return (uint16_t)_tz;
	// return (uint16_t)zraw;
}

void XPT2046_Touchscreen::update()
{
	int16_t data[6];

	if (!isrWake)
		return;
	uint32_t now = millis();
	if (now - msraw < MSEC_THRESHOLD)
		return;

	digitalWrite(19, HIGH); // TFT_CS_PIN
	digitalWrite(27, HIGH); // TP_CS_PIN
	SPI.begin(22, 32, 21, 27);
	SPI.setFrequency(2500000); // SPI_TOUCH_FREQUENCY
	SPI.beginTransaction(SPI_SETTING);
	digitalWrite(27, LOW);	 // TP_CS_PIN

	sw2spi();

	// Z sample request
	_tz = 0xFFF;
	SPI.transfer(0xb1);
	_tz += SPI.transfer16(0xc1) >> 3;
	_tz -= SPI.transfer16(0x91) >> 3;


	// sw2spi();
	// SPI.beginTransaction(SPI_SETTING);
	// digitalWrite(27, LOW);

	// SPI.transfer(0xB1 /* Z1 */);
	// int16_t z1 = SPI.transfer16(0xC1 /* Z2 */) >> 3;
	// int z = z1 + 4095;
	// int16_t z2 = SPI.transfer16(0x91 /* X */) >> 3;
	// z -= z2;

	int16_t z = _tz;
	// int16_t z = 0xFFF;
	// SPI.transfer(0xb1);
	// z += SPI.transfer16(0xc1) >> 3;
	// z -= SPI.transfer16(0x91) >> 3;
	

	if (z >= _threshold)
	{
		SPI.transfer16(0x91 /* X */); // dummy X measure, 1st is always noisy
		data[0] = SPI.transfer16(0xD1 /* Y */) >> 3;
		data[1] = SPI.transfer16(0x91 /* X */) >> 3; // make 3 x-y measurements
		data[2] = SPI.transfer16(0xD1 /* Y */) >> 3;
		data[3] = SPI.transfer16(0x91 /* X */) >> 3;
	}
	else
	{
		data[0] = data[1] = data[2] = data[3] = 0; // Compiler warns these values may be used unset on early exit.
	}
	data[4] = SPI.transfer16(0xD0 /* Y */) >> 3; // Last Y touch power down
	data[5] = SPI.transfer16(0) >> 3;

	digitalWrite(27, HIGH);
	SPI.endTransaction();

	
	digitalWrite(27, HIGH); // TP_CS_PIN
	SPI.begin(22, 32, 21, 19);
	SPI.setFrequency(160000000);


	if (z < 0)
		z = 0;
	// if (z < _threshold)
	// { //	if ( !touched ) {
	// 	// Serial.println();
	// 	zraw = 0;
	// 	// if (z < Z_THRESHOLD_INT) { //	if ( !touched ) {
	// 	// 	if (255 != tirqPin) isrWake = false;
	// 	// }
	// 	return;
	// }
	// zraw = z;

	// Serial.printf("z=%d  ::  z1=%d,  z2=%d  ", z, Z_THRESHOLD, Z_THRESHOLD_INT);

	// Average pair with least distance between each measured x then y
	// Serial.printf("    z1=%d,z2=%d  ", z1, z2);
	// Serial.printf("p=%d,  %d,%d  %d,%d  %d,%d", zraw,
	// 	data[0], data[1], data[2], data[3], data[4], data[5]);
	int16_t x = besttwoavg(data[0], data[2], data[4]);
	int16_t y = besttwoavg(data[1], data[3], data[5]);

	//Serial.printf("    %d,%d", x, y);
	//Serial.println();
	if (z >= _threshold)
	{
		msraw = now; // good read completed, set wait
		switch (rotation)
		{
		case 0:
			xraw = 4095 - y;
			yraw = x;
			break;
		case 1:
			xraw = x;
			yraw = y;
			break;
		case 2:
			xraw = y;
			yraw = 4095 - x;
			break;
		default: // 3
			xraw = 4095 - x;
			yraw = 4095 - y;
		}
	}
}