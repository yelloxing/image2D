QUnit.test('ruler', 2, function () {

    deepEqual(image2D.ruler(98, 0, 5), {
        distance: 20,
        max: 100,
        min: 0,
        num: 5,
        ruler: [0, 20, 40, 60, 80, 100]
    }, '98-0-5');


    deepEqual(image2D.ruler(98, 0, 10), {
        distance: 10,
        max: 100,
        min: 0,
        num: 10,
        ruler: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    }, '98-0-10');

});
