import $$ from 'image2d';
export default function (className, tagetClass) {
    $$('.' + className).attr('active', 'no');
    $$('.' + className + "." + tagetClass).attr('active', 'yes');
};