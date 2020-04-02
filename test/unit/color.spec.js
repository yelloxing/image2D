QUnit.test('formatColor', 3, function () {

    deepEqual(image2D.formatColor('red'), [255, 0, 0, 1], 'red');

    deepEqual(image2D.formatColor('#f00'), [255, 0, 0, 1], '#f00');

    deepEqual(image2D.formatColor('rgb(255,0,0)'), [255, 0, 0, 1], 'rgb(255,0,0)');

});