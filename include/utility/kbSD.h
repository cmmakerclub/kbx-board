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
#ifndef _KBSD_H_
#define _KBSD_H_

#include "FS.h"
#include "SPI.h"
#include "kbsd_defines.h"

//static const uint8_t MOSI  = 21;
//static const uint8_t MISO  = 32;
//static const uint8_t SCK   = 22;
#define TFCARD_MISO 32
#define TFCARD_MOSI 21
#define TFCARD_CLK  22
#define TFCARD_CS   23


namespace fs
{

class SDFS : public FS
{
protected:
    uint8_t _pdrv;
    void sw2spi();

public:
    SDFS(FSImplPtr impl);
    bool begin(uint8_t ssPin=13, SPIClass &spi=SPI, uint32_t frequency=4000000, const char * mountpoint="/sd");
    void end();

    void listDir(fs::FS &fs, const char * dirname, uint8_t levels);
    void createDir(fs::FS &fs, const char * path);
    void removeDir(fs::FS &fs, const char * path);
    String readText(const char *path);
    void readFile(fs::FS &fs, const char * path);
    void writeFile(fs::FS &fs, const char * path, const char * message);
    void writeCSV(fs::FS &fs, const char *path, const char *message1, const char *message2, const char *message3, const char *message4);
    void renameFile(fs::FS &fs, const char * path1, const char * path2);
    void appendFile(fs::FS &fs, const char * path, const char * message, bool _newLine);
    void deleteFile(fs::FS &fs, const char * path);
    String readCardtype();
    String readCardSize();
    String readTotalBytes();
    String readUsedBytes();

    sdcard_type_t cardType();
    uint64_t cardSize();
    uint64_t totalBytes();
    uint64_t usedBytes();
    String _msg;
};

}

extern fs::SDFS SD;

using namespace fs;
typedef fs::File        SDFile;
typedef fs::SDFS        SDFileSystemClass;
#define SDFileSystem    SD

#endif /* _KBSD_H_ */
