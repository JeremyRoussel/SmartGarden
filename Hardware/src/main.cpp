#include <Arduino.h>
#include <DHT.h>

//Constants

#define DHTPIN 3
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

int sensor_pin = A0; // Photoresistor at Arduino analog pin A0
int pResistor_value;

//Variables
// Store value from photoresistor (0-1023)

void setup()
{
  Serial.begin(9600);
  dht.begin();
}

void loop()
{
  delay(5000); //Small delay
  int readData = dht.read(DHTPIN);

  float h = dht.readHumidity();
  // Read temperature as Celsius
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit
  float f = dht.readTemperature(true);

  float hi = dht.computeHeatIndex(f, h);

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(f);
  Serial.print(" *F\t");

  pResistor_value = analogRead(sensor_pin);               //moisture value is stored as analog signal from the sensor pin.
  pResistor_value = map(pResistor_value, 0, 450, 0, 100); //moisture value is mapped & converted in number out of 100.
  Serial.print("Light: ");
  Serial.print(pResistor_value);
  Serial.println("%");
}
