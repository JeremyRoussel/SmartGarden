const { Board, Thermometer, photoresistor, Sensor} = require("johnny-five");


const board = new Board();



board.on("ready", () => {
    // Create a new `photoresistor` hardware instance.
    const photoresistor = new Sensor({
        pin: 'A0',
        freq: 2500,
    });
    const thermometer = new Thermometer({
        controller: "LM35",
        pin: "A3",
        freq: 2500,
      });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: photoresistor,
    });

    // "data" get the current reading from the photoresistor
    photoresistor.on('data', function () {
        console.log('Light level: ', this.scaleTo([0, 150]),'%');
    });
    thermometer.on("data", () => {
        const {fahrenheit} = thermometer;
        console.log(" Temperature: ", fahrenheit,"F");
        console.log("--------------------------------------");
      });
});



  
