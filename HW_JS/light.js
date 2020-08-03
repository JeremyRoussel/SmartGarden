const { Board, Thermometer, pResistor, mSensor, Sensor} = require("johnny-five");


const board = new Board();



board.on("ready", () => {
    // Create a new `photoresistor` hardware instance.
    const pResistor = new Sensor({
        pin: 'A0',
        freq: 2500,
    });
    const thermometer = new Thermometer({
        controller: "LM35",
        pin: "A3",
        freq: 2500,
      });
    const mSensor = new Sensor({
        pin: "A5",
        freq: 2500
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: pResistor,
    });

    // "data" get the current reading from the photoresistor
    pResistor.on('data', () => {
        console.log('Light level: ', pResistor.scaleTo([0, 150]),'%');
    });
    thermometer.on("data", () => {
        const {fahrenheit} = thermometer;
        console.log(" Temperature: ", fahrenheit,"F");
        console.log("--------------------------------------");
      });
    mSensor.on("data", () => {
        console.log(mSensor.scaleTo([110, -142]));
    })
});



  
