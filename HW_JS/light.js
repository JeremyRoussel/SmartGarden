var five = require('johnny-five'),
    board,
    photoresistor;

board = new five.Board();

board.on('ready', function () {
    // Create a new `photoresistor` hardware instance.
    photoresistor = new five.Sensor({
        pin: 'A0',
        freq: 250,
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
});
