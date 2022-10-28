# Fork of vue-cal

This is an open source fork of Vue-Cal, a library made by Antoni Andre for Vue. Our fork contains some small changes we needed for our own project. Please go to the [official documentation](https://antoniandre.github.io/vue-cal/) for more details about this library.

## Main changes

- Added a new view `xdays`, similar to `week` view but allows instead of every week starting on sunday/monday, the left-most day in the view is the a date selected through the props `x-days-start="date"` and `active-view="xdays"`
- Add the possibility to specify how long the interval of days is in the `xdays` view, by default it is 7. Use `x-days-interval` prop. Warning: not tested for other values.

---

At the moment, our changes are not ready to be PR'd into upstream. We also added support for typescript in the hopes of rewriting the library to use `script setup` however we have some more research to do into this library.