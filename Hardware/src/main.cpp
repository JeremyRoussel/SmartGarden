#include <Arduino.h> // needed for platformio
#include <DHT.h> // plugin to read temp and humidity sensor

//Constants

#define DHTPIN 3 // define temp and humidity probe to PWM 3
#define DHTTYPE DHT11 // define type of sensor

DHT dht(DHTPIN, DHTTYPE);

int light_pin = A0; // Photoresistor at Arduino analog pin A0
int pResistor_value;

int moist_pin = A3;  // Photoresistor at Arduino analog pin A3
int soilMoistureValue = 0;  



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
  // Read temperature as Fahrenheit
  float f = dht.readTemperature(true);

  Serial.print("Humidity: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(f);
  Serial.print(" *F\t");

  pResistor_value = analogRead(light_pin);               //Light value is stored as analog signal from the sensor pin.
  pResistor_value = map(pResistor_value, 0, 450, 0, 100); //Light value is mapped & converted in number out of 100.
  Serial.print("Light: ");
  Serial.print(pResistor_value);
  Serial.println("%");


  soilMoistureValue = analogRead(moist_pin);  //moisture value is stored as analog signal from the sensor pin.
  soilMoistureValue = map(soilMoistureValue, 452, 210, 0, 100); //moisture value is mapped & converted in number out of 100.
  Serial.print("Soil moisture level: ");
  Serial.print(soilMoistureValue);
  Serial.println("%");

}