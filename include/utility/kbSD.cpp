// Copyright 2015-2016 Espressif Systems (Shanghai) PTE LTD
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include "vfs_api.h"
#include "kbsd_diskio.h"
#include "ff.h"
#include "FS.h"
#include "kbSD.h"

#include "driver/spi_common.h"
#include "driver/gpio.h"

#define SPI_MISO_GPIO GPIO_NUM_32
#define SPI_MOSI_GPIO GPIO_NUM_21
#define SPI_CLK_GPIO GPIO_NUM_22
#define FUNC_GPIO PIN_FUNC_GPIO
#define SPI_SETTING SPISettings(2000000, MSBFIRST, SPI_MODE0)

using namespace fs;

SDFS::SDFS(FSImplPtr impl) : FS(impl), _pdrv(0xFF) {}

void SDFS::sw2spi()
{
    spi_bus_config_t bus_config;
    bus_config.miso_io_num = SPI_MISO_GPIO;
    bus_config.mosi_io_num = SPI_MOSI_GPIO;
    bus_config.sclk_io_num = SPI_CLK_GPIO;

    // MUST init sclk before mosi  //
    /*  SPI SCLK PIN  */
    while (ESP_OK != gpio_set_direction(SPI_CLK_GPIO, GPIO_MODE_INPUT_OUTPUT))
        ;
    while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY))
        ;
    gpio_matrix_out(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_out, false, false);
    gpio_matrix_in(bus_config.sclk_io_num, spi_periph_signal[VSPI_HOST].spiclk_in, false);
    PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.sclk_io_num], FUNC_GPIO);

    /*  SPI MOSI PIN  */
    while (ESP_OK != gpio_set_direction(SPI_MOSI_GPIO, GPIO_MODE_INPUT_OUTPUT))
        ;
    while (ESP_OK != gpio_set_pull_mode(GPIO_NUM_21, GPIO_PULLUP_ONLY))
        ;
    gpio_matrix_out(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_out, false, false);
    gpio_matrix_in(bus_config.mosi_io_num, spi_periph_signal[VSPI_HOST].spid_in, false);
    PIN_FUNC_SELECT(GPIO_PIN_MUX_REG[bus_config.mosi_io_num], FUNC_GPIO);
}


bool SDFS::begin(uint8_t ssPin, SPIClass &spi, uint32_t frequency, const char *mountpoint)
{
    if (_pdrv != 0xFF)
    {
        return true;
    }

    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.begin();
    SPI.setFrequency(frequency);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    //begin(int8_t sck=-1, int8_t miso=-1, int8_t mosi=-1, int8_t ss=-1);
    // SPI.begin(TFCARD_CLK, TFCARD_MISO, TFCARD_MOSI, TFCARD_CS);
    // SPI.begin();

    _pdrv = sdcard_init(ssPin, &spi, frequency);
    if (_pdrv == 0xFF)
    {
        return false;
    }

    if (!sdcard_mount(_pdrv, mountpoint))
    {
        sdcard_unmount(_pdrv);
        sdcard_uninit(_pdrv);
        _pdrv = 0xFF;
        return false;
    }

    _impl->mountpoint(mountpoint);
    return true;
}

String SDFS::readCardtype() {
    String _card;
    uint8_t cardType = SD.cardType();
    if (cardType == CARD_MMC) {
        _card = "MMC";
    } else if (cardType == CARD_SD) {
         _card = "SDSC";
    } else if (cardType == CARD_SDHC) {
         _card = "SDHC";
    } else {
        _card = "UNKNOWN";
    }

    return _card.c_str();
}

String SDFS::readCardSize() {
    char data[20];
    sprintf(data, "%llu", SD.cardSize() / (1024 * 1024));
    return data;
}

String SDFS::readTotalBytes() {
    char data[20];
    sprintf(data, "%llu", SD.totalBytes() / (1024 * 1024));
    return data;
}

String SDFS::readUsedBytes() {
    char data[20];
    sprintf(data, "%llu", SD.usedBytes() / (1024 * 1024));
    return data;
}

void SDFS::listDir(fs::FS &fs, const char *dirname, uint8_t levels)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Listing directory: %s\n", dirname);

    File root = fs.open(dirname);
    if (!root)
    {
        Serial.println("Failed to open directory");
        // return;
    }
    if (!root.isDirectory())
    {
        Serial.println("Not a directory");
        // return;
    }

    File file = root.openNextFile();
    while (file)
    {
        if (file.isDirectory())
        {
            Serial.print("  DIR : ");
            Serial.println(file.name());
            if (levels)
            {
                listDir(fs, file.name(), levels - 1);
            }
        }
        else
        {
            Serial.print("  FILE: ");
            Serial.print(file.name());
            Serial.print("  SIZE: ");
            Serial.println(file.size());
        }
        file = root.openNextFile();
    }
}

void SDFS::createDir(fs::FS &fs, const char *path)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Creating Dir: %s\n", path);
    if (fs.mkdir(path))
    {
        Serial.println("Dir created");
    }
    else
    {
        Serial.println("mkdir failed");
    }
}

void SDFS::removeDir(fs::FS &fs, const char *path)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Removing Dir: %s\n", path);
    if (fs.rmdir(path))
    {
        Serial.println("Dir removed");
    }
    else
    {
        Serial.println("rmdir failed");
    }
}

String SDFS::readText(const char *path) {
    readFile(SD, path);
    return _msg.c_str();
}

void SDFS::readFile(fs::FS &fs, const char *path)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Reading file: %s\n", path);

    File file = fs.open(path);
    if (!file)
    {
        Serial.println("Failed to open file for reading");
    }

    // Serial.print("Read from file: ");
    while (file.available())
    {
        Serial.write(file.read());
        _msg += String(file.read()).c_str();
    }
    file.close();
}

void SDFS::writeFile(fs::FS &fs, const char *path, const char *message)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Writing file: %s\n", path);

    File file = fs.open(path, FILE_WRITE);
    if (!file)
    {
        Serial.println("Failed to open file for writing");
        // return;
    }
    if (file.print(message))
    {
        Serial.println("File written");
    }
    else
    {
        Serial.println("Write failed");
    }
    file.close();
}

void SDFS::writeCSV(fs::FS &fs, const char *path, const char *message1, const char *message2, const char *message3, const char *message4)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Writing file: %s\n", path);

    File file = fs.open(path, FILE_APPEND);
    if (!file)
    {
        Serial.println("Failed to open file for writing");
    } else {
        file.print(String(message1));
        file.print(",");
        file.print(String(message2));
        file.print(",");
        file.print(String(message3));
        file.print(",");
        file.println(String(message4));
        Serial.println("File written .csv");
    }

    file.close();
}

void SDFS::appendFile(fs::FS &fs, const char *path, const char *message, bool _newLine)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Appending to file: %s\n", path);

    File file = fs.open(path, FILE_APPEND);
    if (!file)
    {
        Serial.println("Failed to open file for appending");
        // return;
    }

    if (_newLine == 1)
    {
        file.println();
        file.print(message);
        Serial.println("Append newline");

    }
    else if (_newLine == 0)
    {
        file.print(message);
        Serial.println("Append inline");
    }

    file.close();
}

void SDFS::renameFile(fs::FS &fs, const char *path1, const char *path2)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Renaming file %s to %s\n", path1, path2);
    if (fs.rename(path1, path2))
    {
        Serial.println("File renamed");
    }
    else
    {
        Serial.println("Rename failed");
    }
}

void SDFS::deleteFile(fs::FS &fs, const char *path)
{
    digitalWrite(23, HIGH); // SD_CS_PIN
    SPI.begin(22, 32, 21, 23);
    SPI.setFrequency(4000000);
    digitalWrite(23, LOW); // SD_CS_PIN
    sw2spi();

    Serial.printf("Deleting file: %s\n", path);
    if (fs.remove(path))
    {
        Serial.println("File deleted");
    }
    else
    {
        Serial.println("Delete failed");
    }
}

void SDFS::end()
{
    if (_pdrv != 0xFF)
    {
        _impl->mountpoint(NULL);
        sdcard_unmount(_pdrv);

        sdcard_uninit(_pdrv);
        _pdrv = 0xFF;
    }
}

sdcard_type_t SDFS::cardType()
{
    if (_pdrv == 0xFF)
    {
        return CARD_NONE;
    }
    return sdcard_type(_pdrv);
}

uint64_t SDFS::cardSize()
{
    if (_pdrv == 0xFF)
    {
        return 0;
    }
    size_t sectors = sdcard_num_sectors(_pdrv);
    size_t sectorSize = sdcard_sector_size(_pdrv);
    return (uint64_t)sectors * sectorSize;
}

uint64_t SDFS::totalBytes()
{
    FATFS *fsinfo;
    DWORD fre_clust;
    if (f_getfree("0:", &fre_clust, &fsinfo) != 0)
        return 0;
    uint64_t size = ((uint64_t)(fsinfo->csize)) * (fsinfo->n_fatent - 2)
#if _MAX_SS != 512
                    * (fsinfo->ssize);
#else
                    * 512;
#endif
    return size;
}

uint64_t SDFS::usedBytes()
{
    FATFS *fsinfo;
    DWORD fre_clust;
    if (f_getfree("0:", &fre_clust, &fsinfo) != 0)
        return 0;
    uint64_t size = ((uint64_t)(fsinfo->csize)) * ((fsinfo->n_fatent - 2) - (fsinfo->free_clst))
#if _MAX_SS != 512
                    * (fsinfo->ssize);
#else
                    * 512;
#endif
    return size;
}

SDFS SD = SDFS(FSImplPtr(new VFSImpl()));
