# Fork of vue-cal

This is an open source fork of Vue-Cal, a library made by Antoni Andre for Vue. Our fork contains some small changes we needed for our own project.

## Main changes

- Added a new view `xdays`, similar to `week` view but allows instead of every week starting on sunday/monday, the left-most day in the view is the a date selected through the props `x-days-start="date"` and `active-view="xdays"`
- Add the possibility to specify how long the interval of days is in the `xdays` view, by default it is 7. Use `x-days-interval` prop. Warning: not tested for other values.
