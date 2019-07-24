#include <stdbool.h>
#include <errno.h>
#include <string.h>
#include <time.h>

#include <applibs/log.h>
#include <applibs/gpio.h>

#define ECC_BYTES 32

int ecdsa_degen_sign(const uint8_t p_privateKey[ECC_BYTES], const uint8_t p_hash[ECC_BYTES], uint8_t p_signature[ECC_BYTES * 2]);

int main(void)
{
  uint8_t p_privateKey[ECC_BYTES] = {};
  uint8_t p_hash[ECC_BYTES] = {};
  uint8_t p_signature[ECC_BYTES * 2] = {};
  p_privateKey[ECC_BYTES - 1] = 1;

  ecdsa_degen_sign(p_privateKey, p_hash, p_signature);

  Log_Debug("signature\n");
  for (int i = 0; i < ECC_BYTES * 2; i++) {
    Log_Debug("%x", p_signature[i]);
  }
  Log_Debug("\n");
  Log_Debug("r\n");
  for (int i = 0; i < ECC_BYTES; i++) {
    Log_Debug("%x", p_signature[i]);
  }
  Log_Debug("\n");
  Log_Debug("s\n");
  for (int i = 0; i < ECC_BYTES; i++) {
    Log_Debug("%x", p_signature[ECC_BYTES + i]);
  }
  Log_Debug("\n");

    // This minimal Azure Sphere app repeatedly toggles GPIO 9, which is the green channel of RGB
    // LED 1 on the MT3620 RDB.
    // Use this app to test that device and SDK installation succeeded that you can build,
    // deploy, and debug an app with Visual Studio, and that you can deploy an app over the air,
    // per the instructions here: https://docs.microsoft.com/azure-sphere/quickstarts/qs-overview
    //
    // It is NOT recommended to use this as a starting point for developing apps; instead use
    // the extensible samples here: https://github.com/Azure/azure-sphere-samples
    Log_Debug(
        "\nVisit https://github.com/Azure/azure-sphere-samples for extensible samples to use as a "
        "starting point for full applications.\n");

    int fd = GPIO_OpenAsOutput(9, GPIO_OutputMode_PushPull, GPIO_Value_High);
    if (fd < 0) {
        Log_Debug(
            "Error opening GPIO: %s (%d). Check that app_manifest.json includes the GPIO used.\n",
            strerror(errno), errno);
        return -1;
    }

    const struct timespec sleepTime = {1, 0};
    while (true) {
        GPIO_SetValue(fd, GPIO_Value_Low);
        nanosleep(&sleepTime, NULL);
        GPIO_SetValue(fd, GPIO_Value_High);
        nanosleep(&sleepTime, NULL);
    }
}