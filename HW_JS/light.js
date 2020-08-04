const {
    Board,
    Thermometer,
    pResistor,
    mSensor,
    Sensor,
} = require('johnny-five');

const board = new Board();

board.on('ready', () => {
    // Create a new `photoresistor` hardware instance.
    const pResistor = new Sensor({
        pin: 'A0',
        freq: 60000,
    });
    const thermometer = new Thermometer({
        controller: 'LM35',
        pin: 'A3',
        freq: 60000,
    });
    const mSensor = new Sensor({
        pin: 'A5',
        freq: 60000,
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: pResistor,
    });

    // "data" get the current reading from the photoresistor
    pResistor.on('data', () => {
        console.log('Light level: ', pResistor.scaleTo([0, 150]), '%');
    });
    thermometer.on('data', () => {
        const { fahrenheit } = thermometer;
        console.log(' Temperature: ', fahrenheit, 'F');
    });
    mSensor.on('data', () => {
        console.log('Moisture:');
        console.log(
            Math.round(Math.abs(((mSensor.value - 210) / 242) * 100 - 100)),
            '%'
        );
        console.log('--------------------------------------');
    });
});
